'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { IconButton } from '../../IconButton/components/IconButton';
import { DosDialog } from '../../DosDialog/components/DosDialog';
import type { TimelineImage } from '../../TimelineContainer/components/types';
import './Lightbox.css';

export interface LightboxProps {
  /** Images to navigate between. */
  images: TimelineImage[];
  /** Index to start on when the lightbox opens. Defaults to 0. */
  initialIndex?: number;
  /** Whether the lightbox is open. */
  isOpen: boolean;
  /** Called when the lightbox should close (close button, backdrop, Esc). */
  onClose: () => void;
  /** Optional callback fired when navigation moves to a new image. */
  onIndexChange?: (index: number) => void;
}

/**
 * Fullscreen image viewer on the DosDialog shell (DMNC-1592).
 *
 * The shell supplies the overlay, chrome, motion and the title strip;
 * the `[ n / N ]` counter is the strip's title and the close control sits at
 * its end (an IconButton). Lightbox adds prev/next (IconButtons with the pixel
 * chevrons; omitted when there is only one image), caption, keyboard nav, and
 * touch swipe. A figure taller than the body scrolls from its top edge.
 * It shares the shell's z-index (`--z-index-modal`) with Modal; stacking a
 * Lightbox over an open Modal is not a supported case.
 *
 * The close IconButton carries `eidotter-lightbox__close`. eidotter ships no
 * CSS for it; it is kept as a stable consumer hook for targeting the control.
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  // Clamp the requested initial index so callers passing stale indices
  // (e.g. Gallery.state.index after entry.images shrinks) don't crash.
  const safeInitial = images.length === 0
    ? 0
    : Math.max(0, Math.min(initialIndex, images.length - 1));
  const [index, setIndex] = useState(safeInitial);

  // Reset to the requested initial index whenever the lightbox is reopened.
  useEffect(() => {
    if (isOpen) setIndex(safeInitial);
  }, [isOpen, safeInitial]);

  // If `images` shrinks while the lightbox is open and the current index
  // would be out of bounds, snap back to the last valid image instead of
  // dereferencing undefined.
  useEffect(() => {
    if (images.length > 0 && index >= images.length) {
      setIndex(images.length - 1);
    }
  }, [images.length, index]);

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= images.length || next === index) return;
    setIndex(next);
    onIndexChange?.(next);
  }, [images.length, index, onIndexChange]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Touch swipe — minimal hand-rolled gesture, no library.
  const SWIPE_THRESHOLD = 30; // px
  const touchStartXRef = React.useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const dx = endX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) goNext();
    else goPrev();
  }, [goNext, goPrev]);

  // Keyboard navigation. React Aria handles Esc dismissal via `isDismissable`,
  // but does not own the arrow keys, so we listen at the window level while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, goPrev, goNext]);

  // Empty array: nothing to show. (Note: do NOT early-return on !isOpen here —
  // the DosDialog overlay needs to stay mounted across isOpen transitions so
  // it can play its exit animation. The overlay handles its own
  // visibility based on the `isOpen` prop.)
  if (images.length === 0) {
    return null;
  }

  // Defensive: if a render slips through with an out-of-range index before
  // the clamp effect has run, fall back to the last valid image rather than
  // crashing on undefined dereference.
  const safeIndex = Math.max(0, Math.min(index, images.length - 1));
  const current = images[safeIndex];
  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < images.length - 1;
  // One image: nothing to navigate, so no prev/next at all (two permanently
  // disabled buttons are noise). The `[ 1 / 1 ]` counter stays as the strip
  // title, so the strip keeps its heading and the position stays explicit.
  const canNavigate = images.length > 1;

  return (
    <DosDialog
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      placement="center"
      size="full"
      aria-label={current.alt || 'Image viewer'}
      className="eidotter-lightbox__container"
      head={{
        title: (
          <span className="eidotter-lightbox__counter" aria-live="polite">
            [ {safeIndex + 1} / {images.length} ]
          </span>
        ),
        end: (
          <IconButton
            icon="Close"
            label="Close lightbox"
            className="eidotter-lightbox__close"
            onPress={onClose}
          />
        ),
      }}
    >
      {/* Prev/next sit between the image and the caption (figcaption must stay
          the figure's last child). Wide: overlaid left/right of the body.
          Phone widths: a row below the image, either side of the caption. */}
      <figure className="eidotter-lightbox__figure">
        <img
          className="eidotter-lightbox__image"
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
        {canNavigate && (
          <>
            <IconButton
              icon="Chevron Left"
              label="Previous image"
              className="eidotter-lightbox__nav eidotter-lightbox__nav--prev"
              onPress={goPrev}
              isDisabled={!hasPrev}
            />
            <IconButton
              icon="Chevron Right"
              label="Next image"
              className="eidotter-lightbox__nav eidotter-lightbox__nav--next"
              onPress={goNext}
              isDisabled={!hasNext}
            />
          </>
        )}
        {current.caption && (
          <figcaption className="eidotter-lightbox__caption">{current.caption}</figcaption>
        )}
      </figure>
    </DosDialog>
  );
};

Lightbox.displayName = 'Lightbox';
