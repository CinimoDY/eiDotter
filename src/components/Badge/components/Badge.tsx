import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './Badge.css';

export interface BadgeProps {
  /** The variant determines the badge's color scheme */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'
    | 'brand' | 'gray' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';
  /** Size variant. Use sm/md/lg — small/medium are @deprecated aliases. */
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
  sm: 'text-dos-text-xs px-2 py-0.5 min-h-6 gap-1',
  md: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1.5',
  lg: 'text-dos-text-md px-3 py-1.5 min-h-8 gap-1.5',
  small: 'text-dos-text-xs px-2 py-0.5 min-h-6 gap-1',
  medium: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1.5',
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
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
  ...props
}, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'font-dos leading-none whitespace-nowrap select-none',
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
));

Badge.displayName = 'Badge';
