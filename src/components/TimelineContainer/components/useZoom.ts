import { useState, useCallback, useEffect, useRef } from 'react';
import type { ZoomLevel } from './types';
import { ZOOM_LEVELS } from './types';

export interface UseZoomOptions {
  zoomLevel?: ZoomLevel;
  defaultZoomLevel?: ZoomLevel;
  onZoomChange?: (level: ZoomLevel) => void;
}

export interface UseZoomReturn {
  zoomLevel: ZoomLevel;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

/**
 * Manages zoom level with controlled/uncontrolled pattern.
 * Zoom "in" means more detail (year -> month -> day -> hour).
 */
export function useZoom({
  zoomLevel: controlledLevel,
  defaultZoomLevel = 'month',
  onZoomChange,
}: UseZoomOptions = {}): UseZoomReturn {
  const [internalLevel, setInternalLevel] = useState<ZoomLevel>(defaultZoomLevel);

  // Inline narrowing — TS cannot narrow through an extracted boolean variable
  const currentLevel: ZoomLevel = controlledLevel ?? internalLevel;
  const isControlled = controlledLevel !== undefined;

  const currentIndex = ZOOM_LEVELS.indexOf(currentLevel);
  const canZoomIn = currentIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = currentIndex > 0;

  // Store current values in refs for stable callbacks (prevents listener churn)
  const currentIndexRef = useRef(currentIndex);
  const isControlledRef = useRef(isControlled);
  const onZoomChangeRef = useRef(onZoomChange);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    isControlledRef.current = isControlled;
    onZoomChangeRef.current = onZoomChange;
  });

  const updateLevel = useCallback((level: ZoomLevel) => {
    if (!isControlledRef.current) {
      setInternalLevel(level);
    }
    onZoomChangeRef.current?.(level);
  }, []);

  const zoomIn = useCallback(() => {
    const nextLevel = ZOOM_LEVELS[currentIndexRef.current + 1];
    if (nextLevel !== undefined) {
      updateLevel(nextLevel);
    }
  }, [updateLevel]);

  const zoomOut = useCallback(() => {
    const prevLevel = ZOOM_LEVELS[currentIndexRef.current - 1];
    if (prevLevel !== undefined) {
      updateLevel(prevLevel);
    }
  }, [updateLevel]);

  const reset = useCallback(() => {
    updateLevel(defaultZoomLevel);
  }, [defaultZoomLevel, updateLevel]);

  return {
    zoomLevel: currentLevel,
    zoomIn,
    zoomOut,
    reset,
    canZoomIn,
    canZoomOut,
  };
}
