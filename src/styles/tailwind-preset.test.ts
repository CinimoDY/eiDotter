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

import { readFileSync } from 'fs';
import { resolve } from 'path';

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
    // The generator auto-registers tailwindcss-animate and tailwindcss-react-aria-components
    // via require-if-available. Both are devDependencies, so both should resolve in this repo.
    // Array.isArray alone passes even if both silently fell back to null — this assertion
    // catches the consumer-visible regression where plugins never reach Tailwind.
    expect(preset.plugins.length).toBeGreaterThanOrEqual(2);
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

  it('boxShadow includes the 24 colored glow tokens added in #282', () => {
    const shadows = preset.theme.extend.boxShadow;
    const glowKeys = Object.keys(shadows).filter((k) => /^dos-glow[A-Z]/.test(k));
    // 4 sizes (Xs, Sm, Md, Lg) × 6 colors (Red, Green, Cyan, Magenta, Blue, White) + 4 default amber = 28
    expect(glowKeys.length).toBeGreaterThanOrEqual(24);
  });

  it('boxShadow.dos-glowMdRed resolves to the expected CGA red glow', () => {
    expect(preset.theme.extend.boxShadow['dos-glowMdRed']).toBe('0px 0px 20px 0px #FF555580');
  });

  it('fontFamily.dos ships Flexi IBM VGA True + monospace fallback (restored in 0.19.3)', () => {
    // Exact-match to lock the stack. See base.tokens.json fontFamily.primary.$description:
    // the monospace fallback preserves terminal aesthetic when @font-face fails.
    // Use `font-dos-fallback` (bare monospace) for fail-loud diagnostic behavior instead.
    expect(preset.theme.extend.fontFamily.dos).toEqual([
      '"Flexi IBM VGA True"',
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
 * Parity contract: every key in `style-dictionary.config.mjs`'s `semanticVarMap`
 * must exist as a key in `preset.theme.extend.colors`.
 *
 * PR #291 added `--color-semantic-text-muted` to the map but did not regenerate
 * the preset. The documented `text-dos-text-muted` Tailwind utility silently
 * resolved to nothing in consumer code. When this test fails, run
 * `npm run build-tokens` and commit the regenerated `tailwind.preset.cjs`.
 */
describe('tailwind.preset.cjs ↔ style-dictionary semanticVarMap', () => {
  // Extract semanticVarMap keys by regex. Importing the ESM config into Jest's
  // CJS sandbox is more invasive; the regex is narrow and locked to the single
  // `semanticVarMap = { ... };` block.
  const configSource = readFileSync(
    resolve(__dirname, '../../style-dictionary.config.mjs'),
    'utf8',
  );
  const blockMatch = configSource.match(
    /semanticVarMap\s*=\s*\{([\s\S]*?)\};/,
  );
  if (!blockMatch) {
    throw new Error(
      'Could not locate `semanticVarMap = { ... };` in style-dictionary.config.mjs. ' +
        'Update the regex in tailwind-preset.test.ts if the config was refactored.',
    );
  }
  const expectedKeys = [...blockMatch[1].matchAll(/'([a-z0-9-]+)'\s*:/g)].map(
    (m) => m[1],
  );

  it('extracts a non-empty key list from style-dictionary.config.mjs', () => {
    expect(expectedKeys.length).toBeGreaterThan(0);
  });

  it.each(expectedKeys)(
    'preset.theme.extend.colors exposes `%s`',
    (key) => {
      expect(preset.theme.extend.colors).toHaveProperty(key);
    },
  );

  it('every semanticVarMap key resolves to a var(--*) reference', () => {
    for (const key of expectedKeys) {
      const value = preset.theme.extend.colors[key];
      expect(typeof value).toBe('string');
      expect(value).toMatch(/^var\(--[a-z0-9-]+\)$/);
    }
  });
});
