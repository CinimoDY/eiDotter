'use client';

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
  renderEntry,
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
              shape="circle"
              size="medium"
              variant="default"
              label={bucket.label}
              labelPosition="right"
              onClick={() => onBucketClick?.(bucket)}
            />
          </div>
          <div className="timeline-view__content">
            {bucket.entries.map((entry) => {
              const isSelected = selectedEntryId === entry.id;
              const defaultRender = () => (
                <TimelineEntryCard
                  entry={entry}
                  isSelected={isSelected}
                  isExpanded={isSelected}
                  onSelect={onEntrySelect}
                />
              );
              return (
                <React.Fragment key={entry.id}>
                  {renderEntry
                    ? renderEntry(entry, { isExpanded: isSelected, isSelected, defaultRender })
                    : defaultRender()}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

MonthView.displayName = 'MonthView';
