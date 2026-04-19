---
title: Bundle all consumer CSS into a single import
date: 2026-04-17
last_updated: 2026-04-19
category: developer-experience
module: eidotter
problem_type: developer_experience
component: tooling
severity: medium
applies_when:
  - consumer installs eidotter as an npm package
  - library ships multiple CSS files that must be loaded in correct order
  - forgetting an import causes silent visual failures
tags:
  - css-imports
  - consumer-setup
  - entry-point
  - barrel-file
  - dx
---

# Bundle all consumer CSS into a single import

## Context

eidotter consumers previously needed three separate CSS imports to use the library:

```ts
import 'eidotter/fonts.css';   // @font-face for Flexi IBM VGA True
import 'eidotter/styles';      // Component CSS + compiled Tailwind utilities
import 'eidotter/tokens.css';  // CSS custom property definitions
```

This three-import requirement evolved incrementally rather than being designed upfront. The original two-import pattern (styles + tokens) gained a third when `fonts.css` was separated for Storybook loading. (session history)

Forgetting any one import produced silent failures with no error: missing `tokens.css` caused all semantic CSS variables to resolve as empty, rendering text invisible on the black background. Missing `fonts.css` fell back to system monospace. Neither produced a console error.

## Guidance

Add generated CSS files as side-effect imports in the barrel file (`src/index.ts`). Vite collects all CSS side-effect imports and bundles them into the single `dist/eidotter.css` output.

```ts
// src/index.ts
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/tailwind.css';
```

Import order matters for CSS cascade: fonts (no dependencies) -> tokens (defines variables) -> tailwind/component utilities (consumes variables).

After this change, consumers need only:

```ts
import 'eidotter/styles';
```

Keep granular exports (`eidotter/fonts.css`, `eidotter/tokens.css`) in `package.json` for consumers who override fonts or tokens independently.

## Why This Matters

- **Silent failures are the worst DX.** A missing import that produces no error and no visible symptom (invisible text on black) wastes hours of debugging time.
- **Every consumer hits this on day one.** If setup requires a "quick rule" in CLAUDE.md, it needs automation.
- **Non-breaking migration.** Consumers who still import all three get harmless duplicate CSS declarations (CSS custom properties are idempotent when redeclared with identical values).

The three-import requirement was never validated end-to-end in a consumer project before this fix. The eidotter-home consumer used Astro's layout system rather than the documented pattern. (session history)

## When to Apply

- When adding new CSS that consumers need (e.g., new token files, new shared styles) — bundle it into the barrel rather than adding a new import requirement
- When building any library that ships CSS — prefer a single entry point over requiring consumers to assemble multiple imports in the correct order
- When a consumer setup step has a documented "quick rule" — that's a signal it should be automated away

## Examples

**Consumer migration (PR #280):**

```diff
- import 'eidotter/fonts.css';
- import 'eidotter/styles';
- import 'eidotter/tokens.css';
+ import 'eidotter/styles';
```

**Verification:** After `npm run build`, grep `dist/eidotter.css` for `--color-cga-black` to confirm token variables are present in the bundle.

## Related

- PR #280: feat: single CSS entry point for consumer imports
- DMNC-679: Linear issue
- `solutions/best-practices/v37-component-migration-patterns-2026-04-06.md`: Documents that Tailwind is compiled into `dist/eidotter.css` — consumers do NOT need Tailwind installed
