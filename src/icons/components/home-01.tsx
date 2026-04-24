import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Home01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M4 20H20V22H4V20ZM20 10H22V20H20V10ZM2 10H4V20H2V10ZM4 8H6V10H4V8ZM6 6H8V8H6V6ZM8 4H10V6H8V4ZM10 2H14V4H10V2ZM14 4H16V6H14V4ZM16 6H18V8H16V6ZM18 8H20V10H18V8ZM8 14H10V20H8V14ZM10 12H14V14H10V12ZM14 14H16V20H14V14Z" />
  </svg>
);
