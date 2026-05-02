'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { TimelineEntryData, TimelineRenderEntry, ZoomLevel, DateBucket } from './types';
import { useDrillDown } from './useDrillDown';
import { useSelection } from './useSelection';
import { groupEntriesByZoom, filterBucketsByPeriod } from './timelineUtils';
import { ZoomControls } from './ZoomControls';
import { TimelineAxis } from './TimelineAxis';
import { TimelineContent } from './TimelineContent';
import { TimelineNode } from '../../TimelineNode/components/TimelineNode';
import { TimelineEntryCard } from './TimelineEntryCard';
import './TimelineContainer.css';
import './views/views.css';

export interface TimelineContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timeline entries to display */
  entries: TimelineEntryData[];

  /**
   * Display mode
   * - "interactive" (default): zoom controls, selection, keyboard shortcuts
   * - "static": read-only vertical feed of always-expanded entries (replaces TimelineList)
   * - "feed": paginated vertical list with collapsed-by-default entries that
   *   expand on selection. Renders a DOS-style "LOAD MORE..." button while
   *   more entries are available. No zoom controls.
   * @default 'interactive'
   */
  mode?: 'interactive' | 'static' | 'feed';

  /**
   * Controlled zoom level — overrides internal state when provided.
   * Use with `onZoomChange` for full control. Disables drill-down navigation.
   */
  zoomLevel?: ZoomLevel;
  /**
   * Initial zoom level for uncontrolled mode
   * @default 'month'
   */
  defaultZoomLevel?: ZoomLevel;
  /** Callback fired when the zoom level changes */
  onZoomChange?: (level: ZoomLevel) => void;

  /**
   * Controlled selection — overrides internal state when provided.
   * `null` means nothing selected, `undefined` means uncontrolled.
   */
  selectedEntryId?: string | null;
  /**
   * Initial selected entry for uncontrolled mode
   * @default null
   */
  defaultSelectedEntryId?: string | null;
  /** Callback fired when entry selection changes */
  onSelectEntry?: (entryId: string | null) => void;

  /**
   * Sort order for entries within buckets
   * @default 'desc'
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * Enable Ctrl/Cmd + scroll wheel to zoom
   * @default true
   */
  scrollToZoom?: boolean;
  /**
   * Enable keyboard shortcuts (Ctrl+=/-/0, Escape)
   * @default true
   */
  keyboardShortcuts?: boolean;

  /**
   * Pluggable entry renderer. When provided, this is called for every entry
   * in every zoom-level view (and in static / feed modes) instead of rendering
   * the built-in `TimelineEntryCard`. Return `context.defaultRender()` to keep
   * the default card for some entries while customising others.
   *
   * Use this to render different card UIs per entry type — blog posts,
   * photos, financial records, etc.
   */
  renderEntry?: TimelineRenderEntry;

  /**
   * Number of entries to show per page in feed mode. Ignored for other modes.
   * @default 10
   */
  pageSize?: number;

  /**
   * Fired in feed mode after the user clicks "LOAD MORE…", with the new total
   * number of visible entries. Use this to fetch the next batch from a backend
   * and append to `entries`, or for analytics.
   */
  onLoadMore?: (visibleCount: number) => void;
}

/**
 * TimelineContainer - Interactive multi-level zoom timeline
 *
 * A composite timeline component with 4 zoom levels (year, month, day, hour),
 * entry selection, keyboard shortcuts, scroll-to-zoom, and drill-down navigation.
 * Uses DOS/CGA aesthetic with eidotter primitives.
 *
 * Supports both controlled and uncontrolled patterns for zoom and selection.
 * When zoom is uncontrolled, clicking a bucket drills down into that time period.
 */
export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  entries,
  mode = 'interactive',
  zoomLevel: controlledZoom,
  defaultZoomLevel = 'month',
  onZoomChange,
  selectedEntryId: controlledSelection,
  defaultSelectedEntryId,
  onSelectEntry,
  sortOrder = 'desc',
  scrollToZoom = true,
  keyboardShortcuts = true,
  renderEntry,
  pageSize = 10,
  onLoadMore,
  ...props
}) => {
  const isStatic = mode === 'static';
  const isFeed = mode === 'feed';
  const isVerticalFeed = isStatic || isFeed;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Drill-down announcement for screen readers
  const [announcement, setAnnouncement] = useState('');

  const {
    zoomLevel,
    canZoomIn,
    canZoomOut,
    breadcrumbs,
    currentPeriod,
    isDrillDownEnabled,
    drillDown,
    drillUp,
    reset,
  } = useDrillDown({
    zoomLevel: controlledZoom,
    defaultZoomLevel,
    onZoomChange,
  });

  const {
    selectedEntryId,
    toggle,
    deselect,
  } = useSelection({
    selectedEntryId: controlledSelection,
    defaultSelectedEntryId,
    onSelectEntry,
  });

  // Group entries by zoom level, then filter by drill-down period
  const allBuckets = useMemo(
    () => groupEntriesByZoom(entries, zoomLevel, sortOrder),
    [entries, zoomLevel, sortOrder],
  );

  // Determine parent zoom level for filtering
  const parentZoomLevel = breadcrumbs.length > 0
    ? (['year', 'month', 'day', 'hour'] as const)[breadcrumbs.length - 1]
    : null;

  const buckets = useMemo(
    () => currentPeriod && parentZoomLevel
      ? filterBucketsByPeriod(allBuckets, currentPeriod, parentZoomLevel)
      : allBuckets,
    [allBuckets, currentPeriod, parentZoomLevel],
  );

  // Scroll-to-zoom: Ctrl/Cmd + wheel (interactive mode only)
  useEffect(() => {
    if (isVerticalFeed || !scrollToZoom) return;

    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        // Scroll-down zooms out (pops drill-down stack).
        // Scroll-up is a no-op — drill-down requires clicking a specific
        // bucket to know which period to enter. Scroll has no period context.
        if (e.deltaY > 0) {
          drillUp();
        }
        rafId = null;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isVerticalFeed, scrollToZoom, isDrillDownEnabled, canZoomIn, drillUp]);

  // Keyboard shortcuts (interactive mode only)
  useEffect(() => {
    if (isVerticalFeed || !keyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== containerRef.current) {
        return;
      }

      const isMod = e.ctrlKey || e.metaKey;

      if (isMod && e.key === '-') {
        e.preventDefault();
        drillUp();
      } else if (isMod && e.key === '0') {
        e.preventDefault();
        reset();
        setAnnouncement('Showing all years');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        deselect();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVerticalFeed, keyboardShortcuts, drillUp, reset, deselect]);

  // Bucket click triggers drill-down
  const handleBucketClick = useCallback((bucket: DateBucket) => {
    if (!canZoomIn) return;
    drillDown(bucket.periodStart, bucket.label);
    setAnnouncement(`Showing ${zoomLevel === 'year' ? 'months' : zoomLevel === 'month' ? 'days' : 'hours'} in ${bucket.label}`);
  }, [canZoomIn, drillDown, zoomLevel]);

  // Focus management: move focus after drill-down transitions
  const prevBreadcrumbLengthRef = useRef(breadcrumbs.length);
  useEffect(() => {
    if (breadcrumbs.length !== prevBreadcrumbLengthRef.current) {
      prevBreadcrumbLengthRef.current = breadcrumbs.length;
      // Focus first interactive element in the content area
      const firstTrigger = contentRef.current?.querySelector<HTMLElement>('.eidotter-timeline-card__trigger, .timeline-view__bucket-button, .eidotter-timeline-node[role="button"]');
      if (firstTrigger) {
        requestAnimationFrame(() => firstTrigger.focus());
      }
    }
  }, [breadcrumbs.length]);

  // Sort entries for vertical-feed modes (static and feed)
  const sortedEntries = useMemo(() => {
    if (!isVerticalFeed) return entries;
    return [...entries].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortOrder === 'desc' ? -cmp : cmp;
    });
  }, [isVerticalFeed, entries, sortOrder]);

  // Pagination for feed mode. Clamp pageSize at the boundary — pageSize=0 or
  // negative would otherwise produce a permanent LOAD MORE button that never
  // advances. Step is always ≥1.
  const safePageSize = Math.max(1, pageSize);
  const [visibleCount, setVisibleCount] = useState<number>(safePageSize);

  // Clamp visibleCount when entries shrink. Crucially, do NOT reset to
  // pageSize when entries grow — consumers using `onLoadMore` to fetch and
  // append the next batch (the documented backend-pagination flow) need
  // visibleCount to stay where the user clicked. Reset to pageSize only
  // happens when the new entries length is below the current visibleCount.
  useEffect(() => {
    if (!isFeed) return;
    setVisibleCount((prev) => {
      const max = sortedEntries.length;
      if (max === 0) return safePageSize;
      if (prev > max) return Math.max(safePageSize, max);
      return prev;
    });
  }, [isFeed, safePageSize, sortedEntries.length]);

  const visibleEntries = useMemo(
    () => (isFeed ? sortedEntries.slice(0, visibleCount) : sortedEntries),
    [isFeed, sortedEntries, visibleCount],
  );

  const hasMore = isFeed && visibleCount < sortedEntries.length;

  const handleLoadMore = useCallback(() => {
    const next = Math.min(visibleCount + safePageSize, sortedEntries.length);
    if (next <= visibleCount) return; // already at cap — no-op, no callback
    setVisibleCount(next);
    onLoadMore?.(next);
  }, [visibleCount, safePageSize, sortedEntries.length, onLoadMore]);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [],
  );

  const formatDate = (iso: string) => {
    try { return dateFormatter.format(new Date(iso)); }
    catch { return iso; }
  };

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        'font-dos text-cga-amber p-4 min-h-[200px]',
        'eidotter-timeline-container',
        isStatic && 'eidotter-timeline-container--static',
        isFeed && 'eidotter-timeline-container--feed',
        props.className,
      )}
      role="region"
      aria-label={props['aria-label'] ?? 'Timeline'}
      tabIndex={isVerticalFeed ? undefined : 0}
    >
      {/* Screen reader announcements for drill-down navigation */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {!isVerticalFeed && (
        <ZoomControls
          zoomLevel={zoomLevel}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          onZoomIn={() => {}}
          onZoomOut={drillUp}
          onReset={reset}
          breadcrumbs={isDrillDownEnabled ? breadcrumbs : []}
          onBreadcrumbClick={(index) => {
            // Navigate to a specific breadcrumb level
            const stepsBack = breadcrumbs.length - 1 - index;
            for (let i = 0; i < stepsBack; i++) {
              drillUp();
            }
          }}
        />
      )}

      <div ref={contentRef}>
        {entries.length === 0 ? (
          <div className="eidotter-timeline-container__empty" role="status">
            <p>C:\TIMELINE&gt; No entries found.</p>
            <p>_</p>
          </div>
        ) : isStatic ? (
          <TimelineAxis>
            <div className="eidotter-timeline-container__static" role="list" aria-label="Timeline">
              {sortedEntries.map((entry) => {
                const defaultRender = () => (
                  <TimelineEntryCard entry={entry} isSelected={false} isExpanded={true} />
                );
                return (
                  <div key={entry.id} className="eidotter-timeline-container__static-entry" role="listitem">
                    <div className="timeline-view__node">
                      <TimelineNode shape="circle" size="medium" variant="default" label={formatDate(entry.date)} labelPosition="right" />
                    </div>
                    {renderEntry
                      ? renderEntry(entry, { isExpanded: true, isSelected: false, defaultRender })
                      : defaultRender()}
                  </div>
                );
              })}
            </div>
          </TimelineAxis>
        ) : isFeed ? (
          <TimelineAxis>
            <div className="eidotter-timeline-container__feed" role="list" aria-label="Timeline">
              {visibleEntries.map((entry) => {
                const isSelected = selectedEntryId === entry.id;
                const defaultRender = () => (
                  <TimelineEntryCard
                    entry={entry}
                    isSelected={isSelected}
                    isExpanded={isSelected}
                    onSelect={toggle}
                  />
                );
                return (
                  <div
                    key={entry.id}
                    className="eidotter-timeline-container__feed-entry"
                    role="listitem"
                  >
                    <div className="timeline-view__node">
                      <TimelineNode
                        shape="circle"
                        size="medium"
                        variant="default"
                        label={formatDate(entry.date)}
                        labelPosition="right"
                      />
                    </div>
                    {renderEntry
                      ? renderEntry(entry, { isExpanded: isSelected, isSelected, defaultRender })
                      : defaultRender()}
                  </div>
                );
              })}
            </div>
            {hasMore && (
              <button
                type="button"
                className="eidotter-timeline-container__load-more"
                onClick={handleLoadMore}
                aria-label={`Load more entries (showing ${visibleCount} of ${sortedEntries.length})`}
              >
                LOAD MORE...
              </button>
            )}
          </TimelineAxis>
        ) : buckets.length === 0 && currentPeriod ? (
          <TimelineAxis>
            <div className="eidotter-timeline-container__empty" role="status">
              <p>C:\TIMELINE&gt; No entries in {breadcrumbs[breadcrumbs.length - 1]?.label ?? 'this period'}.</p>
              <p>_</p>
            </div>
          </TimelineAxis>
        ) : (
          <TimelineAxis>
            <TimelineContent
              zoomLevel={zoomLevel}
              buckets={buckets}
              selectedEntryId={selectedEntryId}
              onEntrySelect={toggle}
              onBucketClick={handleBucketClick}
              renderEntry={renderEntry}
            />
          </TimelineAxis>
        )}
      </div>
    </div>
  );
};
