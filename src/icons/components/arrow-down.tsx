import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ArrowDown: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M13 12H19V14H17V16H15V18H13V20H11V18H9V16H7V14H5V12H11V4H13V12Z" />
  </svg>
);
