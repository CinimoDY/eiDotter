import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Plus: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M13 11H20V13H13V20H11V13H4V11H11V4H13V11Z" />
  </svg>
);
