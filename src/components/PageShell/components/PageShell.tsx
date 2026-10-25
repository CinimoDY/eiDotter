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
  /** Lead paragraph under the title (within the 80-column measure). */
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
  /**
   * Cap for the column, any CSS length. Default `1200px`. Text keeps the
   * 80-column measure (45rem) inside it; wide blocks may use the full cap.
   */
  maxWidth?: string;
  /**
   * Element that wraps `intro` and `children`. `'main'` (default) makes it the
   * page's main landmark; use `'div'` when the app layout already renders a
   * `<main>`.
   */
  contentAs?: 'main' | 'div';
  /**
   * `id` for the content element, e.g. a Header `skipLinkTarget` (`#content`).
   * Also sets `tabIndex={-1}`, so following the skip link moves focus there.
   */
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
 * One column, flush left (0.46): it starts at a `max(16px, safe-area)`
 * gutter and runs to a 1200px cap, with 24px / 64px block padding; the right
 * side stays empty, like a DOS screen. Text keeps an 80-column measure
 * (45rem); wide blocks (Bench, tables, galleries) may use the full cap.
 * Header, intro, sections and footer all share the one left edge, stacked
 * with a 40px gap. Same layout in every theme: themes restyle, never
 * re-lay out. No dividers: the only lines on the page are the ones its
 * children draw (window frames, pane gaps).
 *
 * Paints no background and sets no font: the page's own ground (a CRT tint,
 * RetroEffects) and body font show through. Pass a `className` to paint
 * an opaque ground.
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
        <Content
          id={contentId}
          tabIndex={contentId ? -1 : undefined}
          className="eidotter-page-shell__content"
        >
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
