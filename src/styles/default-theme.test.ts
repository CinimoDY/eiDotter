/**
 * Pure Amber, its old name, and dos-86 (DMNC-1643 PR D).
 *
 * - The rename: `amber-mono` became `pure-amber`, and the old name keeps
 *   working. Both `[data-theme]` names and both `.theme-*` classes must give
 *   identical computed custom properties.
 * - The default does not change in this PR: the bare `:root` and the bundled
 *   theme resolve exactly as they did before (fixture captured from main).
 * - dos-86 is Pure Amber with honest functional colours: it may differ only in
 *   the functional roles and the hue primitives, and every functional pair it
 *   draws reads at WCAG AA.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import baseline from './__fixtures__/default-theme-baseline.json';

const stylesDir = __dirname;
const read = (f: string) => readFileSync(resolve(stylesDir, f), 'utf-8');

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const parse = (css: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const m of stripComments(css).matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
};
/** Every custom property with its var() chain resolved, lowercased. */
const resolveAll = (decls: Record<string, string>): Record<string, string> => {
  const res = (v: string, depth = 0): string => {
    if (depth > 12) throw new Error(`var() chain too deep: ${v}`);
    return v.replace(/var\(--([\w-]+)(?:\s*,\s*([^()]*))?\)/g, (_, name: string, fallback?: string) =>
      decls[name] !== undefined ? res(decls[name], depth + 1) : (fallback ?? `UNRESOLVED(${name})`),
    );
  };
  return Object.fromEntries(Object.keys(decls).sort().map((k) => [k, res(decls[k]).toLowerCase()]));
};
/** The theme applied on <html> (its rules over :root), as the sites set it. */
const resolvedTheme = (file: string) => resolveAll({ ...parse(read('tokens.css')), ...parse(read(file)) });
const pickBaselineKeys = (m: Record<string, string>) =>
  Object.fromEntries(Object.entries(m).filter(([k]) => /^(color|shadow|focus-ring)-/.test(k)));

describe('Pure Amber answers to amber-mono (DMNC-1643 alias)', () => {
  const css = read('theme.pure-amber.css');

  it('is one rule whose selector lists both names and both classes', () => {
    const rules = [...stripComments(css).matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim());
    expect(rules).toEqual([
      '[data-theme="pure-amber"], [data-theme="amber-mono"], .theme-pure-amber, .theme-amber-mono',
    ]);
  });

  describe('computed custom properties (jsdom cascade)', () => {
    let style: HTMLStyleElement;
    beforeAll(() => {
      style = document.createElement('style');
      style.textContent = read('tokens.css') + '\n' + css;
      document.head.appendChild(style);
    });
    afterAll(() => style.remove());

    const computed = (setup: (el: HTMLElement) => void): Record<string, string> => {
      const el = document.createElement('div');
      setup(el);
      document.body.appendChild(el);
      const cs = getComputedStyle(el);
      const out: Record<string, string> = {};
      for (let i = 0; i < cs.length; i++) {
        const name = cs.item(i);
        if (name.startsWith('--')) out[name] = cs.getPropertyValue(name).trim();
      }
      el.remove();
      return out;
    };

    it('[data-theme="amber-mono"], [data-theme="pure-amber"], .theme-amber-mono and .theme-pure-amber are identical', () => {
      const byName = computed((el) => el.setAttribute('data-theme', 'pure-amber'));
      expect(Object.keys(byName).length).toBeGreaterThan(50);
      expect(computed((el) => el.setAttribute('data-theme', 'amber-mono'))).toEqual(byName);
      expect(computed((el) => el.classList.add('theme-pure-amber'))).toEqual(byName);
      expect(computed((el) => el.classList.add('theme-amber-mono'))).toEqual(byName);
    });

    it('and they are the theme, not the bare :root', () => {
      const themed = computed((el) => el.setAttribute('data-theme', 'amber-mono'));
      expect(themed['--color-semantic-text-primary']).toBe('var(--color-cga-amber)');
      // jsdom lists only the custom properties declared on an element, so the
      // bare value is read from <html>, where the :root rule applies.
      const bare = getComputedStyle(document.documentElement).getPropertyValue('--color-semantic-text-primary').trim();
      expect(bare).toBe('var(--color-cga-light-gray)');
    });
  });
});

describe('the default is unchanged by PR D (fixture captured from main before DMNC-1643 PR D)', () => {
  it('bare :root resolves exactly as before', () => {
    expect(pickBaselineKeys(resolveAll(parse(read('tokens.css'))))).toEqual(baseline.root);
  });

  it('the bundled theme (data-theme="amber-mono", now Pure Amber) resolves exactly as before', () => {
    expect(pickBaselineKeys(resolvedTheme('theme.pure-amber.css'))).toEqual(baseline.bundled);
  });

  it('src/index.ts still bundles Pure Amber and only Pure Amber', () => {
    const index = readFileSync(resolve(stylesDir, '..', 'index.ts'), 'utf-8');
    expect(index.match(/import '\.\/styles\/theme\.[\w-]+\.css';/g)).toEqual(["import './styles/theme.pure-amber.css';"]);
  });
});

describe('dos-86: Pure Amber with honest functional colours', () => {
  const pure = resolvedTheme('theme.pure-amber.css');
  const dos86 = resolvedTheme('theme.dos-86.css');

  // The roles DMNC-1643 makes honest, and the hue primitives they come from.
  // Everything else (ground, text, borders, links, focus ring, brand, AI
  // provenance, glows) must stay exactly Pure Amber.
  const FUNCTIONAL = [
    ...['error', 'success', 'warning', 'info'].map((k) => `color-semantic-text-${k}`),
    ...['error', 'success', 'warning', 'info'].map((k) => `color-semantic-status-${k}`),
    ...['error', 'success', 'warning', 'info'].map((k) => `color-semantic-alert-${k}`),
    'color-semantic-border-error',
    'color-semantic-border-success',
    'color-semantic-background-error',
    'color-semantic-glow-error',
  ];
  const HUE_PRIMITIVES = [
    'blue', 'green', 'cyan', 'red', 'magenta', 'yellow', 'white',
    'bright-blue', 'bright-green', 'bright-cyan', 'bright-red', 'bright-magenta',
  ].map((k) => `color-cga-${k}`);

  it('declares the same custom properties as Pure Amber, plus only the focus-ring colour', () => {
    const own = (f: string) => Object.keys(parse(read(f))).sort();
    const extra = own('theme.dos-86.css').filter((k) => !own('theme.pure-amber.css').includes(k));
    expect(extra).toEqual(['color-semantic-text-warning', 'focus-ring-color']);
  });

  it('differs from Pure Amber only in functional roles and hue primitives', () => {
    const changed = Object.keys(pure).filter((k) => pure[k] !== dos86[k]).sort();
    expect(changed.filter((k) => !FUNCTIONAL.includes(k) && !HUE_PRIMITIVES.includes(k))).toEqual([]);
    // Every functional role does change (none was left pinned to amber), except
    // background.success, which Pure Amber already inherits honest (#00aa00).
    expect(FUNCTIONAL.filter((k) => !changed.includes(k))).toEqual([]);
    expect(dos86['color-semantic-background-success']).toBe(pure['color-semantic-background-success']);
  });

  it('keeps the AI-provenance colours, brand roles and focus ring', () => {
    for (const k of [
      'color-semantic-text-ai-draft', 'color-semantic-text-ai-draft-glow',
      'color-semantic-text-ai-gradient-from', 'color-semantic-text-ai-gradient-to',
      'color-semantic-text-ai-gradient-from-light', 'color-semantic-text-ai-gradient-to-light',
      'color-semantic-text-primary', 'color-semantic-text-accent', 'color-semantic-border-default',
      'color-semantic-border-focus', 'color-semantic-border-hover', 'color-semantic-background-primary',
      'color-semantic-background-brand', 'focus-ring-color',
    ]) {
      expect([k, dos86[k]]).toEqual([k, pure[k]]);
    }
  });

  // The DOS-86 terminal theme's role layer: error = signal.red, success =
  // signal.greenBright, warning = signal.yellow, info = signal.cyan; the alert
  // grounds include its added/removed line fills.
  it.each([
    ['text-error', '#ff5555'], ['text-success', '#55ff55'], ['text-warning', '#ffff55'], ['text-info', '#00aaaa'],
    ['status-error', '#ff5555'], ['status-success', '#55ff55'], ['status-warning', '#ffff55'], ['status-info', '#00aaaa'],
    ['border-error', '#ff5555'], ['border-success', '#55ff55'],
    ['background-error', '#aa0000'],
    ['alert-success', '#122010'], ['alert-error', '#430500'], ['alert-info', '#0a1828'], ['alert-warning', '#352800'],
  ])('%s resolves to the honest %s', (role, hex) => {
    expect(dos86[`color-semantic-${role}`]).toBe(hex);
  });

  describe('contrast of the functional pairs (WCAG 2.1)', () => {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (fg: string, bg: string) => {
      const [hi, lo] = [lum(dos86[`color-semantic-${fg}`]), lum(dos86[`color-semantic-${bg}`])].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    const GROUNDS = ['background-primary', 'background-secondary', 'alert-info', 'alert-success', 'alert-warning', 'alert-error'];
    const TEXT = ['text-error', 'text-success', 'text-warning', 'text-info', 'status-error', 'status-success', 'status-warning', 'status-info'];

    it.each(TEXT)('%s reads at 4.5:1 on the ground, the card surface and every alert ground', (fg) => {
      const low = GROUNDS.map((bg) => [bg, Math.round(ratio(fg, bg) * 100) / 100] as const).filter(([, r]) => r < 4.5);
      expect(low).toEqual([]);
    });

    it.each(['border-error', 'border-success'])('%s reaches 3:1 (non-text) on the ground and card surface', (fg) => {
      expect(ratio(fg, 'background-primary')).toBeGreaterThanOrEqual(3);
      expect(ratio(fg, 'background-secondary')).toBeGreaterThanOrEqual(3);
    });

    it('Button destructive: text-white on background-error reaches 4.5:1', () => {
      expect(ratio('text-white', 'background-error')).toBeGreaterThanOrEqual(4.5);
    });

    it('body text still reads on every alert ground', () => {
      for (const bg of GROUNDS) expect(ratio('text-primary', bg)).toBeGreaterThanOrEqual(4.5);
    });
  });
});
