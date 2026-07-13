'use client';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { computeArmPaths } from './markGeometry';
import './Mark.css';

/** Stable empty-array reference so the no-arms early return can't loop setState. */
const EMPTY: string[] = [];

export interface MarkArmsConfig {
  /** Element within which badge targets are discovered (e.g. a ref to <Header>). */
  scopeRef: React.RefObject<HTMLElement | null>;
  /** Explicit badge refs — takes precedence over selector discovery. */
  targetRefs?: React.RefObject<HTMLElement | null>[];
  /**
   * Selector for badge discovery inside `scopeRef`. Default
   * `.eidotter-header__category` — the stable class the Header context badge
   * row emits (DMNC-1326 contract).
   */
  targetSelector?: string;
  /** Bump when the badge set changes and DOM mutation can't be observed (escape hatch). */
  refreshKey?: React.Key;
}

export interface MarkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Size in px (or CSS length). Default 48. */
  size?: number | string;
  /** Accessible label. Default 'eiDotter'. Empty string → decorative (aria-hidden). */
  label?: string;
  /** Enable the border-radius morph loop. Default true. */
  morph?: boolean;
  /**
   * Arm-connector configuration. Omit to render the mark alone.
   *
   * Caveats:
   * - Any `overflow: hidden` / `clip` ancestor between the Mark and the badges
   *   amputates the arms (paths extend beyond the Mark's own box).
   * - Pure position changes with no size change anywhere are covered by
   *   window-resize + the scope ResizeObserver in practice; use `refreshKey` as
   *   the escape hatch if a layout shift is missed.
   * - `arms` is for the conventional badge ROW only — it is mutually exclusive
   *   with the future Header `layout="tentacle"` mode (PLAN-tentacle-menu),
   *   which draws its own overlay: transforms fire neither ResizeObserver nor a
   *   childList MutationObserver, so `arms` can never track transformed tips.
   */
  arms?: MarkArmsConfig;
}

/**
 * eiDotter Mark — a small organic blob that continuously morphs its silhouette
 * (a ~6s border-radius loop) with an optional set of SVG arm connectors drawn
 * from the mark to a variable set of nav badges, measured at runtime via
 * getBoundingClientRect(). Arms redraw on resize and on badge-set change, never
 * intercept pointer events, and are aria-hidden.
 *
 * The root class `eidotter-mark` is a stable contract — the future tentacle
 * mode discovers the anchor via `scope.querySelector('.eidotter-mark')`; never
 * rename it.
 *
 * There is NO rAF work in this design, so no `prefersReducedMotion()` call is
 * needed. Any FUTURE rAF animation (e.g. arm draw-in) MUST gate on
 * `prefersReducedMotion()` (src/utils/prefersReducedMotion.ts) plus a CSS media
 * block.
 */
export const Mark = forwardRef<HTMLDivElement, MarkProps>(
  ({ size = 48, label = 'eiDotter', morph = true, arms, className, style, ...rest }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [paths, setPaths] = useState<string[]>(EMPTY);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // useEffect (NOT useLayoutEffect): the scope is typically an ANCESTOR
    // (e.g. <Header><Mark arms={{ scopeRef: headerRef }} /></Header>). Layout
    // effects run bottom-up, so an ancestor's ref is still null during a child's
    // layout effect — arms would never wire. Passive effects run after the whole
    // commit, when every ref (scope included) is attached. The one-frame-later
    // arm paint is imperceptible; the blob is already on screen.
    useEffect(() => {
      if (!arms) {
        setPaths(EMPTY);
        return;
      }
      const root = rootRef.current;
      const scope = arms.scopeRef.current;
      if (!root) return;

      let targets: HTMLElement[] = [];

      const update = () => {
        const markRect = root.getBoundingClientRect();
        const next = computeArmPaths(
          markRect,
          targets.map((t) => t.getBoundingClientRect()),
        );
        setPaths((prev) =>
          prev.length === next.length && prev.every((p, i) => p === next[i]) ? prev : next,
        );
      };

      const collectTargets = () =>
        arms.targetRefs
          ? arms.targetRefs.map((r) => r.current).filter((el): el is HTMLElement => !!el)
          : scope
            ? Array.from(scope.querySelectorAll<HTMLElement>(arms.targetSelector ?? '.eidotter-header__category'))
            : [];

      const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;

      const wire = () => {
        ro?.disconnect();
        targets = collectTargets();
        ro?.observe(root);
        if (scope) ro?.observe(scope);
        targets.forEach((t) => ro?.observe(t));
        update();
      };
      wire();

      // Badge-set change: RE-QUERY + RE-OBSERVE, never reuse the stale list.
      const mo =
        scope && typeof MutationObserver !== 'undefined' ? new MutationObserver(wire) : undefined;
      if (scope) mo?.observe(scope, { childList: true, subtree: true });

      window.addEventListener('resize', update);
      return () => {
        ro?.disconnect();
        mo?.disconnect();
        window.removeEventListener('resize', update);
      };
      // Depend on the arms CONFIG fields, never the arms object identity
      // (consumers inline it → re-wiring every render).
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arms?.scopeRef, arms?.targetSelector, arms?.refreshKey, arms?.targetRefs?.length, arms ? 1 : 0]);

    return (
      <div
        ref={setRefs}
        role={label ? 'img' : undefined}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        className={cn('eidotter-mark relative inline-block', className)}
        style={{ width: size, height: size, ...style }}
        {...rest}
      >
        {arms && (
          <svg
            className="eidotter-mark__arms pointer-events-none absolute inset-0 h-full w-full overflow-visible text-dos-text-accent"
            aria-hidden="true"
            focusable="false"
          >
            {paths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={2} />
            ))}
          </svg>
        )}
        <span
          className={cn(
            'eidotter-mark__blob relative block h-full w-full',
            morph && 'eidotter-mark__blob--morph',
          )}
        />
      </div>
    );
  },
);

Mark.displayName = 'Mark';
