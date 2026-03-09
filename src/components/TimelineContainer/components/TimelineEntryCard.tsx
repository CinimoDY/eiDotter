import React from 'react';
import { Card } from '../../Card/components/Card';
import type { TimelineEntry } from './types';

export interface TimelineEntryCardProps {
  entry: TimelineEntry;
  isSelected: boolean;
  onSelect?: (id: string) => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Memoized entry card wrapper. On selection change, only 2 cards re-render
 * (previously selected + newly selected) instead of all N.
 */
export const TimelineEntryCard = React.memo<TimelineEntryCardProps>(({
  entry,
  isSelected,
  onSelect,
  footer,
  children,
}) => (
  <Card
    title={entry.title}
    variant={isSelected ? 'glow' : 'default'}
    className="timeline-view__entry-card"
    footer={footer}
  >
    <button
      type="button"
      className="timeline-view__entry-button"
      onClick={() => onSelect?.(entry.id)}
      aria-pressed={isSelected}
    >
      {children}
    </button>
  </Card>
));

TimelineEntryCard.displayName = 'TimelineEntryCard';
