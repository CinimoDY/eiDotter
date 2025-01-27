import React from 'react';
import { useIconContext } from './IconContext';
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
  size?: 12 | 16 | 24;
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
  const { baseUrl } = useIconContext();
  const iconUrl = `${baseUrl}/${name}.svg`;

  return (
    <span 
      className={`icon icon--${name} ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label={title}
    >
      <img src={iconUrl} alt={title || name} width={size} height={size} />
    </span>
  );
};

export default Icon; 