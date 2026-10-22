/**
 * Registry ↔ code validation (DMNC-1459 wave 2).
 *
 * `registry.ts` holds hand-written metadata (since, originNote, consumers, ...)
 * that has no code-side source, so it is VALIDATED AGAINST code, never generated
 * from it. This test makes variant drift impossible to ship silently:
 *
 *  A. Components with a committed code contract (Button, Badge, Tag, Alert):
 *     every registry `prop:value` key must be a value the contract knows for that
 *     prop, and every contract axis / enum-prop value must have a registry key
 *     (deprecated aliases stay in the registry, flagged `deprecated`).
 *
 *  B. Every other registry component with a source file: the same two-way check
 *     against the string-literal unions in `<Name>Props`, for the props the registry
 *     documents. Props whose union is imported from another file (e.g. the health
 *     family's `tone`/`status`) or is not a literal union (Icon `name`) cannot be
 *     resolved in-file and are skipped, not guessed.
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Node, Project, type SourceFile, type TypeNode } from 'ts-morph';
import { componentRegistry } from './registry';
import { PILOT_COMPONENTS } from '../../scripts/contracts/extract-code-contract';
import type { ComponentContract } from '../../scripts/contracts/schema';

const ROOT = resolve(__dirname, '../..');

/** Groups a registry entry's "prop:value" keys by prop. */
function registryProps(name: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const key of Object.keys(componentRegistry[name].variants ?? {})) {
    const idx = key.indexOf(':');
    (out[key.slice(0, idx)] ??= []).push(key.slice(idx + 1));
  }
  return out;
}

/** Compares registry values to code values for the props the registry documents. */
function diffProps(
  name: string,
  reg: Record<string, string[]>,
  code: Record<string, string[]>,
  source: string,
): string[] {
  const problems: string[] = [];
  for (const [prop, regValues] of Object.entries(reg)) {
    const codeValues = code[prop];
    if (!codeValues) continue; // not resolvable from this source — skipped, not guessed
    for (const v of regValues.filter((x) => !codeValues.includes(x))) {
      problems.push(`${name}: registry key "${prop}:${v}" is not a value of "${prop}" in ${source}`);
    }
    for (const v of codeValues.filter((x) => !regValues.includes(x))) {
      problems.push(`${name}: ${source} "${prop}" value "${v}" has no registry key "${prop}:${v}"`);
    }
  }
  return problems;
}

describe('registry ↔ code contract (components with a contract JSON)', () => {
  it('has at least the wave-2 components under contract', () => {
    expect(PILOT_COMPONENTS.map((c) => c.component)).toEqual(
      expect.arrayContaining(['Button', 'Badge', 'Tag', 'Alert']),
    );
  });

  it.each(PILOT_COMPONENTS.map((c) => [c.component, c.outputPath] as const))(
    '%s: registry variants match the committed code contract',
    (name, contractPath) => {
      const contract = JSON.parse(readFileSync(resolve(ROOT, contractPath), 'utf-8')) as ComponentContract;
      const code: Record<string, string[]> = {};
      for (const prop of contract.props) if (prop.type === 'enum' && prop.values) code[prop.name] = prop.values;
      for (const [axis, def] of Object.entries(contract.variants)) code[axis] = def.values; // axes win

      const reg = registryProps(name);
      // Registry-side check covers every documented prop the contract knows. The reverse
      // check is additionally applied to every contract *axis* the registry is silent on.
      const problems = diffProps(name, reg, code, `${name}.contract.json`);
      for (const [axis, def] of Object.entries(contract.variants)) {
        if (!reg[axis]) for (const v of def.values) problems.push(`${name}: contract axis "${axis}" value "${v}" has no registry key`);
      }
      expect(problems).toEqual([]);
    },
  );
});

describe('registry ↔ component source unions (all other registered components)', () => {
  const project = new Project({ tsConfigFilePath: resolve(ROOT, 'tsconfig.json'), skipAddingFilesFromTsConfig: true });

  function literalUnion(node: TypeNode | undefined, sf: SourceFile, depth = 0): string[] | null {
    if (!node) return null;
    if (Node.isUnionTypeNode(node)) {
      const out: string[] = [];
      for (const member of node.getTypeNodes()) {
        const r = literalUnion(member, sf, depth);
        if (!r) return null;
        out.push(...r);
      }
      return out;
    }
    if (Node.isLiteralTypeNode(node)) {
      const lit = node.getLiteral();
      return Node.isStringLiteral(lit) ? [lit.getLiteralValue()] : null;
    }
    if (Node.isTypeReference(node) && depth < 3) {
      const alias = sf.getTypeAlias(node.getTypeName().getText());
      if (alias) return literalUnion(alias.getTypeNode(), sf, depth + 1);
    }
    return null;
  }

  function sourceUnions(name: string): Record<string, string[]> | null {
    const dir = resolve(ROOT, 'src/components', name, 'components');
    if (!existsSync(dir)) return null;
    const files = readdirSync(dir).filter((f) => /^[A-Z].*\.tsx$/.test(f) && !/(test|stories)/.test(f));
    const out: Record<string, string[]> = {};
    let found = false;
    for (const file of files) {
      const sf = project.addSourceFileAtPath(resolve(dir, file));
      for (const iface of sf.getInterfaces()) {
        if (iface.getName() !== `${name}Props`) continue;
        found = true;
        for (const member of iface.getProperties()) {
          const values = literalUnion(member.getTypeNode(), sf);
          if (values) out[member.getName().replace(/['"]/g, '')] = values;
        }
      }
    }
    return found ? out : null;
  }

  const contracted = new Set(PILOT_COMPONENTS.map((c) => c.component));
  const names = Object.keys(componentRegistry).filter((n) => !contracted.has(n) && componentRegistry[n].variants);

  it.each(names)('%s: registry variants match its Props string unions', (name) => {
    const code = sourceUnions(name);
    if (!code) return; // no standalone source (e.g. Mark, MeterGroup, Chat*, AccordionFill)
    expect(diffProps(name, registryProps(name), code, `${name}Props`)).toEqual([]);
  });
});
