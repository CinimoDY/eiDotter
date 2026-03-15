import React from 'react';
import './Tag.css';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';

export interface TagProps {
  /** Tag display text */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** The size of the tag */
  size?: 'small' | 'medium';
  /** CGA color token for border and text (e.g. '--color-cga-bright-cyan') */
  color?: string;
  /** Whether the tag appears in selected/active state */
  selected?: boolean;
  /** Whether to show a close button */
  closeable?: boolean;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Click handler for the tag body */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Close handler, called after dismiss animation completes */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label for the tag */
  'aria-label'?: string;
}

/**
 * DOS-styled Tag component for interactive labels
 *
 * Extends Badge's display-only approach with click, close, and selection
 * behaviors. Use for content labels, category indicators, and filter chips.
 *
 * Features:
 * - Three visual variants (default, outlined, filled)
 * - Optional close button with DOS-authentic [x]
 * - Toggle-able selected state
 * - Custom CGA color support via CSS custom property
 * - Keyboard accessible (Enter/Space to click, Delete/Backspace to close)
 * - WCAG 2.1 AA compliant
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  color,
  selected = false,
  closeable = false,
  disabled = false,
  onClick,
  onClose,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const isInteractive = !!onClick && !disabled;
  const { isClosing, triggerClose, handleAnimationEnd } = useAnimatedDismiss('tag-exit', onClose);

  const tagClasses = [
    'tag',
    `tag--${variant}`,
    `tag--${size}`,
    selected && 'tag--selected',
    disabled && 'tag--disabled',
    closeable && 'tag--closeable',
    isClosing && 'tag--closing',
    isInteractive && 'tag--interactive',
    className,
  ].filter(Boolean).join(' ');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;

    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLElement>);
    }

    if ((event.key === 'Delete' || event.key === 'Backspace') && closeable && onClose) {
      event.preventDefault();
      triggerClose();
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled) {
      triggerClose();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      onClick?.(event);
    }
  };

  const style = color
    ? { '--tag-color': `var(${color})` } as React.CSSProperties
    : undefined;

  const interactiveProps = isInteractive
    ? { role: 'button' as const, tabIndex: 0 }
    : {};

  return (
    <span
      className={tagClasses}
      style={style}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      onAnimationEnd={handleAnimationEnd}
      aria-label={ariaLabel}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      {...interactiveProps}
      {...props}
    >
      <span className="tag__content">{children}</span>
      {closeable && (
        <button
          className="tag__close"
          type="button"
          aria-label={`Remove ${typeof children === 'string' ? children : 'tag'}`}
          tabIndex={-1}
          onClick={handleCloseClick}
          disabled={disabled}
        >
          [x]
        </button>
      )}
    </span>
  );
};
