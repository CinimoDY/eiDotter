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

/** Reads default values from the component's destructured-props parameter (e.g. inside forwardRef). */
function extractDestructuredDefaults(project: ReturnType<Project['getSourceFileOrThrow']>): Record<string, string | boolean> {
  const defaults: Record<string, string | boolean> = {};
  const objectPatterns = project
    .getDescendantsOfKind(SyntaxKind.ArrowFunction)
    .flatMap((fn) => fn.getParameters())
    .map((param) => param.getNameNode())
    .filter(Node.isObjectBindingPattern);

  for (const pattern of objectPatterns) {
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
    if (!Node.isPropertyAssignment(prop)) continue;
    const valueNode = prop.getInitializer();
    if (valueNode && Node.isStringLiteral(valueNode)) {
      map[stripQuotes(prop.getName())] = valueNode.getLiteralValue();
    }
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

  const propsInterface = sourceFile.getInterface(`${config.component}Props`);
  const defaults = extractDestructuredDefaults(sourceFile);

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
