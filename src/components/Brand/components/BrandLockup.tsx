import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';

export interface BrandLockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo size in pixels. Defaults to 32. */
  logoSize?: number | string;
  /** Render only the logo (no wordmark). */
  iconOnly?: boolean;
  /** Render only the wordmark (no logo). */
  wordmarkOnly?: boolean;
  /** Add amber phosphor glow on both logo + wordmark. Defaults to true. */
  glow?: boolean;
}

/**
 * eiDotter brand lockup — Logo + Wordmark composed horizontally.
 *
 * The canonical public-facing brand mark. Scales by setting the host's
 * `font-size` (wordmark) and `logoSize` prop (icon). The two should stay
 * proportional: roughly `logoSize ≈ font-size × 1.75`.
 */
export const BrandLockup = forwardRef<HTMLDivElement, BrandLockupProps>(
  ({ logoSize = 32, iconOnly = false, wordmarkOnly = false, glow = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('eidotter-brand-lockup inline-flex items-center gap-3', className)}
      role="img"
      aria-label="eiDotter"
      {...props}
    >
      {!wordmarkOnly && <Logo size={logoSize} glow={glow} title="" />}
      {!iconOnly && <Wordmark glow={glow} aria-hidden="true" />}
    </div>
  ),
);

BrandLockup.displayName = 'BrandLockup';
