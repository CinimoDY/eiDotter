import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../Icon/components/Icon';
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
  const prevOpenRef = useRef<boolean>(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    // Fire onOpenChange when state actually transitions
    if (isOpen !== prevOpenRef.current) {
      prevOpenRef.current = isOpen;
      onOpenChange?.(isOpen);
    }
  }, [isOpen, onOpenChange]);

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

  // Portal to body to avoid stacking context issues
  return createPortal(
    <dialog
      ref={dialogRef}
      className={`modal ${className}`.trim()}
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={handleBackdropClick}
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
    document.body
  );
};
