import React, { useCallback, useEffect, useState } from 'react';
import {
  Button as AriaButton,
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
  Dialog as AriaDialog,
} from 'react-aria-components';
import { Icon } from '../../Icon/components/Icon';
import { cn } from '../../../utils/cn';
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
 * Fullscreen image viewer built on the same React Aria primitives as Modal.
 *
 * Reuses Modal's CRT phosphor enter/exit animations, overlay tokens, and close
 * button styling. Adds prev/next, counter, caption, keyboard nav, and touch
 * swipe — see Tasks 4 and 5.
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const [index, setIndex] = useState(initialIndex);

  // Reset to the requested initial index whenever the lightbox is reopened.
  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

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

  if (!isOpen || images.length === 0) {
    return null;
  }

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <AriaModalOverlay
      isOpen={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      isDismissable
      className={({ isEntering, isExiting }) => cn(
        'eidotter-lightbox-overlay',
        isEntering && 'eidotter-lightbox-overlay--entering',
        isExiting && 'eidotter-lightbox-overlay--exiting',
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cn(
          'eidotter-lightbox',
          isEntering && 'eidotter-lightbox--entering',
          isExiting && 'eidotter-lightbox--exiting',
        )}
      >
        <AriaDialog
          aria-label={current.alt || 'Image viewer'}
          className="eidotter-lightbox__container outline-none"
        >
          <AriaButton
            className="eidotter-lightbox__close"
            onPress={onClose}
            aria-label="Close lightbox"
          >
            <Icon name="Close" size="S" />
          </AriaButton>

          <AriaButton
            className="eidotter-lightbox__nav eidotter-lightbox__nav--prev"
            onPress={goPrev}
            isDisabled={!hasPrev}
            aria-label="Previous image"
          >
            ◀
          </AriaButton>
          <AriaButton
            className="eidotter-lightbox__nav eidotter-lightbox__nav--next"
            onPress={goNext}
            isDisabled={!hasNext}
            aria-label="Next image"
          >
            ▶
          </AriaButton>

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
            {current.caption && (
              <figcaption className="eidotter-lightbox__caption">{current.caption}</figcaption>
            )}
          </figure>

          <span className="eidotter-lightbox__counter" aria-live="polite">
            [ {index + 1} / {images.length} ]
          </span>
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
};

Lightbox.displayName = 'Lightbox';
