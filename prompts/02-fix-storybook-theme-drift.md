# Fix Storybook dos-amber theme drift (DMNC-368)

**Wave:** 1 (Quick Win)
**Priority:** High
**Branch:** `fix/storybook-theme-drift`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Fix DMNC-368: Storybook dos-amber theme drifts from token pipeline.

1. Read `.storybook/preview-head.html` — it has a hand-written `dos-amber` theme with inline CSS
2. Read `.storybook/preview.ts` — the decorator uses `data-theme="amber-mono"`
3. Read `src/styles/tokens.css` — the official token values
4. The problem: `preview-head.html` duplicates and overrides token values, causing drift (e.g., `text-secondary` was wrong)
5. Remove the hand-written theme from `preview-head.html`
6. Ensure the decorator in `preview.ts` correctly applies `data-theme="amber-mono"` which loads from `tokens.css`
7. Start Storybook (`pkill -f storybook; npx storybook dev -p 6006`) and visually verify components render correctly
8. Run `npx jest --silent` to verify no test regressions
9. Commit on branch `fix/storybook-theme-drift`, push, create PR

IMPORTANT: Always `pkill -f storybook` before starting — zombie processes stack up.
