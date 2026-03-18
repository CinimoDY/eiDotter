'use client';

import React, { useState } from 'react';
import { TimelineNode } from '../../TimelineNode';
import './TimelineEntry.css';

/** Recognized entry types that map to specific node shapes/variants */
export type TimelineItemType = 'event' | 'project' | 'milestone';

export interface TimelineItemProps {
  /** Display date */
  date: string;
  /** Entry title */
  title: string;
  /** Entry type — influences node shape and color */
  type?: TimelineItemType;
  /** Tags displayed in header */
  tags?: string[];
  /** Expandable content */
  children?: React.ReactNode;
  /** Whether entry starts expanded */
  defaultExpanded?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  type,
  tags = [],
  children,
  defaultExpanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasContent = !!children;

  const nodeVariant = type === 'milestone' ? 'accent'
    : type === 'project' ? 'primary'
    : 'default';

  const nodeShape = type === 'milestone' ? 'diamond'
    : type === 'project' ? 'square'
    : 'circle';

  const handleKeyDown = hasContent
    ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }
    : undefined;

  const classes = [
    'timeline-entry',
    isExpanded && 'timeline-entry--expanded',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={hasContent ? () => setIsExpanded(!isExpanded) : undefined}
      role={hasContent ? 'button' : undefined}
      tabIndex={hasContent ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-expanded={hasContent ? isExpanded : undefined}
    >
      <div className="timeline-entry__node">
        <TimelineNode
          shape={nodeShape}
          variant={nodeVariant}
          isActive={isExpanded}
          size="medium"
        />
        <span className="timeline-entry__date">{date}</span>
      </div>

      <div className="timeline-entry__card">
        <div className="timeline-entry__header">
          {type && (
            <span className="timeline-entry__type">{type.toUpperCase()}</span>
          )}
          {tags.length > 0 && (
            <span className="timeline-entry__tags">
              {tags.map(t => `#${t}`).join(' ')}
            </span>
          )}
        </div>
        <p className="timeline-entry__title">{title}</p>

        {isExpanded && children && (
          <div className="timeline-entry__content">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
