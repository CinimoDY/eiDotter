import React from 'react';
import { cn } from '../../../utils/cn';
import { CopyButton } from '../../CopyButton';

export interface LedgerRowProps {
  /** Primary label (left side). */
  label: React.ReactNode;
  /** Optional secondary note under the label. */
  note?: React.ReactNode;
  /**
   * Right-aligned value. Pass a **pre-formatted** string or node — the consumer
   * owns currency/locale formatting (the DS stays locale-agnostic). Rendered
   * with the accent colour + `tabular-nums` for column alignment.
   */
  value: React.ReactNode;
  /** When set, renders a {@link CopyButton} that copies this raw string. */
  copyValue?: string;
  /** Optional trailing content (badges, links, toggles) right of the value. */
  trailing?: React.ReactNode;
  /** Dim the row while a mutation is in flight. */
  pending?: boolean;
  /** Additional CSS class name. */
  className?: string;
}

/**
 * DOS-styled ledger row — a label/note on the left and a right-aligned value
 * with optional copy + trailing slot. A generic value-row primitive.
 *
 * Generalised from Steuerdash's money-specific LedgerRow (DMNC-857): currency
 * formatting, Paperless links, and verify/shared badges are intentionally NOT
 * built in — pass a pre-formatted `value`, a raw `copyValue` for the copy
 * affordance, and compose domain chrome via `trailing`. Routes through
 * `text-dos-*` semantic roles so it re-themes.
 */
export const LedgerRow: React.FC<LedgerRowProps> = ({
  label,
  note,
  value,
  copyValue,
  trailing,
  pending,
  className,
}) => (
  <div
    className={cn(
      'eidotter-ledger-row',
      'flex items-center gap-3 py-2 border-b border-dos-border-disabled',
      pending && 'opacity-50',
      className,
    )}
  >
    <div className="flex-1 min-w-0">
      <div className="font-dos text-dos-text-sm text-dos-text-primary">{label}</div>
      {note && <p className="font-dos text-dos-text-xs text-dos-text-muted mt-0.5">{note}</p>}
    </div>
    <div className="flex items-center gap-1 shrink-0">
      <span className="font-dos text-dos-text-sm text-dos-text-accent tabular-nums">{value}</span>
      {copyValue !== undefined && <CopyButton value={copyValue} />}
      {trailing}
    </div>
  </div>
);

LedgerRow.displayName = 'LedgerRow';
