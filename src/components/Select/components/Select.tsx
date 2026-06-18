'use client';

import React from 'react';
import { cn } from '../../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Currently selected value (controlled). */
  value: string;
  /** Options to render. */
  options: SelectOption[];
  /** Fired with the new value on change. */
  onChange: (value: string) => void;
  /** Optional id for label association. */
  id?: string;
  /** Accessible label when there is no visible `<label>`. */
  'aria-label'?: string;
  /** Disable the control. */
  disabled?: boolean;
  /** Additional CSS class name. */
  className?: string;
}

/**
 * DOS-styled select — MVP wrapper around a native `<select>` (DMNC-860).
 * Ported from Steuerdash.
 *
 * Font-size is set via inline style, not a `text-dos-*` class: Tailwind v4's
 * Preflight form reset (`select { font-size: 100% }`) outranks utility classes
 * on a native `<select>`, so the inline style is the reliable escape hatch
 * (token-driven). Upstream component fix tracked at eidotter#349.
 */
export const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  id,
  disabled,
  className,
  'aria-label': ariaLabel,
}) => (
  <select
    id={id}
    aria-label={ariaLabel}
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
    style={{ fontSize: 'var(--typography-font-size-text-xs)' }}
    className={cn(
      'eidotter-select',
      'min-w-[5rem] cursor-pointer font-dos px-2 py-1',
      'bg-dos-bg-secondary text-dos-text-primary border border-dos-border-default',
      'hover:border-dos-text-accent focus:border-dos-text-accent focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

Select.displayName = 'Select';
