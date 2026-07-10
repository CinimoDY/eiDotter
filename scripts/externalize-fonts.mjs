#!/usr/bin/env node
/**
 * Externalize fonts in dist/eidotter.css (post-build, after flatten-css-layers).
 *
 * Vite lib-mode force-inlines every CSS url() asset as a base64 data: URI
 * regardless of `assetsInlineLimit` (verified on Vite 8/Rolldown, DMNC-1373).
 * Since the v0.37 two-tier typography added four ~1MB Nerd Font woff2 files,
 * that ballooned dist/eidotter.css from ~250KB to ~5.7MB — all of it
 * render-blocking for every consumer, and entirely unusable for consumers
 * whose CSP sets `font-src 'self'` (data: fonts are blocked; eidotter.com
 * shipped monospace-fallback headings for weeks without anyone noticing).
 *
 * This script replaces the inlined @font-face rules with the source
 * `src/styles/fonts.css` rules, url()s rewritten to the real font files that
 * already ship in the npm package (`files` includes src/styles/fonts/).
 * Consumer bundlers (Vite / Astro / Next) resolve the relative urls against
 * the CSS file's location in node_modules and emit the fonts as ordinary
 * assets — downloaded per weight, on demand, CSP-clean.
 *
 * Delete this script only if Vite lib mode ever learns to emit CSS assets.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import postcss from 'postcss';

const DIST_CSS = new URL('../dist/eidotter.css', import.meta.url);
const FONTS_CSS = new URL('../src/styles/fonts.css', import.meta.url);
// dist/eidotter.css → ../src/styles/fonts/<file> reaches the packaged fonts.
const REL_PREFIX = '../src/styles/fonts/';

const css = readFileSync(DIST_CSS, 'utf8');
const root = postcss.parse(css);

// 1. Strip every @font-face whose src was inlined as a data: URI.
let stripped = 0;
root.walkAtRules('font-face', (atRule) => {
  if (/url\(\s*['"]?data:/i.test(atRule.toString())) {
    atRule.remove();
    stripped += 1;
  }
});
if (stripped === 0) {
  console.error(
    '[externalize-fonts] FAILED — no inlined @font-face found in dist/eidotter.css. ' +
      'Either the build stopped inlining (delete this script and its build hook) ' +
      'or the bundle no longer contains fonts.css (check src/index.ts imports).'
  );
  process.exit(1);
}

// 2. Rebuild the @font-face block from the source of truth, pointing at the
//    packaged files instead of ./fonts/ (which is only valid next to the
//    source file).
const source = readFileSync(FONTS_CSS, 'utf8');
const rewritten = source.replaceAll("url('./fonts/", `url('${REL_PREFIX}`);
if (rewritten === source) {
  console.error(
    "[externalize-fonts] FAILED — no url('./fonts/…') occurrences in src/styles/fonts.css; " +
      'the rewrite convention changed. Update REL_PREFIX handling.'
  );
  process.exit(1);
}

// 3. Every rewritten url() must point at a real packaged file.
const distDir = dirname(fileURLToPath(DIST_CSS));
const targets = [...rewritten.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
const missing = targets.filter((t) => !existsSync(resolve(distDir, t)));
if (targets.length === 0 || missing.length > 0) {
  console.error(
    `[externalize-fonts] FAILED — font url() targets missing on disk: ${missing.join(', ') || '(none parsed)'}`
  );
  process.exit(1);
}

const out = `${rewritten}\n${root.toString()}`;
if (/url\(\s*['"]?data:font/i.test(out)) {
  console.error('[externalize-fonts] FAILED — data:font URIs still present after externalization');
  process.exit(1);
}

writeFileSync(DIST_CSS, out);
const kb = Math.round(Buffer.byteLength(out, 'utf8') / 1024);
console.log(
  `[externalize-fonts] OK — replaced ${stripped} inlined @font-face rule(s) with ${targets.length} file-referencing rule(s); dist/eidotter.css is now ${kb}KB`
);
