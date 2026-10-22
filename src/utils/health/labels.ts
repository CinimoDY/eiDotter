import type { HealthLabels, Provenance } from './types';

export const defaultLabels: HealthLabels = {
  unknown: 'unknown',
  stale: 'stale',
  offline: 'offline',
  other: 'other',
  now: 'now',
  remaining: 'remaining',
  estimated: 'estimated',
  modelled: 'modelled',
};

/** Merge consumer overrides over the English defaults. */
export function resolveLabels(overrides?: Partial<HealthLabels>): HealthLabels {
  return { ...defaultLabels, ...overrides };
}

/** Tag text for `estimated` and `modelled` values; any other provenance has none. */
export function provenanceLabel(labels: HealthLabels, p?: Provenance): string | null {
  return p === 'estimated' || p === 'modelled' ? labels[p] : null;
}
