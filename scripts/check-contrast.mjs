#!/usr/bin/env node
/**
 * WCAG 2.1 contrast check for eidotter semantic token pairs.
 *
 * Resolves --color-semantic-* tokens through the --color-cga-* primitive
 * layer for each theme, then computes contrast ratios for foreground tokens
 * (text-*, border-*) against background tokens (background-*).
 *
 * Usage:
 *   node scripts/check-contrast.mjs              # all themes, table output
 *   node scripts/check-contrast.mjs --json       # JSON output (one object per theme)
 *   node scripts/check-contrast.mjs --theme NAME # single theme
 *
 * Exit code is 0 — this is a reporting tool, not a gate.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(__dirname);
const stylesDir = join(repoRoot, 'src/styles');

const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const themeFilter = args.includes('--theme')
  ? args[args.indexOf('--theme') + 1]
  : null;

const FG_TOKENS = [
  'text-primary',
  'text-secondary',
  'text-accent',
  'text-muted',
  'text-disabled',
  'text-ai-draft',
  'border-default',
  'border-focus',
  'border-hover',
  'border-disabled',
];

const BG_TOKENS = [
  'background-primary',
  'background-secondary',
  'background-accent',
];

function parseHex(hex) {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]) {
  const sr = r / 255, sg = g / 255, sb = b / 255;
  const lin = c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(sr) + 0.7152 * lin(sg) + 0.0722 * lin(sb);
}

function contrast(fg, bg) {
  const lf = relativeLuminance(fg);
  const lb = relativeLuminance(bg);
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}

function classify(ratio) {
  return {
    ratio: Math.round(ratio * 100) / 100,
    passAANormal: ratio >= 4.5,
    passAALarge: ratio >= 3.0,
    passAAANormal: ratio >= 7.0,
    passAAALarge: ratio >= 4.5,
    passNonText: ratio >= 3.0,
  };
}

/**
 * Parse `--name: value;` declarations from a CSS file.
 * Strips comments first so block comments don't bleed across declarations.
 */
function parseDeclarations(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = {};
  for (const m of stripped.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim();
  }
  return out;
}

function resolve(name, decls, depth = 0) {
  if (depth > 8) return null;
  const v = decls[name];
  if (!v) return null;
  const refMatch = v.match(/var\(--([\w-]+)\)/);
  if (refMatch) return resolve(refMatch[1], decls, depth + 1);
  return v;
}

function checkTheme(themeName, themePath) {
  const tokensCss = readFileSync(join(stylesDir, 'tokens.css'), 'utf8');
  const themeCss = readFileSync(themePath, 'utf8');
  const decls = { ...parseDeclarations(tokensCss), ...parseDeclarations(themeCss) };

  const resolved = {};
  for (const t of [...FG_TOKENS, ...BG_TOKENS]) {
    resolved[t] = resolve(`color-semantic-${t}`, decls);
  }

  const pairs = [];
  for (const fg of FG_TOKENS) {
    for (const bg of BG_TOKENS) {
      const fgHex = resolved[fg];
      const bgHex = resolved[bg];
      const fgRgb = fgHex ? parseHex(fgHex) : null;
      const bgRgb = bgHex ? parseHex(bgHex) : null;
      if (!fgRgb || !bgRgb) {
        pairs.push({ fg, bg, fgHex, bgHex, error: 'unresolved' });
        continue;
      }
      pairs.push({
        fg, bg,
        fgHex, bgHex,
        ...classify(contrast(fgRgb, bgRgb)),
      });
    }
  }
  return { theme: themeName, resolved, pairs };
}

const themeFiles = readdirSync(stylesDir)
  .filter(f => f.startsWith('theme.') && f.endsWith('.css'))
  .map(f => ({
    name: f.replace(/^theme\.|\.css$/g, ''),
    path: join(stylesDir, f),
  }))
  .filter(t => !themeFilter || t.name === themeFilter);

const results = themeFiles.map(t => checkTheme(t.name, t.path));

if (wantJson) {
  process.stdout.write(JSON.stringify(results, null, 2) + '\n');
  process.exit(0);
}

const COL = 28;
const pad = (s, n = COL) => String(s ?? '').padEnd(n);
for (const r of results) {
  console.log(`\n=== Theme: ${r.theme} ===`);
  console.log(pad('FG → BG', 36) + pad('FG hex', 12) + pad('BG hex', 12) + pad('Ratio', 9) + pad('AA body', 10) + pad('AA large', 10) + 'AAA body');
  console.log('-'.repeat(108));
  for (const p of r.pairs) {
    if (p.error) {
      console.log(pad(`${p.fg} → ${p.bg}`, 36) + pad(p.fgHex || '?', 12) + pad(p.bgHex || '?', 12) + p.error);
      continue;
    }
    const aaBody = p.passAANormal ? 'PASS' : 'FAIL';
    const aaLarge = p.passAALarge ? 'PASS' : 'FAIL';
    const aaaBody = p.passAAANormal ? 'PASS' : 'FAIL';
    console.log(
      pad(`${p.fg} → ${p.bg}`, 36) +
      pad(p.fgHex, 12) +
      pad(p.bgHex, 12) +
      pad(p.ratio.toFixed(2), 9) +
      pad(aaBody, 10) +
      pad(aaLarge, 10) +
      aaaBody,
    );
  }
}
console.log('\nReporting tool only — exit code is always 0.');
