/**
 * extract-code-contract — deterministic code-side component contract extractor (pilot, DMNC-1459).
 *
 * Walks a component's TS source with ts-morph (chosen over react-docgen-typescript,
 * which has no clean path to reading the `variantClasses`/`sizeClasses` object-literal
 * variant maps eidotter actually uses — it's built for prop tables, not variant→class
 * maps) and produces a ComponentContract (scripts/contracts/schema.ts). No AI, no
 * network — same input always produces the same output (Curtis's "determinism"
 * principle; see Button.contract.test.ts for the byte-identical regeneration check).
 *
 * Pure logic only — no file I/O, no CLI entrypoint. Imported directly by
 * Button.contract.test.ts. Run via `npm run extract-code-contract`, which
 * invokes the thin `extract-code-contract.cli.cts` wrapper instead (kept
 * separate because it needs CommonJS-style `__dirname`/CLI-argv handling
 * that this ESM-importable module deliberately avoids).
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
}

export const PILOT_COMPONENTS: ExtractCodeContractConfig[] = [
  {
    component: 'Button',
    sourcePath: 'src/components/Button/components/Button.tsx',
    outputPath: 'src/components/Button/Button.contract.json',
    variantMapNames: { variantClasses: 'variant', sizeClasses: 'size' },
  },
];

function classifyPropType(
  typeNode: import('ts-morph').TypeNode | undefined,
): { type: ContractPropType; values?: string[] } | null {
  if (!typeNode) return null;

  if (Node.isUnionTypeNode(typeNode)) {
    const values: string[] = [];
    for (const member of typeNode.getTypeNodes()) {
      if (!Node.isLiteralTypeNode(member)) return null;
      const literal = member.getLiteral();
      if (!Node.isStringLiteral(literal)) return null;
      values.push(literal.getLiteralValue());
    }
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
      const classified = classifyPropType(member.getTypeNode());
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

  return {
    component: config.component,
    source: 'code',
    props,
    variants,
  };
}
