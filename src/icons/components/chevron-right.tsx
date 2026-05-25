import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ChevronRight: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M16 13V11H14V13H16ZM14 11V9H12V11H14ZM14 15V13H12V15H14ZM12 9V7H10V9H12ZM12 17V15H10V17H12ZM10 7V5H8V7H10ZM10 19V17H8V19H10Z" />
  </svg>
);
