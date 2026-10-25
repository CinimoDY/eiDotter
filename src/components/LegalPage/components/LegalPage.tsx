import React from 'react';
import { cn } from '../../../utils/cn';
import './LegalPage.css';

export interface LegalPageProps {
  /** Heading shown in the hero (e.g., "Impressum", "Datenschutzerklärung") */
  title: string;
  /** "Stand: …" date stamp shown above the heading */
  date: string;
  /** Optional intro paragraph rendered inside the hero, below the heading.
   * Wrapped in a `<div>` (not `<p>`) so consumers can pass block-level
   * children like fragments or multiple paragraphs without invalid HTML. */
  intro?: React.ReactNode;
  /** Optional back-link slot rendered above the article. Should be a single
   * `<a>` or `<button>` element so the styling selectors can reach it —
   * react-router `<Link>` and react-router `<NavLink>` (without a function
   * child) both render a single `<a>`. Wrapping the link in extra elements
   * will leave it unstyled. */
  home?: React.ReactNode;
  /** Body content — `<h2>`, `<p>`, `<ul>`, `<address>` children styled by the wrapper. */
  children: React.ReactNode;
  /**
   * Render inside the site's own page column (e.g. `PageShell`) instead of
   * as a standalone page: no own 720px column, centring, padding, background
   * or font, and a start-aligned hero without the rule under it. The type
   * scale and body styles stay. Default `false`.
   */
  embedded?: boolean;
  /** Extra class on the outer wrapper */
  className?: string;
}

/**
 * Layout primitive for Impressum / Datenschutz / other compact legal pages.
 *
 * Wraps the `.legal-hero` + `.legal-body` chrome that previously lived
 * duplicated across portfolio surfaces. Consumers compose freeform
 * `<h2>`/`<p>`/`<ul>` body content (or pre-built clauses from this module)
 * and the wrapper handles spacing, type scale, and the `>` list bullet.
 */
export const LegalPage: React.FC<LegalPageProps & React.HTMLAttributes<HTMLDivElement>> = ({
  title,
  date,
  intro,
  home,
  embedded = false,
  children,
  className,
  ...props
}) => (
  <div className={cn('eidotter-legal-page', embedded && 'eidotter-legal-page--embedded', className)} {...props}>
    {home && <div className="eidotter-legal-page__home">{home}</div>}
    <article>
      <header className="eidotter-legal-page__hero">
        <p className="eidotter-legal-page__date">{date}</p>
        <h1>{title}</h1>
        {intro && <div className="eidotter-legal-page__intro">{intro}</div>}
      </header>
      <div className="eidotter-legal-page__body">{children}</div>
    </article>
  </div>
);
