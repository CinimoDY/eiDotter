'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '../../../utils/cn';
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

const variantClasses: Record<NonNullable<NavProps['variant']>, string> = {
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <div className={cn(
      'eidotter-nav eidotter-nav--mobile',
      variantClasses[variant],
      className,
    )}>
      <button
        onClick={toggle}
        className="eidotter-nav__menu-trigger"
        aria-label="Toggle navigation"
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
        id="eidotter-mobile-nav-panel"
        className={cn(
          'eidotter-nav__panel',
          isOpen && 'eidotter-nav__panel--open',
        )}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
      >
        <div className="eidotter-nav__panel-header">
          <button
            onClick={close}
            className="eidotter-nav__close"
            aria-label="Close navigation panel"
          >
            <Icon name="Close" size="S" />
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
