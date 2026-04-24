import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Loading01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M13 22H11V16H13V22ZM7 19H5V17H7V19ZM19 19H17V17H19V19ZM9 17H7V15H9V17ZM17 17H15V15H17V17ZM8 13H2V11H8V13ZM22 13H16V11H22V13ZM9 9H7V7H9V9ZM17 9H15V7H17V9ZM13 8H11V2H13V8ZM7 7H5V5H7V7ZM19 7H17V5H19V7Z" />
  </svg>
);
