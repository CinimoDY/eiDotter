import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { formatValue, resolveLabels } from '../../../utils/health';
import type { HealthLabels, Tone } from '../../../utils/health';
import './RangeBar.css';

export interface RangeBarSegment {
  /** Stable id, used by `target.segmentId`. */
  id: string;
  /** Segment name, shown in the legend and the accessible summary. */
  label: string;
  /** Share of the whole, 0-100. Non-finite counts as 0. */
  share: number;
  tone: Tone;
  /** Fill pattern. Defaults to the pattern paired with `tone`. */
  pattern?: 'solid' | 'dither' | 'hatch' | 'dotted' | 'none';
  /** Bound text shown in the legend, e.g. "< 1". */
  bound?: string;
  /** Duration text shown in the legend, e.g. "14 h". */
  duration?: string;
}

export interface RangeBarProps {
  /** Ordered segments. Shares are normalised to 100. */
  segments: RangeBarSegment[];
  /** Stack direction (default vertical). */
  orientation?: 'vertical' | 'horizontal';
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Render the legend list (default true). */
  showLegend?: boolean;
  /** Target tick on one segment. `minShare` is the share the segment should reach; the tick sits at that point along the segment, clamped to its end. */
  target?: { segmentId: string; minShare: number; label: string };
  /** Floor for a segment's flex weight so tiny segments stay visible (default 0.6). */
  minSegmentShare?: number;
  /** Inline percent shows only at or above this share (default 8). */
  labelThreshold?: number;
  /** BCP 47 locale for number formatting (default `en`). */
  locale?: string;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Additional CSS class name. */
  className?: string;
}

const orientationClasses: Record<string, string> = {
  vertical: 'eidotter-range-bar--vertical',
  horizontal: 'eidotter-range-bar--horizontal',
};

const sizeClasses: Record<string, string> = {
  sm: 'eidotter-range-bar--sm text-dos-text-xs',
  md: 'eidotter-range-bar--md text-dos-text-sm',
  lg: 'eidotter-range-bar--lg text-dos-text-md',
};

/** Bar thickness and length per orientation and size. */
const trackClasses: Record<string, string> = {
  'vertical-sm': 'w-[1rem] h-[8rem]',
  'vertical-md': 'w-[1.5rem] h-[12rem]',
  'vertical-lg': 'w-[2rem] h-[16rem]',
  'horizontal-sm': 'h-[1rem] w-full',
  'horizontal-md': 'h-[1.5rem] w-full',
  'horizontal-lg': 'h-[2rem] w-full',
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

/** Reserved id for the synthesized remainder, so it cannot collide with a consumer id. */
const OTHER_ID = '__eidotter-other';

// Neutral is intentionally unpatterned here (unlike Meter, which reuses solid).
const tonePatterns: Record<string, string> = {
  neutral: 'none',
  info: 'solid',
  success: 'dither',
  warning: 'hatch',
  critical: 'dotted',
};

const patternClasses: Record<string, string> = {
  none: 'eidotter-fill--none',
  solid: 'eidotter-fill--solid',
  dither: 'eidotter-fill--dither',
  hatch: 'eidotter-fill--hatch',
  dotted: 'eidotter-fill--dotted',
};

interface Item extends RangeBarSegment {
  weight: number;
  /** Resolved tone key (unknown tones fall back to neutral). */
  toneKey: string;
  /** Resolved fill-pattern class. */
  patternClass: string;
}

const resolveItem = (s: RangeBarSegment, weight: number): Item => {
  const toneKey = toneClasses[s.tone] ? s.tone : 'neutral';
  const pattern = s.pattern ?? tonePatterns[toneKey];
  return { ...s, weight, toneKey, patternClass: patternClasses[pattern] ?? patternClasses.solid };
};

const clean = (n: number) => Math.round(n * 1e6) / 1e6;

/**
 * Stacked range bar: ordered segments sized by share, an optional target tick
 * and a legend. Percent text sits in a lane beside the bar, never on a
 * patterned fill (R13). The bar is a single `img` with a composed summary.
 * Presentational and hook-free, so it stays server-safe.
 */
export const RangeBar = forwardRef<HTMLDivElement, RangeBarProps>(
  (
    {
      segments,
      orientation = 'vertical',
      size = 'md',
      showLegend = true,
      target,
      minSegmentShare = 0.6,
      labelThreshold = 8,
      locale = 'en',
      labels: labelOverrides,
      className,
      ...props
    },
    ref,
  ) => {
    const labels = resolveLabels(labelOverrides);
    const shares = segments.map((s) => (Number.isFinite(s.share) && s.share > 0 ? s.share : 0));
    const sum = clean(shares.reduce((a, b) => a + b, 0));

    const items: Item[] = segments.map((s, i) =>
      resolveItem(s, clean(sum > 100 ? (shares[i] / sum) * 100 : shares[i])),
    );
    if (sum < 100 && !segments.some((s) => s.id === OTHER_ID)) {
      items.push(
        resolveItem(
          { id: OTHER_ID, label: labels.other, share: 0, tone: 'neutral' },
          clean(100 - sum),
        ),
      );
    }

    const pct = (n: number) => formatValue(n, { locale, percent: true }).text;
    const summary = items.map((s) => `${s.label} ${pct(s.weight)}`).join(', ');

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-range-bar eidotter-health flex gap-3 font-dos',
          // Vertical: the legend wraps under the bar when bar and legend do not
          // fit side by side in the containing width (DMNC-1610).
          orientation === 'horizontal' ? 'flex-col' : 'flex-row flex-wrap items-start',
          orientationClasses[orientation] ?? orientationClasses.vertical,
          sizeClasses[size] ?? sizeClasses.md,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'eidotter-range-bar__track flex gap-1',
            orientation === 'horizontal' ? 'flex-col w-full' : 'flex-row',
          )}
        >
          <div
            role="img"
            aria-label={summary}
            className={cn(
              'eidotter-range-bar__bar flex shrink-0',
              orientation === 'horizontal' ? 'flex-row' : 'flex-col',
              trackClasses[`${orientation}-${size}`] ?? trackClasses['vertical-md'],
            )}
          >
            {items.map((s) => {
              const isTarget = target?.segmentId === s.id;
              return (
                <div
                  key={s.id}
                  data-segment-id={s.id}
                  className={cn(
                    'eidotter-range-bar__seg relative',
                    toneClasses[s.toneKey],
                    s.patternClass,
                  )}
                  style={
                    {
                      flexGrow: Math.max(s.weight, minSegmentShare),
                      flexBasis: 0,
                      ...(s.toneKey === 'neutral' && { '--eidotter-fill': NEUTRAL_FILL }),
                    } as React.CSSProperties
                  }
                >
                  {isTarget && target && (
                    <span
                      aria-hidden="true"
                      className="eidotter-range-bar__target absolute"
                      style={{
                        [orientation === 'horizontal' ? 'left' : 'top']: `${Math.min(
                          Math.max(target.minShare / (s.weight || 1), 0),
                          1,
                        ) * 100}%`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className={cn(
              'eidotter-range-bar__lane flex tabular-nums text-dos-text-accent',
              orientation === 'horizontal' ? 'flex-row w-full' : 'flex-col',
            )}
          >
            {items.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'eidotter-range-bar__cell flex items-center justify-center gap-x-2 gap-y-1 min-w-0',
                  orientation === 'horizontal' ? 'flex-col' : 'flex-row justify-start',
                )}
                style={{ flexGrow: Math.max(s.weight, minSegmentShare), flexBasis: 0 }}
              >
                {s.weight >= labelThreshold && (
                  <span className="eidotter-range-bar__pct">{pct(s.weight)}</span>
                )}
                {/* The gap separates percent and target label on screen; the space
                    keeps them apart in copied and extracted text ("61% Goal"). */}
                {s.weight >= labelThreshold && target?.segmentId === s.id && ' '}
                {target?.segmentId === s.id && (
                  <span className="eidotter-range-bar__target-label text-dos-text-brand whitespace-nowrap">
                    {target.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        {showLegend && (
          <ul className="eidotter-range-bar__legend flex flex-col gap-1 list-none p-0 m-0 min-w-0 max-w-full">
            {items.map((s) => {
              return (
                <li
                  key={s.id}
                  className="eidotter-range-bar__row flex items-baseline gap-2"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'eidotter-range-bar__swatch inline-block shrink-0 w-[0.75rem] h-[0.75rem]',
                      toneClasses[s.toneKey],
                      s.patternClass,
                    )}
                    style={
                      {
                        ...(s.toneKey === 'neutral' && { '--eidotter-fill': NEUTRAL_FILL }),
                      } as React.CSSProperties
                    }
                  />
                  {/* The name wins width (DMNC-1612): name and meta (percent and
                      duration) share a wrapping line, so when both do not fit
                      the meta moves under the name, right-aligned, before the
                      name has to wrap. Names wrap at spaces rather than truncate;
                      a bound moves to the next line whole, so "> 90" never splits
                      (DMNC-1610). A word breaks only when it alone is wider than
                      the row. */}
                  <span className="eidotter-range-bar__text flex flex-1 flex-wrap items-baseline gap-x-2 min-w-0">
                    <span className="eidotter-range-bar__name text-dos-text-primary flex-auto min-w-0 max-w-full break-words">
                      {s.label}
                      {s.bound && (
                        <>
                          {' '}
                          <span className="eidotter-range-bar__bound text-dos-text-muted whitespace-nowrap">{s.bound}</span>
                        </>
                      )}
                    </span>
                    <span className="eidotter-range-bar__meta ml-auto flex flex-wrap items-baseline justify-end gap-x-2 max-w-full">
                      <span className="text-dos-text-accent tabular-nums">{pct(s.weight)}</span>
                      {s.duration && (
                        <span className="eidotter-range-bar__duration text-dos-text-muted tabular-nums text-right">
                          {s.duration}
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);

RangeBar.displayName = 'RangeBar';
