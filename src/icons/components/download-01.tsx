import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const Download01: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M19 21H5V19H19V21Z" />
    <path d="M5 19H3V15H5V19Z" />
    <path d="M21 19H19V15H21V19Z" />
    <path d="M13 11H17V13H15V15H13V17H11V15H9V13H7V11H11V3H13V11Z" />
  </svg>
);
