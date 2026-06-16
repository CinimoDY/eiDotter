import React, { forwardRef } from 'react';
import {
  TextField as AriaTextField,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual variant for validation states */
  variant?: 'default' | 'error';
  /** Optional label displayed above the input */
  label?: string;
  /** Optional description displayed below the input */
  description?: string;
  /** Optional error message (shown when variant is 'error') */
  errorMessage?: string;
  /** Whether the input is required (React Aria) */
  isRequired?: boolean;
}

const variantClasses: Record<string, string> = {
  default: 'eidotter-input--default',
  error:   'eidotter-input--error',
};

/**
 * DOS-styled Input with React Aria TextField.
 * Provides automatic label association, description, and error message support.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  label,
  description,
  errorMessage,
  disabled,
  className,
  onChange,
  isRequired,
  ...props
}, ref) => {
  const isInvalid = variant === 'error';

  return (
    <AriaTextField
      isDisabled={disabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      className={cn('eidotter-text-field', 'flex flex-col gap-1', className)}
    >
      {label && (
        <AriaLabel className="text-dos-text-brand font-dos text-xs uppercase tracking-wider">
          {label}
        </AriaLabel>
      )}
      <AriaInput
        ref={ref}
        className={cn(
          'w-full bg-transparent text-dos-text-brand font-dos text-base p-2',
          'border-2 border-dos-border-default outline-none box-border',
          'eidotter-input',
          variantClasses[variant] || variantClasses.default,
          disabled && 'eidotter-input--disabled',
        )}
        onChange={onChange}
        {...props}
      />
      {description && !isInvalid && (
        <AriaText slot="description" className="text-dos-text-muted font-dos text-xs">
          {description}
        </AriaText>
      )}
      {errorMessage && isInvalid && (
        <AriaText slot="errorMessage" className="text-dos-text-error font-dos text-xs">
          {errorMessage}
        </AriaText>
      )}
    </AriaTextField>
  );
});

Input.displayName = 'Input';
