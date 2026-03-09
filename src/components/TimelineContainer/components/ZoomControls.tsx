import React from 'react';
import { Button } from '../../Button/components/Button';
import { Badge } from '../../Badge/components/Badge';
import type { ZoomLevel } from './types';
import './ZoomControls.css';

export interface ZoomControlsProps {
  zoomLevel: ZoomLevel;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  return (
    <div className="timeline-zoom-controls" role="toolbar" aria-label="Timeline zoom controls">
      <Button
        variant="secondary"
        size="small"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out"
      >
        [-]
      </Button>
      <button
        type="button"
        className="timeline-zoom-controls__level"
        onClick={onReset}
        aria-label={`Current zoom: ${zoomLevel}. Click to reset.`}
      >
        <Badge variant="accent" size="medium">
          {zoomLevel.toUpperCase()}
        </Badge>
      </button>
      <Button
        variant="secondary"
        size="small"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in"
      >
        [+]
      </Button>
    </div>
  );
};
