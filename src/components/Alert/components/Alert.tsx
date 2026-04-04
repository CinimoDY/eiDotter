import React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../Icon/components/Icon';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';
import './Alert.css';

export interface AlertProps {
  /** The size variant */
  size?: 'sm' | 'lg' | 'small' | 'large' | 'floating' | 'full-width';
  /** The type determines color and icon */
  type?: 'info' | 'success' | 'warning' | 'error' | 'default' | 'brand';
  /** Title text */
  title?: string;
  /** Description content */
  children?: React.ReactNode;
  /** Close handler (shows close button when provided) */
  onClose?: () => void;
  /** "Click here" link handler */
  onClickHere?: () => void;
  /** Optional CSS class name */
  className?: string;
}

const ALERT_ICONS = {
  info: 'Info',
  success: 'Done',
  warning: 'Warning',
  error: 'Error',
  default: 'Info',
  brand: 'Info',
} as const;

const sizeClasses: Record<string, string> = {
  sm: 'max-w-[350px] min-h-[40px] flex-row items-center px-2 gap-2',
  lg: 'max-w-[1020px] flex-col items-start p-4 gap-1',
  small: 'max-w-[350px] min-h-[40px] flex-row items-center px-2 gap-2',
  large: 'max-w-[1020px] flex-col items-start p-4 gap-1',
  floating: 'max-w-[350px] min-h-[40px] flex-row items-center px-2 gap-2',
  'full-width': 'max-w-[1020px] flex-col items-start p-4 gap-1',
};

const typeClasses: Record<string, string> = {
  info: 'eidotter-alert--info',
  success: 'eidotter-alert--success',
  warning: 'eidotter-alert--warning',
  error: 'eidotter-alert--error',
  default: 'eidotter-alert--info',
  brand: 'eidotter-alert--warning',
};

/**
 * DOS-styled Alert with CRT phosphor enter/exit animations.
 * Uses useAnimatedDismiss for smooth phosphor fade-out on close.
 */
export const Alert: React.FC<AlertProps> = ({
  size = 'lg',
  type = 'info',
  title,
  children,
  onClose,
  onClickHere,
  className,
}) => {
  const { isClosing, triggerClose, handleAnimationEnd } = useAnimatedDismiss('alert-exit', onClose);
  const isSmall = size === 'sm' || size === 'small' || size === 'floating';

  return (
    <div
      className={cn(
        'relative overflow-hidden text-left w-full',
        'font-dos text-[16px]',
        'eidotter-alert',
        sizeClasses[size] || sizeClasses.lg,
        typeClasses[type] || typeClasses.info,
        isClosing && 'eidotter-alert--closing',
        // Layout direction
        isSmall ? 'flex' : 'flex',
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      role="alert"
      data-type={type}
    >
      <div className="flex items-center gap-2 w-full self-stretch">
        <div className={cn(
          'flex items-center justify-center flex-shrink-0 self-start mt-0.5',
          isSmall ? 'w-5 h-5' : 'w-6 h-6',
        )}>
          <Icon
            name={ALERT_ICONS[type] || 'Info'}
            size='S'
            aria-label={type + ' alert'}
          />
        </div>
        {title && <div className="flex-1 leading-[140%]">{title}</div>}
        {onClose && (
          <button
            className="eidotter-alert__close"
            onClick={triggerClose}
            aria-label="Close alert"
          >
            <Icon name="Close" size="S" />
          </button>
        )}
      </div>
      {!isSmall && (children || onClickHere) && (
        <div className="self-stretch flex items-start pl-8 text-[14px]">
          <div className="flex-1 leading-[140%] text-[var(--color-cga-amber-dim)]">
            {children && <span>{children}</span>}
            {onClickHere && (
              <button
                className="eidotter-alert__link"
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
