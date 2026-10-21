/**
 * FIXTURE ONLY, illustrative. Synthetic data for stories and tests.
 * Nothing here is clinical: bands, units, and numbers are placeholders and
 * must never be copied into a consumer. eidotter ships no medical defaults.
 */
import type { Band } from '../utils/health';

export const FIXTURE_NOTICE = 'FIXTURE ONLY, illustrative';

export const fixtureBands: Band[] = [
  { from: 0, to: 25, tone: 'critical', label: 'Sample band A', unit: 'units' },
  { from: 25, to: 50, tone: 'warning', label: 'Sample band B', unit: 'units' },
  { from: 50, to: 75, tone: 'success', label: 'Sample band C', unit: 'units' },
  { from: 75, to: Infinity, tone: 'info', label: 'Sample band D', unit: 'units' },
];

export interface FixtureSample {
  t: number;
  value: number;
}

/** 12 hourly points on an arbitrary scale. */
export const fixtureSeries: FixtureSample[] = [
  10, 22, 38, 55, 68, 80, 74, 62, 51, 44, 33, 20,
].map((value, t) => ({ t, value }));

/** Decaying "remaining" samples, 0..1 of an arbitrary starting amount. */
export const fixtureDecay: { t: number; remaining: number }[] = [
  1, 0.85, 0.7, 0.55, 0.42, 0.3, 0.2, 0.12, 0.06, 0,
].map((remaining, t) => ({ t, remaining }));

/** Time-in-range style shares per band, summing to 100. */
export const fixtureShares: { band: Band; share: number }[] = [
  { band: fixtureBands[0], share: 5 },
  { band: fixtureBands[1], share: 15 },
  { band: fixtureBands[2], share: 60 },
  { band: fixtureBands[3], share: 20 },
];

export const fixtureValues = {
  current: 62,
  max: 100,
  unit: 'units',
  percent: 93,
  negative: -2.4,
};
