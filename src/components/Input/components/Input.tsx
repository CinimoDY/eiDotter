import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant for validation states
   */
  variant?: 'default' | 'error';
  /**
   * Optional class name
   */
  className?: string;
}

/**
 * DOS-styled Input component with authentic terminal aesthetics
 *
 * Features:
 * - Extends native HTML input attributes
 * - Error variant for validation states
 * - DOS-authentic styling with CGA colors
 * - WCAG 2.1 AA compliant focus states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  className = '',
  disabled,
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    `input--${variant}`,
    disabled && 'input--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      className={inputClasses}
      disabled={disabled}
      aria-invalid={variant === 'error'}
      {...props}
    />
  );
});

Input.displayName = 'Input';
