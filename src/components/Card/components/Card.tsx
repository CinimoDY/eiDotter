import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './Card.css';

export interface CardProps {
  /**
   * Optional card title displayed in header
   */
  title?: string;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  /**
   * Visual variant of the card
   */
  variant?: 'default' | 'elevated' | 'bordered' | 'glow' | 'interactive' | 'minimal' | 'callout';
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  title,
  children,
  footer,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const cardClasses = cn(
    'card',
    `card--${variant}`,
    className,
  );

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {title && (
        <div className="card__header">
          <span className="card__title">{title}</span>
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
