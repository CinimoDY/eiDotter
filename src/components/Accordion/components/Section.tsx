import React, { useState, useEffect } from 'react';
import { Icon } from '../../Icon/components/Icon';
import './Section.css';

export interface SectionProps {
  /**
   * The title text of the section
   */
  title: string;
  /**
   * The content of the section
   */
  children: React.ReactNode;
  /**
   * Whether the section is expanded by default
   */
  defaultExpanded?: boolean;
  /**
   * Whether the section is in a hover state
   */
  isHovered?: boolean;
  /**
   * Whether the section is in an active state
   */
  isActive?: boolean;
  /**
   * Optional callback when the section is toggled
   */
  onToggle?: (isExpanded: boolean) => void;
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  isHovered = false,
  isActive = false,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <div 
      className={`
        section
        ${isExpanded ? 'section--expanded' : ''}
        ${isHovered ? 'section--hover' : ''}
        ${isActive ? 'section--active' : ''}
      `.trim()}
    >
      <button
        className="section__header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <div className="section__title">{title}</div>
        <div className="section__icon">
          <Icon 
            name={isExpanded ? 'Chevron Up' : 'Chevron Down'} 
            size="S"
          />
        </div>
      </button>
      {isExpanded && (
        <div className="section__content">
          {children}
        </div>
      )}
    </div>
  );
}; 