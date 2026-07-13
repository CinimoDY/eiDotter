import { computeArmPaths, type RectLike } from './markGeometry';

const mark: RectLike = { x: 0, y: 0, width: 40, height: 40 };

// Parse "M sx sy Q cx cy ex ey" → numbers.
function parse(path: string) {
  const [, sx, sy, , cx, cy, ex, ey] = path.split(' ');
  return {
    sx: Number(sx), sy: Number(sy),
    cx: Number(cx), cy: Number(cy),
    ex: Number(ex), ey: Number(ey),
  };
}

describe('computeArmPaths', () => {
  it('emits one quadratic-bezier path per badge', () => {
    const badges: RectLike[] = [
      { x: 100, y: 10, width: 40, height: 20 },
      { x: 100, y: 80, width: 40, height: 20 },
      { x: -120, y: 40, width: 40, height: 20 },
    ];
    const paths = computeArmPaths(mark, badges);
    expect(paths).toHaveLength(3);
    paths.forEach((p) => expect(p).toMatch(/^M -?\d+(\.\d+)? -?\d+(\.\d+)? Q -?\d+(\.\d+)? -?\d+(\.\d+)? -?\d+(\.\d+)? -?\d+(\.\d+)?$/));
  });

  it('all paths start at the mark centre (local coords)', () => {
    const paths = computeArmPaths(mark, [{ x: 100, y: 10, width: 40, height: 20 }]);
    const { sx, sy } = parse(paths[0]);
    expect(sx).toBe(20);
    expect(sy).toBe(20);
  });

  it('alternates the perpendicular control-point sign between badges', () => {
    // Two identically-placed badges isolate the sign effect.
    const badges: RectLike[] = [
      { x: 100, y: 100, width: 20, height: 20 },
      { x: 100, y: 100, width: 20, height: 20 },
    ];
    const [a, b] = computeArmPaths(mark, badges).map(parse);
    const mx = (a.sx + a.ex) / 2;
    const my = (a.sy + a.ey) / 2;
    // The two control-point offsets are mirror images across the segment.
    expect(a.cx - mx).toBeCloseTo(-(b.cx - mx), 5);
    expect(a.cy - my).toBeCloseTo(-(b.cy - my), 5);
    expect(Math.sign(a.cx - mx)).toBe(-Math.sign(b.cx - mx));
  });

  it('clamps the control offset to dist/3 for short arms', () => {
    // Facing-edge midpoint ~10px from the mark centre.
    const badge: RectLike = { x: 30, y: 15, width: 20, height: 10 };
    const { sx, sy, cx, cy, ex, ey } = parse(computeArmPaths(mark, [badge])[0]);
    const dist = Math.hypot(ex - sx, ey - sy);
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    const offsetMag = Math.hypot(cx - mx, cy - my);
    expect(offsetMag).toBeCloseTo(dist / 3, 2); // clamped (dist/3 < curvature 24)
    expect(offsetMag).toBeLessThanOrEqual(dist / 3 + 0.01);
  });

  it('anchors a right-side badge on its left edge and a left-side badge on its right edge', () => {
    const right = parse(computeArmPaths(mark, [{ x: 100, y: 15, width: 20, height: 10 }])[0]);
    expect(right.ex).toBe(100); // left edge of a badge to the right

    const left = parse(computeArmPaths(mark, [{ x: -100, y: 15, width: 20, height: 10 }])[0]);
    expect(left.ex).toBe(-80); // right edge (x + width) of a badge to the left
  });

  it('is translation-invariant (scroll safety)', () => {
    const badges: RectLike[] = [
      { x: 100, y: 10, width: 40, height: 20 },
      { x: -80, y: 90, width: 40, height: 20 },
    ];
    const base = computeArmPaths(mark, badges);
    const shifted = computeArmPaths(
      { ...mark, x: mark.x + 1000, y: mark.y + 1000 },
      badges.map((b) => ({ ...b, x: b.x + 1000, y: b.y + 1000 })),
    );
    expect(shifted).toEqual(base);
  });

  it('returns [] for empty badges', () => {
    expect(computeArmPaths(mark, [])).toEqual([]);
  });

  it('returns [] when every badge is zero-sized', () => {
    expect(computeArmPaths(mark, [{ x: 5, y: 5, width: 0, height: 0 }])).toEqual([]);
  });

  it('returns [] for a zero-sized mark', () => {
    expect(computeArmPaths({ x: 0, y: 0, width: 0, height: 0 }, [{ x: 100, y: 10, width: 40, height: 20 }])).toEqual([]);
  });

  it('skips a badge whose facing edge coincides with the mark centre (dist < 1)', () => {
    // Facing-edge midpoint lands exactly on the mark centre → degenerate, skipped.
    const badge: RectLike = { x: 20, y: 10, width: 0.5, height: 20 };
    // width filtered? no (height non-zero). center x = 20.25 >= 20 → left edge ex=20, ey=20 == centre.
    expect(computeArmPaths(mark, [badge])).toEqual([]);
  });
});
