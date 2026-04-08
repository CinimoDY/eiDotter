import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Button } from '../../Button/components/Button';
import { Badge } from '../../Badge/components/Badge';
import { Breadcrumb } from '../../Breadcrumb/components/Breadcrumb';
import type { DrillDownEntry } from './useDrillDown';
import type { ZoomLevel } from './types';
import './ZoomControls.css';

export interface ZoomControlsProps {
  zoomLevel: ZoomLevel;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  breadcrumbs?: readonly DrillDownEntry[];
  onBreadcrumbClick?: (index: number) => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onReset,
  breadcrumbs = [],
  onBreadcrumbClick,
}) => {
  const hasBreadcrumbs = breadcrumbs.length > 0;

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

      {hasBreadcrumbs ? (
        <Breadcrumb
          trail={[
            { label: 'ALL', onClick: onReset },
            ...breadcrumbs.slice(0, -1).map((entry, index) => ({
              label: entry.label,
              onClick: () => onBreadcrumbClick?.(index),
            })),
          ]}
          currentLabel={breadcrumbs[breadcrumbs.length - 1].label}
          showBackArrow={false}
          separator=">"
          className="timeline-zoom-controls__breadcrumb"
        />
      ) : (
        <AriaButton
          className="timeline-zoom-controls__level"
          onPress={onReset}
          aria-label={`Current zoom: ${zoomLevel}. Click to reset.`}
        >
          <Badge variant="accent" size="medium">
            {zoomLevel.toUpperCase()}
          </Badge>
        </AriaButton>
      )}

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
