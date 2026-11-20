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
const NON_TERMINAL_THEMES = ['light', 'amber-mono', 'amber-paper'];

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
    expect(themes).toContain('cga-amber');
  });

  it('emits exactly one JSON per DOS theme, and none for light, amber-mono or amber-paper', () => {
    expect(readdirSync(outDir).sort()).toEqual(themes.map((t) => `${t}.json`));
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
      expect(contrast(roles[role], roles.screen)).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('does not emit the monochrome themes or the modern light theme (adding one back is a deliberate act)', () => {
    // Their palettes collapse to one phosphor, so the 16-slot mapping does not apply.
    for (const theme of ['amber-mono', 'amber-paper', 'light']) {
      expect(existsSync(resolve(outDir, `${theme}.json`))).toBe(false);
    }
  });
});
