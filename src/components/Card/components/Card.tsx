import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { DosWindow } from '../../DosWindow/components/DosWindow';
import '../../../styles/keyframes.css';
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

/**
 * Card on the DosWindow chrome (DMNC-1592): `title` becomes the window strip
 * (dark, xs uppercase, `▸` marker, dim-amber rule) and `footer` the window
 * footer. Variants set the frame's border colour and shadow. Server-safe.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  title,
  children,
  footer,
  variant = 'default',
  className,
  ...props
}, ref) => {
  return (
    <DosWindow
      ref={ref}
      title={title}
      footer={footer || undefined}
      className={cn(
        'font-dos text-dos-text-brand',
        'eidotter-card',
        variantClasses[variant] || variantClasses.default,
        className,
      )}
      {...props}
    >
      {children}
    </DosWindow>
  );
});

Card.displayName = 'Card';
