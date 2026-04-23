import React, { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import './DosFigure.css';

export interface DosFigurePin {
  /** Horizontal position as a percentage (0–100). */
  x: number;
  /** Vertical position as a percentage (0–100). */
  y: number;
  /** Pin label — short; renders next to the dot. */
  label: string;
}

export interface DosFigureProps {
  /** Title shown in the top chrome strip. Uppercase recommended. */
  title?: string;
  /** Resolution tag rendered bottom-right (e.g. `"640×480"`). */
  resolution?: string;
  /** Subject content — ASCII, SVG, or anything you'd "paint the screen" with. */
  subject: React.ReactNode;
  /** Caption rendered beneath the frame via `<figcaption>`. */
  caption?: React.ReactNode;
  /** Optional annotation pins positioned as percentages over the subject. */
  pins?: DosFigurePin[];
  /** Disables the scanline-sweep animation. Defaults to true (enabled). */
  animated?: boolean;
  /** Accessible label when `subject` has no inherent semantics. */
  ariaLabel?: string;
  /** Extra class names merged onto the `<figure>` root. */
  className?: string;
}

/**
 * DosFigure — demoscene-style placeholder for media.
 *
 * Sierra / LucasArts / demoscene title cards painted the screen with a
 * limited palette, dithering, and annotated frames. DosFigure recreates
 * that aesthetic: amber chrome, scanline sweep, optional pins, and a
 * resolution tag. Use as a lead-in for blog articles or as a placeholder
 * where a photograph would otherwise go.
 *
 * Not intended as a replacement for semantic imagery — pass `ariaLabel`
 * (or a `<figcaption>` via `caption`) so the figure is meaningful to AT.
 */
export const DosFigure = forwardRef<HTMLElement, DosFigureProps>(({
  title,
  resolution,
  subject,
  caption,
  pins = [],
  animated = true,
  ariaLabel,
  className,
}, ref) => {
  const captionId = useId();
  const describedById = caption ? captionId : undefined;

  return (
    <figure
      ref={ref}
      className={cn(
        'eidotter-dos-figure',
        animated && 'eidotter-dos-figure--animated',
        className,
      )}
      role="img"
      aria-label={ariaLabel}
      aria-describedby={describedById}
    >
      {title && (
        <div className="eidotter-dos-figure__title" aria-hidden="true">
          <span>{title}</span>
        </div>
      )}

      <div className="eidotter-dos-figure__frame">
        <div className="eidotter-dos-figure__subject">{subject}</div>

        {pins.length > 0 && (
          <ul className="eidotter-dos-figure__pins" role="list">
            {pins.map((pin, idx) => (
              <li
                key={`${pin.x}-${pin.y}-${idx}`}
                className="eidotter-dos-figure__pin"
                style={{
                  left: `${Math.max(0, Math.min(100, pin.x))}%`,
                  top: `${Math.max(0, Math.min(100, pin.y))}%`,
                }}
              >
                <span className="eidotter-dos-figure__pin-dot" aria-hidden="true" />
                <span className="eidotter-dos-figure__pin-label">{pin.label}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Scanline sweep overlay — purely decorative */}
        <span className="eidotter-dos-figure__scanline" aria-hidden="true" />

        {resolution && (
          <span className="eidotter-dos-figure__resolution" aria-hidden="true">
            {resolution}
          </span>
        )}
      </div>

      {caption && (
        <figcaption id={captionId} className="eidotter-dos-figure__caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
});

DosFigure.displayName = 'DosFigure';
