/**
 * Pure resampling for DecayStrip. No absorption or insulin math lives here
 * (KTD5): the consumer supplies `remaining` samples and this only bins them.
 */

/** Epoch milliseconds, or an ISO 8601 string. */
export type TimeInput = number | string;

export interface DecaySample {
  t: TimeInput;
  /** Share still active, 0..1 (0 = gone, 1 = all of it). */
  remaining: number;
}

export interface DecayCell {
  /** Cell start, epoch ms, inclusive. */
  start: number;
  /** Cell end, epoch ms, exclusive (the last cell includes the window end). */
  end: number;
  /** Mean `remaining` of the samples in the span, the nearest earlier sample when empty, or null. */
  value: number | null;
}

export function toMs(t: TimeInput): number {
  return typeof t === 'number' ? t : Date.parse(t);
}

/**
 * Split `window` into `columns` equal cells. A cell's value is the mean of the
 * samples whose time falls in its span; an empty cell carries the value of
 * the nearest earlier sample, or null when no earlier sample exists.
 */
export function resample(
  samples: DecaySample[],
  window: { from: TimeInput; to: TimeInput },
  columns: number,
): DecayCell[] {
  const from = toMs(window.from);
  const to = toMs(window.to);
  const span = (to - from) / columns;
  const points = samples
    .map((s) => ({ t: toMs(s.t), v: s.remaining }))
    .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v))
    .sort((a, b) => a.t - b.t);

  const cells: DecayCell[] = [];
  let next = 0;
  let carry: number | null = null;
  for (let i = 0; i < columns; i++) {
    const start = from + i * span;
    const end = i === columns - 1 ? to : from + (i + 1) * span;
    const last = i === columns - 1;
    while (next < points.length && points[next].t < start) carry = points[next++].v;
    let sum = 0;
    let count = 0;
    while (next < points.length && (points[next].t < end || (last && points[next].t === end))) {
      sum += points[next].v;
      carry = points[next++].v;
      count++;
    }
    cells.push({ start, end, value: count > 0 ? sum / count : carry });
  }
  return cells;
}
