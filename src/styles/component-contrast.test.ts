/**
 * Component colour pairings, checked in every theme.
 *
 * tokens.test.ts checks token pairs (text-on-accent on background-accent and
 * so on). These tests check the pairs components actually draw, which can
 * cross roles: a pressed Button is text on brand-bright, a coloured Tag or
 * FilterBar item is text on a consumer fill. Each case first pins the CSS
 * rule (so a refactor cannot swap the token silently), then computes the
 * WCAG 2.1 ratio from the generated theme files.
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const stylesDir = __dirname;
const componentsDir = resolve(__dirname, '../components');

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const parse = (css: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const m of stripComments(css).matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
};
const resolveVar = (name: string, decls: Record<string, string>, depth = 0): string => {
  const v = decls[name];
  if (!v || depth > 8) throw new Error(`unresolved --${name}`);
  const ref = v.match(/^var\(--([\w-]+)\)$/);
  return ref ? resolveVar(ref[1], decls, depth + 1) : v.toLowerCase();
};

type RGB = [number, number, number];
const hexToRgb = (hex: string): RGB => {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) throw new Error(`not a 6-digit hex: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) as RGB;
};
const hslToRgb = (h: number, s: number, l: number): RGB => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((c) => Math.round(c * 255)) as RGB;
};
const luminance = ([r, g, b]: RGB) => {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (a: RGB, b: RGB) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const base = parse(readFileSync(resolve(stylesDir, 'tokens.css'), 'utf-8'));
const themes = readdirSync(stylesDir)
  .filter((f) => /^theme\..+\.css$/.test(f))
  .map((f) => ({
    name: f.replace(/^theme\.|\.css$/g, ''),
    decls: { ...base, ...parse(readFileSync(resolve(stylesDir, f), 'utf-8')) },
  }));

const ratio = (decls: Record<string, string>, fg: string, bg: string) =>
  contrast(hexToRgb(resolveVar(fg, decls)), hexToRgb(resolveVar(bg, decls)));

/** Every theme's ratio for fg on bg, as `{ theme: ratio }` rounded to 2dp. */
const ratiosBelow = (fg: string, bg: string, min: number) =>
  Object.fromEntries(
    themes
      .map((t) => [t.name, Math.round(ratio(t.decls, fg, bg) * 100) / 100] as const)
      .filter(([, r]) => r < min),
  );

const componentCss = (rel: string) => stripComments(readFileSync(resolve(componentsDir, rel), 'utf-8'));
/** The declaration block of the first rule whose selector list contains `selector`. */
const ruleBody = (css: string, selector: string): string => {
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (m[1].split(',').some((s) => s.trim() === selector)) return m[2];
  }
  throw new Error(`no rule for ${selector}`);
};

describe('component contrast pairings, every theme', () => {
  it('covers all seven themes', () => {
    expect(themes.map((t) => t.name).sort()).toEqual(
      ['amber-mono', 'amber-paper', 'cga-amber', 'cga-mode4-p0', 'cga-mode4-p1', 'cga-mode5', 'light'],
    );
  });

  describe('Button primary pressed', () => {
    it('draws text-on-brand on background-brand-bright', () => {
      const body = ruleBody(componentCss('Button/components/Button.css'), '.eidotter-btn--primary:not([disabled])[data-pressed]');
      expect(body).toMatch(/background-color:\s*var\(--color-semantic-background-brand-bright\)/);
      expect(body).toMatch(/(^|[\s;])color:\s*var\(--color-semantic-text-on-brand\)/);
    });

    it('reaches 4.5:1', () => {
      expect(ratiosBelow('color-semantic-text-on-brand', 'color-semantic-background-brand-bright', 4.5)).toEqual({});
    });
  });

  // The fills the Tag and FilterBar docs recommend for the `color` prop.
  const RECOMMENDED_FILLS = [
    'color-cga-bright-cyan',
    'color-cga-bright-green',
    'color-cga-yellow',
    'color-cga-light-gray',
    'color-semantic-background-brand',
  ];

  describe('Tag filled and FilterBar active with a consumer fill', () => {
    it('Tag draws text-on-brand on a custom fill', () => {
      const body = ruleBody(componentCss('Tag/components/Tag.css'), '.eidotter-tag--filled[style*="--tag-color"]');
      expect(body).toMatch(/color:\s*var\(--color-semantic-text-on-brand\)/);
    });

    it('FilterBar draws text-on-brand on a custom fill', () => {
      const body = ruleBody(
        componentCss('FilterBar/components/FilterBar.css'),
        '.eidotter-filter-bar__item--active[style*="--filter-bar-item-color"]',
      );
      expect(body).toMatch(/(^|[\s;])color:\s*var\(--color-semantic-text-on-brand\)/);
    });

    it.each(RECOMMENDED_FILLS)('text-on-brand on --%s reaches 4.5:1', (fill) => {
      expect(ratiosBelow('color-semantic-text-on-brand', fill, 4.5)).toEqual({});
    });
  });

  describe('shadcn shim accent pair', () => {
    const shim = readFileSync(resolve(stylesDir, 'shadcn.css'), 'utf-8');
    const blocks = [...shim.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
    const channel = (body: string, name: string): RGB => {
      const m = body.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)%\\s+(\\d+)%`));
      if (!m) throw new Error(`no --${name}`);
      return hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
    };

    it('maps accent-foreground to text-on-accent', () => {
      const script = readFileSync(resolve(__dirname, '../../scripts/generate-shadcn-shim.mjs'), 'utf-8');
      expect(script).toMatch(/'accent-foreground':\s*'color-semantic-text-on-accent'/);
    });

    it.each(themes.map((t) => t.name))('%s: accent-foreground on accent reaches 4.5:1', (name) => {
      const block = blocks.find((b) => b.sel.includes(`[data-theme="${name}"]`));
      expect(block).toBeDefined();
      const r = contrast(channel(block!.body, 'accent-foreground'), channel(block!.body, 'accent'));
      expect(r).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('high-contrast media queries', () => {
    // `prefers-contrast: high` is the legacy value; current browsers report
    // `more`. A query that names only `high` never matches them (DMNC-1598).
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = resolve(dir, e.name);
        if (e.isDirectory()) return walk(p);
        return e.name.endsWith('.css') ? [p] : [];
      });

    it('every (prefers-contrast: high) query also matches (prefers-contrast: more)', () => {
      const root = resolve(__dirname, '..');
      const offenders = walk(root).flatMap((f) =>
        [...stripComments(readFileSync(f, 'utf-8')).matchAll(/@media([^{]*)\{/g)]
          .map((m) => m[1].trim())
          .filter((q) => q.includes('prefers-contrast: high') && !q.includes('prefers-contrast: more'))
          .map((q) => `${f.slice(root.length + 1)}: ${q}`),
      );
      expect(offenders).toEqual([]);
    });
  });

  describe('IconButton focus ring', () => {
    it('is a 2px border-focus outline', () => {
      const body = ruleBody(componentCss('IconButton/components/IconButton.css'), '.eidotter-icon-button[data-focus-visible]');
      expect(body).toMatch(/outline:\s*2px solid var\(--color-semantic-border-focus\)/);
    });

    it.each(['color-semantic-background-primary', 'color-semantic-background-secondary'])(
      'border-focus on --%s reaches 3:1 (non-text)',
      (bg) => {
        expect(ratiosBelow('color-semantic-border-focus', bg, 3)).toEqual({});
      },
    );
  });
});
