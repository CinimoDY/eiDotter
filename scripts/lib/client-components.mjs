// Shared classifier for the RSC per-component export pipeline (DMNC-1130).
//
// Determines which component source files must carry a `'use client'` directive.
// A component leaf is a *client* module if it uses React hooks, context, browser
// effects, react-aria/react-stately, or attaches an event handler to JSX. Anything
// else is server-safe (renderable inside a Next.js RSC server component).
//
// Used by:
//   - scripts/finalize-component-emit.mjs  (guarantee directive on emitted client leaves)
//   - scripts/assert-client-directives.mjs (CI: emitted directives match source intent)
// Run directly (`node scripts/lib/client-components.mjs`) to print the classification.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');

/** Recursively collect non-test, non-story .ts/.tsx source files under a dir. */
export function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
    } else if (
      /\.(ts|tsx)$/.test(entry) &&
      !/\.(test|stories)\.(ts|tsx)$/.test(entry) &&
      !/\.d\.ts$/.test(entry)
    ) {
      out.push(full);
    }
  }
  return out;
}

// Signals that force a client boundary. Custom hooks (useId, useTextScramble,
// useAnimatedDismiss, useDrillDown, …) are caught by the generic `use[A-Z](` form.
const CLIENT_SIGNALS = [
  /\buse[A-Z][A-Za-z]*\s*\(/, // any hook call
  /\bcreateContext\s*\(/,
  /from\s+['"]react-aria(-components)?['"]/,
  /from\s+['"]react-stately['"]/,
  /\son[A-Z][A-Za-z]*=\{/, // JSX event-handler attachment (onClick={…}, onChange={…})
];

const DIRECTIVE_RE = /^\s*(['"])use client\1/;

export function fileHasClientSignal(file) {
  const src = readFileSync(file, 'utf8');
  return CLIENT_SIGNALS.some((re) => re.test(src));
}

export function fileHasDirective(file) {
  return DIRECTIVE_RE.test(readFileSync(file, 'utf8'));
}

/**
 * Classify every component. Returns a Map<componentName, {
 *   clientFiles: string[],   // leaf source files that need 'use client'
 *   needsClient: boolean,    // any leaf is a client module
 * }> with repo-relative file paths.
 */
export function classifyComponents() {
  const result = new Map();
  for (const name of readdirSync(COMPONENTS_DIR)) {
    const dir = join(COMPONENTS_DIR, name);
    if (!statSync(dir).isDirectory()) continue;
    const files = sourceFiles(dir).filter((f) => !/\/index\.ts$/.test(f));
    const clientFiles = files
      .filter(fileHasClientSignal)
      .map((f) => f.slice(ROOT.length + 1));
    result.set(name, { clientFiles, needsClient: clientFiles.length > 0 });
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const classified = classifyComponents();
  let client = 0;
  for (const [name, info] of [...classified].sort()) {
    const tag = info.needsClient ? 'CLIENT' : 'server';
    if (info.needsClient) client++;
    const files = info.clientFiles.map((f) => f.replace('src/components/', '')).join(', ');
    console.log(`${name.padEnd(20)} ${tag.padEnd(7)} ${files}`);
  }
  console.log(`\n${client} client / ${classified.size - client} server (of ${classified.size})`);
}
