/**
 * Extractor + differ hardening tests (post-merge review of DMNC-1459).
 * Fixtures are written to a temp dir at test time so they never join the lint/tsc surface.
 */

import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join, resolve } from 'path';
import { extractCodeContract } from '../../scripts/contracts/extract-code-contract';
import { diffContracts } from '../../scripts/contracts/diff-contracts';
import type { ComponentContract } from '../../scripts/contracts/schema';

const ROOT = resolve(__dirname, '../..');
let dir: string;

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), 'eidotter-contract-'));
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

function extract(name: string, source: string, variantMapNames: Record<string, string> = {}) {
  const sourcePath = join(dir, `${name}.tsx`);
  writeFileSync(sourcePath, source);
  return extractCodeContract({ component: name, sourcePath, outputPath: 'unused', variantMapNames }, ROOT);
}

describe('extractDestructuredDefaults', () => {
  it('reads defaults only from the exported component, ignoring inner arrows with conflicting defaults', () => {
    const contract = extract(
      'Fixture',
      `
      import React, { forwardRef } from 'react';
      export interface FixtureProps { variant?: 'a' | 'b'; dense?: boolean }
      const helper = ({ variant = 'b', dense = true }: FixtureProps) => variant + dense;
      export const Fixture = forwardRef<HTMLDivElement, FixtureProps>(({ variant = 'a', dense = false }, ref) => {
        const inner = ({ variant = 'b' }: FixtureProps) => variant;
        return <div ref={ref}>{helper({ variant })}{inner({})}</div>;
      });
      `,
    );
    const byName = Object.fromEntries(contract.props.map((p) => [p.name, p]));
    expect(byName.variant.default).toBe('a');
    expect(byName.dense.default).toBe(false);
  });

  it('works for a plain arrow component and an `export function` component', () => {
    const arrow = extract(
      'ArrowFx',
      `export interface ArrowFxProps { size?: 'sm' | 'md' }
       export const ArrowFx = ({ size = 'sm' }: ArrowFxProps) => size;`,
    );
    expect(arrow.props[0].default).toBe('sm');
    const fn = extract(
      'FnFx',
      `export interface FnFxProps { size?: 'sm' | 'md' }
       export function FnFx({ size = 'md' }: FnFxProps) { return size; }`,
    );
    expect(fn.props[0].default).toBe('md');
  });

  it('throws when the component cannot be identified', () => {
    expect(() =>
      extract('Missing', `export interface MissingProps { a?: 'x' | 'y' }\nexport const Other = () => null;`),
    ).toThrow(/expected exactly one component function/);
  });

  it('throws when the wrapper call is ambiguous (two function arguments)', () => {
    expect(() =>
      extract(
        'Amb',
        `declare function wrap(a: unknown, b: unknown): unknown;
         export interface AmbProps { a?: 'x' | 'y' }
         export const Amb = wrap(({ a = 'x' }: AmbProps) => a, ({ a = 'y' }: AmbProps) => a);`,
      ),
    ).toThrow(/found 2/);
  });
});

describe('extractObjectLiteralMap', () => {
  const component = (map: string) => `
    export interface MapFxProps { size?: 'sm' | 'md' }
    ${map}
    export const MapFx = ({ size = 'sm' }: MapFxProps) => sizeClasses[size];
  `;

  it('reads string-literal values', () => {
    const c = extract('MapFx', component(`const sizeClasses = { sm: 'p-1', md: 'p-2' };`), { sizeClasses: 'size' });
    expect(c.variants.size.classMap).toEqual({ sm: 'p-1', md: 'p-2' });
  });

  it.each([
    ['a computed value', `const BASE = 'p-1';\nconst sizeClasses = { sm: BASE, md: 'p-2' };`],
    ['a template with substitution', 'const BASE = "p";\nconst sizeClasses = { sm: `${BASE}-1`, md: "p-2" };'],
    ['a spread member', `const other = { sm: 'p-1' };\nconst sizeClasses = { ...other, md: 'p-2' };`],
  ])('throws on %s', (_label, map) => {
    expect(() => extract('MapFx', component(map), { sizeClasses: 'size' })).toThrow(/sizeClasses/);
  });
});

describe('diffContracts one-sided defaults', () => {
  const base = (def?: string): ComponentContract => ({
    component: 'X',
    source: 'code',
    props: [],
    variants: { color: { values: ['a', 'b'], ...(def ? { default: def } : {}) } },
  });

  it('warns when only Figma has a default', () => {
    const r = diffContracts(base(), { ...base('a'), source: 'figma' });
    expect(r.pass).toBe(true);
    expect(r.violations.map((v) => v.message)).toEqual([expect.stringContaining('code declares no literal default')]);
  });

  it('warns when only code has a default', () => {
    const r = diffContracts(base('a'), { ...base(), source: 'figma' });
    expect(r.violations.map((v) => v.message)).toEqual([expect.stringContaining('Figma declares no default')]);
  });

  it('stays quiet when neither or both agree', () => {
    expect(diffContracts(base(), base()).violations).toEqual([]);
    expect(diffContracts(base('a'), base('a')).violations).toEqual([]);
  });
});
