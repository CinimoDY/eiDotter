import React from 'react';
import type { TimelineEntryData } from './types';
import '../../TimelineEntry/components/TimelineEntry.css';

export interface TimelineEntryCardProps {
  entry: TimelineEntryData;
  isSelected: boolean;
  onSelect?: (id: string) => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Selectable entry card for TimelineContainer views.
 * Uses TimelineEntry's card CSS for visual consistency with static timelines.
 * Adds selection behavior (aria-pressed, glow variant on select).
 */
export const TimelineEntryCard = React.memo<TimelineEntryCardProps>(({
  entry,
  isSelected,
  onSelect,
  footer,
  children,
}) => {
  const classes = [
    'timeline-entry__card',
    isSelected && 'timeline-entry__card--selected',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <button
        type="button"
        className="timeline-view__entry-button"
        onClick={() => onSelect?.(entry.id)}
        aria-pressed={isSelected}
      >
        <div className="timeline-entry__header">
          {entry.type && (
            <span className="timeline-entry__type">{entry.type.toUpperCase()}</span>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="timeline-entry__tags">
              {entry.tags.map(t => `#${t}`).join(' ')}
            </span>
          )}
        </div>
        <p className="timeline-entry__title">{entry.title}</p>
        {children}
      </button>
      {footer && <div className="timeline-entry__footer">{footer}</div>}
    </div>
  );
});

TimelineEntryCard.displayName = 'TimelineEntryCard';
