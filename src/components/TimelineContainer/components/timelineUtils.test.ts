import { groupEntriesByZoom, formatTimestamp, filterBucketsByPeriod } from './timelineUtils';
import type { TimelineEntryData, DateBucket } from './types';

const makeEntry = (id: string, date: string): TimelineEntryData => ({
  id,
  type: 'event',
  date,
  title: `Entry ${id}`,
  kind: 'text' as const,
  content: `Content for ${id}`,
  tags: [],
});

const entries: TimelineEntryData[] = [
  makeEntry('1', '2024-01-15T10:00:00Z'),
  makeEntry('2', '2024-01-15T14:30:00Z'),
  makeEntry('3', '2024-03-10T09:00:00Z'),
  makeEntry('4', '2025-02-20T16:00:00Z'),
];

describe('groupEntriesByZoom', () => {
  it('returns empty array for empty entries', () => {
    expect(groupEntriesByZoom([], 'year')).toEqual([]);
  });

  it('filters out entries with invalid dates', () => {
    const mixed = [
      makeEntry('valid', '2024-01-15T10:00:00Z'),
      makeEntry('bad', 'not-a-date'),
      makeEntry('also-bad', ''),
    ];
    const buckets = groupEntriesByZoom(mixed, 'year');
    expect(buckets).toHaveLength(1);
    expect(buckets[0].entries).toHaveLength(1);
    expect(buckets[0].entries[0].id).toBe('valid');
  });

  it('returns empty array when all dates are invalid', () => {
    const bad = [makeEntry('bad', 'nope')];
    expect(groupEntriesByZoom(bad, 'month')).toEqual([]);
  });

  describe('year level', () => {
    it('groups by year', () => {
      const buckets = groupEntriesByZoom(entries, 'year', 'asc');
      expect(buckets).toHaveLength(2);
      expect(buckets[0].label).toBe('2024');
      expect(buckets[0].entries).toHaveLength(3);
      expect(buckets[1].label).toBe('2025');
      expect(buckets[1].entries).toHaveLength(1);
    });

    it('sorts descending', () => {
      const buckets = groupEntriesByZoom(entries, 'year', 'desc');
      expect(buckets[0].label).toBe('2025');
      expect(buckets[1].label).toBe('2024');
    });
  });

  describe('month level', () => {
    it('groups by month', () => {
      const buckets = groupEntriesByZoom(entries, 'month', 'asc');
      expect(buckets).toHaveLength(3);
      expect(buckets[0].label).toBe('January 2024');
      expect(buckets[0].entries).toHaveLength(2);
      expect(buckets[1].label).toBe('March 2024');
      expect(buckets[2].label).toBe('February 2025');
    });
  });

  describe('day level', () => {
    it('groups by day', () => {
      const buckets = groupEntriesByZoom(entries, 'day', 'asc');
      expect(buckets).toHaveLength(3);
      expect(buckets[0].label).toBe('Jan 15');
      expect(buckets[0].entries).toHaveLength(2);
    });
  });

  describe('hour level', () => {
    it('groups by hour', () => {
      const buckets = groupEntriesByZoom(entries, 'hour', 'asc');
      expect(buckets).toHaveLength(4);
      expect(buckets[0].label).toBe('Jan 15, 10am');
      expect(buckets[1].label).toBe('Jan 15, 2pm');
    });
  });

  describe('sort order within buckets', () => {
    it('sorts entries within bucket ascending', () => {
      const buckets = groupEntriesByZoom(entries, 'day', 'asc');
      const jan15 = buckets[0];
      expect(jan15.entries[0].id).toBe('1');
      expect(jan15.entries[1].id).toBe('2');
    });

    it('sorts entries within bucket descending', () => {
      const buckets = groupEntriesByZoom(entries, 'day', 'desc');
      const jan15 = buckets.find(b => b.label === 'Jan 15')!;
      expect(jan15.entries[0].id).toBe('2');
      expect(jan15.entries[1].id).toBe('1');
    });
  });
});

describe('filterBucketsByPeriod', () => {
  const monthBuckets: DateBucket[] = [
    { label: 'January 2024', periodStart: '2024-01-01T00:00:00.000Z', entries: [] },
    { label: 'March 2024', periodStart: '2024-03-01T00:00:00.000Z', entries: [] },
    { label: 'February 2025', periodStart: '2025-02-01T00:00:00.000Z', entries: [] },
  ];

  const dayBuckets: DateBucket[] = [
    { label: 'Mar 1', periodStart: '2024-03-01T00:00:00.000Z', entries: [] },
    { label: 'Mar 10', periodStart: '2024-03-10T00:00:00.000Z', entries: [] },
    { label: 'Mar 15', periodStart: '2024-03-15T00:00:00.000Z', entries: [] },
    { label: 'Apr 1', periodStart: '2024-04-01T00:00:00.000Z', entries: [] },
  ];

  it('year period at month zoom returns only that year\'s months', () => {
    const result = filterBucketsByPeriod(monthBuckets, '2024-01-01T00:00:00.000Z', 'year');
    expect(result).toHaveLength(2);
    expect(result[0].label).toBe('January 2024');
    expect(result[1].label).toBe('March 2024');
  });

  it('month period at day zoom returns only that month\'s days', () => {
    const result = filterBucketsByPeriod(dayBuckets, '2024-03-01T00:00:00.000Z', 'month');
    expect(result).toHaveLength(3);
    expect(result[0].label).toBe('Mar 1');
    expect(result[1].label).toBe('Mar 10');
    expect(result[2].label).toBe('Mar 15');
  });

  it('null period returns all buckets', () => {
    const result = filterBucketsByPeriod(monthBuckets, null, 'year');
    expect(result).toHaveLength(3);
  });

  it('period matching no buckets returns empty array', () => {
    const result = filterBucketsByPeriod(monthBuckets, '2023-01-01T00:00:00.000Z', 'year');
    expect(result).toEqual([]);
  });

  it('prefix extraction: month level extracts 7-char prefix', () => {
    // "2024-03-15T10:00:00.000Z" with parentZoomLevel "month" extracts "2024-03"
    const result = filterBucketsByPeriod(dayBuckets, '2024-03-15T10:00:00.000Z', 'month');
    expect(result).toHaveLength(3);
    expect(result.every(b => b.periodStart.startsWith('2024-03'))).toBe(true);
  });

  it('hour parentZoomLevel returns all buckets', () => {
    const result = filterBucketsByPeriod(dayBuckets, '2024-03-15T10:00:00.000Z', 'hour');
    expect(result).toHaveLength(4);
  });

  it('day period at hour zoom filters by day prefix', () => {
    const hourBuckets: DateBucket[] = [
      { label: 'Mar 15, 10am', periodStart: '2024-03-15T10:00:00.000Z', entries: [] },
      { label: 'Mar 15, 2pm', periodStart: '2024-03-15T14:00:00.000Z', entries: [] },
      { label: 'Mar 16, 9am', periodStart: '2024-03-16T09:00:00.000Z', entries: [] },
    ];
    const result = filterBucketsByPeriod(hourBuckets, '2024-03-15T00:00:00.000Z', 'day');
    expect(result).toHaveLength(2);
    expect(result[0].label).toBe('Mar 15, 10am');
    expect(result[1].label).toBe('Mar 15, 2pm');
  });
});

describe('formatTimestamp', () => {
  it('formats full timestamp', () => {
    expect(formatTimestamp('2024-03-15T14:30:00Z')).toBe('Mar 15, 2024 at 2:30pm');
  });

  it('omits minutes when zero', () => {
    expect(formatTimestamp('2024-03-15T14:00:00Z')).toBe('Mar 15, 2024 at 2pm');
  });
});
