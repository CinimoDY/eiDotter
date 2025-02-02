import React from 'react';
import './.css';

export interface Props {
  children?: React.ReactNode;
  className?: string;
  variant?: 'small' | 'medium' | 'large' | 'primary' | 'secondary' | 'subtle';
  state?: 'default' | 'hover' | 'active' | 'disabled' | 'selected' | 'filled';
}

export const : React.FC<Props> = ({
  children,
  className = '',
  variant = 'medium',
  state = 'default',
}) => {
  return (
    <div 
      className={` ${className} ${variant} ${state}`.trim()}
    >
      {children}
    </div>
  );
};

export default ;
