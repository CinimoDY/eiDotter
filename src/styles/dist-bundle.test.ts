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
    // CSS minifier may strip attribute-value quotes (`=ai-draft` vs `="ai-draft"`),
    // both forms are valid CSS. Match either.
    expect(css).toMatch(/\[data-provenance=["']?ai-draft["']?\]\s*\{/);
  });

  it('ships the --color-semantic-text-ai-draft custom property', () => {
    expect(css).toMatch(/--color-semantic-text-ai-draft:\s*#ff1a8c/i);
  });

  it('ships the --color-semantic-text-ai-draft-glow custom property', () => {
    // CSS minifier may collapse rgba(255, 26, 140, 0.5) to the equivalent
    // 8-digit hex (#ff1a8c80) — both encode the same colour. Match either.
    expect(css).toMatch(/--color-semantic-text-ai-draft-glow:\s*(rgba\(|#ff1a8c80)/i);
  });

  it('ships the prefers-contrast: high neutralization', () => {
    // The bundle minifier may reorder; assert both the @media and the inner override exist.
    expect(css).toMatch(/@media\s*\(prefers-contrast:\s*high\)/);
  });
});

if (!hasBuild) {
  describe('dist/eidotter.css — built-bundle contract', () => {
    it.skip('skipped: run `npm run build` first to enable built-bundle tests', () => {
      // Marker test so test reporters announce the skip cause.
    });
  });
}
