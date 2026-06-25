'use client';

import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';
import './Tag.css';

export interface TagProps {
  /** Tag display text */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** Size variant. Use sm/md/lg — small/medium are @deprecated aliases. */
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
  sm: 'text-dos-text-xs px-2 py-0.5 min-h-6 gap-1',
  md: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1.5',
  lg: 'text-dos-text-md px-3 py-1.5 min-h-8 gap-1.5',
  small: 'text-dos-text-xs px-2 py-0.5 min-h-6 gap-1',
  medium: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1.5',
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

  // AriaButton's usePress isolates the press event — it calls stopPropagation
  // internally, preventing the close from triggering the parent Tag's onClick.
  const handleClosePress = () => {
    if (!disabled) triggerClose();
  };

  const style = color ? { '--tag-color': 'var(' + color + ')' } as React.CSSProperties : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'font-dos leading-none whitespace-nowrap select-none',
        'rounded-dos-sm uppercase tracking-wider',
        sizeClasses[size] || sizeClasses.md,
        'eidotter-tag',
        'eidotter-tag--' + variant,
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
      // aria-pressed is the correct toggle-button semantic. aria-selected is
      // not allowed on role="button" (ARIA 1.2; allowed only on option, tab,
      // row, gridcell, etc.). Non-interactive tags drop the attribute entirely.
      aria-pressed={isInteractive ? (selected || false) : undefined}
      aria-disabled={disabled || undefined}
      data-variant={variant}
      {...(isInteractive ? { role: 'button', tabIndex: 0 } : {})}
      {...props}
    >
      <span className="eidotter-tag__content">{children}</span>
      {closeable && (
        <AriaButton
          className="eidotter-tag__close"
          aria-label={'Remove ' + (typeof children === 'string' ? children : 'tag')}
          // Keep the close button out of the tab order only when the body is
          // itself focusable (interactive) and already offers Delete/Backspace
          // dismissal. For a closeable, non-interactive tag the body is not
          // focusable, so the close button must stay tabbable to give keyboard
          // users any dismiss path at all.
          excludeFromTabOrder={isInteractive}
          onPress={handleClosePress}
          isDisabled={disabled}
        >
          [x]
        </AriaButton>
      )}
    </span>
  );
};
