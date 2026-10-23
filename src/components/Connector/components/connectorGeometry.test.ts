import {
  attachPoint,
  ribbonPath,
  CONNECTOR_WEIGHTS,
  type Point,
  type Rect,
} from './connectorGeometry';

const W = CONNECTOR_WEIGHTS.delicate;

describe('attachPoint', () => {
  it('stops on the target edge facing the source (never inside)', () => {
    const center: Point = { x: 100, y: 50 };
    const rect: Rect = { x: 80, y: 40, width: 40, height: 20 };
    const source: Point = { x: 0, y: 50 }; // to the left
    const p = attachPoint(center, source, rect);
    expect(p.x).toBe(80); // left edge of a target to the right of the source
    expect(p.y).toBe(50);
  });

  it('picks the vertical edge for a source above the target', () => {
    const center: Point = { x: 50, y: 100 };
    const rect: Rect = { x: 30, y: 90, width: 40, height: 20 };
    const source: Point = { x: 50, y: 0 }; // straight above
    const p = attachPoint(center, source, rect);
    expect(p.x).toBe(50);
    expect(p.y).toBe(90); // top edge
  });

  it('returns the centre for a degenerate zero-size rect', () => {
    const center: Point = { x: 10, y: 10 };
    const p = attachPoint(center, { x: 0, y: 0 }, { x: 10, y: 10, width: 0, height: 0 });
    expect(p).toEqual(center);
  });

  it('returns the centre when the source coincides with the centre', () => {
    const center: Point = { x: 10, y: 10 };
    const p = attachPoint(center, { x: 10, y: 10 }, { x: 0, y: 0, width: 20, height: 20 });
    expect(p).toEqual(center);
  });
});

describe('ribbonPath', () => {
  const source: Point = { x: 0, y: 0 };
  const attach: Point = { x: 200, y: 60 };

  it('returns a closed path starting with M and ending with Z', () => {
    const d = ribbonPath(source, attach, W);
    expect(d.startsWith('M ')).toBe(true);
    expect(d.trimEnd().endsWith('Z')).toBe(true);
    expect((d.match(/L /g) ?? []).length).toBeGreaterThan(10);
  });

  it('is deterministic', () => {
    expect(ribbonPath(source, attach, W)).toBe(ribbonPath(source, attach, W));
  });

  it('returns an empty string when the endpoints coincide', () => {
    expect(ribbonPath(source, { x: 0, y: 0.2 }, W)).toBe('');
  });

  it('changes with a non-zero sway offset', () => {
    expect(ribbonPath(source, attach, W, { sway: 0 })).not.toBe(
      ribbonPath(source, attach, W, { sway: 6 }),
    );
  });

  it('mirrors when the bend sign flips', () => {
    expect(ribbonPath(source, attach, W, { sign: 1 })).not.toBe(
      ribbonPath(source, attach, W, { sign: -1 }),
    );
  });
});

describe('CONNECTOR_WEIGHTS (locked subtle taper)', () => {
  it('is near-straight — base only a whisper thicker than the middle', () => {
    // "basically a straight line" — the base/mid ratio must stay well under 2×.
    expect(CONNECTOR_WEIGHTS.delicate.base / CONNECTOR_WEIGHTS.delicate.mid).toBeLessThan(2);
  });

  it('swells slightly back into the attach (tip > mid)', () => {
    expect(CONNECTOR_WEIGHTS.delicate.tip).toBeGreaterThan(CONNECTOR_WEIGHTS.delicate.mid);
  });

  it('delicate is thinner than medium', () => {
    expect(CONNECTOR_WEIGHTS.delicate.base).toBeLessThan(CONNECTOR_WEIGHTS.medium.base);
  });
});
