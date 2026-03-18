'use client';

import React, { useState, useCallback } from 'react';
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

export const DesktopNav: React.FC<NavProps> = ({
  items,
  activeHref,
  variant = 'retro',
  linkComponent,
  className = '',
}) => {
  const LinkTag = linkComponent || 'a';
  const classes = ['nav', 'nav--desktop', `nav--${variant}`, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Main navigation">
      <ul className="nav__desktop-list">
        {items.map((item) => (
          <li key={item.href} className="nav__desktop-item">
            <LinkTag
              href={item.href}
              className={['nav__link', activeHref === item.href && 'nav__link--active'].filter(Boolean).join(' ')}
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
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const LinkTag = linkComponent || 'a';

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  const classes = ['nav', 'nav--mobile', `nav--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <button
        onClick={toggle}
        className="nav__hamburger"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="nav__hamburger-icon" aria-hidden="true">
          {isOpen ? '\u2715' : '\u2630'}
        </span>
      </button>

      {isOpen && (
        <div
          className="nav__overlay"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        className={['nav__panel', isOpen && 'nav__panel--open'].filter(Boolean).join(' ')}
        aria-label="Mobile navigation"
      >
        <div className="nav__panel-header">
          <button
            onClick={close}
            className="nav__close"
            aria-label="Close menu"
          >
            {'\u2715'}
          </button>
        </div>

        <ul className="nav__list">
          {items.map((item) => (
            <li key={item.href} className="nav__item">
              <LinkTag
                href={item.href}
                className={['nav__link', activeHref === item.href && 'nav__link--active'].filter(Boolean).join(' ')}
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
