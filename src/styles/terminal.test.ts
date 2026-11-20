import { execFileSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Terminal target contract (DMNC-1643): `style-dictionary.config.mjs` resolves
 * `src/tokens/terminal.tokens.json` once per DOS theme into
 * `dist/terminal/<theme>.json` ({ name, roles, ansi, effects }). Application
 * files (Windows Terminal, iTerm2, Ghostty, ...) are generated from that JSON
 * outside this repo, so its shape and the mapping rules are pinned here.
 */

const repoRoot = resolve(__dirname, '../..');
const outDir = resolve(repoRoot, 'dist/terminal');

// Not DOS terminals: no terminal JSON is emitted for these (mirrors
// NON_TERMINAL_THEMES in style-dictionary.config.mjs).
const NON_TERMINAL_THEMES = ['light'];

const ROLES = [
  'screen', 'text', 'textDim', 'textStrong', 'decoration', 'cursor', 'selection', 'raised',
  'error', 'success', 'warning', 'prompt', 'info', 'addedFill', 'removedFill',
];
const ANSI = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
  'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',
];
const TEXT_ROLES = ['text', 'textDim', 'error', 'success', 'warning', 'prompt', 'info'];

// Theme files are the source of truth for which themes exist.
const themes = readdirSync(resolve(repoRoot, 'src/tokens'))
  .map((f) => f.match(/^theme\.(.+)\.tokens\.json$/)?.[1])
  .filter((t): t is string => !!t && !NON_TERMINAL_THEMES.includes(t))
  .sort();

type TerminalTheme = {
  name: string;
  roles: Record<string, string>;
  ansi: Record<string, string>;
  effects: Record<string, unknown>;
};
const load = (theme: string): TerminalTheme =>
  JSON.parse(readFileSync(resolve(outDir, `${theme}.json`), 'utf-8'));

const HEX = /^#[0-9a-f]{6}$/i;
const lum = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string): number => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Pairs that the theme's own palette cannot carry at 4.5:1 with the mapping
// copied from the DOS-86 terminal theme. Listed so the gap is visible, and
// asserted to stay a gap (the assertion flips once the mapping is resolved,
// which forces this list to shrink). Open question on DMNC-1643.
const KNOWN_BELOW_AA: Record<string, Record<string, string>> = {
  'amber-mono': {
    info: 'color.cga.cyan is a dark amber-ramp step in amber-mono (also the theme\'s own warning-alert fill)',
  },
  'amber-paper': {
    prompt: 'blueBright is a fixed #9999FF; on the amber paper screen it reads 1.4:1',
  },
};

beforeAll(() => {
  // `vite build` empties dist, so regenerate rather than trust what is there.
  execFileSync(process.execPath, ['style-dictionary.config.mjs', '--only=terminal'], {
    cwd: repoRoot,
    stdio: 'pipe',
  });
});

describe('terminal target output', () => {
  it('finds DOS themes to check', () => {
    expect(themes.length).toBeGreaterThan(0);
    expect(themes).toContain('amber-mono');
    expect(themes).not.toContain('light');
  });

  it('emits exactly one JSON per DOS theme, and none for the modern light theme', () => {
    expect(readdirSync(outDir).sort()).toEqual(themes.map((t) => `${t}.json`));
    expect(existsSync(resolve(outDir, 'light.json'))).toBe(false);
  });

  describe.each(themes)('%s', (theme) => {
    it('has the { name, roles, ansi, effects } schema, roles and slots in file order', () => {
      const out = load(theme);
      expect(Object.keys(out)).toEqual(['name', 'roles', 'ansi', 'effects']);
      expect(out.name).toBe(`eiDotter ${theme}`);
      expect(Object.keys(out.roles)).toEqual(ROLES);
      expect(Object.keys(out.ansi)).toEqual(ANSI);
    });

    it('resolves every role and all 16 ANSI slots to a #RRGGBB colour', () => {
      const out = load(theme);
      for (const role of ROLES) expect(out.roles[role]).toMatch(HEX);
      for (const slot of ANSI) expect(out.ansi[slot]).toMatch(HEX);
    });

    it('keeps the two deliberate departures from ANSI convention', () => {
      const { roles, ansi } = load(theme);
      // "white" is emphasis, so it stays in the phosphor; bright black is readable secondary text.
      expect(ansi.white).toBe(roles.textStrong);
      expect(ansi.brightBlack).toBe(roles.textDim);
    });

    it('carries the shared-core effect tokens and leaves the web-only extension out', () => {
      const { effects } = load(theme);
      expect(effects).toHaveProperty('scanline.intensity');
      expect(effects).toHaveProperty('flicker.period');
      expect(effects).not.toHaveProperty('web');
    });

    it.each(TEXT_ROLES)('%s reads at 4.5:1 against the screen colour', (role) => {
      const { roles } = load(theme);
      const ratio = contrast(roles[role], roles.screen);
      if (KNOWN_BELOW_AA[theme]?.[role]) {
        expect(ratio).toBeLessThan(4.5);
      } else {
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    });
  });

  it('every known exception names a real theme and role', () => {
    for (const [theme, roles] of Object.entries(KNOWN_BELOW_AA)) {
      expect(themes).toContain(theme);
      for (const role of Object.keys(roles)) expect(TEXT_ROLES).toContain(role);
    }
  });

  it('a theme that pins the functional colours to amber keeps them amber (follows the theme)', () => {
    const { roles } = load('amber-mono');
    // amber-mono's status colours are steps of the amber ramp: red < green < blue channel-wise.
    for (const role of ['error', 'success', 'warning']) {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(roles[role].slice(i, i + 2), 16));
      expect(r).toBeGreaterThan(g);
      expect(g).toBeGreaterThan(b);
    }
  });
});
