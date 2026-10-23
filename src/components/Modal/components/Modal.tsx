'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { IconButton } from '../../IconButton/components/IconButton';
import { DosDialog } from '../../DosDialog/components/DosDialog';
import type { DosDialogSize } from '../../DosDialog/components/DosDialog';
import { cn } from '../../../utils/cn';
import './Modal.css';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal's open state changes (React Aria convention) */
  onOpenChange?: (isOpen: boolean) => void;
  /** @deprecated Use `onOpenChange` instead. Called when modal should close. */
  onClose?: () => void;
  /** Modal title (required for accessibility). Rendered in the title strip. */
  title: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Footer content, typically action buttons */
  footer?: React.ReactNode;
  /**
   * Width step from the shared dialog map (DosDialog): `sm` 24rem,
   * `md` 30rem (default, the historical 480px), `lg` 40rem, `full`.
   */
  size?: DosDialogSize;
  /** Close on backdrop click. Escape and the close button always close. Defaults to `true`. */
  isDismissable?: boolean;
  /** Optional CSS class name, merged onto the dialog container */
  className?: string;
}

/**
 * DOS-styled Modal on the DosDialog shell (DMNC-1592).
 * The title sits in the title strip with the close control at its end; the
 * footer keeps its 1px top rule. React Aria provides focus trapping, scroll
 * lock, backdrop dismiss, and escape handling.
 * Ref forwards to the dialog element (not the overlay).
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(({
  isOpen,
  onOpenChange,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  isDismissable = true,
  className,
}, ref) => {
  const prevOpenRef = useRef<boolean>(isOpen);
  const interactionRef = useRef(false);

  // Notify onOpenChange on prop-driven state changes only (observer pattern for agents).
  // User-initiated changes are handled in handleOpenChange to avoid double-firing.
  useEffect(() => {
    if (isOpen !== prevOpenRef.current) {
      prevOpenRef.current = isOpen;
      if (!interactionRef.current) {
        onOpenChange?.(isOpen);
        if (!isOpen) onClose?.();
      }
      interactionRef.current = false;
    }
  }, [isOpen, onOpenChange, onClose]);

  const handleOpenChange = (open: boolean) => {
    interactionRef.current = true;
    onOpenChange?.(open);
    if (!open) onClose?.();
  };

  return (
    <DosDialog
      ref={ref}
      open={isOpen}
      onOpenChange={handleOpenChange}
      isDismissable={isDismissable}
      size={size}
      aria-label={title}
      className={cn('eidotter-modal__container', className)}
      head={{
        title,
        end: (
          <IconButton
            icon="Close"
            label="Close modal"
            className="eidotter-modal__close"
            onPress={() => handleOpenChange(false)}
          />
        ),
      }}
      /* Modal keeps its <footer> element (role=contentinfo) inside the shell slot. */
      footer={footer ? <footer className="eidotter-modal__footer">{footer}</footer> : undefined}
    >
      <div className="eidotter-modal__body">{children}</div>
    </DosDialog>
  );
});

Modal.displayName = 'Modal';
