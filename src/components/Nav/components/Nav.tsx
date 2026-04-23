'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import './Nav.css';

export interface NavItem {
  /** Display label */
  label: string;
  /** URL/path for the link */
  href: string;
}

/**
 * Structural type for a custom link component (e.g., Next.js `Link`,
 * Remix / React Router `<Link>`). Shared with `<Header>` so both stay in
 * sync on what a consumer may pass.
 */
export type NavLinkComponent = React.ComponentType<{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}>;

export type NavVariant = 'retro' | 'modern';

export interface NavProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active href (consumer passes current route) */
  activeHref?: string;
  /** Visual variant */
  variant?: NavVariant;
  /**
   * Custom link component (e.g., Next.js Link).
   * If not provided, uses regular anchor tags.
   */
  linkComponent?: NavLinkComponent;
  /** Additional CSS class name */
  className?: string;
}

const variantClasses: Record<NavVariant, string> = {
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
        {items.map((item) => (
          <li key={item.href} className="eidotter-nav__desktop-item">
            <LinkTag
              href={item.href}
              className={cn(
                'eidotter-nav__link',
                activeHref === item.href && 'eidotter-nav__link--active',
              )}
            >
              {item.label}
            </LinkTag>
          </li>
        ))}
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

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <div className={cn(
      'eidotter-nav eidotter-nav--mobile',
      variantClasses[variant],
      className,
    )}>
      <button
        onClick={toggle}
        className="eidotter-nav__hamburger"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="eidotter-nav__hamburger-icon" aria-hidden="true">
          {isOpen ? '\u2715' : '\u2630'}
        </span>
      </button>

      {isOpen && (
        <div
          className="eidotter-nav__overlay"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          'eidotter-nav__panel',
          isOpen && 'eidotter-nav__panel--open',
        )}
        aria-label="Mobile navigation"
      >
        <div className="eidotter-nav__panel-header">
          <button
            onClick={close}
            className="eidotter-nav__close"
            aria-label="Close menu"
          >
            {'\u2715'}
          </button>
        </div>

        <ul className="eidotter-nav__list">
          {items.map((item) => (
            <li key={item.href} className="eidotter-nav__item">
              <LinkTag
                href={item.href}
                className={cn(
                  'eidotter-nav__link',
                  activeHref === item.href && 'eidotter-nav__link--active',
                )}
                onClick={close}
              >
                {item.label}
              </LinkTag>
            </li>
          ))}
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
