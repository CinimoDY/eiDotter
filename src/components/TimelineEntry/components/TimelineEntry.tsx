import React, { useState } from 'react';
import { TimelineNode } from '../../TimelineNode';
import './TimelineEntry.css';

export interface TimelineEntryProps {
  /** Display date */
  date: string;
  /** Entry title */
  title: string;
  /** Entry type — influences node styling */
  type?: string;
  /** Tags displayed in header */
  tags?: string[];
  /** Expandable content */
  children?: React.ReactNode;
  /** Whether entry starts expanded */
  defaultExpanded?: boolean;
  /** Additional CSS class name */
  className?: string;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
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

  return (
    <div
      className={`timeline-entry ${isExpanded ? 'timeline-entry--expanded' : ''} ${className}`.trim()}
      onClick={hasContent ? () => setIsExpanded(!isExpanded) : undefined}
      role={hasContent ? 'button' : undefined}
      tabIndex={hasContent ? 0 : undefined}
      onKeyDown={hasContent ? (e) => e.key === 'Enter' && setIsExpanded(!isExpanded) : undefined}
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
              {tags.slice(0, 3).map(t => `#${t}`).join(' ')}
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
