import React, { FC } from 'react';
import './Icon.css';

// Import manifest from src instead of public
import manifest from '../../../assets/icons/manifest.json';

// Generate icon names from manifest
export type IconName = keyof typeof manifest;

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
 * <Icon name="Close" size={24} color="var(--color-semantic-link-default)" />
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
  // Root-relative path — the consuming app's build tool (Vite base option) handles URL rewriting
  const baseUrl = '';
  
  return (
    <svg
      className={`icon ${size === 'L' ? 'icon--l' : 'icon--s'} ${className} ${role ? `icon--${role}` : ''}`.trim()}
      viewBox="0 0 24 24"
      onClick={onClick}
      role={role}
      aria-label={`${name} icon`}
      style={color ? { color } : undefined}
    >
      <use href={`${baseUrl}/icons/sprites.svg#${name}`} />
    </svg>
  );
}; 