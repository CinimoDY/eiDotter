import React from 'react';
import type { ZoomLevel, DateBucket } from './types';
import { YearView, MonthView, DayView, HourView } from './views';

export interface TimelineContentProps {
  zoomLevel: ZoomLevel;
  buckets: readonly DateBucket[];
  selectedEntryId: string | null;
  onEntrySelect?: (entryId: string) => void;
  onBucketClick?: (bucket: DateBucket) => void;
}

/**
 * View switcher that renders the appropriate zoom level view.
 */
export const TimelineContent: React.FC<TimelineContentProps> = ({
  zoomLevel,
  buckets,
  selectedEntryId,
  onEntrySelect,
  onBucketClick,
}) => {
  switch (zoomLevel) {
    case 'year':
      return <YearView buckets={buckets} onBucketClick={onBucketClick} />;
    case 'month':
      return (
        <MonthView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
          onBucketClick={onBucketClick}
        />
      );
    case 'day':
      return (
        <DayView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
        />
      );
    case 'hour':
      return (
        <HourView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
        />
      );
    default: {
      const _exhaustive: never = zoomLevel;
      return _exhaustive;
    }
  }
};
