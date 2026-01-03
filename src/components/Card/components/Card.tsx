import React from 'react';
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
  variant?: 'default' | 'elevated' | 'bordered' | 'glow';
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  variant = 'default',
  className = '',
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
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
};
