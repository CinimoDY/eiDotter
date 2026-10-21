import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Gauge } from '../../Gauge';
import { EmptyState } from '../../EmptyState';
import { formatValue, isKnown, provenanceLabel, resolveLabels } from '../../../utils/health';
import type { HealthLabels, Provenance, Tone } from '../../../utils/health';
import { normaliseSamples, resample, toMs } from './resample';
import type { DecaySample, TimeInput } from './resample';
import './DecayStrip.css';

export interface DecayStripItem {
  /** Stable key for the row. */
  id: string;
  label: string;
  /** Starting amount, e.g. 40. `null` renders as unknown. */
  amount: number | null;
  unit: string;
  /** Share still active, 0..1. `null`, `NaN` and `Infinity` render as unknown. */
  remainingShare: number | null;
  /** Required: where the share comes from. */
  provenance: Provenance;
}

export interface DecayStripProps {
  /** What is still active. An empty list renders EmptyState; the strip still renders. */
  items: DecayStripItem[];
  /**
   * Consumer-computed decay curve. `t` is epoch ms or an ISO string;
   * `remaining` is a 0..1 share. eidotter does no absorption math (KTD5).
   */
  samples: DecaySample[];
  /** Current time, epoch ms or ISO string. Pass it in; the strip never reads the clock. */
  now: TimeInput;
  /** Time span the strip covers. */
  window: { from: TimeInput; to: TimeInput };
  /** Required: where the samples come from. */
  provenance: Provenance;
  /** Size variant. `sm` renders items as a text list, `md` and `lg` as small Gauges. */
  size?: 'sm' | 'md' | 'lg';
  /** Tone of the strip and the item Gauges. */
  tone?: Tone;
  /** Number of strip cells (default 24). */
  columns?: number;
  /** BCP 47 locale for numbers and times (default `en`). */
  locale?: string;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Opt in to a polite live region and the now-marker pulse (R14). */
  announce?: boolean;
  /** Additional CSS class name. */
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'eidotter-decay-strip--sm text-dos-text-xs',
  md: 'eidotter-decay-strip--md text-dos-text-sm',
  lg: 'eidotter-decay-strip--lg text-dos-text-md',
};

const toneClasses: Record<string, string> = {
  neutral: 'eidotter-tone--neutral',
  info: 'eidotter-tone--info',
  success: 'eidotter-tone--success',
  warning: 'eidotter-tone--warning',
  critical: 'eidotter-tone--critical',
};

/** Progress glyph ladder, empty to full. */
const LADDER = ['░', '▒', '▓', '█'];
const MARKER = '│';
const NO_DATA = '·';

function glyph(value: number | null): string {
  if (value === null) return NO_DATA;
  const v = Math.min(1, Math.max(0, value));
  return LADDER[Math.round(v * (LADDER.length - 1))];
}

/**
 * Time from `now` until the curve reaches zero for good (the first zero
 * sample after the last positive one), as locale text. Null when the curve
 * never reaches zero or is already at zero before `now`.
 */
function timeToZero(samples: DecaySample[], now: number, locale: string): string | null {
  const points = normaliseSamples(samples);
  let lastPositive = -1;
  points.forEach((p, i) => {
    if (p.v > 0) lastPositive = i;
  });
  const zero = points.slice(lastPositive + 1).find((p) => p.v <= 0);
  if (!zero || !Number.isFinite(now) || zero.t < now) return null;
  const minutes = (zero.t - now) / 60_000;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });
  return minutes < 60
    ? rtf.format(Math.round(minutes), 'minute')
    : rtf.format(Math.round(minutes / 6) / 10, 'hour');
}

/**
 * Horizontal time strip of what is still active (a meal, a dose): past cells
 * as stepped block glyphs scaled by the consumer's `remaining` samples, future
 * cells dimmed, and a now marker. Item rows sit above the strip.
 * The strip is `role="img"` with a composed summary, so the glyphs are never
 * the only reading. Presentational and hook-free, so it stays server-safe.
 */
export const DecayStrip = forwardRef<HTMLDivElement, DecayStripProps>(
  (
    {
      items,
      samples,
      now,
      window,
      provenance,
      size = 'md',
      tone = 'neutral',
      columns = 24,
      locale = 'en',
      labels: labelOverrides,
      announce = false,
      className,
      ...props
    },
    ref,
  ) => {
    const labels = resolveLabels(labelOverrides);
    const nowMs = toMs(now);
    const cells = resample(samples, window, columns);
    const time = new Intl.DateTimeFormat(locale, { timeStyle: 'short' });
    const fromText = time.format(toMs(window.from));
    const toText = time.format(toMs(window.to));
    const tag = (p: Provenance) => provenanceLabel(labels, p);
    const zeroPercent = formatValue(0, { locale, percent: true }).text;

    const rows = items.map((item) => {
      const amountText = formatValue(item.amount, { locale, unit: item.unit }).text;
      const share = isKnown(item.remainingShare) ? item.remainingShare : null;
      const shareText =
        share === null
          ? labels.unknown
          : `${formatValue(share * 100, { locale, percent: true }).text} ${labels.remaining}`;
      return { item, amountText, share, shareText, tagText: tag(item.provenance) };
    });

    const zeroText = timeToZero(samples, nowMs, locale);
    const stripTag = tag(provenance);
    const summary = [
      ...rows.map(
        (r) =>
          `${r.item.label} ${r.amountText}: ${r.shareText}${r.tagText ? `, ${r.tagText}` : ''}`,
      ),
      `${fromText}–${toText}`,
      Number.isFinite(nowMs) && `${labels.now} ${time.format(nowMs)}`,
      zeroText && `${zeroPercent} ${zeroText}`,
      stripTag,
    ]
      .filter(Boolean)
      .join('; ');

    const compact = size === 'sm';

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-decay-strip eidotter-health flex flex-col gap-2 w-full min-w-0 font-dos text-dos-text-brand',
          sizeClasses[size] ?? sizeClasses.md,
          toneClasses[tone],
          className,
        )}
        {...props}
      >
        {items.length === 0 ? (
          <EmptyState
            title={`${zeroPercent} ${labels.remaining}`}
            className="py-2"
          />
        ) : (
          <ul className={cn('flex gap-2 min-w-0', compact ? 'flex-col' : 'flex-wrap')}>
            {rows.map((r) => (
              <li
                key={r.item.id}
                className={cn(
                  'eidotter-decay-strip__item min-w-0',
                  compact ? 'flex flex-wrap items-baseline gap-2 tabular-nums' : 'flex-1',
                )}
              >
                {compact ? (
                  <>
                    <span className="truncate text-dos-text-accent" title={r.item.label}>
                      {r.item.label}
                    </span>
                    <span>{r.amountText}</span>
                    <span>{r.shareText}</span>
                    {r.tagText && (
                      <span className="eidotter-decay-strip__item-provenance border border-dos-border-brand px-1">
                        {r.tagText}
                      </span>
                    )}
                  </>
                ) : (
                  <Gauge
                    label={r.item.label}
                    value={r.share === null ? null : r.share * 100}
                    secondary={r.item.amount === null ? undefined : r.amountText}
                    size="sm"
                    tone={tone}
                    provenance={r.item.provenance}
                    locale={locale}
                    labels={labelOverrides}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
        <div
          className="eidotter-decay-strip__strip flex items-center gap-2 min-w-0 tabular-nums"
          role="img"
          aria-label={summary}
        >
          <span className="eidotter-decay-strip__from shrink-0">{fromText}</span>
          <span
            className="eidotter-decay-strip__cells flex-1 min-w-0 overflow-hidden whitespace-nowrap leading-none"
            style={tone === 'neutral' ? undefined : { color: 'var(--eidotter-fill)' }}
          >
            {cells.map((cell, i) => {
              const last = i === cells.length - 1;
              const isNow =
                nowMs >= cell.start && (nowMs < cell.end || (last && nowMs === cell.end));
              const future = !isNow && nowMs < cell.start && nowMs >= cells[0].start;
              const state = isNow ? 'now' : future ? 'future' : 'past';
              return (
                <span
                  key={i}
                  className={cn(
                    'eidotter-decay-strip__cell',
                    `eidotter-decay-strip__cell--${state}`,
                    future && 'opacity-50',
                    isNow && 'text-dos-text-accent',
                    isNow && announce && 'eidotter-health-pulse',
                  )}
                >
                  {isNow ? MARKER : glyph(cell.value)}
                </span>
              );
            })}
          </span>
          <span className="eidotter-decay-strip__to shrink-0">{toText}</span>
        </div>
        {stripTag && (
          <span className="eidotter-decay-strip__provenance self-start border border-dos-border-brand px-1">
            {stripTag}
          </span>
        )}
        {announce && (
          <p className="sr-only" aria-live="polite">
            {summary}
          </p>
        )}
      </div>
    );
  },
);

DecayStrip.displayName = 'DecayStrip';
