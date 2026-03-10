import React from 'react';
import { TimelineNode } from '../../../TimelineNode/components/TimelineNode';
import { Tag } from '../../../Tag/components/Tag';
import { TagGroup } from '../../../Tag/components/TagGroup';
import { Badge } from '../../../Badge/components/Badge';
import { TimelineEntryCard } from '../TimelineEntryCard';
import { formatTimestamp } from '../timelineUtils';
import type { TimelineViewProps } from '../types';

/**
 * Hour-level zoom view: full detail with timestamps and complete content.
 */
export const HourView = React.memo<TimelineViewProps>(({
  buckets,
  selectedEntryId,
  onEntrySelect,
}) => {
  return (
    <div className="timeline-view timeline-view--hour" role="list">
      {buckets.map((bucket) => (
        <div
          key={bucket.periodStart}
          className="timeline-view__bucket timeline-view__bucket--hour"
          role="listitem"
        >
          <div className="timeline-view__node">
            <TimelineNode
              shape="circle"
              size="large"
              variant="primary"
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
                onSelect={onEntrySelect}
                footer={
                  <div className="timeline-view__entry-footer">
                    {entry.tags.length > 0 && (
                      <TagGroup gap="tight" aria-label={`Tags for ${entry.title}`}>
                        {entry.tags.map((tag) => (
                          <Tag key={tag} size="small" variant="outlined">
                            {tag}
                          </Tag>
                        ))}
                      </TagGroup>
                    )}
                    <Badge variant="default" size="small">
                      {entry.type}
                    </Badge>
                  </div>
                }
              >
                <time
                  className="timeline-view__timestamp"
                  dateTime={entry.date}
                >
                  {formatTimestamp(entry.date)}
                </time>
                <div className="timeline-view__entry-content">
                  {entry.content}
                </div>
              </TimelineEntryCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

HourView.displayName = 'HourView';
