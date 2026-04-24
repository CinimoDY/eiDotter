import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Expand01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M4 13H20V11H4V13ZM11 5H13V3H11V5ZM9 7H13V5H9V7ZM13 7H15V5H13V7ZM15 9H17V7H15V9ZM7 9H15V7H7V9ZM11 19H13V21H11V19ZM9 17H13V19H9V17ZM13 17H15V19H13V17ZM15 15H17V17H15V15ZM7 15H15V17H7V15Z" />
  </svg>
);
