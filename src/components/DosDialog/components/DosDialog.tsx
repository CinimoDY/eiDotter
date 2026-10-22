'use client';

import React, { forwardRef, isValidElement, useId } from 'react';
import {
  ModalOverlay as AriaModalOverlay,
  Modal as AriaModal,
  Dialog as AriaDialog,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import '../../../styles/keyframes.css';
import './DosDialog.css';

export type DosDialogPlacement = 'center' | 'top';
export type DosDialogSize = 'sm' | 'md' | 'lg' | 'full';

/** Structured head for the title strip. */
export interface DosDialogHead {
  /** Title text. Rendered as the dialog's `<h2>` unless `decorative` is set. */
  title: React.ReactNode;
  /** Trailing slot on the right of the strip: close button, status, controls. */
  end?: React.ReactNode;
  /** Show the leading `▸` marker. Defaults to `true`. */
  marker?: boolean;
  /**
   * Visual-only strip: hidden from assistive tech, and the title renders as a
   * `<span>` instead of an `<h2>`. Use when the dialog is named by `aria-label`
   * and the strip repeats nothing a screen reader needs (CmdPalette's
   * `JUMP TO` banner). Do not put focusable controls in `end` when this is set.
   */
  decorative?: boolean;
}

export interface DosDialogProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the dialog requests open/close (Escape, backdrop click). */
  onOpenChange?: (open: boolean) => void;
  /** Vertical anchor: `center` (default) or `top` (~18vh, CmdPalette's anchor). */
  placement?: DosDialogPlacement;
  /**
   * Width step, shared by every dialog: `sm` 24rem, `md` 30rem (default),
   * `lg` 40rem, `full` = viewport width minus 2 × spacing-4. Every step is
   * capped at the viewport minus 32px.
   */
  size?: DosDialogSize;
  /**
   * The title strip (dark, yellow title, dim-amber rule). Pass `{ title, end?, marker?, decorative? }` for the
   * standard strip, or any ReactNode to fill the strip yourself. Omit for no strip.
   */
  head?: React.ReactNode | DosDialogHead;
  /** Footer row, separated from the body by a 1px rule. Rendered in a `<div>` (no contentinfo landmark). */
  footer?: React.ReactNode;
  /** Close on backdrop click / outside interaction. Escape always closes. Defaults to `true`. */
  isDismissable?: boolean;
  /** Accessible name. When omitted, a non-decorative `head.title` names the dialog. */
  'aria-label'?: string;
  /** Id of the element that names the dialog. */
  'aria-labelledby'?: string;
  /** Extra classes merged onto the visible container (`.eidotter-dialog__container`). */
  className?: string;
  /** Dialog body. */
  children?: React.ReactNode;
}

function isHeadObject(head: DosDialogProps['head']): head is DosDialogHead {
  return (
    typeof head === 'object' &&
    head !== null &&
    !isValidElement(head) &&
    !Array.isArray(head) &&
    'title' in head
  );
}

/**
 * DosDialog: the one overlay shell (DMNC-1592).
 *
 * The CmdPalette chrome, generalised: brand-coloured medium border with an
 * amber phosphor glow, square corners, a blurred scrim, and a dark title
 * strip (yellow title, `▸` marker, dim-amber rule below). Modal, Lightbox and
 * CmdPalette are built on it.
 *
 * React Aria `ModalOverlay > Modal > Dialog` provides the focus trap, scroll
 * lock, Escape and backdrop dismissal. The panel pops in/out with the shared
 * `eidotter-pop-in/out` keyframes (scale 0.8 to 1, the CRT turn-on) and the
 * scrim fades; under reduced motion the entering/exiting classes are not applied at all.
 *
 * Ref forwards to the dialog element (`.eidotter-dialog__container`).
 */
export const DosDialog = forwardRef<HTMLElement, DosDialogProps>(({
  open,
  onOpenChange,
  placement = 'center',
  size = 'md',
  head,
  footer,
  isDismissable = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  children,
}, ref) => {
  const titleId = useId();
  const reduced = prefersReducedMotion();

  const structured = isHeadObject(head) ? head : null;
  const labelledBy =
    ariaLabelledBy ??
    (!ariaLabel && structured && !structured.decorative ? titleId : undefined);

  let strip: React.ReactNode = null;
  if (structured) {
    const { title, end, marker = true, decorative = false } = structured;
    const TitleTag = decorative ? 'span' : 'h2';
    strip = (
      <div className="eidotter-dialog__head" aria-hidden={decorative || undefined}>
        <div className="eidotter-dialog__lead">
          {marker && (
            <span className="eidotter-dialog__marker" aria-hidden="true">▸</span>
          )}
          <TitleTag id={titleId} className="eidotter-dialog__title">{title}</TitleTag>
        </div>
        {end != null && end !== false && (
          <div className="eidotter-dialog__end">{end}</div>
        )}
      </div>
    );
  } else if (head != null && head !== false) {
    strip = <div className="eidotter-dialog__head">{head as React.ReactNode}</div>;
  }

  return (
    <AriaModalOverlay
      isOpen={open}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      className={({ isEntering, isExiting }) => cn(
        'eidotter-dialog__overlay',
        `eidotter-dialog__overlay--${placement}`,
        !reduced && isEntering && 'eidotter-dialog__overlay--entering',
        !reduced && isExiting && 'eidotter-dialog__overlay--exiting',
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cn(
          'eidotter-dialog',
          `eidotter-dialog--${size}`,
          `eidotter-dialog--${placement}`,
          !reduced && isEntering && 'eidotter-dialog--entering',
          !reduced && isExiting && 'eidotter-dialog--exiting',
        )}
      >
        <AriaDialog
          ref={ref}
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          className={cn('eidotter-dialog__container outline-none', className)}
        >
          {strip}
          <div className="eidotter-dialog__body">{children}</div>
          {footer != null && footer !== false && (
            <div className="eidotter-dialog__footer">{footer}</div>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
});

DosDialog.displayName = 'DosDialog';
