import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual variant for validation states */
  variant?: 'default' | 'error';
  /** Optional class name */
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'eidotter-input--default',
  error:   'eidotter-input--error',
};

/**
 * DOS-styled Input with phosphor focus glow.
 * Pure presentational — extends native HTML input.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  className,
  disabled,
  ...props
}, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full bg-dos-bg-primary text-cga-amber font-dos text-base p-2',
      'border-2 border-dos-border-default outline-none box-border',
      'eidotter-input',
      variantClasses[variant] || variantClasses.default,
      disabled && 'eidotter-input--disabled',
      className,
    )}
    disabled={disabled}
    aria-invalid={variant === 'error'}
    {...props}
  />
));

Input.displayName = 'Input';
