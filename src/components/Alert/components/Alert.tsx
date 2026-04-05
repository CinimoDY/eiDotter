import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { Icon } from '../../Icon/components/Icon';
import { useAnimatedDismiss } from '../../../hooks/useAnimatedDismiss';
import './Alert.css';

export type AlertColor = 'brand' | 'gray' | 'default' | 'error' | 'warning' | 'success';

export interface AlertAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Optional trailing icon */
  icon?: React.ReactNode;
}

export interface AlertProps {
  /** Color variant (V.37) */
  color?: AlertColor;
  /** Size variant: floating = card, full-width = banner */
  size?: 'floating' | 'full-width' | 'sm' | 'lg' | 'small' | 'large';
  /** Title text */
  title?: string;
  /** Supporting text / description */
  children?: React.ReactNode;
  /** Action buttons below supporting text */
  actions?: AlertAction[];
  /** Close handler (shows close button when provided) */
  onClose?: () => void;
  /** Optional CSS class name */
  className?: string;
  /** @deprecated Use `color` instead */
  type?: 'info' | 'success' | 'warning' | 'error' | 'default' | 'brand';
  /** @deprecated Use `actions` instead */
  onClickHere?: () => void;
}

const TYPE_TO_COLOR: Record<string, AlertColor> = {
  info: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  default: 'default',
  brand: 'brand',
};

const COLOR_ICONS = {
  brand: 'Info',
  gray: 'Info',
  default: 'Info',
  error: 'Error',
  warning: 'Warning',
  success: 'Done',
} as const;

function resolveColor(color?: AlertColor, type?: string): AlertColor {
  if (color) return color;
  return TYPE_TO_COLOR[type || 'info'] || 'default';
}

function resolveSize(size?: string): 'floating' | 'full-width' {
  if (size === 'full-width') return 'full-width';
  return 'floating';
}

/**
 * DOS-styled Alert with V.37 design: uniform dark background, featured icon
 * with outline rings, optional actions, and container-query responsive layout.
 *
 * Backward-compatible with `type` and `onClickHere` props from pre-V.37.
 */
export const Alert: React.FC<AlertProps> = ({
  color: colorProp,
  size = 'floating',
  type,
  title,
  children,
  actions,
  onClose,
  onClickHere,
  className,
}) => {
  const resolvedColor = resolveColor(colorProp, type);
  const resolvedSize = resolveSize(size);
  const { isClosing, triggerClose, handleAnimationEnd } = useAnimatedDismiss('alert-exit', onClose);

  // Build actions list (new prop + legacy onClickHere)
  const allActions: AlertAction[] = [
    ...(actions || []),
    ...(onClickHere ? [{ label: 'Click here', onClick: onClickHere }] : []),
  ];

  return (
    <div
      className={cn(
        'relative w-full flex flex-col gap-4 p-4',
        'font-dos text-dos-sm',
        'bg-dos-bg-primary border border-dos-border-default rounded-dos-base',
        'eidotter-alert',
        `eidotter-alert--${resolvedColor}`,
        resolvedSize === 'floating' && 'max-w-[1216px]',
        resolvedSize === 'full-width' && 'eidotter-alert--full-width max-w-none',
        isClosing && 'eidotter-alert--closing',
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      role="alert"
      data-color={resolvedColor}
      data-size={resolvedSize}
    >
      {/* Featured icon with outline rings */}
      <div className="eidotter-alert__icon">
        <Icon
          name={COLOR_ICONS[resolvedColor] || 'Info'}
          size="S"
          aria-label={`${resolvedColor} alert`}
        />
      </div>

      {/* Content: title + supporting text + actions */}
      <div className={cn('flex-1 flex flex-col gap-3 min-w-0', onClose && 'pr-6')}>
        {(title || children) && (
          <div className="flex flex-col gap-1">
            {title && (
              <div className="eidotter-alert__title font-dos leading-[140%]">
                {title}
              </div>
            )}
            {children && (
              <div className="eidotter-alert__text font-dos leading-[140%]">
                {children}
              </div>
            )}
          </div>
        )}

        {allActions.length > 0 && (
          <div className="flex flex-row gap-3">
            {allActions.map((action, i) => (
              <button
                key={i}
                type="button"
                className="eidotter-alert__action"
                onClick={action.onClick}
              >
                {action.label}
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close button */}
      {onClose && (
        <AriaButton
          className="eidotter-alert__close"
          onPress={triggerClose}
          aria-label="Close alert"
        >
          <Icon name="Close" size="S" />
        </AriaButton>
      )}
    </div>
  );
};
