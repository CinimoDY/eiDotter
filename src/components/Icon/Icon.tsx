import React from 'react';
import './Icon.css';

export type IconName = 
  | 'placeholder'
  | 'open-in-new'
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

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 24,
  title,
}) => {
  return (
    <span 
      className={`icon icon--${name} ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label={title}
    >
      <i className="icon__sprite" />
    </span>
  );
};

export default Icon; 