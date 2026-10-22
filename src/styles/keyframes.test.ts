/**
 * Keyframe uniqueness contract (DMNC-1592).
 *
 * Shared motion lives in src/styles/keyframes.css. This test keeps it that way:
 *  - every `@keyframes` name under src/ is declared exactly once;
 *  - the duplicates collapsed in DMNC-1592 stay gone;
 *  - every name used by an `animation` / `animation-name` declaration resolves
 *    to a declared keyframe (catches a call site left pointing at a deleted name).
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';

const SRC = resolve(__dirname, '..');

function cssFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...cssFiles(full));
    else if (entry.endsWith('.css')) out.push(full);
  }
  return out;
}

const files = cssFiles(SRC).map((file) => ({
  file: relative(SRC, file),
  // Drop comments so prose mentioning a keyframe name is not counted.
  css: readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''),
}));

const declarations = new Map<string, string[]>();
for (const { file, css } of files) {
  for (const m of css.matchAll(/@keyframes\s+([-\w]+)/g)) {
    declarations.set(m[1], [...(declarations.get(m[1]) ?? []), file]);
  }
}

const ANIMATION_KEYWORDS = new Set([
  'none', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end',
  'infinite', 'normal', 'reverse', 'alternate', 'alternate-reverse', 'forwards', 'backwards',
  'both', 'running', 'paused', 'inherit', 'initial', 'unset', 'revert',
  // function names left behind once their (...) arguments are stripped
  'var', 'steps', 'cubic-bezier', 'calc',
]);

/** Animation names referenced by `animation:` / `animation-name:` declarations. */
function referencedNames(css: string): string[] {
  const names: string[] = [];
  for (const m of css.matchAll(/(?:^|[;{\s])animation(?:-name)?\s*:\s*([^;}]+)/g)) {
    let value = m[1];
    // Strip (possibly nested) parenthesised arguments: custom-property fallbacks, steps(2, jump-none)
    let prev;
    do { prev = value; value = value.replace(/\([^()]*\)/g, ''); } while (value !== prev);
    for (const layer of value.split(',')) {
      for (const token of layer.trim().split(/\s+/)) {
        if (!token || ANIMATION_KEYWORDS.has(token)) continue;
        if (/^-?[\d.]+(m?s)?$/.test(token)) continue;
        if (token.startsWith('!')) continue;
        names.push(token);
      }
    }
  }
  return names;
}

describe('keyframes contract', () => {
  it('declares every @keyframes name exactly once across src/', () => {
    const dupes = [...declarations].filter(([, where]) => where.length > 1);
    expect(dupes).toEqual([]);
  });

  it.each([
    // fade
    'backdrop-open', 'backdrop-close', 'cmdpal-backdrop-open', 'cmdpal-backdrop-close',
    'eidotter-card-enter', 'eidotter-inline-expand-fade',
    // pop
    'badge-enter', 'tag-enter', 'tag-exit', 'eidotter-timeline-node-enter',
    // panel
    'modal-crt-enter', 'modal-crt-exit', 'cmdpal-enter', 'cmdpal-exit',
    'select-pop-in', 'select-pop-out', 'notification-enter', 'notification-exit',
    'alert-enter', 'alert-exit',
    // rise
    'master-detail-fade', 'timeline-fade-in',
    // blink / breathe
    'blink-loading', 'eidotter-skeleton-breathe', 'eidotter-health-breathe', 'dos-figure-pin-pulse',
    // dropped in review: overlays and content swaps fade only (no translate/scale)
    'eidotter-panel-enter', 'eidotter-panel-exit', 'eidotter-rise-in',
  ])('collapsed duplicate %s is no longer declared', (name) => {
    expect(declarations.has(name)).toBe(false);
  });

  it('declares the shared motion vocabulary in keyframes.css', () => {
    const shared = [
      'blink', 'eidotter-fade-in', 'eidotter-fade-out', 'eidotter-pop-in', 'eidotter-pop-out',
      'eidotter-breathe',
    ];
    for (const name of shared) {
      expect(declarations.get(name)).toEqual(['styles/keyframes.css']);
    }
  });

  it('resolves every animation name used in src/ CSS to a declared keyframe', () => {
    const unresolved: string[] = [];
    for (const { file, css } of files) {
      for (const name of referencedNames(css)) {
        if (!declarations.has(name)) unresolved.push(`${file}: ${name}`);
      }
    }
    expect(unresolved).toEqual([]);
  });

  it('parses animation shorthands with var() fallbacks and steps()', () => {
    expect(referencedNames('.a { animation: blink 1s steps(1) infinite; }')).toEqual(['blink']);
    expect(
      referencedNames('.a{animation: eidotter-fade-in var(--duration-normal, 200ms) ease-out}'),
    ).toEqual(['eidotter-fade-in']);
    expect(referencedNames('.a { animation: none; }')).toEqual([]);
  });
});
