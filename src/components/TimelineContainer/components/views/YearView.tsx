import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { TimelineNode } from '../../../TimelineNode/components/TimelineNode';
import { Badge } from '../../../Badge/components/Badge';
import type { TimelineViewProps } from '../types';

/**
 * Year-level zoom view: shows year labels with entry counts per year.
 */
export const YearView = React.memo<TimelineViewProps>(({ buckets, onBucketClick }) => {
  return (
    <div className="timeline-view timeline-view--year" role="list">
      {buckets.map((bucket) => (
        <div
          key={bucket.periodStart}
          className="timeline-view__bucket timeline-view__bucket--year"
          role="listitem"
        >
          {onBucketClick ? (
            <AriaButton
              className="timeline-view__bucket-button"
              onPress={() => onBucketClick(bucket)}
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
                <Badge variant="default" size="small">
                  {bucket.entries.length} {bucket.entries.length === 1 ? 'entry' : 'entries'}
                </Badge>
              </div>
            </AriaButton>
          ) : (
            <>
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
                <Badge variant="default" size="small">
                  {bucket.entries.length} {bucket.entries.length === 1 ? 'entry' : 'entries'}
                </Badge>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
});

YearView.displayName = 'YearView';
