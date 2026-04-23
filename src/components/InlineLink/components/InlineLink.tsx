import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './InlineLink.css';

export interface InlineLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Link text. */
  children: React.ReactNode;
  /** Target URL. */
  href: string;
  /** Render the trailing `▸` glyph. Defaults to true. */
  showGlyph?: boolean;
  /**
   * External link — adds `target="_blank" rel="noopener noreferrer"` and
   * swaps the trailing glyph to `↗`. Overrides `showGlyph=false`
   * only for the `rel`/`target` behavior, not the glyph swap.
   */
  external?: boolean;
  /** Extra class names merged onto the root anchor. */
  className?: string;
}

/**
 * In-flow navigational anchor. Distinct from `InlineExpand` — this is a
 * destination, not a disclosure.
 *
 * Rest: dotted amber underline, trailing `▸`.
 * Hover: phosphor inversion — amber background, dark foreground.
 * Visited: dimmed amber (`--dos-link-visited`).
 * External: opens in a new tab safely, trailing glyph becomes `↗`.
 */
export const InlineLink = forwardRef<HTMLAnchorElement, InlineLinkProps>(({
  children,
  href,
  showGlyph = true,
  external = false,
  className,
  target,
  rel,
  ...props
}, ref) => {
  const resolvedTarget = target ?? (external ? '_blank' : undefined);
  const resolvedRel = rel ?? (external ? 'noopener noreferrer' : undefined);
  const glyph = external ? '↗' /* ↗ */ : '▸' /* ▸ */;

  return (
    <a
      ref={ref}
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn('eidotter-ilink', external && 'eidotter-ilink--external', className)}
      {...props}
    >
      <span className="eidotter-ilink__label">{children}</span>
      {showGlyph && (
        <span className="eidotter-ilink__glyph" aria-hidden="true">{glyph}</span>
      )}
    </a>
  );
});

InlineLink.displayName = 'InlineLink';
