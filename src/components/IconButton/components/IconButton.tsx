'use client';

import React, { forwardRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { PressEvent } from 'react-aria-components';
import { Icon } from '../../Icon/components/Icon';
import type { IconName } from '../../Icon/components/Icon';
import { cn } from '../../../utils/cn';
import './IconButton.css';

/** `md` = 36×36 hit area, 20px glyph (every built-in adopter). `window` = 28×28, 16px glyph, for dense chrome. */
export type IconButtonSize = 'md' | 'window';
/** `outline` = 1px square outline at rest (default). `bare` = no resting outline. */
export type IconButtonVariant = 'outline' | 'bare';

export interface IconButtonProps {
  /** Glyph from the `<Icon>` set: `Close` (X), `Cancel` (minus, minimise), `Fullscreen` (maximise), `Chevron Left/Right/Up/Down`. */
  icon: IconName;
  /** Accessible name. Required: the button has no visible text. Rendered as `aria-label`. */
  label: string;
  /** Hit-area size. Defaults to `md` (36×36). */
  size?: IconButtonSize;
  /**
   * `outline` (default) shows the thin square outline at rest. `bare` drops
   * it, for places where an outline would fight a neighbouring rule.
   */
  variant?: IconButtonVariant;
  /** Disables the button (opacity 0.5, no hover invert). */
  isDisabled?: boolean;
  /** Called on press (mouse, touch, Enter, Space). */
  onPress?: (e: PressEvent) => void;
  /**
   * Keep the button out of the Tab order. Only for controls whose action is
   * reachable another way (Tag's remove, reachable via Delete/Backspace on
   * the focused tag).
   */
  excludeFromTabOrder?: boolean;
  /** Extra classes (placement) merged onto the button. */
  className?: string;
}

/**
 * IconButton: the one icon-only control (DMNC-1592).
 *
 * A pixel glyph from `<Icon>` inside a thin square outline: transparent fill,
 * `text-accent` glyph at rest; hover inverts (amber fill, dark glyph); focus
 * is a 2px brand outline offset 2px. Every close, prev/next and window
 * control in the library uses it, so the glyph and states match everywhere.
 *
 * React Aria `Button` handles press, keyboard and focus-visible. Ref forwards
 * to the `<button>`.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  label,
  size = 'md',
  variant = 'outline',
  isDisabled,
  onPress,
  excludeFromTabOrder,
  className,
}, ref) => (
  <AriaButton
    ref={ref}
    aria-label={label}
    isDisabled={isDisabled}
    onPress={onPress}
    excludeFromTabOrder={excludeFromTabOrder}
    className={cn(
      'inline-flex items-center justify-center shrink-0',
      'eidotter-icon-button',
      size === 'window' && 'eidotter-icon-button--window',
      variant === 'bare' && 'eidotter-icon-button--bare',
      className,
    )}
  >
    <span className="eidotter-icon-button__glyph" aria-hidden="true">
      <Icon name={icon} size="S" decorative />
    </span>
  </AriaButton>
));

IconButton.displayName = 'IconButton';
