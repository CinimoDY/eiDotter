import React, { useMemo } from 'react';
import { TimelineItem } from '../../TimelineEntry';
import { TimelineEntryData } from '../../TimelineContainer/components/types';
import './TimelineList.css';

/**
 * @deprecated Use TimelineEntryData from TimelineContainer instead.
 */
export type TimelineListEntry = TimelineEntryData;

export interface TimelineListProps {
  /** Timeline entries to display (rendered in the order provided) */
  entries: TimelineListEntry[];
  /** Additional CSS class name */
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return dateFormatter.format(date);
};

/**
 * @deprecated Use `<TimelineContainer mode="static">` instead.
 * TimelineList will be removed in the next major version.
 */
export const TimelineList: React.FC<TimelineListProps> = ({
  entries,
  className = '',
}) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'eidotter: TimelineList is deprecated. Use <TimelineContainer mode="static"> instead.',
      );
    }
  }, []);
  const formattedEntries = useMemo(
    () => entries.map(entry => ({
      ...entry,
      formattedDate: formatDate(entry.date),
    })),
    [entries],
  );

  if (formattedEntries.length === 0) {
    return (
      <div className="timeline-list__empty" role="status">
        <pre>{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502       TIMELINE EMPTY            \u2502
\u2502                                 \u2502
\u2502     No entries to display       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}</pre>
      </div>
    );
  }

  const classes = ['timeline-list', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="list" aria-label="Timeline">
      {formattedEntries.map(entry => (
        <TimelineItem
          key={entry.id}
          date={entry.formattedDate}
          title={entry.title}
          type={entry.type as 'event' | 'project' | 'milestone'}
          tags={entry.tags}
        >
          {entry.content}
        </TimelineItem>
      ))}
    </div>
  );
};
