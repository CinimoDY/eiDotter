'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData } from '../types';
import { GalleryGrid } from './GalleryGrid';
import './TimelineEntryCardGallery.css';

type GalleryEntry = Extract<TimelineEntryData, { kind: 'gallery' }>;

export interface TimelineEntryCardGalleryProps {
  entry: GalleryEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
}

/**
 * Gallery variant of TimelineEntryCard. iOS Photos two-stage interaction:
 * grid → focused (grow-in-place) → lightbox. Delegates the state machine to
 * the shared `GalleryGrid` component.
 */
export const TimelineEntryCardGallery: React.FC<TimelineEntryCardGalleryProps> = ({
  entry,
  isExpanded,
  onSelect,
}) => {
  if (entry.images.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[eidotter] TimelineEntryCard kind="gallery" entry "${entry.id}" has no images.`);
    }
    return (
      <>
        <p className="eidotter-timeline-card__title">{entry.title}</p>
        <p className="eidotter-timeline-card-gallery__empty">No images.</p>
      </>
    );
  }

  return (
    <>
      <AriaButton
        className="eidotter-timeline-card__trigger"
        onPress={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
      >
        <p className="eidotter-timeline-card__title">{entry.title}</p>
      </AriaButton>

      <GalleryGrid images={entry.images} isExpanded={isExpanded} />
    </>
  );
};
