/**
 * Validate that a URL string is safe to use as an anchor href.
 *
 * Allows: http://, https://, mailto:, and relative URLs (no scheme).
 * Blocks: javascript:, data:, vbscript:, file:, and other unsafe schemes.
 *
 * Used to guard `<a href={...}>` against author-supplied URLs (e.g. MDX or
 * JSON content). Returns the input unchanged when safe so callers can pass
 * it directly into href; returns false to signal the link should be dropped.
 */
const SAFE_SCHEME_PATTERN = /^(?:https?:|mailto:)/i;

export function isSafeHref(href: string): boolean {
  if (typeof href !== 'string') return false;
  const trimmed = href.trim();
  if (trimmed.length === 0) return false;
  // Relative URLs (no scheme) are safe.
  if (!/^[a-z][a-z0-9+\-.]*:/i.test(trimmed)) return true;
  return SAFE_SCHEME_PATTERN.test(trimmed);
}
