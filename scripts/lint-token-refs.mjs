#!/usr/bin/env node
//
// lint-token-refs — fails CI when var(--*) references or text-dos-*, bg-dos-*,
// border-dos-*, shadow-dos-*, ring-dos-*, font-dos-* Tailwind class-form
// references point at tokens that don't exist.
//
// Why this script exists:
// - PR #246 renamed typography tokens (xs/sm/base/lg to text-xs..xl and
//   display-xs..2xl). CSS var(--typography-font-size-base, 1rem) silently
//   falls back to 1rem when the token no longer exists — no build error,
//   no warning, broken theme tracking.
// - PR #291 shipped dos-utilities.css with 7 obsolete names. The Tailwind
//   preset also missed a new dos-text-muted key, so consumer JSX using
//   className="text-dos-text-muted" resolved to nothing.
//
// Sources of truth:
// - src/styles/tokens.css declares every `--<name>:` a consumer can resolve
//   at runtime.
// - tailwind.preset.cjs theme.extend.colors declares every `<color>-<variant>`
//   key Tailwind will emit (paired with a var() target).
//
// Check A: every var(--*) reference in scanned source files exists in tokens.css.
// Check B: every text-dos-*, bg-dos-*, border-dos-*, shadow-dos-*, ring-dos-*,
//          or font-dos-* class-form reference in .tsx/.ts exists in the preset's
//          matching namespace.
//
// Exit code is non-zero on any violation, so CI can invoke this directly.
//

import { readFileSync } from 'node:fs';
import { globSync } from 'glob';
import { resolve, relative } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-require-imports

const ROOT = resolve(import.meta.dirname, '..');
const tokensCss = readFileSync(resolve(ROOT, 'src/styles/tokens.css'), 'utf8');

// ---------- Source of truth A: declared CSS custom properties ---------------
//
// A var reference is valid if it's declared in EITHER:
//   (a) src/styles/tokens.css — the generated global design tokens, or
//   (b) any component CSS under src/components/**, src/styles/** — component-
//       local vars like `--retro-intensity`, `--fill-pct` that are scoped to
//       a single component and set via inline style or local rules.
//
// The lint catches the drift case: a var that's referenced but declared
// nowhere in the repo (typo, stale rename, or removed token still in use).

const declaredVars = new Set();

// (a) tokens.css + component CSS files declare via `--xxx:` at the start of a line.
const cssSourceFiles = globSync('src/**/*.css', { cwd: ROOT, nodir: true });
for (const relPath of cssSourceFiles) {
  const content = readFileSync(resolve(ROOT, relPath), 'utf8');
  for (const match of content.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gim)) {
    declaredVars.add(match[1]);
  }
}

// (b) TSX/TS files set runtime-scoped vars via either:
//     - React inline `style={{ '--xxx': ... }}` (object-literal key form)
//     - imperative `element.style.setProperty('--xxx', ...)` (DOM API form)
const tsxSourceFiles = globSync('src/**/*.{tsx,ts}', { cwd: ROOT, nodir: true });
for (const relPath of tsxSourceFiles) {
  const content = readFileSync(resolve(ROOT, relPath), 'utf8');
  // Object-literal key form.
  for (const match of content.matchAll(/['"`](--[A-Za-z0-9_-]+)['"`]\s*:/g)) {
    declaredVars.add(match[1]);
  }
  // setProperty form.
  for (const match of content.matchAll(
    /\.setProperty\(\s*['"`](--[A-Za-z0-9_-]+)['"`]/g,
  )) {
    declaredVars.add(match[1]);
  }
}

if (declaredVars.size === 0) {
  console.error(
    '[lint-token-refs] No `--*: ...;` declarations found anywhere under src/**/*.css. ' +
      'Run `npm run build-tokens` first.',
  );
  process.exit(2);
}

// ---------- Source of truth B: Tailwind preset color keys -------------------

// Load the CJS preset. Require-interop in an ESM script.
const { createRequire } = await import('node:module');
const require = createRequire(import.meta.url);
const preset = require(resolve(ROOT, 'tailwind.preset.cjs'));

const extend = preset?.theme?.extend ?? {};
const presetNamespaces = {
  text: new Set(Object.keys(extend.colors ?? {})),
  bg: new Set(Object.keys(extend.colors ?? {})),
  border: new Set(Object.keys(extend.colors ?? {})),
  ring: new Set(Object.keys(extend.colors ?? {})),
  shadow: new Set(Object.keys(extend.boxShadow ?? {})),
  font: new Set(Object.keys(extend.fontFamily ?? {})),
  // NOTE: text-dos-text-md is fontSize (not color). Tailwind text-* is polymorphic —
  // the same prefix writes font-size OR color depending on what the value is. We
  // accept a class as valid if it exists in EITHER namespace.
};
const fontSizeKeys = new Set(Object.keys(extend.fontSize ?? {}));

// ---------- Scan ------------------------------------------------------------

const files = globSync('src/**/*.{css,tsx,ts}', { cwd: ROOT, nodir: true });
const violations = [];

for (const relPath of files) {
  const abs = resolve(ROOT, relPath);
  const content = readFileSync(abs, 'utf8');

  // Check A: var(--*) references. Capture var name only; ignore fallbacks.
  for (const match of content.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) {
    const [full, name] = match;
    if (!declaredVars.has(name)) {
      violations.push({
        file: relPath,
        kind: 'css-var',
        ref: full,
        name,
        line: lineNumberOfMatch(content, match.index ?? 0),
      });
    }
  }

  // Check B: Tailwind class-form drift. Only for .tsx / .ts where classes live.
  if (relPath.endsWith('.tsx') || relPath.endsWith('.ts')) {
    // className / class attributes (JSX) + cn(...) / clsx(...) arguments.
    // Narrow regex keeps the match set small; we capture the whole class string
    // then split on whitespace.
    const classStringRe =
      /(?:className|class)\s*[:=]\s*['"`]([^'"`]*)['"`]|cn\(\s*['"`]([^'"`]*)['"`]/g;
    for (const m of content.matchAll(classStringRe)) {
      const classString = m[1] ?? m[2] ?? '';
      for (const cls of classString.split(/\s+/).filter(Boolean)) {
        const prefixMatch = cls.match(
          /^(text|bg|border|ring|shadow|font)-(dos-[a-z0-9-]+)$/,
        );
        if (!prefixMatch) continue;
        const [, prefix, key] = prefixMatch;
        const ns = presetNamespaces[prefix];
        if (!ns) continue;
        // text-* is polymorphic (fontSize OR color). Accept if either has the key.
        const inPrimary = ns.has(key);
        const inFontSize = prefix === 'text' && fontSizeKeys.has(key);
        if (!inPrimary && !inFontSize) {
          violations.push({
            file: relPath,
            kind: 'tailwind-class',
            ref: cls,
            name: `${prefix}-${key}`,
            line: lineNumberOfMatch(content, m.index ?? 0),
          });
        }
      }
    }
  }
}

// ---------- Report ----------------------------------------------------------

if (violations.length === 0) {
  console.log(
    `[lint-token-refs] OK — scanned ${files.length} files, ${declaredVars.size} tokens, ` +
      `${presetNamespaces.text.size} preset colors. No unresolved references.`,
  );
  process.exit(0);
}

console.error(
  `[lint-token-refs] FAIL — ${violations.length} unresolved reference(s):\n`,
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.kind}]  ${v.ref}`);
}
console.error(
  '\nTo fix: either add the missing token to src/tokens/*.tokens.json and run ' +
    '`npm run build-tokens`, or update the reference to a token name that exists ' +
    'in src/styles/tokens.css / tailwind.preset.cjs.',
);
process.exit(1);

// ---------- Helpers ---------------------------------------------------------

function lineNumberOfMatch(source, index) {
  // 1-based line number for the offset in source.
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (source.charCodeAt(i) === 10) line++;
  }
  return line;
}
