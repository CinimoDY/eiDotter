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
