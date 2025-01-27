import React from 'react';
import './Icon.css';
import { PlaceholderIcon } from './icons/Placeholder';

export type IconName = 
  | 'placeholder'  // We'll add more icon names as we get them from Figma
  | 'arrow-right'
  | 'arrow-left';

export interface IconProps {
  /**
   * The name of the icon to display
   */
  name: IconName;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Size of the icon (in pixels)
   */
  size?: number;
  /**
   * Optional title for accessibility
   */
  title?: string;
}

const iconComponents = {
  placeholder: PlaceholderIcon,
  'arrow-right': PlaceholderIcon, // Temporary placeholder
  'arrow-left': PlaceholderIcon, // Temporary placeholder
};

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  size = 16,
  title,
}) => {
  const IconComponent = iconComponents[name];
  
  return (
    <span 
      className={`icon icon--${name} ${className || ''}`}
      style={{ 
        width: size, 
        height: size,
        color: 'var(--color-dos-yellow)' // Using our DOS color
      }}
      role="img"
      aria-label={title}
    >
      <IconComponent />
    </span>
  );
};

export default Icon; 