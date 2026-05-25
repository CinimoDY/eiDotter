import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const X: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M4 4H6V6H4V4ZM18 4H20V6H18V4ZM6 6H8V8H6V6ZM16 6H18V8H16V6ZM8 8H10V10H8V8ZM14 8H16V10H14V8ZM10 10H12V12H10V10ZM12 10H14V12H12V10ZM10 12H12V14H10V12ZM12 12H14V14H12V12ZM8 14H10V16H8V14ZM14 14H16V16H14V14ZM6 16H8V18H6V16ZM16 16H18V18H16V16ZM4 18H6V20H4V18ZM18 18H20V20H18V18Z" />
  </svg>
);
