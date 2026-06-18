import React from 'react';
import { cn } from '../../../utils/cn';
import './LabeledProgress.css';

export interface LabeledProgressProps {
  /** Optional leading label rendered before the bar. */
  label?: React.ReactNode;
  /** Current value. */
  value: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Suffix appended to the trailing value (e.g. '%', ' EUR', '/24'). @default '%' */
  valueSuffix?: string;
  /** Show the trailing value. @default true */
  showValue?: boolean;
  /** Accessible label (falls back to a string `label`, else the percentage). */
  'aria-label'?: string;
  /** Additional CSS class name. */
  className?: string;
}

/**
 * DOS-styled labelled progress bar — optional leading label, a width-accurate
 * amber fill, and a trailing value with a custom suffix (DMNC-861).
 *
 * A standalone div-bar (not the block-fill `<Progress>`): `<Progress>`'s
 * monospace `█`/`░` fill renders wider than the track in some fonts, so a
 * solid-fill bar is width-accurate. The fill animates via `transform: scaleX`
 * (compositor-only; reduced-motion disables it).
 */
export const LabeledProgress: React.FC<LabeledProgressProps> = ({
  label,
  value,
  max = 100,
  valueSuffix = '%',
  showValue = true,
  className,
  'aria-label': ariaLabel,
}) => {
  const pct = max === 0 ? 0 : Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn('eidotter-labeled-progress', 'flex items-center gap-3', className)}>
      {label && (
        <span className="eidotter-labeled-progress__label font-dos text-dos-text-sm text-dos-text-muted shrink-0">
          {label}
        </span>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : `${pct}${valueSuffix}`)}
        className="eidotter-labeled-progress__track relative h-3 flex-1 overflow-hidden bg-dos-bg-primary border border-dos-border-disabled"
      >
        <div
          className="eidotter-labeled-progress__fill absolute inset-y-0 left-0 w-full bg-dos-bg-accent"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
      {showValue && (
        <span className="eidotter-labeled-progress__value font-dos text-dos-text-sm text-dos-text-accent tabular-nums shrink-0">
          {pct}
          {valueSuffix}
        </span>
      )}
    </div>
  );
};

LabeledProgress.displayName = 'LabeledProgress';
