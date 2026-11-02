'use client';

import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';
import {
  DialogContext,
  DialogTrigger as AriaDialogTrigger,
  OverlayTriggerStateContext,
  Popover as AriaPopover,
  useSlottedContext,
} from 'react-aria-components';
import { useInteractOutside, useObjectRef } from 'react-aria';
import { Monitor } from 'pixelarticons/react/Monitor.js';
import { Switch } from '../../Switch';
import { HeaderButton } from '../../HeaderButton';
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
   * Trigger label and the panel's accessible name (a `role="group"`). Default `'Display'`.
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
 * Dismissal for the non-modal panel. React Aria's non-modal popover closes
 * on Escape, on page scroll and when focus moves to another element, but not
 * on a tap on empty page (no focus change) and not when Tab leaves it for the
 * document body (the trigger was the last tabbable element). This adds both:
 * an outside pointer interaction closes it, without a scrim or a scroll lock,
 * and after a Tab the panel closes if focus is no longer inside it. A press on
 * the trigger is swallowed here (as React Aria does for its modal popovers), so
 * the trigger's own press cannot reopen the panel the focus change just closed.
 */
const NonModalDismiss: React.FC<{
  popoverRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
}> = ({ popoverRef, triggerRef }) => {
  const state = useContext(OverlayTriggerStateContext);
  useInteractOutside({
    ref: popoverRef,
    isDisabled: !state?.isOpen,
    onInteractOutsideStart: (e) => {
      if (triggerRef.current?.contains(e.target as Node)) e.stopPropagation();
    },
    onInteractOutside: () => state?.close(),
  });
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover || !state?.isOpen) return;
    const doc = popover.ownerDocument;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !popover.contains(e.target as Node)) return;
      // React Aria's focus scope handles this keydown at the document capture
      // phase and stops its propagation, so listen there too and check where
      // focus landed once it has moved.
      setTimeout(() => {
        const active = doc.activeElement;
        if (!active || !popover.contains(active)) state.close();
      }, 0);
    };
    doc.addEventListener('keydown', onKeyDown, true);
    return () => doc.removeEventListener('keydown', onKeyDown, true);
  }, [popoverRef, state]);
  return null;
};

/**
 * The panel: a labelled group, not a React Aria Dialog (Dialog turns on focus
 * containment, which would keep Tab cycling inside the panel). It carries the
 * overlay id DialogTrigger hands down, so the trigger's `aria-controls`
 * resolves (in non-modal mode the Popover itself no longer takes the id).
 */
const Panel: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const overlayProps = useSlottedContext(DialogContext);
  return (
    <div id={overlayProps?.id} role="group" aria-label={label} className="eidotter-display-menu__panel">
      {children}
    </div>
  );
};

/**
 * DisplayMenu: one header control for display options (DMNC-1619).
 *
 * A HeaderButton trigger (pixel monitor glyph, label, ▾) opens a small panel of
 * rows, each a label and an eidotter `Switch`, for options such as DOS mode
 * or the amber-paper theme. Built for Header's `end` slot so every site has
 * one theme control instead of switches side by side.
 *
 * The panel is a non-modal React Aria popover (DMNC-1629): the page behind it
 * stays scrollable, readable and clickable, nothing is hidden from assistive
 * technology and no scrim is drawn. It portals out of the header (so the end
 * slot's clip never cuts it). Opening it focuses the first enabled switch;
 * Tab moves between the switches and Tab past the last one, Escape, a click or
 * tap outside, pressing the trigger again or scrolling the page close it, and
 * focus returns to the trigger.
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
  const triggerRef = useObjectRef(ref);
  const popoverRef = useRef<HTMLElement>(null);
  // Opening the panel puts focus on the first switch that can be toggled,
  // so Space works straight away (DMNC-1619 follow-up).
  const firstEnabled = items.findIndex((item) => !item.disabled);

  return (
    <AriaDialogTrigger defaultOpen={defaultOpen}>
      <HeaderButton
        ref={triggerRef}
        aria-label={label}
        icon={<Monitor className="eidotter-display-menu__icon" focusable="false" />}
        chevron
        labelDisplay={labelDisplay}
        className={cn(
          'eidotter-display-menu',
          `eidotter-display-menu--${labelDisplay}`,
          className,
        )}
      >
        {label}
      </HeaderButton>
      <AriaPopover
        ref={popoverRef}
        isNonModal
        placement={placement}
        offset={6}
        className="eidotter-display-menu__popover"
      >
        <NonModalDismiss popoverRef={popoverRef} triggerRef={triggerRef} />
        <Panel label={label}>
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
        </Panel>
      </AriaPopover>
    </AriaDialogTrigger>
  );
});

DisplayMenu.displayName = 'DisplayMenu';
