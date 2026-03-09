/**
 * Shared type definitions for TimelineContainer.
 * Extracted to a separate file to avoid circular imports between
 * the component, hooks, and view sub-components.
 */

/** Ordered zoom levels from least to most detail */
export const ZOOM_LEVELS = ['year', 'month', 'day', 'hour'] as const;

/** Timeline zoom level */
export type ZoomLevel = (typeof ZOOM_LEVELS)[number];

export interface TimelineEntry {
  /** Unique identifier for this entry */
  id: string;
  /** Entry category — not rendered by default; available for consumer-side filtering/styling. Consider discriminated union if type-specific fields are added. */
  type: 'event' | 'project' | 'milestone';
  /** ISO 8601 date string */
  date: string;
  /** Display title */
  title: string;
  /** Entry body content */
  content: string;
  /** Categorization tags */
  tags: string[];
}

export interface DateBucket {
  /** Human-readable label, e.g. "2024", "March 2024", "Mar 15" */
  label: string;
  /** ISO 8601 period start for sorting */
  periodStart: string;
  /** Entries grouped into this time bucket */
  entries: readonly TimelineEntry[];
}

/** Shared props interface for zoom-level view components */
export interface TimelineViewProps {
  /** Grouped entry buckets to display */
  buckets: readonly DateBucket[];
  /** Callback when an entry is selected */
  onEntrySelect?: (id: string) => void;
  /** Currently selected entry ID */
  selectedEntryId?: string | null;
  /** Callback when a bucket header is clicked (for drill-down) */
  onBucketClick?: (bucket: DateBucket) => void;
}
