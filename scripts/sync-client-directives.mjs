// Keep `'use client'` directives in component source in sync with the interactivity
// classifier (scripts/lib/client-components.mjs). Source-of-truth for the RSC
// per-component export pipeline (DMNC-1130).
//
//   node scripts/sync-client-directives.mjs          # apply: add/remove directives
//   node scripts/sync-client-directives.mjs --check   # CI: exit 1 if out of sync
//
// Invariant enforced: a component source file carries a leading `'use client'`
// directive IFF the classifier marks it as a client module. This guarantees every
// interactive component (e.g. Button — react-aria) presents a client boundary when
// deep-imported as `eidotter/components/<Name>`, while genuinely presentational ones
// (SectionHeading, EmptyState, LabeledProgress, …) stay server-renderable.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyComponents, sourceFiles, fileHasDirective } from './lib/client-components.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');
const check = process.argv.includes('--check');

const DIRECTIVE = "'use client';";
// Leading directive (single/double quote) plus its trailing blank line, if any.
const LEADING_DIRECTIVE_RE = /^\s*(['"])use client\1;?\n(\n)?/;

const classified = classifyComponents();
const clientFiles = new Set();
for (const info of classified.values()) {
  for (const rel of info.clientFiles) clientFiles.add(join(ROOT, rel));
}

// Every source file (excluding dir index re-exports) is a candidate; its desired
// state is "client" iff it is in the classifier's client set.
const allFiles = [];
for (const [name] of classified) {
  for (const f of sourceFiles(join(COMPONENTS_DIR, name))) {
    if (/\/index\.ts$/.test(f)) continue;
    allFiles.push(f);
  }
}

const drift = [];
for (const file of allFiles) {
  const wantClient = clientFiles.has(file);
  const hasDirective = fileHasDirective(file);
  if (wantClient === hasDirective) continue;

  const rel = file.slice(ROOT.length + 1);
  drift.push(`${wantClient ? 'MISSING' : 'EXTRA  '} 'use client' → ${rel}`);
  if (check) continue;

  const src = readFileSync(file, 'utf8');
  if (wantClient) {
    writeFileSync(file, `${DIRECTIVE}\n\n${src}`);
  } else {
    writeFileSync(file, src.replace(LEADING_DIRECTIVE_RE, ''));
  }
}

if (drift.length === 0) {
  console.log(`✓ 'use client' directives in sync with classifier (${clientFiles.size} client files).`);
  process.exit(0);
}

if (check) {
  console.error(`✗ 'use client' directives out of sync with classifier:\n  ${drift.join('\n  ')}`);
  console.error('\nRun `node scripts/sync-client-directives.mjs` to fix.');
  process.exit(1);
}
console.log(`Updated ${drift.length} file(s):\n  ${drift.join('\n  ')}`);
