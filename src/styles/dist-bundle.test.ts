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

const repoRoot = resolve(__dirname, '..', '..');
const distCssPath = resolve(repoRoot, 'dist', 'eidotter.css');
const hasBuild = existsSync(distCssPath);
const describeIfBuilt = hasBuild ? describe : describe.skip;

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

  it('ships the magenta→white→cyan gradient endpoints', () => {
    // CSS minifier shortens #FF55FF → #f5f and #55FFFF → #5ff. Accept either.
    expect(css).toMatch(/#FF55FF|#f5f/i);
    expect(css).toMatch(/#FFFFFF|#fff/i);
    expect(css).toMatch(/#55FFFF|#5ff/i);
  });

  it('ships background-clip: text and transparent text fill', () => {
    expect(css).toMatch(/background-clip:\s*text/i);
    expect(css).toMatch(/-webkit-text-fill-color:\s*transparent/i);
  });

  it('ships the prefers-reduced-motion: reduce override (DMNC-946)', () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  });

  it('ships the ai-text-shimmer keyframes', () => {
    expect(css).toMatch(/@keyframes\s+ai-text-shimmer/);
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
});

if (!hasBuild) {
  describe('dist/eidotter.css — built-bundle contract', () => {
    it.skip('skipped: run `npm run build` first to enable built-bundle tests', () => {
      // Marker test so test reporters announce the skip cause.
    });
  });
}
