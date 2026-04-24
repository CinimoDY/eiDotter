import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Mail01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M22 4H2V20H22V4ZM4 8V18H20V8L12 13L4 8ZM18.566 6L12 10.103L5.434 6H18.566Z" />
  </svg>
);
