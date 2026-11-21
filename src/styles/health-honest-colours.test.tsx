/**
 * The health family's rule under honest colours (DMNC-1643 PR D): tone is never
 * the only signal. Each filled tone pairs a hue with its own pattern and the
 * value is always written out, in dos-86 (honest red, green, yellow, cyan) as in
 * Pure Amber. Colour may now carry meaning, but it must never carry it alone.
 */
import React from 'react';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { render, screen } from '@testing-library/react';
import { Meter } from '../components/Meter';

const TONE_PATTERN = [
  ['info', 'eidotter-fill--solid'],
  ['success', 'eidotter-fill--dither'],
  ['warning', 'eidotter-fill--hatch'],
  ['critical', 'eidotter-fill--dotted'],
] as const;

const read = (f: string) => readFileSync(resolve(__dirname, f), 'utf-8');
const parse = (css: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
};
const resolveVar = (name: string, decls: Record<string, string>, depth = 0): string => {
  const v = decls[name];
  if (!v || depth > 8) throw new Error(`unresolved --${name}`);
  const ref = v.match(/^var\(--([\w-]+)\)$/);
  return ref ? resolveVar(ref[1], decls, depth + 1) : v.toLowerCase();
};
const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// The tone → fill token mapping, read from the stylesheet itself.
const healthCss = read('health-patterns.css').replace(/\/\*[\s\S]*?\*\//g, '');
const toneFillToken = (tone: string) =>
  healthCss.match(new RegExp(`\\.eidotter-tone--${tone}\\s*\\{\\s*--eidotter-fill:\\s*var\\(--([\\w-]+)\\)`))?.[1];

describe('health family under dos-86: tone is never the only signal', () => {
  it.each(TONE_PATTERN)('a %s Meter carries its own pattern and its value as text', (tone, pattern) => {
    const { container } = render(
      <div data-theme="dos-86">
        <Meter label="Sample" value={56} unit="units" tone={tone} />
      </div>,
    );
    const root = container.querySelector('.eidotter-meter')!;
    expect(root).toHaveClass(`eidotter-tone--${tone}`);
    expect(container.querySelector('.eidotter-meter__fill')).toHaveClass(pattern);
    expect(screen.getByText('Sample')).toBeInTheDocument();
    expect(root.textContent).toMatch(/56/);
  });

  it('every filled tone has a fill token and a pattern of its own (four distinct patterns)', () => {
    for (const [tone] of TONE_PATTERN) expect(toneFillToken(tone)).toBeDefined();
    expect(new Set(TONE_PATTERN.map(([, p]) => p)).size).toBe(4);
  });

  describe('the tone fills under dos-86', () => {
    const decls = { ...parse(read('tokens.css')), ...parse(read('theme.dos-86.css')) };
    const fill = (tone: string) => resolveVar(toneFillToken(tone)!, decls);
    const ground = resolveVar('color-semantic-background-primary', decls);
    const card = resolveVar('color-semantic-background-secondary', decls);

    it('are honest colours, four different hues', () => {
      expect(TONE_PATTERN.map(([tone]) => fill(tone))).toEqual(['#00aaaa', '#00aa00', '#ffff55', '#aa0000']);
    });

    // WCAG 1.4.11 asks 3:1 for graphical objects. Info, success and warning
    // pass on the ground and the card surface.
    it.each(['info', 'success', 'warning'])('%s fill reaches 3:1 on the ground and the card surface', (tone) => {
      expect(contrast(fill(tone), ground)).toBeGreaterThanOrEqual(3);
      expect(contrast(fill(tone), card)).toBeGreaterThanOrEqual(3);
    });

    // Reported, not tuned (DMNC-1643 PR D): the critical fill is
    // background.error, the honest destructive red #AA0000, which is 2.66:1
    // on the #050300 ground and 2.69:1 on the card (Pure Amber's amberDim fill
    // is 3.72:1). The same
    // pair already exists under cga-amber (2.66:1). The dotted pattern and the
    // written value still carry the meaning; the colour choice is Dom's.
    it.todo('critical fill reaches 3:1 on the ground under dos-86 (2.66:1 today, reported for a decision; PR E resolves it)');
  });
});
