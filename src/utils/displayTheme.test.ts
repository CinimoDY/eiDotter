import { resolveDisplayTheme, displayMenuItems, syncThemeColor, type DisplayState } from './displayTheme';

const DOS_ONLY = {};
const DOS_AND_MODERN_LIGHT = { modernLight: 'light' };
const DOS_AND_MODERN_BOTH = { modernLight: 'light', modernDark: 'modern-dark' };

describe('resolveDisplayTheme', () => {
  it('DOS-only site: LIGHT picks dos-86-light, otherwise dos-86 (the default since DMNC-1643 PR E)', () => {
    expect(resolveDisplayTheme({ dos: true, light: false }, DOS_ONLY)).toBe('dos-86');
    expect(resolveDisplayTheme({ dos: true, light: true }, DOS_ONLY)).toBe('dos-86-light');
    // dos is ignored when there is no modern theme
    expect(resolveDisplayTheme({ dos: false, light: true }, DOS_ONLY)).toBe('dos-86-light');
  });

  it('DOS + modern (light only): modern is light whatever LIGHT says', () => {
    expect(resolveDisplayTheme({ dos: true, light: true }, DOS_AND_MODERN_LIGHT)).toBe('dos-86-light');
    expect(resolveDisplayTheme({ dos: false, light: false }, DOS_AND_MODERN_LIGHT)).toBe('light');
  });

  it('DOS + modern light and dark: LIGHT switches modern brightness', () => {
    expect(resolveDisplayTheme({ dos: false, light: true }, DOS_AND_MODERN_BOTH)).toBe('light');
    expect(resolveDisplayTheme({ dos: false, light: false }, DOS_AND_MODERN_BOTH)).toBe('modern-dark');
  });

  it('dosLight: null keeps a DOS site dark', () => {
    expect(resolveDisplayTheme({ dos: true, light: true }, { dosLight: null })).toBe('dos-86');
  });

  it('the default dosLight follows the dark theme (DMNC-1643)', () => {
    const on = { dos: true, light: true };
    expect(resolveDisplayTheme(on, { dosDark: 'dos-86' })).toBe('dos-86-light');
    expect(resolveDisplayTheme(on, { dosDark: 'pure-amber' })).toBe('amber-paper');
    expect(resolveDisplayTheme(on, { dosDark: 'amber-mono' })).toBe('amber-paper');
    expect(resolveDisplayTheme(on, { dosDark: 'cga-amber' })).toBe('amber-paper');
  });

  it('an explicit dosLight is always respected', () => {
    const on = { dos: true, light: true };
    expect(resolveDisplayTheme(on, { dosDark: 'dos-86', dosLight: 'amber-paper' })).toBe('amber-paper');
    expect(resolveDisplayTheme(on, { dosDark: 'pure-amber', dosLight: 'dos-86-light' })).toBe('dos-86-light');
    expect(resolveDisplayTheme(on, { dosDark: 'dos-86', dosLight: null })).toBe('dos-86');
  });
});

describe('displayMenuItems', () => {
  const noop = () => {};

  it('DOS-only site: just the LIGHT row', () => {
    const items = displayMenuItems({ dos: true, light: false }, noop, DOS_ONLY);
    expect(items.map((i) => i.id)).toEqual(['light']);
    expect(items[0]).toMatchObject({ label: 'Light', checked: false });
    expect(items[0].disabled).toBeFalsy();
  });

  it('DOS + modern light: in modern mode only the DOS row (LIGHT hidden, not disabled)', () => {
    expect(displayMenuItems({ dos: false, light: false }, noop, DOS_AND_MODERN_LIGHT).map((i) => i.id)).toEqual(['dos']);
    expect(displayMenuItems({ dos: true, light: false }, noop, DOS_AND_MODERN_LIGHT).map((i) => i.id)).toEqual(['dos', 'light']);
  });

  it('never returns a disabled row', () => {
    for (const themes of [DOS_ONLY, DOS_AND_MODERN_LIGHT, DOS_AND_MODERN_BOTH]) {
      for (const dos of [true, false]) for (const light of [true, false]) {
        expect(displayMenuItems({ dos, light }, noop, themes).some((i) => i.disabled)).toBe(false);
      }
    }
  });

  it('DOS + modern light and dark: LIGHT is live in modern mode', () => {
    const items = displayMenuItems({ dos: false, light: false }, noop, DOS_AND_MODERN_BOTH);
    expect(items[1]).toMatchObject({ checked: false });
    expect(items[1].disabled).toBeFalsy();
  });

  it('onChange hands back the next state', () => {
    const onChange = jest.fn();
    const state: DisplayState = { dos: true, light: false };
    const items = displayMenuItems(state, onChange, DOS_AND_MODERN_LIGHT);
    items[0].onChange(false);
    expect(onChange).toHaveBeenLastCalledWith({ dos: false, light: false });
    items[1].onChange(true);
    expect(onChange).toHaveBeenLastCalledWith({ dos: true, light: true });
  });

  it('labels can be translated', () => {
    const items = displayMenuItems({ dos: true, light: true }, noop, DOS_AND_MODERN_LIGHT, { dos: 'DOS', light: 'Hell' });
    expect(items[1]).toMatchObject({ label: 'Hell' });
  });
});

/**
 * The pure variant (DMNC-1643). The full truth table: every site shape, with
 * and without `dosPure`, for DOS on/off × LIGHT on/off × PURE on/off. Each row
 * is [dos, light, pure, resolved theme, row ids]. Written out, not derived, so
 * the table is the spec.
 */
describe('pure variant truth table (DMNC-1643)', () => {
  const noop = () => {};
  type Row = [dos: boolean, light: boolean, pure: boolean, theme: string, ids: string[]];
  const T = true;
  const F = false;

  const SHAPES: { name: string; themes: object; rows: Row[] }[] = [
    {
      name: 'DOS-only, no dosPure',
      themes: { dosDark: 'dos-86' },
      rows: [
        [T, F, F, 'dos-86', ['light']], [T, F, T, 'dos-86', ['light']],
        [T, T, F, 'dos-86-light', ['light']], [T, T, T, 'dos-86-light', ['light']],
        // dos is ignored on a DOS-only site
        [F, F, F, 'dos-86', ['light']], [F, F, T, 'dos-86', ['light']],
        [F, T, F, 'dos-86-light', ['light']], [F, T, T, 'dos-86-light', ['light']],
      ],
    },
    {
      name: 'DOS-only, with dosPure',
      themes: { dosDark: 'dos-86', dosPure: 'pure-amber' },
      rows: [
        [T, F, F, 'dos-86', ['light', 'pure']], [T, F, T, 'pure-amber', ['light', 'pure']],
        [T, T, F, 'dos-86-light', ['light']], [T, T, T, 'dos-86-light', ['light']],
        [F, F, F, 'dos-86', ['light', 'pure']], [F, F, T, 'pure-amber', ['light', 'pure']],
        [F, T, F, 'dos-86-light', ['light']], [F, T, T, 'dos-86-light', ['light']],
      ],
    },
    {
      name: 'DOS + modern light, no dosPure',
      themes: { dosDark: 'dos-86', modernLight: 'light' },
      rows: [
        [T, F, F, 'dos-86', ['dos', 'light']], [T, F, T, 'dos-86', ['dos', 'light']],
        [T, T, F, 'dos-86-light', ['dos', 'light']], [T, T, T, 'dos-86-light', ['dos', 'light']],
        [F, F, F, 'light', ['dos']], [F, F, T, 'light', ['dos']],
        [F, T, F, 'light', ['dos']], [F, T, T, 'light', ['dos']],
      ],
    },
    {
      name: 'DOS + modern light, with dosPure',
      themes: { dosDark: 'dos-86', dosPure: 'pure-amber', modernLight: 'light' },
      rows: [
        [T, F, F, 'dos-86', ['dos', 'light', 'pure']], [T, F, T, 'pure-amber', ['dos', 'light', 'pure']],
        [T, T, F, 'dos-86-light', ['dos', 'light']], [T, T, T, 'dos-86-light', ['dos', 'light']],
        [F, F, F, 'light', ['dos']], [F, F, T, 'light', ['dos']],
        [F, T, F, 'light', ['dos']], [F, T, T, 'light', ['dos']],
      ],
    },
    {
      name: 'DOS + both modern, no dosPure',
      themes: { dosDark: 'dos-86', modernLight: 'light', modernDark: 'modern-dark' },
      rows: [
        [T, F, F, 'dos-86', ['dos', 'light']], [T, F, T, 'dos-86', ['dos', 'light']],
        [T, T, F, 'dos-86-light', ['dos', 'light']], [T, T, T, 'dos-86-light', ['dos', 'light']],
        [F, F, F, 'modern-dark', ['dos', 'light']], [F, F, T, 'modern-dark', ['dos', 'light']],
        [F, T, F, 'light', ['dos', 'light']], [F, T, T, 'light', ['dos', 'light']],
      ],
    },
    {
      name: 'DOS + both modern, with dosPure',
      themes: { dosDark: 'dos-86', dosPure: 'pure-amber', modernLight: 'light', modernDark: 'modern-dark' },
      rows: [
        [T, F, F, 'dos-86', ['dos', 'light', 'pure']], [T, F, T, 'pure-amber', ['dos', 'light', 'pure']],
        [T, T, F, 'dos-86-light', ['dos', 'light']], [T, T, T, 'dos-86-light', ['dos', 'light']],
        [F, F, F, 'modern-dark', ['dos', 'light']], [F, F, T, 'modern-dark', ['dos', 'light']],
        [F, T, F, 'light', ['dos', 'light']], [F, T, T, 'light', ['dos', 'light']],
      ],
    },
  ];

  const cases = SHAPES.flatMap((s) => s.rows.map((r) => [s.name, s.themes, ...r] as const));

  it('covers 6 site shapes × 8 states', () => {
    expect(cases).toHaveLength(48);
  });

  it.each(cases)('%s: dos=%s light=%s pure=%s → %s, rows %j', (_name, themes, dos, light, pure, theme, ids) => {
    const state: DisplayState = { dos, light, pure };
    expect(resolveDisplayTheme(state, themes)).toBe(theme);
    const items = displayMenuItems(state, noop, themes);
    expect(items.map((i) => i.id)).toEqual(ids);
    // Hide what does not apply: never a disabled row.
    expect(items.some((i) => i.disabled)).toBe(false);
    const pureRow = items.find((i) => i.id === 'pure');
    if (pureRow) expect(pureRow.checked).toBe(pure);
  });

  it('dosLight: null keeps PURE visible with LIGHT on (there is no light screen to hide it)', () => {
    const themes = { dosDark: 'dos-86', dosLight: null, dosPure: 'pure-amber' };
    expect(displayMenuItems({ dos: true, light: true, pure: true }, noop, themes).map((i) => i.id)).toEqual(['pure']);
    expect(resolveDisplayTheme({ dos: true, light: true, pure: true }, themes)).toBe('pure-amber');
  });

  it('state without `pure` (stored before DMNC-1643) is treated as pure off', () => {
    const themes = { dosDark: 'dos-86', dosPure: 'pure-amber' };
    const legacy = { dos: true, light: false } as DisplayState;
    expect(resolveDisplayTheme(legacy, themes)).toBe('dos-86');
    const pureRow = displayMenuItems(legacy, noop, themes).find((i) => i.id === 'pure')!;
    expect(pureRow.checked).toBe(false);
  });

  it('no existing menu changes: without dosPure there is never a PURE row', () => {
    for (const themes of [DOS_ONLY, DOS_AND_MODERN_LIGHT, DOS_AND_MODERN_BOTH]) {
      for (const dos of [T, F]) for (const light of [T, F]) for (const pure of [T, F]) {
        expect(displayMenuItems({ dos, light, pure }, noop, themes).some((i) => i.id === 'pure')).toBe(false);
        expect(resolveDisplayTheme({ dos, light, pure }, themes)).toBe(resolveDisplayTheme({ dos, light }, themes));
      }
    }
  });

  it('PURE onChange hands back the next state, keeping the other switches', () => {
    const onChange = jest.fn();
    const state: DisplayState = { dos: true, light: false, pure: false };
    const items = displayMenuItems(state, onChange, { dosDark: 'dos-86', dosPure: 'pure-amber', modernLight: 'light' });
    items.find((i) => i.id === 'pure')!.onChange(true);
    expect(onChange).toHaveBeenLastCalledWith({ dos: true, light: false, pure: true });
  });

  it('the PURE label can be translated, like the others', () => {
    const items = displayMenuItems({ dos: true, light: false }, noop, { dosDark: 'dos-86', dosPure: 'pure-amber' }, { pure: 'Rein' });
    expect(items.find((i) => i.id === 'pure')).toMatchObject({ label: 'Rein' });
  });

  describe('amber-mono and pure-amber are the same theme', () => {
    it('a site passing dosDark: "pure-amber" resolves exactly like one passing the old name "amber-mono"', () => {
      for (const dos of [T, F]) for (const light of [T, F]) for (const pure of [T, F]) {
        const state = { dos, light, pure };
        const canonical = (t: string) => (t === 'amber-mono' ? 'pure-amber' : t);
        expect(canonical(resolveDisplayTheme(state, { dosDark: 'pure-amber' })))
          .toBe(canonical(resolveDisplayTheme(state, { dosDark: 'amber-mono' })));
        expect(displayMenuItems(state, noop, { dosDark: 'pure-amber' }).map((i) => i.id))
          .toEqual(displayMenuItems(state, noop, { dosDark: 'amber-mono' }).map((i) => i.id));
      }
    });

    it.each([
      ['amber-mono', 'pure-amber'],
      ['pure-amber', 'amber-mono'],
      ['pure-amber', 'pure-amber'],
    ])('dosDark %s with dosPure %s offers no PURE row (nothing to switch)', (dosDark, dosPure) => {
      const themes = { dosDark, dosPure };
      const items = displayMenuItems({ dos: true, light: false, pure: true }, noop, themes);
      expect(items.map((i) => i.id)).toEqual(['light']);
      expect(['amber-mono', 'pure-amber']).toContain(resolveDisplayTheme({ dos: true, light: false, pure: true }, themes));
    });
  });
});

/**
 * The default changes (DMNC-1643 PR E): `dosDark` defaults to `dos-86`. A site
 * that passes nothing gets dos-86; a site that passes `dosPure: 'pure-amber'`
 * now gets the PURE row by default (before, the default dark theme was Pure
 * Amber itself, so there was nothing to switch); a site that keeps Pure Amber
 * as its default passes `dosDark: 'pure-amber'` (the migration recipe).
 */
describe('the default dark theme is dos-86 (DMNC-1643 PR E)', () => {
  const noop = () => {};
  const T = true;
  const F = false;

  it('no themes at all: dos-86 dark, dos-86-light light, no PURE row', () => {
    expect(resolveDisplayTheme({ dos: true, light: false })).toBe('dos-86');
    expect(resolveDisplayTheme({ dos: true, light: true })).toBe('dos-86-light');
    expect(resolveDisplayTheme({ dos: true, light: false, pure: true })).toBe('dos-86');
    expect(displayMenuItems({ dos: true, light: false }, noop).map((i) => i.id)).toEqual(['light']);
  });

  // [dos, light, pure, resolved theme, row ids] for { dosPure: 'pure-amber' } alone.
  it.each([
    [T, F, F, 'dos-86', ['light', 'pure']], [T, F, T, 'pure-amber', ['light', 'pure']],
    [T, T, F, 'dos-86-light', ['light']], [T, T, T, 'dos-86-light', ['light']],
    [F, F, F, 'dos-86', ['light', 'pure']], [F, F, T, 'pure-amber', ['light', 'pure']],
    [F, T, F, 'dos-86-light', ['light']], [F, T, T, 'dos-86-light', ['light']],
  ] as const)('dosPure: "pure-amber" alone gets the PURE row by default: dos=%s light=%s pure=%s → %s, rows %j', (dos, light, pure, theme, ids) => {
    const themes = { dosPure: 'pure-amber' };
    expect(resolveDisplayTheme({ dos, light, pure }, themes)).toBe(theme);
    const items = displayMenuItems({ dos, light, pure }, noop, themes);
    expect(items.map((i) => i.id)).toEqual(ids);
    expect(items.some((i) => i.disabled)).toBe(false);
  });

  it('migration recipe: dosDark: "pure-amber" keeps a site on Pure Amber, with the menu it had', () => {
    for (const dos of [T, F]) for (const light of [T, F]) for (const pure of [T, F]) {
      const state = { dos, light, pure };
      expect(resolveDisplayTheme(state, { dosDark: 'pure-amber' })).toBe(light ? 'amber-paper' : 'pure-amber');
      expect(displayMenuItems(state, noop, { dosDark: 'pure-amber' }).map((i) => i.id)).toEqual(['light']);
    }
  });

  it('the deprecated name still works as a dosDark', () => {
    expect(resolveDisplayTheme({ dos: true, light: false }, { dosDark: 'amber-mono' })).toBe('amber-mono');
  });
});

describe('syncThemeColor', () => {
  afterEach(() => {
    document.head.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
    document.documentElement.style.removeProperty('--color-semantic-background-primary');
  });

  it('creates the meta from the ground colour, then updates the same meta', () => {
    document.documentElement.style.setProperty('--color-semantic-background-primary', '#020003');
    syncThemeColor();
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!;
    expect(meta.content).toBe('#020003');
    document.documentElement.style.setProperty('--color-semantic-background-primary', '#FFB000');
    syncThemeColor();
    expect(document.head.querySelectorAll('meta[name="theme-color"]')).toHaveLength(1);
    expect(meta.content).toBe('#FFB000');
  });

  it('does nothing when the token is not set', () => {
    syncThemeColor();
    expect(document.head.querySelector('meta[name="theme-color"]')).toBeNull();
  });
});
