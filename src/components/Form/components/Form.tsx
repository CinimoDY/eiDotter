import React from 'react';
import { FormVariant, FormState, FormType } from '../types';
import './Form.css';

export interface FormProps {
  children?: React.ReactNode;
  className?: string;
  variant?: FormVariant;
  state?: FormState;
  type?: FormType;
}

export const Form: React.FC<FormProps> = ({
  children,
  className = '',
  variant,
  state = 'default',
  type,
}) => {
  const classes = [
    'form',
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

export default Form;
