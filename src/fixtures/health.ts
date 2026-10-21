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

/**
 * Dashboard and glance-strip fixtures (U9). FIXTURE ONLY, illustrative.
 * Every label, value, band and unit is a placeholder with no clinical meaning.
 */
export const fixtureDashboard = {
  notice: FIXTURE_NOTICE,
  /** Sample "as of" text owned by the story; components get `status`, not timestamps. */
  asOf: 'Sample time, FIXTURE ONLY, illustrative',
  gauges: [
    { label: 'Sample energy', value: 72, secondary: '720 units' },
    { label: 'Sample hydration', value: 48, secondary: '480 units' },
    { label: 'Sample muscle', value: 61, secondary: '610 units' },
    { label: 'Sample fat', value: 33, secondary: '330 units' },
  ],
  /** Seven vertical reserves, optimal range on the same 0..100 scale. */
  reserves: [
    { label: 'Sample reserve 1', shortLabel: 'R1', value: 82, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 2', shortLabel: 'R2', value: 64, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 3', shortLabel: 'R3', value: 41, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 4', shortLabel: 'R4', value: 90, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 5', shortLabel: 'R5', value: 55, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 6', shortLabel: 'R6', value: 18, optimal: [50, 75] as [number, number] },
    { label: 'Sample reserve 7', shortLabel: 'R7', value: 70, optimal: [50, 75] as [number, number] },
  ],
  /** Micro grid of horizontal xs meters. */
  micro: [
    { label: 'Sample micro 1', value: 30 },
    { label: 'Sample micro 2', value: 58 },
    { label: 'Sample micro 3', value: 76 },
    { label: 'Sample micro 4', value: 12 },
    { label: 'Sample micro 5', value: 94 },
    { label: 'Sample micro 6', value: 47 },
  ],
  /** Five-band range bar, shares sum to 100. */
  rangeSegments: [
    { id: 'a', label: 'Sample band A', share: 4, tone: 'critical' as const, bound: 'low', duration: '1 h' },
    { id: 'b', label: 'Sample band B', share: 11, tone: 'warning' as const, bound: 'mid-low', duration: '3 h' },
    { id: 'c', label: 'Sample band C', share: 58, tone: 'success' as const, bound: 'mid', duration: '14 h' },
    { id: 'd', label: 'Sample band D', share: 19, tone: 'info' as const, bound: 'mid-high', duration: '4 h' },
    { id: 'e', label: 'Sample band E', share: 8, tone: 'neutral' as const, bound: 'high', duration: '2 h' },
  ],
  rangeTarget: { segmentId: 'c', minShare: 50, label: 'Sample target' },
  /** Seven short bars with a goal line. */
  series: [
    { label: 'D1', value: 40 },
    { label: 'D2', value: 65 },
    { label: 'D3', value: 80 },
    { label: 'D4', value: 55 },
    { label: 'D5', value: 92 },
    { label: 'D6', value: null },
    { label: 'D7', value: 70 },
  ],
  seriesGoal: 75,
  seriesGoalLabel: 'Sample goal',
  /** Decay rows. Meal and dose differ in tone and provenance. */
  decayItems: [
    { id: 'meal', label: 'Sample meal', amount: 40, unit: 'units', remainingShare: 0.55, provenance: 'estimated' as const },
    { id: 'dose', label: 'Sample dose', amount: 2, unit: 'units', remainingShare: 0.3, provenance: 'modelled' as const },
  ],
  vitals: [
    { id: 'v1', label: 'Sample vital 1', value: 64, unit: 'units', secondary: 'sample' },
    { id: 'v2', label: 'Sample vital 2', value: 0, pair: [120, 80] as [number, number], unit: 'units', secondary: 'sample' },
    { id: 'v3', label: 'Sample vital 3', value: 97, unit: 'units', secondary: 'sample' },
    { id: 'v4', label: 'Sample vital 4', value: null, status: 'stale' as const, secondary: 'sample' },
    { id: 'v5', label: 'Sample vital 5', value: 36.5, unit: 'units', secondary: 'sample' },
  ],
  /** Glance-strip tiles. `tone` drives the story-side emphasis rule. */
  glance: [
    { id: 'g1', label: 'Sample one', value: 12, tone: 'critical' as const },
    { id: 'g2', label: 'Sample two', value: 38, tone: 'warning' as const },
    { id: 'g3', label: 'Sample three', value: 84, tone: 'success' as const },
    { id: 'g4', label: 'Sample four', value: 9, tone: 'critical' as const },
  ],
};
