import React from 'react';
import { LayoutVariant, LayoutState, LayoutType } from '../types';
import './Layout.css';

export interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
  variant?: LayoutVariant;
  state?: LayoutState;
  type?: LayoutType;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'layout',
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

export default Layout;
