import type { FC } from 'react';
import type { IconSvgProps } from '../types.js';

export const DotsHorizontal: FC<IconSvgProps> = ({ size = 24, title, ...props }) => (
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
    <path d="M7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11Z" />
  </svg>
);
