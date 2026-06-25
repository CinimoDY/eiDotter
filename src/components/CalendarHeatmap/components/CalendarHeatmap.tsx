import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './CalendarHeatmap.css';

/** Per-day cell state. `empty` renders blank (days outside the month). */
export type HeatmapStatus = 'success' | 'fail' | 'skip' | 'pending' | 'empty';

export interface CalendarHeatmapProps {
  /** Month to render, as `'YYYY-MM'` (or any `'YYYY-MM-DD'` inside it). */
  month: string;
  /** Map of `'YYYY-MM-DD'` → status. Days absent from the map use `defaultStatus`. */
  statuses?: Record<string, HeatmapStatus>;
  /** Status for in-month days not present in `statuses` (default `'skip'`). */
  defaultStatus?: HeatmapStatus;
  /** First column of the week (default `'monday'`). */
  weekStart?: 'monday' | 'sunday';
  /** Font scale (default `'md'`). */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Colour for `success` (█) cells. Any CSS colour. Defaults to the amber brand
   * token, so it re-themes; override to colour-code per series (e.g. habit colour).
   */
  successColor?: string;
  /** Render the legend row below the grid (default `true`). */
  showLegend?: boolean;
  /** Override legend labels. */
  legendLabels?: Partial<Record<'success' | 'fail' | 'skip' | 'pending', string>>;
  /** Override the per-status glyphs. */
  glyphs?: Partial<Record<HeatmapStatus, string>>;
  /** Additional CSS class name. */
  className?: string;
  /** Accessible label for the grid. Defaults to a month + counts summary. */
  'aria-label'?: string;
}

const DEFAULT_GLYPHS: Record<HeatmapStatus, string> = {
  success: '█',
  fail: '░',
  skip: '·',
  pending: '▒',
  empty: ' ',
};

const LEGEND_ORDER = ['success', 'fail', 'skip', 'pending'] as const;

const DEFAULT_LEGEND = {
  success: 'DONE',
  fail: 'MISS',
  skip: 'OFF',
  pending: 'TODAY',
} as const;

const WEEKDAYS_MON = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const WEEKDAYS_SUN = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const sizeClasses: Record<NonNullable<CalendarHeatmapProps['size']>, string> = {
  sm: 'eidotter-calendar-heatmap--sm',
  md: 'eidotter-calendar-heatmap--md',
  lg: 'eidotter-calendar-heatmap--lg',
};

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Month calendar rendered as DOS block characters — `█` done, `░` miss,
 * `·` off, `▒` pending. Presentational and domain-agnostic: callers pass a
 * `'YYYY-MM-DD'` → status map rather than any domain object. Ported from the
 * Tracker habit app (DMNC-1040), where it visualises a habit's month.
 *
 * All calendar maths run in UTC so the rendered grid never drifts by a day
 * across timezones — the `'YYYY-MM-DD'` keys are treated as plain calendar dates.
 */
export const CalendarHeatmap = forwardRef<HTMLDivElement, CalendarHeatmapProps>(
  (
    {
      month,
      statuses = {},
      defaultStatus = 'skip',
      weekStart = 'monday',
      size = 'md',
      successColor,
      showLegend = true,
      legendLabels,
      glyphs,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const year = Number(month.slice(0, 4));
    const monthIndex = Number(month.slice(5, 7)) - 1;
    const valid =
      Number.isFinite(year) && monthIndex >= 0 && monthIndex <= 11;

    const glyph = { ...DEFAULT_GLYPHS, ...glyphs };
    const legend = { ...DEFAULT_LEGEND, ...legendLabels };

    // Build the week rows (UTC maths — no local-timezone drift).
    const weeks: Array<Array<{ key: string; day: number; status: HeatmapStatus }>> = [];
    let successCount = 0;
    let failCount = 0;

    if (valid) {
      const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
      const firstDow = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay(); // 0 Sun..6 Sat
      const leading = weekStart === 'monday' ? (firstDow + 6) % 7 : firstDow;

      const cells: Array<{ key: string; day: number; status: HeatmapStatus }> = [];
      for (let i = 0; i < leading; i++) {
        cells.push({ key: `lead-${i}`, day: 0, status: 'empty' });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const key = `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
        const status = statuses[key] ?? defaultStatus;
        if (status === 'success') successCount++;
        if (status === 'fail') failCount++;
        cells.push({ key, day, status });
      }
      while (cells.length % 7 !== 0) {
        cells.push({ key: `trail-${cells.length}`, day: 0, status: 'empty' });
      }
      for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
      }
    }

    const weekdays = weekStart === 'monday' ? WEEKDAYS_MON : WEEKDAYS_SUN;
    const monthLabel = valid ? `${MONTHS[monthIndex]} ${year}` : month;
    const gridLabel =
      ariaLabel ?? `${monthLabel}: ${successCount} done, ${failCount} missed`;

    const rootStyle = successColor
      ? ({ '--heatmap-success': successColor } as React.CSSProperties)
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          'eidotter-calendar-heatmap font-dos',
          sizeClasses[size],
          className
        )}
        style={rootStyle}
        {...props}
      >
        <div className="eidotter-calendar-heatmap__grid" role="img" aria-label={gridLabel}>
          <div className="eidotter-calendar-heatmap__row" aria-hidden="true">
            {weekdays.map((d) => (
              <span
                key={d}
                className="eidotter-calendar-heatmap__cell eidotter-calendar-heatmap__head"
              >
                {d}
              </span>
            ))}
          </div>
          {weeks.map((week, w) => (
            <div key={w} className="eidotter-calendar-heatmap__row" aria-hidden="true">
              {week.map((cell) => (
                <span
                  key={cell.key}
                  className={cn(
                    'eidotter-calendar-heatmap__cell',
                    `eidotter-calendar-heatmap__cell--${cell.status}`
                  )}
                >
                  {glyph[cell.status]}
                </span>
              ))}
            </div>
          ))}
        </div>
        {showLegend && (
          // The grid's role="img" aria-label already summarises counts; the
          // glyph legend is a decorative key, hidden from assistive tech.
          <div className="eidotter-calendar-heatmap__legend" aria-hidden="true">
            {LEGEND_ORDER.map((status) => (
              <span key={status} className={`eidotter-calendar-heatmap__cell--${status}`}>
                {glyph[status]} {legend[status]}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CalendarHeatmap.displayName = 'CalendarHeatmap';
