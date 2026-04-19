---
title: CI enforcement of generated file freshness via rebuild-and-diff
date: 2026-04-17
last_updated: 2026-04-18
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
- DMNC-680: Linear issue
- `solutions/developer-experience/single-css-entry-point-2026-04-17.md`: Related consumer DX improvement from the same ideation session
- `solutions/best-practices/v37-component-migration-patterns-2026-04-06.md`: Documents the token pipeline and Tailwind compilation contract
