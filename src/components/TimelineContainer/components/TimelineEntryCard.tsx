import React from 'react';
import type { TimelineEntryData } from './types';
import './TimelineEntryCard.css';

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
    'timeline-card',
    isSelected && 'timeline-card--selected',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <button
        type="button"
        className="timeline-view__entry-button"
        onClick={() => onSelect?.(entry.id)}
        aria-pressed={isSelected}
      >
        <div className="timeline-card__header">
          {entry.type && (
            <span className="timeline-card__type">{entry.type.toUpperCase()}</span>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="timeline-card__tags">
              {entry.tags.map(t => `#${t}`).join(' ')}
            </span>
          )}
        </div>
        <p className="timeline-card__title">{entry.title}</p>
        {children}
      </button>
      {footer && <div className="timeline-card__footer">{footer}</div>}
    </div>
  );
});

TimelineEntryCard.displayName = 'TimelineEntryCard';
