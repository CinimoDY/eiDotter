import React, { FC } from 'react';
import {
  InfoCircle,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  X,
  ChevronUp,
  ChevronDown,
  Monitor01,
  Minus,
  Maximize01,
  Plus,
} from '@untitledui-pro/icons/line';
import { cn } from '../../../utils/cn';
import './Icon.css';

type UTIIcon = FC<{ size?: number; className?: string }>;

const ICON_MAP: Record<string, UTIIcon> = {
  'Info': InfoCircle,
  'Warning': AlertTriangle,
  'Error': AlertCircle,
  'Done': CheckCircle,
  'Close': X,
  'Check': CheckCircle,
  'Chevron Up': ChevronUp,
  'Chevron Down': ChevronDown,
  'App': Monitor01,
  'Cancel': Minus,
  'Fullscreen': Maximize01,
  'Add': Plus,
};

export type IconName = keyof typeof ICON_MAP;

export type IconSize = 'L' | 'S';

const SIZE_MAP: Record<IconSize, number> = { L: 56, S: 24 };

export interface IconProps {
  /** The name of the icon to display */
  name: IconName;
  /** Size of the icon */
  size?: IconSize;
  /** Optional CSS class name */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional color override */
  color?: string;
  /** Optional role for accessibility */
  role?: 'button';
  /** Accessible label override */
  'aria-label'?: string;
}

/**
 * Icon component backed by @untitledui/icons.
 * Renders inline SVG with proper viewBox scaling at any size.
 */
export const Icon: FC<IconProps> = ({
  name,
  size = 'L',
  className = '',
  onClick,
  color,
  role,
  'aria-label': ariaLabel,
}) => {
  const IconComponent = ICON_MAP[name as string];
  if (!IconComponent) return null;

  return (
    <span
      className={cn('icon', role && 'icon--button', className)}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel || `${name} icon`}
      style={color ? { color } : undefined}
    >
      <IconComponent size={SIZE_MAP[size]} className="icon__svg" />
    </span>
  );
};
