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

/** Every name a theme answers to: its own first, then its aliases. */
export function themeNames(theme) {
  return [theme, ...(THEME_ALIASES[theme] ?? [])];
}

/** `[data-theme="a"], [data-theme="b"], .theme-a, .theme-b` for a theme and its aliases. */
export function themeSelector(theme) {
  const names = themeNames(theme);
  return [...names.map((n) => `[data-theme="${n}"]`), ...names.map((n) => `.theme-${n}`)].join(', ');
}
