import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const User01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M7 5H9V3H15V5H17V9H15V11H9V9H7V5ZM17 13H7V15H15V17H17V13ZM15 17H9V21H15V17Z" />
  </svg>
);
