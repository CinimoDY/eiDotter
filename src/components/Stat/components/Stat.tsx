import React from 'react';
import { useTextScramble } from '../../../hooks/useTextScramble';
import './Stat.css';

export interface StatProps {
  /**
   * The label describing the metric
   */
  label: string;
  /**
   * The metric value to display
   */
  value: string | number;
  /**
   * Optional trend direction
   */
  trend?: 'up' | 'down' | 'neutral';
  /**
   * Optional trend value (e.g., "+5%", "-12")
   */
  trendValue?: string;
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to animate value changes with a text scramble effect
   */
  scramble?: boolean;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * DOS-styled Stat component for displaying metrics with optional trends
 *
 * Features:
 * - Label and value display
 * - Optional trend indicator (up/down/neutral)
 * - Three sizes (small, medium, large)
 * - DOS-authentic styling with CGA colors
 * - WCAG 2.1 AA compliant
 */
export const Stat: React.FC<StatProps> = ({
  label,
  value,
  trend,
  trendValue,
  size = 'medium',
  scramble = false,
  className = '',
  ...props
}) => {
  const { text: scrambledValue } = useTextScramble(String(value), {
    speed: 30,
    enabled: scramble,
  });
  const displayValue = scramble ? scrambledValue : String(value);
  const statClasses = [
    'stat',
    `stat--${size}`,
    className
  ].filter(Boolean).join(' ');

  const trendClasses = [
    'stat__trend',
    trend && `stat__trend--${trend}`
  ].filter(Boolean).join(' ');

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '▲';
      case 'down':
        return '▼';
      case 'neutral':
        return '►';
      default:
        return null;
    }
  };

  const getTrendLabel = () => {
    switch (trend) {
      case 'up':
        return 'increasing';
      case 'down':
        return 'decreasing';
      case 'neutral':
        return 'unchanged';
      default:
        return '';
    }
  };

  return (
    <div className={statClasses} {...props}>
      <span className="stat__label">{label}</span>
      <span className="stat__value">{displayValue}</span>
      {trend && (
        <span
          className={trendClasses}
          aria-label={`Trend: ${getTrendLabel()}${trendValue ? `, ${trendValue}` : ''}`}
        >
          <span className="stat__trend-icon" aria-hidden="true">
            {getTrendIcon()}
          </span>
          {trendValue && (
            <span className="stat__trend-value">{trendValue}</span>
          )}
        </span>
      )}
    </div>
  );
};
