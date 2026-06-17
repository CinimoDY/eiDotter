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

const variantClasses: Record<string, string> = {
  default: 'eidotter-card--default',
  elevated: 'eidotter-card--elevated',
  bordered: 'eidotter-card--bordered',
  glow: 'eidotter-card--glow',
  interactive: 'eidotter-card--interactive',
  minimal: 'eidotter-card--minimal',
  callout: 'eidotter-card--callout',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  title,
  children,
  footer,
  variant = 'default',
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-2 border-solid border-dos-border-default',
        'font-dos text-dos-text-brand',
        'eidotter-card',
        variantClasses[variant] || variantClasses.default,
        className,
      )}
      {...props}
    >
      {title && (
        <div className="eidotter-card__header px-3 py-2 border-b border-dos-text-disabled bg-dos-bg-brand-dim">
          <span className="text-dos-text-secondary text-dos-text-md uppercase">{title}</span>
        </div>
      )}
      <div className="p-3">
        {children}
      </div>
      {footer && (
        <div className="eidotter-card__footer px-3 py-2 border-t border-dos-text-disabled bg-dos-bg-secondary">
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
