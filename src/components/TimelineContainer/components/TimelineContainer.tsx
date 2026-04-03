'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { TimelineEntryData, ZoomLevel, DateBucket } from './types';
import { useZoom } from './useZoom';
import { useSelection } from './useSelection';
import { groupEntriesByZoom } from './timelineUtils';
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
   * Use with `onZoomChange` for full control.
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
 * entry selection, keyboard shortcuts, and scroll-to-zoom. Uses DOS/CGA
 * aesthetic with eidotter primitives (TimelineNode, Card, Badge, Tag).
 *
 * Supports both controlled and uncontrolled patterns for zoom and selection.
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

  const {
    zoomLevel,
    zoomIn,
    zoomOut,
    reset,
    canZoomIn,
    canZoomOut,
  } = useZoom({
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

  const buckets = useMemo(
    () => groupEntriesByZoom(entries, zoomLevel, sortOrder),
    [entries, zoomLevel, sortOrder],
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
          zoomIn();
        } else if (e.deltaY > 0) {
          zoomOut();
        }
        rafId = null;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollToZoom, zoomIn, zoomOut]);

  // Keyboard shortcuts (interactive mode only)
  useEffect(() => {
    if (isStatic || !keyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== containerRef.current) {
        return;
      }

      const isMod = e.ctrlKey || e.metaKey;

      if (isMod && e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (isMod && e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (isMod && e.key === '0') {
        e.preventDefault();
        reset();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        deselect();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcuts, zoomIn, zoomOut, reset, deselect]);

  // Bucket click zooms in at year/month levels — ignores bucket parameter
  // because the component zooms generically rather than navigating to a time period.
  const handleBucketClick = useCallback((_bucket: DateBucket) => {
    if (zoomLevel === 'year' || zoomLevel === 'month') {
      zoomIn();
    }
  }, [zoomLevel, zoomIn]);

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
      {!isStatic && (
        <ZoomControls
          zoomLevel={zoomLevel}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={reset}
        />
      )}

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
  );
};
