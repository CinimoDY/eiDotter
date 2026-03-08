/**
 * Validates that a URL uses a safe protocol (http, https, or mailto).
 * Blocks javascript:, data:, vbscript:, blob:, and other dangerous protocols.
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
