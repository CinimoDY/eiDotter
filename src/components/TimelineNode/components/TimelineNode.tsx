'use client';

import React, { forwardRef } from 'react';
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

const sizeMap: Record<string, string> = {
  sm: 'small', md: 'medium', lg: 'large',
  small: 'small', medium: 'medium', large: 'large',
};

const shapeClasses: Record<string, string> = {
  circle: 'eidotter-timeline-node--circle',
  square: 'eidotter-timeline-node--square',
  diamond: 'eidotter-timeline-node--diamond',
};

const variantClasses: Record<string, string> = {
  default: 'eidotter-timeline-node--default',
  primary: 'eidotter-timeline-node--primary',
  secondary: 'eidotter-timeline-node--secondary',
  accent: 'eidotter-timeline-node--accent',
};

const labelPositionClasses: Record<string, string> = {
  left: 'eidotter-timeline-node--label-left',
  right: 'eidotter-timeline-node--label-right',
  top: 'eidotter-timeline-node--label-top',
  bottom: 'eidotter-timeline-node--label-bottom',
};

/**
 * TimelineNode - Axis marker for timeline/stepper interfaces
 *
 * A versatile node component for timelines, steppers, and progress indicators.
 * Features multiple shapes, glow effects on hover/active states, and optional labels.
 *
 * Uses DOS/CGA aesthetic with amber phosphor glow effects.
 */
export const TimelineNode = forwardRef<HTMLDivElement, TimelineNodeProps>(({
  shape = 'circle',
  variant = 'default',
  isActive = false,
  label,
  labelPosition = 'right',
  size = 'md',
  className,
  onClick,
  ...props
}, ref) => {
  const normalizedSize = sizeMap[size] ?? 'medium';

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
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 font-dos',
        'eidotter-timeline-node',
        shapeClasses[shape],
        variantClasses[variant],
        `eidotter-timeline-node--${normalizedSize}`,
        labelPositionClasses[labelPosition],
        isActive && 'eidotter-timeline-node--active',
        onClick && 'eidotter-timeline-node--interactive',
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? isActive : undefined}
      {...props}
    >
      {label && labelPosition === 'left' && (
        <span className="eidotter-timeline-node__label eidotter-timeline-node__label--left">{label}</span>
      )}
      {label && labelPosition === 'top' && (
        <span className="eidotter-timeline-node__label eidotter-timeline-node__label--top">{label}</span>
      )}
      <span className="eidotter-timeline-node__marker" aria-hidden="true" />
      {label && labelPosition === 'right' && (
        <span className="eidotter-timeline-node__label eidotter-timeline-node__label--right">{label}</span>
      )}
      {label && labelPosition === 'bottom' && (
        <span className="eidotter-timeline-node__label eidotter-timeline-node__label--bottom">{label}</span>
      )}
    </div>
  );
});

TimelineNode.displayName = 'TimelineNode';
