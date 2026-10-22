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

// Preflight resets on bare element selectors that would clobber consumer
// markup once unlayered. Strip the selector from the rule's list; drop the
// rule if nothing is left. Matching is on the parsed selector list, never a
// regex over the bundle (`textarea{` tail-matches `a{`).
const STRIP_SELECTORS = new Set(['a']);

root.walkAtRules('layer', (layer) => {
  if (!isLayer(layer, 'base')) return;
  layer.walkRules((rule) => {
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
  `[flatten-css-layers] OK — unwrapped ${unwrapped} layer(s), neutralized ${neutralized} preflight rule(s) in dist/eidotter.css`
);
