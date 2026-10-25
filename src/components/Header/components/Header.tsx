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
  /** Navigation items passed through to Nav. An empty array renders no nav and no MENU trigger. */
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
   * Narrow-header brand presentation for the icon brands (`brand` 'lockup' or
   * 'mark'); ignored for `'text'`, `children` or an empty `brandName`.
   * - `'none'` (default): the name always shows, wrapping onto more lines when
   *   it does not fit.
   * - `'mark'`: below 480px of header width (a container query on the header)
   *   only the icon shows. The name stays in the DOM, visually hidden, so it
   *   remains the brand link's accessible name.
   */
  brandCollapse?: 'none' | 'mark';
  /**
   * Row arrangement:
   * - `'inline'` (default): brand left, nav (+ `end`) right, one row.
   * - `'stacked'`: brand row on top with `end` and the mobile MENU trigger on
   *   its right; the desktop nav on its own row below, left-aligned on the
   *   brand's edge. Below 768px the nav row is absent (MENU takes over), as
   *   in the inline layout.
   */
  layout?: 'inline' | 'stacked';
  /**
   * Bottom rule. `false` removes the 1px bottom border and the retro glow
   * under it (for pages where the header sits in one block with the content).
   * Default `true`.
   */
  rule?: boolean;
  /**
   * Centre the header's content in a max-width column so the brand's left edge
   * lines up with a page column of the same width (e.g. `PageShell`). `true`
   * uses 1240px (PageShell's default); a string is any CSS length
   * (`'72rem'`, `'960px'`). The header itself (background, sticky) still spans
   * the full width, and its inline padding follows the same
   * `max(16px, safe-area inset)` gutter as PageShell. Default off.
   */
  contained?: boolean | string;
  /**
   * Trailing slot (theme toggle, ⌘K hint, …). Rendered once: after the desktop
   * nav on wide screens, and between the brand and the MENU trigger on mobile
   * (the desktop nav is hidden below 768px, the MENU trigger above it, so DOM
   * order gives both placements without duplicating the node). With
   * `layout="stacked"` it sits on the brand row at every width. Keep end
   * content compact on mobile: when the row is short of room the brand wraps
   * first, then the end slot clips.
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
  brandCollapse = 'none',
  layout = 'inline',
  rule = true,
  contained = false,
  end,
  skipLinkTarget,
  children,
  className,
  style,
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
  // Mark-only collapse needs an icon to collapse to.
  const collapseToMark = iconBrand && brandCollapse === 'mark';
  const stacked = layout === 'stacked';
  // contained: true → CSS default width; a non-blank string → that CSS length.
  const containedWidth = typeof contained === 'string' ? contained.trim() : '';
  const isContained = contained === true || containedWidth !== '';

  // Name before icon in the DOM: the link lays them out row-reverse (icon on
  // the left) and wraps, so on a row too narrow for both it is the icon that
  // moves to the clipped second line and the name stays (CSS, 0.45).
  const brandContent = children || (iconBrand ? (
    <>
      <span className="eidotter-header__brand-name uppercase tracking-[0.3em]">{brandName}</span>
      {brand === 'mark'
        ? <Mark size={28} label="" className="eidotter-header__brand-icon" />
        : <Logo size={28} glow title="" className="eidotter-header__brand-icon" />}
    </>
  ) : brandName);

  // `end` is rendered once: DesktopNav is hidden <768px and the MENU trigger
  // ≥768px, so this DOM order gives "nav · end" on desktop and "end · MENU" on
  // mobile. The right-hand group wrapper only exists when `end` is passed, so
  // headers without it keep their previous DOM.
  const hasEnd = end != null && end !== false && end !== '';
  // No items → no nav at all: no empty <nav> landmark on desktop and no MENU
  // trigger opening an empty panel on mobile (DMNC-1611).
  const hasItems = Array.isArray(items) && items.length > 0;
  const ActionsGroup = hasEnd ? 'div' : React.Fragment;
  const actionsProps = hasEnd ? { className: 'eidotter-header__actions flex items-center gap-4' } : {};

  const desktopNav = hasItems ? (
    <DesktopNav
      items={items}
      activeHref={activeHref}
      variant={variant}
      linkComponent={linkComponent}
      className={stacked ? 'eidotter-header__nav-row' : undefined}
    />
  ) : null;

  const main = (
    <>
      <LinkTag
        href={safeBrandHref}
        className={cn(
          'no-underline text-dos-text-base font-bold tracking-wide',
          'eidotter-header__branding',
          iconBrand && 'eidotter-header__branding--icon inline-flex items-start gap-3',
        )}
      >
        {brandContent}
      </LinkTag>

      <ActionsGroup {...actionsProps}>
        {/* Stacked: the desktop nav moves to its own row below the brand row. */}
        {!stacked && desktopNav}
        {hasEnd && <div className="eidotter-header__end flex items-center">{end}</div>}
        {hasItems && (
          <MobileNav
            items={items}
            activeHref={activeHref}
            variant={variant}
            linkComponent={linkComponent}
          />
        )}
      </ActionsGroup>
    </>
  );

  const skipLink = safeSkipTarget ? (
    <a href={safeSkipTarget} className="eidotter-header__skip">
      Skip to content
    </a>
  ) : null;

  // Column layout whenever there is more than one row (context row, stacked nav
  // row). The single-row inline header keeps its pre-0.42 DOM: no wrappers.
  const columnLayout = hasContext || stacked;
  const layoutClasses = columnLayout
    ? 'flex flex-col gap-2'
    : 'flex items-center justify-between';

  const rows = columnLayout ? (
    <>
      <div className="eidotter-header__main flex w-full items-center justify-between">
        {main}
      </div>
      {stacked && desktopNav}
      {hasContext && (
        <HeaderContextRow
          context={context!}
          linkComponent={linkComponent}
          activeHref={activeHref}
        />
      )}
    </>
  ) : (
    main
  );

  const mergedStyle = containedWidth
    ? { ...style, '--eidotter-header-max': containedWidth } as React.CSSProperties
    : style;

  return (
    <header
      ref={ref}
      className={cn(
        // contained: the header is only the full-width band (padding, bg,
        // sticky); the layout moves to the centred inner column.
        isContained ? 'px-4 py-3 font-dos' : cn(layoutClasses, 'px-4 py-3 font-dos'),
        'eidotter-header',
        variantClasses[variant],
        stacked && 'eidotter-header--stacked',
        isContained && 'eidotter-header--contained',
        !rule && 'eidotter-header--no-rule',
        collapseToMark && 'eidotter-header--collapse-mark',
        sticky && 'sticky top-0 z-50 bg-dos-bg-primary',
        className,
      )}
      style={mergedStyle}
      {...rest}
    >
      {skipLink}
      {isContained ? (
        <div className={cn('eidotter-header__inner w-full', layoutClasses)}>{rows}</div>
      ) : (
        rows
      )}
    </header>
  );
});

Header.displayName = 'Header';
