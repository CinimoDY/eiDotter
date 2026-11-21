/**
 * Pure Amber, its old name, and dos-86 (DMNC-1643 PR D and PR E).
 *
 * - The rename: `amber-mono` became `pure-amber`, and the old name keeps
 *   working. Both `[data-theme]` names and both `.theme-*` classes must give
 *   identical computed custom properties.
 * - The default (PR E): the bundled default theme is dos-86, the theme
 *   DisplayMenu resolves to without a `dosDark`. Pure Amber still resolves
 *   exactly as the default did before (fixture captured from main at 0.46.1),
 *   so the migration recipe (`dosDark: 'pure-amber'`) keeps a site as it was.
 *   The bare `:root` (a page that sets no `data-theme`) is unchanged.
 * - dos-86 is Pure Amber with honest functional colours: it may differ only in
 *   the functional roles and the hue primitives, and every functional pair it
 *   draws reads at WCAG AA.
 * - Typography (PR F): under dos-86, and so under the default, component text
 *   is the body face and headings the display face; every other theme, Pure
 *   Amber included, resolves its font families exactly as before PR F.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import baseline from './__fixtures__/default-theme-baseline.json';
import typographyBaseline from './__fixtures__/typography-baseline.json';
import { resolveDisplayTheme } from '../utils/displayTheme';

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

describe('the default is dos-86 (DMNC-1643 PR E)', () => {
  const themeFile = (name: string) => `theme.${name === 'amber-mono' ? 'pure-amber' : name}.css`;
  const DARK = { dos: true, light: false };

  it('bare :root resolves exactly as before: a page with no data-theme does not change', () => {
    expect(pickBaselineKeys(resolveAll(parse(read('tokens.css'))))).toEqual(baseline.root);
  });

  it('DisplayMenu resolves to dos-86 by default, and that theme is the bundled default in the fixture', () => {
    expect(resolveDisplayTheme(DARK)).toBe('dos-86');
    expect(pickBaselineKeys(resolvedTheme(themeFile(resolveDisplayTheme(DARK))))).toEqual(baseline.bundled);
  });

  it('Pure Amber still resolves exactly as the default did before (captured from main at 0.46.1)', () => {
    expect(pickBaselineKeys(resolvedTheme('theme.pure-amber.css'))).toEqual(baseline.pureAmber);
  });

  it.each(['pure-amber', 'amber-mono'])(
    'migration recipe: themes={{ dosDark: "%s" }} gives the previous default exactly',
    (dosDark) => {
      const name = resolveDisplayTheme(DARK, { dosDark });
      expect(name).toBe(dosDark);
      expect(pickBaselineKeys(resolvedTheme(themeFile(name)))).toEqual(baseline.pureAmber);
      // LIGHT is still amber-paper under either dark theme.
      expect(resolveDisplayTheme({ dos: true, light: true }, { dosDark })).toBe('amber-paper');
    },
  );

  it('the bare :root is neither theme (documented in the migration file)', () => {
    const root = pickBaselineKeys(resolveAll(parse(read('tokens.css'))));
    expect(root).not.toEqual(baseline.bundled);
    expect(root).not.toEqual(baseline.pureAmber);
    // Its ground is Pure Amber's, not the dos-86 screen.
    expect(root['color-semantic-background-primary']).toBe(baseline.pureAmber['color-semantic-background-primary']);
  });

  it('typography of the default: under dos-86 component text is the body face, headings the display face (PR F)', () => {
    const fam = (t: string) => resolvedTheme(themeFile(t));
    const dflt = fam(resolveDisplayTheme(DARK));
    expect(dflt['typography-font-family-primary']).toBe("'jetbrains mono nerd font', monospace");
    expect(dflt['typography-font-family-heading']).toBe("'perfect dos vga 437', monospace");
  });

  it.each(['pure-amber', 'amber-mono'])('migration recipe (%s) keeps the display face everywhere, as the 0.46 default', (dosDark) => {
    const now = Object.fromEntries(
      Object.entries(resolvedTheme(themeFile(resolveDisplayTheme(DARK, { dosDark })))).filter(([k]) => k.startsWith('typography-font-family-')),
    );
    expect(now).toEqual({ ...typographyBaseline.themes['pure-amber'], 'typography-font-family-heading': "'perfect dos vga 437', monospace" });
    expect(now['typography-font-family-primary']).toBe("'perfect dos vga 437', monospace");
  });

  it('src/index.ts bundles dos-86 and Pure Amber, and only those', () => {
    const index = readFileSync(resolve(stylesDir, '..', 'index.ts'), 'utf-8');
    expect(index.match(/import '\.\/styles\/theme\.[\w-]+\.css';/g)).toEqual([
      "import './styles/theme.dos-86.css';",
      "import './styles/theme.pure-amber.css';",
    ]);
  });
});

describe('dos-86: Pure Amber with honest functional colours', () => {
  const pure = resolvedTheme('theme.pure-amber.css');
  const dos86 = resolvedTheme('theme.dos-86.css');

  // The roles DMNC-1643 makes honest, the hue primitives they come from, and
  // the DOS-86 screen colour (#050300, where Pure Amber's ground is #020003)
  // with the near-black roles that read it. Everything else (text, borders,
  // links, focus ring, brand, card surface, AI provenance, glows) must stay
  // exactly Pure Amber.
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
  const SCREEN = [
    'color-cga-black',
    'color-semantic-background-primary',
    'color-semantic-text-on-accent',
    'color-semantic-text-on-brand',
    'color-semantic-text-on-light',
  ];

  it('declares the same custom properties as Pure Amber, plus only the focus-ring colour', () => {
    const own = (f: string) => Object.keys(parse(read(f))).sort();
    const extra = own('theme.dos-86.css').filter((k) => !own('theme.pure-amber.css').includes(k));
    // PR F adds the component text family (pointed at the body face).
    expect(extra).toEqual(['color-semantic-text-warning', 'focus-ring-color', 'typography-font-family-primary']);
  });

  // PR F: the component text family (body face under dos-86); see the typography tests below.
  const TYPOGRAPHY = ['typography-font-family-primary'];

  it('differs from Pure Amber only in functional roles, hue primitives, the screen colour and the text family', () => {
    const changed = Object.keys(pure).filter((k) => pure[k] !== dos86[k]).sort();
    expect(changed.filter((k) => ![...FUNCTIONAL, ...HUE_PRIMITIVES, ...SCREEN, ...TYPOGRAPHY].includes(k))).toEqual([]);
    for (const k of SCREEN) expect([k, dos86[k]]).toEqual([k, '#050300']);
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
      'color-semantic-border-focus', 'color-semantic-border-hover', 'color-semantic-background-secondary',
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
    ['background-error', '#b90000'],
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

describe('DosFigure annotation pins keep their hue under dos-86 (DMNC-1643)', () => {
  const css = stripComments(
    readFileSync(resolve(stylesDir, '..', 'components', 'DosFigure', 'components', 'DosFigure.css'), 'utf-8'),
  );
  const rule = (selector: string) =>
    [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find((m) => m[1].trim() === selector)?.[2] ?? '';

  it('the base rules still read the yellow primitive, so every other theme renders as before', () => {
    expect(rule('.eidotter-dos-figure__pin')).toMatch(/(^|[\s;])color:\s*var\(--color-cga-yellow\)/);
    expect(rule('.eidotter-dos-figure__pin-dot')).toMatch(/solid var\(--color-cga-yellow\)/);
  });

  it('under dos-86 they take text-accent, which equals Pure Amber\'s yellow', () => {
    const scope = ':is([data-theme="dos-86"], .theme-dos-86)';
    expect(rule(`${scope} .eidotter-dos-figure__pin`)).toMatch(/color:\s*var\(--color-semantic-text-accent\)/);
    expect(rule(`${scope} .eidotter-dos-figure__pin-dot`)).toMatch(/border-color:\s*var\(--color-semantic-text-accent\)/);
    expect(resolvedTheme('theme.dos-86.css')['color-semantic-text-accent']).toBe(
      resolvedTheme('theme.pure-amber.css')['color-cga-yellow'],
    );
  });
});

/*
 * DMNC-1643 PR F: the typeface under dos-86. Two family roles: `heading`
 * (headings, display numbers, the brand; always the display face) and
 * `primary` (all other component text; `font-dos`). dos-86 points primary at
 * the body face; every other theme keeps both on the display face.
 */
const DISPLAY = "'perfect dos vga 437', monospace";
const BODY = "'jetbrains mono nerd font', monospace";
const ALL_THEMES = Object.keys(typographyBaseline.themes);
const pickFamilies = (m: Record<string, string>) =>
  Object.fromEntries(Object.entries(m).filter(([k]) => k.startsWith('typography-font-family-')));

describe('typography: every theme but dos-86 resolves its font families as before PR F', () => {
  it('bare :root keeps primary, body and fallback, and heading is the display face', () => {
    const now = pickFamilies(resolveAll(parse(read('tokens.css'))));
    expect(now).toEqual({ ...typographyBaseline.root, 'typography-font-family-heading': DISPLAY });
  });

  it.each(ALL_THEMES.filter((t) => t !== 'dos-86'))('%s: identical families, heading = primary = display face', (theme) => {
    const now = pickFamilies(resolvedTheme(`theme.${theme}.css`));
    const before = (typographyBaseline.themes as Record<string, Record<string, string>>)[theme];
    expect(now).toEqual({ ...before, 'typography-font-family-heading': DISPLAY });
    expect(now['typography-font-family-primary']).toBe(DISPLAY);
  });

  it('dos-86: component text in the body face, headings in the display face', () => {
    const now = pickFamilies(resolvedTheme('theme.dos-86.css'));
    expect(now['typography-font-family-primary']).toBe(BODY);
    expect(now['typography-font-family-body']).toBe(BODY);
    expect(now['typography-font-family-heading']).toBe(DISPLAY);
  });
});

/**
 * Element-level resolution without a browser: walk up from an element, take the
 * first font-family that applies (a font-dos* utility from the preset, or a
 * single-class rule in the component's CSS), and resolve its var() chain over
 * :root, the theme, and every custom property the ancestors declare (closest
 * wins), as the cascade would.
 */
describe('typography: elements resolve to the right face (DMNC-1643 PR F)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const preset = require('../../tailwind.preset.cjs') as { theme: { extend: { fontFamily: Record<string, string[]> } } };
  const families = preset.theme.extend.fontFamily;
  const componentCss = (name: string) =>
    stripComments(readFileSync(resolve(stylesDir, '..', 'components', name, 'components', `${name}.css`), 'utf-8'));
  const singleClassRules = (css: string) => {
    const rules = new Map<string, Record<string, string>>();
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const sel = m[1].trim();
      if (!/^\.[\w-]+$/.test(sel)) continue;
      const decls: Record<string, string> = {};
      for (const d of m[2].matchAll(/([\w-]+)\s*:\s*([^;]+);/g)) decls[d[1]] = d[2].trim();
      rules.set(sel.slice(1), { ...rules.get(sel.slice(1)), ...decls });
    }
    return rules;
  };

  const faceOf = (el: Element, theme: string, cssFiles: string[]): string => {
    const rules = new Map<string, Record<string, string>>();
    for (const f of cssFiles) for (const [k, v] of singleClassRules(componentCss(f))) rules.set(k, { ...rules.get(k), ...v });
    const chain: Element[] = [];
    for (let n: Element | null = el; n; n = n.parentElement) chain.push(n);
    let family: string | undefined;
    let familyAt = -1;
    chain.forEach((n, i) => {
      if (family) return;
      for (const cls of Array.from(n.classList)) {
        const m = /^font-(dos(?:-heading|-body|-fallback)?)$/.exec(cls);
        if (m && families[m[1]]) { family = families[m[1]].join(', '); familyAt = i; return; }
        const ff = rules.get(cls)?.['font-family'];
        if (ff && ff !== 'inherit') { family = ff; familyAt = i; return; }
      }
    });
    if (!family) throw new Error('no font-family found');
    // Custom properties declared from the element that sets the family upwards.
    const ancestorDecls: Record<string, string> = {};
    for (const n of chain.slice(familyAt).reverse()) {
      for (const cls of Array.from(n.classList)) {
        for (const [k, v] of Object.entries(rules.get(cls) ?? {})) if (k.startsWith('--')) ancestorDecls[k.slice(2)] = v;
      }
    }
    const decls = { ...parse(read('tokens.css')), ...parse(read(`theme.${theme}.css`)), ...ancestorDecls };
    const probe = resolveAll({ ...decls, '__probe': family })['__probe'];
    // The first face in the resolved stack decides (the fallbacks are monospace).
    if (probe.startsWith("'jetbrains mono nerd font'") || probe.startsWith('"jetbrains mono nerd font"')) return 'body';
    if (probe.startsWith("'perfect dos vga 437'") || probe.startsWith('"perfect dos vga 437"')) return 'display';
    return `other(${probe})`;
  };

  /* eslint-disable @typescript-eslint/no-require-imports */
  const { render } = require('@testing-library/react') as typeof import('@testing-library/react');
  const React = require('react') as typeof import('react');
  const { Stat } = require('../components/Stat') as typeof import('../components/Stat');
  const { DosWindow } = require('../components/DosWindow') as typeof import('../components/DosWindow');
  const { SectionHeading } = require('../components/SectionHeading') as typeof import('../components/SectionHeading');
  const { Button } = require('../components/Button') as typeof import('../components/Button');
  const { Terminal } = require('../components/Terminal') as typeof import('../components/Terminal');
  const { CommandPrompt } = require('../components/CommandPrompt') as typeof import('../components/CommandPrompt');
  const { ChatMessage } = require('../components/Chat') as typeof import('../components/Chat');
  /* eslint-enable @typescript-eslint/no-require-imports */

  it('Stat under dos-86: the value (display number) and the label resolve to different faces', () => {
    const { getByText } = render(React.createElement(Stat, { label: 'STEPS', value: '8421' }));
    expect(faceOf(getByText('8421'), 'dos-86', ['Stat'])).toBe('display');
    expect(faceOf(getByText('STEPS'), 'dos-86', ['Stat'])).toBe('body');
    // Pure Amber: both stay on the display face.
    expect(faceOf(getByText('8421'), 'pure-amber', ['Stat'])).toBe('display');
    expect(faceOf(getByText('STEPS'), 'pure-amber', ['Stat'])).toBe('display');
  });

  it('DosWindow under dos-86: the strip title is display, the body text is body', () => {
    const { getByText } = render(
      React.createElement(DosWindow, { title: 'SYSTEM' }, React.createElement('p', null, 'Window body copy')),
    );
    expect(faceOf(getByText('SYSTEM'), 'dos-86', ['DosWindow'])).toBe('display');
    expect(faceOf(getByText('Window body copy'), 'dos-86', ['DosWindow'])).toBe('body');
    expect(faceOf(getByText('Window body copy'), 'pure-amber', ['DosWindow'])).toBe('display');
  });

  it('a body label (Button) resolves to the body face under dos-86 and the display face elsewhere', () => {
    const { getByRole } = render(React.createElement(Button, null, 'SAVE'));
    expect(faceOf(getByRole('button'), 'dos-86', [])).toBe('body');
    for (const t of ALL_THEMES.filter((x) => x !== 'dos-86')) expect([t, faceOf(getByRole('button'), t, [])]).toEqual([t, 'display']);
  });

  it('SectionHeading is display in every theme', () => {
    const { getByRole } = render(React.createElement(SectionHeading, { title: 'TASKS' }));
    for (const t of ALL_THEMES) expect([t, faceOf(getByRole('heading'), t, [])]).toEqual([t, 'display']);
  });

  it('Terminal and CommandPrompt keep the bitmap (display) face under dos-86, including Chat content in a Terminal', () => {
    const { getByText, container } = render(
      React.createElement(
        Terminal,
        { title: 'ADOS' },
        React.createElement(ChatMessage, { role: 'assistant', content: 'Ready.' }),
      ),
    );
    const term = container.querySelector('.terminal') as Element;
    expect(faceOf(term, 'dos-86', ['Terminal'])).toBe('display');
    expect(faceOf(getByText('Ready.', { exact: false }), 'dos-86', ['Terminal'])).toBe('display');
    const prompt = render(React.createElement(CommandPrompt, { onCommand: () => {} })).container.querySelector('.command-prompt') as Element;
    expect(faceOf(prompt, 'dos-86', ['CommandPrompt'])).toBe('display');
  });
});

describe('warnings read as yellow under dos-86, not brand amber (DMNC-1643 PR E)', () => {
  const dos86 = resolvedTheme('theme.dos-86.css');
  const pure = resolvedTheme('theme.pure-amber.css');
  const componentCss = (name: string) =>
    stripComments(readFileSync(resolve(stylesDir, '..', 'components', name, 'components', `${name}.css`), 'utf-8'));
  const rule = (css: string, selector: string) =>
    [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find((m) => m[1].trim() === selector)?.[2] ?? '';
  const scope = ':is([data-theme="dos-86"], .theme-dos-86)';

  it.each([
    ['Alert', '.eidotter-alert--warning'],
    ['Notification', '.eidotter-notification--warning'],
  ])('%s: the base rule keeps the brand colour (every other theme as before); dos-86 takes text-warning', (name, cls) => {
    const css = componentCss(name);
    expect(rule(css, cls)).toMatch(/color:\s*var\(--color-semantic-text-brand\)/);
    expect(rule(css, `${scope} ${cls}`)).toMatch(/color:\s*var\(--color-semantic-text-warning\)/);
  });

  it('the warning roles resolve to the honest yellow under dos-86 and stay Pure Amber\'s under pure-amber', () => {
    for (const k of ['text-warning', 'status-warning']) {
      expect([k, dos86[`color-semantic-${k}`]]).toEqual([k, '#ffff55']);
    }
    expect(pure['color-semantic-text-warning']).toBe(pure['color-cga-amber']);
    expect(pure['color-semantic-status-warning']).toBe('#e5b936');
  });

  it('the yellow is not the brand amber or the accent yellow', () => {
    expect(dos86['color-semantic-text-warning']).not.toBe(dos86['color-semantic-text-brand']);
    expect(dos86['color-semantic-text-warning']).not.toBe(dos86['color-semantic-text-accent']);
  });

  it('the yellow reads at 4.5:1 on the screen, the card and the warning alert ground', () => {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a: string, b: string) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    const yellow = dos86['color-semantic-text-warning'];
    for (const bg of ['background-primary', 'background-secondary', 'alert-warning']) {
      expect([bg, ratio(yellow, dos86[`color-semantic-${bg}`]) >= 4.5]).toEqual([bg, true]);
    }
  });
});
