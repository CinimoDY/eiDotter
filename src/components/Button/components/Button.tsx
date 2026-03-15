import React from 'react';
import '../../../styles/keyframes.css';
import './Button.css';

export interface ButtonProps {
  /**
   * The variant of the button which determines its styling
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Optional aria-label for accessibility
   */
  'aria-label'?: string;
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * DOS-styled Button component with authentic terminal aesthetics
 * 
 * Features:
 * - Multiple variants (primary, secondary, ghost, link)
 * - Three sizes (small, medium, large) 
 * - Loading and disabled states
 * - Full TypeScript support
 * - WCAG 2.1 AA compliant
 * - DOS-authentic styling with CGA colors
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled && 'button--disabled',
    loading && 'button--loading',
    fullWidth && 'button--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="button__loading-indicator" aria-hidden="true">
          █
        </span>
      )}
      <span className={`button__content ${loading ? 'button__content--loading' : ''}`}>
        {children}
      </span>
    </button>
  );
};