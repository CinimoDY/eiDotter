---
title: Icon SVG clipping when CSS resizes spritesheet icons
date: 2026-04-06
category: ui-bugs
module: Icon
problem_type: ui_bug
component: tooling
symptoms:
  - Icons clipped on right edge when CSS overrides size to smaller than native 24px
  - Featured icon outline rings in Alert/Notification partially hidden
  - Icon appears cut off in any context where CSS width/height differs from spritesheet symbol dimensions
root_cause: config_error
resolution_type: dependency_update
severity: high
tags: [icon, svg, viewbox, spritesheet, clipping, pixelarticons, alert, notification]
---

> **UPDATE (2026-04-11, PR #257):** The solution below historically used `@untitledui-pro/icons` as the replacement, but that dependency was later removed for license reasons (UTI Pro is not sublicensable for redistribution in published npm packages). The current implementation uses [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT licensed) instead. The root-cause lesson — **always set `viewBox` on resizable SVGs** — is unchanged and correct. Mentally substitute `pixelarticons/react/InfoBox` for `@untitledui/icons`'s `InfoCircle` in the code samples below; both ship proper `viewBox` attributes and solve the same problem.

# Icon SVG clipping when CSS resizes spritesheet icons

## Problem

The Icon component rendered SVGs from a spritesheet via `<use href>`, but the outer `<svg>` element had no `viewBox` attribute. When CSS resized the SVG (e.g., from 24px to 20px for Alert/Notification featured icons), the 24×24 coordinate space was clipped rather than scaled — cutting off the right and bottom edges of every icon.

## Symptoms

- Icons in Alert and Notification appeared clipped on the right edge
- Adding CSS `width: 20px !important` to the SVG made the clipping worse
- Increasing the icon container size or adding margins/overflow didn't help because the SVG content itself was being clipped internally
- The issue was only visible when the CSS size differed from the spritesheet's native 24×24 symbol dimensions

## What Didn't Work

1. **Adding `overflow: visible` to the icon container** — the clipping was inside the SVG element itself, not caused by parent overflow
2. **Adding `margin: 9px` to reserve space for outline rings** — shifted the icon but didn't fix the SVG content clipping
3. **Making the container 38-40px with adjusted ring insets** — rings rendered correctly, but the icon SVG inside was still clipped
4. **Adding `viewBox="0 0 24 24"` to Icon.tsx** — correct diagnosis but Storybook HMR didn't hot-reload the change, making it appear ineffective

## Solution

Replaced the custom SVG spritesheet system with `@untitledui/icons` — MIT-licensed React SVG components with proper `viewBox` built in.

```tsx
// Before: spritesheet with <use href> — no viewBox on outer SVG
<svg className="icon icon--s">
  <use href="/icons/sprites.svg#Info" />
</svg>

// After: UTI React component — proper viewBox, scales at any size
import { InfoCircle } from '@untitledui/icons';
<InfoCircle size={24} className="icon__svg" />
```

The Icon component API stayed the same — `<Icon name="Warning" size="S" />` — with an internal `ICON_MAP` that maps eidotter names to UTI components:

```tsx
const ICON_MAP: Record<string, UTIIcon> = {
  'Info': InfoCircle,
  'Warning': AlertTriangle,
  'Error': AlertCircle,
  'Done': CheckCircle,
  'Close': X,
  // ... 12 icons total
};
```

## Why This Works

The root cause was the missing `viewBox` attribute on the SVG element. Without `viewBox`, an SVG's coordinate system is defined by its `width`/`height` attributes. When CSS overrides those dimensions to something smaller, the browser crops rather than scales.

UTI icons are proper React components that render inline `<svg viewBox="0 0 24 24">` — the `viewBox` ensures the 24×24 coordinate space scales proportionally to any CSS size. The `size` prop controls the rendered dimensions while `viewBox` handles the scaling.

## Prevention

- **Always set `viewBox` on SVGs** that may be resized via CSS — without it, resizing crops instead of scales
- **Prefer component-based icon libraries** (like `@untitledui/icons`) over spritesheet `<use href>` patterns — components handle viewBox, accessibility, and tree-shaking natively
- **When using a spritesheet**, ensure the outer `<svg>` element copies the `viewBox` from the `<symbol>` being referenced

## Related Issues

- PR #225: `feat: migrate Icon to @untitledui/icons`
- PR #223: `fix: prevent featured icon clipping in Alert and Notification` (initial CSS-only fix, superseded by #225)
- PR #224: `fix: icon clipping + release v0.17.1` (closed, superseded by #225)
