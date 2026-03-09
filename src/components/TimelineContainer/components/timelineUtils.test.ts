import { groupEntriesByZoom, formatTimestamp } from './timelineUtils';
import type { TimelineEntry } from './types';

const makeEntry = (id: string, date: string): TimelineEntry => ({
  id,
  type: 'event',
  date,
  title: `Entry ${id}`,
  content: `Content for ${id}`,
  tags: [],
});

const entries: TimelineEntry[] = [
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

describe('formatTimestamp', () => {
  it('formats full timestamp', () => {
    expect(formatTimestamp('2024-03-15T14:30:00Z')).toBe('Mar 15, 2024 at 2:30pm');
  });

  it('omits minutes when zero', () => {
    expect(formatTimestamp('2024-03-15T14:00:00Z')).toBe('Mar 15, 2024 at 2pm');
  });
});
