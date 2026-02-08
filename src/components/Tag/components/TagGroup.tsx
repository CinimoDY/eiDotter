import React from 'react';

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

/**
 * Wrapper for rendering multiple Tag components with consistent spacing
 *
 * Provides flex layout with configurable gap and optional wrapping.
 */
export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  gap = 'normal',
  wrap = true,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const groupClasses = [
    'tag-group',
    `tag-group--${gap}`,
    !wrap && 'tag-group--nowrap',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={groupClasses}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
};
