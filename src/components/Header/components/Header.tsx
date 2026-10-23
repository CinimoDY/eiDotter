import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import { DesktopNav, MobileNav } from '../../Nav';
import { Logo, Mark } from '../../Brand';
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
  /**
   * How `brandName` is presented when no `children` are passed:
   * - `'lockup'` (default): the eiDotter Logo (28px, glow) + the name in
   *   uppercase, wide-tracked DOS text.
   * - `'mark'`: the morphing `Mark` (28px) + the same name text.
   * - `'text'`: the name as plain text (the pre-0.41 behaviour).
   * The icon is decorative (the name is the link's accessible name). Ignored
   * when `children` is provided, or when `brandName` is empty.
   */
  brand?: 'text' | 'lockup' | 'mark';
  /**
   * Trailing slot (theme toggle, ⌘K hint, …). Rendered once: after the desktop
   * nav on wide screens, and between the brand and the MENU trigger on mobile
   * (the desktop nav is hidden below 768px, the MENU trigger above it, so DOM
   * order gives both placements without duplicating the node). Keep end
   * content compact on mobile; it clips before the brand name does.
   * The slot is `overflow: hidden` at every width, so dropdowns, menus and
   * tooltips opened from `end` must render in a portal (React Aria popovers,
   * e.g. `Select`, already do); an in-flow popover is clipped.
   */
  end?: React.ReactNode;
  /**
   * When set (e.g. `'#main'`), renders a "SKIP TO CONTENT" anchor as the
   * header's first child, visually hidden until keyboard-focused (WCAG 2.4.1).
   * Off by default — sites with their own skip link leave it unset. Unsafe
   * schemes render no anchor.
   */
  skipLinkTarget?: string;
  /** Custom branding content — replaces brandName (and `brand`) when provided */
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
  brand = 'lockup',
  end,
  skipLinkTarget,
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

  const safeSkipTarget = skipLinkTarget && isSafeHref(skipLinkTarget) ? skipLinkTarget : undefined;

  // children always win; the icon variants only apply to a non-empty brandName.
  const iconBrand = !children && !!brandName && brand !== 'text';
  const brandContent = children || (iconBrand ? (
    <>
      {brand === 'mark'
        ? <Mark size={28} label="" className="eidotter-header__brand-icon" />
        : <Logo size={28} glow title="" className="eidotter-header__brand-icon" />}
      <span className="eidotter-header__brand-name uppercase tracking-[0.3em]">{brandName}</span>
    </>
  ) : brandName);

  // `end` is rendered once: DesktopNav is hidden <768px and the MENU trigger
  // ≥768px, so this DOM order gives "nav · end" on desktop and "end · MENU" on
  // mobile. The right-hand group wrapper only exists when `end` is passed, so
  // headers without it keep their previous DOM.
  const hasEnd = end != null && end !== false && end !== '';
  const ActionsGroup = hasEnd ? 'div' : React.Fragment;
  const actionsProps = hasEnd ? { className: 'eidotter-header__actions flex items-center gap-4' } : {};

  const main = (
    <>
      <LinkTag
        href={safeBrandHref}
        className={cn(
          'no-underline text-dos-text-base font-bold tracking-wide',
          'eidotter-header__branding',
          iconBrand && 'eidotter-header__branding--icon inline-flex items-center gap-3',
        )}
      >
        {brandContent}
      </LinkTag>

      <ActionsGroup {...actionsProps}>
        <DesktopNav
          items={items}
          activeHref={activeHref}
          variant={variant}
          linkComponent={linkComponent}
        />
        {hasEnd && <div className="eidotter-header__end flex items-center">{end}</div>}
        <MobileNav
          items={items}
          activeHref={activeHref}
          variant={variant}
          linkComponent={linkComponent}
        />
      </ActionsGroup>
    </>
  );

  const skipLink = safeSkipTarget ? (
    <a href={safeSkipTarget} className="eidotter-header__skip">
      Skip to content
    </a>
  ) : null;

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
      {skipLink}
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
