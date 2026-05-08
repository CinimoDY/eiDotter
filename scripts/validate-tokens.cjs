/**
 * Token Validation Script
 *
 * Compares source DTCG token files against generated CSS output to ensure
 * every source token has a corresponding CSS custom property in tokens.css.
 *
 * Usage: npm run validate-tokens
 * Exit code 1 on validation failure.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
// Multi-file token sources after the 4-tier split (Phase 1).
// base.tokens.json — T1 primitives (cga + brand-locked aiDraft)
// web.tokens.json — T2 web semantics + typography/spacing/shadow/etc.
// dimensions.tokens.json — T3 cross-platform DOS dimensions
// effects-params.tokens.json — T4 phosphor shader parameters
const TOKEN_SOURCE_PATHS = [
  path.join(ROOT, 'src/tokens/base.tokens.json'),
  path.join(ROOT, 'src/tokens/web.tokens.json'),
  path.join(ROOT, 'src/tokens/dimensions.tokens.json'),
  path.join(ROOT, 'src/tokens/effects-params.tokens.json'),
];
const TOKENS_CSS_PATH = path.join(ROOT, 'src/styles/tokens.css');

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Convert camelCase to kebab-case (matches Style Dictionary transform) */
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Keys that are DTCG metadata, not token entries */
const META_KEYS = new Set(['$type', '$value', '$description']);

/**
 * Deep-merge `source` into `target`. Recurses on plain-object keys; later sources
 * take precedence on leaf collisions. Used to combine the 4 tier token files
 * into a single object for walk-and-validate.
 */
function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
}

/**
 * Walk the DTCG token tree and collect expected CSS variable names.
 *
 * A node is a "leaf token" if it has a `$value` property.
 * Otherwise it's a group, and we recurse into its children.
 */
function collectExpectedVars(obj, prefix = '') {
  const vars = [];

  for (const [key, value] of Object.entries(obj)) {
    if (META_KEYS.has(key)) continue;

    const segment = toKebabCase(key);
    const varName = prefix ? `${prefix}-${segment}` : segment;

    if (value && typeof value === 'object' && '$value' in value) {
      // Leaf token
      vars.push(`--${varName}`);
    } else if (value && typeof value === 'object') {
      // Group node -- recurse
      vars.push(...collectExpectedVars(value, varName));
    }
  }

  return vars;
}

/**
 * Parse CSS file and extract all custom property declarations.
 * Returns a Set of variable names like "--color-cga-black".
 */
function parseCssVars(cssContent) {
  const vars = new Set();
  // Match custom property declarations: --name: value;
  const regex = /^\s*(--.+?):/gm;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    vars.add(match[1].trim());
  }
  return vars;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

/**
 * Theme T1-only invariant — per Phase 0j ce-doc-review.
 *
 * Theme files (theme.*.tokens.json) build with `createThemeConfig` which
 * sources only [base.tokens.json, theme.{name}.tokens.json] — they cannot
 * resolve references to tokens outside that scope. base.tokens.json contains
 * Tier 1 primitives (color.cga.*) and the brand-locked aiDraft+aiDraftGlow.
 *
 * This invariant catches a future theme file that accidentally references
 * a token from web/dimensions/effects-params (e.g. `{spacing.4}`) — Style
 * Dictionary would emit a broken-reference warning at theme-build time, but
 * we want the failure earlier and louder.
 *
 * Allowed reference prefixes from theme files:
 *   - color.cga.*
 *   - color.semantic.text.aiDraft (brand-locked, lives in base for theme inheritance)
 *   - color.semantic.text.aiDraftGlow (same)
 */
const THEME_ALLOWED_REF_PREFIXES = [
  'color.cga.',
  'color.semantic.text.aiDraft',
  'color.semantic.text.aiDraftGlow',
];

function validateThemeReferences() {
  const issues = [];
  const themeFiles = fs.readdirSync(path.join(ROOT, 'src/tokens'))
    .filter(f => f.startsWith('theme.') && f.endsWith('.tokens.json'));

  for (const file of themeFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'src/tokens', file), 'utf8');
    // Find every {token.path.reference} in the JSON file
    const refs = [...content.matchAll(/\{([a-zA-Z][a-zA-Z0-9._-]+)\}/g)];
    for (const m of refs) {
      const refPath = m[1];
      if (!THEME_ALLOWED_REF_PREFIXES.some(p => refPath === p.replace(/\.$/, '') || refPath.startsWith(p))) {
        issues.push(`  ${file}: references {${refPath}} — themes may only reference Tier 1 primitives (color.cga.* or color.semantic.text.aiDraft[Glow])`);
      }
    }
  }
  return issues;
}

function main() {
  console.log('Token Validation');
  console.log('================\n');

  // Theme T1-only invariant (per Phase 0j ce-doc-review)
  const themeIssues = validateThemeReferences();
  if (themeIssues.length > 0) {
    console.log('THEME T1-ONLY INVARIANT VIOLATIONS:');
    for (const issue of themeIssues) console.log(issue);
    console.log('');
    console.log('Themes can only reference tokens that exist in base.tokens.json.');
    console.log('To use a non-T1 token from a theme, either (a) add web.tokens.json to');
    console.log('createThemeConfig source array (bloats every theme.css), or');
    console.log('(b) promote the referenced token to base.tokens.json.\n');
    process.exit(1);
  }

  // 1. Read source tokens — merge all 4 tier files into a single object so the
  //    walk covers the entire surface. JSON merge is shallow per top-level key;
  //    deeper merging isn't needed because the 4 files were designed to have
  //    non-overlapping namespaces (the only overlap, color.semantic.text.aiDraft,
  //    lives only in base.tokens.json).
  const sourceTokens = {};
  for (const p of TOKEN_SOURCE_PATHS) {
    if (!fs.existsSync(p)) {
      console.error(`ERROR: Source token file not found: ${p}`);
      process.exit(1);
    }
    const fileTokens = JSON.parse(fs.readFileSync(p, 'utf8'));
    deepMerge(sourceTokens, fileTokens);
  }

  // 2. Read generated CSS
  if (!fs.existsSync(TOKENS_CSS_PATH)) {
    console.error(`ERROR: Generated CSS file not found: ${TOKENS_CSS_PATH}`);
    console.error('Run "npm run build-tokens" first.');
    process.exit(1);
  }
  const cssContent = fs.readFileSync(TOKENS_CSS_PATH, 'utf8');

  // 3. Collect expected vars from source JSON
  const expectedVars = collectExpectedVars(sourceTokens);
  const expectedSet = new Set(expectedVars);

  // 4. Parse actual CSS vars
  const actualSet = parseCssVars(cssContent);

  console.log(`Source tokens: ${expectedVars.length} variables expected`);
  console.log(`Generated CSS: ${actualSet.size} variables found\n`);

  // 5. Compare: missing from CSS (source has it, CSS doesn't)
  const missing = expectedVars.filter(v => !actualSet.has(v));

  // 6. Compare: extra in CSS (CSS has it, source doesn't)
  const extra = [...actualSet].filter(v => !expectedSet.has(v));

  // 7. Report
  let hasErrors = false;

  if (missing.length > 0) {
    hasErrors = true;
    console.log(`MISSING from CSS (${missing.length}):`);
    for (const v of missing) {
      console.log(`  - ${v}`);
    }
    console.log('');
  }

  if (extra.length > 0) {
    // Extra variables are a warning, not an error -- Style Dictionary may
    // emit derived variables (e.g. semantic tokens with outputReferences).
    console.log(`EXTRA in CSS (${extra.length}) -- not in source JSON:`);
    for (const v of extra) {
      console.log(`  ~ ${v}`);
    }
    console.log('  (Extra vars are informational; these may be derived semantic tokens.)\n');
  }

  // 8. Value spot-checks for non-reference tokens
  // Compare resolved values from tokens.json (the flat JS output) against CSS
  const tokensJsonPath = path.join(ROOT, 'src/styles/tokens.json');
  let valueIssues = [];

  if (fs.existsSync(tokensJsonPath)) {
    const resolvedTokens = JSON.parse(fs.readFileSync(tokensJsonPath, 'utf8'));
    valueIssues = checkValues(resolvedTokens, cssContent);
  }

  if (valueIssues.length > 0) {
    hasErrors = true;
    console.log(`VALUE MISMATCHES (${valueIssues.length}):`);
    for (const issue of valueIssues) {
      console.log(`  - ${issue.variable}: JSON="${issue.jsonValue}" CSS="${issue.cssValue}"`);
    }
    console.log('');
  }

  // 9. Summary
  if (hasErrors) {
    console.log('VALIDATION FAILED');
    process.exit(1);
  } else {
    console.log('All source tokens have matching CSS variables.');
    console.log('VALIDATION PASSED');
  }
}

/**
 * Spot-check values: compare tokens.json (resolved flat values) against
 * CSS declarations. Only checks primitive (non-reference) tokens --
 * semantic tokens use var() references and are expected to differ.
 */
function checkValues(resolvedTokens, cssContent) {
  const issues = [];

  // Build a map of CSS variable -> value from the CSS content
  const cssMap = new Map();
  const regex = /^\s*(--.+?):\s*(.+?)\s*;/gm;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    let value = match[2].trim();
    // Strip inline CSS comments /** ... */
    value = value.replace(/\/\*\*.*?\*\//g, '').trim();
    cssMap.set(match[1].trim(), value);
  }

  // Walk resolved tokens and compare flat values
  // Only check color.cga.*, spacing.*, shadow.*, duration.*, opacity.*
  // Skip semantic tokens (they use var() references in CSS)
  function walkResolved(obj, prefix) {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);
      const cssVarName = `--${varName}`;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        walkResolved(value, varName);
      } else {
        // Leaf -- compare
        const cssValue = cssMap.get(cssVarName);
        if (cssValue === undefined) continue; // Handled by missing check

        // Skip var() references (semantic tokens)
        if (cssValue.startsWith('var(')) continue;

        // Normalize for comparison (pass varName for format-specific handling)
        const normalizedJson = normalizeValue(String(value), cssVarName);
        const normalizedCss = normalizeValue(cssValue, cssVarName);

        if (normalizedJson !== normalizedCss) {
          issues.push({
            variable: cssVarName,
            jsonValue: String(value),
            cssValue: cssValue
          });
        }
      }
    }
  }

  walkResolved(resolvedTokens, '');
  return issues;
}

/**
 * Normalize a color value to a canonical [R, G, B, A] array for comparison.
 * Handles hex-with-alpha vs rgba() equivalence, accounting for rounding
 * differences between Style Dictionary's JS and CSS transforms.
 */
function normalizeColor(v) {
  v = v.toLowerCase().trim();

  // Parse 8-digit hex (#RRGGBBAA)
  const hex8 = v.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
  if (hex8) {
    const r = parseInt(hex8[1], 16);
    const g = parseInt(hex8[2], 16);
    const b = parseInt(hex8[3], 16);
    const a = parseInt(hex8[4], 16) / 255;
    // Round alpha to 2 decimal places for comparison tolerance
    return `rgba(${r}, ${g}, ${b}, ${round2(a)})`;
  }

  // Parse 6-digit hex (#RRGGBB)
  const hex6 = v.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
  if (hex6) {
    return v; // No alpha ambiguity, keep as-is
  }

  // Normalize rgba() to consistent format with rounded alpha
  const rgba = v.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/);
  if (rgba) {
    return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${round2(parseFloat(rgba[4]))})`;
  }

  return v;
}

/** Round to 2 decimal places */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Normalize font-family strings for comparison.
 * Strips quotes and extra whitespace, compares the list of family names.
 */
function normalizeFontFamily(v) {
  // Remove all quotes (single and double), then split on comma, trim each
  return v.replace(/['"]/g, '').split(',').map(s => s.trim()).join(', ');
}

/**
 * Normalize a value for comparison, dispatching to format-specific
 * normalizers as needed.
 */
function normalizeValue(v, varName) {
  v = v.toLowerCase().trim();

  // Font family tokens
  if (varName && varName.includes('font-family')) {
    return normalizeFontFamily(v);
  }

  // Color-like values (hex with alpha or rgba)
  if (v.startsWith('#') || v.startsWith('rgba(')) {
    return normalizeColor(v);
  }

  return v;
}

main();
