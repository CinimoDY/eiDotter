---
title: Integrating Untitled UI v8.0 with eidotter design system
date: 2026-04-03
category: best-practices
module: design-system
problem_type: best_practice
component: tooling
severity: medium
applies_when:
  - Restyling a third-party Figma component library to match eidotter CGA aesthetic
  - Migrating eidotter components from BEM CSS to React Aria + Tailwind-first
  - Adding new components from Untitled UI to the eidotter library
tags:
  - figma
  - untitled-ui
  - react-aria
  - tailwind
  - cga-palette
  - amber-mono
  - design-tokens
  - button
---

# Integrating Untitled UI v8.0 with eidotter design system

## Context

eidotter is a DOS-themed React component library with 33 components using BEM CSS and CSS custom properties from a Style Dictionary token pipeline. To accelerate growth, the team forked the Untitled UI v8.0 PRO VARIABLES Figma file (691 variables) and restyled it to CGA DOS aesthetic. The Button component was then migrated to React Aria + Tailwind-first as the reference pattern for 17 more components.

## Guidance

### 1. Use Figma Console MCP for programmatic variable updates

The Southleft `figma-console-mcp` provides 92+ tools with full read/write access via a plugin bridge. Use `figma_execute` for bulk updates. The built-in Claude.ai Figma MCP is read-only and rate-limited.

### 2. Restyle primitives first, then audit semantics

Batch-update the primitives collection (343 colors) to CGA palette. Semantic tokens (273 vars) that alias into primitives auto-update. But theme-specific overrides need manual correction.

### 3. Convert amber-mono aliases to direct values

The amber-mono theme shifts ALL CGA colors to amber phosphor hues (lightGray becomes #B87C1A, not #AAAAAA). Semantic tokens in this mode cannot alias to real CGA primitives. Convert to direct hex values.

### 4. Read existing CSS as source of truth for interaction states

Before setting any V.37 semantic token values, read the existing component CSS and extract the exact variant x state color matrix. Eidotter buttons invert on hover — secondary goes dark bg/amber text to amber bg/black text. V.37 tokens must reproduce this.

### 5. React Aria + Tailwind migration pattern

- React Aria primitive for accessible keyboard/press handling
- Tailwind utilities for layout/sizing via `cn()` helper
- CSS file only for phosphor glow effects (multi-layer box-shadows, keyframes)
- Prefix variant classes as `eidotter-btn--*`
- Backward-compatible prop aliases (small→sm, medium→md, large→lg)

### 6. React Aria onPress passes PressEvent, not MouseEvent

React Aria's `onPress` handler receives a `PressEvent` (with `pointerType`, `target`, etc.), not a native `MouseEvent`. When wrapping `onPress` to also call a legacy `onClick` prop, construct a proper synthetic event from the `PressEvent.target` — don't cast an empty object.

### 7. Test against behavior, not BEM classes

After migration, tests should assert on ARIA attributes, text content, and `eidotter-*` prefixed classes — not old BEM selectors like `.button--primary`. Tests querying `role`, `aria-label`, `aria-current`, etc. survive future CSS refactors.

### 8. cn() should pass filtered array directly to twMerge

Don't `.join(' ')` before passing to `twMerge` — pass the filtered array directly. `twMerge` handles arrays natively and this avoids double-space artifacts from falsy values.

### 9. Prefix ALL CSS classes with `eidotter-<component>`

Internal structural classes (e.g. `progress__fill`, `stat__trend`) must also be prefixed to avoid consumer collisions. Pattern: `eidotter-progress__fill`, `eidotter-breadcrumb__link`.
## Why This Matters

UTI provides 600+ production components. Restyling Figma variables and adopting React Aria lets eidotter grow without rebuilding each component from scratch. The amber-mono alias problem alone caused every component to render with wrong colors until diagnosed.

## When to Apply

- When restyling UTI Figma variables to CGA palette
- When adding a new component sourced from UTI designs
- When migrating existing BEM CSS components to React Aria + Tailwind
- When creating theme-specific (amber-mono) token overrides

## Examples

**Amber-mono alias fix:**
Before: `bg-secondary` aliases to `primitives/Neutral/800` → resolves to #000000 (real CGA)
After: `bg-secondary` set as direct value #010103 (amber-shifted near-black)

**Button migration structure:**
- `Button.tsx`: React Aria `AriaButton` + Tailwind via `cn()` + variant CSS class
- `Button.css`: phosphor glow effects only (box-shadow, keyframes, prefers-reduced-motion)
- Props: backward-compatible aliases + new V.37 sizes (xs, xl) and variants (tertiary, destructive)

## Related

- Linear: DMNC-589 through DMNC-600 (full epic)
- Plans: `docs/plans/2026-04-03-001-feat-figma-uti-restyle-plan.md`
- Audit: `docs/plans/2026-04-04-001-feat-component-audit-v37.md`
- PR #198: React Aria deps, PR #200: Button migration
