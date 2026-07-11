/**
 * Validate that a URL string is safe to use as an anchor href.
 *
 * Allows: http://, https://, mailto:, and relative URLs (no scheme).
 * Blocks: javascript:, data:, vbscript:, file:, and other unsafe schemes.
 *
 * Unlike `isSafeUrl` (which parses with `new URL()` and therefore rejects
 * relative URLs), this validator treats scheme-less strings — `/path`,
 * `#hash`, `?query`, `./rel`, `page.html` — as safe, so it is the correct
 * guard for anchor hrefs that may be relative routes (Breadcrumb, Nav, Footer,
 * Header, InlineLink). For absolute external URLs use `isSafeUrl`.
 *
 * Used to guard `<a href={...}>` against author-supplied URLs (e.g. MDX or
 * JSON content). Returns a boolean; callers pass the original href through
 * when true and render the label without an anchor (or a safe fallback) when
 * false.
 */
export interface SafeHrefOptions {
  /**
   * Additional schemes to allow beyond the http/https/mailto default, e.g.
   * `['tel', 'sms', 'ftp']`. Compared case-insensitively. Everything not in
   * the default set or this list stays blocked.
   */
  extraSchemes?: string[];
}

/** Schemes always considered safe, regardless of options. */
const DEFAULT_SAFE_SCHEME_PATTERN = /^(?:https?:|mailto:)/i;

/** Captures the leading scheme (the part before the first `:`), if any. */
const SCHEME_PATTERN = /^([a-z][a-z0-9+\-.]*):/i;

export function isSafeHref(href: string, options?: SafeHrefOptions): boolean {
  if (typeof href !== 'string') return false;
  const trimmed = href.trim();
  if (trimmed.length === 0) return false;

  const schemeMatch = SCHEME_PATTERN.exec(trimmed);
  // Relative URLs (no scheme) — /path, #hash, ?query, ./rel, page.html — are safe.
  if (!schemeMatch) return true;

  // http/https/mailto are always allowed.
  if (DEFAULT_SAFE_SCHEME_PATTERN.test(trimmed)) return true;

  // Opt-in extra schemes (e.g. tel/sms/ftp) — matched case-insensitively.
  const extraSchemes = options?.extraSchemes;
  if (extraSchemes && extraSchemes.length > 0) {
    const scheme = schemeMatch[1].toLowerCase();
    return extraSchemes.some(allowed => allowed.toLowerCase() === scheme);
  }

  return false;
}
