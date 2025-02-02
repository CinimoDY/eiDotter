import React from 'react';
import { NavigationVariant, NavigationState, NavigationType } from '../types';
import './Navigation.css';

export interface NavigationProps {
  children?: React.ReactNode;
  className?: string;
  variant?: NavigationVariant;
  state?: NavigationState;
  type?: NavigationType;
}

export const Navigation: React.FC<NavigationProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'navigation',
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

export default Navigation;
