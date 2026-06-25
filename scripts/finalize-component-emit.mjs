#!/usr/bin/env node
/**
 * Finalize the per-component ESM emit for RSC-safe deep imports (DMNC-1130).
 *
 * The `tsconfig.components.json` tsc pass emits one module per source file to
 * dist/{components,utils,hooks}. That raw emit is not directly consumable:
 *
 *   (a) CSS side-effect imports (`import './Button.css'`) would 404 — eidotter
 *       ships ONE stylesheet via `eidotter/styles`, not per-component CSS. Strip
 *       them; this also makes each module side-effect-free (the `sideEffects`
 *       tree-shaking contract).
 *   (b) tsc (moduleResolution: bundler) emits EXTENSIONLESS relative specifiers
 *       (`from '../../../utils/cn'`, `from './components'`). Node's native ESM
 *       resolver rejects these under `"type": "module"`. Rewrite to extensioned
 *       paths (file → `.js`, directory → `/index.js`) so both Node and bundlers
 *       resolve them. Applied to `.d.ts` too (TS maps the `.js` specifier back to
 *       its `.d.ts`), so the types surface resolves under nodenext as well.
 *   (c) Guarantee `'use client'` on every emitted client leaf (per the shared
 *       classifier), independent of whether tsc preserved the source directive.
 *       Runtime-only — never applied to `.d.ts`.
 *
 * Sweeps both the `.js` runtime emit (tsconfig.components.json) and the `.d.ts`
 * declarations (tsconfig.build.json) under dist/{components,utils,hooks}; the main
 * `.` barrel's dist/index.{es,umd,d}.ts at the dist root are untouched.
 *
 * Idempotent: re-running changes nothing (extensioned specifiers and existing
 * directives are skipped, CSS lines are already gone).
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyComponents } from './lib/client-components.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SWEEP_DIRS = ['components', 'utils', 'hooks'].map((d) => join(DIST, d));

const CSS_SIDE_EFFECT_RE = /^\s*import\s+['"][^'"]+\.(?:css|scss)['"];?\s*$/;
// A bound CSS import (`import x from './x.css'`) would NOT be a pure side effect
// and must never appear — assert the invariant rather than silently mishandle it.
const CSS_BINDING_RE = /\bfrom\s+['"][^'"]+\.(?:css|scss)['"]/;
// Relative specifiers in `import ... from` / `export ... from` / `export * from`.
const FROM_SPECIFIER_RE = /(\bfrom\s*['"])(\.[^'"]*)(['"])/g;
const DIRECTIVE_RE = /^\s*(['"])use client\1/;

function emittedFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...emittedFiles(full));
    else if (entry.endsWith('.js') || entry.endsWith('.d.ts')) out.push(full);
  }
  return out;
}

// Expected dist path of every client SOURCE file: src/…X.tsx → dist/…X.js
const clientDistFiles = new Set();
for (const info of classifyComponents().values()) {
  for (const rel of info.clientFiles) {
    clientDistFiles.add(join(ROOT, rel.replace(/^src\//, 'dist/').replace(/\.tsx?$/, '.js')));
  }
}

let strippedCss = 0;
let rewritten = 0;
let directivesAdded = 0;
const errors = [];

const files = SWEEP_DIRS.flatMap(emittedFiles);
for (const file of files) {
  let src = readFileSync(file, 'utf8');

  if (CSS_BINDING_RE.test(src)) {
    errors.push(`${file}: bound CSS import found (expected only side-effect CSS imports)`);
    continue;
  }

  // (a) strip CSS side-effect imports
  src = src
    .split('\n')
    .filter((line) => {
      if (CSS_SIDE_EFFECT_RE.test(line)) {
        strippedCss += 1;
        return false;
      }
      return true;
    })
    .join('\n');

  // (b) rewrite relative specifiers to extensioned paths
  src = src.replace(FROM_SPECIFIER_RE, (match, pre, spec, post) => {
    if (/\.(js|json)$/.test(spec)) return match; // already extensioned (idempotent)
    const target = resolve(dirname(file), spec);
    if (existsSync(`${target}.js`)) {
      rewritten += 1;
      return `${pre}${spec}.js${post}`;
    }
    if (existsSync(join(target, 'index.js'))) {
      rewritten += 1;
      return `${pre}${spec}/index.js${post}`;
    }
    errors.push(`${file}: cannot resolve relative specifier '${spec}'`);
    return match;
  });

  // (c) guarantee 'use client' on emitted client leaves
  if (clientDistFiles.has(file) && !DIRECTIVE_RE.test(src)) {
    src = `'use client';\n${src}`;
    directivesAdded += 1;
  }

  writeFileSync(file, src);
}

if (errors.length > 0) {
  console.error(`[finalize-component-emit] FAILED:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}

console.log(
  `[finalize-component-emit] OK — ${files.length} files; stripped ${strippedCss} CSS import(s), ` +
    `rewrote ${rewritten} relative specifier(s), ensured ${directivesAdded} 'use client' directive(s).`,
);
