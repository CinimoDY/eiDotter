/**
 * Built-bundle tests: assert that consumer-visible artifacts ship what we
 * promise. These tests run against `dist/*` — they require `npm run build`
 * to have completed.
 *
 * Why this exists: source-file unit tests prove a CSS string was written
 * correctly; they don't prove that Vite/PostCSS bundled it into the
 * distributed file consumers actually load via `import 'eidotter/styles'`.
 * A future tooling change that drops side-effect CSS imports from the
 * bundle would pass every other test in the suite while shipping nothing.
 *
 * If `dist/eidotter.css` is missing, every assertion below is skipped with
 * a clear message. CI (`build.yml`) runs `npm run build` before `npm test`,
 * so these tests run there as a last-line check. Locally, run a build
 * before relying on them.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import postcss, { type Rule } from 'postcss';

const repoRoot = resolve(__dirname, '..', '..');
const distCssPath = resolve(repoRoot, 'dist', 'eidotter.css');
const hasBuild = existsSync(distCssPath);
const describeIfBuilt = hasBuild ? describe : describe.skip;

/** Unwrap `:where(x)` / `:is(x)` so `:where(a)` still counts as a bare `a`. */
const unwrapSelector = (selector: string): string => {
  let s = selector.trim();
  let m: RegExpMatchArray | null;
  while ((m = s.match(/^:(?:where|is)\((.*)\)$/))) s = m[1].trim();
  return s;
};

/** Rules outside @keyframes (keyframe stops like `from`/`50%` are not selectors). */
const styleRules = (css: string): Rule[] => {
  const rules: Rule[] = [];
  postcss.parse(css).walkRules((rule) => {
    const parent = rule.parent;
    if (parent?.type === 'atrule' && /keyframes$/i.test((parent as { name: string }).name)) return;
    rules.push(rule);
  });
  return rules;
};

describeIfBuilt('dist/eidotter.css — built-bundle contract', () => {
  const css = hasBuild ? readFileSync(distCssPath, 'utf-8') : '';

  it('ships the [data-provenance="ai-draft"] selector (DMNC-884 phase 1)', () => {
    // CSS minifier may strip attribute-value quotes (`=ai-draft` vs `="ai-draft"`).
    // After DMNC-946 the selector is grouped with [data-ai-block] :is(...),
    // so the next char may be `,` (selector list) or `{` (rule open).
    expect(css).toMatch(/\[data-provenance=["']?ai-draft["']?\]\s*[,{]/);
  });

  it('ships the [data-ai-block] whole-section wrapper (DMNC-946)', () => {
    expect(css).toMatch(/\[data-ai-block\]/);
  });

  it('ships the static AI-marker gradient stops — amber + light (DMNC-946)', () => {
    // Restyled 2026-06-17: static two-stop magenta gradient, theme-aware.
    // Minifier shortens #FF55FF → #f5f; #FF1A8C/#C0228A/#7A3CC0 don't shorten.
    expect(css).toMatch(/#FF1A8C/i);          // amber-theme start
    expect(css).toMatch(/#FF55FF|#f5f/i);     // amber-theme end
    expect(css).toMatch(/#C0228A/i);          // light-theme start
    expect(css).toMatch(/#7A3CC0/i);          // light-theme end
  });

  it('ships background-clip: text and transparent text fill', () => {
    expect(css).toMatch(/background-clip:\s*text/i);
    expect(css).toMatch(/-webkit-text-fill-color:\s*transparent/i);
  });

  it('ships no AI shimmer animation (restyled to a static gradient, DMNC-946)', () => {
    expect(css).not.toMatch(/@keyframes\s+ai-text-shimmer/);
  });

  it('ships the nav-chrome exclusion on the block-mode gradient (DMNC-1193)', () => {
    // Block mode must never paint nav/[role=navigation] descendants. Minifier
    // may strip the attribute-value quotes; the `nav *` descendant-combinator
    // spaces survive minification.
    expect(css).toMatch(/:not\(:where\(nav \*,\s*\[role=["']?navigation["']?\]\s*\*\)\)/);
  });

  // The aiDraft + aiDraftGlow tokens remain in the design system even though
  // provenance.css no longer references them (the gradient is the canonical
  // visual now). Pinned here so a future cleanup is a deliberate choice.
  it('ships the --color-semantic-text-ai-draft custom property (token retained)', () => {
    expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c/i);
  });

  it('ships the --color-semantic-text-ai-draft-glow custom property (token retained)', () => {
    expect(css).toMatch(/--color-semantic-text-ai-draft-glow:\s*(rgba\(|#ff1a8c80)/i);
  });

  it('bundles the default amber-mono theme so `data-theme="amber-mono"` works OOTB (DMNC-1079)', () => {
    // Theme overrides used to ship only as separate `eidotter/themes/*.css`
    // subpath exports, so consumers importing `eidotter/styles` got `:root`
    // only and could not theme-switch. The default theme is now bundled.
    // Minifier may strip the attribute-value quotes (`=amber-mono`).
    expect(css).toMatch(/\[data-theme=["']?amber-mono["']?\]/);
  });

  // DMNC-1434: dist is flattened (no @layer, for Tailwind v3 consumers), so
  // Tailwind v4's preflight ships UNLAYERED. Unlayered author CSS beats every
  // layered rule regardless of specificity, so a bare `a { color: inherit }`
  // reset defeats a consumer's `@layer utilities` link colours site-wide —
  // even on pages with no eidotter component. `:where()` would not help
  // (layer order is resolved before specificity), so the rule must be gone.
  describe('preflight does not clobber consumer markup (DMNC-1434)', () => {
    const rules = hasBuild ? styleRules(css) : [];
    const setsAny = (rule: Rule, props: string[]) =>
      rule.some((node) => node.type === 'decl' && props.includes(node.prop));

    it('ships no @layer (flattening for Tailwind v3 consumers stays)', () => {
      expect(css).not.toMatch(/@layer/);
    });

    it('ships no bare `a` rule setting color or text-decoration', () => {
      const offenders = rules
        .filter((rule) => rule.selectors.some((s) => unwrapSelector(s) === 'a'))
        .filter((rule) => setsAny(rule, ['color', 'text-decoration', '-webkit-text-decoration']))
        .map((rule) => rule.toString());
      expect(offenders).toEqual([]);
    });

    it('a consumer `@layer utilities { a.text-primary { color } }` rule meets no unlayered eidotter rule that targets every <a>', () => {
      // jsdom cannot resolve a real cascade, so test the mechanism: the only
      // eidotter rules that could beat a consumer's layered `a.text-primary`
      // are unlayered rules matching *every* anchor (a bare `a`, possibly
      // inside a selector list or :where/:is) that set `color`. Class-scoped
      // eidotter anchor rules (`.eidotter-*`) never match consumer markup.
      const consumerRule = postcss.parse('@layer utilities{a.text-primary{color:blue}}');
      let consumerLayered = false;
      consumerRule.walkAtRules('layer', () => {
        consumerLayered = true;
      });
      expect(consumerLayered).toBe(true);

      const clobbering = rules.filter(
        (rule) =>
          rule.selectors.some((s) => unwrapSelector(s) === 'a') && setsAny(rule, ['color'])
      );
      expect(clobbering).toHaveLength(0);
    });

    it('keeps the rest of the preflight (e.g. the textarea/button reset) intact', () => {
      // Guards against an over-eager strip: `textarea{` tail-matches `a{`.
      expect(rules.some((rule) => rule.selectors.some((s) => s.trim() === 'textarea'))).toBe(true);
    });
  });

  // Fonts are externalized post-build (scripts/externalize-fonts.mjs,
  // DMNC-1373). Vite lib-mode force-inlines CSS url() assets as base64;
  // with four ~1MB Nerd Font weights that made dist/eidotter.css ~5.7MB of
  // render-blocking payload — and CSP `font-src 'self'` consumers (eidotter.com)
  // silently lost the fonts entirely (data: URIs are blocked).
  describe('fonts are externalized, not inlined (DMNC-1373)', () => {
    it('contains no data:font URIs', () => {
      expect(css).not.toMatch(/url\(\s*['"]?data:font/i);
    });

    it('stays under 300KB (inlined fonts would put it at ~5.7MB)', () => {
      expect(Buffer.byteLength(css, 'utf-8')).toBeLessThan(300 * 1024);
    });

    it('ships exactly 5 @font-face rules for the two design-system families', () => {
      const fontFaces = css.match(/@font-face\s*\{[^}]*\}/g) ?? [];
      expect(fontFaces).toHaveLength(5);
      const dos = fontFaces.filter((r) => r.includes('Perfect DOS VGA 437'));
      const nerd = fontFaces.filter((r) => r.includes('JetBrains Mono Nerd Font'));
      expect(dos).toHaveLength(1);
      expect(nerd).toHaveLength(4); // Regular / Medium / SemiBold / Bold
    });

    it('every @font-face url() resolves to a file that ships in the package', () => {
      const fontFaces = css.match(/@font-face\s*\{[^}]*\}/g) ?? [];
      const urls = fontFaces.flatMap(
        (r) => [...r.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map((m) => m[1])
      );
      expect(urls.length).toBeGreaterThanOrEqual(5);
      for (const url of urls) {
        // Resolved relative to dist/eidotter.css, targets the packaged fonts dir.
        expect(url).toMatch(/^\.\.\/src\/styles\/fonts\//);
        expect(existsSync(resolve(repoRoot, 'dist', url))).toBe(true);
      }
    });
  });
});

if (!hasBuild) {
  describe('dist/eidotter.css — built-bundle contract', () => {
    it.skip('skipped: run `npm run build` first to enable built-bundle tests', () => {
      // Marker test so test reporters announce the skip cause.
    });
  });
}
