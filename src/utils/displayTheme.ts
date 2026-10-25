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
 */
export interface DisplayThemes {
  /** DOS, dark screen. Default `'amber-mono'`. */
  dosDark?: string;
  /** DOS, light screen ("Eggyolk"). Default `'amber-paper'`; `null` for none. */
  dosLight?: string | null;
  /** Modern style, light. e.g. `'light'`. Omit for a DOS-only site. */
  modernLight?: string | null;
  /** Modern style, dark. Omit while no modern dark theme exists. */
  modernDark?: string | null;
}

/** The two switches: style (DOS or modern) and brightness. */
export interface DisplayState {
  /** DOS style on (false = modern). Ignored on a DOS-only site. */
  dos: boolean;
  /** Light screen on. */
  light: boolean;
}

/** Labels and hints for the rows; override to translate. */
export interface DisplayLabels {
  dos?: string;
  light?: string;
}

const DEFAULT_THEMES = { dosDark: 'amber-mono', dosLight: 'amber-paper' };
const DEFAULT_LABELS: Required<DisplayLabels> = {
  dos: 'DOS',
  light: 'Light',
};

function normalize(themes: DisplayThemes) {
  return {
    dosDark: themes.dosDark ?? DEFAULT_THEMES.dosDark,
    dosLight: themes.dosLight === undefined ? DEFAULT_THEMES.dosLight : themes.dosLight,
    modernLight: themes.modernLight ?? null,
    modernDark: themes.modernDark ?? null,
  };
}

/**
 * The eidotter theme name for a display state. Set it as `data-theme` on
 * `<html>`. A state the site cannot show falls back to what it can (modern
 * with only a light theme is light whatever `light` says).
 */
export function resolveDisplayTheme(state: DisplayState, themes: DisplayThemes = {}): string {
  const t = normalize(themes);
  const hasModern = !!(t.modernLight || t.modernDark);
  if (!hasModern || state.dos) {
    return state.light && t.dosLight ? t.dosLight : t.dosDark;
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
  } else if (t.modernLight && t.modernDark) {
    items.push({ id: 'light', label: l.light, checked: state.light, onChange: setLight });
  }
  // Modern with one brightness: no LIGHT row. Options that do not apply in
  // the current mode are hidden, not shown disabled (eidotter rule, 0.46).
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
