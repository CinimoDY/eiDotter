import type { ReactNode } from 'react';

/**
 * Shared type definitions for TimelineContainer.
 * Extracted to a separate file to avoid circular imports between
 * the component, hooks, and view sub-components.
 */

/** Ordered zoom levels from least to most detail */
export const ZOOM_LEVELS = ['year', 'month', 'day', 'hour'] as const;

/** Timeline zoom level */
export type ZoomLevel = (typeof ZOOM_LEVELS)[number];

/** Shared entry data type used across all timeline components */
export interface TimelineEntryData {
  /** Unique identifier for this entry */
  id: string;
  /** ISO 8601 date string or display date */
  date: string;
  /** Display title */
  title: string;
  /** Entry body content (string or ReactNode for expandable entries) */
  content?: ReactNode;
  /** Entry category — influences node shape/color */
  type?: 'event' | 'project' | 'milestone';
  /** Categorization tags */
  tags?: string[];
}

/**
 * @deprecated Use TimelineEntryData instead.
 */
export type TimelineEntry = TimelineEntryData;

/**
 * Context passed to a `renderEntry` function so consumers can decide how
 * to render their custom entry, while still being able to fall back to
 * the built-in `TimelineEntryCard` rendering when needed.
 */
export interface TimelineEntryRenderContext {
  /** True when this entry is currently expanded (its content is visible). */
  isExpanded: boolean;
  /** True when this entry is the currently selected entry. */
  isSelected: boolean;
  /** Render the built-in `TimelineEntryCard` for this entry. */
  defaultRender: () => ReactNode;
}

/**
 * Pluggable entry renderer. Return `defaultRender()` to delegate back to the
 * built-in card, or any custom ReactNode to take over the entry slot.
 */
export type TimelineRenderEntry = (
  entry: TimelineEntryData,
  context: TimelineEntryRenderContext,
) => ReactNode;

export interface DateBucket {
  /** Human-readable label, e.g. "2024", "March 2024", "Mar 15" */
  label: string;
  /** ISO 8601 period start for sorting */
  periodStart: string;
  /** Entries grouped into this time bucket */
  entries: readonly TimelineEntryData[];
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
  /** Optional pluggable entry renderer */
  renderEntry?: TimelineRenderEntry;
}
