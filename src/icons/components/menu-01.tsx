import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Menu01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M20 18H4V16H20V18ZM20 13H4V11H20V13ZM20 8H4V6H20V8Z" />
  </svg>
);
