import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const DotsVertical: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M11 7H13V9H11V7ZM11 11H13V13H11V11ZM11 15H13V17H11V15Z" />
  </svg>
);
