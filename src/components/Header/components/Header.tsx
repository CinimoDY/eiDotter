'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { DesktopNav, MobileNav } from '../../Nav';
import type { NavItem, NavProps } from '../../Nav';
import './Header.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Site brand name displayed in the header */
  brandName?: string;
  /** Href for the brand link (default: "/") */
  brandHref?: string;
  /** Navigation items passed through to Nav */
  items: NavItem[];
  /** Currently active href (highlights matching nav link) */
  activeHref?: string;
  /** Visual variant applied to both header and nav */
  variant?: 'retro' | 'modern';
  /** Whether the header sticks to viewport top */
  sticky?: boolean;
  /** Custom link component for framework routing (Next.js Link, React Router Link, etc.) */
  linkComponent?: NavProps['linkComponent'];
  /** Custom branding content — replaces brandName when provided */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

const variantClasses: Record<NonNullable<HeaderProps['variant']>, string> = {
  retro: 'eidotter-header--retro',
  modern: 'eidotter-header--modern',
};

export const Header = forwardRef<HTMLElement, HeaderProps>(({
  brandName,
  brandHref = '/',
  items,
  activeHref,
  variant = 'retro',
  sticky = true,
  linkComponent,
  children,
  className,
  ...rest
}, ref) => {
  const LinkTag = (linkComponent as React.ElementType | undefined) ?? 'a';

  return (
    <header
      ref={ref}
      className={cn(
        'flex items-center justify-between px-4 py-3 font-dos',
        'eidotter-header',
        variantClasses[variant],
        sticky && 'sticky top-0 z-50 bg-dos-bg-primary',
        className,
      )}
      {...rest}
    >
      <LinkTag
        href={brandHref}
        className={cn(
          'no-underline text-base font-bold tracking-wide',
          'eidotter-header__branding',
        )}
      >
        {children || brandName}
      </LinkTag>

      <DesktopNav
        items={items}
        activeHref={activeHref}
        variant={variant}
        linkComponent={linkComponent}
      />
      <MobileNav
        items={items}
        activeHref={activeHref}
        variant={variant}
        linkComponent={linkComponent}
      />
    </header>
  );
});

Header.displayName = 'Header';
