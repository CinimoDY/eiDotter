import { extendTailwindMerge } from 'tailwind-merge';
import { DOS_FONT_SIZES } from './dosFontSizes';

/**
 * tailwind-merge knows nothing about eidotter's preset, so it reads any
 * `text-<unknown>` class as a text colour. `text-dos-text-sm` (a font size)
 * then "conflicts" with `text-dos-text-brand` (a colour) and the colour is
 * dropped. Registering the dos font sizes as a font-size group keeps both.
 * The list is generated from the preset (scripts/generate-tailwind-safelist.mjs),
 * so a new size token joins automatically.
 *
 * It is a group of its own rather than tailwind-merge's `font-size`, because
 * that group also removes any earlier `leading-*` class (stock Tailwind sizes
 * carry a line height). Button and Badge pair a dos size with a leading class,
 * and the dos sizes defer to it (their line height, where they set one, reads
 * Tailwind's leading variable first).
 * A dos size and a stock size still replace each other.
 *
 * Keep stock size class names out of comments in src: Tailwind scans these
 * files and would compile any it finds into dist/eidotter.css.
 */
const twMerge = extendTailwindMerge<'dos-font-size'>({
  extend: {
    classGroups: {
      'dos-font-size': [{ text: [...DOS_FONT_SIZES] }],
    },
    conflictingClassGroups: {
      'dos-font-size': ['font-size'],
      'font-size': ['dos-font-size'],
    },
  },
});

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Wraps tailwind-merge for consistent class merging across eidotter components.
 *
 * @example
 * cn('bg-dos-bg-primary text-dos-text-primary', 'bg-dos-bg-secondary')
 * // → 'text-dos-text-primary bg-dos-bg-secondary'
 * cn('text-dos-text-brand', 'text-dos-text-sm')
 * // → 'text-dos-text-brand text-dos-text-sm' (colour and size both kept)
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(inputs.filter(Boolean) as string[]);
}
