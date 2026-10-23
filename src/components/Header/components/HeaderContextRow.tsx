'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import { Badge } from '../../Badge';
import { Icon, isIconName } from '../../Icon';
import type { NavProps } from '../../Nav';
import type { HeaderContext } from './Header';

export interface HeaderContextRowProps {
  /** Category badge row + optional returnTo pill (DMNC-1326). */
  context: HeaderContext;
  /** Same custom link component threaded from Header for framework routing. */
  linkComponent?: NavProps['linkComponent'];
  /**
   * Currently active href — the category whose href matches gets
   * aria-current="page" + the underline active class (WCAG 1.4.1 non-color
   * state, mirroring Nav). This is the non-SVG active state the future
   * tentacle mode keys off (PLAN-tentacle-menu).
   */
  activeHref?: string;
}

const returnPillClasses = cn(
  'eidotter-header__return',
  'inline-flex items-center gap-1 no-underline',
  'border border-dos-border-default rounded-dos-base',
  'px-2 py-0.5 text-dos-text-xs uppercase tracking-wider',
);

/**
 * The measurable second row of the Header (DMNC-1326).
 *
 * Emits the stable measurement/transform contract the Mark arm-connector
 * (DMNC-1325) and the future tentacle overlay (PLAN-tentacle-menu) anchor off:
 * `.eidotter-header__context` / `.eidotter-header__categories` /
 * `.eidotter-header__category` + `li[data-category-key]`. Do not rename them.
 *
 * Internal only — never exported from a barrel. Carries `'use client'` because
 * the reuseTab pill attaches an onClick handler (moves the RSC boundary here,
 * keeping Header.tsx server-safe).
 *
 * Nav-link boundary safety (per #470's shared policy): category + returnTo
 * hrefs pass through `isSafeHref` and fall back to a non-anchor span when an
 * unsafe scheme (javascript:, data:, …) is supplied — same guard as Nav/Footer.
 */
export function HeaderContextRow({ context, linkComponent, activeHref }: HeaderContextRowProps) {
  // Cast to ElementType so href/aria-current/className all type-check whether
  // LinkTag resolves to a custom component or the intrinsic anchor.
  const LinkTag = (linkComponent as React.ElementType | undefined) ?? 'a';
  const { categories, returnTo } = context;

  const safeReturnHref =
    returnTo && isSafeHref(returnTo.href) ? returnTo.href : undefined;

  const handleReuseTabClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.defaultPrevented) return;
    // Preserve native Cmd/Ctrl/Shift/Alt/middle-click "open in new tab".
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const win = window.open(href, 'rizomorf-shell');
    if (win) {
      // Only cancel same-tab navigation when the named tab actually opened;
      // a popup blocker returns null → fall back to normal same-tab nav.
      event.preventDefault();
      // Best-effort focus. Same-origin only — browsers ignore cross-origin focus.
      win.focus();
    }
  };

  const returnLabel = returnTo && (
    <>
      <span aria-hidden="true">←</span>
      <span>{returnTo.label}</span>
    </>
  );

  return (
    <div className={cn('eidotter-header__context', 'flex w-full flex-wrap items-center gap-x-4 gap-y-2')}>
      {returnTo && (
        safeReturnHref === undefined ? (
          // Unsafe href → render the label without an anchor (Nav's fallback).
          <span className={returnPillClasses}>{returnLabel}</span>
        ) : returnTo.reuseTab ? (
          // reuseTab bypasses linkComponent — a router link would intercept the
          // click and window.open would never fire.
          <a
            href={safeReturnHref}
            onClick={(e) => handleReuseTabClick(e, safeReturnHref)}
            className={returnPillClasses}
          >
            {returnLabel}
          </a>
        ) : (
          <LinkTag href={safeReturnHref} className={returnPillClasses}>
            {returnLabel}
          </LinkTag>
        )
      )}

      {categories.length > 0 && (
        <nav aria-label="Categories" className="eidotter-header__categories-nav">
          <ul className={cn('eidotter-header__categories', 'm-0 flex list-none flex-wrap items-center gap-2 p-0')}>
            {categories.map((category) => {
              const safeHref = isSafeHref(category.href) ? category.href : undefined;
              const isActive = activeHref !== undefined && category.href === activeHref;
              const linkClass = cn(
                'eidotter-header__category inline-flex no-underline',
                isActive && 'eidotter-header__category--active',
              );
              const badge = (
                <Badge size="sm" variant="default">
                  {isIconName(category.icon) && (
                    <span aria-hidden="true" className="me-1 inline-flex">
                      <Icon name={category.icon} size="S" className="eidotter-header__category-icon" />
                    </span>
                  )}
                  {category.label}
                </Badge>
              );
              return (
                <li key={category.key} data-category-key={category.key} className="eidotter-header__category-item">
                  {safeHref !== undefined ? (
                    <LinkTag
                      href={safeHref}
                      className={linkClass}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {badge}
                    </LinkTag>
                  ) : (
                    <span className={linkClass}>{badge}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
