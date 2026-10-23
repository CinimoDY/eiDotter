/**
 * Pure geometry for the Mark's SVG arm connectors (DMNC-1325).
 *
 * All coordinates are MARK-LOCAL: subtract `markRect.x/y` from every badge
 * point so the returned paths live in the Mark's own box origin. This makes
 * the overlay portal-free and scroll-invariant (viewport-relative rects shift
 * equally for mark and badges), pinned by the translation-invariance test.
 *
 * No DOM, no React, no hooks — testable with plain rect objects.
 */

export interface RectLike {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArmPathOptions {
  /** Perpendicular control-point offset in px. Default 24. */
  curvature?: number;
  /**
   * Distance in px from the mark centre at which each arm starts, along the
   * line to its badge. Default 0 (arms start at the centre). The Mark passes
   * its ring radius (`width * MARK_RING_RADIUS_RATIO`) so arms leave from the
   * ring's outer edge (DMNC-1586). Badges whose anchor lies within this radius
   * get no arm.
   */
  startRadius?: number;
}

/**
 * Outer radius of the Logo's pixel ring as a fraction of the Mark's box width:
 * the farthest outer corner of the continuous ring rects (~9.25 viewBox units)
 * from (19,18), the centre of the 22-unit viewBox `8 7 22 22`. The four stray
 * outlying dots are excluded. Pinned to LogoGeometry by a test (DMNC-1586).
 */
export const MARK_RING_RADIUS_RATIO = 9.25 / 22;

/** Round to 2 decimals so path strings are stable for assertions. */
const r2 = (n: number): number => Math.round(n * 100) / 100;

/**
 * Build one quadratic-bezier arm path per badge, from the Mark centre to the
 * midpoint of the badge edge facing the mark. Control points alternate sign
 * for an organic branching feel, clamped so short arms don't balloon.
 */
export function computeArmPaths(
  markRect: RectLike,
  badgeRects: RectLike[],
  options: ArmPathOptions = {},
): string[] {
  const { curvature = 24, startRadius = 0 } = options;

  // jsdom / hidden guard — a zero-sized mark can't anchor arms.
  if (markRect.width === 0 || markRect.height === 0) return [];

  const badges = badgeRects.filter((b) => !(b.width === 0 && b.height === 0));
  if (badges.length === 0) return [];

  // Mark centre in local coords; each arm starts `startRadius` out from it.
  const ox = markRect.width / 2;
  const oy = markRect.height / 2;

  const paths: string[] = [];
  badges.forEach((badge, i) => {
    const bx = badge.x - markRect.x;
    const by = badge.y - markRect.y;

    // Anchor on the badge edge that faces the mark: a badge to the right of the
    // mark uses its LEFT edge; a badge to the left uses its RIGHT edge.
    const ex = bx + badge.width / 2 >= ox ? bx : bx + badge.width;
    const ey = by + badge.height / 2;

    // Start on the circle of radius startRadius, facing the badge anchor.
    const rx = ex - ox;
    const ry = ey - oy;
    const reach = Math.hypot(rx, ry);
    if (reach - startRadius < 1) return;
    const sx = ox + (rx / reach) * startRadius;
    const sy = oy + (ry / reach) * startRadius;

    const dx = ex - sx;
    const dy = ey - sy;
    const dist = Math.hypot(dx, dy);

    // Control point = segment midpoint offset along the perpendicular unit
    // vector. Sign alternates per badge; the dist/3 clamp stops short arms from
    // ballooning past the curvature default.
    const sign = i % 2 === 0 ? 1 : -1;
    const offset = sign * Math.min(curvature, dist / 3);
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;
    const cx = mx + (-dy / dist) * offset;
    const cy = my + (dx / dist) * offset;

    paths.push(`M ${r2(sx)} ${r2(sy)} Q ${r2(cx)} ${r2(cy)} ${r2(ex)} ${r2(ey)}`);
  });

  return paths;
}
