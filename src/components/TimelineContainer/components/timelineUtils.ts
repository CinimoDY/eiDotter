/**
 * Timeline utility functions for grouping entries and formatting dates.
 * Pure functions with zero external dependencies — uses only native Date/Intl.
 */

import type { TimelineEntryData, DateBucket, ZoomLevel } from './types';

// ─── Date extraction ────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_ABBREVS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function getUTCYear(iso: string): number {
  return new Date(iso).getUTCFullYear();
}

function getUTCMonth(iso: string): number {
  return new Date(iso).getUTCMonth();
}

function getUTCDay(iso: string): number {
  return new Date(iso).getUTCDate();
}

function getUTCHour(iso: string): number {
  return new Date(iso).getUTCHours();
}

// ─── Date formatting ────────────────────────────────────────────────────────

function formatYearLabel(year: number): string {
  return String(year);
}

function formatMonthLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

function formatDayLabel(_year: number, month: number, day: number): string {
  return `${MONTH_ABBREVS[month]} ${day}`;
}

function formatHourLabel(_year: number, month: number, day: number, hour: number): string {
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${MONTH_ABBREVS[month]} ${day}, ${displayHour}${period}`;
}

/** Format a full timestamp: "Mar 15, 2024 at 2:30pm" */
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const month = MONTH_ABBREVS[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const minuteStr = minute > 0 ? `:${String(minute).padStart(2, '0')}` : '';
  return `${month} ${day}, ${year} at ${displayHour}${minuteStr}${period}`;
}

// ─── Period start generators ────────────────────────────────────────────────

function yearPeriodStart(year: number): string {
  return new Date(Date.UTC(year, 0, 1)).toISOString();
}

function monthPeriodStart(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1)).toISOString();
}

function dayPeriodStart(year: number, month: number, day: number): string {
  return new Date(Date.UTC(year, month, day)).toISOString();
}

function hourPeriodStart(year: number, month: number, day: number, hour: number): string {
  return new Date(Date.UTC(year, month, day, hour)).toISOString();
}

// ─── Key extraction ─────────────────────────────────────────────────────────

type KeyExtractor = (entry: TimelineEntryData) => string;
type LabelMaker = (key: string) => string;
type PeriodStartMaker = (key: string) => string;

function groupBy(
  entries: TimelineEntryData[],
  keyFn: KeyExtractor,
  labelFn: LabelMaker,
  periodStartFn: PeriodStartMaker,
  sortOrder: 'asc' | 'desc',
): DateBucket[] {
  const map = new Map<string, TimelineEntryData[]>();
  const keyOrder: string[] = [];

  for (const entry of entries) {
    const key = keyFn(entry);
    const existing = map.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      map.set(key, [entry]);
      keyOrder.push(key);
    }
  }

  keyOrder.sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a));

  for (const [, bucketEntries] of map) {
    bucketEntries.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }

  return keyOrder.map(key => ({
    label: labelFn(key),
    periodStart: periodStartFn(key),
    entries: map.get(key) ?? [],
  }));
}

function yearKey(entry: TimelineEntryData): string {
  return String(getUTCYear(entry.date));
}

function monthKey(entry: TimelineEntryData): string {
  const y = getUTCYear(entry.date);
  const m = getUTCMonth(entry.date);
  return `${y}-${String(m).padStart(2, '0')}`;
}

function dayKey(entry: TimelineEntryData): string {
  const y = getUTCYear(entry.date);
  const m = getUTCMonth(entry.date);
  const d = getUTCDay(entry.date);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function hourKey(entry: TimelineEntryData): string {
  const y = getUTCYear(entry.date);
  const m = getUTCMonth(entry.date);
  const d = getUTCDay(entry.date);
  const h = getUTCHour(entry.date);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}-${String(h).padStart(2, '0')}`;
}

function parseYearKey(key: string) {
  return { year: parseInt(key) };
}

function parseMonthKey(key: string) {
  const [y, m] = key.split('-');
  return { year: parseInt(y), month: parseInt(m) };
}

function parseDayKey(key: string) {
  const [y, m, d] = key.split('-');
  return { year: parseInt(y), month: parseInt(m), day: parseInt(d) };
}

function parseHourKey(key: string) {
  const [y, m, d, h] = key.split('-');
  return { year: parseInt(y), month: parseInt(m), day: parseInt(d), hour: parseInt(h) };
}

// ─── Drill-down filtering ──────────────────────────────────────────────────

/** Prefix lengths for ISO string matching by parent zoom level */
const PERIOD_PREFIX_LENGTH: Record<string, number> = {
  year: 4,   // "2024"
  month: 7,  // "2024-03"
  day: 10,   // "2024-03-15"
};

/**
 * Filter buckets to only those within a drilled-into period.
 * Uses ISO string prefix matching: a year prefix "2024" matches
 * any periodStart starting with "2024", etc.
 *
 * @param buckets - All buckets at the current zoom level
 * @param periodStart - The parent period's periodStart, or null for no filter
 * @param parentZoomLevel - The zoom level of the parent period
 * @returns Filtered buckets (or all buckets if no filter applies)
 */
export function filterBucketsByPeriod(
  buckets: readonly DateBucket[],
  periodStart: string | null,
  parentZoomLevel: ZoomLevel,
): readonly DateBucket[] {
  if (periodStart === null) return buckets;
  if (parentZoomLevel === 'hour') return buckets;

  const prefixLen = PERIOD_PREFIX_LENGTH[parentZoomLevel];
  if (prefixLen === undefined) return buckets;

  const prefix = periodStart.slice(0, prefixLen);
  return buckets.filter(b => b.periodStart.slice(0, prefixLen) === prefix);
}

// ─── Grouping ──────────────────────────────────────────────────────────────

/**
 * Group timeline entries into DateBuckets based on the current zoom level.
 */
export function groupEntriesByZoom(
  entries: TimelineEntryData[],
  zoomLevel: ZoomLevel,
  sortOrder: 'asc' | 'desc' = 'desc',
): DateBucket[] {
  if (entries.length === 0) return [];

  // Filter entries with invalid dates to prevent NaN bucket keys
  const valid = entries.filter(e => !isNaN(new Date(e.date).getTime()));
  if (valid.length === 0) return [];

  switch (zoomLevel) {
    case 'year':
      return groupBy(
        valid,
        yearKey,
        key => { const { year } = parseYearKey(key); return formatYearLabel(year); },
        key => { const { year } = parseYearKey(key); return yearPeriodStart(year); },
        sortOrder,
      );

    case 'month':
      return groupBy(
        valid,
        monthKey,
        key => { const { year, month } = parseMonthKey(key); return formatMonthLabel(year, month); },
        key => { const { year, month } = parseMonthKey(key); return monthPeriodStart(year, month); },
        sortOrder,
      );

    case 'day':
      return groupBy(
        valid,
        dayKey,
        key => { const { year, month, day } = parseDayKey(key); return formatDayLabel(year, month, day); },
        key => { const { year, month, day } = parseDayKey(key); return dayPeriodStart(year, month, day); },
        sortOrder,
      );

    case 'hour':
      return groupBy(
        valid,
        hourKey,
        key => {
          const { year, month, day, hour } = parseHourKey(key);
          return formatHourLabel(year, month, day, hour);
        },
        key => {
          const { year, month, day, hour } = parseHourKey(key);
          return hourPeriodStart(year, month, day, hour);
        },
        sortOrder,
      );
  }
}
