import { readFileSync } from 'fs';
import { resolve } from 'path';
import baseTokens from '../tokens/base.tokens.json';
import webTokens from '../tokens/web.tokens.json';
import generatedTokens from './tokens.json';

/**
 * Contract tests: Perfect DOS VGA 437 is single-weight (400).
 * All font-weight tokens must resolve to 400 — no bold variant exists.
 * See base.tokens.json fontWeight.$description for rationale.
 */
describe('Font-weight token contract', () => {
  it.each(['regular', 'semibold', 'bold'] as const)(
    'generated token fontWeight.%s equals 400',
    (weight) => {
      expect(generatedTokens.typography.fontWeight[weight]).toBe(400);
    },
  );

  it.each(['regular', 'semibold', 'bold'] as const)(
    'source token fontWeight.%s.$value equals 400',
    (weight) => {
      expect(webTokens.typography.fontWeight[weight].$value).toBe(400);
    },
  );

  it.each(['regular', 'semibold', 'bold'] as const)(
    'CSS variable --typography-font-weight-%s contains 400',
    (weight) => {
      const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
      expect(css).toContain(`--typography-font-weight-${weight}: 400;`);
    },
  );
});

/**
 * Contract tests: `font-dos` ships Perfect DOS VGA 437 + monospace fallback.
 *
 * PR #282 (hand-written → generated preset) briefly emitted the primary stack
 * without the `monospace` fallback; PR #289 restored it via source-token edit.
 * These assertions lock the CSS-variable and tokens.js surfaces in addition to
 * the Tailwind preset assertion at src/styles/tailwind-preset.test.ts — so a
 * future generator change has to fail THREE tests to silently drop the fallback.
 *
 * 0.22.0 swapped the primary font from Flexi IBM VGA True (bezier-outline,
 * "resembling" pixel) to Perfect DOS VGA 437 (axis-aligned vector outlines,
 * authentic DOS pixel-art shapes). Tests now assert the new family name.
 *
 * See base.tokens.json fontFamily.primary.$description for rationale.
 */
describe('Font-family fallback contract', () => {
  it('source token fontFamily.primary.$value ends in monospace', () => {
    expect(webTokens.typography.fontFamily.primary.$value).toEqual([
      'Perfect DOS VGA 437',
      'monospace',
    ]);
  });

  it('source token fontFamily.fallback.$value stays intentionally bare', () => {
    expect(webTokens.typography.fontFamily.fallback.$value).toEqual(['monospace']);
  });

  it('generated tokens.js typography.fontFamily.primary includes both entries', () => {
    expect(generatedTokens.typography.fontFamily.primary).toEqual([
      'Perfect DOS VGA 437',
      'monospace',
    ]);
  });

  it('CSS variable --typography-font-family-primary contains Perfect DOS VGA 437 + monospace', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(
      `--typography-font-family-primary: 'Perfect DOS VGA 437', monospace;`,
    );
  });

  it('CSS variable --typography-font-family-fallback stays bare', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(`--typography-font-family-fallback: monospace;`);
  });
});

/**
 * Contract tests: AI-content provenance marker token (DMNC-884, phase 1).
 *
 * `--color-semantic-text-ai-draft` is intentionally brand-locked — it must
 * NOT theme-shift across amber-mono / cga-amber / cga-mode4-p0 /
 * cga-mode4-p1 / cga-mode5. The Signalnoise hot pink reads identically
 * everywhere so the "this is AI prose" signal is unmissable regardless of
 * active theme.
 *
 * Glow halo (`--color-semantic-text-ai-draft-glow`) is co-locked: 50% rgba
 * of the same hex. Single source of truth; no hardcoded rgba in CSS.
 *
 * See plans/2026-05-02-001-feat-ai-content-provenance-marker-plan.md.
 */
describe('AI-content provenance token contract', () => {
  type DtcgValue = { $value: string };
  const provenanceTokens = (
    baseTokens as unknown as {
      color: { semantic: { text: { aiDraft: DtcgValue; aiDraftGlow: DtcgValue } } };
    }
  ).color.semantic.text;

  // ---- Source ----
  it('source token semantic.text.aiDraft equals Signalnoise hot pink', () => {
    expect(provenanceTokens.aiDraft.$value).toBe('#FF1A8C');
  });

  it('source token semantic.text.aiDraftGlow is 50% rgba of the aiDraft hex', () => {
    // #FF1A8C = rgb(255, 26, 140). Glow at 50% alpha.
    expect(provenanceTokens.aiDraftGlow.$value).toBe('rgba(255, 26, 140, 0.5)');
  });

  // ---- Source ↔ generated cross-check ----
  it('source aiDraft hex (lowercased) matches the hex emitted in tokens.css', () => {
    const sourceHex = provenanceTokens.aiDraft.$value.toLowerCase();
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    const m = css.match(/--color-semantic-text-ai-draft:\s*(#[0-9a-fA-F]{6})/);
    expect(m).not.toBeNull();
    expect(m![1].toLowerCase()).toBe(sourceHex);
  });

  // ---- CSS variable emission (case-insensitive — guards style-dictionary formatter drift) ----
  it('global tokens.css emits --color-semantic-text-ai-draft', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c\s*;/i);
  });

  it('global tokens.css emits --color-semantic-text-ai-draft-glow', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toMatch(
      /--color-semantic-text-ai-draft-glow:\s*rgba\(\s*255\s*,\s*26\s*,\s*140\s*,\s*0\.5\s*\)\s*;/i,
    );
  });

  it.each([
    'amber-mono',
    'cga-amber',
    'cga-mode4-p0',
    'cga-mode4-p1',
    'cga-mode5',
  ] as const)(
    'theme.%s.css emits --color-semantic-text-ai-draft as the same Signalnoise pink (no theme drift)',
    (theme) => {
      const css = readFileSync(resolve(__dirname, `theme.${theme}.css`), 'utf-8');
      expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c\s*;/i);
    },
  );

  // ---- Selector + cascade behaviour ----
  // The provenance visual evolved from a solid Signalnoise-pink + halo
  // (Phase 1, DMNC-884) to a magenta→white→cyan gradient + shimmer
  // (DMNC-946, 2026-05-23). The selector contract is unchanged
  // (`data-provenance="ai-draft"`); the old aiDraft token values are
  // kept in the design system but no longer referenced from this
  // stylesheet. Tests below pin the new gradient design.
  it('provenance.css declares the canonical data-provenance="ai-draft" selector', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-provenance="ai-draft"\]/);
  });

  it('provenance.css applies the magenta→white→cyan gradient via background-clip: text', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/#FF55FF/i);
    expect(css).toMatch(/#FFFFFF/i);
    expect(css).toMatch(/#55FFFF/i);
    expect(css).toMatch(/background-clip:\s*text/i);
    expect(css).toMatch(/-webkit-text-fill-color:\s*transparent/i);
  });

  it('provenance.css supports the data-ai-block whole-section wrapper', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-ai-block\]/);
    expect(css).toMatch(/\[data-ai-block\][^{]*:is\([^)]*\bp\b[^)]*\)/);
  });

  it('provenance.css respects prefers-reduced-motion by disabling the shimmer', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\n\}/);
    expect(block?.[0] ?? '').toMatch(/animation:\s*none/i);
  });

  it('provenance.css emits the ai-text-shimmer keyframes for the gradient sweep', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/@keyframes\s+ai-text-shimmer/);
  });

  // ---- Bundle wiring ----
  it('src/index.ts imports provenance.css so the rule reaches the default bundle', () => {
    const indexTs = readFileSync(resolve(__dirname, '..', 'index.ts'), 'utf-8');
    expect(indexTs).toMatch(/import\s+['"]\.\/styles\/provenance\.css['"];/);
  });
});
