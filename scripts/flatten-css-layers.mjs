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
 */
import { readFileSync, writeFileSync } from 'node:fs';
import postcss from 'postcss';

const FILE = new URL('../dist/eidotter.css', import.meta.url);

const css = readFileSync(FILE, 'utf8');
const root = postcss.parse(css);

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
console.log(`[flatten-css-layers] OK — unwrapped ${unwrapped} @layer rule(s) in dist/eidotter.css`);
