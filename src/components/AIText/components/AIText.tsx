import React from 'react';
import { cn } from '../../../utils/cn';
import './AIText.css';

export interface AITextProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const AIText: React.FC<AITextProps> = ({
  children,
  className,
  title = 'AI-assisted text — being rewritten',
}) => {
  return (
    <span className={cn('eidotter-ai-text', className)} title={title}>
      <span className="sr-only">AI-assisted: </span>
      {children}
    </span>
  );
};

AIText.displayName = 'AIText';
