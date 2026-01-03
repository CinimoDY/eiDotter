import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * Value attribute for form submission
   */
  value?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  name,
  value,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  const checkboxClasses = [
    'checkbox',
    disabled && 'checkbox--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={checkboxClasses}>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        aria-label={ariaLabel || label}
        {...props}
      />
      <span className="checkbox__box" aria-hidden="true">
        {/* DOS-style checkbox indicator */}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};
