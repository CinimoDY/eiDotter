import React, { useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { Icon } from '../../Icon/components/Icon';
import { Progress } from '../../Progress/components/Progress';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';
import type { AlertAction } from '../../Alert/components/Alert';
import './Notification.css';

export type NotificationType = 'primary' | 'gray' | 'success' | 'warning' | 'error';

export interface NotificationProps {
  /** Color/icon variant */
  type?: NotificationType;
  /** Title text */
  title?: string;
  /** Supporting text / description */
  children?: React.ReactNode;
  /** Action buttons */
  actions?: AlertAction[];
  /** Close handler — shows close button when provided */
  onClose?: () => void;
  /** Renders avatar element instead of featured icon */
  avatar?: React.ReactNode;
  /** Renders image element above text content */
  image?: React.ReactNode;
  /** Progress value 0-100 — renders Progress bar below text */
  progress?: number;
  /** Label for progress bar */
  progressLabel?: string;
  /** Auto-dismiss after N milliseconds */
  duration?: number;
  /** Hide the featured icon */
  showIcon?: boolean;
  /** Additional CSS class */
  className?: string;
}

const TYPE_ICONS = {
  primary: 'Info',
  gray: 'Info',
  success: 'Done',
  warning: 'Warning',
  error: 'Error',
} as const;

/**
 * DOS-styled Notification (toast) with V.37 design: layered amber glow,
 * featured icon with outline rings, optional progress bar and auto-dismiss.
 *
 * Purely presentational — consumers handle positioning.
 */
export const Notification: React.FC<NotificationProps> = ({
  type = 'primary',
  title,
  children,
  actions,
  onClose,
  avatar,
  image,
  progress,
  progressLabel,
  duration,
  showIcon = true,
  className,
}) => {
  const { isClosing, triggerClose, handleAnimationEnd } = useAnimatedDismiss('notification-exit', onClose);

  // Auto-dismiss timer
  useEffect(() => {
    if (duration == null || !onClose) return;
    const timer = setTimeout(() => triggerClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, triggerClose]);

  const hasIcon = showIcon && !avatar;
  const hasProgress = progress != null;

  return (
    <div
      className={cn(
        'w-full max-w-[400px]',
        'font-dos text-dos-text-sm',
        'border border-dos-border-default rounded-dos-base',
        'eidotter-notification',
        `eidotter-notification--${type}`,
        isClosing && 'eidotter-notification--closing',
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      role={type === 'error' ? 'alert' : 'status'}
      data-type={type}
    >
      {/* Optional image above content */}
      {image && (
        <div className="eidotter-notification__image">
          {image}
        </div>
      )}

      <div className="flex flex-row gap-4 p-4">
        {/* Featured icon or avatar */}
        {avatar && (
          <div className="eidotter-notification__avatar flex-shrink-0">
            {avatar}
          </div>
        )}
        {hasIcon && (
          <div className="eidotter-notification__icon">
            <Icon
              name={TYPE_ICONS[type] || 'Info'}
              size="S"
              aria-label={`${type} notification`}
            />
          </div>
        )}

        {/* Content column */}
        <div className={cn('flex-1 flex flex-col gap-3 min-w-0', onClose && !hasIcon && !avatar && 'pr-8')}>
          {(title || children) && (
            <div className="flex flex-col gap-1">
              {title && (
                <div className="eidotter-notification__title font-dos leading-[140%]">
                  {title}
                </div>
              )}
              {children && (
                <div className="eidotter-notification__text font-dos leading-[140%]">
                  {children}
                </div>
              )}
            </div>
          )}

          {hasProgress && (
            <div className="flex flex-col gap-1">
              <Progress
                value={progress}
                max={100}
                size="sm"
                fullWidth
                showLabel={false}
              />
              {progressLabel && (
                <div className="eidotter-notification__text font-dos text-dos-text-xs">
                  {progressLabel}
                </div>
              )}
            </div>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-row gap-3">
              {actions.map((action, i) => (
                <AriaButton
                  key={i}
                  className="eidotter-notification__action"
                  onPress={action.onClick}
                >
                  {action.label}
                  {action.icon}
                </AriaButton>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        {onClose && (
          <AriaButton
            className="eidotter-notification__close"
            onPress={triggerClose}
            aria-label="Close notification"
          >
            <Icon name="Close" size="S" />
          </AriaButton>
        )}
      </div>
    </div>
  );
};
