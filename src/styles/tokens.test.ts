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
