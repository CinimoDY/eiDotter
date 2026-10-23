import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { formatValue, isKnown, resolveBand, resolveLabels, PLACEHOLDER } from '../../../utils/health';
import type { Band, HealthLabels, Tone } from '../../../utils/health';
import './Meter.css';

export interface MeterProps {
  /** Full label. Always part of the accessible name. */
  label: string;
  /** Shown instead of `label` below the medium container width. */
  shortLabel?: string;
  /** Current value. `null`, `NaN` and `Infinity` render as unknown. */
  value: number | null;
  /** Maximum value (default 100). Zero or negative renders as unknown. */
  max?: number;
  /** Unit appended to the value text and used to flag mismatched band units in dev. */
  unit?: string;
  /** Optimal value (tick) or `[lo, hi]` range (band), on the same scale as `value`. */
  optimal?: number | [number, number];
  /** Bar direction. */
  orientation?: 'vertical' | 'horizontal';
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md';
  /** Explicit tone. Wins over `bands`. */
  tone?: Tone;
  /** Fill pattern. Defaults to the pattern paired with the tone. */
  pattern?: 'solid' | 'dither' | 'hatch' | 'dotted';
  /** Render the bar as this many quantised blocks (round half away). */
  segments?: number;
  /** Consumer-supplied bands. Resolved on the raw value. */
  bands?: Band[];
  /** BCP 47 locale for number formatting (default `en`). */
  locale?: string;
  /** Overrides for the built-in label text. */
  labels?: Partial<HealthLabels>;
  /** Show the value text (default true). The accessible value text is unaffected. */
  showValue?: boolean;
  /** Additional CSS class name. */
  className?: string;
  /** Replaces `label` in the composed accessible name. */
  'aria-label'?: string;
}

const orientationClasses: Record<string, string> = {
  vertical: 'eidotter-meter--vertical flex-col items-center gap-1',
  horizontal: 'eidotter-meter--horizontal flex-row items-center gap-2',
};

const sizeClasses: Record<string, string> = {
  xs: 'eidotter-meter--xs text-dos-text-xs',
  sm: 'eidotter-meter--sm text-dos-text-xs',
  md: 'eidotter-meter--md text-dos-text-sm',
};

const toneClasses: Record<string, string> = {
  neutral: 'eidotter-tone--neutral',
  info: 'eidotter-tone--info',
  success: 'eidotter-tone--success',
  warning: 'eidotter-tone--warning',
  critical: 'eidotter-tone--critical',
};

const patternClasses: Record<string, string> = {
  solid: 'eidotter-fill--solid',
  dither: 'eidotter-fill--dither',
  hatch: 'eidotter-fill--hatch',
  dotted: 'eidotter-fill--dotted',
};

/** Default pattern per tone (KTD3): neutral reuses solid on its own hue. */
const tonePatterns: Record<string, string> = {
  neutral: 'solid',
  info: 'solid',
  success: 'dither',
  warning: 'hatch',
  critical: 'dotted',
};

const round4 = (n: number) => Math.round(n * 10000) / 10000;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** CSS custom properties for the optimal tick or range; `max` must be valid. */
function optimalStyle(
  optimal: number | [number, number] | undefined,
  max: number,
): React.CSSProperties | undefined {
  if (optimal === undefined) return undefined;
  if (Array.isArray(optimal)) {
    const lo = clamp01(optimal[0] / max);
    const hi = clamp01(optimal[1] / max);
    return {
      '--eidotter-meter-optimal-start': String(round4(lo)),
      '--eidotter-meter-optimal-size': String(round4(hi - lo)),
    } as React.CSSProperties;
  }
  return { '--eidotter-meter-optimal': String(round4(clamp01(optimal / max))) } as React.CSSProperties;
}

/**
 * Single-bar meter, vertical or horizontal, with label, value text, optional
 * optimal tick or range, tone with a paired fill pattern, and optional
 * quantised blocks. Text never sits on the fill (R13). Presentational and
 * hook-free, so it stays server-safe.
 */
export const Meter = forwardRef<HTMLDivElement, MeterProps>(
  (
    {
      label,
      shortLabel,
      value,
      max = 100,
      unit,
      optimal,
      orientation = 'vertical',
      size = 'sm',
      tone,
      pattern,
      segments,
      bands,
      locale = 'en',
      labels: labelOverrides,
      showValue = true,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const labels = resolveLabels(labelOverrides);
    const maxValid = max > 0 && Number.isFinite(max);
    const unknown = !isKnown(value) || !maxValid;

    const ratio = unknown ? 0 : clamp01((value as number) / max);
    const overflow = !unknown && (value as number) > max;
    const resolved = resolveBand(unknown ? null : (value as number), bands, unit);
    const effectiveTone = tone ?? resolved.tone;
    const effectivePattern = pattern ?? tonePatterns[effectiveTone] ?? 'solid';
    const fillClass = patternClasses[effectivePattern] ?? patternClasses.solid;

    const valueText = unknown ? PLACEHOLDER : formatValue(value, { locale, unit }).text;
    // Number and unit render in two spans so a narrow MeterGroup can drop the
    // unit onto its own line; the accessible value text stays one string.
    const numberText = unknown ? PLACEHOLDER : formatValue(value, { locale }).text;
    const unitText = unknown ? undefined : unit || undefined;
    const valuetext = unknown ? labels.unknown : valueText;
    const name = `${ariaLabel ?? label}: ${valuetext}`;

    const isRange = Array.isArray(optimal);
    const optimalProps = maxValid ? optimalStyle(optimal, max) : undefined;

    const blockCount = segments !== undefined ? Math.max(0, Math.floor(segments)) : 0;
    const filledBlocks = Math.round(ratio * blockCount);

    const valuePart =
      showValue || overflow ? (
        <div className="eidotter-meter__readout flex items-center gap-1 leading-none">
          {showValue && (
            <span className="eidotter-meter__value text-dos-text-accent tabular-nums text-center">
              <span className="eidotter-meter__number">{numberText}</span>
              {unitText && (
                <>
                  {' '}
                  <span className="eidotter-meter__unit">{unitText}</span>
                </>
              )}
            </span>
          )}
          {overflow && (
            <span aria-hidden="true" className="eidotter-meter__overflow text-dos-text-warning">
              +
            </span>
          )}
        </div>
      ) : null;

    const trackPart = (
      <div className="eidotter-meter__track relative bg-dos-bg-primary border border-dos-border-disabled">
        {blockCount > 0 ? (
          <div className="eidotter-meter__segments" aria-hidden="true">
            {Array.from({ length: blockCount }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'eidotter-meter__segment',
                  i < filledBlocks && `eidotter-meter__segment--filled ${fillClass}`,
                )}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn('eidotter-meter__fill', fillClass)}
            style={{ '--eidotter-meter-fill': String(round4(ratio)) } as React.CSSProperties}
          />
        )}
        {optimalProps && (
          <div
            aria-hidden="true"
            className={cn(
              'eidotter-meter__optimal',
              isRange && 'eidotter-meter__optimal--range',
            )}
            style={optimalProps}
          />
        )}
      </div>
    );

    const labelPart = (
      <div className="eidotter-meter__caption flex flex-wrap items-center justify-center gap-1 text-dos-text-brand uppercase tracking-wider leading-tight min-w-0 max-w-full">
        {effectiveTone === 'critical' && (
          <span aria-hidden="true" className="eidotter-meter__glyph text-dos-text-error">
            ▲
          </span>
        )}
        <span className="eidotter-meter__label truncate" title={label}>
          <span className="eidotter-meter__label--full">{label}</span>
          {shortLabel && <span className="eidotter-meter__label--short">{shortLabel}</span>}
        </span>
        {resolved.label && (
          <span className="eidotter-meter__band normal-case">{resolved.label}</span>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-meter eidotter-health flex font-dos',
          orientationClasses[orientation] ?? orientationClasses.vertical,
          sizeClasses[size] ?? sizeClasses.sm,
          toneClasses[effectiveTone],
          className,
        )}
        data-has-short={shortLabel ? 'true' : 'false'}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={maxValid ? max : 100}
        aria-valuenow={unknown ? 0 : Math.max(0, Math.min(value as number, max))}
        aria-valuetext={valuetext}
        aria-label={name}
        {...props}
      >
        {orientation === 'horizontal' ? (
          <>
            {labelPart}
            {trackPart}
            {valuePart}
          </>
        ) : (
          <>
            {valuePart}
            {trackPart}
            {labelPart}
          </>
        )}
      </div>
    );
  },
);

Meter.displayName = 'Meter';
