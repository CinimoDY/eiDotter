'use client';

import React, { forwardRef, useId } from 'react';
import type { SVGProps } from 'react';

/**
 * Pixel-dotted ring (the "dotter"): 34 axis-aligned rects, brand-locked amber.
 * Shared by Logo, Mark and the static favicon (public/favicon.svg).
 */
const RING_PATHS = [
  'M20.375 9.0625H17.625V9.75H20.375V9.0625Z',
  'M16.9375 9.75H15.5625V10.4375H16.9375V9.75Z',
  'M17.625 9.75H16.9375V10.4375H17.625V9.75Z',
  'M22.4375 9.75H20.375V10.4375H22.4375V9.75Z',
  'M15.5625 10.4375H14.1875V11.125H15.5625V10.4375Z',
  'M23.8125 10.4375H22.4375V11.125H23.8125V10.4375Z',
  'M14.1875 11.125H13.5V11.8125H14.1875V11.125Z',
  'M25.1875 11.125H23.8125V11.8125H25.1875V11.125Z',
  'M13.5 11.8125H12.8125V12.5H13.5V11.8125Z',
  'M25.875 11.8125H25.1875V13.1875H25.875V11.8125Z',
  'M12.8125 12.5H12.125V13.875H12.8125V12.5Z',
  'M12.125 13.875H11.4375V15.9375H12.125V13.875Z',
  'M11.4375 15.9375H10.75V18H11.4375V15.9375Z',
  'M10.75 18H10.0625V19.375H10.75V18Z',
  'M11.4375 19.375H10.75V20.75H11.4375V19.375Z',
  'M12.125 20.75H11.4375V22.125H12.125V20.75Z',
  'M12.8125 22.125H12.125V23.5H12.8125V22.125Z',
  'M26.5625 13.1875H25.875V15.25H26.5625V13.1875Z',
  'M27.25 15.25H26.5625V17.3125H27.25V15.25Z',
  'M27.9375 17.3125H27.25V19.375H27.9375V17.3125Z',
  'M27.25 19.375H26.5625V20.75H27.25V19.375Z',
  'M26.5625 20.75H25.875V22.125H26.5625V20.75Z',
  'M25.875 22.125H25.1875V23.5H25.875V22.125Z',
  'M14.1875 23.5H12.8125V24.1875H14.1875V23.5Z',
  'M16.25 24.1875H14.1875V24.875H16.25V24.1875Z',
  'M18.3125 24.875H16.25V25.5625H18.3125V24.875Z',
  'M20.375 25.5625H18.3125V26.25H20.375V25.5625Z',
  'M22.4375 24.875H20.375V25.5625H22.4375V24.875Z',
  'M24.5 24.1875H22.4375V24.875H24.5V24.1875Z',
  'M25.1875 23.5H24.5V24.1875H25.1875V23.5Z',
  'M10.0625 15.9375H9.375V16.625H10.0625V15.9375Z',
  'M29.3125 16.625H28.625V17.3125H29.3125V16.625Z',
  'M28.625 20.75H27.9375V21.4375H28.625V20.75Z',
  'M10.75 21.4375H10.0625V22.125H10.75V21.4375Z',
] as const;

/** Soft radial halo disc and inner core disc (behind the ring). */
const HALO_PATH =
  'M19 29C25.0751 29 30 24.0751 30 18C30 11.9249 25.0751 7 19 7C12.9249 7 8 11.9249 8 18C8 24.0751 12.9249 29 19 29Z';
const CORE_PATH =
  'M19 27C23.9706 27 28 22.9706 28 18C28 13.0294 23.9706 9 19 9C14.0294 9 10 13.0294 10 18C10 22.9706 14.0294 27 19 27Z';

/** The yolk circle (r=4 centred at 18.4375,17 in viewBox units). */
const YOLK_PATH =
  'M18.4375 21C20.6466 21 22.4375 19.2091 22.4375 17C22.4375 14.7909 20.6466 13 18.4375 13C16.2284 13 14.4375 14.7909 14.4375 17C14.4375 19.2091 16.2284 21 18.4375 21Z';

/** The two pixel highlights on the yolk's upper-left shoulder. */
const HIGHLIGHT_PATHS = [
  'M16.25 15.25H15.5625V17.3125H16.25V15.25Z',
  'M18.3125 13.875H16.25V14.5625H18.3125V13.875Z',
] as const;

/** Small specular dot. */
const SPECULAR_PATH =
  'M17.5 15C17.7761 15 18 14.7761 18 14.5C18 14.2239 17.7761 14 17.5 14C17.2239 14 17 14.2239 17 14.5C17 14.7761 17.2239 15 17.5 15Z';

export interface LogoGeometryProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> {
  /** Rendered size in px (number) or any CSS length. Default 32. */
  size?: number | string;
  /** Accessible title. Empty string renders the SVG decorative (aria-hidden, no role). */
  title?: string;
}

/**
 * Internal: the one egg-yolk drawing (DMNC-1586). Logo and Mark both render
 * this, so the static logo, the animated Mark and the favicon share one
 * geometry: soft radial halo, pixel ring, a lit yolk (the Mark's radial
 * gradient #FFD97A to #FFB000 to #B87C00, lit from the upper left), two pixel
 * highlights and a white specular dot.
 *
 * Fill colours are brand-locked hexes (brand artwork reads identically across
 * themes; the "no hardcoded hex" rule governs UI surfaces). Gradient ids are
 * namespaced via useId so several marks on one page never collide; useId is
 * the only hook (it marks this leaf 'use client' for the RSC classifier).
 */
export const LogoGeometry = forwardRef<SVGSVGElement, LogoGeometryProps>(
  ({ size = 32, title = 'eiDotter', ...props }, ref) => {
    const uid = useId();
    const haloId = `eidotter-logo-halo-${uid}`;
    const coreId = `eidotter-logo-core-${uid}`;
    const yolkId = `eidotter-logo-yolk-${uid}`;
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="8 7 22 22"
        xmlns="http://www.w3.org/2000/svg"
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
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
          <radialGradient id={yolkId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.9 15.5) scale(5.6)">
            <stop stopColor="#FFD97A" />
            <stop offset="0.55" stopColor="#FFB000" />
            <stop offset="1" stopColor="#B87C00" />
          </radialGradient>
        </defs>
        <path d={HALO_PATH} fill={`url(#${haloId})`} />
        <path d={CORE_PATH} fill={`url(#${coreId})`} />
        {RING_PATHS.map((d) => (
          <path key={d} d={d} fill="#FFB000" />
        ))}
        <path d={YOLK_PATH} fill={`url(#${yolkId})`} />
        {HIGHLIGHT_PATHS.map((d) => (
          <path key={d} d={d} fill="#FFE8A8" opacity="0.8" />
        ))}
        <path d={SPECULAR_PATH} fill="#FFFFFF" opacity="0.9" />
      </svg>
    );
  },
);

LogoGeometry.displayName = 'LogoGeometry';
