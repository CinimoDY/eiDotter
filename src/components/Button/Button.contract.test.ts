/**
 * Contract tests for Button's code↔Figma component contract (pilot, DMNC-1459).
 *
 * This is the piece that rides the existing `npm test` CI gate in place of a
 * new workflow step — no new CI YAML. Three properties are asserted:
 *
 * 1. Determinism (Curtis): regenerating the code contract twice with nothing
 *    changed produces byte-identical output.
 * 2. Freshness: the regenerated code/Figma contracts match the committed
 *    `*.contract.json` files — catches "Button.tsx changed but nobody ran
 *    `npm run extract-code-contract`" the same way `tailwind-preset.test.ts`
 *    catches token-generator drift.
 * 3. Parity: the committed contracts, diffed, have zero error-level
 *    violations — this is the actual replacement for figma-audit's
 *    hand-built markdown comparison matrix.
 *
 * The known warning-level findings are pinned so a *new* one is caught the
 * moment it appears, instead of silently joining the noise.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { extractCodeContract } from '../../../scripts/contracts/extract-code-contract';
import { extractFigmaContract } from '../../../scripts/contracts/extract-figma-contract';
import { diffContracts } from '../../../scripts/contracts/diff-contracts';
import { stableStringify, type ComponentContract } from '../../../scripts/contracts/schema';

const ROOT = resolve(__dirname, '../../..');

const CODE_CONTRACT_CONFIG = {
  component: 'Button',
  sourcePath: 'src/components/Button/components/Button.tsx',
  outputPath: 'src/components/Button/Button.contract.json',
  variantMapNames: { variantClasses: 'variant', sizeClasses: 'size' },
};

const FIGMA_TARGET = {
  component: 'Button',
  figmaNodeName: 'Button',
  outputPath: 'figma-snapshots/contracts/Button.contract.json',
};

function readJson(relativePath: string): unknown {
  return JSON.parse(readFileSync(resolve(ROOT, relativePath), 'utf-8'));
}

function readText(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

describe('Button code contract — determinism and freshness', () => {
  it('regenerating twice with nothing changed produces byte-identical output', () => {
    const first = stableStringify(extractCodeContract(CODE_CONTRACT_CONFIG));
    const second = stableStringify(extractCodeContract(CODE_CONTRACT_CONFIG));
    expect(second).toBe(first);
  });

  it('matches the committed Button.contract.json (run `npm run extract-code-contract` if this fails)', () => {
    const regenerated = stableStringify(extractCodeContract(CODE_CONTRACT_CONFIG));
    expect(regenerated).toBe(readText(CODE_CONTRACT_CONFIG.outputPath));
  });
});

describe('Button Figma contract — freshness against the committed snapshot', () => {
  it('matches the committed figma-snapshots/contracts/Button.contract.json (run `npm run extract-figma-contract` if this fails)', () => {
    const snapshot = readJson('figma-snapshots/web-ds.json');
    const regenerated = stableStringify(extractFigmaContract(FIGMA_TARGET, snapshot));
    expect(regenerated).toBe(readText(FIGMA_TARGET.outputPath));
  });
});

describe('Button contract diff — code↔Figma parity', () => {
  const code = () => readJson(CODE_CONTRACT_CONFIG.outputPath) as ComponentContract;
  const figma = () => readJson(FIGMA_TARGET.outputPath) as ComponentContract;

  it('has zero error-level violations', () => {
    const result = diffContracts(code(), figma());
    if (!result.pass) {
      const errors = result.violations
        .filter((v) => v.severity === 'error')
        .map((v) => `  [${v.axis}] ${v.message}`)
        .join('\n');
      throw new Error(`Button code↔Figma contract drift:\n${errors}`);
    }
    expect(result.pass).toBe(true);
  });

  // Pins the current, reviewed warnings so a *new* one fails the build
  // instead of blending into the noise (the "rotted contract" trap).
  it('has exactly the known, accepted warnings', () => {
    const result = diffContracts(code(), figma());
    const warnings = result.violations
      .filter((v) => v.severity === 'warning')
      .map((v) => `${v.axis}: ${v.message}`)
      .sort();

    expect(warnings).toEqual(
      [
        'size: Code "size" defines extra value(s) [small, medium, large] Figma doesn\'t model.',
        'size: Default mismatch for "size": Figma default is "xs", code default is "md".',
        'state: Figma defines variant axis "state" with no code-side variant equivalent — verify code covers it some other way (prop, CSS state, etc).',
      ].sort(),
    );
  });
});
