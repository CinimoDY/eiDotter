'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import { Icon } from '../../Icon';
import './Nav.css';

export interface NavItem {
  /** Display label */
  label: string;
  /** URL/path for the link */
  href: string;
}

export interface NavProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active href (consumer passes current route) */
  activeHref?: string;
  /** Visual variant */
  variant?: 'retro' | 'modern';
  /**
   * Custom link component (e.g., Next.js Link).
   * If not provided, uses regular anchor tags.
   */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }>;
  /** Additional CSS class name */
  className?: string;
}

const variantClasses: Record<string, string> = {
  retro:  'eidotter-nav--retro',
  modern: 'eidotter-nav--modern',
};

export const DesktopNav: React.FC<NavProps> = ({
  items,
  activeHref,
  variant = 'retro',
  linkComponent,
  className,
}) => {
  const LinkTag = linkComponent || 'a';

  return (
    <nav
      className={cn(
        'eidotter-nav eidotter-nav--desktop',
        variantClasses[variant],
        className,
      )}
      aria-label="Main navigation"
    >
      <ul className="eidotter-nav__desktop-list">
        {items.map((item) => {
          // Unsafe hrefs (javascript, data, vbscript, …) render the label as a
          // plain span instead of an anchor.
          const safeHref = isSafeHref(item.href) ? item.href : undefined;
          const linkClassName = cn(
            'eidotter-nav__link',
            activeHref === item.href && 'eidotter-nav__link--active',
          );
          return (
            <li key={item.href} className="eidotter-nav__desktop-item">
              {safeHref ? (
                <LinkTag
                  href={safeHref}
                  className={linkClassName}
                  aria-current={activeHref === item.href ? 'page' : undefined}
                >
                  {item.label}
                </LinkTag>
              ) : (
                <span className={linkClassName}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const MobileNav: React.FC<NavProps> = ({
  items,
  activeHref,
  variant = 'retro',
  linkComponent,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const LinkTag = linkComponent || 'a';

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  // Only restore focus to the trigger on an open→close transition, never on the
  // initial closed mount.
  const wasOpenRef = useRef(false);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Focus management: move focus into the panel on open, restore it to the
  // MENU trigger on close. The panel is always in the DOM (slide transition),
  // so `inert` (below) keeps it out of the tab order / a11y tree while closed.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Focus trap — cycle Tab/Shift+Tab within the open panel.
  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Tab' || !isOpen) return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className={cn(
      'eidotter-nav eidotter-nav--mobile',
      variantClasses[variant],
      className,
    )}>
      <button
        ref={triggerRef}
        onClick={toggle}
        className="eidotter-nav__menu-trigger"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="eidotter-mobile-nav-panel"
      >
        MENU
      </button>

      {isOpen && (
        <div
          className="eidotter-nav__overlay"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        ref={panelRef}
        id="eidotter-mobile-nav-panel"
        className={cn(
          'eidotter-nav__panel',
          isOpen && 'eidotter-nav__panel--open',
        )}
        aria-label="Mobile navigation"
        inert={!isOpen}
        onKeyDown={handlePanelKeyDown}
      >
        <div className="eidotter-nav__panel-header">
          <button
            ref={closeButtonRef}
            onClick={close}
            className="eidotter-nav__close"
            aria-label="Close menu"
          >
            <Icon name="Close" size="S" />
          </button>
        </div>

        <ul className="eidotter-nav__list">
          {items.map((item) => {
            // Same guard as desktop — mobile panel is a second render path.
            const safeHref = isSafeHref(item.href) ? item.href : undefined;
            const linkClassName = cn(
              'eidotter-nav__link',
              activeHref === item.href && 'eidotter-nav__link--active',
            );
            return (
              <li key={item.href} className="eidotter-nav__item">
                {safeHref ? (
                  <LinkTag
                    href={safeHref}
                    className={linkClassName}
                    aria-current={activeHref === item.href ? 'page' : undefined}
                    onClick={close}
                  >
                    {item.label}
                  </LinkTag>
                ) : (
                  <span className={linkClassName}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export const Nav: React.FC<NavProps> = (props) => {
  return (
    <>
      <MobileNav {...props} />
      <DesktopNav {...props} />
    </>
  );
};
