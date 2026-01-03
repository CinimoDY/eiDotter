import React from 'react';
import './Switch.css';

export interface SwitchProps {
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback when the switch state changes
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Name for form submission
   */
  name?: string;
  /**
   * Value for form submission
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
  /**
   * ID of element that labels this switch
   */
  'aria-labelledby'?: string;
}

/**
 * DOS-styled Switch component with authentic terminal aesthetics
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Full keyboard accessibility
 * - WCAG 2.1 AA compliant
 * - DOS-authentic styling with CGA colors
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  name,
  value,
  className = '',
  ...props
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (disabled) return;

    const newValue = !isChecked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onCheckedChange?.(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  const switchClasses = [
    'switch',
    isChecked && 'switch--checked',
    disabled && 'switch--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled}
      className={switchClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      {...props}
    >
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {name && (
        <input
          type="hidden"
          name={name}
          value={isChecked ? (value || 'on') : ''}
        />
      )}
    </button>
  );
};
