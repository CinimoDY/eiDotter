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

/** A single image used by the `image` and `gallery` entry kinds. */
export interface TimelineImage {
  /** Full-resolution URL. */
  src: string;
  /** Required alt text. Pass an empty string for purely decorative images. */
  alt: string;
  /** Optional separate low-resolution URL used in grids/thumbnails. */
  thumbnail?: string;
  /** Optional intrinsic width (px) for layout reservation. */
  width?: number;
  /** Optional intrinsic height (px) for layout reservation. */
  height?: number;
  /** Optional caption rendered in the lightbox. */
  caption?: string;
  /** Optional ISO date — overrides parent entry date for ordering/display in mixed galleries. */
  date?: string;
  /** Optional per-image tags. */
  tags?: string[];
  /**
   * Optional URL. When present, the thumbnail wraps `<a href={link}>`
   * and clicks navigate out — the grow-in-place + lightbox interactions
   * are skipped entirely.
   */
  link?: string;
}

/** Fields common to every timeline entry kind. */
interface TimelineEntryBase {
  /** Unique identifier for this entry */
  id: string;
  /** ISO 8601 date string or display date */
  date: string;
  /** Display title */
  title: string;
  /** Semantic entry category — influences node shape/color. Independent of `kind`. */
  type?: 'event' | 'project' | 'milestone';
  /** Categorization tags */
  tags?: string[];
}

/** Discriminated union: `kind` determines what other fields are present. */
export type TimelineEntryData =
  | (TimelineEntryBase & { kind: 'text';    content?: ReactNode })
  | (TimelineEntryBase & { kind: 'image';   image: TimelineImage })
  | (TimelineEntryBase & { kind: 'gallery'; images: TimelineImage[] })
  | (TimelineEntryBase & {
      kind: 'article';
      /** Short plain-text preview shown while collapsed (80-char truncated, like `text`). */
      summary?: string;
      /** Full body rendered in the expandable panel (MDX, rich prose, etc.). */
      content?: ReactNode;
      /**
       * Hero images: decorative thumbnail strip when collapsed; interactive
       * gallery (→ Lightbox) when expanded.
       *
       * Contrast with `TimelineImage.link`: an image `link` *replaces* the image
       * interaction entirely (navigates out, bypasses the lightbox). `article.href`
       * is *supplementary* — it is a separate anchor inside the expanded panel and
       * never interferes with expand/collapse or the gallery.
       */
      images?: TimelineImage[];
      /**
       * "Read more" permalink. Renders as a plain `<a>` at the bottom of the
       * expanded panel only. Unsafe schemes (`javascript:` etc.) are stripped via
       * `isSafeHref` — when the href is unsafe, no anchor is rendered.
       * Never triggers expand/collapse.
       */
      href?: string;
      /** Link label. @default 'READ MORE' */
      hrefLabel?: string;
    });

/**
 * @deprecated Use `TimelineEntryData` instead. Existing entries must add a
 * `kind` field — `kind: 'text'` is the equivalent of pre-DMNC-877 behavior.
 * This alias will be removed in the next major release.
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
