import { FC } from 'react';
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

export type IconSize = keyof typeof ICON_SIZES | number;

export interface IconProps {
  /**
   * The name of the icon to display
   */
  name: IconName;
  /**
   * Size of the icon. Can be a token name ('small', 'base', 'large', 'touch') or a custom number
   * @default 'base'
   */
  size?: 'L' | 'S';
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
  // Get original dimensions from manifest
  const originalWidth = manifest[name]?.width || 56;
  const originalHeight = manifest[name]?.height || 56;
  
  // Calculate scaling
  const finalSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  const scale = finalSize / originalWidth;
  const scaledWidth = originalWidth * scale;
  const scaledHeight = originalHeight * scale;
  
  return (
    <svg
      width={scaledWidth}
      height={scaledHeight}
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
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