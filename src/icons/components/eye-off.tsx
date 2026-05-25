import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const EyeOff: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M22 1H24V3H22V1ZM20 3H22V5H20V3ZM18 5H20V7H18V5ZM16 7H18V9H16V7ZM14 9H16V11H14V9ZM12 11H14V13H12V11ZM10 13H12V15H10V13ZM8 15H10V17H8V15ZM6 17H8V19H6V17ZM4 19H6V21H4V19ZM2 21H4V23H2V21ZM0 21H2V23H0V21ZM16 19H8V17H16V19ZM8 17H4V15H8V17ZM20 17H16V15H20V17ZM4 15H2V13H4V15ZM14 9H12V11H14V9H16V13H14V15H10V13H8V9H10V7H14V9ZM22 15H20V13H22V15ZM2 13H0V9H2V13ZM24 13H22V9H24V13ZM4 9H2V7H4V9ZM22 9H20V7H22V9ZM8 7H4V5H8V7ZM20 7H16V5H20V7ZM16 5H8V3H16V5Z" />
  </svg>
);
