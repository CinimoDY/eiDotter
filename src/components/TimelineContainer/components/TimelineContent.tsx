import React from 'react';
import type { ZoomLevel, DateBucket, TimelineRenderEntry } from './types';
import { YearView, MonthView, DayView, HourView } from './views';

export interface TimelineContentProps {
  zoomLevel: ZoomLevel;
  buckets: readonly DateBucket[];
  selectedEntryId: string | null;
  onEntrySelect?: (entryId: string) => void;
  onBucketClick?: (bucket: DateBucket) => void;
  renderEntry?: TimelineRenderEntry;
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
  renderEntry,
}) => {
  switch (zoomLevel) {
    case 'year':
      // Year view shows bucket counts, not individual entries — renderEntry not applicable.
      return <YearView buckets={buckets} onBucketClick={onBucketClick} />;
    case 'month':
      return (
        <MonthView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
          onBucketClick={onBucketClick}
          renderEntry={renderEntry}
        />
      );
    case 'day':
      return (
        <DayView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
          renderEntry={renderEntry}
        />
      );
    case 'hour':
      return (
        <HourView
          buckets={buckets}
          selectedEntryId={selectedEntryId}
          onEntrySelect={onEntrySelect}
          renderEntry={renderEntry}
        />
      );
    default: {
      const _exhaustive: never = zoomLevel;
      return _exhaustive;
    }
  }
};
