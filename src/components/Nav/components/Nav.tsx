import React, { useState } from 'react';
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
  /** Custom link component (e.g., Next.js Link) */
  LinkComponent?: React.ElementType;
  /** Additional CSS class name */
  className?: string;
}

export const DesktopNav: React.FC<NavProps> = ({
  items,
  activeHref,
  variant = 'retro',
  LinkComponent = 'a',
  className = '',
}) => {
  const Link = LinkComponent;

  return (
    <nav
      className={`nav nav--desktop nav--${variant} ${className}`.trim()}
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav__link ${activeHref === item.href ? 'nav__link--active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export const MobileNav: React.FC<NavProps> = ({
  items,
  activeHref,
  variant = 'retro',
  LinkComponent = 'a',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Link = LinkComponent;

  return (
    <div className={`nav nav--mobile nav--${variant} ${className}`.trim()}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav__hamburger"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="nav__hamburger-icon" aria-hidden="true">
          {isOpen ? '\u2715' : '\u2630'}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="nav__overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Panel */}
      <nav
        className={`nav__panel ${isOpen ? 'nav__panel--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="nav__panel-header">
          <button
            onClick={() => setIsOpen(false)}
            className="nav__close"
            aria-label="Close menu"
          >
            {'\u2715'}
          </button>
        </div>

        <ul className="nav__list">
          {items.map((item) => (
            <li key={item.href} className="nav__item">
              <Link
                href={item.href}
                className={`nav__link ${activeHref === item.href ? 'nav__link--active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
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
