/**
 * Component contract schema — pilot (DMNC-1459).
 *
 * A minimal, well-typed, platform-neutral shape both a code-side extractor
 * and a Figma-side extractor normalize into, so the two can be diffed
 * mechanically instead of compared by hand. Scope is deliberately narrow:
 * this models the "variant" surface (props whose values select a CSS-class
 * or Figma-VARIANT-property option) — not every prop, not documentation
 * blocks, not a11y. See plans/2026-07-31 pilot plan for the full rationale.
 *
 * Neither side is authoritative — both `extract-code-contract.ts` and
 * `extract-figma-contract.ts` produce this same shape, and
 * `diff-contracts.ts` arbitrates between them.
 */

export type ContractPropType = 'string' | 'boolean' | 'enum';

export interface ContractProp {
  name: string;
  type: ContractPropType;
  values?: string[];
  default?: string | boolean;
  required?: boolean;
}

export interface ContractVariantAxis {
  /** Legal values for this axis, in source order. */
  values: string[];
  default?: string;
  /**
   * value → CSS class it maps to. Only the code-side extractor populates
   * this (Figma has no CSS classes); present here so both sides share one
   * type instead of forking into code-only/figma-only variants.
   */
  classMap?: Record<string, string>;
}

export interface ComponentContract {
  component: string;
  source: 'code' | 'figma';
  /** Non-variant props, kept for audit context — not diffed (see diff-contracts.ts). */
  props: ContractProp[];
  /** Variant axes, keyed by prop/property name — the actual diff target. */
  variants: Record<string, ContractVariantAxis>;
}

/**
 * Deterministic JSON serialization (Curtis's "determinism" principle):
 * sorted object keys at every level, stable array order (source order is
 * already stable — arrays are never re-sorted), trailing newline. Two runs
 * over unchanged source must produce a byte-identical file.
 */
export function stableStringify(value: unknown): string {
  return JSON.stringify(sortKeysDeep(value), null, 2) + '\n';
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortKeysDeep);
  }
  if (value !== null && typeof value === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = sortKeysDeep((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return value;
}
