/**
 * RetroEffects literal guard (DMNC-1643).
 *
 * Every opacity, duration and length in RetroEffects.css comes from an
 * `--effect-*` token (src/tokens/effects-params.tokens.json), so a preset or a
 * consumer can redefine the monitor without touching the CSS. This test scans
 * the declarations in RetroEffects.css (comments, selectors and keyframe offsets
 * are not declarations) and fails on:
 *  - any number with a length, time or percent unit, other than 0 and the
 *    structural `100%` (a full extent) and `1%` (turns a unitless token into a
 *    percentage);
 *  - any unitless number other than 0 and 1 in an `opacity` declaration.
 * Unitless multipliers elsewhere (`calc(2 * var(--effect-web-mask-stripe-width))`) and easing curves
 * are not values and are not matched.
 *
 * Exceptions are listed in ALLOWLIST as `file:line` with a reason, in the style
 * of one-body-size.test.ts: a moved or new literal needs a deliberate review, and
 * a stale entry (no literal on that line any more) fails too.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const FILE = 'RetroEffects.css';

/** `RetroEffects.css:line` → why the literal is allowed. */
const ALLOWLIST: Record<string, string> = {
  'RetroEffects.css:233':
    'no-FOUC fallback: the boot cover must open even without tokens.css, an unresolved var() would void the animation (DMNC-1184)',
  'RetroEffects.css:257': 'geometry: centres the ignition line vertically, not a tunable value',
};

const UNIT = '(?:px|rem|em|%|ms|s|vh|vw|vmin|vmax|ch|deg)';
const NUMBER = new RegExp(`(?<![\\w.-])-?(\\d*\\.?\\d+)(${UNIT})?(?![\\w.%])`, 'g');

/** Replace comments with spaces, keeping newlines so offsets map to lines. */
const stripComments = (css: string) =>
  css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));

export function findLiterals(css: string): { line: number; text: string }[] {
  const src = stripComments(css);
  const lineAt = (offset: number) => src.slice(0, offset).split('\n').length;
  const out: { line: number; text: string }[] = [];
  // A declaration is `property: value` ending in `;` or `}`; selectors and
  // at-rule preludes end in `{` and are never matched.
  for (const decl of src.matchAll(/([-a-z]+)\s*:\s*([^;{}]*)(?=[;}])/gi)) {
    const property = decl[1].toLowerCase();
    const valueStart = decl.index! + decl[0].length - decl[2].length;
    // Blank out what is not a value: custom-property names and easing curves.
    const value = decl[2]
      .replace(/--[\w-]+/g, (m) => ' '.repeat(m.length))
      .replace(/(?:cubic-bezier|steps)\([^)]*\)/g, (m) => ' '.repeat(m.length));
    for (const m of value.matchAll(NUMBER)) {
      const num = Number(m[1]);
      const unit = m[2];
      let flagged = false;
      if (unit) {
        flagged = num !== 0 && !(unit === '%' && (num === 100 || num === 1));
      } else if (property === 'opacity') {
        flagged = num !== 0 && num !== 1;
      }
      if (flagged) out.push({ line: lineAt(valueStart + m.index!), text: m[0] });
    }
  }
  return out;
}

const css = readFileSync(join(__dirname, FILE), 'utf8');
const hits = new Map<string, string[]>();
for (const { line, text } of findLiterals(css)) {
  const key = `${FILE}:${line}`;
  hits.set(key, [...(hits.get(key) ?? []), text]);
}

describe('RetroEffects literal guard (DMNC-1643)', () => {
  it('uses no opacity, duration or length literal outside the allowlist', () => {
    const unexpected = [...hits]
      .filter(([key]) => !(key in ALLOWLIST))
      .map(([key, texts]) => `${key}  ${texts.join(', ')}`);
    expect(unexpected).toEqual([]);
  });

  it('has no stale allowlist entries', () => {
    const stale = Object.keys(ALLOWLIST).filter((key) => !hits.has(key));
    expect(stale).toEqual([]);
  });

  it('gives every allowlist entry a reason', () => {
    for (const reason of Object.values(ALLOWLIST)) {
      expect(reason.trim().length).toBeGreaterThan(10);
    }
  });

  // The detector itself: the pre-DMNC-1643 literals are caught, the token
  // forms and structural values are not.
  it('flags the literals RetroEffects.css used to hardcode', () => {
    const before = `
      .a { opacity: calc(0.6 * var(--retro-intensity)); animation: x 9s linear infinite; }
      .b { box-shadow: inset 0 0 200px red; background: linear-gradient(red 0px, blue 4px); }
      @keyframes k { 0% { opacity: 0.02; } 100% { transform: translateY(12px); } }
      .c { transition: opacity 0.2s ease-out; }`;
    expect(findLiterals(before).map((l) => l.text)).toEqual(['0.6', '9s', '200px', '4px', '0.02', '12px', '0.2s']);
  });

  it('does not flag token references, structural values or keyframe offsets', () => {
    const after = `
      .a { opacity: calc(var(--effect-scanline-intensity) * var(--retro-intensity)); }
      .b { background: linear-gradient(red 0px, blue calc(2 * var(--effect-web-mask-stripe-width)), green 100%); }
      .c { background: radial-gradient(ellipse calc(var(--effect-web-vignette-gradient-extent-x) * 1%) 100% at center, red 0%); }
      @keyframes k { 0% { opacity: 1; } 50% { opacity: 0; transform: scaleY(0) scaleX(1); } }
      .d { animation: k var(--effect-web-boot-line-duration) cubic-bezier(0.22, 1, 0.36, 1) forwards; margin-top: calc(var(--effect-web-boot-line-height) / -2); }
      @media (prefers-contrast: more) { .e { display: none; } }`;
    expect(findLiterals(after)).toEqual([]);
  });
});
