import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Link01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M4 6H11V8H4V6ZM4 16H11V18H4V16ZM2 8H4V16H2V8ZM20 6H13V8H20V6ZM20 16H13V18H20V16ZM22 8H20V16H22V8ZM7 11H17V13H7V11Z" />
  </svg>
);
