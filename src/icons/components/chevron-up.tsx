import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const ChevronUp: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M13 8H11V10H13V8ZM11 10H9V12H11V10ZM15 10H13V12H15V10ZM9 12H7V14H9V12ZM17 12H15V14H17V12ZM7 14H5V16H7V14ZM19 14H17V16H19V14Z" />
  </svg>
);
