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

/** Split on commas that are not nested inside parentheses. */
const splitTopLevel = (list: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    const ch = list[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(list.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(list.slice(start).trim());
  return parts.filter(Boolean);
};

/**
 * Flatten one selector into its alternatives, unwrapping a `:where(…)` /
 * `:is(…)` that spans the whole selector (any number of arguments, nested):
 * `:where(a, area)` → `['a', 'area']`, `:where(a)` → `['a']`.
 */
const selectorAlternatives = (selector: string): string[] => {
  const s = selector.trim();
  const open = s.match(/^:(?:where|is)\(/)?.[0].length;
  if (open === undefined) return [s];
  // Find the paren closing the opening one; unwrap only if it ends the
  // selector (`:is(a) :is(b)` is one descendant selector, not two).
  let depth = 1;
  let close = open;
  for (; close < s.length && depth > 0; close++) {
    if (s[close] === '(') depth++;
    else if (s[close] === ')') depth--;
  }
  if (depth !== 0 || close !== s.length) return [s];
  return splitTopLevel(s.slice(open, s.length - 1)).flatMap(selectorAlternatives);
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

describe('selectorAlternatives (test helper)', () => {
  it('unwraps single-argument :where/:is', () => {
    expect(selectorAlternatives(':where(a)')).toEqual(['a']);
    expect(selectorAlternatives(':is(:where(a))')).toEqual(['a']);
  });

  it('splits multi-argument :where on top-level commas', () => {
    expect(selectorAlternatives(':where(a, area)')).toEqual(['a', 'area']);
    expect(selectorAlternatives(':is(a, :where(*, b))')).toEqual(['a', '*', 'b']);
  });

  it('leaves compound and descendant selectors whole', () => {
    expect(selectorAlternatives('textarea')).toEqual(['textarea']);
    expect(selectorAlternatives('a.text-primary')).toEqual(['a.text-primary']);
    expect(selectorAlternatives(':is(a) :is(b)')).toEqual([':is(a) :is(b)']);
    expect(selectorAlternatives(':where(a):hover')).toEqual([':where(a):hover']);
    expect(selectorAlternatives(':is(a):not(.x)')).toEqual([':is(a):not(.x)']);
  });
});

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

  // dist/eidotter.css is flattened (unlayered), so any stock Tailwind size
  // utility it ships beats a consumer's own layered `text-sm` etc. After #516
  // the bundle carried `.text-xs{font-size:1rem}` / `.text-sm{font-size:1rem}`
  // from the body-floor alias, overriding every consumer's own Tailwind sizes
  // (DMNC-1579 fix-forward). Components use text-dos-* only.
  it('ships no stock Tailwind font-size utilities (text-xs … text-9xl)', () => {
    const stock = css.match(/\.(?:[\w-]+\\:)*text-(?:xs|sm|base|lg|xl|[2-9]xl)(?![\w-])/g) ?? [];
    expect(stock).toEqual([]);
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
        .filter((rule) => rule.selectors.some((s) => selectorAlternatives(s).includes('a')))
        .filter((rule) => setsAny(rule, ['color', 'text-decoration', '-webkit-text-decoration']))
        .map((rule) => rule.toString());
      expect(offenders).toEqual([]);
    });

    it('no unlayered rule that would match a consumer `<a class="text-primary">` sets color or text-decoration', () => {
      // jsdom cannot resolve a real cascade, so test the mechanism. dist has
      // no @layer (asserted above), so every rule in it is unlayered and beats
      // a consumer's `@layer utilities { a.text-primary { … } }` whatever its
      // specificity. The rules that match arbitrary consumer anchors are the
      // type-level ones: bare `a`, universal `*`, or either inside
      // :where()/:is(). Class-scoped eidotter rules (`.eidotter-*`) never do.
      const matchesConsumerAnchor = (selector: string) =>
        selectorAlternatives(selector).some((alt) => alt === 'a' || alt === '*');
      expect(rules.length).toBeGreaterThan(100); // really walked the bundle
      const clobbering = rules
        .filter((rule) => rule.selectors.some(matchesConsumerAnchor))
        .filter((rule) => setsAny(rule, ['color', 'text-decoration', '-webkit-text-decoration']))
        .map((rule) => rule.toString());
      expect(clobbering).toEqual([]);
    });

    // Font follow-up: the preflight `html,:host { font-family: <Tailwind default stack> }`
    // and Tailwind's DEFAULT theme font vars (`--font-sans` → system stack)
    // shipped unlayered too, so a v4 consumer's `@theme { --font-sans: … }`
    // (layered) lost to eidotter's copy and their body font reverted to the
    // system stack. Eidotter's own typography sets its families explicitly.
    it('ships no html/:host rule setting font-family', () => {
      const offenders = rules
        .filter((rule) => rule.selectors.some((s) => ['html', ':host'].includes(s.trim())))
        .filter((rule) => setsAny(rule, ['font-family']))
        .map((rule) => rule.toString());
      expect(offenders).toEqual([]);
    });

    it("ships none of Tailwind's default font-family theme vars", () => {
      const tailwindFontVars = ['--font-sans', '--font-mono', '--default-font-family', '--default-mono-font-family'];
      const declared = rules.flatMap((rule) =>
        rule.nodes.filter((n) => n.type === 'decl' && tailwindFontVars.includes(n.prop)).map((n) => n.toString())
      );
      expect(declared).toEqual([]);
    });

    it("keeps eidotter's own font tokens", () => {
      expect(css).toMatch(/--typography-font-family-primary:/);
      expect(css).toMatch(/--typography-font-family-body:/);
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
