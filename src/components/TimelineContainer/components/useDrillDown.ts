import { useState, useCallback, useEffect, useRef } from 'react';
import type { ZoomLevel } from './types';
import { ZOOM_LEVELS } from './types';

export interface DrillDownEntry {
  /** ISO period start for this drill-down level */
  periodStart: string;
  /** Human-readable label for breadcrumb display */
  label: string;
}

export interface UseDrillDownOptions {
  /** Controlled zoom level (from parent). When provided, drill-down is disabled. */
  zoomLevel?: ZoomLevel;
  /** Default zoom level for uncontrolled mode */
  defaultZoomLevel?: ZoomLevel;
  /** Callback when zoom level changes */
  onZoomChange?: (level: ZoomLevel) => void;
}

export interface UseDrillDownReturn {
  /** Current zoom level */
  zoomLevel: ZoomLevel;
  /** Whether zooming in further is possible */
  canZoomIn: boolean;
  /** Whether zooming out further is possible */
  canZoomOut: boolean;
  /** Breadcrumb stack of drill-down entries */
  breadcrumbs: readonly DrillDownEntry[];
  /** Current drilled-into period start, or null if at root */
  currentPeriod: string | null;
  /** Whether drill-down navigation is active (false when zoom is controlled) */
  isDrillDownEnabled: boolean;
  /** Drill into a specific period */
  drillDown: (periodStart: string, label: string) => void;
  /** Go up one level in the drill-down stack */
  drillUp: () => void;
  /** Reset to root level (year) and clear breadcrumbs */
  reset: () => void;
}

/**
 * Manages drill-down navigation with a breadcrumb stack.
 * When zoom is uncontrolled, maintains its own zoom state so that
 * reset() can go directly to 'year' (the outermost level).
 * When zoom is controlled externally, drill-down is disabled.
 */
export function useDrillDown({
  zoomLevel: controlledLevel,
  defaultZoomLevel = 'month',
  onZoomChange,
}: UseDrillDownOptions = {}): UseDrillDownReturn {
  const isDrillDownEnabled = controlledLevel === undefined;

  const [internalLevel, setInternalLevel] = useState<ZoomLevel>(defaultZoomLevel);
  const [breadcrumbs, setBreadcrumbs] = useState<DrillDownEntry[]>([]);

  const currentLevel: ZoomLevel = controlledLevel ?? internalLevel;
  const currentIndex = ZOOM_LEVELS.indexOf(currentLevel);
  const canZoomIn = currentIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = currentIndex > 0;

  const currentPeriod = breadcrumbs.length > 0
    ? breadcrumbs[breadcrumbs.length - 1].periodStart
    : null;

  // Refs for stable callbacks
  const isDrillDownEnabledRef = useRef(isDrillDownEnabled);
  const canZoomInRef = useRef(canZoomIn);
  const currentIndexRef = useRef(currentIndex);
  const breadcrumbsRef = useRef(breadcrumbs);
  const onZoomChangeRef = useRef(onZoomChange);

  useEffect(() => {
    isDrillDownEnabledRef.current = isDrillDownEnabled;
    canZoomInRef.current = canZoomIn;
    currentIndexRef.current = currentIndex;
    breadcrumbsRef.current = breadcrumbs;
    onZoomChangeRef.current = onZoomChange;
  });

  const updateLevel = useCallback((level: ZoomLevel) => {
    if (isDrillDownEnabledRef.current) {
      setInternalLevel(level);
    }
    onZoomChangeRef.current?.(level);
  }, []);

  const drillDown = useCallback((periodStart: string, label: string) => {
    if (!isDrillDownEnabledRef.current || !canZoomInRef.current) return;
    const nextLevel = ZOOM_LEVELS[currentIndexRef.current + 1];
    if (nextLevel !== undefined) {
      setBreadcrumbs(prev => [...prev, { periodStart, label }]);
      updateLevel(nextLevel);
    }
  }, [updateLevel]);

  const drillUp = useCallback(() => {
    if (!isDrillDownEnabledRef.current || breadcrumbsRef.current.length === 0) return;
    const prevLevel = ZOOM_LEVELS[currentIndexRef.current - 1];
    if (prevLevel !== undefined) {
      setBreadcrumbs(prev => prev.slice(0, -1));
      updateLevel(prevLevel);
    }
  }, [updateLevel]);

  const reset = useCallback(() => {
    if (!isDrillDownEnabledRef.current) return;
    setBreadcrumbs([]);
    updateLevel('year');
  }, [updateLevel]);

  return {
    zoomLevel: currentLevel,
    canZoomIn,
    canZoomOut,
    breadcrumbs,
    currentPeriod,
    isDrillDownEnabled,
    drillDown,
    drillUp,
    reset,
  };
}
