'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { TimelineEntry, ZoomLevel, DateBucket } from './types';
import { useZoom } from './useZoom';
import { useSelection } from './useSelection';
import { groupEntriesByZoom } from './timelineUtils';
import { ZoomControls } from './ZoomControls';
import { TimelineAxis } from './TimelineAxis';
import { TimelineContent } from './TimelineContent';
import './TimelineContainer.css';
import './views/views.css';

export interface TimelineContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timeline entries to display */
  entries: TimelineEntry[];

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

  // Scroll-to-zoom: Ctrl/Cmd + wheel
  useEffect(() => {
    if (!scrollToZoom) return;

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

  // Keyboard shortcuts
  useEffect(() => {
    if (!keyboardShortcuts) return;

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
  const handleBucketClick = useCallback((bucket: DateBucket) => {
    if (zoomLevel === 'year' || zoomLevel === 'month') {
      zoomIn();
    }
  }, [zoomLevel, zoomIn]);

  const containerClasses = [
    'timeline-container',
    props.className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      {...props}
      className={containerClasses}
      role="region"
      aria-label={props['aria-label'] ?? 'Timeline'}
      tabIndex={0}
    >
      <ZoomControls
        zoomLevel={zoomLevel}
        canZoomIn={canZoomIn}
        canZoomOut={canZoomOut}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={reset}
      />

      {entries.length === 0 ? (
        <div className="timeline-container__empty" role="status">
          <p>C:\TIMELINE&gt; No entries found.</p>
          <p>_</p>
        </div>
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
