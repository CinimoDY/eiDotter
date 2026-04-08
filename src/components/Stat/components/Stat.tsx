import React, { forwardRef } from 'react';
import { useTextScramble } from '../../../hooks/useTextScramble';
import { cn } from '../../../utils/cn';
import './Stat.css';

export interface StatProps {
  /** The label describing the metric */
  label: string;
  /** The metric value to display */
  value: string | number;
  /** Optional trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Optional trend value (e.g., "+5%", "-12") */
  trendValue?: string;
  /** Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases. */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /** Whether to animate value changes with a text scramble effect */
  scramble?: boolean;
  /** Optional CSS class name */
  className?: string;
}

const sizeClasses: Record<string, { root: string; label: string; value: string; trend: string }> = {
  sm:     { root: 'gap-0.5', label: 'text-[10px]', value: 'text-lg',  trend: 'text-[10px]' },
  md:     { root: 'gap-1',   label: 'text-[10px]', value: 'text-2xl', trend: 'text-[10px]' },
  lg:     { root: 'gap-1.5', label: 'text-xs',     value: 'text-4xl', trend: 'text-xs' },
  small:  { root: 'gap-0.5', label: 'text-[10px]', value: 'text-lg',  trend: 'text-[10px]' },
  medium: { root: 'gap-1',   label: 'text-[10px]', value: 'text-2xl', trend: 'text-[10px]' },
  large:  { root: 'gap-1.5', label: 'text-xs',     value: 'text-4xl', trend: 'text-xs' },
};

const trendColorClasses: Record<string, string> = {
  up:      'text-cga-bright-green',
  down:    'text-cga-bright-red',
  neutral: 'text-cga-amber',
};

const trendIcons: Record<string, string> = {
  up: '▲',
  down: '▼',
  neutral: '►',
};

const trendLabels: Record<string, string> = {
  up: 'increasing',
  down: 'decreasing',
  neutral: 'unchanged',
};

/**
 * DOS-styled Stat component for displaying metrics with optional trends.
 * Pure presentational — no React Aria needed.
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(({
  label,
  value,
  trend,
  trendValue,
  size = 'md',
  scramble = false,
  className,
  ...props
}, ref) => {
  const { text: scrambledValue } = useTextScramble(String(value), {
    speed: 30,
    enabled: scramble,
  });
  const displayValue = scramble ? scrambledValue : String(value);
  const s = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col font-dos',
        'eidotter-stat',
        s.root,
        className,
      )}
      {...props}
    >
      <span className={cn('text-cga-amber uppercase tracking-wider leading-tight', s.label)}>
        {label}
      </span>
      <span className={cn('text-dos-text-accent font-bold leading-none tabular-nums', s.value)}>
        {displayValue}
      </span>
      {trend && (
        <span
          className={cn(
            'inline-flex items-center gap-1 leading-none',
            trendColorClasses[trend],
            s.trend,
          )}
          aria-label={`Trend: ${trendLabels[trend]}${trendValue ? `, ${trendValue}` : ''}`}
        >
          <span className="text-[0.8em]" aria-hidden="true">
            {trendIcons[trend]}
          </span>
          {trendValue && (
            <span className="tabular-nums">{trendValue}</span>
          )}
        </span>
      )}
    </div>
  );
});

Stat.displayName = 'Stat';
