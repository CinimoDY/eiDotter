import React from 'react';
import { OtherVariant, OtherState, OtherType } from '../types';
import './Other.css';

export interface OtherProps {
  children?: React.ReactNode;
  className?: string;
  variant?: OtherVariant;
  state?: OtherState;
  type?: OtherType;
}

export const Other: React.FC<OtherProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'other',
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

export default Other;
