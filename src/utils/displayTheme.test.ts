import { resolveDisplayTheme, displayMenuItems, syncThemeColor, type DisplayState } from './displayTheme';

const DOS_ONLY = {};
const DOS_AND_MODERN_LIGHT = { modernLight: 'light' };
const DOS_AND_MODERN_BOTH = { modernLight: 'light', modernDark: 'modern-dark' };

describe('resolveDisplayTheme', () => {
  it('DOS-only site: LIGHT picks amber-paper, otherwise amber-mono', () => {
    expect(resolveDisplayTheme({ dos: true, light: false }, DOS_ONLY)).toBe('amber-mono');
    expect(resolveDisplayTheme({ dos: true, light: true }, DOS_ONLY)).toBe('amber-paper');
    // dos is ignored when there is no modern theme
    expect(resolveDisplayTheme({ dos: false, light: true }, DOS_ONLY)).toBe('amber-paper');
  });

  it('DOS + modern (light only): modern is light whatever LIGHT says', () => {
    expect(resolveDisplayTheme({ dos: true, light: true }, DOS_AND_MODERN_LIGHT)).toBe('amber-paper');
    expect(resolveDisplayTheme({ dos: false, light: false }, DOS_AND_MODERN_LIGHT)).toBe('light');
  });

  it('DOS + modern light and dark: LIGHT switches modern brightness', () => {
    expect(resolveDisplayTheme({ dos: false, light: true }, DOS_AND_MODERN_BOTH)).toBe('light');
    expect(resolveDisplayTheme({ dos: false, light: false }, DOS_AND_MODERN_BOTH)).toBe('modern-dark');
  });

  it('dosLight: null keeps a DOS site dark', () => {
    expect(resolveDisplayTheme({ dos: true, light: true }, { dosLight: null })).toBe('amber-mono');
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
