import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Bell01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M14 2H10V4H14V2ZM14 4H10V6H8V8H6V16H4V18H20V16H18V8H16V6H14V4ZM14 22V20H8V22H14ZM18 8H14V4H18V8Z" />
  </svg>
);
