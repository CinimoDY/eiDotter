import React from 'react';
import { cn } from '../../../utils/cn';

export interface SectionHeadingProps {
  /** Heading text. */
  title: string;
  /** Optional trailing count, rendered as " (count)". */
  count?: string | number;
  /**
   * Tone-driven colour. Routes through semantic roles so it re-themes:
   * amber-family under amber-mono, honest under colour themes.
   * @default 'default'
   */
  tone?: 'default' | 'error' | 'warning' | 'info';
  /** Additional content rendered after the title/count (e.g. an action). */
  children?: React.ReactNode;
  /** Additional CSS class name. */
  className?: string;
}

const toneClasses: Record<NonNullable<SectionHeadingProps['tone']>, string> = {
  default: 'text-dos-text-primary',
  error: 'text-dos-error',
  warning: 'text-dos-warning',
  info: 'text-dos-info',
};

/**
 * DOS-styled section heading — an uppercase `<h3>` label with an optional
 * trailing `(count)` and tone-driven colour. Pure presentational.
 *
 * Ported from Steuerdash (DMNC-855); the steuerdash version hardcoded
 * `text-cga-*` — this routes tones through `text-dos-*` semantic roles instead
 * so the heading re-themes and stays AA-safe under amber-mono.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  count,
  tone = 'default',
  children,
  className,
}) => (
  <h3
    className={cn(
      'eidotter-section-heading',
      'font-dos uppercase tracking-wider mb-2 text-dos-text-sm',
      toneClasses[tone],
      className,
    )}
  >
    {title}
    {count !== undefined && ` (${count})`}
    {children}
  </h3>
);

SectionHeading.displayName = 'SectionHeading';
