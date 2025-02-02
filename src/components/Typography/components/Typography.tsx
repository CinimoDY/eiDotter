import React from 'react';
import { TypographyVariant, TypographyState, TypographyType } from '../types';
import './Typography.css';

export interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  variant?: TypographyVariant;
  state?: TypographyState;
  type?: TypographyType;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'typography',
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

export default Typography;
