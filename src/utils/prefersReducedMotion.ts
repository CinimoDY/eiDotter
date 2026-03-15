/**
 * Check if the user prefers reduced motion.
 * Returns true when animations should be skipped.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
