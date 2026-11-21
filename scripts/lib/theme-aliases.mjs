// Deprecated theme names that keep working (DMNC-1643).
//
// Each key is a theme in the `themes` list of style-dictionary.config.mjs; its
// value lists older names that select the same rules. The generated theme CSS
// and the shadcn shim put every name in one selector list, so
// `[data-theme="amber-mono"]` and `[data-theme="pure-amber"]` are the same
// rule, not two copies. An alias is never a theme of its own: it gets no
// token file, no terminal JSON and no extra block.
//
// amber-mono was renamed Pure Amber (`pure-amber`) in DMNC-1643 and keeps
// working for at least two minors. No runtime warning; the deprecation is in
// the docs and the CHANGELOG.
export const THEME_ALIASES = {
  'pure-amber': ['amber-mono'],
};

// Theme variants (DMNC-1643): a variant is a theme name that takes every value of
// its base theme, plus the few declarations of its own in
// `src/tokens/variant.<name>.tokens.json`. The base theme's rule lists the
// variant's selectors too (so the shared values exist once), and the build
// appends one small rule that holds only the variant's own declarations.
//
// dos-86-light is amber-paper with the body face: a site whose dark theme is
// dos-86 renders non-heading text in the body face, and its light theme must
// not change the width of the header when LIGHT is toggled. Pure Amber sites
// keep amber-paper, which keeps the display face.
export const THEME_VARIANTS = {
  'amber-paper': ['dos-86-light'],
};

/** Every name a theme answers to: its own first, then its aliases. */
export function themeNames(theme) {
  return [theme, ...(THEME_ALIASES[theme] ?? [])];
}

/** Every name whose rule carries the theme's values: its names, then its variants. */
export function themeRuleNames(theme) {
  return [...themeNames(theme), ...(THEME_VARIANTS[theme] ?? [])];
}

/** `[data-theme="a"], [data-theme="b"], .theme-a, .theme-b` for a theme, its aliases and its variants. */
export function themeSelector(theme) {
  return selectorFor(themeRuleNames(theme));
}

/** The selector list for a variant's own rule: the variant name only. */
export function variantSelector(variant) {
  return selectorFor([variant]);
}

function selectorFor(names) {
  return [...names.map((n) => `[data-theme="${n}"]`), ...names.map((n) => `.theme-${n}`)].join(', ');
}
