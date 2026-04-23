---
title: CI enforcement of generated file freshness via rebuild-and-diff
date: 2026-04-17
last_updated: 2026-04-23
category: workflow-issues
module: eidotter
problem_type: workflow_issue
component: development_workflow
severity: medium
applies_when:
  - design token pipeline generates files from JSON sources
  - generated files are checked into version control
  - convention alone enforces "do not edit generated files directly"
  - CI does not verify generated output matches source
tags:
  - ci
  - tokens
  - generated-files
  - style-dictionary
  - build-verification
  - git-diff
  - github-actions
  - ce-review
---

# CI enforcement of generated file freshness via rebuild-and-diff

## Context

eidotter's token pipeline (Style Dictionary v5) generates 10 files across 5 platforms from JSON sources in `src/tokens/`:

| Output | Platform |
|--------|----------|
| `src/styles/tokens.css` | CSS custom properties |
| `src/styles/tokens.js` | JavaScript ES6 exports |
| `src/styles/tokens.json` | JSON nested structure |
| `src/styles/theme.*.css` (5 files) | CSS theme overrides |
| `tailwind.preset.cjs` | Tailwind config preset |
| `platforms/swiftui/.../EiDotterTokens.swift` | Swift constants |

The rule "do not edit tokens.css directly" was enforced by convention only — a comment in the generated file header and a CLAUDE.md quick rule. Before this fix, the only CI workflow that ran `build-tokens` was the Storybook deploy (`deploy-storybook.yml`). The main `build.yml` and `publish.yml` workflows skipped token rebuilding entirely.

A prior incident with Tailwind classes confirmed this risk pattern: before Tailwind was installed, V.37 migration utility classes were dead class names that produced visible failures but no CI detection. (session history)

## Guidance

Add a CI step that rebuilds generated files from source and diffs against what's committed. Use `git diff --exit-code` with targeted file paths.

```yaml
# .github/workflows/build.yml — after npm ci, before npm run build
- name: Check token freshness
  run: |
    npm run build-tokens
    git diff --exit-code -- \
      src/styles/tokens.css \
      src/styles/tokens.js \
      src/styles/tokens.json \
      src/styles/theme.*.css \
      tailwind.preset.cjs \
      platforms/swiftui/Sources/EiDotterTokens/
```

**Placement:** Before the main build to fail fast — no point spending time on Vite if tokens are stale.

**Failure output:** `git diff --exit-code` prints the actual diff on failure. Contributors see exactly which files are stale and what changed. No custom error messaging needed.

**Only include generated files in the glob.** Hand-written shims that happen to sit next to generated artifacts (e.g., `tailwind.preset.enhanced.cjs`, added in PR #283 as a deprecation alias for the generated `tailwind.preset.cjs`) must **not** be in the diff list — they're not emitted by `npm run build-tokens`, so adding them would cause the CI check to fail every time CI runs. The file header on each generated artifact should say "AUTO-GENERATED" and the hand-written one should be explicitly marked (e.g., `@note Hand-written — NOT generated`). See `docs/solutions/developer-experience/deprecation-shim-pattern-2026-04-18.md` for the deprecation-shim pattern.

## Why This Matters

- **Convention-based rules fail.** "Do not edit directly" comments are invisible to CI and easy to bypass accidentally (a quick local fix, a forgotten rebuild after editing JSON sources).
- **Enforcement catches two failure modes:** hand-edits to generated files AND forgotten rebuilds after editing JSON sources.
- **Fail-fast placement** prevents wasting CI time on a build that will ship stale tokens.

## Known gap — PR #291 counterexample (2026-04-23)

The pattern is correct but the guardrail has been observed to not fire in at least one real case: **PR #291 at sha `f54f93d` shipped a new semantic token (`--color-semantic-text-muted`) with `style-dictionary.config.mjs`'s `semanticVarMap` extended but `tailwind.preset.cjs` not regenerated**. The `dos-text-muted` key was missing from `theme.extend.colors`, so the documented consumer utility `text-dos-text-muted` silently resolved to nothing. CI was green on that commit. The drift was caught by `/ce:review` — three of four persona reviewers (correctness P0/0.98, api-contract P1/0.95, project-standards high/0.95) independently flagged the same issue. Fix landed in commit `ba4ec15`.

What we haven't confirmed: *why* the `git diff --exit-code` step passed. Three hypotheses, from most to least likely:

1. **Required-status configuration gap.** `build.yml`'s freshness step runs but isn't a required status on the `main` branch protection rule — so a red status doesn't block merge. Verify via `gh api repos/CinimoDY/eiDotter/branches/main/protection` and confirm `required_status_checks.contexts` includes the freshness-check job.
2. **Scope mismatch.** The `git diff` glob may cover `tailwind.preset.cjs` but the Style Dictionary platform that emits it may have been skipped (or its output path renamed by PR #282's consolidation and not re-added here). Verify by running `npm run build-tokens` on a clean checkout and confirming `tailwind.preset.cjs` appears in `git status`.
3. **Race between local regen and force-push.** Author ran `build-tokens`, committed all artifacts, CI passed, then force-pushed a later commit that didn't include the preset regen; freshness check was not re-run on the final commit. Unlikely because the freshness step runs on every push, but possible if concurrency cancelling is configured aggressively.

**Immediate follow-up work** (opportunistic, not blocking this doc):

- Verify the freshness job is a required status on `main` (hypothesis 1).
- Add a unit test alongside the CI check: `tailwind-preset.contract.test.ts` asserts every key in `src/tokens/base.tokens.json`'s `semantic.color` branch exists in `require('../tailwind.preset.cjs').theme.extend.colors`. Unlike the git-diff check, a contract test can't be silently bypassed by a misconfigured workflow — a drift will fail `npm test` regardless of which workflow runs first.
- Document the "hand-written files that reference token names" class of drift separately — it's a different failure mode not addressed by this guardrail. See `solutions/best-practices/token-name-drift-hand-written-css-2026-04-23.md`.

## When to Apply

- Any project with generated files committed to version control (token pipelines, code generators, schema-derived types)
- When the build step that produces generated files is separate from the main build (as with Style Dictionary vs Vite)
- When adding a new Style Dictionary platform — update the `git diff` glob list in the CI step

## Examples

**The pattern generalizes to any generated file pipeline:**

```yaml
# Generic: rebuild, diff, fail if stale
- name: Check generated file freshness
  run: |
    npm run generate-types      # or whatever produces the generated files
    git diff --exit-code -- path/to/generated/
```

**Adding a new generated output:** When adding a new Style Dictionary platform (e.g., Android Compose tokens), add its output path to the `git diff` glob list:

```yaml
    git diff --exit-code -- \
      src/styles/tokens.css \
      ... \
      platforms/android/src/main/java/com/eidotter/Tokens.kt  # new
```

## Related

- PR #281: ci: add token freshness check to build workflow
- PR #291: feat(tokens): adopt handoff token divergences — counterexample where the freshness check did not fire
- PR #282: feat: merge Tailwind presets into single generated file — the setup that made `tailwind.preset.cjs` a generator output
- DMNC-680: Linear issue
- `solutions/developer-experience/single-css-entry-point-2026-04-17.md`: Related consumer DX improvement from the same ideation session
- `solutions/best-practices/v37-component-migration-patterns-2026-04-06.md`: Documents the token pipeline and Tailwind compilation contract
- `solutions/best-practices/token-name-drift-hand-written-css-2026-04-23.md`: Sibling failure mode — hand-written CSS references obsolete token names after a rename, not caught by this guardrail
