---
title: tailwind-merge strips BEM class names that match Tailwind prefixes
date: 2026-04-09
category: ui-bugs
module: design-system
problem_type: ui_bug
component: tooling
symptoms:
  - "cn('text-scramble', 'text-white') drops 'text-scramble' from output"
  - "Component loses its CSS class when consumer passes Tailwind utilities via className"
  - "Styles silently disappear with no error or warning"
root_cause: logic_error
resolution_type: code_fix
severity: high
tags:
  - tailwind-merge
  - cn
  - bem
  - css-class-naming
  - eidotter-prefix
---

# tailwind-merge strips BEM class names that match Tailwind prefixes

## Problem

BEM class names like `text-scramble`, `card`, or `inline-expand` collide with Tailwind CSS utility prefixes. When passed through `cn()` (which uses `tailwind-merge`), the merge algorithm treats them as Tailwind utilities and strips them during conflict resolution.

## Symptoms

- `cn('text-scramble', 'text-white')` outputs `'text-white'` — the BEM class is gone
- `cn('inline', 'eidotter-inline-expand--expanded', 'block')` strips `inline` because `block` is a conflicting display utility
- Components lose their styling when consumers pass Tailwind classes via `className` prop
- No runtime error — the class is silently removed

## What Didn't Work

- **Manual class array concatenation**: TextScramble used `[].filter(Boolean).join(' ')` to avoid `cn()`, but this meant consumers couldn't safely override classes and the component was inconsistent with the rest of the library
- **Keeping BEM names and hoping for the best**: Any BEM name that happens to start with a Tailwind prefix (`text-`, `bg-`, `border-`, `inline`, `block`, `flex`, etc.) is at risk

## Solution

Prefix all component CSS class names with `eidotter-` namespace. This makes them invisible to `tailwind-merge` since they don't match any Tailwind utility pattern.

**Before:**
```tsx
const classes = cn('text-scramble', isScrambling && 'text-scramble--scrambling', className);
```

**After:**
```tsx
const classes = cn('eidotter-text-scramble', isScrambling && 'eidotter-text-scramble--scrambling', className);
```

CSS selectors rename correspondingly:
```css
/* Before */
.text-scramble { display: inline; }
.text-scramble--scrambling { opacity: 0.9; }

/* After */
.eidotter-text-scramble { display: inline; }
.eidotter-text-scramble--scrambling { opacity: 0.9; }
```

## Why This Works

`tailwind-merge` identifies Tailwind utilities by their prefix patterns (`text-`, `bg-`, `p-`, `m-`, etc.). When two classes share a prefix group, the later one wins and the earlier is dropped. The `eidotter-` prefix doesn't match any Tailwind prefix pattern, so `tailwind-merge` passes it through untouched.

This is the same strategy used by other component libraries — Radix uses `rt-`, shadcn uses component-specific prefixes. The key insight is that `tailwind-merge` is a smart deduplicator, not a dumb string merger — you must avoid its detection patterns.

## Prevention

- **Never use bare BEM class names** in components that use `cn()` / `tailwind-merge`. Always use the `eidotter-` prefix.
- **Never use Tailwind utility names as base classes** (e.g., don't use `'inline'` as a stable component class — it's a Tailwind `display` utility that can be stripped).
- **Test class merging**: When adding a new component, verify that `cn('eidotter-component', 'text-white')` preserves both classes.

## Related Issues

- DMNC-630: Migration of remaining BEM components to Tailwind-first
- DMNC-623: cn() migration across all components
- PR #240: Implementation of the full migration
