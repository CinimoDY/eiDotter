---
title: Hand-written CSS silently drifts when token names are renamed
date: 2026-04-23
category: best-practices
module: tokens
problem_type: best_practice
component: development_workflow
severity: medium
applies_when:
  - design token names are renamed or reorganized
  - hand-written CSS (not generated) references those tokens via `var(--token-name)`
  - tokens are used with a fallback value — `var(--old-name, 1rem)` — which silently masks a missing custom property
  - no test, lint, or build step asserts that every `var(--*)` reference resolves to a defined custom property
tags:
  - design-tokens
  - css
  - typography
  - silent-failure
  - tailwind
  - lint
  - ce-review
  - token-rename
---

# Hand-written CSS silently drifts when token names are renamed

## Context

When a design-token rename lands (e.g., eiDotter PR #246 renamed typography tokens from `2xs / xs / sm / base / lg / xl / 2xl / 3xl / 4xl` to `text-xs..xl` + `display-xs..2xl`), every hand-written CSS file that references the old names silently stops theme-tracking. The CSS syntax `var(--does-not-exist, 1rem)` is **valid** and emits no warnings; browsers resolve it to the fallback value and move on. Nothing breaks loudly.

This is distinct from the generated-file freshness problem documented in `solutions/workflow-issues/token-staleness-ci-check-2026-04-17.md`. That one is about forgetting to run the generator. This one is about hand-written CSS that references names the generator no longer emits.

PR #291 shipped `src/styles/dos-utilities.css` (a new opt-in utility sheet) with seven obsolete token refs copied from an older style guide:

```css
/* BROKEN — these token names don't exist after PR #246 */
.dos-body { font-size: var(--typography-font-size-base, 1rem); }
.dos-body-lg { font-size: var(--typography-font-size-lg, 1.125rem); }
.dos-caption { font-size: var(--typography-font-size-sm, 0.875rem); }
.dos-micro { font-size: var(--typography-font-size-xs, 0.75rem); }
.dos-h3 { font-size: var(--typography-font-size-4xl, 2.25rem); }
.dos-h4 { font-size: var(--typography-font-size-3xl, 1.875rem); }
.dos-h5 { font-size: var(--typography-font-size-2xl, 1.5rem); }
```

Every one of those tokens resolved to its literal fallback. The file-header claim — "All classes resolve through the repo's existing semantic + primitive tokens, so they track the active theme" — was factually false. Theme switches (amber-mono → cga-amber → cga-mode4/5) did not affect these utilities at all.

`/ce:review`'s correctness reviewer caught it at confidence 0.97 while cross-checking token names against `tokens.css`. (ce:review session, 2026-04-23)

## Guidance

Treat a token rename as a **rename-refactor with repo-wide blast radius**, not a generator-only change. The generator updates its own output — the hand-written callsites are the author's responsibility.

**The protocol for a token rename:**

1. **Grep before renaming.** Before changing a token name, enumerate every reference across `src/**/*.{css,tsx,ts}` and `platforms/**/*.swift`:

   ```bash
   grep -rn "var(--typography-font-size-base)" src/
   grep -rn "text-dos-text-primary" src/   # Tailwind class form
   ```

   The count is your migration work list.

2. **Emit deprecated aliases during the overlap window.** For one release cycle, have the generator emit both the old and new names:

   ```css
   /* tokens.css — temporary during rename */
   --typography-font-size-base: var(--typography-font-size-text-md);  /* @deprecated: use text-md */
   --typography-font-size-text-md: 1.375rem;
   ```

   This keeps existing consumer CSS working while you migrate callsites. Remove the aliases once the grep count hits zero.

3. **Repo-wide lint after migration.** Add a CI script that parses the current `src/tokens/*.tokens.json` into the set of valid token names, then greps the repo for `var(--*)` references and fails if any don't resolve. Sketch:

   ```js
   // scripts/lint-token-refs.mjs
   import { globSync } from 'glob';
   import { readFileSync } from 'fs';

   const validNames = extractTokenNamesFromJson('src/tokens/*.tokens.json');
   const files = globSync('src/**/*.{css,tsx,ts}');
   const bad = [];
   for (const file of files) {
     const content = readFileSync(file, 'utf8');
     const refs = [...content.matchAll(/var\((--[a-z0-9-]+)/g)].map(m => m[1]);
     for (const ref of refs) {
       if (!validNames.has(ref)) bad.push({ file, ref });
     }
   }
   if (bad.length) {
     console.error('Unresolved token refs:', bad);
     process.exit(1);
   }
   ```

4. **Assert import order in utility CSS.** Any hand-written file that references tokens must carry a header comment making the dependency explicit, so a consumer omitting `eidotter/tokens.css` gets a discoverable cause of the silent-failure symptom:

   ```css
   /*
    * Requires `eidotter/tokens.css` (or `eidotter/styles`) to be imported
    * first — without it every `var()` fallback kicks in and the utilities
    * stop tracking the theme.
    */
   ```

## Why This Matters

- **CSS `var()` fallbacks mask drift.** The pattern `var(--name, fallback)` is the CSS way to be defensive against missing custom properties. That same pattern hides rename-induced breakage. No error, no warning, no test failure — the page just renders with the fallback value, which often looks "close enough" to be missed in manual review.
- **Tailwind classes don't reveal this.** `text-dos-text-md` is a Tailwind alias that resolves to a CSS variable reference. Tailwind doesn't know whether the variable is defined — it just emits the reference. So a broken token underlies a working-looking class. This is the Tailwind-preset twin of this problem.
- **The linter is the only reliable catch.** Visual regression suites can catch visible breaks, but a muted-text color that's "slightly wrong" in an obscure corner will not be flagged by a snapshot diff. A lint step that proves every `var(--*)` resolves to a defined token is the only deterministic guardrail.
- **ce:review caught this one, but ce:review doesn't run on every PR.** It's an on-demand review, not CI. A missed review means the drift ships.
- **Contrast limits.** The default-theme resolution `--color-semantic-text-muted` = `#9A5700` on `#020003` has a contrast ratio of ~3.67:1 — passes WCAG AA-Large (3:1, applies at ≥18.66px / 24px unless bold) but fails AA-Normal (4.5:1). The `.dos-caption` (20px) and `.dos-label` (20px) utilities ride the AA-Large threshold. The `.dos-micro` (18px) is right at the boundary. Scope muted-text usage to non-critical supplementary copy (timestamps, counts, footnotes). Do not use muted for primary body text or any copy a user needs to read carefully.

## When to Apply

- Any PR that adds new CSS with `var(--typography-*)`, `var(--color-semantic-*)`, `var(--spacing-*)`, or similar token refs.
- Any PR that renames tokens in `src/tokens/*.tokens.json`.
- Any PR that copies CSS from an older component as a starting point (the copied file may reference obsolete names).
- Especially: opt-in utility CSS meant to be consumed by external projects — silent drift there damages consumer trust.

## Examples

**Before fix (PR #291, `dos-utilities.css`):**

```css
.dos-body {
  font-size: var(--typography-font-size-base, 1rem);
  line-height: var(--typography-line-height-text-md, 1.5);
  color: var(--color-semantic-text-primary);
}
/* Renders at 16px (fallback). Theme switch changes nothing. */
```

**After fix (commit `ba4ec15`):**

```css
.dos-body {
  font-size: var(--typography-font-size-text-md, 1.375rem);
  line-height: var(--typography-line-height-text-md, 1.5rem);
  color: var(--color-semantic-text-primary);
}
/* Renders at 22px. Theme switch re-resolves the custom property. */
```

**Prior related pattern (session history):** A March 18 eiDotter session on a homepage sync identified a smaller-scale version of this problem — a developer used `--color-cga-amber` where `--color-semantic-text-accent` was correct. That incident prompted a CLAUDE.md rule about semantic-vs-primitive token choice. The rename scenario documented here is the structural cousin: same class of silent drift, but triggered by a name change rather than a wrong-name choice.

## Related

- PR #291: the incident PR; `f54f93d` shipped the obsolete refs, `ba4ec15` fixed them
- PR #246: the typography rename that created the drift window
- `solutions/workflow-issues/token-staleness-ci-check-2026-04-17.md`: sibling failure mode — generator didn't run at all (distinct from this one, where the generator ran but callsites were stale)
- `solutions/developer-experience/deprecation-shim-pattern-2026-04-18.md`: the deprecation-alias pattern applied to subpath exports — same idea, different surface; this doc extends it to token-name aliases
- `solutions/best-practices/v37-component-migration-patterns-2026-04-06.md`: V.37 component patterns — token references updated to post-rename names in PR #297
