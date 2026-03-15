import React, { useState, useRef, useCallback } from 'react';
import './Alert.css';
import { Icon } from '../../Icon/components/Icon';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface AlertProps {
  /**
   * The size variant of the alert
   */
  size?: 'small' | 'large';
  /**
   * The type of alert which determines its color and icon
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * The title text of the alert
   */
  title?: string;
  /**
   * The description text of the alert
   */
  children?: React.ReactNode;
  /**
   * Optional click handler for the close button
   */
  onClose?: () => void;
  /**
   * Optional click handler for the "Click here" link
   */
  onClickHere?: () => void;
  /**
   * Optional CSS class name
   */
  className?: string;
}

// Map alert types to icon names
const ALERT_ICONS = {
  info: 'Info',
  success: 'Done',
  warning: 'Warning',
  error: 'Error',
} as const;

export const Alert: React.FC<AlertProps> = ({
  size = 'large',
  type = 'info',
  title,
  children,
  onClose,
  onClickHere,
  className = '',
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;

    if (!onClose) return;

    if (prefersReducedMotion()) {
      onClose();
      return;
    }

    closingRef.current = true;
    setIsClosing(true);
  }, [onClose]);

  const handleAnimationEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === 'alert-exit' && closingRef.current) {
      closingRef.current = false;
      setIsClosing(false);
      onClose?.();
    }
  }, [onClose]);

  const alertClasses = [
    'alert',
    `alert--${size}`,
    `alert--${type}`,
    isClosing && 'alert--closing',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses} onAnimationEnd={handleAnimationEnd}>
      <div className="alert__header">
        <div className="alert__icon">
          <Icon
            name={ALERT_ICONS[type]}
            size="L"
            aria-label={`${type} alert`}
          />
        </div>
        {title && <div className="alert__title">{title}</div>}
        {onClose && (
          <button
            className="alert__close"
            onClick={handleClose}
            aria-label="Close alert"
          >
            <Icon
              name="Close"
              size="S"
            />
          </button>
        )}
      </div>
      {(children || onClickHere) && (
        <div className="alert__content">
          <div className="alert__message">
            {children && <span>{children}</span>}
            {onClickHere && (
              <button
                className="alert__link"
                onClick={onClickHere}
                aria-label="Click for more information"
              >
                Click here
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 