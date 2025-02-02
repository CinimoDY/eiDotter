import React from 'react';
import { OverlayVariant, OverlayState, OverlayType } from '../types';
import './Overlay.css';

export interface OverlayProps {
  children?: React.ReactNode;
  className?: string;
  variant?: OverlayVariant;
  state?: OverlayState;
  type?: OverlayType;
}

export const Overlay: React.FC<OverlayProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'overlay',
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

export default Overlay;
