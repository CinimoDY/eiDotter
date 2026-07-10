'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import type { TimelineEntryData } from './types';
import { TimelineEntryCardImage } from './variants/TimelineEntryCardImage';
import { TimelineEntryCardGallery } from './variants/TimelineEntryCardGallery';
import { TimelineEntryCardArticle } from './variants/TimelineEntryCardArticle';
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
 * Dispatcher for content-aware timeline entry rendering.
 *
 * Branches on `entry.kind`:
 *  - `text`    — existing trigger+panel rendering with `entry.content`.
 *  - `image`   — placeholder for now; filled in by Task 6.
 *  - `gallery` — placeholder for now; filled in by Tasks 7–8.
 *
 * The card chrome (border, hover slide+glow, selected/expanded states)
 * lives on the outer `.eidotter-timeline-card` element and applies to all
 * kinds.
 */
export const TimelineEntryCard = React.memo<TimelineEntryCardProps>(({
  entry,
  isSelected,
  isExpanded = false,
  onSelect,
  footer,
  children,
}) => {
  return (
    <div
      className={cn(
        'eidotter-timeline-card',
        isSelected && 'eidotter-timeline-card--selected',
        isExpanded && 'eidotter-timeline-card--expanded',
      )}
    >
      {renderBranch(entry, isExpanded, onSelect, children)}

      {footer && <div className="eidotter-timeline-card__footer">{footer}</div>}
    </div>
  );
});

TimelineEntryCard.displayName = 'TimelineEntryCard';

/**
 * Exhaustive switch over `entry.kind` so a future fourth kind triggers a
 * compile-time error via `assertNever` rather than silently falling through.
 */
function renderBranch(
  entry: TimelineEntryData,
  isExpanded: boolean,
  onSelect: ((id: string) => void) | undefined,
  children: React.ReactNode,
): React.ReactNode {
  switch (entry.kind) {
    case 'text':
      return (
        <TextBranch entry={entry} isExpanded={isExpanded} onSelect={onSelect}>
          {children}
        </TextBranch>
      );
    case 'image':
      return <TimelineEntryCardImage entry={entry} isExpanded={isExpanded} onSelect={onSelect} />;
    case 'gallery':
      return <TimelineEntryCardGallery entry={entry} isExpanded={isExpanded} onSelect={onSelect} />;
    case 'article':
      return (
        <TimelineEntryCardArticle entry={entry} isExpanded={isExpanded} onSelect={onSelect}>
          {children}
        </TimelineEntryCardArticle>
      );
    default:
      return assertNever(entry);
  }
}

function assertNever(value: never): never {
  throw new Error(`TimelineEntryCard: unhandled entry kind: ${JSON.stringify(value)}`);
}

// --- Branches --------------------------------------------------------------

interface TextBranchProps {
  entry: Extract<TimelineEntryData, { kind: 'text' }>;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
  children?: React.ReactNode;
}

const TextBranch: React.FC<TextBranchProps> = ({ entry, isExpanded, onSelect, children }) => {
  const hasStringContent = typeof entry.content === 'string';
  const hasContent = entry.content != null;

  return (
    <>
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
          const text = String(entry.content);
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
            {entry.content}
          </div>
        </div>
      )}
    </>
  );
};

