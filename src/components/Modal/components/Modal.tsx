import React, { useEffect, useRef, useId, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../Icon/components/Icon';
import { useThemePortal } from '../../../hooks/useThemePortal';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import './Modal.css';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Called when modal should close (escape, backdrop, close button)
   */
  onClose: () => void;
  /**
   * Called when the modal's open state actually changes.
   * Fires after the dialog opens or closes, enabling agents
   * to observe state transitions (e.g. form ready, dialog dismissed).
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Modal title (required for accessibility)
   */
  title: string;
  /**
   * Modal body content
   */
  children: React.ReactNode;
  /**
   * Footer content, typically action buttons
   */
  footer?: React.ReactNode;
  /**
   * Optional CSS class name
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  title,
  children,
  footer,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const prevOpenRef = useRef<boolean>(isOpen);
  const closingRef = useRef<boolean>(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);
  const portalContainer = useThemePortal(anchorRef);

  /**
   * Play the close animation, then actually close the dialog.
   * If reduced-motion is active, close instantly.
   */
  const closeWithAnimation = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || closingRef.current) return;

    if (prefersReducedMotion()) {
      dialog.close();
      return;
    }

    closingRef.current = true;
    setClosing(true);
  }, []);

  // Handle animationend to actually close the dialog after exit animation
  const handleAnimationEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === 'modal-crt-exit' && closingRef.current) {
      closingRef.current = false;
      setClosing(false);
      const dialog = dialogRef.current;
      if (dialog?.open) {
        dialog.close();
      }
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && closingRef.current) {
      // Abort close animation if reopened before it finishes
      closingRef.current = false;
      setClosing(false);
    } else if (isOpen && !dialog.open) {
      closingRef.current = false;
      setClosing(false);
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      closeWithAnimation();
    }

    // Fire onOpenChange when state actually transitions
    if (isOpen !== prevOpenRef.current) {
      prevOpenRef.current = isOpen;
      onOpenChange?.(isOpen);
    }
  }, [isOpen, onOpenChange, closeWithAnimation]);

  // Handle native close event (escape key, form submission)
  const handleClose = () => {
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const dialogClassName = [
    'modal',
    closing ? 'modal--closing' : '',
    className,
  ].filter(Boolean).join(' ');

  // Anchor lives in the React tree so useThemePortal can find the nearest
  // [data-theme] ancestor. The portal container inherits that theme.
  return (
    <>
      <span ref={anchorRef} style={{ display: 'none' }} aria-hidden="true" />
      {portalContainer && createPortal(
        <dialog
          ref={dialogRef}
          className={dialogClassName}
          aria-labelledby={titleId}
          onClose={handleClose}
          onClick={handleBackdropClick}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="modal__container">
            <header className="modal__header">
              <h2 id={titleId} className="modal__title">{title}</h2>
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon name="Close" size="S" />
              </button>
            </header>
            <div className="modal__body">
              {children}
            </div>
            {footer && (
              <footer className="modal__footer">
                {footer}
              </footer>
            )}
          </div>
        </dialog>,
        portalContainer
      )}
    </>
  );
};
