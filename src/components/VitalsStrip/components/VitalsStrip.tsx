import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Skeleton } from '../../Skeleton';
import { formatValue, isKnown, resolveBand, resolveLabels } from '../../../utils/health';
import type { Band, HealthLabels, Tone, ValueStatus } from '../../../utils/health';
import './VitalsStrip.css';

export interface VitalTile {
  /** Stable key for the tile. */
  id: string;
  /** Tile label. Always part of the accessible name. */
  label: string;
  /** Single value. `null`, `NaN` and `Infinity` render as offline or unknown. Ignored when `pair` is set. */
  value: number | null;
  /** Unit shown after the value. */
  unit?: string;
  /** Muted line below the value, e.g. a reading time. */
  secondary?: string;
  /** Paired reading rendered as "a/b", e.g. [124, 78]. */
  pair?: [number, number];
  /** Explicit tone. Wins over `bands`. */
  tone?: Tone;
  /** Data status. */
  status?: ValueStatus;
  /** Consumer-supplied bands, resolved on the raw value (or the first pair part). */
  bands?: Band[];
}

export interface VitalsStripProps {
  /** Tiles to render, in order. */
  tiles: VitalTile[];
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
  sm: 'eidotter-vitals-strip--sm gap-1 text-dos-text-xs',
  md: 'eidotter-vitals-strip--md gap-2 text-dos-text-sm',
  lg: 'eidotter-vitals-strip--lg gap-2 text-dos-text-md',
};

const toneClasses: Record<string, string> = {
  neutral: 'eidotter-tone--neutral',
  info: 'eidotter-tone--info',
  success: 'eidotter-tone--success',
  warning: 'eidotter-tone--warning',
  critical: 'eidotter-tone--critical',
};

const statusClasses: Record<string, string> = {
  ok: '',
  loading: 'eidotter-vitals-strip__tile--loading',
  empty: 'eidotter-vitals-strip__tile--empty',
  stale: 'eidotter-vitals-strip__tile--stale',
  unknown: 'eidotter-vitals-strip__tile--unknown',
};

/** Replacement text for a tile with no value: loading, then offline, then unknown; else null. */
function tileStateText(
  flags: { loading: boolean; offline: boolean; unknown: boolean },
  labels: HealthLabels,
): string | null {
  if (flags.loading) return labels.unknown;
  if (flags.offline) return labels.offline;
  if (flags.unknown) return labels.unknown;
  return null;
}

/**
 * Monitor strip of vital tiles. Tiles are rendered here with Stat's size and
 * text token classes rather than by importing Stat, which is a client
 * component (KTD4). Presentational and hook-free, so it stays server-safe.
 */
export const VitalsStrip = forwardRef<HTMLDivElement, VitalsStripProps>(
  ({ tiles, size = 'md', locale = 'en', labels: labelOverrides, className, ...props }, ref) => {
    const labels = resolveLabels(labelOverrides);

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-vitals-strip eidotter-health flex flex-wrap w-full font-dos',
          sizeClasses[size] ?? sizeClasses.md,
          className,
        )}
        {...props}
      >
        {tiles.map((t) => {
          const status = t.status ?? 'ok';
          const loading = status === 'loading';
          const raw = t.pair ? t.pair[0] : t.value;
          const known = t.pair ? isKnown(t.pair[0]) && isKnown(t.pair[1]) : isKnown(t.value);
          const offline = status === 'empty' || (status === 'ok' && !t.pair && t.value === null);
          const unknown = offline || status === 'unknown' || !known;
          const stale = status === 'stale' && !unknown;

          const resolved = resolveBand(unknown ? null : raw, t.bands, t.unit);
          const tone = t.tone ?? resolved.tone;

          const valueText = unknown
            ? null
            : t.pair
              ? formatValue(t.pair[0], { locale, max: t.pair[1] }).text
              : formatValue(t.value, { locale }).text;
          const stateText = tileStateText({ loading, offline, unknown }, labels);
          const name = [
            `${t.label}: ${stateText ?? [valueText, t.unit].filter(Boolean).join(' ')}`,
            stale && labels.stale,
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <div
              key={t.id}
              role="group"
              aria-label={name}
              aria-busy={loading || undefined}
              className={cn(
                'eidotter-vitals-strip__tile flex flex-col gap-0.5 border border-dos-border-default p-2',
                toneClasses[tone],
                statusClasses[status],
                tone === 'critical' &&
                  'eidotter-vitals-strip__marker border-l-4 border-dos-border-error',
              )}
            >
              <span
                className="flex items-center gap-1 text-dos-text-brand uppercase tracking-wider leading-tight"
              >
                {tone === 'critical' && (
                  <span aria-hidden="true" className="text-dos-text-error">
                    ▲
                  </span>
                )}
                <span className="truncate" title={t.label}>
                  {t.label}
                </span>
              </span>
              {loading ? (
                <div aria-hidden="true" className="w-full overflow-hidden">
                  <Skeleton variant="figure" lines={1} animated={false} />
                </div>
              ) : (
                /* Display size comes from VitalsStrip.css (a per-size custom property that
                   steps down in narrow strips), not a Tailwind text-* utility: twMerge
                   would treat a second text-* class as a colour conflict and drop the
                   accent colour. The reading never wraps or widens the tile; the unit
                   moves under it when both do not fit on one line (DMNC-1573). */
                <span className="eidotter-vitals-strip__value text-dos-text-accent leading-none tabular-nums flex flex-wrap items-baseline gap-x-1 min-w-0">
                  <span className="eidotter-vitals-strip__reading min-w-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {/* Stale dims the large number only; the small unit keeps full contrast. */}
                    {stale ? (
                      <span className="opacity-60">{valueText}</span>
                    ) : stateText !== null ? (
                      // State words are prose, not a reading: body size, not display size.
                      <span className="eidotter-vitals-strip__state text-dos-text-sm">{stateText}</span>
                    ) : (
                      valueText
                    )}
                  </span>
                  {valueText && t.unit && (
                    <>
                      {' '}
                      <span className="eidotter-vitals-strip__unit whitespace-nowrap text-[0.5em] text-dos-text-brand">
                        {t.unit}
                      </span>
                    </>
                  )}
                </span>
              )}
              {stale && <span className="eidotter-vitals-strip__stale">{labels.stale}</span>}
              {t.secondary && !unknown && (
                <span className="eidotter-vitals-strip__secondary text-dos-text-muted leading-tight">
                  {t.secondary}
                </span>
              )}
              {resolved.label && (
                <span className="eidotter-vitals-strip__band text-dos-text-brand leading-tight">
                  {resolved.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

VitalsStrip.displayName = 'VitalsStrip';
