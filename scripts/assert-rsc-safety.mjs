#!/usr/bin/env node
/**
 * Assert the per-component emit is RSC-safe (DMNC-1130). Run after `npm run build`.
 *
 * Guards the acceptance criteria that the source-level `sync-client-directives.mjs
 * --check` cannot — they live in the EMITTED dist:
 *
 *   1. Every emitted leaf's `'use client'` matches its classification: interactive
 *      components carry it (client reference); presentational ones don't (server
 *      renderable). A drift here is the exact DMNC-864 SSR-crash footgun.
 *   2. The `.` barrel (dist/index.es.js) stays directive-free — the 7 existing
 *      consumers see no behavioral change.
 *   3. Node's native ESM resolver loads a server (SectionHeading) and a client
 *      (Button) re-export chain end-to-end — proves the extension rewrite holds.
 *   4. Every EXTERNAL (bare) import in the per-component emit is a declared
 *      `dependencies`/`peerDependencies` entry. The unbundled per-component
 *      modules resolve their imports in the CONSUMER's node_modules, so any
 *      external they reference must be a real runtime dep — not a devDependency
 *      the `.` barrel happens to bundle. (Caught the 0.37.0 `tailwind-merge` gap.)
 *
 * A full Next.js RSC fixture is intentionally out of scope here; steuerdash's Next
 * build (DMNC-854 part 3) is the real-world server-import acceptance test.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { classifyComponents } from './lib/client-components.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_COMPONENTS = join(ROOT, 'dist', 'components');
const SWEEP_DIRS = ['components', 'utils', 'hooks'].map((d) => join(ROOT, 'dist', d));
const DIRECTIVE_RE = /^\s*(['"])use client\1/;
const errors = [];

if (!existsSync(DIST_COMPONENTS)) {
  console.error('[assert-rsc-safety] dist/components missing — run `npm run build` first.');
  process.exit(1);
}

// Source files the classifier marks as client (repo-relative).
const clientSources = new Set();
for (const info of classifyComponents().values()) {
  for (const rel of info.clientFiles) clientSources.add(rel);
}

// 1. Every emitted leaf .js directive must match its source classification.
function leafJsFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...leafJsFiles(full));
    else if (entry.endsWith('.js')) out.push(full);
  }
  return out;
}

let checked = 0;
for (const file of leafJsFiles(DIST_COMPONENTS)) {
  // Map dist/components/…X.js → its source. index.js maps to index.ts (re-export
  // barrel, never classified client). Pick whichever source extension exists.
  const rel = file.slice(ROOT.length + 1); // dist/components/…/X.js
  const srcBase = rel.replace(/^dist\//, 'src/').replace(/\.js$/, '');
  const srcRel = ['.tsx', '.ts'].map((e) => srcBase + e).find((p) => existsSync(join(ROOT, p)));
  if (!srcRel) continue; // no source counterpart (shouldn't happen) — skip
  checked += 1;
  const wantClient = clientSources.has(srcRel);
  const hasDirective = DIRECTIVE_RE.test(readFileSync(file, 'utf8'));
  if (wantClient && !hasDirective) errors.push(`MISSING 'use client' in emit → ${rel}`);
  if (!wantClient && hasDirective) errors.push(`UNEXPECTED 'use client' in emit → ${rel}`);
}

// 2. `.` barrel must stay directive-free.
const barrel = join(ROOT, 'dist', 'index.es.js');
if (existsSync(barrel) && /['"]use client['"]/.test(readFileSync(barrel, 'utf8'))) {
  errors.push("dist/index.es.js contains 'use client' — `.` barrel must stay directive-free");
}

// 3. Node ESM resolves a server + a client re-export chain end-to-end.
async function assertResolves(name) {
  const entry = join(DIST_COMPONENTS, name, 'index.js');
  try {
    const mod = await import(pathToFileURL(entry).href);
    if (!mod[name]) errors.push(`import of eidotter/components/${name} missing export '${name}'`);
  } catch (e) {
    errors.push(`Node ESM failed to resolve eidotter/components/${name}: ${e.code || ''} ${e.message}`);
  }
}
await assertResolves('SectionHeading'); // server
await assertResolves('Button'); // client

// 4. Every external (bare) import in the per-component emit is a declared dep.
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);
/** bare specifier → package name (handles @scope/pkg and pkg/subpath). */
const pkgName = (spec) =>
  spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];

function emittedJs(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...emittedJs(full));
    else if (entry.endsWith('.js')) out.push(full);
  }
  return out;
}

const undeclared = new Set();
for (const file of SWEEP_DIRS.flatMap(emittedJs)) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\bfrom\s*['"]([^.'"][^'"]*)['"]/g)) {
    const spec = m[1];
    if (spec.startsWith('node:')) continue;
    const name = pkgName(spec);
    if (!declared.has(name)) undeclared.add(name);
  }
}
for (const name of undeclared) {
  errors.push(`external '${name}' used in per-component emit but not in dependencies/peerDependencies`);
}

if (errors.length > 0) {
  console.error(`[assert-rsc-safety] FAILED:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `[assert-rsc-safety] OK — ${checked} emitted leaves match classification; ` +
    `. barrel directive-free; server + client chains resolve under Node ESM; ` +
    `all per-component externals are declared deps.`,
);
