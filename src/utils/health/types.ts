/** Shared value model for the health metabolism component family. */

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export type ValueStatus = 'ok' | 'loading' | 'empty' | 'stale' | 'unknown';

export type Provenance = 'measured' | 'estimated' | 'modelled';

/**
 * A consumer-supplied range. `from` is inclusive, `to` is exclusive.
 * Use `Infinity` for an open end. eidotter ships no clinical bands (KD2).
 */
export interface Band {
  from: number;
  to: number;
  tone: Tone;
  label: string;
  unit?: string;
}

export interface HealthLabels {
  unknown: string;
  stale: string;
  offline: string;
  other: string;
  now: string;
  remaining: string;
  estimated: string;
  modelled: string;
}
