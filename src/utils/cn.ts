import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Wraps tailwind-merge for consistent class merging across eidotter components.
 *
 * @example
 * cn('bg-dos-bg-primary text-dos-text-primary', 'bg-dos-bg-secondary')
 * // → 'text-dos-text-primary bg-dos-bg-secondary'
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(inputs.filter(Boolean).join(' '));
}
