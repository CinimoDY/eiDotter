import React from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Switch.css';

export interface SwitchProps {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
  /** Default state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Switch type */
  type?: 'default' | 'slim';
  /** Label text */
  label?: string;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * DOS-styled Switch with phosphor glow toggle effect.
 * Built on React Aria for accessible toggle behavior.
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  type = 'default',
  label,
  name,
  value,
  className,
  ...props
}) => (
  <AriaSwitch
    isSelected={checked}
    defaultSelected={defaultChecked}
    onChange={onCheckedChange}
    isDisabled={disabled}
    name={name}
    value={value}
    className={cn(
      'inline-flex items-center gap-2 cursor-pointer outline-none font-dos group',
      'eidotter-switch',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    )}
    data-size={size}
    data-type={type}
    {...props}
  >
    {({ isSelected }) => (
      <>
        <span className={cn(
          'eidotter-switch__track',
          isSelected && 'eidotter-switch__track--checked',
          type === 'slim' && 'eidotter-switch__track--slim',
          size === 'sm' && 'eidotter-switch__track--sm',
        )}>
          <span className="eidotter-switch__thumb" />
        </span>
        {label && <span className="text-[var(--color-cga-amber)]">{label}</span>}
      </>
    )}
  </AriaSwitch>
);
