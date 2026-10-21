import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { formatValue, resolveLabels, PLACEHOLDER } from '../../../utils/health';
import type { HealthLabels, Tone } from '../../../utils/health';
import './SeriesBars.css';

export interface SeriesBarsPoint {
  /** Tick and table label. */
  label: string;
  /** `null`, `NaN` and `Infinity` render as a placeholder gap. */
  value: number | null;
}

export interface SeriesBarsProps {
  /** Short series, one vertical bar each. */
  points: SeriesBarsPoint[];
  /** Value at full bar height. Defaults to the largest finite value (or goal). */
  max?: number;
  /** Goal value, drawn as a line. */
  goal?: number;
  /** Text shown on the goal line. */
  goalLabel?: string;
  /**
   * Consumer-supplied tone thresholds. A point takes the tone of the entry with
   * the largest `from` that is at or below its value. Without this prop, points
   * at or above `goal` are success and the rest neutral.
   */
  toneFor?: { from: number; tone: Tone }[];
  /** Label every n-th bar (default 1). */
  tickEvery?: number;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** BCP 47 locale for number formatting (default `en`). */
  locale?: string;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Additional CSS class name. */
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'eidotter-series-bars--sm text-dos-text-xs',
  md: 'eidotter-series-bars--md text-dos-text-sm',
  lg: 'eidotter-series-bars--lg text-dos-text-md',
};

const plotClasses: Record<string, string> = {
  sm: 'h-[6rem]',
  md: 'h-[10rem]',
  lg: 'h-[14rem]',
};

const toneClasses: Record<string, string> = {
  neutral: 'eidotter-tone--neutral',
  info: 'eidotter-tone--info',
  success: 'eidotter-tone--success',
  warning: 'eidotter-tone--warning',
  critical: 'eidotter-tone--critical',
};

const toneFills: Record<string, string> = {
  neutral: 'var(--color-semantic-text-muted)',
  info: 'var(--color-semantic-text-info)',
  success: 'var(--color-semantic-background-success)',
  warning: 'var(--color-semantic-text-warning)',
  critical: 'var(--color-semantic-background-error)',
};

const patternClasses: Record<string, string> = {
  neutral: 'eidotter-fill--none',
  info: 'eidotter-fill--solid',
  success: 'eidotter-fill--dither',
  warning: 'eidotter-fill--hatch',
  critical: 'eidotter-fill--dotted',
};

const isKnown = (v: number | null): v is number => typeof v === 'number' && Number.isFinite(v);

/**
 * Short series as vertical bars with an optional goal line. The plot is one
 * `img` with a composed summary; a visually hidden table beside it carries the
 * values for assistive tech. Presentational and hook-free, so server-safe.
 */
export const SeriesBars = forwardRef<HTMLDivElement, SeriesBarsProps>(
  (
    {
      points,
      max,
      goal,
      goalLabel,
      toneFor,
      tickEvery = 1,
      size = 'md',
      locale = 'en',
      labels: labelOverrides,
      className,
      ...props
    },
    ref,
  ) => {
    const labels = resolveLabels(labelOverrides);
    const known = points.map((p) => p.value).filter(isKnown);
    const top = max ?? Math.max(...known, goal ?? 0, 0);
    const scale = top > 0 ? top : 1;
    const thresholds = toneFor ?? (goal !== undefined ? [{ from: goal, tone: 'success' as Tone }] : []);

    const toneOf = (v: number): Tone =>
      thresholds
        .filter((t) => v >= t.from)
        .reduce<{ from: number; tone: Tone } | undefined>(
          (best, t) => (!best || t.from > best.from ? t : best),
          undefined,
        )?.tone ?? 'neutral';

    const text = (v: number | null) => (isKnown(v) ? formatValue(v, { locale }).text : labels.unknown);
    const summary = [
      ...points.map((p) => `${p.label} ${text(p.value)}`),
      ...(goal !== undefined ? [`${goalLabel ?? ''} ${text(goal)}`.trim()] : []),
    ].join(', ');

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-series-bars eidotter-health relative font-dos',
          sizeClasses[size] ?? sizeClasses.md,
          className,
        )}
        {...props}
      >
        <div role="img" aria-label={summary}>
          <div className={cn('eidotter-series-bars__plot relative', plotClasses[size] ?? plotClasses.md)}>
            {goal !== undefined && (
              <div
                className="eidotter-series-bars__goal absolute inset-x-0"
                style={{ bottom: `${(Math.min(goal, scale) / scale) * 100}%` }}
              >
                {goalLabel && (
                  <span className="eidotter-series-bars__goal-tag text-dos-text-brand">{goalLabel}</span>
                )}
              </div>
            )}
            <div className="eidotter-series-bars__cols flex items-end gap-1 h-full">
              {points.map((p, i) => {
                const v = p.value;
                const tone = isKnown(v) ? toneOf(v) : 'neutral';
                return (
                  <div
                    key={i}
                    className="eidotter-series-bars__col flex flex-col justify-end flex-1 min-w-0 h-full"
                    title={`${p.label}: ${text(v)}`}
                  >
                    {isKnown(v) ? (
                      <div
                        className={cn(
                          'eidotter-series-bars__bar w-full',
                          toneClasses[tone],
                          patternClasses[tone],
                        )}
                        style={
                          {
                            height: `${(Math.min(Math.max(v, 0), scale) / scale) * 100}%`,
                            '--eidotter-fill': toneFills[tone],
                          } as React.CSSProperties
                        }
                      />
                    ) : (
                      <span className="eidotter-series-bars__gap text-dos-text-muted text-center">
                        {PLACEHOLDER}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div aria-hidden="true" className="flex gap-1 text-dos-text-muted">
            {points.map((p, i) => (
              <span key={i} className="eidotter-series-bars__tick flex-1 min-w-0 truncate text-center tabular-nums">
                {i % Math.max(tickEvery, 1) === 0 ? p.label : ''}
              </span>
            ))}
          </div>
        </div>
        <table className="sr-only">
          <tbody>
            {points.map((p, i) => (
              <tr key={i}>
                <th scope="row">{p.label}</th>
                <td>{text(p.value)}</td>
              </tr>
            ))}
            {goal !== undefined && (
              <tr>
                <th scope="row">{goalLabel}</th>
                <td>{text(goal)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  },
);

SeriesBars.displayName = 'SeriesBars';
