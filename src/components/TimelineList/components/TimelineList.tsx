import React, { useMemo } from 'react';
import { TimelineItem } from '../../TimelineEntry';
import './TimelineList.css';

export interface TimelineListEntry {
  /** Unique identifier */
  id: string;
  /** ISO date or display date */
  date: string;
  /** Entry title */
  title: string;
  /** Entry content (rendered as children of TimelineItem) */
  content?: React.ReactNode;
  /** Entry type — influences node shape/color */
  type?: string;
  /** Tags */
  tags?: string[];
}

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

export const TimelineList: React.FC<TimelineListProps> = ({
  entries,
  className = '',
}) => {
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
