import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { formatValue, isKnown, resolveLabels, PLACEHOLDER } from '../../../utils/health';
import type { FormatValueOptions, HealthLabels, Tone } from '../../../utils/health';
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
  /**
   * Unit appended to every value and the goal in the accessible summary, the
   * value table and the bar titles (e.g. `%` gives "70 %"). Use either this
   * or `format.percent`, not both.
   */
  unit?: string;
  /** Number formatting, the family's `formatValue` options (`digits`, `percent`, `signed`). */
  format?: Pick<FormatValueOptions, 'digits' | 'percent' | 'signed'>;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Additional CSS class name. */
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'eidotter-series-bars--sm text-dos-text-base',
  md: 'eidotter-series-bars--md text-dos-text-base',
  lg: 'eidotter-series-bars--lg text-dos-text-base',
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

/**
 * Neutral hue, set inline. Filled tones take `--eidotter-fill` from the
 * `.eidotter-tone--*` class in health-patterns.css (KTD3), which sets none for
 * neutral, so a neutral fill (e.g. with a pattern override) still paints.
 */
const NEUTRAL_FILL = 'var(--color-semantic-text-muted)';

// Neutral is intentionally unpatterned here (unlike Meter, which reuses solid).
const patternClasses: Record<string, string> = {
  neutral: 'eidotter-fill--none',
  info: 'eidotter-fill--solid',
  success: 'eidotter-fill--dither',
  warning: 'eidotter-fill--hatch',
  critical: 'eidotter-fill--dotted',
};

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
      unit,
      format,
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

    const goalBand = goal !== undefined && !!goalLabel;
    const text = (v: number | null) =>
      isKnown(v)
        ? formatValue(v, { digits: format?.digits, percent: format?.percent, signed: format?.signed, locale, unit }).text
        : labels.unknown;
    // A goal label that already carries the formatted goal as a whole word
    // ("Goal 70 %") is not repeated in the summary ("Goal 70 % 70 %").
    const goalText = goal !== undefined ? text(goal) : '';
    const words = (t: string) => ` ${t.replace(/\s+/g, ' ')} `;
    const goalSummary =
      goalLabel && words(goalLabel).includes(words(goalText))
        ? goalLabel
        : `${goalLabel ?? ''} ${goalText}`.trim();
    const summary = [
      ...points.map((p) => `${p.label} ${text(p.value)}`),
      ...(goal !== undefined ? [goalSummary] : []),
    ].join(', ');
    const step = Math.max(tickEvery, 1);
    const last = points.length - 1;

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
          {/* The goal tag sits in a band reserved above the plot, so it never paints
              over a bar; the plot keeps its height, so the goal line's percentage
              position still matches the bar heights (DMNC-1573). */}
          <div
            className={cn(
              'eidotter-series-bars__frame relative',
              goalBand && 'eidotter-series-bars__frame--goal-band',
            )}
          >
            {goalBand && (
              <span className="eidotter-series-bars__goal-tag text-dos-text-brand">{goalLabel}</span>
            )}
            <div className={cn('eidotter-series-bars__plot relative', plotClasses[size] ?? plotClasses.md)}>
              {goal !== undefined && (
                <div
                  className="eidotter-series-bars__goal absolute inset-x-0"
                  style={{ bottom: `${(Math.min(goal, scale) / scale) * 100}%` }}
                />
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
                              ...(tone === 'neutral' && { '--eidotter-fill': NEUTRAL_FILL }),
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
          </div>
          {/* Tick cells mirror the bar columns. With tickEvery > 1 a label may
              overflow into its empty neighbours instead of truncating; the first
              and last cells pin their label to the plot edges (DMNC-1610). */}
          <div aria-hidden="true" className="eidotter-series-bars__ticks flex gap-1 text-dos-text-muted">
            {points.map((p, i) => (
              <span
                key={i}
                className={cn(
                  'eidotter-series-bars__tick-cell flex flex-1 min-w-0',
                  i === 0 ? 'justify-start' : i === last ? 'justify-end' : 'justify-center',
                )}
              >
                {i % step === 0 && (
                  <span
                    className={cn(
                      'eidotter-series-bars__tick whitespace-nowrap tabular-nums',
                      step === 1 && 'min-w-0 truncate',
                    )}
                  >
                    {p.label}
                  </span>
                )}
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
