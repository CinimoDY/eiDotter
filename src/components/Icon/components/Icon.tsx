import React, { FC } from 'react';
import './Icon.css';

// Import manifest from src instead of public
import manifest from '../../../assets/icons/manifest.json';

// Generate icon names from manifest
export type IconName = keyof typeof manifest;

// Default sizes from our design tokens
const ICON_SIZES = {
  small: 16, // typography.sizes.small
  base: 24,  // window.control.size
  large: 32, // window.title.height
  touch: 44, // dimension.touch.target
} as const;

export type IconSize = 'L' | 'S';

export interface IconProps {
  /**
   * The name of the icon to display
   */
  name: IconName;
  /**
   * Size of the icon
   * @default 'L'
   */
  size?: IconSize;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional color override. If not provided, inherits from parent or uses system foreground color
   */
  color?: string;
  /**
   * Optional role for accessibility
   */
  role?: 'button';
}

/**
 * Icon component that renders SVG icons from our spritesheet
 * Usage:
 * ```tsx
 * <Icon name="Warning" size="base" />
 * <Icon name="Close" size={24} color="var(--color-system-link-default)" />
 * ```
 */
export const Icon: FC<IconProps> = ({
  name,
  size = 'L',
  className = '',
  onClick,
  color,
  role,
}) => {
  return (
    <svg
      className={`icon ${size === 'L' ? 'icon--l' : 'icon--s'} ${className} ${role ? `icon--${role}` : ''}`.trim()}
      onClick={onClick}
      role={role}
      aria-label={`${name} icon`}
      style={color ? { color } : undefined}
    >
      <use href={`/icons/sprites.svg#${name}`} />
    </svg>
  );
}; 