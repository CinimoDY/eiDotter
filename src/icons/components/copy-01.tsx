import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Copy01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M8 6H20V8H8V6ZM4 2H16V4H4V2ZM6 8H8V20H6V8ZM2 4H4V16H2V4ZM8 20H20V22H8V20ZM20 8H22V20H20V8ZM16 4H18V6H16V4ZM4 16H6V18H4V16Z" />
  </svg>
);
