import React from 'react';
import { MediaVariant, MediaState, MediaType } from '../types';
import './Media.css';

export interface MediaProps {
  children?: React.ReactNode;
  className?: string;
  variant?: MediaVariant;
  state?: MediaState;
  type?: MediaType;
}

export const Media: React.FC<MediaProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'media',
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

export default Media;
