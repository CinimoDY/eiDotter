import React from 'react';
import { TimelineEntry } from '../../TimelineEntry';
import './TimelineList.css';

export interface TimelineListEntry {
  /** Unique identifier */
  id: string;
  /** ISO date or display date */
  date: string;
  /** Entry title */
  title: string;
  /** Entry content (rendered as children of TimelineEntry) */
  content?: React.ReactNode;
  /** Entry type — influences node shape/color */
  type?: string;
  /** Tags */
  tags?: string[];
  /** Show in condensed views */
  featured?: boolean;
}

export interface TimelineListProps {
  /** Timeline entries to display */
  entries: TimelineListEntry[];
  /** Show only featured entries */
  featuredOnly?: boolean;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Custom entry renderer */
  renderEntry?: (entry: TimelineListEntry) => React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const TimelineList: React.FC<TimelineListProps> = ({
  entries,
  featuredOnly = false,
  sortOrder = 'desc',
  renderEntry,
  className = '',
}) => {
  const filtered = featuredOnly
    ? entries.filter(e => e.featured)
    : entries;

  const sorted = [...filtered].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return sortOrder === 'desc' ? -diff : diff;
  });

  if (sorted.length === 0) {
    return (
      <div className="timeline-list__empty">
        <pre>{`\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502       TIMELINE EMPTY            \u2502
\u2502                                 \u2502
\u2502     No entries to display       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}</pre>
      </div>
    );
  }

  return (
    <div className={`timeline-list ${className}`.trim()}>
      {sorted.map(entry =>
        renderEntry ? (
          <div key={entry.id} className="timeline-list__custom-entry">
            {renderEntry(entry)}
          </div>
        ) : (
          <TimelineEntry
            key={entry.id}
            date={formatDate(entry.date)}
            title={entry.title}
            type={entry.type}
            tags={entry.tags}
          >
            {entry.content}
          </TimelineEntry>
        )
      )}
    </div>
  );
};
