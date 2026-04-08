import React from 'react';
import { cn } from '../../../utils/cn';
import type { TimelineEntryData } from './types';
import './TimelineEntryCard.css';

export interface TimelineEntryCardProps {
  entry: TimelineEntryData;
  isSelected: boolean;
  isExpanded?: boolean;
  onSelect?: (id: string) => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Selectable, expandable entry card for TimelineContainer views.
 *
 * Uses trigger+panel structure: the button handles click-to-toggle,
 * the body is a sibling region (not nested inside the button).
 * This prevents invalid HTML when expanded ReactNode content
 * contains interactive elements (links, buttons).
 */
export const TimelineEntryCard = React.memo<TimelineEntryCardProps>(({
  entry,
  isSelected,
  isExpanded = false,
  onSelect,
  footer,
  children,
}) => {
  const classes = cn(
    'timeline-card',
    isSelected && 'timeline-card--selected',
    isExpanded && 'timeline-card--expanded',
  );

  const hasStringContent = typeof entry.content === 'string';
  const hasContent = entry.content != null;

  return (
    <div className={classes}>
      <button
        type="button"
        className="timeline-card__trigger"
        onClick={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
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
        {!isExpanded && hasStringContent && (() => {
          const text = String(entry.content);
          return (
            <p className="timeline-card__preview">
              {text.slice(0, 80)}
              {text.length > 80 ? '...' : ''}
            </p>
          );
        })()}
        {children}
      </button>

      {hasContent && (
        <div className="timeline-card__body">
          <div
            className="timeline-card__body-inner"
            inert={!isExpanded ? true : undefined}
          >
            {entry.content}
          </div>
        </div>
      )}

      {footer && <div className="timeline-card__footer">{footer}</div>}
    </div>
  );
});

TimelineEntryCard.displayName = 'TimelineEntryCard';
