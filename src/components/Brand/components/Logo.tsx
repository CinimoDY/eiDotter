import React, { forwardRef } from 'react';
import type { SVGProps } from 'react';
import { cn } from '../../../utils/cn';
import './Brand.css';

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> {
  /** Icon size in pixels. Defaults to 32. Pass a number or CSS-valid string. */
  size?: number | string;
  /** Add the amber phosphor drop-shadow glow. Defaults to true. */
  glow?: boolean;
  /** Accessible label. Defaults to "eiDotter". Set to empty string for decorative use. */
  title?: string;
}

/**
 * eiDotter brand mark — V2 yolk (pure, no legs).
 *
 * The "payload" of the eiDotter identity — a bright CGA amber yolk with a soft
 * highlight and specular, no shell or drip ornamentation. Scales cleanly from
 * 16px (favicon) to hero sizes without the 1px shell outline collapsing into
 * mush at small sizes.
 *
 * Colors inherit from CSS variables where possible so the mark adapts across
 * amber-mono, cga-amber, cga-mode4, and cga-mode5 themes. Override the SVG
 * fills with the `style` prop if you need brand-locked colors.
 */
export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = 32, glow = true, title = 'eiDotter', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      className={cn('eidotter-logo', glow && 'eidotter-logo--glow', className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="16" cy="16" r="11" fill="var(--eidotter-logo-base, #FFB000)" />
      <circle cx="12" cy="12" r="3.2" fill="var(--eidotter-logo-highlight, #FFD97A)" />
      <circle cx="11" cy="11" r="1.1" fill="var(--eidotter-logo-specular, #FFE8A8)" />
    </svg>
  ),
);

Logo.displayName = 'Logo';
