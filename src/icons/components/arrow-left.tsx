import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ArrowLeft: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M12 19H10V17H8V15H6V13H4V11H6V9H8V7H10V5H12V11H20V13H12V19Z" />
  </svg>
);
