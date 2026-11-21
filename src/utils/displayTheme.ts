import type { DisplayMenuItem } from '../components/DisplayMenu';

/**
 * Display themes a site offers (0.46). Values are eidotter theme names, set
 * as `data-theme` on `<html>`. `dosDark` is required; the others are
 * optional and decide which switches DisplayMenu shows:
 * - DOS only (`dosDark` + `dosLight`): one LIGHT switch.
 * - DOS + modern (`modernLight` and/or `modernDark`): a DOS switch (style)
 *   plus LIGHT (brightness). When modern has only one brightness, the LIGHT
 *   row is hidden in modern mode: options that do not apply are hidden, not
 *   shown disabled.
 * - A pure variant (`dosPure`, opt-in): a PURE switch under DOS while LIGHT
 *   is off, for the monochrome Pure Amber next to the DOS dark theme. Hidden,
 *   never disabled, in every other state (DMNC-1643).
 */
export interface DisplayThemes {
  /** DOS, dark screen. Default `'amber-mono'` (Pure Amber; `'pure-amber'` is the same theme). */
  dosDark?: string;
  /** DOS, light screen ("Eggyolk"). Default `'amber-paper'`; `null` for none. */
  dosLight?: string | null;
  /**
   * DOS, dark screen, pure variant: the theme the PURE switch picks, e.g.
   * `'pure-amber'` on a site whose `dosDark` is `'dos-86'`. Default `null`:
   * a site opts in, so no existing menu changes. The PURE row only appears
   * when this names a different theme from `dosDark` (`amber-mono` and
   * `pure-amber` count as the same theme).
   */
  dosPure?: string | null;
  /** Modern style, light. e.g. `'light'`. Omit for a DOS-only site. */
  modernLight?: string | null;
  /** Modern style, dark. Omit while no modern dark theme exists. */
  modernDark?: string | null;
}

/** The switches: style (DOS or modern), brightness, and the pure variant. */
export interface DisplayState {
  /** DOS style on (false = modern). Ignored on a DOS-only site. */
  dos: boolean;
  /** Light screen on. */
  light: boolean;
  /**
   * Pure variant on (DOS, dark screen only; needs `dosPure`). Optional so
   * stored state from before DMNC-1643 keeps working: absent means off.
   */
  pure?: boolean;
}

/** Labels and hints for the rows; override to translate. */
export interface DisplayLabels {
  dos?: string;
  light?: string;
  pure?: string;
}

const DEFAULT_THEMES = { dosDark: 'amber-mono', dosLight: 'amber-paper' };
const DEFAULT_LABELS: Required<DisplayLabels> = {
  dos: 'DOS',
  light: 'Light',
  pure: 'Pure',
};

// Deprecated theme names and the theme they stand for (DMNC-1643). Mirrors
// scripts/lib/theme-aliases.mjs, which writes both names into one CSS rule.
const THEME_ALIASES: Record<string, string> = { 'amber-mono': 'pure-amber' };
const sameTheme = (a: string, b: string) => (THEME_ALIASES[a] ?? a) === (THEME_ALIASES[b] ?? b);

function normalize(themes: DisplayThemes) {
  const dosDark = themes.dosDark ?? DEFAULT_THEMES.dosDark;
  const dosPure = themes.dosPure ?? null;
  return {
    dosDark,
    dosLight: themes.dosLight === undefined ? DEFAULT_THEMES.dosLight : themes.dosLight,
    // A pure variant that is the dark theme itself offers nothing to switch.
    dosPure: dosPure && !sameTheme(dosPure, dosDark) ? dosPure : null,
    modernLight: themes.modernLight ?? null,
    modernDark: themes.modernDark ?? null,
  };
}

/**
 * The eidotter theme name for a display state. Set it as `data-theme` on
 * `<html>`. A state the site cannot show falls back to what it can (modern
 * with only a light theme is light whatever `light` says; `pure` without a
 * `dosPure` theme is the DOS dark theme).
 */
export function resolveDisplayTheme(state: DisplayState, themes: DisplayThemes = {}): string {
  const t = normalize(themes);
  const hasModern = !!(t.modernLight || t.modernDark);
  if (!hasModern || state.dos) {
    if (state.light && t.dosLight) return t.dosLight;
    return state.pure && t.dosPure ? t.dosPure : t.dosDark;
  }
  if (t.modernLight && t.modernDark) return state.light ? t.modernLight : t.modernDark;
  return (t.modernLight ?? t.modernDark) as string;
}

/**
 * The DisplayMenu rows for a site's themes, wired to its state. Pass the
 * result as DisplayMenu `items`; `onChange` receives the next state.
 */
export function displayMenuItems(
  state: DisplayState,
  onChange: (next: DisplayState) => void,
  themes: DisplayThemes = {},
  labels: DisplayLabels = {},
): DisplayMenuItem[] {
  const t = normalize(themes);
  const l = { ...DEFAULT_LABELS, ...labels };
  const hasModern = !!(t.modernLight || t.modernDark);
  const items: DisplayMenuItem[] = [];

  if (hasModern) {
    items.push({ id: 'dos', label: l.dos, checked: state.dos, onChange: (dos) => onChange({ ...state, dos }) });
  }

  const inDos = !hasModern || state.dos;
  const setLight = (light: boolean) => onChange({ ...state, light });
  if (inDos) {
    if (t.dosLight) items.push({ id: 'light', label: l.light, checked: state.light, onChange: setLight });
    // PURE applies to the dark DOS screen only: shown while LIGHT is off (or
    // the site has no DOS light theme), hidden otherwise (DMNC-1643).
    const lightOn = state.light && !!t.dosLight;
    if (t.dosPure && !lightOn) {
      items.push({
        id: 'pure',
        label: l.pure,
        checked: !!state.pure,
        onChange: (pure) => onChange({ ...state, pure }),
      });
    }
  } else if (t.modernLight && t.modernDark) {
    items.push({ id: 'light', label: l.light, checked: state.light, onChange: setLight });
  }
  // Modern with one brightness: no LIGHT row; modern mode: no PURE row.
  // Options that do not apply in the current mode are hidden, not shown
  // disabled (eidotter rule, 0.46).
  return items;
}

/**
 * Point the browser chrome (the iPhone status bar, Android's toolbar) at the
 * page's ground: writes `<meta name="theme-color">` from the current theme's
 * `--color-semantic-background-primary`. Call it once on load and after
 * every theme switch. Creates the meta in script on purpose: a meta rendered
 * in JSX gets its content reset by React on re-render. Browser only; does
 * nothing on the server.
 */
export function syncThemeColor(root?: HTMLElement): void {
  if (typeof document === 'undefined') return;
  const el = root ?? document.documentElement;
  const color = getComputedStyle(el).getPropertyValue('--color-semantic-background-primary').trim();
  if (!color) return;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = color;
}
