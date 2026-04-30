import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
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
  // Temporary narrow — Task 2 will split rendering into per-kind branches.
  const content = entry.kind === 'text' ? entry.content : undefined;
  const hasStringContent = typeof content === 'string';
  const hasContent = content != null;

  return (
    <div
      className={cn(
        'eidotter-timeline-card',
        isSelected && 'eidotter-timeline-card--selected',
        isExpanded && 'eidotter-timeline-card--expanded',
      )}
    >
      <AriaButton
        className="eidotter-timeline-card__trigger"
        onPress={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
      >
        <div className="eidotter-timeline-card__header">
          {entry.type && (
            <span className="eidotter-timeline-card__type">{entry.type.toUpperCase()}</span>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="eidotter-timeline-card__tags">
              {entry.tags.map(t => `#${t}`).join(' ')}
            </span>
          )}
        </div>
        <p className="eidotter-timeline-card__title">{entry.title}</p>
        {!isExpanded && hasStringContent && (() => {
          const text = String(content);
          return (
            <p className="eidotter-timeline-card__preview">
              {text.slice(0, 80)}
              {text.length > 80 ? '...' : ''}
            </p>
          );
        })()}
        {children}
      </AriaButton>

      {hasContent && (
        <div className="eidotter-timeline-card__body">
          <div
            className="eidotter-timeline-card__body-inner"
            inert={!isExpanded ? true : undefined}
          >
            {content}
          </div>
        </div>
      )}

      {footer && <div className="eidotter-timeline-card__footer">{footer}</div>}
    </div>
  );
});

TimelineEntryCard.displayName = 'TimelineEntryCard';
