#!/usr/bin/env node
/**
 * Flatten CSS cascade layers in dist/eidotter.css (post-build).
 *
 * Tailwind v4 wraps its output in native `@layer theme/base/utilities/...`
 * blocks. Tailwind v3 hijacks the `@layer` at-rule as its own directive
 * grammar, so any v3 consumer whose bundler pipes node_modules CSS through
 * postcss (Next.js does) fails with:
 *   "`@layer base` is used but no matching `@tailwind base` directive"
 *
 * Unwrapping the layer blocks in document order restores exactly the
 * (unlayered) cascade semantics the v3-built dist always had, and keeps the
 * stylesheet consumable by v3 and v4 apps alike. Re-evaluate once every
 * portfolio consumer is on Tailwind 4 (or none pipe vendor CSS through v3).
 *
 * Side effect of flattening (DMNC-1434): Tailwind's `@layer base` preflight
 * ships UNLAYERED, and unlayered author CSS beats every layered consumer rule
 * regardless of specificity. A bare `a { color: inherit }` therefore defeats
 * a Tailwind v4 consumer's `@layer utilities` link colours site-wide, even on
 * pages with no eidotter component. Before unwrapping, the preflight rules
 * that target every element of a type on the consumer's page are neutralized
 * on the AST. `:where()` would not help — layer order is resolved before
 * specificity — so the rule must stop matching, not just get weaker.
 * Eidotter components style their anchors through their own classes.
 *
 * Same for fonts: the preflight `html,:host { font-family: … }` and
 * Tailwind's DEFAULT theme font vars (`--font-sans`, `--font-mono`,
 * `--default-font-family`, `--default-mono-font-family`) would beat a
 * consumer's layered `@theme` font. Eidotter's own typography uses its
 * `--typography-*` tokens and explicit `font-dos`/`.dos-*` families, which
 * are untouched.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import postcss from 'postcss';

const FILE = new URL('../dist/eidotter.css', import.meta.url);

const css = readFileSync(FILE, 'utf8');
const root = postcss.parse(css);

/** `@layer base { … }` exactly — not `@layer base, utilities;` ordering lists. */
const isLayer = (atRule, name) => atRule.params.trim() === name;

let neutralized = 0;
let anchorResetFound = false;
let htmlFontFound = false;
let strippedVars = 0;

// Preflight resets on bare element selectors that would clobber consumer
// markup once unlayered. Strip the selector from the rule's list; drop the
// rule if nothing is left. Matching is on the parsed selector list, never a
// regex over the bundle (`textarea{` tail-matches `a{`).
const STRIP_SELECTORS = new Set(['a']);
// Declarations dropped from base rules matching these selectors.
const STRIP_DECLS_ON = new Set(['html', ':host']);
const STRIP_DECLS = new Set(['font-family']);
// Tailwind default theme vars dropped from @layer theme (never eidotter tokens).
const STRIP_THEME_VARS = new Set([
  '--font-sans',
  '--font-mono',
  '--default-font-family',
  '--default-mono-font-family',
]);

root.walkAtRules('layer', (layer) => {
  if (!isLayer(layer, 'base')) return;
  layer.walkRules((rule) => {
    if (rule.selectors.some((s) => STRIP_DECLS_ON.has(s.trim()))) {
      let dropped = 0;
      rule.walkDecls((decl) => {
        if (!STRIP_DECLS.has(decl.prop)) return;
        decl.remove();
        dropped += 1;
      });
      if (dropped > 0) {
        htmlFontFound = true;
        neutralized += 1;
      }
    }
    const kept = rule.selectors.filter((s) => !STRIP_SELECTORS.has(s.trim()));
    if (kept.length === rule.selectors.length) return;
    if (rule.selectors.some((s) => s.trim() === 'a') && rule.some((d) => d.prop === 'color')) {
      anchorResetFound = true;
    }
    neutralized += 1;
    if (kept.length === 0) rule.remove();
    else rule.selectors = kept;
  });
});

root.walkAtRules('layer', (layer) => {
  if (!isLayer(layer, 'theme')) return;
  layer.walkDecls((decl) => {
    if (!STRIP_THEME_VARS.has(decl.prop)) return;
    decl.remove();
    strippedVars += 1;
  });
});

// A stripped theme var that is still referenced would silently resolve to
// nothing — fail instead, so the reference is a deliberate decision.
const dangling = [];
root.walkDecls((decl) => {
  // `var(--x, fallback)` keeps working without --x; only a bare `var(--x)`
  // with no fallback would break.
  for (const name of STRIP_THEME_VARS) {
    if (new RegExp(`var\\(\\s*${name}\\s*\\)`).test(decl.value)) dangling.push(`${decl.prop}: ${decl.value}`);
  }
});
if (dangling.length > 0) {
  console.error(
    '[flatten-css-layers] FAILED — stripped Tailwind default font var still referenced without a fallback:\n  ' +
      dangling.join('\n  ')
  );
  process.exit(1);
}

if (!htmlFontFound) {
  console.error(
    '[flatten-css-layers] FAILED — Tailwind preflight `html,:host{font-family:…}` not found in @layer base. ' +
      'Tailwind changed its preflight shape; re-check the DMNC-1434 guard.'
  );
  process.exit(1);
}

if (!anchorResetFound) {
  console.error(
    '[flatten-css-layers] FAILED — Tailwind preflight `a{color:inherit…}` not found in @layer base. ' +
      'Tailwind changed its preflight shape; re-check the DMNC-1434 guard.'
  );
  process.exit(1);
}

let unwrapped = 0;
// Repeat until fixpoint in case of nested @layer blocks.
let found = true;
while (found) {
  found = false;
  root.walkAtRules('layer', (atRule) => {
    found = true;
    unwrapped += 1;
    if (atRule.nodes && atRule.nodes.length > 0) {
      atRule.replaceWith(atRule.nodes);
    } else {
      atRule.remove(); // bare `@layer a, b;` ordering statement
    }
  });
}

const out = root.toString();
if (/@layer/.test(out)) {
  console.error('[flatten-css-layers] FAILED — @layer still present after flattening');
  process.exit(1);
}

writeFileSync(FILE, out);
console.log(
  `[flatten-css-layers] OK — unwrapped ${unwrapped} layer(s), neutralized ${neutralized} preflight rule(s), stripped ${strippedVars} Tailwind default font var(s) in dist/eidotter.css`
);
