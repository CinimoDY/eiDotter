import React from 'react';
import { cn } from '../../../utils/cn';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'card' | 'figure' | 'timeline';

export interface SkeletonProps {
  /** Placeholder shape */
  variant?: SkeletonVariant;
  /** Number of placeholder lines (text/card/timeline body lines, figure shade rows). Defaults per variant. */
  lines?: number;
  /**
   * Raster animation: a CRT hum-bar glow band rolling top→bottom with a
   * phosphor-decay tail, like the refresh beat on a CGA monitor. Default true.
   * Under prefers-reduced-motion the band is replaced by a gentle opacity
   * breathing; prefers-contrast: high disables all animation.
   */
  animated?: boolean;
  /** Accessible loading announcement */
  label?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * DOS/CGA loading placeholder. Instead of the modern smooth gray shimmer,
 * placeholder lines are rows of shade characters (░ ▒ ▓) — character-cell
 * by character-cell, like a screenful of unrendered text mode — with a CRT
 * hum-bar glow band rolling top→bottom over them, phosphor-decay tail
 * trailing upward, the way the refresh beat rolls down a CGA monitor.
 *
 * Purely presentational: render it while real content loads, then swap it
 * out. The band is compositor-only (transform). Under
 * `prefers-reduced-motion` it is replaced by a gentle opacity breathing;
 * `prefers-contrast: high` disables all animation.
 *
 * Glyph rows are `aria-hidden`; the wrapper announces `label` via
 * `role="status"`.
 */

// Deterministic shade textures — stable across renders/SSR, clipped by the
// container so any width works. Light texture reads as pending body text;
// the dense one as a pending heading / media area.
const TEXTURE_LIGHT = '░░░░▒░░░░░░░▒░░░▒▒░░░░░░▒░░░░░░░▒░░░░▒░░';
const TEXTURE_DENSE = '▒▒▓▒▒▒▒▓▒▒▒▒▒▓▒▒▒▒▒▒▓▒▒▒▒▓▒▒▒▒▒▓▒▒▒▒▒▓▒';
const REPEAT = 6; // 240 cells — wider than any realistic container

const DEFAULT_LINES: Record<SkeletonVariant, number> = {
  text: 3,
  card: 3,
  figure: 4,
  timeline: 2,
};

interface LineProps {
  dense?: boolean;
  width?: 'full' | 'short' | 'meta';
}

const Line: React.FC<LineProps> = ({ dense = false, width = 'full' }) => (
  <span
    className={cn(
      'eidotter-skeleton__line',
      width === 'short' && 'eidotter-skeleton__line--short',
      width === 'meta' && 'eidotter-skeleton__line--meta',
    )}
  >
    {(dense ? TEXTURE_DENSE : TEXTURE_LIGHT).repeat(REPEAT)}
  </span>
);

function renderLines(count: number, dense = false, shortenLast = true): React.ReactNode[] {
  return Array.from({ length: count }, (_, i) => (
    <Line
      key={i}
      dense={dense}
      width={shortenLast && i === count - 1 && count > 1 ? 'short' : 'full'}
    />
  ));
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  lines,
  animated = true,
  label = 'Loading',
  className,
}) => {
  const lineCount = Math.max(1, lines ?? DEFAULT_LINES[variant]);

  let glyphs: React.ReactNode;
  switch (variant) {
    case 'card':
      glyphs = (
        <>
          <Line dense width="meta" />
          {renderLines(lineCount)}
        </>
      );
      break;
    case 'figure':
      glyphs = renderLines(lineCount, true, false);
      break;
    case 'timeline':
      glyphs = (
        <>
          <span className="eidotter-skeleton__marker border-2 border-dos-border-default" />
          <span className="eidotter-skeleton__entry">
            <Line width="meta" />
            {renderLines(lineCount)}
          </span>
        </>
      );
      break;
    default:
      glyphs = renderLines(lineCount);
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'eidotter-skeleton font-dos text-dos-text-muted',
        `eidotter-skeleton--${variant}`,
        animated && 'eidotter-skeleton--animated',
        variant === 'card' && 'border-2 border-dos-border-default bg-dos-bg-secondary p-4',
        variant === 'figure' && 'border-2 border-dos-border-default bg-dos-bg-secondary',
        className,
      )}
    >
      <div aria-hidden="true" className="eidotter-skeleton__glyphs">
        {glyphs}
      </div>
    </div>
  );
};

Skeleton.displayName = 'Skeleton';
