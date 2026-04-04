import React from 'react';
import { cn } from '../../../utils/cn';
import './Badge.css';

export interface BadgeProps {
  /** The variant determines the badge's color scheme */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'
    | 'brand' | 'gray' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';
  /** The size of the badge */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium';
  /** Show a dot indicator before the text */
  dot?: boolean;
  /** Badge content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional aria-label for accessibility */
  'aria-label'?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-[10px] px-1.5 py-0.5 min-h-[18px] gap-1',
  md: 'text-[12px] px-2 py-1 min-h-[22px] gap-1.5',
  lg: 'text-[14px] px-2.5 py-1 min-h-[26px] gap-1.5',
  small: 'text-[10px] px-1.5 py-0.5 min-h-[18px] gap-1',
  medium: 'text-[12px] px-2 py-1 min-h-[22px] gap-1.5',
};

const variantClasses: Record<string, string> = {
  default: 'eidotter-badge--default',
  success: 'eidotter-badge--success',
  warning: 'eidotter-badge--warning',
  error: 'eidotter-badge--error',
  info: 'eidotter-badge--info',
  accent: 'eidotter-badge--accent',
  brand: 'eidotter-badge--accent',
  gray: 'eidotter-badge--default',
  blue: 'eidotter-badge--info',
  indigo: 'eidotter-badge--info',
  purple: 'eidotter-badge--info',
  pink: 'eidotter-badge--error',
  orange: 'eidotter-badge--warning',
};

/**
 * DOS-styled Badge for status indicators, labels, and counts.
 * Pure presentational — no React Aria needed.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
  ...props
}) => (
  <span
    className={cn(
      'inline-flex items-center justify-center',
      'font-dos font-dos-regular leading-none whitespace-nowrap select-none',
      'uppercase tracking-wider',
      'rounded-dos-sm',
      'eidotter-badge',
      sizeClasses[size] || sizeClasses.md,
      variantClasses[variant] || variantClasses.default,
      className,
    )}
    data-variant={variant}
    {...props}
  >
    {dot && <span className="eidotter-badge__dot" aria-hidden="true" />}
    <span className="eidotter-badge__content">{children}</span>
  </span>
);
