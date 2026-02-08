# Fix Icon.css undefined tokens (DMNC-365)

**Wave:** 1 (Quick Win)
**Priority:** Medium
**Branch:** `fix/icon-undefined-tokens`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Fix DMNC-365: Icon.css references undefined token variables.

1. Read `src/components/Icon/components/Icon.css`
2. Replace `--color-system-foreground` with `var(--color-semantic-text-primary)`
3. Replace `--color-system-link-hover` with `var(--color-semantic-text-accent)`
4. Check for any other undefined `--color-system-*` references across all CSS files
5. Run `npx jest src/components/Icon` to verify tests pass
6. Run `npx jest --silent` to verify no regressions (393 tests expected)
7. Commit on a new branch `fix/icon-undefined-tokens`, push, and create PR

Reference: Token mapping is in `src/styles/tokens.css`. Use `var(--color-semantic-*)` tokens.
