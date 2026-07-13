/**
 * Pure geometry for the Connector's tapered SVG ribbons (DMNC-1388).
 *
 * A ribbon is a filled, closed `<path>` sampled along a cubic bezier from a
 * source point to an attach point, offset by a width profile. The taper is
 * deliberately SUBTLE (locked 2026-07-13): near a straight thin thread, only a
 * whisper thicker where it leaves the yolk. No DOM, no React — testable with
 * literal points.
 */

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RibbonWeight {
  /** Half-width where the ribbon leaves the yolk (thickest). */
  base: number;
  /** Half-width through the middle (thinnest). */
  mid: number;
  /** Half-width swelling back into the attach point. */
  tip: number;
  /** Perpendicular control-point offset for the organic bend. */
  curvature: number;
}

/**
 * Locked weights (2026-07-13 shape proof). `delicate` is the default — a thin
 * product-chrome thread; `medium` reads a touch bolder on large surfaces.
 */
export const CONNECTOR_WEIGHTS: Record<'delicate' | 'medium', RibbonWeight> = {
  delicate: { base: 5, mid: 3.2, tip: 3.6, curvature: 22 },
  medium: { base: 8, mid: 4.4, tip: 5.0, curvature: 30 },
};

/** Number of samples along the centre curve. */
const SAMPLES = 28;

const r2 = (n: number): number => Math.round(n * 100) / 100;
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Half-width at parameter t: thick base → thin middle → slight swell into tip. */
function halfWidthAt(t: number, w: RibbonWeight): number {
  if (t < 0.5) return lerp(w.base, w.mid, easeInOut(t / 0.5));
  return lerp(w.mid, w.tip, easeInOut((t - 0.5) / 0.5));
}

/**
 * The point on the target rect border along the ray from the rect centre toward
 * the source — where the ribbon must STOP (touching the edge, never inside).
 */
export function attachPoint(center: Point, source: Point, rect: Rect): Point {
  const dx = source.x - center.x;
  const dy = source.y - center.y;
  const hw = rect.width / 2;
  const hh = rect.height / 2;
  const tx = dx !== 0 ? hw / Math.abs(dx) : Infinity;
  const ty = dy !== 0 ? hh / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  // Degenerate (zero-size rect, or source at centre) → the centre itself.
  if (!Number.isFinite(t)) return { x: center.x, y: center.y };
  return { x: center.x + dx * t, y: center.y + dy * t };
}

function cubic(p0: Point, c1: Point, c2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return { x: a * p0.x + b * c1.x + c * c2.x + d * p3.x, y: a * p0.y + b * c1.y + c * c2.y + d * p3.y };
}

function cubicTangent(p0: Point, c1: Point, c2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  const a = 3 * mt * mt;
  const b = 6 * mt * t;
  const c = 3 * t * t;
  return {
    x: a * (c1.x - p0.x) + b * (c2.x - c1.x) + c * (p3.x - c2.x),
    y: a * (c1.y - p0.y) + b * (c2.y - c1.y) + c * (p3.y - c2.y),
  };
}

export interface RibbonOptions {
  /** Bend direction for the organic branch. Default 1. */
  sign?: number;
  /** Idle-sway perpendicular offset in px, added to the control points. Default 0. */
  sway?: number;
}

/**
 * Build a closed tapered-ribbon path from `source` to `attach`. Returns an SVG
 * path `d` string (empty when the endpoints coincide).
 */
export function ribbonPath(source: Point, attach: Point, weight: RibbonWeight, options: RibbonOptions = {}): string {
  const { sign = 1, sway = 0 } = options;
  const dx = attach.x - source.x;
  const dy = attach.y - source.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return '';

  const nx = -dy / len;
  const ny = dx / len;
  const c = Math.min(weight.curvature, len / 3);
  const off1 = (c + sway) * sign;
  const off2 = (c * 0.5 - sway * 0.6) * sign;
  const c1: Point = { x: source.x + dx * 0.33 + nx * off1, y: source.y + dy * 0.33 + ny * off1 };
  const c2: Point = { x: source.x + dx * 0.66 + nx * off2, y: source.y + dy * 0.66 + ny * off2 };

  const left: Point[] = [];
  const right: Point[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const p = cubic(source, c1, c2, attach, t);
    const tan = cubicTangent(source, c1, c2, attach, t);
    const tl = Math.hypot(tan.x, tan.y) || 1;
    const mx = -tan.y / tl;
    const my = tan.x / tl;
    const hwid = halfWidthAt(t, weight);
    left.push({ x: p.x + mx * hwid, y: p.y + my * hwid });
    right.push({ x: p.x - mx * hwid, y: p.y - my * hwid });
  }

  let d = `M ${r2(left[0].x)} ${r2(left[0].y)}`;
  for (let i = 1; i <= SAMPLES; i++) d += ` L ${r2(left[i].x)} ${r2(left[i].y)}`;
  for (let i = SAMPLES; i >= 0; i--) d += ` L ${r2(right[i].x)} ${r2(right[i].y)}`;
  d += ' Z';
  return d;
}
