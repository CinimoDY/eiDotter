import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import './InlineLink.css';

export interface InlineLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Link text. */
  children: React.ReactNode;
  /** Target URL. */
  href: string;
  /**
   * Render the trailing glyph (`▸` for internal, `↗` for `external`).
   * Defaults to `true`. When `false`, no glyph renders regardless of the
   * `external` prop.
   */
  showGlyph?: boolean;
  /**
   * External link — adds `target="_blank"` and `rel="noopener noreferrer"`
   * (safe tabnabbing defaults) and, when `showGlyph` is `true`, swaps the
   * trailing glyph to `↗`. `showGlyph={false}` still suppresses the glyph.
   */
  external?: boolean;
  /** Extra class names merged onto the root anchor. */
  className?: string;
}

/**
 * In-flow navigational anchor. Distinct from `<InlineExpand>` — this is a
 * destination, not a disclosure.
 *
 * Rest: dotted amber underline, trailing `▸`.
 * Hover: phosphor inversion — amber background, dark foreground.
 * Visited: dimmed amber (`--color-cga-amber-dim` → brown fallback).
 * External: opens in a new tab safely, trailing glyph becomes `↗`.
 *
 * Consumer-passed `target="_blank"` is treated as implicit-external for
 * `rel` safety — a `rel` is auto-applied if none is provided, preventing
 * tabnabbing even when the caller doesn't explicitly set `external`.
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
  // Apply safe rel when the link opens in a new tab for ANY reason —
  // explicit `external` or consumer-supplied `target="_blank"`. Consumer
  // can still override by passing `rel` explicitly.
  const opensInNewTab = resolvedTarget === '_blank';
  const resolvedRel = rel ?? (opensInNewTab ? 'noopener noreferrer' : undefined);
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
