import React, { forwardRef } from 'react';
import type { SVGProps } from 'react';
import { cn } from '../../../utils/cn';
import { LogoGeometry } from './LogoGeometry';
import './Brand.css';

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> {
  /** Icon size in pixels. Defaults to 32. Pass a number or CSS-valid string. */
  size?: number | string;
  /** Add the amber phosphor drop-shadow glow (5px). Defaults to true. */
  glow?: boolean;
  /** Accessible label. Defaults to "eiDotter". Set to empty string for decorative use. */
  title?: string;
}

/**
 * eiDotter brand mark, the Foundation Logomark (Figma node 16-610):
 * a pixel-dotted ring (the "dotter") around a lit amber yolk, with pixel
 * specular highlights and a soft radial phosphor halo. Mark only, on
 * transparent; the iOS-style app-icon container in the Figma component
 * is an app-icon artifact, not part of the inline mark.
 *
 * Static counterpart of `<Mark>`: both render the internal `LogoGeometry`
 * (DMNC-1586), so the logo, the animated mark and the favicon are one drawing.
 * Logo itself is hook-free; the `useId` client leaf is LogoGeometry.
 */
export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = 32, glow = true, title = 'eiDotter', className, ...props }, ref) => (
    <LogoGeometry
      ref={ref}
      size={size}
      title={title}
      className={cn('eidotter-logo', glow && 'eidotter-logo--glow', className)}
      {...props}
    />
  ),
);

Logo.displayName = 'Logo';
