/**
 * Contract tests for `tailwind.preset.cjs` — the generated Tailwind preset.
 *
 * PR #282 consolidated three preset files into one auto-generated .cjs emitted
 * by Style Dictionary. These assertions pin the output shape so generator
 * changes don't silently drop tokens or alter the consumer-facing structure.
 *
 * If a test here fails, either the generator changed (expected — update the
 * assertion) or the source tokens moved out from under the preset (unexpected —
 * investigate why).
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const preset = require('../../tailwind.preset.cjs') as {
  theme: {
    extend: {
      colors: Record<string, string>;
      fontFamily: Record<string, string[]>;
      fontSize: Record<string, string>;
      lineHeight: Record<string, string>;
      fontWeight: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      boxShadow: Record<string, string>;
    };
  };
  plugins: unknown[];
};

describe('tailwind.preset.cjs — top-level shape', () => {
  it('exports an object with theme.extend and plugins array', () => {
    expect(preset).toBeDefined();
    expect(preset.theme).toBeDefined();
    expect(preset.theme.extend).toBeDefined();
    expect(Array.isArray(preset.plugins)).toBe(true);
  });

  it('plugins array is populated (catches silent try/catch fallback to null)', () => {
    // The generator auto-registers tailwindcss-react-aria-components and
    // tailwindcss-animate via require-if-available. Since the Tailwind v4
    // migration only react-aria-components is a devDependency here —
    // tailwindcss-animate is unused by eidotter itself (no animate-*
    // utilities in src/) but stays offered to v3 consumers that install it.
    // Array.isArray alone passes even if everything silently fell back to
    // null — this assertion catches the consumer-visible regression where
    // the React Aria state variants never reach Tailwind.
    expect(preset.plugins.length).toBeGreaterThanOrEqual(1);
  });

  it.each([
    'colors',
    'fontFamily',
    'fontSize',
    'lineHeight',
    'fontWeight',
    'spacing',
    'borderRadius',
    'boxShadow',
  ] as const)('theme.extend.%s is a non-empty object', (key) => {
    const value = preset.theme.extend[key];
    expect(typeof value).toBe('object');
    expect(Object.keys(value as object).length).toBeGreaterThan(0);
  });
});

describe('tailwind.preset.cjs — representative token spot-checks', () => {
  it('colors contains the CGA amber primary', () => {
    expect(preset.theme.extend.colors['cga-amber']).toBeDefined();
  });

  it('colors exposes dos-bg-primary as a CSS var reference for theme switching', () => {
    expect(preset.theme.extend.colors['dos-bg-primary']).toMatch(/var\(--color-semantic-background-primary\)/);
  });

  it('colors exposes dos-text-ai-draft as a CSS var reference (DMNC-884 phase 1)', () => {
    expect(preset.theme.extend.colors['dos-text-ai-draft']).toMatch(/var\(--color-semantic-text-ai-draft\)/);
  });

  it('boxShadow includes the 24 colored glow tokens added in #282', () => {
    const shadows = preset.theme.extend.boxShadow;
    const glowKeys = Object.keys(shadows).filter((k) => /^dos-glow[A-Z]/.test(k));
    // 4 sizes (Xs, Sm, Md, Lg) × 6 colors (Red, Green, Cyan, Magenta, Blue, White) + 4 default amber = 28
    expect(glowKeys.length).toBeGreaterThanOrEqual(24);
  });

  it('boxShadow.dos-glowMdRed resolves to the expected CGA red glow', () => {
    expect(preset.theme.extend.boxShadow['dos-glowMdRed']).toBe('0px 0px 20px 0px #FF555580');
  });

  it('fontFamily.dos ships Perfect DOS VGA 437 + monospace fallback (font swap landed in 0.22.0)', () => {
    // Exact-match to lock the stack. See base.tokens.json fontFamily.primary.$description:
    // the monospace fallback preserves terminal aesthetic when @font-face fails.
    // Use `font-dos-fallback` (bare monospace) for fail-loud diagnostic behavior instead.
    expect(preset.theme.extend.fontFamily.dos).toEqual([
      '"Perfect DOS VGA 437"',
      'monospace',
    ]);
  });

  it('fontFamily.dos-fallback stays intentionally bare (diagnostic escape hatch)', () => {
    expect(preset.theme.extend.fontFamily['dos-fallback']).toEqual(['monospace']);
  });

  it('fontSize.dos-text-md is 1.375rem (22px)', () => {
    expect(preset.theme.extend.fontSize['dos-text-md']).toBe('1.375rem');
  });

  it('fontWeight.dos-regular is "400" (Flexi is single-weight)', () => {
    expect(preset.theme.extend.fontWeight['dos-regular']).toBe('400');
  });

  it('borderRadius caps at dos-base (4px) per eidotter style rules', () => {
    expect(preset.theme.extend.borderRadius['dos-base']).toBe('4px');
  });
});

/**
 * Parity contract: every leaf in `color.semantic.*` from the source token files
 * (`base.tokens.json` for the brand-locked aiDraft, `web.tokens.json` for the
 * rest of the semantic tree) must surface in `preset.theme.extend.colors` as
 * a CSS-var reference under the `--color-semantic-...` namespace.
 *
 * Asserts presence, not insertion order — the generator was refactored from a
 * hardcoded `semanticVarMap` to a tree-walk derivation in Phase 1.9 (per the
 * 2026-05-08 ce-doc-review). Tree-walk order differs from the old hand-curated
 * order; consumer-visible behavior is unchanged because Tailwind preset shape
 * is order-independent.
 *
 * Why this matters: PR #291 added `--color-semantic-text-muted` to the old
 * map but didn't regenerate the preset. The documented `text-dos-text-muted`
 * Tailwind utility silently resolved to nothing in consumer code. Walking the
 * source tree and asserting CSS-var presence catches that whole class of drift.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const baseTokens = require('../tokens/base.tokens.json') as Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webTokens = require('../tokens/web.tokens.json') as Record<string, unknown>;

function toKebab(s: string) {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Walk a color.semantic.<category>.<...> subtree and yield expected CSS var names.
// Mirrors the generator's path → CSS var rule: --color-semantic-<category>-<kebab(key)>.
// aiDraftGlow is intentionally excluded (text-shadow-only, not a Tailwind utility).
function collectSemanticCssVars(
  semantic: Record<string, unknown>,
): string[] {
  const vars: string[] = [];
  for (const [category, sub] of Object.entries(semantic)) {
    if (category.startsWith('$')) continue;
    if (!sub || typeof sub !== 'object') continue;
    for (const [key, token] of Object.entries(sub as Record<string, unknown>)) {
      if (key.startsWith('$')) continue;
      if (key === 'aiDraftGlow') continue; // text-shadow only
      if (!token || typeof token !== 'object') continue;
      if (!('$value' in (token as Record<string, unknown>))) continue;
      vars.push(`--color-semantic-${category}-${toKebab(key)}`);
    }
  }
  return vars;
}

describe('tailwind.preset.cjs ↔ source semantic tokens (presence parity)', () => {
  const baseSemantic =
    ((baseTokens.color as Record<string, unknown>)?.semantic as Record<string, unknown>) ?? {};
  const webSemantic =
    ((webTokens.color as Record<string, unknown>)?.semantic as Record<string, unknown>) ?? {};
  const expectedCssVars = [
    ...collectSemanticCssVars(baseSemantic),
    ...collectSemanticCssVars(webSemantic),
  ];

  // Index preset.theme.extend.colors values by the var name they reference
  // → utility key, for fast lookup
  const varToUtility = new Map<string, string>();
  for (const [utilityKey, value] of Object.entries(preset.theme.extend.colors)) {
    const m = String(value).match(/^var\((--[a-z0-9-]+)\)$/);
    if (m) varToUtility.set(m[1], utilityKey);
  }

  it('source semantic tree has at least one token (smoke check)', () => {
    expect(expectedCssVars.length).toBeGreaterThan(0);
  });

  it.each(expectedCssVars)(
    'preset.theme.extend.colors references `%s` via some utility key',
    (cssVar) => {
      expect(varToUtility.has(cssVar)).toBe(true);
    },
  );

  it('every utility that references a semantic CSS var follows the dos-* naming convention', () => {
    const SEMANTIC_VAR_PREFIX = '--color-semantic-';
    for (const [utilityKey, value] of Object.entries(preset.theme.extend.colors)) {
      const v = String(value);
      // Detect references via substring (lint-token-refs scans var() literals)
      if (!v.startsWith(`var(${SEMANTIC_VAR_PREFIX}`)) continue;
      expect(utilityKey).toMatch(/^dos(-[a-z0-9-]+)?$/);
    }
  });
});
