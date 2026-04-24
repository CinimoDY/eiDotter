import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const FilterLines: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M2 5H4V7H2V5ZM4 5H6V7H4V5ZM6 5H8V7H6V5ZM8 5H10V7H8V5ZM10 5H12V7H10V5ZM12 5H14V7H12V5ZM14 5H16V7H14V5ZM16 5H18V7H16V5ZM18 5H20V7H18V5ZM20 5H22V7H20V5ZM4 9H6V11H4V9ZM6 9H8V11H6V9ZM8 9H10V11H8V9ZM10 9H12V11H10V9ZM12 9H14V11H12V9ZM14 9H16V11H14V9ZM16 9H18V11H16V9ZM18 9H20V11H18V9ZM6 13H8V15H6V13ZM8 13H10V15H8V13ZM10 13H12V15H10V13ZM12 13H14V15H12V13ZM14 13H16V15H14V13ZM16 13H18V15H16V13ZM8 17H10V19H8V17ZM10 17H12V19H10V17ZM12 17H14V19H12V17ZM14 17H16V19H14V17Z" />
  </svg>
);
