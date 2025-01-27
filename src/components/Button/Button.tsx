import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: 'brand' | 'gray' | 'danger';
  /**
   * Button size
   */
  size?: 'L' | 'S';
  /**
   * Use subtle variant
   */
  subtle?: boolean;
  /**
   * Show icon on the left
   */
  iconLeft?: boolean;
  /**
   * Show icon on the right
   */
  iconRight?: boolean;
  /**
   * Optional custom class name
   */
  className?: string;
  /**
   * Button contents
   */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'brand',
    size = 'L',
    subtle = false,
    iconLeft = false,
    iconRight = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const classes = [
      'dos-button',
      `dos-button--${variant}`,
      `dos-button--${size}`,
      subtle && 'dos-button--subtle',
      iconLeft && 'dos-button--with-icon dos-button--with-icon-left',
      iconRight && 'dos-button--with-icon dos-button--with-icon-right',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {iconLeft && <span className="dos-button__icon">⟳</span>}
        {children}
        {iconRight && <span className="dos-button__icon">→</span>}
      </button>
    );
  }
);

Button.displayName = 'Button'; 