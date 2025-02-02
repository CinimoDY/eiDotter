import React from 'react';
import { DataDisplayVariant, DataDisplayState, DataDisplayType } from '../types';
import './DataDisplay.css';

export interface DataDisplayProps {
  children?: React.ReactNode;
  className?: string;
  variant?: DataDisplayVariant;
  state?: DataDisplayState;
  type?: DataDisplayType;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'datadisplay',
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

export default DataDisplay;
