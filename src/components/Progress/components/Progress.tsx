import React from 'react';
import './Progress.css';

export interface ProgressProps {
  /**
   * Progress value from 0 to 100
   */
  value: number;
  /**
   * Maximum value (default 100)
   */
  max?: number;
  /**
   * Visual variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Size of the progress bar
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Show percentage label
   */
  showLabel?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'medium',
  showLabel = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const filledBlocks = Math.round(percentage / 5); // 20 blocks total
  const emptyBlocks = 20 - filledBlocks;

  const progressClasses = [
    'progress',
    `progress--${variant}`,
    `progress--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={progressClasses}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || `Progress: ${Math.round(percentage)}%`}
      {...props}
    >
      <span className="progress__bar">
        <span className="progress__fill">{'█'.repeat(filledBlocks)}</span>
        <span className="progress__empty">{'░'.repeat(emptyBlocks)}</span>
      </span>
      {showLabel && (
        <span className="progress__label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};
