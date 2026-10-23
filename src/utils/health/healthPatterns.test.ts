/** @jest-environment node */
import { readFileSync } from 'fs';
import { join } from 'path';

const css = readFileSync(join(__dirname, '../../styles/health-patterns.css'), 'utf8');
const code = css.replace(/\/\*[\s\S]*?\*\//g, '');

describe('health-patterns.css', () => {
  it('declares the four pattern classes', () => {
    for (const p of ['solid', 'dither', 'hatch', 'dotted']) {
      expect(code).toContain(`.eidotter-fill--${p}`);
    }
  });

  it('has a forced-colors block and a print block with print-color-adjust: exact', () => {
    expect(code).toMatch(/@media \(forced-colors: active\)/);
    const print = code.slice(code.indexOf('@media print'));
    expect(print).toMatch(/print-color-adjust: exact/);
  });

  it('has contrast and reduced-motion blocks', () => {
    expect(code).toMatch(/@media \(prefers-contrast: high\)/);
    expect(code).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });

  it('uses no hex colours and no var() fallbacks', () => {
    expect(code).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(code).not.toMatch(/var\([^)]*,/);
  });
});
