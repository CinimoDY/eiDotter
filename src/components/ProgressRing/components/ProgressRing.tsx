import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './ProgressRing.css';

export interface ProgressRingProps {
  /** Progress value from 0 to `max`. Quantized into `segments` chunks. */
  value?: number;
  /** Maximum value (default 100). */
  max?: number;
  /** Ring diameter in px (default 64). */
  size?: number;
  /** Ring stroke thickness in px (default 8). */
  thickness?: number;
  /** Number of quantized segments around the ring (default 16). */
  segments?: number;
  /**
   * Stroke colour for filled segments. Any CSS colour. Defaults to the amber
   * brand token via `currentColor`, so it re-themes and can be overridden by
   * setting `color` on a wrapping element.
   */
  color?: string;
  /** Render the quantized percentage in the centre of the ring. */
  showLabel?: boolean;
  /** Enable a phosphor glow on filled segments. */
  glow?: boolean;
  /** Additional CSS class name. */
  className?: string;
  /** Accessible label for screen readers. */
  'aria-label'?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Blocky DOS-style progress ring: the arc is split into `segments` chunky
 * quantized blocks. Filled blocks paint in the ring colour; the remainder
 * stays as a faint track. Driven by a plain `value` prop so the renderer is
 * presentational and swappable. Ported from the Tracker habit app (DMNC-1040),
 * where it powers the hold-to-complete feedback ring.
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      value = 0,
      max = 100,
      size = 64,
      thickness = 8,
      segments = 16,
      color,
      showLabel = false,
      glow = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const segmentCount = Math.max(1, Math.floor(segments));
    const fraction = clamp(max === 0 ? 0 : value / max, 0, 1);
    const filled = Math.floor(fraction * segmentCount);
    // Show the quantized fraction, matching what the ring actually paints.
    const quantizedPct = Math.round((filled / segmentCount) * 100);

    const r = (size - thickness) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const per = circumference / segmentCount;
    const gap = Math.max(2, per / 6);
    const dash = Math.max(0.5, per - gap);

    const stroke = color ?? 'currentColor';

    const arcs = Array.from({ length: segmentCount }, (_, i) => {
      const isFilled = i < filled;
      return (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeOpacity={isFilled ? 1 : 0.18}
          // Draw exactly one segment arc: skip i*per, draw `dash`, then gap.
          strokeDasharray={`0 ${i * per} ${dash} ${circumference}`}
          className={cn(
            'eidotter-progress-ring__seg',
            isFilled && 'eidotter-progress-ring__seg--filled'
          )}
        />
      );
    });

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-progress-ring',
          glow && 'eidotter-progress-ring--glow',
          className
        )}
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuenow={quantizedPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? `Progress: ${quantizedPct}%`}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
          focusable="false"
        >
          {/* Rotate -90° so segment 0 starts at 12 o'clock and fills clockwise. */}
          <g transform={`rotate(-90 ${cx} ${cy})`}>{arcs}</g>
        </svg>
        {showLabel && (
          <span className="eidotter-progress-ring__label font-dos">{quantizedPct}%</span>
        )}
      </div>
    );
  }
);

ProgressRing.displayName = 'ProgressRing';
