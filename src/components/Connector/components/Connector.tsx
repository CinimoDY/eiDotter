'use client';

import React, { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import { attachPoint, ribbonPath, CONNECTOR_WEIGHTS, type Point } from './connectorGeometry';
import './Connector.css';

export interface ConnectorTarget {
  /** The anchor element the ribbon connects to. */
  ref: React.RefObject<HTMLElement | null>;
  /**
   * End colour for the amber→category gradient (any CSS colour). Omit for a
   * solid-amber ribbon (the blog-spine treatment).
   */
  color?: string;
}

export interface ConnectorProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /** The hub/source element the ribbons radiate from (e.g. the Mark). */
  sourceRef: React.RefObject<HTMLElement | null>;
  /** Targets to connect to. */
  targets: ConnectorTarget[];
  /** Ribbon weight. Default 'delicate'. */
  weight?: 'delicate' | 'medium';
  /** Idle sway. Default true; forced off under prefers-reduced-motion. */
  sway?: boolean;
  /** Bump to force a re-measure when layout shifts without a resize/mutation. */
  refreshKey?: React.Key;
}

const SWAY_SPEED = 0.0011;
const SWAY_AMPLITUDE = 4;

/**
 * Connector — organic tapered SVG ribbons from a source node (the Mark) to N
 * anchors, re-flowing as they move (DMNC-1388). Each ribbon is a filled tapered
 * `<path>` (CSS strokes can't taper): amber at the yolk base → the target's
 * category colour near the attach (solid amber when no colour). Aims at each
 * target's centre but STOPS at the border — touching the edge, never inside.
 *
 * The overlay is purely decorative (`aria-hidden`, `focusable="false"`,
 * `pointer-events: none`) — navigation lives in the real DOM links underneath.
 * Render it inside a `position: relative` container that spans the source +
 * targets; the SVG fills it (`absolute inset-0`) and its own box is the
 * coordinate origin, so everything is scroll-invariant.
 *
 * Paths mutate imperatively (per frame during sway); React only owns the
 * structure (one `<path>` + gradient per target). The amber base is
 * `currentColor` (themeable via `text-dos-text-accent`); the sway loop is
 * compositor-friendly and disabled under `prefers-reduced-motion`.
 */
export const Connector = forwardRef<SVGSVGElement, ConnectorProps>(
  ({ sourceRef, targets, weight = 'delicate', sway = true, refreshKey, className, ...rest }, ref) => {
    const uid = useId().replace(/[:]/g, '');
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const gradRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
    const rafRef = useRef<number | null>(null);
    // Read the live targets/weight in draw so a prop change never leaves a stale
    // closure (targets objects are typically inlined by consumers).
    const targetsRef = useRef(targets);
    targetsRef.current = targets;
    const weightRef = useRef(weight);
    weightRef.current = weight;

    const setSvgRef = useCallback(
      (node: SVGSVGElement | null) => {
        svgRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const gradientId = (i: number) => `eidotter-connector-${uid}-${i}`;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const draw = (swayT: number) => {
        const svgRect = svg.getBoundingClientRect();
        const src = sourceRef.current;
        if (!src) return;
        const sr = src.getBoundingClientRect();
        const source: Point = {
          x: sr.left - svgRect.left + sr.width / 2,
          y: sr.top - svgRect.top + sr.height / 2,
        };
        const w = CONNECTOR_WEIGHTS[weightRef.current] ?? CONNECTOR_WEIGHTS.delicate;
        const swaying = sway && !prefersReducedMotion();

        targetsRef.current.forEach((t, i) => {
          const el = t.ref.current;
          const path = pathRefs.current[i];
          if (!path) return;
          if (!el) {
            path.setAttribute('d', '');
            return;
          }
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) {
            path.setAttribute('d', '');
            return;
          }
          const rect = { x: r.left - svgRect.left, y: r.top - svgRect.top, width: r.width, height: r.height };
          const center: Point = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const attach = attachPoint(center, source, rect);
          const sign = i % 2 === 0 ? 1 : -1;
          const swayAmt = swaying ? Math.sin(swayT * SWAY_SPEED + i * 1.7) * SWAY_AMPLITUDE : 0;
          path.setAttribute('d', ribbonPath(source, attach, w, { sign, sway: swayAmt }));

          const grad = gradRefs.current[i];
          if (grad) {
            grad.setAttribute('x1', String(source.x));
            grad.setAttribute('y1', String(source.y));
            grad.setAttribute('x2', String(attach.x));
            grad.setAttribute('y2', String(attach.y));
          }
        });
      };

      let running = false;
      const stop = () => {
        running = false;
        if (rafRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
      const frame = (ts: number) => {
        draw(ts);
        if (running && typeof requestAnimationFrame !== 'undefined') {
          rafRef.current = requestAnimationFrame(frame);
        }
      };
      const start = () => {
        if (sway && !prefersReducedMotion() && typeof requestAnimationFrame !== 'undefined') {
          if (!running) {
            running = true;
            rafRef.current = requestAnimationFrame(frame);
          }
        } else {
          draw(0);
        }
      };

      const remeasure = () => {
        // Static re-measure (resize / mutation). The sway loop, when active,
        // already redraws every frame off live rects.
        if (!running) draw(0);
      };

      const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : undefined;
      const observeTargets = () => {
        ro?.disconnect();
        ro?.observe(svg);
        if (sourceRef.current) ro?.observe(sourceRef.current);
        targetsRef.current.forEach((t) => t.ref.current && ro?.observe(t.ref.current));
      };
      observeTargets();

      // Catch position shifts (siblings reflowing, badges reordering) AND target
      // element swaps that keep the same count: re-observe the CURRENT targets
      // (mirrors Mark's re-wire) so a resize of a swapped element is still caught,
      // then redraw. Only childList/subtree is watched — the draw loop's
      // attribute writes (`d`, gradient coords) aren't observed, so this can't loop.
      const container = svg.parentElement;
      const mo =
        container && typeof MutationObserver !== 'undefined'
          ? new MutationObserver(() => {
              observeTargets();
              remeasure();
            })
          : undefined;
      if (container) mo?.observe(container, { childList: true, subtree: true });

      window.addEventListener('resize', remeasure);
      start();

      return () => {
        stop();
        ro?.disconnect();
        mo?.disconnect();
        window.removeEventListener('resize', remeasure);
      };
      // Re-wire on target-count / weight / sway / refreshKey changes. Colour
      // changes flow through render (gradient stops) + the live targetsRef;
      // target element swaps at the same count are re-observed by the MO above
      // (or bump refreshKey for a full re-wire).
    }, [sourceRef, targets.length, weight, sway, refreshKey]);

    return (
      <svg
        ref={setSvgRef}
        className={cn(
          'eidotter-connector pointer-events-none absolute inset-0 h-full w-full overflow-visible text-dos-text-accent',
          className,
        )}
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        <defs>
          {targets.map((t, i) => (
            <linearGradient
              key={i}
              id={gradientId(i)}
              gradientUnits="userSpaceOnUse"
              ref={(node) => {
                gradRefs.current[i] = node;
              }}
            >
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="78%" stopColor={t.color ?? 'currentColor'} />
            </linearGradient>
          ))}
        </defs>
        {targets.map((t, i) => (
          <path
            key={i}
            d=""
            fill={`url(#${gradientId(i)})`}
            ref={(node) => {
              pathRefs.current[i] = node;
            }}
          />
        ))}
      </svg>
    );
  },
);

Connector.displayName = 'Connector';
