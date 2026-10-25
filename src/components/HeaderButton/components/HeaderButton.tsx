'use client';

import React, { forwardRef } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { ChevronDown } from 'pixelarticons/react/ChevronDown.js';
import { cn } from '../../../utils/cn';
import './HeaderButton.css';

export interface HeaderButtonProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style'> {
  /** Leading glyph, e.g. a pixelarticons icon. Rendered `aria-hidden`. */
  icon?: React.ReactNode;
  /** Text content, e.g. `'⌘K'` or `'Display'`. */
  children?: React.ReactNode;
  /**
   * Accessible name. Required when the text is not a readable name (`'⌘K'`)
   * or is hidden (`labelDisplay` other than `'label'`). Defaults to the text
   * when the text is a plain string.
   */
  'aria-label'?: string;
  /**
   * `'label'` (default): icon and text always. `'responsive'`: icon only
   * below 640px of viewport width. `'icon'`: always icon only. Hidden text
   * stays the accessible name through `aria-label`.
   */
  labelDisplay?: 'label' | 'responsive' | 'icon';
  /** Trailing ▾ chevron, for a control that opens a panel. */
  chevron?: boolean;
  /** Extra class on the button. */
  className?: string;
}

/**
 * HeaderButton: the one control shape for the Header `end` slot (0.46).
 *
 * A 36px-tall outlined box (1px border-default, square; hover and an open
 * panel invert to the brand fill; 2px focus ring) holding an optional pixel
 * glyph, text and an optional chevron. DisplayMenu's trigger is a
 * HeaderButton, and a ⌘K launcher is the same component with `⌘K` inside,
 * so every header control has the same height, border and states. On phones
 * (below 480px) it is 32px tall to fit beside the brand and MENU.
 *
 * React Aria Button: works as a `DialogTrigger`/`MenuTrigger` child and
 * takes `onPress`.
 */
export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(({
  icon,
  children,
  labelDisplay = 'label',
  chevron = false,
  className,
  'aria-label': ariaLabel,
  ...rest
}, ref) => {
  const hasText = children != null && children !== false && children !== '';
  const name = ariaLabel ?? (typeof children === 'string' ? children : undefined);

  return (
    <AriaButton
      ref={ref}
      aria-label={name}
      className={cn(
        'eidotter-header-button',
        `eidotter-header-button--${labelDisplay}`,
        !icon && 'eidotter-header-button--text-only',
        className,
      )}
      {...rest}
    >
      {icon && <span className="eidotter-header-button__icon" aria-hidden="true">{icon}</span>}
      {hasText && (
        <span className="eidotter-header-button__label" aria-hidden={name ? true : undefined}>
          {children}
        </span>
      )}
      {chevron && (
        <ChevronDown className="eidotter-header-button__chevron" aria-hidden="true" focusable="false" />
      )}
    </AriaButton>
  );
});

HeaderButton.displayName = 'HeaderButton';
