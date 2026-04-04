import React from 'react';
import { cn } from '../../../utils/cn';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';
import './Tag.css';

export interface TagProps {
  /** Tag display text */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium';
  /** CGA color token for border and text */
  color?: string;
  /** Whether the tag is selected/active */
  selected?: boolean;
  /** Whether to show a close button */
  closeable?: boolean;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Click handler for the tag body */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Close handler, called after dismiss animation */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-[10px] px-1.5 py-0.5 min-h-[18px] gap-1',
  md: 'text-[12px] px-2 py-1 min-h-[22px] gap-1.5',
  lg: 'text-[14px] px-2.5 py-1 min-h-[26px] gap-1.5',
  small: 'text-[10px] px-1.5 py-0.5 min-h-[18px] gap-1',
  medium: 'text-[12px] px-2 py-1 min-h-[22px] gap-1.5',
};

/**
 * DOS-styled Tag for interactive labels with click, close, and selection.
 * Extends Badge with interaction behaviors. Uses useAnimatedDismiss for phosphor exit.
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  color,
  selected = false,
  closeable = false,
  disabled = false,
  onClick,
  onClose,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  const isInteractive = !!onClick && !disabled;
  const { isClosing, triggerClose, handleAnimationEnd } = useAnimatedDismiss('tag-exit', onClose);

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
    if (!disabled) triggerClose();
  };

  const style = color ? { '--tag-color': 'var(' + color + ')' } as React.CSSProperties : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'font-dos font-dos-regular leading-none whitespace-nowrap select-none',
        'rounded-dos-sm uppercase tracking-wider',
        sizeClasses[size] || sizeClasses.md,
        'eidotter-tag',
        `eidotter-tag--\${variant}`,
        selected && 'eidotter-tag--selected',
        disabled && 'opacity-50 cursor-not-allowed',
        isClosing && 'eidotter-tag--closing',
        isInteractive && 'cursor-pointer',
        className,
      )}
      style={style}
      onClick={isInteractive ? (e) => !disabled && onClick?.(e) : undefined}
      onKeyDown={handleKeyDown}
      onAnimationEnd={handleAnimationEnd}
      aria-label={ariaLabel}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      data-variant={variant}
      {...(isInteractive ? { role: 'button', tabIndex: 0 } : {})}
      {...props}
    >
      <span className="eidotter-tag__content">{children}</span>
      {closeable && (
        <button
          className="eidotter-tag__close"
          type="button"
          aria-label={`Remove \${typeof children === 'string' ? children : 'tag'}`}
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
