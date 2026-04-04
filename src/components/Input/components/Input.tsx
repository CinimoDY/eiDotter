import React, { forwardRef } from 'react';
import {
  TextField as AriaTextField,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Input.css';

export interface InputProps {
  /** Visual variant for validation states */
  variant?: 'default' | 'error';
  /** Optional label displayed above the input */
  label?: string;
  /** Optional description displayed below the input */
  description?: string;
  /** Optional error message (shown when variant is 'error') */
  errorMessage?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input type */
  type?: string;
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  isRequired?: boolean;
  /** Maximum length */
  maxLength?: number;
  /** Input name */
  name?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Optional class name */
  className?: string;
  /** Data attributes and other HTML props */
  [key: `data-${string}`]: string | undefined;
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
        <AriaLabel className="text-cga-amber font-dos text-xs uppercase tracking-wider">
          {label}
        </AriaLabel>
      )}
      <AriaInput
        ref={ref}
        className={cn(
          'w-full bg-dos-bg-primary text-cga-amber font-dos text-base p-2',
          'border-2 border-dos-border-default outline-none box-border',
          'eidotter-input',
          variantClasses[variant] || variantClasses.default,
          disabled && 'eidotter-input--disabled',
        )}
        onChange={onChange}
        {...props}
      />
      {description && !isInvalid && (
        <AriaText slot="description" className="text-cga-brown font-dos text-xs">
          {description}
        </AriaText>
      )}
      {errorMessage && isInvalid && (
        <AriaText slot="errorMessage" className="text-cga-bright-red font-dos text-xs">
          {errorMessage}
        </AriaText>
      )}
    </AriaTextField>
  );
});

Input.displayName = 'Input';
