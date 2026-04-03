import React from 'react';
import { TimelineNode } from '../../../TimelineNode/components/TimelineNode';
import { Tag } from '../../../Tag/components/Tag';
import { TagGroup } from '../../../Tag/components/TagGroup';
import { TimelineEntryCard } from '../TimelineEntryCard';
import type { TimelineViewProps } from '../types';

/**
 * Day-level zoom view: shows day labels with entry cards and content preview.
 */
export const DayView = React.memo<TimelineViewProps>(({
  buckets,
  selectedEntryId,
  onEntrySelect,
}) => {
  return (
    <div className="timeline-view timeline-view--day" role="list">
      {buckets.map((bucket) => (
        <div
          key={bucket.periodStart}
          className="timeline-view__bucket timeline-view__bucket--day"
          role="listitem"
        >
          <div className="timeline-view__node">
            <TimelineNode
              shape="circle"
              size="medium"
              variant="default"
              label={bucket.label}
              labelPosition="right"
            />
          </div>
          <div className="timeline-view__content">
            {bucket.entries.map((entry) => (
              <TimelineEntryCard
                key={entry.id}
                entry={entry}
                isSelected={selectedEntryId === entry.id}
                isExpanded={selectedEntryId === entry.id}
                onSelect={onEntrySelect}
                footer={
                  entry.tags && entry.tags.length > 0 ? (
                    <TagGroup gap="tight" aria-label={`Tags for ${entry.title}`}>
                      {entry.tags.map((tag) => (
                        <Tag key={tag} size="small" variant="outlined">
                          {tag}
                        </Tag>
                      ))}
                    </TagGroup>
                  ) : undefined
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

DayView.displayName = 'DayView';
