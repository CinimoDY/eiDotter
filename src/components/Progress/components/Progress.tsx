import React from 'react';
import './Progress.css';

export interface ProgressProps {
  /**
   * Progress value from 0 to max
   */
  value?: number;
  /**
   * Maximum value (default 100)
   */
  max?: number;
  /**
   * Whether progress amount is unknown
   */
  indeterminate?: boolean;
  /**
   * Visual variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Size of the progress bar
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Track display style
   */
  trackStyle?: 'block' | 'bordered' | 'gradient';
  /**
   * Number of character cells for the bar width (default 20)
   */
  blocks?: number;
  /**
   * Show percentage label
   */
  showLabel?: boolean;
  /**
   * Enable phosphor glow on filled blocks
   */
  glow?: boolean;
  /**
   * Human-readable value text for screen readers
   */
  valueText?: string;
  /**
   * Fill available container width instead of sizing by block count.
   * The label stays adjacent to the bar.
   */
  fullWidth?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

const FILLED = '\u2588'; // █
const EMPTY = '\u2591';  // ░
const DARK_SHADE = '\u2593'; // ▓
const MED_SHADE = '\u2592';  // ▒

function buildBarContent(
  filledCount: number,
  totalBlocks: number,
  trackStyle: 'block' | 'bordered' | 'gradient'
): { filled: string; transition: string; empty: string } {
  const emptyCount = totalBlocks - filledCount;

  if (trackStyle === 'gradient' && filledCount > 0 && filledCount < totalBlocks) {
    // Gradient: filled █, then ▓▒ transition, then ░ empty
    // Use 2 transition chars (take from empty portion if available)
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

function buildIndeterminateContent(totalBlocks: number): string {
  // Static pattern for rendering — animation handled by CSS
  return EMPTY.repeat(totalBlocks);
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  indeterminate = false,
  variant = 'default',
  size = 'medium',
  trackStyle = 'block',
  blocks = 20,
  showLabel = false,
  fullWidth = false,
  glow = false,
  valueText,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  // Clamp blocks to 3-80
  const totalBlocks = Math.min(80, Math.max(3, Math.floor(blocks)));

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);

  const progressClasses = [
    'progress',
    `progress--${variant}`,
    `progress--${size}`,
    glow && 'progress--glow',
    fullWidth && 'progress--full-width',
    indeterminate && 'progress--indeterminate',
    trackStyle === 'bordered' && 'progress--bordered',
    className,
  ].filter(Boolean).join(' ');

  // Build ARIA attributes — omit valuenow for indeterminate per WAI-ARIA spec
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

  // Filter custom props from DOM spread
  const { ...domProps } = props;

  const isBordered = trackStyle === 'bordered';

  if (indeterminate) {
    const emptyContent = buildIndeterminateContent(totalBlocks);
    return (
      <div
        className={progressClasses}
        role="progressbar"
        {...ariaAttrs}
        {...domProps}
      >
        <span className={`progress__track${isBordered ? ' progress__track--borderless' : ''}`}>
          {isBordered && <span className="progress__bracket">[</span>}
          <span className="progress__bar">
            <span className="progress__empty">{emptyContent}</span>
            <span className="progress__scanner">{DARK_SHADE}{FILLED}{DARK_SHADE}</span>
          </span>
          {isBordered && <span className="progress__bracket">]</span>}
        </span>
        {showLabel && (
          <span className="progress__label">...</span>
        )}
      </div>
    );
  }

  const { filled, transition, empty } = buildBarContent(filledBlocks, totalBlocks, trackStyle);

  return (
    <div
      className={progressClasses}
      role="progressbar"
      {...ariaAttrs}
      {...domProps}
    >
      <span className={`progress__track${isBordered ? ' progress__track--borderless' : ''}`}>
        {isBordered && <span className="progress__bracket">[</span>}
        <span className="progress__bar">
          {filled && <span className="progress__fill">{filled}</span>}
          {transition && <span className="progress__transition">{transition}</span>}
          {empty && <span className="progress__empty">{empty}</span>}
        </span>
        {isBordered && <span className="progress__bracket">]</span>}
      </span>
      {showLabel && (
        <span className="progress__label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};
