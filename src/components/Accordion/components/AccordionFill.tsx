import React, { useState } from 'react';
import { Section } from './Section';
import { cn } from '../../../utils/cn';
import './AccordionFill.css';

export interface AccordionFillProps {
  sections: Array<{
    title: string;
    content: string;
  }>;
  defaultExpandedIndex?: number;
  className?: string;
}

export const AccordionFill: React.FC<AccordionFillProps> = ({
  sections,
  defaultExpandedIndex = -1,
  className,
}) => {
  const [, setExpandedIndex] = useState<number>(defaultExpandedIndex);

  const handleToggle = (index: number, isExpanded: boolean): void => {
    setExpandedIndex(isExpanded ? index : -1);
  };

  return (
    <div className={cn(
      'w-full flex flex-col items-stretch gap-2 text-left text-base font-dos text-dos-text-brand',
      'eidotter-accordion-fill',
      className,
    )}>
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          defaultExpanded={index === defaultExpandedIndex}
          onToggle={(isExpanded) => handleToggle(index, isExpanded)}
        >
          {section.content}
        </Section>
      ))}
    </div>
  );
}; 