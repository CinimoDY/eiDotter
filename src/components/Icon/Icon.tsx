import React from 'react';
import './Icon.css';

export type IconName = 'placeholder' | 'open-in-new' | 'arrow-right' | 'arrow-left';
export type IconSize = 'small' | 'medium' | 'large';

export interface IconProps {
  /**
   * The name of the icon to display
   */
  name: IconName;
  /**
   * Size of the icon (in pixels)
   */
  size?: IconSize;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Optional title for accessibility
   */
  title?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  className = '',
  title,
}) => {
  const iconPath = `/assets/icons/${name}.svg`;
  
  return (
    <span 
      className={`icon icon--${size} ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label={title}
    >
      <img src={iconPath} alt={name} />
    </span>
  );
};

export default Icon; 