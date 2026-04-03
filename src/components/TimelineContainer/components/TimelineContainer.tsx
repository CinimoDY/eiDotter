'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { TimelineEntryData, ZoomLevel, DateBucket } from './types';
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
   * - "static": read-only vertical feed of expandable entries (replaces TimelineList)
   * @default 'interactive'
   */
  mode?: 'interactive' | 'static';

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
  ...props
}) => {
  const isStatic = mode === 'static';
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
    if (isStatic || !scrollToZoom) return;

    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (e.deltaY < 0) {
          if (isDrillDownEnabled && canZoomIn) {
            // Generic zoom in without drill-down (no period context from scroll)
          }
        } else if (e.deltaY > 0) {
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
  }, [scrollToZoom, isDrillDownEnabled, canZoomIn, drillUp]);

  // Keyboard shortcuts (interactive mode only)
  useEffect(() => {
    if (isStatic || !keyboardShortcuts) return;

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
  }, [keyboardShortcuts, drillUp, reset, deselect]);

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
      const firstTrigger = contentRef.current?.querySelector<HTMLElement>('.timeline-card__trigger, .timeline-view__bucket-button, .timeline-node[role="button"]');
      if (firstTrigger) {
        requestAnimationFrame(() => firstTrigger.focus());
      }
    }
  }, [breadcrumbs.length]);

  const containerClasses = [
    'timeline-container',
    isStatic && 'timeline-container--static',
    props.className,
  ].filter(Boolean).join(' ');

  // Sort entries for static mode
  const sortedEntries = useMemo(() => {
    if (!isStatic) return entries;
    return [...entries].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortOrder === 'desc' ? -cmp : cmp;
    });
  }, [isStatic, entries, sortOrder]);

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
      className={containerClasses}
      role="region"
      aria-label={props['aria-label'] ?? 'Timeline'}
      tabIndex={isStatic ? undefined : 0}
    >
      {/* Screen reader announcements for drill-down navigation */}
      <div className="timeline-container__announcer" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {!isStatic && (
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
            const stepsBack = breadcrumbs.length - index;
            for (let i = 0; i < stepsBack; i++) {
              drillUp();
            }
          }}
        />
      )}

      <div ref={contentRef}>
        {entries.length === 0 ? (
          <div className="timeline-container__empty" role="status">
            <p>C:\TIMELINE&gt; No entries found.</p>
            <p>_</p>
          </div>
        ) : isStatic ? (
          <TimelineAxis>
            <div className="timeline-container__static" role="list" aria-label="Timeline">
              {sortedEntries.map((entry) => (
                <div key={entry.id} className="timeline-container__static-entry" role="listitem">
                  <div className="timeline-view__node">
                    <TimelineNode shape="circle" size="medium" variant="default" label={formatDate(entry.date)} labelPosition="right" />
                  </div>
                  <TimelineEntryCard entry={entry} isSelected={false}>
                    {entry.content}
                  </TimelineEntryCard>
                </div>
              ))}
            </div>
          </TimelineAxis>
        ) : buckets.length === 0 && currentPeriod ? (
          <TimelineAxis>
            <div className="timeline-container__empty" role="status">
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
            />
          </TimelineAxis>
        )}
      </div>
    </div>
  );
};
