import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ArrowRight: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M12 13H4V11H12V5H14V7H16V9H18V11H20V13H18V15H16V17H14V19H12V13Z" />
  </svg>
);
