import React from 'react';
import { cn } from '../../../utils/cn';
import './LegalPage.css';

export interface LegalPageProps {
  /** Heading shown in the hero (e.g., "Impressum", "Datenschutzerklärung") */
  title: string;
  /** "Stand: …" date stamp shown above the heading */
  date: string;
  /** Optional intro paragraph rendered inside the hero, below the heading */
  intro?: React.ReactNode;
  /** Optional back-link slot rendered above the article. Consumers pass a
   * router-aware element (e.g., react-router `<Link>`) or a plain `<a>`. */
  home?: React.ReactNode;
  /** Body content — `<h2>`, `<p>`, `<ul>`, `<address>` children styled by the wrapper. */
  children: React.ReactNode;
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
  children,
  className,
  ...props
}) => (
  <div className={cn('eidotter-legal-page', className)} {...props}>
    {home && <div className="eidotter-legal-page__home">{home}</div>}
    <article>
      <header className="eidotter-legal-page__hero">
        <p className="eidotter-legal-page__date">{date}</p>
        <h1>{title}</h1>
        {intro && <p className="eidotter-legal-page__intro">{intro}</p>}
      </header>
      <div className="eidotter-legal-page__body">{children}</div>
    </article>
  </div>
);
