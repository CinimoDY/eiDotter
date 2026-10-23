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
 *
 * The rest of the preflight (the universal `*{margin:0;padding:0;border:0
 * solid;box-sizing:border-box}`, h1–h6, ol/ul, img …) is NOT unwrapped: it
 * moves into the nested layer `@layer base.eidotter`, and a Tailwind-shaped
 * ordering statement `@layer properties, theme, base, components, utilities;`
 * goes first.
 * Unlayered, those resets beat a Tailwind v4 consumer's `@layer utilities`
 * (`.p-7`, `.mt-3`, `list-disc` silently did nothing). Nested inside `base`,
 * they rank below the consumer's own base and utilities whichever stylesheet
 * loads first, and below every unlayered rule, which includes all eidotter
 * component CSS and utilities, so components keep the resets they rely on.
 * Tailwind v3 only rejects the exact names `base`/`components`/`utilities`;
 * it passes `base.eidotter` and the ordering statement through unchanged.
 *
 * Safelist-only token utilities move into `@layer utilities.eidotter` the
 * same way (see SAFELIST_LAYER below).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import postcss from 'postcss';

// Tailwind's own candidate scanner, resolved through @tailwindcss/postcss
// (its dependent) so it is the exact copy the build used, hoisted or not.
const requireFromTailwind = createRequire(createRequire(import.meta.url).resolve('@tailwindcss/postcss'));
const { Scanner } = requireFromTailwind('@tailwindcss/oxide');

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

// The preflight keeps a layer of its own, nested in `base` (see header).
const PREFLIGHT_LAYER = 'base.eidotter';
// Tailwind v4.3's own order, `properties` first as it emits it.
const ORDER = 'properties, theme, base, components, utilities';

// Safelist-only token utilities (generated `@source inline()` classes that
// no shipped component uses) go into `@layer utilities.eidotter`. Unlayered,
// a consumer's `text-cga-white hover:text-cga-bright-cyan` never shows the
// hover: the bare class beats the consumer's layered variant. Nested in
// `utilities`, they sit below the consumer's utilities (variants included)
// in either load order, and consumers without Tailwind still get them.
// Classes a component uses stay unlayered so eidotter's own cascade holds.
// "Uses" is decided by Tailwind's own scanner over the same @source globs
// as src/styles/tailwind.css, so it matches what Tailwind compiled.
const SAFELIST_LAYER = 'utilities.eidotter';
const twCssPath = new URL('../src/styles/tailwind.css', import.meta.url);
const twCss = readFileSync(twCssPath, 'utf8');
const SAFELIST_BEGIN = '/* BEGIN GENERATED SAFELIST';
const SAFELIST_END = '/* END GENERATED SAFELIST */';
const block = twCss.slice(twCss.indexOf(SAFELIST_BEGIN), twCss.indexOf(SAFELIST_END));
const safelist = new Set(
  [...block.matchAll(/@source inline\("([^"]+)"\);/g)].flatMap((m) => m[1].split(/\s+/).filter(Boolean))
);
if (safelist.size === 0) {
  console.error('[flatten-css-layers] FAILED — no generated safelist found in src/styles/tailwind.css');
  process.exit(1);
}
const stylesDir = fileURLToPath(new URL('../src/styles/', import.meta.url));
const sources = [...twCss.matchAll(/^@source\s+(not\s+)?"([^"]+)";/gm)].map(([, not, glob]) => {
  const parts = glob.split('/');
  const firstGlob = parts.findIndex((p) => /[*{?[]/.test(p));
  return {
    base: resolvePath(stylesDir, ...parts.slice(0, firstGlob)),
    pattern: parts.slice(firstGlob).join('/'),
    negated: Boolean(not),
  };
});
const used = new Set(new Scanner({ sources }).scan());
const safelistOnly = new Set([...safelist].filter((c) => !used.has(c)));

const tokenLayer = postcss.atRule({ name: 'layer', params: SAFELIST_LAYER });
const classOf = (selector) => selector.trim().match(/^\.([\w-]+)$/)?.[1];
root.walkAtRules('layer', (layer) => {
  if (!isLayer(layer, 'utilities') || !layer.nodes) return;
  layer.each((node) => {
    if (node.type !== 'rule') return;
    const moving = node.selectors.filter((s) => safelistOnly.has(classOf(s)));
    if (moving.length === 0) return;
    if (moving.length === node.selectors.length) {
      tokenLayer.append(node.clone());
      node.remove();
    } else {
      tokenLayer.append(node.clone({ selectors: moving }));
      node.selectors = node.selectors.filter((s) => !moving.includes(s));
    }
  });
});
const movedClasses = new Set();
tokenLayer.walkRules((rule) => rule.selectors.forEach((s) => movedClasses.add(classOf(s))));
const notMoved = [...safelistOnly].filter((c) => !movedClasses.has(c));
if (notMoved.length > 0) {
  console.error(
    `[flatten-css-layers] FAILED — safelist-only classes not found as top-level rules in @layer utilities: ${notMoved.join(', ')}`
  );
  process.exit(1);
}
let preflightLayers = 0;
root.walkAtRules('layer', (layer) => {
  if (!isLayer(layer, 'base') || !layer.nodes) return;
  layer.params = PREFLIGHT_LAYER;
  preflightLayers += 1;
});
if (preflightLayers !== 1) {
  console.error(`[flatten-css-layers] FAILED — expected one @layer base block, found ${preflightLayers}`);
  process.exit(1);
}

let unwrapped = 0;
// Repeat until fixpoint in case of nested @layer blocks.
let found = true;
while (found) {
  found = false;
  root.walkAtRules('layer', (atRule) => {
    if (isLayer(atRule, PREFLIGHT_LAYER) || isLayer(atRule, SAFELIST_LAYER)) return;
    found = true;
    unwrapped += 1;
    if (atRule.nodes && atRule.nodes.length > 0) {
      atRule.replaceWith(atRule.nodes);
    } else {
      atRule.remove(); // bare `@layer a, b;` ordering statement
    }
  });
}

// Declare Tailwind's layer order before anything else mentions a layer, so
// `base` never lands above `utilities` in a consumer that loads eidotter first.
root.prepend(postcss.atRule({ name: 'layer', params: ORDER }));
root.append(tokenLayer);

// Every safelist-only class must now live only inside the token layer.
const leaked = [];
root.walkRules((rule) => {
  if (rule.parent === tokenLayer) return;
  for (const s of rule.selectors) if (safelistOnly.has(classOf(s))) leaked.push(s);
});
if (leaked.length > 0) {
  console.error(`[flatten-css-layers] FAILED — safelist-only classes outside @layer ${SAFELIST_LAYER}: ${leaked.join(', ')}`);
  process.exit(1);
}

const out = root.toString();
const layers = [...out.matchAll(/@layer\s+([^{;]+)\s*([{;])/g)].map((m) => `${m[1].trim()}${m[2]}`);
const expected = [`${ORDER};`, `${PREFLIGHT_LAYER}{`, `${SAFELIST_LAYER}{`];
if (layers.join('|') !== expected.join('|')) {
  console.error(`[flatten-css-layers] FAILED — unexpected @layer rules after flattening: ${layers.join(' | ')}`);
  process.exit(1);
}

writeFileSync(FILE, out);
console.log(
  `[flatten-css-layers] OK — unwrapped ${unwrapped} layer(s), kept the preflight in @layer ${PREFLIGHT_LAYER}, layered ${movedClasses.size} safelist-only class(es) in @layer ${SAFELIST_LAYER} (${safelist.size - safelistOnly.size} component-used stay unlayered), neutralized ${neutralized} preflight rule(s), stripped ${strippedVars} Tailwind default font var(s) in dist/eidotter.css`
);
