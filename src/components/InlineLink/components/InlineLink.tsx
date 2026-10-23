import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { isSafeHref } from '../../../utils/isSafeHref';
import './InlineLink.css';

// Relative paths, hash/query fragments, and standard nav schemes are allowed.
// Everything else (javascript:, data:, vbscript:, unknown schemes) collapses
// to a safe "#" sentinel. Delegates to the shared isSafeHref util with
// InlineLink's wider allowlist (tel/ftp/sms); behavior is unchanged — the empty
// passthrough and "#" fallback are InlineLink-specific and preserved here.
function sanitizeHref(href: string): string {
  const trimmed = href.trim();
  if (trimmed === '') return trimmed;
  return isSafeHref(trimmed, { extraSchemes: ['tel', 'ftp', 'sms'] }) ? trimmed : '#';
}

// Union-merge caller rel tokens with the required safety tokens so
// consumer-supplied `rel="external"` still gets `noopener noreferrer` when the
// link opens in a new tab.
function mergeRel(callerRel: string | undefined, required: string[]): string | undefined {
  if (required.length === 0) return callerRel;
  const tokens = new Set(
    (callerRel ?? '').split(/\s+/).map(t => t.trim().toLowerCase()).filter(Boolean),
  );
  for (const token of required) tokens.add(token.toLowerCase());
  return Array.from(tokens).join(' ');
}

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
 * Visited: dimmed amber (`text.tertiary` role; amber-dim under the default theme).
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
  const safeHref = sanitizeHref(href);
  const resolvedTarget = target ?? (external ? '_blank' : undefined);
  // Apply safe rel when the link opens in a new tab for ANY reason —
  // explicit `external` or consumer-supplied `target="_blank"`. Merge with
  // caller rel so `rel="author"` + target=_blank still guards against
  // tabnabbing.
  const opensInNewTab = resolvedTarget === '_blank';
  const resolvedRel = opensInNewTab
    ? mergeRel(rel, ['noopener', 'noreferrer'])
    : rel;
  // `external` drives the glyph, but only when the link actually opens in a
  // new tab — `external={true} target="_self"` is an inconsistency we resolve
  // by falling back to the in-flow glyph.
  const glyph = external && opensInNewTab ? '↗' : '▸';

  return (
    <a
      ref={ref}
      href={safeHref}
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
