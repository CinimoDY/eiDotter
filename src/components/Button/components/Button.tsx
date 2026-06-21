'use client';

import React, { forwardRef } from 'react';
import { Button as AriaButton, type PressEvent } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost' | 'link';
  /** Size variant. Use xs/sm/md/lg/xl — small/medium/large are @deprecated aliases. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  /** Press handler — receives React Aria PressEvent with pointer type info */
  onPress?: (e: PressEvent) => void;
  /** @deprecated Use `onPress` instead. onClick receives a minimal synthetic event that lacks most MouseEvent properties. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  'aria-label'?: string;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: 'text-dos-text-xs px-2 py-1 min-h-6 gap-1',
  sm: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1',
  md: 'text-dos-text-md px-3 py-2 min-h-8 gap-1.5',
  lg: 'text-dos-text-lg px-4 py-2.5 min-h-10 gap-2',
  xl: 'text-dos-text-xl px-5 py-3 min-h-11 gap-2',
  small: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-1',
  medium: 'text-dos-text-md px-3 py-2 min-h-8 gap-1.5',
  large: 'text-dos-text-lg px-4 py-2.5 min-h-10 gap-2',
};

const variantClasses: Record<string, string> = {
  primary: 'eidotter-btn--primary',
  secondary: 'eidotter-btn--secondary',
  tertiary: 'eidotter-btn--tertiary',
  destructive: 'eidotter-btn--destructive',
  ghost: 'eidotter-btn--ghost',
  link: 'eidotter-btn--link',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  children,
  onPress,
  onClick,
  className,
  fullWidth = false,
  iconOnly = false,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <AriaButton
      ref={ref}
      type={type}
      isDisabled={isDisabled}
      isPending={loading || undefined}
      onPress={(e) => {
        if (onPress) {
          onPress(e);
        } else if (onClick) {
          // Deprecated: bridge PressEvent to onClick for backward compatibility
          const syntheticEvent = {
            type: 'press',
            target: e.target,
            currentTarget: e.target,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as unknown as React.MouseEvent<HTMLButtonElement>;
          onClick(syntheticEvent);
        }
      }}
      className={cn(
        // Stable BEM block hook (DMNC-1112): variant-agnostic class consumers
        // can target reliably. Post-V.37 the Button only emitted
        // `eidotter-btn--{variant}` modifiers, so consumer overrides written
        // against `.eidotter-button` / `.eidotter-btn` silently no-op'd. Matches
        // Badge (`eidotter-badge`) / Tag (`eidotter-tag`) which already emit a block class.
        'eidotter-btn',
        'inline-flex items-center justify-center relative',
        'border-2 border-solid',
        'font-dos leading-none whitespace-nowrap select-none',
        'outline-none cursor-pointer',
        'transition-all duration-100 ease-linear',
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.primary,
        isDisabled && 'opacity-50 cursor-not-allowed',
        loading && 'cursor-wait',
        fullWidth && 'w-full',
        iconOnly && 'aspect-square !px-0',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dos-border-focus',
        className,
      )}
      data-loading={loading || undefined}
      data-variant={variant}
      {...props}
    >
      {loading && (
        <span className="eidotter-btn__loading" aria-hidden="true">
          █
        </span>
      )}
      <span className={cn(
        'inline-flex items-center justify-center',
        loading && 'opacity-70',
      )}>
        {children}
      </span>
    </AriaButton>
  );
});

Button.displayName = 'Button';
