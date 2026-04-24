import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const RefreshCw01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M7 4H9V6H7V4ZM9 4H11V6H9V4ZM11 4H13V6H11V4ZM13 4H15V6H13V4ZM5 6H7V8H5V6ZM15 6H17V8H15V6ZM17 8H19V10H17V8ZM3 10H5V12H3V10ZM5 10H7V12H5V10ZM17 10H19V12H17V10ZM17 12H19V14H17V12ZM3 12H5V14H3V12ZM17 14H19V16H17V14ZM5 16H7V18H5V16ZM15 16H17V18H15V16ZM7 18H9V20H7V18ZM9 18H11V20H9V18ZM11 18H13V20H11V18ZM13 18H15V20H13V18Z" />
  </svg>
);
