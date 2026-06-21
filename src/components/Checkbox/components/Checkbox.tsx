'use client';

import React, { forwardRef } from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './Checkbox.css';

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

/**
 * DOS-styled Checkbox with bracket text indicator [ ] / [X].
 * Built on React Aria for accessible keyboard/focus handling.
 */
export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(({
  checked,
  defaultChecked,
  onChange,
  indeterminate = false,
  label,
  disabled = false,
  size = 'md',
  name,
  value,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => (
  <AriaCheckbox
    ref={ref}
    isSelected={checked}
    defaultSelected={defaultChecked}
    isIndeterminate={indeterminate}
    onChange={onChange}
    isDisabled={disabled}
    name={name}
    value={value}
    aria-label={ariaLabel || label}
    className={cn(
      'inline-flex items-center gap-2 cursor-pointer select-none group',
      'font-dos',
      size === 'sm' ? 'text-dos-text-xs' : 'text-dos-text-sm',
      'eidotter-checkbox',
      disabled && 'opacity-60 cursor-not-allowed',
      className,
    )}
    data-size={size}
    {...props}
  >
    {({ isSelected, isIndeterminate: isIndet }) => (
      <>
        <span className={cn(
          'eidotter-checkbox__box',
          isSelected && 'eidotter-checkbox__box--checked',
          isIndet && 'eidotter-checkbox__box--indeterminate',
        )}>
          {isIndet ? '[-]' : isSelected ? '[X]' : '[ ]'}
        </span>
        {label && <span className="eidotter-checkbox__label">{label}</span>}
      </>
    )}
  </AriaCheckbox>
));

Checkbox.displayName = 'Checkbox';
