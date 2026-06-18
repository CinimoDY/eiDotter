import React from 'react';
import { cn } from '../../../utils/cn';

export interface EmptyStateProps {
  /** Primary message (e.g. "No documents yet"). */
  title: string;
  /** Optional supporting line below the title. */
  description?: React.ReactNode;
  /**
   * Tone-driven colour for the title. Routes through semantic roles so it
   * re-themes: amber-family under amber-mono, honest under colour themes.
   * @default 'default'
   */
  tone?: 'default' | 'error' | 'warning' | 'info';
  /** Optional action slot (e.g. a Button), rendered below the description. */
  action?: React.ReactNode;
  /** Additional CSS class name. */
  className?: string;
}

const toneClasses: Record<NonNullable<EmptyStateProps['tone']>, string> = {
  default: 'text-dos-text-primary',
  error: 'text-dos-error',
  warning: 'text-dos-warning',
  info: 'text-dos-info',
};

/**
 * DOS-styled empty / zero-state — a centred title, optional description, and an
 * optional action slot. Pure presentational.
 *
 * Ported from Steuerdash (DMNC-859); tones and the description route through
 * `text-dos-*` semantic roles (not raw `cga-*`) so it re-themes and the
 * description stays AA-safe (`text-muted` → lightGray under amber-mono).
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  tone = 'default',
  action,
  className,
}) => (
  <div
    className={cn(
      'eidotter-empty-state',
      'flex flex-col gap-2 py-6 text-center',
      className,
    )}
    role="status"
  >
    <p className={cn('font-dos text-dos-text-sm', toneClasses[tone])}>{title}</p>
    {description && (
      <p className="font-dos text-dos-text-xs text-dos-text-muted">{description}</p>
    )}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

EmptyState.displayName = 'EmptyState';
