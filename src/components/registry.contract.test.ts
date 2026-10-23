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
 *  B. Every other registry component with `variants`: the same two-way check
 *     against the string-literal (and boolean) unions in `<Name>Props`, resolved
 *     through in-file interfaces, `extends`, type aliases, unions and intersections
 *     (e.g. Select's `SingleSelectProps | MultiSelectProps`). A registry prop with
 *     no code counterpart FAILS (a misspelled key cannot pass), as does a component
 *     whose Props cannot be found. The only exceptions are the commented allowlists
 *     below (imported unions such as the health family's `tone`/`status`, non-literal
 *     types such as Icon `name`), and a stale allowlist entry fails too.
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Node, Project, SyntaxKind, type SourceFile, type TypeNode } from 'ts-morph';
import { componentRegistry } from './registry';
import { PILOT_COMPONENTS } from '../../scripts/contracts/extract-code-contract';
import type { ComponentContract } from '../../scripts/contracts/schema';

const ROOT = resolve(__dirname, '../..');

/**
 * Registry props (`Component.prop`) whose values cannot be resolved from an in-file
 * string-literal union. Everything else must resolve, or the test fails. Keep each
 * entry's reason current; a stale entry fails the "no stale exceptions" test.
 */
const UNRESOLVABLE_PROPS: Record<string, string> = {
  'Icon.name': 'IconName is `keyof typeof ICON_MAP`, not a literal union',
  'Header.context': 'HeaderContext is an object type; the registry key describes presence, not a value',
  'Select.mode':
    'no `mode` prop: "mode:default" names the default single-select mode (neither searchable nor multiple). Registry naming follow-up, not renamed here',
  'Gauge.tone': 'Tone is imported from src/utils/health',
  'Gauge.status': 'ValueStatus is imported from src/utils/health',
  'Meter.tone': 'Tone is imported from src/utils/health',
  'RangeBar.tone': 'Tone is imported from src/utils/health (and lives on the segment type)',
  'RangeBar.pattern': 'pattern lives on the RangeBarSegment type, not on RangeBarProps',
  'SeriesBars.tone': 'tone lives inside `toneFor` entries; Tone is imported from src/utils/health',
  'DecayStrip.tone': 'Tone is imported from src/utils/health',
  'VitalsStrip.tone': 'Tone is imported from src/utils/health',
  'VitalsStrip.status': 'ValueStatus is imported from src/utils/health',
};

/**
 * Registry components that document `variants` but have no resolvable
 * `<Name>Props` in `src/components/<Name>/components/`.
 */
const NO_STANDALONE_PROPS: Record<string, string> = {};

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
    if (!codeValues) {
      // A registry prop with no code counterpart fails (catches misspelled keys like
      // "varaint:primary"), unless it is explicitly allowlisted as unresolvable in-file.
      if (!UNRESOLVABLE_PROPS[`${name}.${prop}`]) {
        problems.push(`${name}: registry prop "${prop}" has no string-literal union in ${source}`);
      }
      continue;
    }
    for (const v of regValues.filter((x) => !codeValues.includes(x))) {
      problems.push(`${name}: registry key "${prop}:${v}" is not a value of "${prop}" in ${source}`);
    }
    // Boolean props: the registry documents the notable state (e.g. "searchable:true"),
    // so only the registry→code direction is checked.
    if (codeValues.every((x) => x === 'true' || x === 'false')) continue;
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
    // Booleans resolve to "true"/"false" so registry keys like "morph:true" validate.
    if (node.getKind() === SyntaxKind.BooleanKeyword) return ['true', 'false'];
    if (Node.isLiteralTypeNode(node)) {
      const lit = node.getLiteral();
      if (lit.getKind() === SyntaxKind.TrueKeyword) return ['true'];
      if (lit.getKind() === SyntaxKind.FalseKeyword) return ['false'];
      return Node.isStringLiteral(lit) ? [lit.getLiteralValue()] : null;
    }
    if (Node.isTypeReference(node) && depth < 3) {
      const alias = sf.getTypeAlias(node.getTypeName().getText());
      if (alias) return literalUnion(alias.getTypeNode(), sf, depth + 1);
    }
    return null;
  }

  /** Adds a prop's literal values to `out`, merging across union/extends members. */
  function addProp(out: Record<string, string[]>, prop: string, values: string[]) {
    const merged = out[prop] ?? [];
    for (const v of values) if (!merged.includes(v)) merged.push(v);
    out[prop] = merged;
  }

  /**
   * Collects string-literal-union props from an in-file interface or type alias,
   * following `extends` clauses, unions (`A | B`), intersections (`A & B`), type
   * literals and in-file type references. Imported types are not followed.
   */
  function collectProps(typeName: string, sf: SourceFile, out: Record<string, string[]>, depth = 0): boolean {
    if (depth > 5) return false;
    const iface = sf.getInterface(typeName);
    if (iface) {
      for (const member of iface.getProperties()) {
        const values = literalUnion(member.getTypeNode(), sf);
        if (values) addProp(out, member.getName().replace(/['"]/g, ''), values);
      }
      for (const heritage of iface.getExtends()) {
        collectProps(heritage.getExpression().getText(), sf, out, depth + 1);
      }
      return true;
    }
    const alias = sf.getTypeAlias(typeName);
    if (alias) {
      collectFromTypeNode(alias.getTypeNode(), sf, out, depth + 1);
      return true;
    }
    return false;
  }

  function collectFromTypeNode(node: TypeNode | undefined, sf: SourceFile, out: Record<string, string[]>, depth: number) {
    if (!node || depth > 5) return;
    if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
      for (const member of node.getTypeNodes()) collectFromTypeNode(member, sf, out, depth);
    } else if (Node.isTypeLiteral(node)) {
      for (const member of node.getProperties()) {
        const values = literalUnion(member.getTypeNode(), sf);
        if (values) addProp(out, member.getName().replace(/['"]/g, ''), values);
      }
    } else if (Node.isTypeReference(node)) {
      collectProps(node.getTypeName().getText(), sf, out, depth + 1);
    } else if (Node.isParenthesizedTypeNode(node)) {
      collectFromTypeNode(node.getTypeNode(), sf, out, depth);
    }
  }

  function sourceUnions(name: string): Record<string, string[]> | null {
    // Components that live in another component's directory (Mark in Brand, MeterGroup in
    // Meter) are found through the registry's react platform path.
    const base = componentRegistry[name].platforms?.react?.path ?? `src/components/${name}`;
    const dir = resolve(ROOT, base, 'components');
    if (!existsSync(dir)) return null;
    const files = readdirSync(dir).filter((f) => /^[A-Z].*\.tsx$/.test(f) && !/(test|stories)/.test(f));
    const out: Record<string, string[]> = {};
    let found = false;
    for (const file of files) {
      const sf = project.addSourceFileAtPath(resolve(dir, file));
      if (collectProps(`${name}Props`, sf, out)) found = true;
    }
    return found ? out : null;
  }

  const contracted = new Set(PILOT_COMPONENTS.map((c) => c.component));
  const names = Object.keys(componentRegistry).filter((n) => !contracted.has(n) && componentRegistry[n].variants);

  it.each(names)('%s: registry variants match its Props string unions', (name) => {
    const code = sourceUnions(name);
    if (!code) {
      // Variants documented but no resolvable `<Name>Props` — fail unless explicitly allowlisted.
      expect(NO_STANDALONE_PROPS[name]).toBeDefined();
      return;
    }
    expect(diffProps(name, registryProps(name), code, `${name}Props`)).toEqual([]);
  });

  it('allowlists only name real registry entries (no stale exceptions)', () => {
    const stale = [
      ...Object.keys(NO_STANDALONE_PROPS).filter((n) => !componentRegistry[n]?.variants || sourceUnions(n)),
      ...Object.keys(UNRESOLVABLE_PROPS).filter((key) => {
        const [n, prop] = key.split('.');
        return !componentRegistry[n]?.variants || !registryProps(n)[prop];
      }),
    ];
    expect(stale).toEqual([]);
  });
});
