import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import { DesktopNav, MobileNav } from '../../Nav';
import type { NavItem, NavProps } from '../../Nav';
import { HeaderContextRow } from './HeaderContextRow';
import './Header.css';

export interface HeaderCategory {
  /** Stable identifier — emitted as `data-category-key` for DOM measurement (DMNC-1325 arm connectors). */
  key: string;
  label: string;
  /** Icon name; rendered via `<Icon>` only when it matches a known IconName, otherwise label-only. */
  icon: string;
  href: string;
}

export interface HeaderReturnTo {
  label: string;
  href: string;
  /**
   * true → navigate via `window.open(href, 'rizomorf-shell')` to reuse a named
   * tab (cross-site shell). Default: same-tab via linkComponent/anchor.
   */
  reuseTab?: boolean;
}

export interface HeaderContext {
  categories: HeaderCategory[];
  returnTo?: HeaderReturnTo;
}

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
  /**
   * Optional cross-site context row rendered below the brand+nav row: a
   * measurable category badge row + an optional "← back" pill. When present and
   * non-empty, the header lays out as two stacked rows and emits the stable
   * measurement classes `.eidotter-header__context` / `.eidotter-header__categories`
   * / `.eidotter-header__category` + `li[data-category-key]` (the Mark
   * arm-connector contract, DMNC-1325). When absent or empty, the rendered DOM
   * is identical to a header without this prop.
   */
  context?: HeaderContext;
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
  context,
  children,
  className,
  ...rest
}, ref) => {
  const LinkTag = (linkComponent as React.ElementType | undefined) ?? 'a';
  // The brand link is structural — an unsafe brandHref falls back to '/' rather
  // than unmounting the branding anchor.
  const safeBrandHref = isSafeHref(brandHref) ? brandHref : '/';

  // An empty context (no categories, no returnTo) is treated as absent so the
  // rendered DOM stays byte-identical to a header without the prop.
  const hasContext = !!context && (context.categories.length > 0 || !!context.returnTo);

  const main = (
    <>
      <LinkTag
        href={safeBrandHref}
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
    </>
  );

  return (
    <header
      ref={ref}
      className={cn(
        hasContext
          ? 'flex flex-col gap-2 px-4 py-3 font-dos'
          : 'flex items-center justify-between px-4 py-3 font-dos',
        'eidotter-header',
        variantClasses[variant],
        sticky && 'sticky top-0 z-50 bg-dos-bg-primary',
        className,
      )}
      {...rest}
    >
      {hasContext ? (
        <>
          <div className="eidotter-header__main flex w-full items-center justify-between">
            {main}
          </div>
          <HeaderContextRow
            context={context!}
            linkComponent={linkComponent}
            activeHref={activeHref}
          />
        </>
      ) : (
        main
      )}
    </header>
  );
});

Header.displayName = 'Header';
