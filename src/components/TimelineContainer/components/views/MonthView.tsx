import React from 'react';
import { TimelineNode } from '../../../TimelineNode/components/TimelineNode';
import { TimelineEntryCard } from '../TimelineEntryCard';
import type { TimelineViewProps } from '../types';

/**
 * Month-level zoom view: shows month labels with entry title lists.
 */
export const MonthView = React.memo<TimelineViewProps>(({
  buckets,
  selectedEntryId,
  onEntrySelect,
  onBucketClick,
}) => {
  return (
    <div className="timeline-view timeline-view--month" role="list">
      {buckets.map((bucket) => (
        <div
          key={bucket.periodStart}
          className="timeline-view__bucket timeline-view__bucket--month"
          role="listitem"
        >
          <div className="timeline-view__node">
            <TimelineNode
              shape="square"
              size="medium"
              variant="default"
              label={bucket.label}
              labelPosition="left"
              onClick={() => onBucketClick?.(bucket)}
            />
          </div>
          <div className="timeline-view__content">
            {bucket.entries.map((entry) => (
              <TimelineEntryCard
                key={entry.id}
                entry={entry}
                isSelected={selectedEntryId === entry.id}
                onSelect={onEntrySelect}
              >
                <span className="timeline-view__entry-type">[{entry.type}]</span>
              </TimelineEntryCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

MonthView.displayName = 'MonthView';
