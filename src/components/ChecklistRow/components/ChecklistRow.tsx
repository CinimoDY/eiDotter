'use client';

import React from 'react';
import { cn } from '../../../utils/cn';

export interface ChecklistRowProps {
  /** Whether the item is checked. */
  checked: boolean;
  /** Toggle handler. */
  onToggle: () => void;
  /** Disable the toggle. */
  disabled?: boolean;
  /** Dim the row while a mutation is in flight. */
  pending?: boolean;
  /** Accessible label for the toggle (overrides the default). */
  ariaLabel?: string;
  /**
   * Label colour. `muted` strikes through + dims (completed items). Routes
   * through `text-dos-*` semantic roles, AA-safe under amber-mono.
   * @default 'default'
   */
  labelTone?: 'default' | 'muted' | 'error';
  /** Primary label content (toned). Optional — omit and use `children` for free body content. */
  label?: React.ReactNode;
  /** Free body content rendered below the label (alternative/addition to `label`). */
  children?: React.ReactNode;
  /** Optional secondary note rendered under the label. */
  note?: React.ReactNode;
  /** Optional content above the label (e.g. a badge row). */
  leading?: React.ReactNode;
  /** Optional trailing content (e.g. an action), right-aligned. */
  trailing?: React.ReactNode;
  /** Additional CSS class name. */
  className?: string;
}

const labelToneClasses: Record<NonNullable<ChecklistRowProps['labelTone']>, string> = {
  default: 'text-dos-text-primary',
  muted: 'text-dos-text-muted line-through',
  error: 'text-dos-error',
};

/**
 * DOS-styled checklist row — a `[x]`/`[ ]` toggle plus label, optional note,
 * and leading/trailing slots. Ported from Steuerdash (DMNC-856).
 *
 * The toggle is a real `<button>` (keyboard + screen-reader operable); the
 * `[x]`/`[ ]` glyph is the DOS checkbox aesthetic. Tones and the note route
 * through `text-dos-*` semantic roles (not raw `cga-*`) so the row re-themes.
 */
export const ChecklistRow: React.FC<ChecklistRowProps> = ({
  checked,
  onToggle,
  disabled,
  pending,
  ariaLabel,
  labelTone = 'default',
  label,
  children,
  note,
  leading,
  trailing,
  className,
}) => (
  <div
    className={cn(
      'eidotter-checklist-row',
      'flex items-start gap-3 py-2 border-b border-dos-border-disabled',
      pending && 'opacity-50',
      className,
    )}
  >
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      disabled={disabled}
      aria-label={ariaLabel ?? (checked ? 'Mark as incomplete' : 'Mark as complete')}
      className={cn(
        'shrink-0 pt-0.5 font-dos text-dos-text-sm',
        'text-dos-text-primary hover:text-dos-text-accent',
        'cursor-pointer disabled:cursor-not-allowed',
      )}
    >
      {checked ? '[x]' : '[ ]'}
    </button>
    <div className="flex-1 min-w-0">
      {leading && <div className="mb-1">{leading}</div>}
      {label !== undefined && (
        <div className={cn('font-dos text-dos-text-sm', labelToneClasses[labelTone])}>{label}</div>
      )}
      {children}
      {note && <p className="font-dos text-dos-text-xs text-dos-text-muted mt-0.5">{note}</p>}
    </div>
    {trailing && <div className="flex items-center gap-2 shrink-0">{trailing}</div>}
  </div>
);

ChecklistRow.displayName = 'ChecklistRow';
