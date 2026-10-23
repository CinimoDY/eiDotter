import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { ProgressRing } from '../../ProgressRing';
import { Skeleton } from '../../Skeleton';
import {
  formatValue,
  isKnown,
  provenanceLabel,
  resolveBand,
  resolveLabels,
  PLACEHOLDER,
} from '../../../utils/health';
import type { Band, HealthLabels, Provenance, Tone, ValueStatus } from '../../../utils/health';
import './Gauge.css';

export interface GaugeProps {
  /** Full label. Always part of the accessible name. */
  label: string;
  /** Shown instead of `label` below the medium container width. */
  shortLabel?: string;
  /** Current value. `null`, `NaN` and `Infinity` render as unknown. */
  value: number | null;
  /** Maximum value (default 100). Zero or negative renders as unknown. */
  max?: number;
  /** Unit of `value`, used only to flag mismatched band units in dev. */
  unit?: string;
  /** Absolute value text shown beneath the percent, e.g. "890 kcal". */
  secondary?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Explicit tone. Wins over `bands`. */
  tone?: Tone;
  /** Data status. */
  status?: ValueStatus;
  /** Tag shown for `estimated` and `modelled` values. */
  provenance?: Provenance;
  /** Consumer-supplied bands. Resolved on the raw value. */
  bands?: Band[];
  /** BCP 47 locale for number formatting (default `en`). */
  locale?: string;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Enable the phosphor glow on the ring. */
  glow?: boolean;
  /** Additional CSS class name. */
  className?: string;
  /** Replaces `label` in the composed accessible name. */
  'aria-label'?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'eidotter-gauge--sm text-dos-text-xs',
  md: 'eidotter-gauge--md text-dos-text-sm',
  lg: 'eidotter-gauge--lg text-dos-text-md',
};

const valueSizeClasses: Record<string, string> = {
  sm: 'text-dos-text-sm',
  md: 'text-dos-display-xs',
  lg: 'text-dos-display-sm',
};

const ringSizes: Record<string, number> = { sm: 72, md: 104, lg: 136 };

/** Splits "720 units" at the first space into the reading and the rest, so the rest can wrap. */
function splitSecondary(text: string): [string, string | null] {
  const i = text.indexOf(' ');
  return i > 0 ? [text.slice(0, i), text.slice(i + 1)] : [text, null];
}

const toneClasses: Record<string, string> = {
  neutral: 'eidotter-tone--neutral',
  info: 'eidotter-tone--info',
  success: 'eidotter-tone--success',
  warning: 'eidotter-tone--warning',
  critical: 'eidotter-tone--critical',
};

/** Segment rhythm per filled tone: SVG strokes cannot take gradient fills (KTD3). */
const toneSegments: Record<string, number> = {
  neutral: 16,
  info: 12,
  success: 16,
  warning: 20,
  critical: 24,
};

const statusClasses: Record<string, string> = {
  ok: '',
  loading: 'eidotter-gauge--loading',
  empty: 'eidotter-gauge--empty',
  stale: 'eidotter-gauge--stale',
  unknown: 'eidotter-gauge--unknown',
};

/**
 * Ring gauge: a quantised ProgressRing arc with a dominant percent, optional
 * secondary value, tone, status, provenance tag and overflow marker.
 * The root owns the `meter` semantics; the ring is decorative (KTD7).
 * Presentational and hook-free, so it stays server-safe.
 */
export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      label,
      shortLabel,
      value,
      max = 100,
      unit,
      secondary,
      size = 'md',
      tone,
      status = 'ok',
      provenance,
      bands,
      locale = 'en',
      labels: labelOverrides,
      glow = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const labels = resolveLabels(labelOverrides);
    const loading = status === 'loading';
    const unknown =
      !isKnown(value) ||
      !(max > 0) ||
      !Number.isFinite(max) ||
      status === 'empty' ||
      status === 'unknown';

    const pct = unknown ? 0 : ((value as number) / max) * 100;
    const overflow = !unknown && (value as number) > max;
    const resolved = resolveBand(unknown ? null : (value as number), bands, unit);
    const effectiveTone = tone ?? resolved.tone;

    const valueText = unknown
      ? PLACEHOLDER
      : formatValue(pct, { locale, percent: true }).text;
    const stale = status === 'stale' && !unknown;
    const valuetext = [unknown || loading ? labels.unknown : valueText, stale && labels.stale]
      .filter(Boolean)
      .join(', ');
    const name = `${ariaLabel ?? label}: ${valuetext}`;
    const sizeKey = size in ringSizes ? size : 'md';
    const diameter = ringSizes[sizeKey];
    const thickness = Math.round(diameter / 8);
    // The small ring's hole cannot hold a secondary line, so it sits under the ring.
    const secondaryBelow = sizeKey === 'sm';
    const [secondaryHead, secondaryTail] = splitSecondary(secondary ?? '');
    const secondaryPart =
      secondary && !unknown && !loading ? (
        <span className="eidotter-gauge__secondary text-dos-text-brand text-dos-text-xs tabular-nums leading-none">
          <span className="eidotter-gauge__secondary-head">{secondaryHead}</span>
          {secondaryTail !== null && (
            <>
              {' '}
              <span className="eidotter-gauge__secondary-tail">{secondaryTail}</span>
            </>
          )}
        </span>
      ) : null;
    const tagText = provenanceLabel(labels, provenance);

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-gauge eidotter-health flex flex-col items-center gap-1 w-full font-dos',
          sizeClasses[size] ?? sizeClasses.md,
          toneClasses[effectiveTone],
          statusClasses[status],
          className,
        )}
        style={{ minWidth: diameter }}
        data-size={sizeKey}
        data-has-short={shortLabel ? 'true' : 'false'}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={unknown ? 100 : max}
        aria-valuenow={unknown || loading ? 0 : Math.max(0, Math.min(value as number, max))}
        aria-valuetext={valuetext}
        aria-label={name}
        aria-busy={loading || undefined}
        {...props}
      >
        <div className="relative inline-flex items-center justify-center">
          <ProgressRing
            decorative
            value={loading ? 0 : pct}
            max={100}
            size={diameter}
            thickness={thickness}
            segments={toneSegments[effectiveTone] ?? 16}
            color={effectiveTone === 'neutral' ? undefined : 'var(--eidotter-fill)'}
            glow={false}
            className={cn(glow && 'eidotter-health-glow')}
          />
          {/* Inset by the ring thickness so the text lives in the hole, not over the ring. */}
          <div
            className="eidotter-gauge__center absolute flex flex-col items-center justify-center min-w-0 text-center leading-none"
            style={{ inset: thickness + 2 }}
          >
            {loading ? (
              <div aria-hidden="true" className="eidotter-gauge__skeleton w-full overflow-hidden">
                <Skeleton variant="figure" lines={2} animated={false} />
              </div>
            ) : (
              <>
                <span
                  className={cn(
                    'eidotter-gauge__value text-dos-text-accent tabular-nums',
                    valueSizeClasses[sizeKey],
                    stale && 'opacity-60',
                  )}
                >
                  {valueText}
                </span>
                {!secondaryBelow && secondaryPart}
              </>
            )}
          </div>
        </div>
        {secondaryBelow && secondaryPart}
        <div className="flex flex-wrap items-center justify-center gap-1 text-dos-text-brand uppercase tracking-wider leading-tight max-w-full">
          {effectiveTone === 'critical' && (
            <span aria-hidden="true" className="eidotter-gauge__glyph text-dos-text-error">
              ▲
            </span>
          )}
          <span className="eidotter-gauge__label truncate" title={label}>
            <span className="eidotter-gauge__label--full">{label}</span>
            {shortLabel && <span className="eidotter-gauge__label--short">{shortLabel}</span>}
          </span>
          {overflow && (
            <span aria-hidden="true" className="eidotter-gauge__overflow text-dos-text-warning">
              +
            </span>
          )}
          {tagText !== null && (
            <span className="eidotter-gauge__provenance border border-dos-border-brand px-1 normal-case">
              {tagText}
            </span>
          )}
          {stale && <span className="eidotter-gauge__stale normal-case">{labels.stale}</span>}
        </div>
        {resolved.label && (
          <span className="eidotter-gauge__band text-dos-text-brand normal-case">
            {resolved.label}
          </span>
        )}
      </div>
    );
  },
);

Gauge.displayName = 'Gauge';
