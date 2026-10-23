import { execFileSync } from 'child_process';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import baseTokens from '../tokens/base.tokens.json';
import webTokens from '../tokens/web.tokens.json';
import generatedTokens from './tokens.json';

/**
 * Contract tests: Perfect DOS VGA 437 is single-weight (400).
 * All font-weight tokens must resolve to 400 — no bold variant exists.
 * See base.tokens.json fontWeight.$description for rationale.
 */
describe('Font-weight token contract', () => {
  it.each(['regular', 'semibold', 'bold'] as const)(
    'generated token fontWeight.%s equals 400',
    (weight) => {
      expect(generatedTokens.typography.fontWeight[weight]).toBe(400);
    },
  );

  it.each(['regular', 'semibold', 'bold'] as const)(
    'source token fontWeight.%s.$value equals 400',
    (weight) => {
      expect(webTokens.typography.fontWeight[weight].$value).toBe(400);
    },
  );

  it.each(['regular', 'semibold', 'bold'] as const)(
    'CSS variable --typography-font-weight-%s contains 400',
    (weight) => {
      const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
      expect(css).toContain(`--typography-font-weight-${weight}: 400;`);
    },
  );
});

/**
 * Contract tests: `font-dos` ships Perfect DOS VGA 437 + monospace fallback.
 *
 * PR #282 (hand-written → generated preset) briefly emitted the primary stack
 * without the `monospace` fallback; PR #289 restored it via source-token edit.
 * These assertions lock the CSS-variable and tokens.js surfaces in addition to
 * the Tailwind preset assertion at src/styles/tailwind-preset.test.ts — so a
 * future generator change has to fail THREE tests to silently drop the fallback.
 *
 * See base.tokens.json fontFamily.primary.$description for rationale.
 */
describe('Font-family fallback contract', () => {
  it('source token fontFamily.primary.$value ends in monospace', () => {
    expect(webTokens.typography.fontFamily.primary.$value).toEqual([
      'Perfect DOS VGA 437',
      'monospace',
    ]);
  });

  it('source token fontFamily.fallback.$value stays intentionally bare', () => {
    expect(webTokens.typography.fontFamily.fallback.$value).toEqual(['monospace']);
  });

  it('generated tokens.js typography.fontFamily.primary includes both entries', () => {
    expect(generatedTokens.typography.fontFamily.primary).toEqual([
      'Perfect DOS VGA 437',
      'monospace',
    ]);
  });

  it('CSS variable --typography-font-family-primary contains Perfect DOS VGA 437 + monospace', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(
      `--typography-font-family-primary: 'Perfect DOS VGA 437', monospace;`,
    );
  });

  it('CSS variable --typography-font-family-fallback stays bare', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(`--typography-font-family-fallback: monospace;`);
  });
});

/**
 * Contract tests: AI-content provenance marker token (DMNC-884, phase 1).
 *
 * `--color-semantic-text-ai-draft` is intentionally brand-locked — it must
 * NOT theme-shift across amber-mono / cga-amber / cga-mode4-p0 /
 * cga-mode4-p1 / cga-mode5. The Signalnoise hot pink reads identically
 * everywhere so the "this is AI prose" signal is unmissable regardless of
 * active theme.
 *
 * Glow halo (`--color-semantic-text-ai-draft-glow`) is co-locked: 50% rgba
 * of the same hex. Single source of truth; no hardcoded rgba in CSS.
 *
 * See plans/2026-05-02-001-feat-ai-content-provenance-marker-plan.md.
 */
describe('AI-content provenance token contract', () => {
  type DtcgValue = { $value: string };
  const provenanceTokens = (
    baseTokens as unknown as {
      color: { semantic: { text: { aiDraft: DtcgValue; aiDraftGlow: DtcgValue } } };
    }
  ).color.semantic.text;

  // ---- Source ----
  it('source token semantic.text.aiDraft equals Signalnoise hot pink', () => {
    expect(provenanceTokens.aiDraft.$value).toBe('#FF1A8C');
  });

  it('source token semantic.text.aiDraftGlow is 50% rgba of the aiDraft hex', () => {
    // #FF1A8C = rgb(255, 26, 140). Glow at 50% alpha.
    expect(provenanceTokens.aiDraftGlow.$value).toBe('rgba(255, 26, 140, 0.5)');
  });

  // ---- Source ↔ generated cross-check ----
  it('source aiDraft hex (lowercased) matches the hex emitted in tokens.css', () => {
    const sourceHex = provenanceTokens.aiDraft.$value.toLowerCase();
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    const m = css.match(/--color-semantic-text-ai-draft:\s*(#[0-9a-fA-F]{6})/);
    expect(m).not.toBeNull();
    expect(m![1].toLowerCase()).toBe(sourceHex);
  });

  // ---- CSS variable emission (case-insensitive — guards style-dictionary formatter drift) ----
  it('global tokens.css emits --color-semantic-text-ai-draft', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c\s*;/i);
  });

  it('global tokens.css emits --color-semantic-text-ai-draft-glow', () => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toMatch(
      /--color-semantic-text-ai-draft-glow:\s*rgba\(\s*255\s*,\s*26\s*,\s*140\s*,\s*0\.5\s*\)\s*;/i,
    );
  });

  it.each([
    'amber-mono',
    'cga-amber',
    'cga-mode4-p0',
    'cga-mode4-p1',
    'cga-mode5',
    'light',
    'amber-paper',
  ] as const)(
    'theme.%s.css emits --color-semantic-text-ai-draft as the same Signalnoise pink (no theme drift)',
    (theme) => {
      const css = readFileSync(resolve(__dirname, `theme.${theme}.css`), 'utf-8');
      expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c\s*;/i);
    },
  );

  // ---- Selector + cascade behaviour ----
  // The provenance visual evolved from a solid Signalnoise-pink + halo
  // (Phase 1, DMNC-884) to a magenta→white→cyan gradient + shimmer
  // (DMNC-946, 2026-05-23). The selector contract is unchanged
  // (`data-provenance="ai-draft"`); the old aiDraft token values are
  // kept in the design system but no longer referenced from this
  // stylesheet. Tests below pin the new gradient design.
  it('provenance.css declares the canonical data-provenance="ai-draft" selector', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-provenance="ai-draft"\]/);
  });

  it('provenance.css applies the static AI-marker gradient via background-clip: text (DMNC-946)', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    // Restyled 2026-06-17: static two-stop gradient (no animation), driven by
    // theme-aware helper vars; the brand-locked stop values are pinned below.
    expect(css).toMatch(/var\(--ai-marker-from\)/);
    expect(css).toMatch(/var\(--ai-marker-to\)/);
    expect(css).toMatch(/background-clip:\s*text/i);
    expect(css).toMatch(/-webkit-text-fill-color:\s*transparent/i);
    // No animation any more.
    expect(css).not.toMatch(/animation:/i);
    expect(css).not.toMatch(/@keyframes/i);
  });

  it('the AI-marker gradient tokens are brand-locked, with a light-theme variant (DMNC-946)', () => {
    const tokens = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(tokens).toMatch(/--color-semantic-text-ai-gradient-from:\s*#ff1a8c/i);
    expect(tokens).toMatch(/--color-semantic-text-ai-gradient-to:\s*#ff55ff/i);
    expect(tokens).toMatch(/--color-semantic-text-ai-gradient-from-light:\s*#c0228a/i);
    expect(tokens).toMatch(/--color-semantic-text-ai-gradient-to-light:\s*#7a3cc0/i);
  });

  it('provenance.css swaps the gradient under light themes ([data-theme=light]/.light) (DMNC-946)', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-theme="light"\][\s\S]*--ai-marker-from:\s*var\(--color-semantic-text-ai-gradient-from-light\)/);
    expect(css).toMatch(/\.light[\s\S]*--ai-marker-to:\s*var\(--color-semantic-text-ai-gradient-to-light\)/);
  });

  it('provenance.css supports the data-ai-block whole-section wrapper', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-ai-block\]/);
    expect(css).toMatch(/\[data-ai-block\][^{]*:is\([^)]*\bp\b[^)]*\)/);
  });

  // Verbatim code must stay legible inside AI-marked regions. The gradient
  // relies on transparent text-fill, which inherits into a descendant <code>
  // while the gradient background does not — so code glyphs vanished and any
  // .dos-code box rendered as an empty rectangle (SKShapeNode boxes on
  // dmnc.tech). Code must be excluded from the gradient and reset to a real
  // colour.
  it('provenance.css does NOT clip code into the AI-marker gradient', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    // The gradient :is() list no longer includes `code`.
    expect(css).not.toMatch(/:is\([^)]*\bem\b[^)]*\bcode\b[^)]*\)/);
  });

  it('provenance.css resets code/kbd/samp/pre to a readable colour in AI regions', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/\[data-ai-block\]\s*:is\(code,\s*kbd,\s*samp,\s*pre\)/);
    expect(css).toMatch(/\[data-provenance="ai-draft"\]\s*:is\(code,\s*kbd,\s*samp,\s*pre\)/);
    // The reset gives code an opaque fill (not transparent) so glyphs render.
    expect(css).toMatch(/-webkit-text-fill-color:\s*var\(--color-semantic-text-accent\)/);
  });

  // ---- Nav-chrome exclusion (DMNC-1193) ----
  it('provenance.css block-mode gradient never touches navigation chrome (DMNC-1193)', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).toMatch(/:not\(:where\(nav \*,\s*\[role="navigation"\]\s*\*\)\)/);
    // Specificity guard: every :not( in this file must wrap :where( so the
    // exclusion contributes 0 specificity and keeps the (0,1,1) contract.
    expect(css).not.toMatch(/:not\((?!:where\()/);
  });

  it('data-ai-skip restores component-own colours — no blanket descendant color:inherit (DMNC-1193)', () => {
    const css = readFileSync(resolve(__dirname, 'provenance.css'), 'utf-8');
    expect(css).not.toMatch(/\[data-ai-skip="true"\]\s+\*/);
    expect(css).toMatch(/\[data-ai-block\]\s*\[data-ai-skip="true"\]\s*:is\(h1,\s*h2/);
  });

  // ---- Bundle wiring ----
  it('src/index.ts imports provenance.css so the rule reaches the default bundle', () => {
    const indexTs = readFileSync(resolve(__dirname, '..', 'index.ts'), 'utf-8');
    expect(indexTs).toMatch(/import\s+['"]\.\/styles\/provenance\.css['"];/);
  });
});

/**
 * Contract tests: literal-CGA functional status primitives (DMNC-1001).
 *
 * Foundation's `color.cga.*` is amber-monochromed — its green/red/cyan resolve to
 * browns (`cga/green = #411F06`). Apps that need *honest* status colour (a glucose
 * monitor's in-range green, an error red) cannot get it by aliasing the amber-mono
 * set. `color.cga-true.*` adds the authentic CGA functional colours as a sibling
 * group, sourced from theme.cga-amber's original palette.
 *
 * Like the brand-locked aiDraft marker, these are **theme-invariant** — #00AA00 is
 * green in every theme — so an app aliasing them gets the same honest colour
 * regardless of the active DOS palette. The full rename/collapse is DMNC-922; this
 * is the additive slice that unblocks app adoption (DMNC-1002).
 */
describe('Literal-CGA functional status token contract', () => {
  type DtcgValue = { $value: string };
  const cgaTrue = (
    baseTokens as unknown as {
      color: { 'cga-true': { green: DtcgValue; red: DtcgValue; cyan: DtcgValue } };
    }
  ).color['cga-true'];

  // ---- Source: authentic CGA hexes ----
  it.each([
    ['green', '#00AA00'],
    ['red', '#AA0000'],
    ['cyan', '#00AAAA'],
  ] as const)('source token color.cga-true.%s equals authentic CGA %s', (name, hex) => {
    expect(cgaTrue[name].$value).toBe(hex);
  });

  // ---- CSS variable emission (global) ----
  it.each([
    ['green', '#00aa00'],
    ['red', '#aa0000'],
    ['cyan', '#00aaaa'],
  ] as const)('global tokens.css emits --color-cga-true-%s', (name, hex) => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css.toLowerCase()).toContain(`--color-cga-true-${name}: ${hex};`);
  });

  // ---- Theme-invariance: same honest colour across every theme (no drift) ----
  // All three cga-true tokens are pinned in all 5 themes (not just green) so a
  // future theme edit cannot silently drift red or cyan away from authentic CGA.
  const CGA_TRUE_THEMES = [
    'amber-mono',
    'cga-amber',
    'cga-mode4-p0',
    'cga-mode4-p1',
    'cga-mode5',
    'amber-paper',
  ] as const;
  const CGA_TRUE_COLORS = [
    ['green', '#00aa00'],
    ['red', '#aa0000'],
    ['cyan', '#00aaaa'],
  ] as const;

  it.each(
    CGA_TRUE_THEMES.flatMap((theme) =>
      CGA_TRUE_COLORS.map(([name, hex]) => [theme, name, hex] as const),
    ),
  )(
    'theme.%s.css emits --color-cga-true-%s as the same authentic CGA value (no theme drift)',
    (theme, name, hex) => {
      const css = readFileSync(resolve(__dirname, `theme.${theme}.css`), 'utf-8');
      expect(css.toLowerCase()).toContain(`--color-cga-true-${name}: ${hex};`);
    },
  );
});

/**
 * Contract tests: motion tokens (DMNC-1001).
 *
 * The three CRT animations (`phosphor-warmup`, `phosphor-energize`, `blink`) carry
 * their timing inline in component CSS today. `motion.*` tokenises the duration +
 * easing of each so they can populate the Foundation "Motion" Figma collection and
 * a Motion spec page. Code (keyframes.css) stays the runtime source of truth; these
 * are the canonical numeric/easing values that documentation and Figma mirror.
 */
describe('Motion token contract', () => {
  type DtcgValue = { $value: string };
  const motion = JSON.parse(
    readFileSync(resolve(__dirname, '..', 'tokens', 'motion.tokens.json'), 'utf-8'),
  ).motion as {
    duration: Record<string, DtcgValue>;
    easing: Record<string, DtcgValue>;
  };

  // ---- Source: durations match the live keyframes call sites ----
  it.each([
    ['warmup', '400ms'], // phosphor-warmup (var(--duration-slow))
    ['energize', '150ms'], // phosphor-energize
    ['blink', '1000ms'], // blink cycle (1s step-end)
  ] as const)('source motion.duration.%s equals %s', (name, val) => {
    expect(motion.duration[name].$value).toBe(val);
  });

  // ---- Source: easings ----
  it.each([
    ['warmup', 'ease-out'],
    ['energize', 'ease-out'],
    ['blink', 'step-end'],
  ] as const)('source motion.easing.%s equals %s', (name, val) => {
    expect(motion.easing[name].$value).toBe(val);
  });

  // ---- CSS variable emission ----
  it.each([
    ['duration-warmup', '400ms'],
    ['duration-energize', '150ms'],
    ['duration-blink', '1000ms'],
  ] as const)('global tokens.css emits --motion-%s', (suffix, val) => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(`--motion-${suffix}: ${val};`);
  });

  // Every easing var is pinned (not just blink) so a Style Dictionary transform
  // can't silently rename or drop the warmup/energize easings.
  it.each([
    ['warmup', 'ease-out'],
    ['energize', 'ease-out'],
    ['blink', 'step-end'],
  ] as const)('global tokens.css emits --motion-easing-%s', (name, val) => {
    const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf-8');
    expect(css).toContain(`--motion-easing-${name}: ${val};`);
  });
});

/**
 * Contract tests (DMNC-1494): `text-secondary` must never resolve to the same
 * colour as `background-primary` (it used to alias cga-black, i.e. invisible text
 * on the page background). Dark text on an amber fill is `text-on-accent`.
 */
describe('text-secondary visibility contract (DMNC-1494)', () => {
  const stylesDir = __dirname;
  const parse = (css: string): Record<string, string> => {
    const out: Record<string, string> = {};
    for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      out[m[1]] = m[2].trim();
    }
    return out;
  };
  const resolveVar = (name: string, decls: Record<string, string>, depth = 0): string | null => {
    const v = decls[name];
    if (!v || depth > 8) return null;
    const ref = v.match(/^var\(--([\w-]+)\)$/);
    return ref ? resolveVar(ref[1], decls, depth + 1) : v.toLowerCase();
  };
  const baseDecls = parse(readFileSync(resolve(stylesDir, 'tokens.css'), 'utf-8'));
  const themeFiles = readdirSync(stylesDir).filter((f) => /^theme\..+\.css$/.test(f));

  it('finds theme files', () => {
    expect(themeFiles.length).toBeGreaterThan(0);
  });

  it('tokens.css: text-secondary differs from background-primary', () => {
    const fg = resolveVar('color-semantic-text-secondary', baseDecls);
    const bg = resolveVar('color-semantic-background-primary', baseDecls);
    expect(fg).not.toBeNull();
    expect(fg).not.toBe(bg);
  });

  it.each(themeFiles)('%s declares text-on-accent and text-on-light itself', (file) => {
    // Parse the theme file alone: merged over tokens.css, a missing theme
    // override would silently fall back to the base value.
    const own = parse(readFileSync(resolve(stylesDir, file), 'utf-8'));
    expect(own['color-semantic-text-on-accent']).toBeDefined();
    expect(own['color-semantic-text-on-light']).toBeDefined();
  });

  // Real WCAG 2.1 ratios, computed by scripts/check-contrast.mjs (same
  // resolution + relative-luminance math the contrast report uses).
  type Pair = { fg: string; bg: string; ratio?: number; error?: string };
  const report: { theme: string; pairs: Pair[] }[] = JSON.parse(
    execFileSync(process.execPath, [resolve(__dirname, '../../scripts/check-contrast.mjs'), '--json'], {
      encoding: 'utf-8',
    }),
  );
  const ratio = (theme: string, fg: string, bg: string): number | undefined =>
    report.find((r) => r.theme === theme)?.pairs.find((p) => p.fg === fg && p.bg === bg)?.ratio;
  const darkThemes = report.map((r) => r.theme).filter((t) => t !== 'light');

  it('contrast report covers every theme file', () => {
    expect(report.map((r) => `theme.${r.theme}.css`).sort()).toEqual([...themeFiles].sort());
    expect(darkThemes.length).toBeGreaterThan(0);
  });

  const darkPairs: [string, string][] = [
    ['text-secondary', 'background-primary'],
    ['text-on-accent', 'background-accent'],
    ['text-on-brand', 'background-brand'],
  ];
  it.each(darkPairs)('every dark theme: %s on %s reaches 4.5:1', (fg, bg) => {
    for (const theme of darkThemes) {
      const r = ratio(theme, fg, bg);
      expect({ theme, ok: r !== undefined && r >= 4.5, r }).toEqual({ theme, ok: true, r });
    }
  });

  it('light theme: text-on-light and text-secondary reach 4.5:1 on background-primary', () => {
    expect(ratio('light', 'text-on-light', 'background-primary')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('light', 'text-secondary', 'background-primary')).toBeGreaterThanOrEqual(4.5);
  });
});
