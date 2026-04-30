import React, { useEffect, useState } from 'react';
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
  // onIndexChange is part of the public API but unused in this skeleton; Task 4 wires it up.
  void onIndexChange;
  const [index, setIndex] = useState(initialIndex);

  // Reset to the requested initial index whenever the lightbox is reopened.
  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const current = images[index];

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
          <figure className="eidotter-lightbox__figure">
            <img
              className="eidotter-lightbox__image"
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
            />
            {current.caption && (
              <figcaption className="eidotter-lightbox__caption">{current.caption}</figcaption>
            )}
          </figure>
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
};

Lightbox.displayName = 'Lightbox';
