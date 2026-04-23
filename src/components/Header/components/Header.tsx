import React, { forwardRef } from 'react';
import { Nav, type NavItem } from '../../Nav/components/Nav';
import { cn } from '../../../utils/cn';
import './Header.css';

export interface HeaderProps {
  /** Brand/logo display text. Usually the product name. */
  brandName: string;
  /** URL the brand mark links to. Defaults to `/`. */
  brandHref?: string;
  /** Leading brand glyph. Defaults to the eidotter lozenge `❖`. */
  brandIcon?: React.ReactNode;
  /** Navigation items rendered via the existing Nav component. */
  items?: NavItem[];
  /** Currently active href (passed to Nav) */
  activeHref?: string;
  /**
   * Right-side user slot. Accepts a string (rendered as `USER: XX` +
   * live clock) or a custom ReactNode.
   */
  user?: string | React.ReactNode;
  /** Sticky to the top of the viewport. Defaults to true. */
  sticky?: boolean;
  /** Visual variant. `retro` adds phosphor glow; `modern` is flat. */
  variant?: 'retro' | 'modern';
  /**
   * Custom link component (e.g., Next.js Link). Applied to the brand
   * link and passed through to the inner Nav.
   */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }>;
  /**
   * Children override the right-side user slot entirely. Use to add
   * arbitrary actions (Button, menu, icon group) instead of the default
   * user string.
   */
  children?: React.ReactNode;
  /** Additional class names merged onto the root `<header>`. */
  className?: string;
}

const variantClasses: Record<string, string> = {
  retro: 'eidotter-header--retro',
  modern: 'eidotter-header--modern',
};

const UserClock: React.FC<{ label: string }> = ({ label }) => {
  const [now, setNow] = React.useState<string>(() =>
    new Date().toLocaleTimeString('en-GB').slice(0, 5),
  );
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date().toLocaleTimeString('en-GB').slice(0, 5));
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="eidotter-header__user">
      <span>USER: {label}</span>
      <span className="eidotter-header__user-sep" aria-hidden="true">│</span>
      <time dateTime={now}>{now}</time>
    </span>
  );
};

/**
 * DOS-styled composite site header.
 *
 * Composes a brand link, the eidotter `Nav` component, and a right-side
 * slot (user + clock by default, overridable via `children`).
 *
 * The `retro` variant adds a phosphor border-bottom glow and text-shadow
 * on the brand; `modern` ships the same layout without glow effects.
 *
 * Sticky by default. Use `sticky={false}` for in-page headers.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(({
  brandName,
  brandHref = '/',
  brandIcon = '❖',
  items = [],
  activeHref,
  user,
  sticky = true,
  variant = 'retro',
  linkComponent,
  children,
  className,
}, ref) => {
  const LinkTag = linkComponent || 'a';

  return (
    <header
      ref={ref}
      className={cn(
        'eidotter-header',
        variantClasses[variant] || variantClasses.retro,
        sticky && 'eidotter-header--sticky',
        className,
      )}
    >
      <LinkTag href={brandHref} className="eidotter-header__brand" aria-label={brandName}>
        <span className="eidotter-header__brand-icon" aria-hidden="true">{brandIcon}</span>
        <span className="eidotter-header__brand-name">{brandName}</span>
      </LinkTag>

      {items.length > 0 && (
        <div className="eidotter-header__nav">
          <Nav
            items={items}
            activeHref={activeHref}
            variant={variant}
            linkComponent={linkComponent}
          />
        </div>
      )}

      <div className="eidotter-header__end">
        {children !== undefined
          ? children
          : typeof user === 'string'
            ? <UserClock label={user} />
            : user}
      </div>
    </header>
  );
});

Header.displayName = 'Header';
