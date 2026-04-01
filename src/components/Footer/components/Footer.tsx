import React from 'react';
import '../../Separator/components/Separator.css';
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
 * Uses middle-dot separators between links for authentic terminal aesthetic.
 *
 * When no `links` are provided, renders default legal links (Impressum + Datenschutz)
 * for German compliance. Pass an empty array to explicitly show no links.
 */
export const Footer: React.FC<FooterProps & React.HTMLAttributes<HTMLElement>> = ({
  copyright,
  links,
  children,
  className = '',
  ...props
}) => {
  const resolvedLinks = links ?? defaultLegalLinks;
  const classes = ['footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <div className="footer__separator" role="separator" />
      {children && <div className="footer__content">{children}</div>}
      {resolvedLinks.length > 0 && (
        <nav className="footer__links" aria-label="Footer links">
          {resolvedLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && <span className="footer__dot" aria-hidden="true">·</span>}
              <a
                className="footer__link"
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
        <p className="footer__copyright">&copy; {copyright}</p>
      )}
    </footer>
  );
};
