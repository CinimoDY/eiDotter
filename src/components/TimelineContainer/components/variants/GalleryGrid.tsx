'use client';

import React, { useEffect, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineImage } from '../types';
import { Lightbox } from '../../../Lightbox';
import { cn } from '../../../../utils/cn';
import { isSafeHref } from '../../../../utils/isSafeHref';

export interface GalleryGridProps {
  images: TimelineImage[];
  /** Controls reset-to-grid on collapse and defer of interactive elements. */
  isExpanded: boolean;
}

type GalleryState =
  | { phase: 'grid' }
  | { phase: 'focused'; index: number }
  | { phase: 'lightbox'; index: number };

/**
 * Shared gallery grid + Lightbox state machine.
 *
 * Used by both `TimelineEntryCardGallery` and `TimelineEntryCardArticle`.
 * iOS Photos two-stage interaction: grid → focused (grow-in-place) → lightbox.
 * Resets to grid on parent collapse via `useEffect` on `isExpanded`.
 */
export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, isExpanded }) => {
  const [state, setState] = useState<GalleryState>({ phase: 'grid' });

  // Reset when the parent card collapses so re-expanding starts at grid.
  useEffect(() => {
    if (!isExpanded) setState({ phase: 'grid' });
  }, [isExpanded]);

  // Re-validate state.index when images shrinks — prevents out-of-range Lightbox index.
  useEffect(() => {
    setState((prev) => {
      if (prev.phase === 'grid') return prev;
      if (prev.index >= images.length) return { phase: 'grid' };
      return prev;
    });
  }, [images.length]);

  const handleThumbClick = (index: number, image: TimelineImage) => {
    if (image.link && isSafeHref(image.link)) return;
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
      <div className="eidotter-timeline-card-gallery__grid" role="list">
        {images.map((img, i) => (
          <GalleryThumb
            key={i}
            image={img}
            isFocused={focusedIndex === i}
            onClick={() => handleThumbClick(i, img)}
          />
        ))}
      </div>

      <Lightbox
        images={images}
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

export const GalleryThumb: React.FC<GalleryThumbProps> = ({ image, isFocused, onClick }) => {
  const src = image.thumbnail || image.src;
  const linkHref = image.link && isSafeHref(image.link) ? image.link : undefined;

  if (linkHref) {
    return (
      <div role="listitem" className="eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link">
        <a
          className="eidotter-timeline-card-gallery__link"
          href={linkHref}
          rel="noopener noreferrer"
        >
          <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
               width={image.width} height={image.height} />
        </a>
      </div>
    );
  }

  return (
    <div
      role="listitem"
      className={cn(
        'eidotter-timeline-card-gallery__cell',
        isFocused && 'eidotter-timeline-card-gallery__cell--focused',
      )}
    >
      <AriaButton
        className="eidotter-timeline-card-gallery__button"
        onPress={onClick}
        aria-label={image.alt || 'Image'}
        aria-pressed={isFocused}
      >
        <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
             width={image.width} height={image.height} />
      </AriaButton>
    </div>
  );
};
