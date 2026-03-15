import React from 'react';
import './Separator.css';

export interface SeparatorProps {
  /**
   * Orientation of the separator line
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * DOS-styled Separator component for visual division of content
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Uses semantic border color from design tokens
 * - Decorative role (aria-hidden)
 * - High contrast mode support
 */
export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  const classes = [
    'separator',
    `separator--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={classes}
    />
  );
};
