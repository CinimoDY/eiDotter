/**
 * extract-code-contract — deterministic code-side component contract extractor (pilot, DMNC-1459).
 *
 * Walks a component's TS source with ts-morph (chosen over react-docgen-typescript,
 * which has no clean path to reading the `variantClasses`/`sizeClasses` object-literal
 * variant maps eidotter actually uses — it's built for prop tables, not variant→class
 * maps) and produces a ComponentContract (scripts/contracts/schema.ts). No AI, no
 * network — same input always produces the same output (Curtis's "determinism"
 * principle; see src/components/contracts.test.ts for the byte-identical regeneration check).
 *
 * Pure logic only — no file I/O, no CLI entrypoint. Imported directly by
 * src/components/contracts.test.ts. Run via `npm run extract-code-contract`, which
 * invokes the thin `extract-code-contract.cli.ts` wrapper instead (run through
 * tsx; kept separate because it resolves paths via `import.meta.url` and
 * handles CLI argv, which this importable module deliberately avoids).
 */

import { Node, Project, SyntaxKind } from 'ts-morph';
import { resolve } from 'path';
import type { ComponentContract, ContractProp, ContractPropType, ContractVariantAxis } from './schema';

export interface ExtractCodeContractConfig {
  component: string;
  /** Path to the .tsx source, relative to repo root. */
  sourcePath: string;
  /** Path to write the contract JSON, relative to repo root (informational — the CLI wrapper does the writing). */
  outputPath: string;
  /** Object-literal variable name → variant axis name it maps to (e.g. variantClasses → variant). */
  variantMapNames: Record<string, string>;
  /**
   * Enum props (string-literal unions, incl. in-file type aliases such as `AlertColor`)
   * that are promoted to variant axes so the differ compares them against the Figma
   * axis of the same name. Used where a component has no value→class map for an axis
   * (Tag `variant`, Alert `color`). Promoted axes carry no `classMap`.
   */
  propAxes?: string[];
  /**
   * Name of the in-file interface the props are read from. Defaults to `${component}Props`.
   * Set for helper contracts whose visual surface is a sub-type of a parent component
   * (e.g. `RangeBarSegment`, `SeriesBarsPoint`).
   */
  propsInterface?: string;
  /**
   * Name of the exported component function whose destructured parameter supplies the
   * defaults. Defaults to `component`. Helper contracts have no function of their own, so
   * they point at the parent component; only defaults for props/axes the helper's own
   * interface or maps declare are recorded.
   */
  defaultsFrom?: string;
}

export const PILOT_COMPONENTS: ExtractCodeContractConfig[] = [
  {
    component: 'Button',
    sourcePath: 'src/components/Button/components/Button.tsx',
    outputPath: 'src/components/Button/Button.contract.json',
    variantMapNames: { variantClasses: 'variant', sizeClasses: 'size' },
  },
  {
    component: 'Badge',
    sourcePath: 'src/components/Badge/components/Badge.tsx',
    outputPath: 'src/components/Badge/Badge.contract.json',
    variantMapNames: { variantClasses: 'variant', sizeClasses: 'size' },
  },
  {
    component: 'Tag',
    sourcePath: 'src/components/Tag/components/Tag.tsx',
    outputPath: 'src/components/Tag/Tag.contract.json',
    // Tag has only a size class map; `variant` is a prop union, promoted to an axis so it
    // is compared against Figma's `variant` axis.
    variantMapNames: { sizeClasses: 'size' },
    propAxes: ['variant'],
  },
  {
    component: 'Alert',
    sourcePath: 'src/components/Alert/components/Alert.tsx',
    outputPath: 'src/components/Alert/Alert.contract.json',
    // Alert has no flat value→class map (colour/size are resolved through functions); the
    // prop unions (size, deprecated type) are captured in `props`. `color` (typed via the
    // in-file `AlertColor` alias) is promoted to an axis to compare with Figma's `color`.
    variantMapNames: {},
    propAxes: ['color'],
  },
  // Health family (DMNC-1572 U8b). `tone`/`status` are typed via the imported `Tone` /
  // `ValueStatus` aliases (not followed by this extractor), so those axes come from the
  // literal class maps instead of `propAxes`.
  {
    component: 'Gauge',
    sourcePath: 'src/components/Gauge/components/Gauge.tsx',
    outputPath: 'src/components/Gauge/Gauge.contract.json',
    variantMapNames: { sizeClasses: 'size', toneClasses: 'tone', statusClasses: 'status' },
  },
  {
    component: 'Meter',
    sourcePath: 'src/components/Meter/components/Meter.tsx',
    outputPath: 'src/components/Meter/Meter.contract.json',
    variantMapNames: {
      orientationClasses: 'orientation',
      sizeClasses: 'size',
      toneClasses: 'tone',
      patternClasses: 'pattern',
    },
  },
  {
    component: 'MeterGroup',
    sourcePath: 'src/components/Meter/components/MeterGroup.tsx',
    outputPath: 'src/components/Meter/MeterGroup.contract.json',
    variantMapNames: { layoutClasses: 'layout' },
  },
  {
    component: 'RangeBar',
    sourcePath: 'src/components/RangeBar/components/RangeBar.tsx',
    outputPath: 'src/components/RangeBar/RangeBar.contract.json',
    // tone/pattern are per-segment in code; Figma models them on the `RangeBar Segment`
    // helper set (see RangeBarSegment below), so they warn here and are pinned.
    variantMapNames: {
      orientationClasses: 'orientation',
      sizeClasses: 'size',
      toneClasses: 'tone',
      patternClasses: 'pattern',
    },
  },
  {
    component: 'SeriesBars',
    sourcePath: 'src/components/SeriesBars/components/SeriesBars.tsx',
    outputPath: 'src/components/SeriesBars/SeriesBars.contract.json',
    // `patternClasses` is keyed by tone (pattern follows tone), so it is not a separate axis.
    variantMapNames: { sizeClasses: 'size', toneClasses: 'tone' },
  },
  {
    component: 'DecayStrip',
    sourcePath: 'src/components/DecayStrip/components/DecayStrip.tsx',
    outputPath: 'src/components/DecayStrip/DecayStrip.contract.json',
    variantMapNames: { sizeClasses: 'size', toneClasses: 'tone' },
  },
  {
    component: 'VitalsStrip',
    sourcePath: 'src/components/VitalsStrip/components/VitalsStrip.tsx',
    outputPath: 'src/components/VitalsStrip/VitalsStrip.contract.json',
    variantMapNames: { sizeClasses: 'size', toneClasses: 'tone', statusClasses: 'status' },
  },
  // Helper contracts: Figma's `RangeBar Segment` / `SeriesBars Bar` sets model the
  // per-item surface; in code that is a sub-type of the parent component.
  {
    component: 'RangeBarSegment',
    sourcePath: 'src/components/RangeBar/components/RangeBar.tsx',
    outputPath: 'src/components/RangeBar/RangeBarSegment.contract.json',
    propsInterface: 'RangeBarSegment',
    defaultsFrom: 'RangeBar',
    variantMapNames: { toneClasses: 'tone', patternClasses: 'pattern' },
  },
  {
    component: 'SeriesBarsBar',
    sourcePath: 'src/components/SeriesBars/components/SeriesBars.tsx',
    outputPath: 'src/components/SeriesBars/SeriesBarsBar.contract.json',
    propsInterface: 'SeriesBarsPoint',
    defaultsFrom: 'SeriesBars',
    variantMapNames: { toneClasses: 'tone' },
  },
];

type SourceFile = ReturnType<Project['getSourceFileOrThrow']>;

/**
 * Resolves a type node to its string-literal values, following type aliases declared
 * in the same file (e.g. `color?: AlertColor`). Returns null for anything that is not
 * a pure string-literal union — imported types are not followed (deterministic, in-file only).
 */
function literalValues(typeNode: import('ts-morph').TypeNode, sourceFile: SourceFile, depth = 0): string[] | null {
  if (Node.isUnionTypeNode(typeNode)) {
    const values: string[] = [];
    for (const member of typeNode.getTypeNodes()) {
      const r = literalValues(member, sourceFile, depth);
      if (!r) return null;
      values.push(...r);
    }
    return values;
  }
  if (Node.isLiteralTypeNode(typeNode)) {
    const literal = typeNode.getLiteral();
    return Node.isStringLiteral(literal) ? [literal.getLiteralValue()] : null;
  }
  if (Node.isTypeReference(typeNode) && depth < 3) {
    const aliasNode = sourceFile.getTypeAlias(typeNode.getTypeName().getText())?.getTypeNode();
    if (aliasNode) return literalValues(aliasNode, sourceFile, depth + 1);
  }
  return null;
}

function classifyPropType(
  typeNode: import('ts-morph').TypeNode | undefined,
  sourceFile: SourceFile,
): { type: ContractPropType; values?: string[] } | null {
  if (!typeNode) return null;

  const values = literalValues(typeNode, sourceFile);
  // A lone literal (`kind: 'x'`) stays out of the contract, as before; unions and aliases count.
  if (values && (Node.isUnionTypeNode(typeNode) || Node.isTypeReference(typeNode))) {
    return { type: 'enum', values };
  }
  if (typeNode.getKind() === SyntaxKind.BooleanKeyword) return { type: 'boolean' };
  if (typeNode.getKind() === SyntaxKind.StringKeyword) return { type: 'string' };
  return null;
}

function stripQuotes(name: string): string {
  return name.replace(/^['"]|['"]$/g, '');
}

/**
 * Finds the exported component's function: `export const X = forwardRef(( {...}, ref) => ...)`,
 * `export const X = memo(function ...)`, `export const X = ({...}) => ...` or
 * `export function X({...}) {...}`. Throws if there is no match or more than one.
 */
type ComponentFn = import('ts-morph').FunctionDeclaration | import('ts-morph').ArrowFunction | import('ts-morph').FunctionExpression;

function findComponentFunction(sourceFile: SourceFile, component: string): ComponentFn {
  const found: ComponentFn[] = [];
  const fnDecl = sourceFile.getFunction(component);
  if (fnDecl) found.push(fnDecl);
  const init = sourceFile.getVariableDeclaration(component)?.getInitializer();
  if (init) {
    if (Node.isArrowFunction(init) || Node.isFunctionExpression(init)) {
      found.push(init);
    } else if (Node.isCallExpression(init)) {
      // forwardRef(...) / memo(...) wrappers: the component is the function argument.
      for (const arg of init.getArguments()) {
        if (Node.isArrowFunction(arg) || Node.isFunctionExpression(arg)) found.push(arg);
      }
    }
  }
  if (found.length !== 1) {
    throw new Error(
      `${component}: expected exactly one component function in ${sourceFile.getBaseName()}, found ${found.length} (ambiguous or unsupported component declaration)`,
    );
  }
  return found[0];
}

/**
 * Reads default values from the exported component's own destructured-props parameter.
 * Inner arrows (handlers, helpers) are deliberately ignored so their defaults cannot
 * leak into the contract.
 */
function extractDestructuredDefaults(
  sourceFile: SourceFile,
  component: string,
): Record<string, string | boolean> {
  const fn = findComponentFunction(sourceFile, component);
  const first = fn.getParameters()[0];
  const defaults: Record<string, string | boolean> = {};
  const pattern = first?.getNameNode();
  if (!pattern || !Node.isObjectBindingPattern(pattern)) return defaults;

  for (const element of pattern.getElements()) {
    const init = element.getInitializer();
    if (!init) continue;
    const name = element.getName();
    if (Node.isStringLiteral(init)) {
      defaults[name] = init.getLiteralValue();
    } else if (init.getKind() === SyntaxKind.TrueKeyword) {
      defaults[name] = true;
    } else if (init.getKind() === SyntaxKind.FalseKeyword) {
      defaults[name] = false;
    }
  }
  return defaults;
}

/** Reads a top-level `const NAME: Record<string, string> = {...}` object literal as a plain map. */
function extractObjectLiteralMap(
  sourceFile: ReturnType<Project['getSourceFileOrThrow']>,
  variableName: string,
): Record<string, string> | null {
  const decl = sourceFile.getVariableDeclaration(variableName);
  const init = decl?.getInitializer();
  if (!init || !Node.isObjectLiteralExpression(init)) return null;

  const map: Record<string, string> = {};
  for (const prop of init.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) {
      throw new Error(`${variableName}: unsupported member (${prop.getKindName()}); only plain "key: 'literal'" entries are allowed`);
    }
    const valueNode = prop.getInitializer();
    if (!valueNode || !(Node.isStringLiteral(valueNode) || Node.isNoSubstitutionTemplateLiteral(valueNode))) {
      throw new Error(
        `${variableName}: value of "${prop.getName()}" is not a string literal (${valueNode?.getKindName() ?? 'none'}); the contract extractor cannot read computed map values`,
      );
    }
    map[stripQuotes(prop.getName())] = valueNode.getLiteralValue();
  }
  return map;
}

/** `root` defaults to `process.cwd()` — both `npm run` and `jest` invoke from the repo root. */
export function extractCodeContract(config: ExtractCodeContractConfig, root: string = process.cwd()): ComponentContract {
  const project = new Project({
    tsConfigFilePath: resolve(root, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });
  const sourceFile = project.addSourceFileAtPath(resolve(root, config.sourcePath));

  const propsInterface = sourceFile.getInterface(config.propsInterface ?? `${config.component}Props`);
  const defaults = extractDestructuredDefaults(sourceFile, config.defaultsFrom ?? config.component);

  const props: ContractProp[] = [];
  if (propsInterface) {
    for (const member of propsInterface.getProperties()) {
      const classified = classifyPropType(member.getTypeNode(), sourceFile);
      if (!classified) continue; // functions, ReactNode, etc. — not part of the visual contract
      const name = stripQuotes(member.getName());
      const prop: ContractProp = {
        name,
        type: classified.type,
        required: !member.hasQuestionToken(),
      };
      if (classified.values) prop.values = classified.values;
      if (name in defaults) prop.default = defaults[name];
      props.push(prop);
    }
  }

  const variants: Record<string, ContractVariantAxis> = {};
  for (const [mapName, axisName] of Object.entries(config.variantMapNames)) {
    const classMap = extractObjectLiteralMap(sourceFile, mapName);
    if (!classMap) continue;
    const axis: ContractVariantAxis = { values: Object.keys(classMap), classMap };
    if (axisName in defaults) axis.default = String(defaults[axisName]);
    variants[axisName] = axis;
  }
  for (const propName of config.propAxes ?? []) {
    const prop = props.find((p) => p.name === propName);
    if (!prop || prop.type !== 'enum' || !prop.values) {
      throw new Error(`${config.component}: propAxes entry "${propName}" is not a resolvable enum prop`);
    }
    const axis: ContractVariantAxis = { values: prop.values };
    if (prop.default !== undefined) axis.default = String(prop.default);
    variants[propName] = axis;
  }

  return {
    component: config.component,
    source: 'code',
    props,
    variants,
  };
}
