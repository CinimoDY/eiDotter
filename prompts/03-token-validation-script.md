# Token validation script (DMNC-253)

**Wave:** 1 (Quick Win)
**Priority:** Low
**Branch:** `feat/token-validation`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Create DMNC-253: Token validation script.

1. Read `src/tokens/colors.json`, `src/tokens/base.tokens.json`, `src/tokens/semantic.tokens.json`
2. Read `src/styles/tokens.css` (generated output)
3. Create `scripts/validate-tokens.js` that:
   - Parses source JSON token files
   - Parses generated CSS for `--color-*`, `--spacing-*`, `--shadow-*` custom properties
   - Compares: every source token should have a corresponding CSS variable
   - Reports any missing, extra, or mismatched values
   - Exits with code 1 if validation fails
4. Add npm script: `"validate-tokens": "node scripts/validate-tokens.js"` to package.json
5. Run it and fix any issues found
6. Commit on branch `feat/token-validation`, push, create PR
