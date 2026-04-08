import React, { useEffect, useRef, forwardRef } from 'react';
import {
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
  Dialog as AriaDialog,
} from 'react-aria-components';
import { Icon } from '../../Icon/components/Icon';
import { cn } from '../../../utils/cn';
import './Modal.css';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when modal should close (escape, backdrop, close button) */
  onClose: () => void;
  /**
   * Called when the modal's open state changes.
   * Enables agents to observe state transitions.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /** Modal title (required for accessibility) */
  title: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Footer content, typically action buttons */
  footer?: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * DOS-styled Modal with React Aria Dialog.
 * React Aria provides focus trapping, scroll lock, backdrop dismiss, and escape handling.
 * CRT phosphor enter/exit animations via isEntering/isExiting render props.
 * Ref forwards to the inner AriaDialog element (not the overlay).
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(({
  isOpen,
  onClose,
  onOpenChange,
  title,
  children,
  footer,
  className,
}, ref) => {
  const prevOpenRef = useRef<boolean>(isOpen);

  useEffect(() => {
    if (isOpen !== prevOpenRef.current) {
      prevOpenRef.current = isOpen;
      onOpenChange?.(isOpen);
    }
  }, [isOpen, onOpenChange]);

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <AriaModalOverlay
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      isDismissable
      className={({ isEntering, isExiting }) => cn(
        'eidotter-modal-overlay',
        isEntering && 'eidotter-modal-overlay--entering',
        isExiting && 'eidotter-modal-overlay--exiting',
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cn(
          'eidotter-modal',
          isEntering && 'eidotter-modal--entering',
          isExiting && 'eidotter-modal--exiting',
        )}
      >
        <AriaDialog
          ref={ref}
          aria-label={title}
          className={cn('eidotter-modal__container outline-none', className)}
        >
          <header className="eidotter-modal__header">
            <h2 className="eidotter-modal__title">{title}</h2>
            <button
              type="button"
              className="eidotter-modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <Icon name="Close" size="S" />
            </button>
          </header>
          <div className="eidotter-modal__body">
            {children}
          </div>
          {footer && (
            <footer className="eidotter-modal__footer">
              {footer}
            </footer>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
});

Modal.displayName = 'Modal';
