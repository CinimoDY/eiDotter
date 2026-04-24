import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ArrowUp: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M13 4V6H15V8H17V10H19V12H13V20H11V12H5V10H7V8H9V6H11V4H13Z" />
  </svg>
);
