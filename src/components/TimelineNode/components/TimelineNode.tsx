'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import './TimelineNode.css';

export type TimelineNodeShape = 'circle' | 'square' | 'diamond';
export type TimelineNodeVariant = 'default' | 'primary' | 'secondary' | 'accent';

export interface TimelineNodeProps {
  /**
   * Shape of the node marker
   * @default 'circle'
   */
  shape?: TimelineNodeShape;
  /**
   * Visual variant of the node
   * @default 'default'
   */
  variant?: TimelineNodeVariant;
  /**
   * Whether this node is in active/selected state
   * @default false
   */
  isActive?: boolean;
  /**
   * Optional label to display next to the node (e.g., date, time)
   */
  label?: string;
  /**
   * Position of the label relative to the node
   * @default 'right'
   */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Size variant. Use sm/md/lg — small/medium/large are @deprecated aliases.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Click handler for interactive nodes
   */
  onClick?: () => void;
}

/**
 * TimelineNode - Axis marker for timeline/stepper interfaces
 *
 * A versatile node component for timelines, steppers, and progress indicators.
 * Features multiple shapes, glow effects on hover/active states, and optional labels.
 *
 * Uses DOS/CGA aesthetic with amber phosphor glow effects.
 */
export const TimelineNode: React.FC<TimelineNodeProps> = ({
  shape = 'circle',
  variant = 'default',
  isActive = false,
  label,
  labelPosition = 'right',
  size = 'md',
  className,
  onClick,
  ...props
}) => {
  const sizeMap: Partial<Record<string, string>> = { sm: 'small', md: 'medium', lg: 'large' };
  const normalizedSize = sizeMap[size] ?? size;

  const classes = cn(
    'timeline-node',
    `timeline-node--${shape}`,
    `timeline-node--${variant}`,
    `timeline-node--${normalizedSize}`,
    `timeline-node--label-${labelPosition}`,
    isActive && 'timeline-node--active',
    onClick && 'timeline-node--interactive',
    className,
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? isActive : undefined}
      {...props}
    >
      {label && labelPosition === 'left' && (
        <span className="timeline-node__label timeline-node__label--left">{label}</span>
      )}
      {label && labelPosition === 'top' && (
        <span className="timeline-node__label timeline-node__label--top">{label}</span>
      )}
      <span className="timeline-node__marker" aria-hidden="true" />
      {label && labelPosition === 'right' && (
        <span className="timeline-node__label timeline-node__label--right">{label}</span>
      )}
      {label && labelPosition === 'bottom' && (
        <span className="timeline-node__label timeline-node__label--bottom">{label}</span>
      )}
    </div>
  );
};
