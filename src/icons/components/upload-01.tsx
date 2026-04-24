import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Upload01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M19 21H5V19H19V21ZM5 19H3V15H5V19ZM21 19H19V15H21V19ZM13 5H15V7H17V9H13V17H11V9H7V7H9V5H11V3H13V5Z" />
  </svg>
);
