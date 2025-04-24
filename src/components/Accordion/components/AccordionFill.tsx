import React, { useState } from 'react';
import { Section } from './Section';
import './AccordionFill.css';

export interface AccordionFillProps {
  sections: Array<{
    title: string;
    content: string;
  }>;
  defaultExpandedIndex?: number;
}

export const AccordionFill: React.FC<AccordionFillProps> = ({
  sections,
  defaultExpandedIndex = -1,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(defaultExpandedIndex);

  const handleToggle = (index: number, isExpanded: boolean): void => {
    setExpandedIndex(isExpanded ? index : -1);
  };

  return (
    <div className="accordion-fill">
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