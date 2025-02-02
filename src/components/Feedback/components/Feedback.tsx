import React from 'react';
import { FeedbackVariant, FeedbackState, FeedbackType } from '../types';
import './Feedback.css';

export interface FeedbackProps {
  children?: React.ReactNode;
  className?: string;
  variant?: FeedbackVariant;
  state?: FeedbackState;
  type?: FeedbackType;
}

export const Feedback: React.FC<FeedbackProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'feedback',
    className,
    variant,
    state,
    type && `type-${type}`,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      data-variant={variant}
      data-state={state}
      data-type={type}
    >
      {children}
    </div>
  );
};

export default Feedback;
