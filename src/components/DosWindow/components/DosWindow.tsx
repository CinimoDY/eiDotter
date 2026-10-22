import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './DosWindow.css';

export interface DosWindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Strip title. Omit (with no `controls`) for a frame without a strip. */
  title?: React.ReactNode;
  /** Show the leading `▸` marker in the strip. Defaults to `true`. */
  marker?: boolean;
  /**
   * Active window: strip title in the active colour. Inactive dims the
   * strip title to `text-muted`. Defaults to `true`.
   */
  active?: boolean;
  /**
   * Window controls for the strip's end slot, usually `IconButton`s at
   * `size="window"`. Consumer-supplied so DosWindow stays presentational.
   */
  controls?: React.ReactNode;
  /** Footer row, separated from the body by a 1px rule. */
  footer?: React.ReactNode;
  /** Extra classes merged onto the root (`.eidotter-window`). */
  className?: string;
  /** Window body. */
  children?: React.ReactNode;
}

/**
 * DosWindow: the window chrome for in-page panels (DMNC-1592).
 *
 * The same title strip as DosDialog (dark, uppercase xs title, `▸` marker,
 * 1px dim-amber rule) on a frame of brand border plus `--shadow-drop`, with
 * no glow and no backdrop. DosFigure and Card are built on it.
 *
 * Server-safe and presentational: no hooks, no handlers. Controls are passed
 * in by the consumer. The strip title is a plain `<span>`; it is not a
 * heading, so pass your own heading element as `title` if the window needs
 * one in the document outline.
 *
 * Ref forwards to the root `<div>`.
 */
export const DosWindow = forwardRef<HTMLDivElement, DosWindowProps>(({
  title,
  marker = true,
  active = true,
  controls,
  footer,
  className,
  children,
  ...rest
}, ref) => {
  const hasTitle = title != null && title !== false && title !== '';
  const hasControls = controls != null && controls !== false;

  return (
    <div
      ref={ref}
      className={cn('eidotter-window', !active && 'eidotter-window--inactive', className)}
      data-active={active ? 'true' : 'false'}
      {...rest}
    >
      {(hasTitle || hasControls) && (
        <div className="eidotter-window__strip">
          <div className="eidotter-window__lead">
            {marker && hasTitle && (
              <span className="eidotter-window__marker" aria-hidden="true">▸</span>
            )}
            {hasTitle && <span className="eidotter-window__title">{title}</span>}
          </div>
          {hasControls && <div className="eidotter-window__controls">{controls}</div>}
        </div>
      )}
      <div className="eidotter-window__body">{children}</div>
      {footer != null && footer !== false && (
        <div className="eidotter-window__footer">{footer}</div>
      )}
    </div>
  );
});

DosWindow.displayName = 'DosWindow';
