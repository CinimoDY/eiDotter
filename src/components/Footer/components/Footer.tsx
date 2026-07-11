import React from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import './Footer.css';

export interface FooterLink {
  /** Display text for the link */
  label: string;
  /** URL the link points to */
  href: string;
  /** Whether the link opens in a new tab */
  external?: boolean;
}

export interface FooterProps {
  /** Copyright text (e.g., "2026 Dominic Kennedy") */
  copyright?: string;
  /** Array of navigation/legal links */
  links?: FooterLink[];
  /**
   * Custom link component for internal navigation (e.g. react-router's
   * `<Link>`). Renders only non-external links (`external !== true`).
   * Accepts `href`, `className`, and `children` — matches the shape used
   * by `<Header>`, `<Nav>`, and `<Breadcrumb>`. When omitted, internal
   * links render as plain `<a href>` (full page reload).
   */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  /** Optional content between separator and links */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/** Default legal links for German compliance (DDG § 5 / GDPR) */
export const defaultLegalLinks: FooterLink[] = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
];

/**
 * DOS-themed footer with copyright and configurable legal/nav links.
 * Pure presentational — uses middle-dot separators for terminal aesthetic.
 */
export const Footer: React.FC<FooterProps & React.HTMLAttributes<HTMLElement>> = ({
  copyright,
  links,
  linkComponent,
  children,
  className,
  ...props
}) => {
  const resolvedLinks = links ?? defaultLegalLinks;
  const LinkTag = linkComponent ?? 'a';
  const linkClassName = 'eidotter-footer__link text-dos-text-brand no-underline';

  return (
    <footer
      className={cn(
        'font-dos text-sm py-4 px-2 text-center',
        'eidotter-footer',
        className,
      )}
      {...props}
    >
      <div className="h-px bg-dos-border-default mb-4" role="separator" />
      {children && <div className="mb-3">{children}</div>}
      {resolvedLinks.length > 0 && (
        <nav className="flex justify-center items-center flex-wrap gap-2 mb-2" aria-label="Footer links">
          {resolvedLinks.map((link, index) => {
            // Unsafe hrefs (javascript, data, vbscript, …) render the label without an anchor.
            const safeHref = isSafeHref(link.href) ? link.href : undefined;
            return (
              <React.Fragment key={link.href}>
                {index > 0 && <span className="text-dos-text-muted select-none eidotter-footer__dot" aria-hidden="true">·</span>}
                {!safeHref ? (
                  <span className={linkClassName}>{link.label}</span>
                ) : link.external ? (
                  <a
                    className={linkClassName}
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <LinkTag className={linkClassName} href={safeHref}>
                    {link.label}
                  </LinkTag>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}
      {copyright && (
        <p className="text-dos-text-muted m-0">&copy; {copyright}</p>
      )}
    </footer>
  );
};
