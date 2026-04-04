import React, { useState, useEffect } from 'react';
import { Icon } from '../../Icon/components/Icon';
import { cn } from '../../../utils/cn';
import './Section.css';

export interface SectionProps {
  /** The title text of the section */
  title: string;
  /** The content of the section */
  children: React.ReactNode;
  /** Whether the section is expanded by default */
  defaultExpanded?: boolean;
  /** Whether the section is in a hover state */
  isHovered?: boolean;
  /** Whether the section is in an active state */
  isActive?: boolean;
  /** Optional callback when the section is toggled */
  onToggle?: (isExpanded: boolean) => void;
}

/**
 * DOS-styled collapsible section (accordion item).
 * Pure presentational — uses CSS transitions for expand/collapse.
 */
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
      className={cn(
        'w-full border border-dos-border-default bg-dos-bg-primary text-cga-amber font-dos',
        'eidotter-section',
        isExpanded && 'eidotter-section--expanded',
        isHovered && 'eidotter-section--hover',
        isActive && 'eidotter-section--active',
      )}
    >
      <button
        className="eidotter-section__header w-full flex justify-between items-center px-4 py-2 bg-transparent border-0 text-inherit font-[inherit] cursor-pointer text-left"
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <div className="flex-1 text-base leading-6">{title}</div>
        <div className="eidotter-section__icon flex items-center justify-center w-6 h-6 ml-2 text-inherit">
          <Icon
            name={isExpanded ? 'Chevron Up' : 'Chevron Down'}
            size="S"
          />
        </div>
      </button>
      <div
        className="eidotter-section__content"
        inert={!isExpanded ? true : undefined}
      >
        {children}
      </div>
    </div>
  );
}; 