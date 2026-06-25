'use client';

import React, { forwardRef, useId } from 'react';
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
 * eiDotter brand mark — the Foundation Logomark (Figma node 16-610):
 * a pixel-dotted ring (the "dotter") around the amber yolk, with pixel
 * specular highlights and a soft radial phosphor halo. Mark only, on
 * transparent — the iOS-style app-icon container in the Figma component
 * is an app-icon artifact, not part of the inline mark.
 *
 * Fill colors are brand-locked (explicit amber hexes) rather than themed so
 * the mark reads identically across themes. Gradient ids are namespaced via
 * useId so multiple logos per page (header + footer) don't collide.
 */
export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = 32, glow = true, title = 'eiDotter', className, ...props }, ref) => {
    const uid = useId();
    const haloId = `eidotter-logo-halo-${uid}`;
    const coreId = `eidotter-logo-core-${uid}`;
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="8 7 22 22"
        xmlns="http://www.w3.org/2000/svg"
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
        className={cn('eidotter-logo', glow && 'eidotter-logo--glow', className)}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        <defs>
          <radialGradient id={haloId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19 19.1) scale(13.2)">
            <stop stopColor="#FFB000" stopOpacity="0.3" />
            <stop offset="1" stopColor="#020003" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={coreId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19 18.9) scale(9.9)">
            <stop stopColor="#FFB000" stopOpacity="0.45" />
            <stop offset="0.6" stopColor="#9A5700" stopOpacity="0.22" />
            <stop offset="1" stopColor="#020003" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M19 29C25.0751 29 30 24.0751 30 18C30 11.9249 25.0751 7 19 7C12.9249 7 8 11.9249 8 18C8 24.0751 12.9249 29 19 29Z" fill={`url(#${haloId})`} />
        <path d="M19 27C23.9706 27 28 22.9706 28 18C28 13.0294 23.9706 9 19 9C14.0294 9 10 13.0294 10 18C10 22.9706 14.0294 27 19 27Z" fill={`url(#${coreId})`} />
        <path d="M20.375 9.0625H17.625V9.75H20.375V9.0625Z" fill="#FFB000" />
        <path d="M16.9375 9.75H15.5625V10.4375H16.9375V9.75Z" fill="#FFB000" />
        <path d="M17.625 9.75H16.9375V10.4375H17.625V9.75Z" fill="#FFB000" />
        <path d="M22.4375 9.75H20.375V10.4375H22.4375V9.75Z" fill="#FFB000" />
        <path d="M15.5625 10.4375H14.1875V11.125H15.5625V10.4375Z" fill="#FFB000" />
        <path d="M23.8125 10.4375H22.4375V11.125H23.8125V10.4375Z" fill="#FFB000" />
        <path d="M14.1875 11.125H13.5V11.8125H14.1875V11.125Z" fill="#FFB000" />
        <path d="M25.1875 11.125H23.8125V11.8125H25.1875V11.125Z" fill="#FFB000" />
        <path d="M13.5 11.8125H12.8125V12.5H13.5V11.8125Z" fill="#FFB000" />
        <path d="M25.875 11.8125H25.1875V13.1875H25.875V11.8125Z" fill="#FFB000" />
        <path d="M12.8125 12.5H12.125V13.875H12.8125V12.5Z" fill="#FFB000" />
        <path d="M12.125 13.875H11.4375V15.9375H12.125V13.875Z" fill="#FFB000" />
        <path d="M11.4375 15.9375H10.75V18H11.4375V15.9375Z" fill="#FFB000" />
        <path d="M10.75 18H10.0625V19.375H10.75V18Z" fill="#FFB000" />
        <path d="M11.4375 19.375H10.75V20.75H11.4375V19.375Z" fill="#FFB000" />
        <path d="M12.125 20.75H11.4375V22.125H12.125V20.75Z" fill="#FFB000" />
        <path d="M12.8125 22.125H12.125V23.5H12.8125V22.125Z" fill="#FFB000" />
        <path d="M26.5625 13.1875H25.875V15.25H26.5625V13.1875Z" fill="#FFB000" />
        <path d="M27.25 15.25H26.5625V17.3125H27.25V15.25Z" fill="#FFB000" />
        <path d="M27.9375 17.3125H27.25V19.375H27.9375V17.3125Z" fill="#FFB000" />
        <path d="M27.25 19.375H26.5625V20.75H27.25V19.375Z" fill="#FFB000" />
        <path d="M26.5625 20.75H25.875V22.125H26.5625V20.75Z" fill="#FFB000" />
        <path d="M25.875 22.125H25.1875V23.5H25.875V22.125Z" fill="#FFB000" />
        <path d="M14.1875 23.5H12.8125V24.1875H14.1875V23.5Z" fill="#FFB000" />
        <path d="M16.25 24.1875H14.1875V24.875H16.25V24.1875Z" fill="#FFB000" />
        <path d="M18.3125 24.875H16.25V25.5625H18.3125V24.875Z" fill="#FFB000" />
        <path d="M20.375 25.5625H18.3125V26.25H20.375V25.5625Z" fill="#FFB000" />
        <path d="M22.4375 24.875H20.375V25.5625H22.4375V24.875Z" fill="#FFB000" />
        <path d="M24.5 24.1875H22.4375V24.875H24.5V24.1875Z" fill="#FFB000" />
        <path d="M25.1875 23.5H24.5V24.1875H25.1875V23.5Z" fill="#FFB000" />
        <path d="M10.0625 15.9375H9.375V16.625H10.0625V15.9375Z" fill="#FFB000" />
        <path d="M29.3125 16.625H28.625V17.3125H29.3125V16.625Z" fill="#FFB000" />
        <path d="M28.625 20.75H27.9375V21.4375H28.625V20.75Z" fill="#FFB000" />
        <path d="M10.75 21.4375H10.0625V22.125H10.75V21.4375Z" fill="#FFB000" />
        <path d="M18.4375 21C20.6466 21 22.4375 19.2091 22.4375 17C22.4375 14.7909 20.6466 13 18.4375 13C16.2284 13 14.4375 14.7909 14.4375 17C14.4375 19.2091 16.2284 21 18.4375 21Z" fill="#FFB000" />
        <path d="M16.25 15.25H15.5625V17.3125H16.25V15.25Z" fill="#FFC233" />
        <path d="M18.3125 13.875H16.25V14.5625H18.3125V13.875Z" fill="#FFC233" />
        <path d="M16.25 14.5625H15.5625V15.25H16.25V14.5625Z" fill="#FFC233" />
        <path d="M17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17Z" fill="#FFD97A" />
        <path d="M17.5 15C17.7761 15 18 14.7761 18 14.5C18 14.2239 17.7761 14 17.5 14C17.2239 14 17 14.2239 17 14.5C17 14.7761 17.2239 15 17.5 15Z" fill="#FFE8A8" />
      </svg>
    );
  },
);

Logo.displayName = 'Logo';
