import React from 'react';
import { cn } from '../../../utils/cn';
import './Progress.css';

export interface ProgressProps {
  /** Progress value from 0 to max */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Whether progress amount is unknown */
  indeterminate?: boolean;
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Size of the progress bar */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /** Track display style */
  trackStyle?: 'block' | 'bordered' | 'gradient';
  /** Number of character cells for the bar width (default 20) */
  blocks?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Enable phosphor glow on filled blocks */
  glow?: boolean;
  /** Human-readable value text for screen readers */
  valueText?: string;
  /** Fill available container width instead of sizing by block count */
  fullWidth?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

const FILLED = '\u2588'; // █
const EMPTY = '\u2591';  // ░
const DARK_SHADE = '\u2593'; // ▓
const MED_SHADE = '\u2592';  // ▒

const sizeClasses: Record<string, string> = {
  sm:     'text-xs',
  md:     'text-base',
  lg:     'text-lg',
  small:  'text-xs',
  medium: 'text-base',
  large:  'text-lg',
};

const variantClasses: Record<string, string> = {
  default: 'eidotter-progress--default',
  success: 'eidotter-progress--success',
  warning: 'eidotter-progress--warning',
  error:   'eidotter-progress--error',
};

function buildBarContent(
  filledCount: number,
  totalBlocks: number,
  trackStyle: 'block' | 'bordered' | 'gradient'
): { filled: string; transition: string; empty: string } {
  const emptyCount = totalBlocks - filledCount;

  if (trackStyle === 'gradient' && filledCount > 0 && filledCount < totalBlocks) {
    const transChars = Math.min(2, emptyCount);
    const actualEmpty = emptyCount - transChars;
    const transition =
      (transChars >= 1 ? DARK_SHADE : '') +
      (transChars >= 2 ? MED_SHADE : '');
    return {
      filled: FILLED.repeat(filledCount),
      transition,
      empty: EMPTY.repeat(actualEmpty),
    };
  }

  return {
    filled: FILLED.repeat(filledCount),
    transition: '',
    empty: EMPTY.repeat(emptyCount),
  };
}

/**
 * DOS-styled Progress bar with block characters, phosphor glow, and track styles.
 * Pure presentational — no React Aria needed.
 */
export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  indeterminate = false,
  variant = 'default',
  size = 'md',
  trackStyle = 'block',
  blocks = 20,
  showLabel = false,
  fullWidth = false,
  glow = false,
  valueText,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  const totalBlocks = Math.min(80, Math.max(3, Math.floor(blocks)));
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);

  const rootClasses = cn(
    'inline-flex items-center gap-2 font-dos',
    'eidotter-progress',
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.default,
    glow && 'eidotter-progress--glow',
    fullWidth && 'eidotter-progress--full-width',
    indeterminate && 'eidotter-progress--indeterminate',
    trackStyle === 'bordered' && 'eidotter-progress--bordered',
    className,
  );

  const ariaAttrs: Record<string, string | number | undefined> = {
    'aria-label': ariaLabel || `Progress: ${indeterminate ? 'loading' : `${Math.round(percentage)}%`}`,
  };

  if (!indeterminate) {
    ariaAttrs['aria-valuenow'] = value;
    ariaAttrs['aria-valuemin'] = 0;
    ariaAttrs['aria-valuemax'] = max;
  }

  if (valueText) {
    ariaAttrs['aria-valuetext'] = valueText;
  }

  const isBordered = trackStyle === 'bordered';
  const trackClasses = cn(
    'eidotter-progress__track',
    isBordered && 'eidotter-progress__track--borderless',
  );

  if (indeterminate) {
    const emptyContent = EMPTY.repeat(totalBlocks);
    return (
      <div className={rootClasses} role="progressbar" {...ariaAttrs} {...props}>
        <span className={trackClasses}>
          {isBordered && <span className="eidotter-progress__bracket">[</span>}
          <span className="eidotter-progress__bar">
            <span className="eidotter-progress__empty">{emptyContent}</span>
            <span className="eidotter-progress__scanner">{DARK_SHADE}{FILLED}{DARK_SHADE}</span>
          </span>
          {isBordered && <span className="eidotter-progress__bracket">]</span>}
        </span>
        {showLabel && (
          <span className="eidotter-progress__label">...</span>
        )}
      </div>
    );
  }

  const allFilled = FILLED.repeat(totalBlocks);
  const allEmpty = EMPTY.repeat(totalBlocks);
  const { transition: gradientChars } = buildBarContent(filledBlocks, totalBlocks, trackStyle);

  return (
    <div className={rootClasses} role="progressbar" {...ariaAttrs} {...props}>
      <span className={trackClasses}>
        {isBordered && <span className="eidotter-progress__bracket">[</span>}
        <span className="eidotter-progress__bar">
          <span className="eidotter-progress__empty">{allEmpty}</span>
          <span
            className="eidotter-progress__fill"
            style={{ '--fill-pct': String(percentage) } as React.CSSProperties}
          >
            {allFilled}
          </span>
          {gradientChars && (
            <span
              className="eidotter-progress__transition"
              style={{ '--fill-pct': String(percentage) } as React.CSSProperties}
            >
              {gradientChars}
            </span>
          )}
        </span>
        {isBordered && <span className="eidotter-progress__bracket">]</span>}
      </span>
      {showLabel && (
        <span className="eidotter-progress__label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};
