import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ChevronLeft: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M8 13V11H10V13H8ZM10 11V9H12V11H10ZM10 15V13H12V15H10ZM12 9V7H14V9H12ZM12 17V15H14V17H12ZM14 7V5H16V7H14ZM14 19V17H16V19H14Z" />
  </svg>
);
