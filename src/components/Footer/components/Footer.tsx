import React from 'react';
import { cn } from '../../../utils/cn';
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
  children,
  className,
  ...props
}) => {
  const resolvedLinks = links ?? defaultLegalLinks;

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
          {resolvedLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && <span className="text-cga-brown select-none eidotter-footer__dot" aria-hidden="true">·</span>}
              <a
                className="eidotter-footer__link text-cga-amber no-underline"
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </nav>
      )}
      {copyright && (
        <p className="text-cga-brown m-0">&copy; {copyright}</p>
      )}
    </footer>
  );
};
