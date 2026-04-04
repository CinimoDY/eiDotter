import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  'aria-label'?: string;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: 'text-[12px] px-2 py-1 min-h-6 gap-1',
  sm: 'text-[14px] px-2 py-1 min-h-7 gap-1',
  md: 'text-[14px] px-3 py-2 min-h-8 gap-1.5',
  lg: 'text-[16px] px-4 py-2.5 min-h-10 gap-1.5',
  xl: 'text-[16px] px-5 py-3 min-h-11 gap-2',
  small: 'text-[14px] px-2 py-1 min-h-6 gap-1',
  medium: 'text-[14px] px-3 py-2 min-h-8 gap-1.5',
  large: 'text-[16px] px-4 py-2.5 min-h-10 gap-1.5',
};

const variantClasses: Record<string, string> = {
  primary: 'eidotter-btn--primary',
  secondary: 'eidotter-btn--secondary',
  tertiary: 'eidotter-btn--tertiary',
  destructive: 'eidotter-btn--destructive',
  ghost: 'eidotter-btn--ghost',
  link: 'eidotter-btn--link',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  children,
  onClick,
  className,
  fullWidth = false,
  iconOnly = false,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <AriaButton
      type={type}
      isDisabled={isDisabled}
      onPress={() => {
        if (onClick && !isDisabled) {
          onClick({} as React.MouseEvent<HTMLButtonElement>);
        }
      }}
      className={cn(
        'inline-flex items-center justify-center relative',
        'border-2 border-solid',
        'font-dos font-dos-bold leading-none whitespace-nowrap select-none',
        'outline-none cursor-pointer',
        'transition-all duration-100 ease-linear',
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.primary,
        isDisabled && 'opacity-50 cursor-not-allowed',
        loading && 'cursor-wait',
        fullWidth && 'w-full',
        iconOnly && 'aspect-square !px-0',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dos-border-focus',
        className,
      )}
      data-loading={loading || undefined}
      data-variant={variant}
      {...props}
    >
      {loading && (
        <span className="eidotter-btn__loading" aria-hidden="true">
          █
        </span>
      )}
      <span className={cn(
        'inline-flex items-center justify-center',
        loading && 'opacity-70',
      )}>
        {children}
      </span>
    </AriaButton>
  );
};
