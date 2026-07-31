/**
 * extract-figma-contract — deterministic Figma-side component contract extractor (pilot, DMNC-1459).
 *
 * Reads the already-committed `figma-snapshots/web-ds.json` (fetched via Figma's REST
 * API by `fetch-figma-snapshot.ts` — no MCP bridge, no live agent session needed to run
 * this) and normalizes a COMPONENT_SET's `componentPropertyDefinitions` into the shared
 * ComponentContract shape (scripts/contracts/schema.ts).
 *
 * `componentPropertyDefinitions` is already an axis-level representation (e.g. Button's
 * "variant" axis lists its 6 legal options once), not Figma's exploded per-instance
 * cross-product (Button has 120 child instances = 6 variant × 5 size × 4 state). Reading
 * the definitions instead of walking children is what keeps this normalized (Curtis's
 * "favor normalized over redundant" — restating a decision 120 times is the trap this
 * avoids for free).
 *
 * Figma's raw property `type` (VARIANT/BOOLEAN/TEXT/INSTANCE_SWAP) is translated into
 * the shared, platform-neutral vocabulary rather than passed through raw (Curtis's
 * "favor independent over platform biased").
 *
 * Pure logic only — no file I/O, no CLI entrypoint. Imported directly by
 * Button.contract.test.ts. Run via `npm run extract-figma-contract`, which
 * invokes the thin `extract-figma-contract.cli.cts` wrapper instead.
 */

import type { ComponentContract, ContractProp, ContractPropType, ContractVariantAxis } from './schema';

export interface FigmaComponentPropertyDefinition {
  type: 'VARIANT' | 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP';
  defaultValue: string | boolean;
  variantOptions?: string[];
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  componentPropertyDefinitions?: Record<string, FigmaComponentPropertyDefinition>;
  children?: FigmaNode[];
}

export interface FigmaExtractTarget {
  component: string;
  /** Name of the COMPONENT_SET node in the Figma document tree. */
  figmaNodeName: string;
  /** Path to write the contract JSON, relative to repo root (informational — the CLI wrapper does the writing). */
  outputPath: string;
}

export const PILOT_COMPONENTS: FigmaExtractTarget[] = [
  {
    component: 'Button',
    figmaNodeName: 'Button',
    outputPath: 'figma-snapshots/contracts/Button.contract.json',
  },
];

function findComponentSet(node: FigmaNode | undefined, name: string): FigmaNode | null {
  if (!node) return null;
  if (node.type === 'COMPONENT_SET' && node.name === name) return node;
  for (const child of node.children ?? []) {
    const found = findComponentSet(child, name);
    if (found) return found;
  }
  return null;
}

/** Translates Figma's raw property type into the shared platform-neutral vocabulary. */
function toContractPropType(figmaType: FigmaComponentPropertyDefinition['type']): ContractPropType {
  if (figmaType === 'BOOLEAN') return 'boolean';
  if (figmaType === 'VARIANT') return 'enum';
  return 'string'; // TEXT, INSTANCE_SWAP — not visually a class-bearing variant axis
}

export function extractFigmaContract(target: FigmaExtractTarget, snapshot: unknown): ComponentContract {
  const document = (snapshot as { document?: FigmaNode }).document;
  const componentSet = findComponentSet(document, target.figmaNodeName);
  if (!componentSet) {
    throw new Error(`[extract-figma-contract] No COMPONENT_SET named "${target.figmaNodeName}" found in snapshot`);
  }

  const definitions = componentSet.componentPropertyDefinitions ?? {};
  const props: ContractProp[] = [];
  const variants: Record<string, ContractVariantAxis> = {};

  for (const [name, def] of Object.entries(definitions)) {
    const type = toContractPropType(def.type);
    const prop: ContractProp = { name, type, required: true };
    if (def.variantOptions) prop.values = def.variantOptions;
    if (typeof def.defaultValue !== 'undefined') prop.default = def.defaultValue;
    props.push(prop);

    if (def.type === 'VARIANT' && def.variantOptions) {
      variants[name] = {
        values: def.variantOptions,
        default: String(def.defaultValue),
      };
    }
  }

  return {
    component: target.component,
    source: 'figma',
    props,
    variants,
  };
}
