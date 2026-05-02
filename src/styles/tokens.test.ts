import { readFileSync } from 'fs';
import { resolve } from 'path';
import baseTokens from '../tokens/base.tokens.json';
import generatedTokens from './tokens.json';

/**
 * Contract tests: Flexi IBM VGA True is single-weight (400).
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
      expect(baseTokens.typography.fontWeight[weight].$value).toBe(400);
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
 * Contract tests: `font-dos` ships Flexi IBM VGA True + monospace fallback.
 *
 * PR #282 (hand-written → generated preset) briefly emitted the primary stack
 * without the `monospace` fallback; PR #289 restored it via source-token edit.
 * These assertions lock the CSS-variable and tokens.js surfaces in addition to
 * the Tailwind preset assertion at src/styles/tailwind-preset.test.ts — so a
 * future generator change has to fail THREE tests to silently drop the fallback.
 *
 * See base.tokens.json fontFamily.primary.$description for rationale.
 */
describe('Font-family fallback contract', () => {
  it('source token fontFamily.primary.$value ends in monospace', () => {
    expect(baseTokens.typography.fontFamily.primary.$value).toEqual([
      'Flexi IBM VGA True',
      'monospace',
    ]);
  });

  it('source token fontFamily.fallback.$value stays intentionally bare', () => {
    expect(baseTokens.typography.fontFamily.fallback.$value).toEqual(['monospace']);
  });

  it('generated tokens.js typography.fontFamily.primary includes both entries', () => {
    expect(generatedTokens.typography.fontFamily.primary).toEqual([
      'Flexi IBM VGA True',
      'monospace',
    ]);
  });

  it('CSS variable --typography-font-family-primary contains Flexi + monospace', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(
      `--typography-font-family-primary: 'Flexi IBM VGA True', monospace;`,
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
  // ---- Source ----
  it('source token semantic.text.aiDraft equals Signalnoise hot pink', () => {
    expect((baseTokens as any).color.semantic.text.aiDraft.$value).toBe('#FF1A8C');
  });

  it('source token semantic.text.aiDraftGlow is 50% rgba of the aiDraft hex', () => {
    // #FF1A8C = rgb(255, 26, 140). Glow at 50% alpha.
    expect((baseTokens as any).color.semantic.text.aiDraftGlow.$value).toBe(
      'rgba(255, 26, 140, 0.5)',
    );
  });

  // ---- Source ↔ generated cross-check ----
  it('source aiDraft hex (lowercased) matches the hex emitted in tokens.css', () => {
    const sourceHex = (baseTokens as any).color.semantic.text.aiDraft.$value.toLowerCase();
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
  it('provenance.css applies the token via [data-provenance="ai-draft"]', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-provenance="ai-draft"\]\s*\{/);
    expect(css).toContain('var(--color-semantic-text-ai-draft)');
  });

  it('provenance.css uses the glow token, not a hardcoded rgba', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toContain('var(--color-semantic-text-ai-draft-glow)');
    // Body of the rule must not contain a literal rgba(...) — guards future
    // drift where an editor copies the colour back inline.
    const ruleBody = css.match(/\[data-provenance="ai-draft"\]\s*\{[^}]*\}/)?.[0] ?? '';
    expect(ruleBody).not.toMatch(/rgba\(/);
  });

  it('provenance.css neutralizes the phosphor halo under prefers-contrast: high', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/@media\s*\(prefers-contrast:\s*high\)/);
    expect(css).toMatch(/text-shadow:\s*none/);
  });

  // ---- Bundle wiring ----
  it('src/index.ts imports provenance.css so the rule reaches the default bundle', () => {
    const indexTs = readFileSync(resolve(__dirname, '..', 'index.ts'), 'utf-8');
    expect(indexTs).toMatch(/import\s+['"]\.\/styles\/provenance\.css['"];/);
  });
});
