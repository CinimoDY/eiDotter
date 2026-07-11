/**
 * Validates that a URL uses a safe protocol (http, https, or mailto).
 * Blocks javascript:, data:, vbscript:, blob:, and other dangerous protocols.
 *
 * Parses with `new URL()`, so this is for **absolute external URLs** and
 * **rejects relative URLs** (`/path`, `#hash`) — a relative favicon or image
 * src is a broken resource, and `data:` URLs are the attack surface here. For
 * anchor hrefs that may be relative routes, use `isSafeHref` instead.
 *
 * @param url - URL string to validate
 * @returns true if the URL uses an allowed protocol
 */
export const isSafeUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};
