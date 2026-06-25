import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './Brand.css';

export interface WordmarkProps extends HTMLAttributes<HTMLSpanElement> {
  /** Add the amber phosphor text-shadow glow. Defaults to true. */
  glow?: boolean;
}

/**
 * eiDotter wordmark — "eiDotter" with the "ei" prefix dimmed against the full-bright "Dotter".
 *
 * Uses the primary DOS font (Perfect DOS VGA 437) and the amber phosphor palette.
 * Sized via `font-size` on the host; the component does not set its own size by
 * default so it inherits from the surrounding type scale. Wrap in a heading
 * element if you need semantic weight.
 */
export const Wordmark = forwardRef<HTMLSpanElement, WordmarkProps>(
  ({ glow = true, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'eidotter-wordmark font-dos',
        glow && 'eidotter-wordmark--glow',
        className,
      )}
      aria-label="eiDotter"
      {...props}
    >
      <span className="eidotter-wordmark__prefix" aria-hidden="true">ei</span>
      <span className="eidotter-wordmark__body" aria-hidden="true">Dotter</span>
    </span>
  ),
);

Wordmark.displayName = 'Wordmark';
