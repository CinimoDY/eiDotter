import React from 'react';
import { cn } from '../../../utils/cn';

export interface TagGroupProps {
  /** Tag elements to render */
  children: React.ReactNode;
  /** Spacing between tags */
  gap?: 'tight' | 'normal' | 'loose';
  /** Wrap tags to multiple lines (default true) */
  wrap?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label for the tag group */
  'aria-label'?: string;
}

const gapClasses: Record<string, string> = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-3',
};

/**
 * Wrapper for rendering multiple Tag components with consistent spacing
 *
 * Provides flex layout with configurable gap and optional wrapping.
 */
export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  gap = 'normal',
  wrap = true,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        gapClasses[gap] || gapClasses.normal,
        className,
      )}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
};
