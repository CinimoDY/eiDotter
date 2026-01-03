import React from 'react';
import './Badge.css';

export interface BadgeProps {
  /**
   * The variant determines the badge's color scheme
   */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  /**
   * The size of the badge
   */
  size?: 'small' | 'medium';
  /**
   * Show a dot indicator before the text
   */
  dot?: boolean;
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Optional aria-label for accessibility
   */
  'aria-label'?: string;
}

/**
 * DOS-styled Badge component for status indicators, labels, and tags
 *
 * Features:
 * - Multiple color variants (default, success, warning, error, info, accent)
 * - Two sizes (small, medium)
 * - Optional dot indicator
 * - DOS-authentic styling with CGA colors
 * - WCAG 2.1 AA compliant
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'medium',
  dot = false,
  children,
  className = '',
  ...props
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot && 'badge--with-dot',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      <span className="badge__content">{children}</span>
    </span>
  );
};
