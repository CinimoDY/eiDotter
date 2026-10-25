'use client';

import React, { forwardRef, useId } from 'react';
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from 'react-aria-components';
import { Monitor } from 'pixelarticons/react/Monitor.js';
import { ChevronDown } from 'pixelarticons/react/ChevronDown.js';
import { Switch } from '../../Switch';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './DisplayMenu.css';

export interface DisplayMenuItem {
  /** Stable id, used for keys and the hint's id. */
  id: string;
  /** Row label, also the switch's accessible name (e.g. `'DOS'`, `'PAPER'`). */
  label: string;
  /** Whether the option is on. The consumer owns the state. */
  checked: boolean;
  /** Called with the new value when the switch is toggled. */
  onChange: (checked: boolean) => void;
  /** Disable the row (e.g. PAPER while DOS is off). */
  disabled?: boolean;
  /** Short muted line under the row, linked as the switch's description. */
  hint?: string;
}

export interface DisplayMenuProps {
  /** One row per display option: a label and a Switch. */
  items: DisplayMenuItem[];
  /**
   * Trigger label and the panel's accessible name. Default `'Display'`.
   * Below 640px the trigger shows only the icon; the label stays its
   * accessible name.
   */
  label?: string;
  /**
   * `'responsive'` (default): icon only below 640px, icon + label above.
   * `'icon'`: always icon only. `'label'`: always icon + label.
   */
  labelDisplay?: 'responsive' | 'icon' | 'label';
  /** Panel placement relative to the trigger. Default `'bottom end'`. */
  placement?: 'bottom end' | 'bottom start' | 'bottom';
  /** Render with the panel open (uncontrolled), e.g. for docs and stories. */
  defaultOpen?: boolean;
  /** Extra class on the trigger button. */
  className?: string;
}

/**
 * DisplayMenu: one header control for display options (DMNC-1619).
 *
 * A trigger button (pixel monitor glyph, label, ▾) opens a small panel of
 * rows, each a label and an eidotter `Switch`, for options such as DOS mode
 * or the amber-paper theme. Built for Header's `end` slot so every site has
 * one theme control instead of switches side by side.
 *
 * The panel is a React Aria popover dialog: it portals out of the header (so
 * the end slot's clip never cuts it), opening it focuses the first enabled
 * switch, Escape and a click outside close it and focus returns to the
 * trigger, and Tab moves between the switches.
 * Consumers own the state; DisplayMenu only renders it.
 */
export const DisplayMenu = forwardRef<HTMLButtonElement, DisplayMenuProps>(({
  items,
  label = 'Display',
  labelDisplay = 'responsive',
  placement = 'bottom end',
  defaultOpen,
  className,
}, ref) => {
  const baseId = useId();
  // Opening the panel puts focus on the first switch that can be toggled,
  // so Space works straight away (DMNC-1619 follow-up).
  const firstEnabled = items.findIndex((item) => !item.disabled);

  return (
    <AriaDialogTrigger defaultOpen={defaultOpen}>
      <AriaButton
        ref={ref}
        aria-label={label}
        className={cn(
          'eidotter-display-menu',
          `eidotter-display-menu--${labelDisplay}`,
          className,
        )}
      >
        <Monitor className="eidotter-display-menu__icon" aria-hidden="true" focusable="false" />
        <span className="eidotter-display-menu__label" aria-hidden="true">{label}</span>
        <ChevronDown className="eidotter-display-menu__chevron" aria-hidden="true" focusable="false" />
      </AriaButton>
      <AriaPopover placement={placement} offset={6} className="eidotter-display-menu__popover">
        <AriaDialog aria-label={label} className="eidotter-display-menu__panel">
          <ul className="eidotter-display-menu__list">
            {items.map((item, index) => {
              const hintId = item.hint ? `${baseId}-${item.id}-hint` : undefined;
              return (
                <li key={item.id} className="eidotter-display-menu__row">
                  <Switch
                    label={item.label}
                    checked={item.checked}
                    onChange={item.onChange}
                    disabled={item.disabled}
                    aria-describedby={hintId}
                    autoFocus={index === firstEnabled}
                    className="eidotter-display-menu__switch"
                  />
                  {item.hint && (
                    <span id={hintId} className="eidotter-display-menu__hint">{item.hint}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </AriaDialog>
      </AriaPopover>
    </AriaDialogTrigger>
  );
});

DisplayMenu.displayName = 'DisplayMenu';
