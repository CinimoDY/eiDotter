import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Star01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M11 6H13V8H11V6ZM11 8H13V10H11V8ZM5 10H7V12H5V10ZM7 10H9V12H7V10ZM9 10H11V12H9V10ZM11 10H13V12H11V10ZM13 10H15V12H13V10ZM15 10H17V12H15V10ZM17 10H19V12H17V10ZM7 12H9V14H7V12ZM9 12H11V14H9V12ZM11 12H13V14H11V12ZM13 12H15V14H13V12ZM15 12H17V14H15V12ZM7 14H9V16H7V14ZM9 14H11V16H9V14ZM13 14H15V16H13V14ZM15 14H17V16H15V14ZM7 16H9V18H7V16ZM15 16H17V18H15V16Z" />
  </svg>
);
