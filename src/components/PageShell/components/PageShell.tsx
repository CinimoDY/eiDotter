import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import './PageShell.css';

export interface PageShellTocItem {
  /** In-page anchor (`#findings`) or any safe URL. Unsafe schemes render no anchor. */
  href: string;
  /** Chip text. */
  label: React.ReactNode;
}

export interface PageShellIntro {
  /** Small uppercase line above the title (context, version, date). */
  eyebrow?: React.ReactNode;
  /** The page title, rendered as the page's `<h1>` in the display face. */
  title: React.ReactNode;
  /** Lead paragraph under the title (max 68ch). */
  lead?: React.ReactNode;
  /** A wrapping row of facts (author, branch, captured at, …). */
  meta?: React.ReactNode;
  /** Table-of-contents chips. Rendered as a labelled `<nav>` of links. */
  toc?: PageShellTocItem[];
  /** Accessible name of the TOC `<nav>`. Default `"On this page"`. */
  tocLabel?: string;
}

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Top slot, inside the column so it shares the content's left edge.
   * Typically `<Header layout="stacked" rule={false} …/>`; a Header placed
   * here loses its own inline padding so its brand sits on the column edge.
   */
  header?: React.ReactNode;
  /** Structured page intro: eyebrow, `<h1>` title, lead, meta row, TOC chips. */
  intro?: PageShellIntro;
  /** Bottom slot, inside the column (e.g. `<Footer>`). */
  footer?: React.ReactNode;
  /** Column max-width, any CSS length. Default `1240px`. */
  maxWidth?: string;
  /**
   * Element that wraps `intro` and `children`. `'main'` (default) makes it the
   * page's main landmark; use `'div'` when the app layout already renders a
   * `<main>`.
   */
  contentAs?: 'main' | 'div';
  /** `id` for the content element, e.g. a Header `skipLinkTarget` (`#content`). */
  contentId?: string;
  /** Page sections (`PageSection`, Bench, …), stacked with a 40px gap. */
  children?: React.ReactNode;
  className?: string;
}

function PageIntro({ intro }: { intro: PageShellIntro }) {
  const { eyebrow, title, lead, meta, toc, tocLabel = 'On this page' } = intro;
  const has = (node: React.ReactNode) => node != null && node !== false && node !== '';
  return (
    <header className="eidotter-page-shell__intro">
      {has(eyebrow) && <div className="eidotter-page-shell__eyebrow">{eyebrow}</div>}
      <h1 className="eidotter-page-shell__title">{title}</h1>
      {has(lead) && <p className="eidotter-page-shell__lead">{lead}</p>}
      {has(meta) && <div className="eidotter-page-shell__meta">{meta}</div>}
      {toc && toc.length > 0 && (
        <nav className="eidotter-page-shell__toc" aria-label={tocLabel}>
          <ul className="eidotter-page-shell__toc-list">
            {toc.map((item, i) => (
              <li key={`${item.href}-${i}`}>
                {isSafeHref(item.href) ? (
                  <a className="eidotter-page-shell__toc-link" href={item.href}>{item.label}</a>
                ) : (
                  <span className="eidotter-page-shell__toc-link">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/**
 * PageShell: the "one block" page layout (0.43).
 *
 * One centred column (1240px by default) with a `max(16px, safe-area)` side
 * gutter and 24px / 64px block padding. Header, intro, sections and footer
 * all live inside the column, so everything shares one left edge, stacked
 * with a 40px gap. No dividers: the only lines on the page are the ones its
 * children draw (window frames, pane gaps).
 *
 * Server-safe and presentational. Ref forwards to the root `<div>`.
 */
export const PageShell = forwardRef<HTMLDivElement, PageShellProps>(({
  header,
  intro,
  footer,
  maxWidth,
  contentAs = 'main',
  contentId,
  children,
  className,
  style,
  ...rest
}, ref) => {
  const Content = contentAs;
  const width = maxWidth?.trim();
  const mergedStyle = width
    ? { ...style, '--eidotter-page-shell-max': width } as React.CSSProperties
    : style;

  return (
    <div ref={ref} className={cn('eidotter-page-shell', className)} style={mergedStyle} {...rest}>
      <div className="eidotter-page-shell__column">
        {header != null && header !== false && (
          <div className="eidotter-page-shell__header">{header}</div>
        )}
        <Content id={contentId} className="eidotter-page-shell__content">
          {intro && <PageIntro intro={intro} />}
          {children}
        </Content>
        {footer != null && footer !== false && (
          <div className="eidotter-page-shell__footer">{footer}</div>
        )}
      </div>
    </div>
  );
});

PageShell.displayName = 'PageShell';
