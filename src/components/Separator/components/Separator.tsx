import React from 'react';
import { cn } from '../../../utils/cn';
import './Separator.css';

export interface SeparatorProps {
  /** Orientation of the separator line */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS class name */
  className?: string;
}

const orientationClasses: Record<string, string> = {
  horizontal: 'h-px w-full',
  vertical: 'w-px h-full',
};

/**
 * DOS-styled Separator component for visual division of content.
 * Pure presentational — no React Aria needed.
 */
export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className,
}) => (
  <div
    role="separator"
    aria-orientation={orientation}
    className={cn(
      'shrink-0 bg-dos-border-default',
      'eidotter-separator',
      orientationClasses[orientation],
      className,
    )}
  />
);
