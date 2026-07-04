'use client';

import React, { useEffect, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { TimelineImage } from '../types';
import { Lightbox } from '../../../Lightbox';
import { cn } from '../../../../utils/cn';
import { isSafeHref } from '../../../../utils/isSafeHref';
import './GalleryGrid.css';

export interface GalleryGridProps {
  /** Images to render as a grid. */
  images: TimelineImage[];
  /** When false (parent collapsed) the interaction state resets to the grid. */
  isExpanded: boolean;
}

type GalleryState =
  | { phase: 'grid' }
  | { phase: 'focused'; index: number }
  | { phase: 'lightbox'; index: number };

/**
 * Shared iOS-Photos-style gallery: grid → focused (grow-in-place) → lightbox.
 *
 * Owns the full interaction state machine **and** the Lightbox mount, so both
 * the `gallery` entry variant and the `article` variant's expanded body can
 * drop it in with only `{ images, isExpanded }`. Resets to grid on parent
 * collapse via a `useEffect` on `isExpanded`.
 *
 * Class names retain the `eidotter-timeline-card-gallery__*` prefix so existing
 * gallery styling and consumer hooks keep working after the extraction.
 */
export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, isExpanded }) => {
  const [state, setState] = useState<GalleryState>({ phase: 'grid' });

  // Reset when the parent collapses, so re-expanding starts at grid.
  useEffect(() => {
    if (!isExpanded) setState({ phase: 'grid' });
  }, [isExpanded]);

  // Re-validate state.index when images shrinks — otherwise a stale index can
  // feed an out-of-range value into the Lightbox below.
  useEffect(() => {
    setState((prev) => {
      if (prev.phase === 'grid') return prev;
      if (prev.index >= images.length) return { phase: 'grid' };
      return prev;
    });
  }, [images.length]);

  if (images.length === 0) return null;

  const handleThumbClick = (index: number, image: TimelineImage) => {
    // Only short-circuit when the link will actually render as a navigable
    // anchor — unsafe schemes are stripped by GalleryThumb, in which case the
    // thumb falls back to the focus/lightbox interaction.
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

const GalleryThumb: React.FC<GalleryThumbProps> = ({ image, isFocused, onClick }) => {
  const src = image.thumbnail || image.src;
  const linkHref = image.link && isSafeHref(image.link) ? image.link : undefined;

  // Outer listitem wraps either an anchor (link mode) or a button (interactive
  // focus/lightbox mode). The listitem semantics live on the outer wrapper so
  // both modes participate in the parent role="list" consistently.
  if (linkHref) {
    return (
      <div role="listitem" className="eidotter-timeline-card-gallery__cell eidotter-timeline-card-gallery__cell--link">
        <a
          className="eidotter-timeline-card-gallery__link"
          href={linkHref}
          rel="noopener noreferrer"
        >
          <img className="eidotter-timeline-card-gallery__img" src={src} alt={image.alt}
               loading="lazy" width={image.width} height={image.height} />
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
