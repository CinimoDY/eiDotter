import React, { useEffect, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineEntryData, TimelineImage } from '../types';
import { Lightbox } from '../../../Lightbox';
import { cn } from '../../../../utils/cn';
import './TimelineEntryCardGallery.css';

type GalleryEntry = Extract<TimelineEntryData, { kind: 'gallery' }>;

export interface TimelineEntryCardGalleryProps {
  entry: GalleryEntry;
  isExpanded: boolean;
  onSelect?: (id: string) => void;
}

type GalleryState =
  | { phase: 'grid' }
  | { phase: 'focused'; index: number }
  | { phase: 'lightbox'; index: number };

/**
 * Gallery variant of TimelineEntryCard. iOS Photos two-stage interaction:
 * grid → focused (grow-in-place) → lightbox. Resets to grid on parent
 * collapse via useEffect on `isExpanded`.
 */
export const TimelineEntryCardGallery: React.FC<TimelineEntryCardGalleryProps> = ({
  entry,
  isExpanded,
  onSelect,
}) => {
  const [state, setState] = useState<GalleryState>({ phase: 'grid' });

  // Reset when the parent card collapses, so re-expanding starts at grid.
  useEffect(() => {
    if (!isExpanded) setState({ phase: 'grid' });
  }, [isExpanded]);

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

  const handleThumbClick = (index: number, image: TimelineImage) => {
    if (image.link) return; // anchor handles navigation
    setState((prev) => {
      if (prev.phase === 'focused' && prev.index === index) {
        return { phase: 'lightbox', index };
      }
      return { phase: 'focused', index };
    });
  };

  const focusedIndex =
    state.phase === 'focused' || state.phase === 'lightbox' ? state.index : null;

  return (
    <>
      <AriaButton
        className="eidotter-timeline-card__trigger"
        onPress={() => onSelect?.(entry.id)}
        aria-expanded={isExpanded}
      >
        <p className="eidotter-timeline-card__title">{entry.title}</p>
      </AriaButton>

      <div className="eidotter-timeline-card-gallery__grid" role="list">
        {entry.images.map((img, i) => (
          <GalleryThumb
            key={i}
            image={img}
            isFocused={focusedIndex === i}
            onClick={() => handleThumbClick(i, img)}
          />
        ))}
      </div>

      <Lightbox
        images={entry.images}
        isOpen={state.phase === 'lightbox'}
        initialIndex={state.phase === 'lightbox' ? state.index : 0}
        onClose={() => {
          setState((prev) =>
            prev.phase === 'lightbox' ? { phase: 'focused', index: prev.index } : prev,
          );
        }}
        onIndexChange={(idx) => {
          setState((prev) =>
            prev.phase === 'lightbox' ? { phase: 'lightbox', index: idx } : prev,
          );
        }}
      />
    </>
  );
};

interface GalleryThumbProps {
  image: TimelineImage;
  isFocused: boolean;
  onClick: () => void;
}

const GalleryThumb: React.FC<GalleryThumbProps> = ({ image, isFocused, onClick }) => {
  const src = image.thumbnail || image.src;

  if (image.link) {
    return (
      <a
        className="eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link"
        href={image.link}
      >
        <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
             width={image.width} height={image.height} />
      </a>
    );
  }

  return (
    <div
      role="listitem"
      className={cn(
        'eidotter-timeline-card-gallery__cell',
        isFocused && 'eidotter-timeline-card-gallery__cell--focused',
      )}
      onClick={onClick}
    >
      <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
           width={image.width} height={image.height} />
    </div>
  );
};
