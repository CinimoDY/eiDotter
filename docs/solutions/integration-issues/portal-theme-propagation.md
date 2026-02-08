---
title: Portal Theme Propagation via useThemePortal Hook
problem_type: integration-issues
component: Modal
related_components: [Tooltip, Popover, Dropdown]
tags: [portal, theme, css-variables, createPortal, MutationObserver, data-theme]
severity: medium
complexity: moderate
pr: "#106"
linear_issue: DMNC-364
date_resolved: 2026-02-08
---

# Portal Theme Propagation via useThemePortal Hook

## Problem

`createPortal(..., document.body)` moves content outside any `[data-theme]` container. Theme CSS scopes tokens to `[data-theme="X"]` selectors, so portaled content falls back to `:root` tokens instead of the intended theme. This breaks multi-theme layouts where different sections use different themes.

**Symptoms:**
- Modal appears with wrong theme colors
- Portal content ignores `data-theme` set on ancestor elements
- Dynamic theme switching doesn't affect portaled components

**Root cause:** `createPortal` relocates DOM to `document.body`, breaking the CSS attribute selector cascade from `[data-theme]` ancestors.

## Solution: useThemePortal Hook

A ~50-line internal hook that creates a portal container on `document.body` and copies the nearest ancestor's `data-theme` attribute onto it. A `MutationObserver` keeps it in sync for dynamic theme changes.

### Architecture

```
React Tree                              DOM Tree
─────────────────────────────────────────────────────────────
[App data-theme="cga-mode4-p1"]        [App data-theme="cga-mode4-p1"]
  └─ [Modal Component]                   └─ <span ref={anchorRef} />  ← hidden probe
       └─ <portal>                   [document.body]
                                         └─ <div data-eidotter-portal
                                                  data-theme="cga-mode4-p1">
                                               └─ <dialog>  ← inherits theme!
```

### Key Pattern: Anchor-Ref as DOM Probe

The Modal renders a hidden `<span>` in the normal React tree. This span's DOM position allows `closest('[data-theme]')` to traverse real ancestors, even though the portal content itself lives on `document.body`.

```tsx
// In the component
const anchorRef = useRef<HTMLSpanElement>(null);
const portalContainer = useThemePortal(anchorRef);

return (
  <>
    <span ref={anchorRef} style={{ display: 'none' }} aria-hidden="true" />
    {portalContainer && createPortal(<dialog>...</dialog>, portalContainer)}
  </>
);
```

### Hook Implementation Details

1. **Lazy container creation** — synchronous, so `createPortal` has a target on first render
2. **Effect #1** — mounts container to `document.body`, removes on unmount
3. **Effect #2** — reads `sourceRef.current.closest('[data-theme]')`, copies value, sets up `MutationObserver`
4. **SSR guard** — returns `null` when `typeof document === 'undefined'`

### Why Not Alternatives?

| Alternative | Rejection Reason |
|-------------|-----------------|
| Modal-level inline fix | Duplicated when adding tooltips/popovers |
| "Just use `:root`" | Breaks multi-theme support |
| React Context | Library is CSS-first, no providers needed |
| CSS `@scope` | Insufficient browser support |

## Edge Cases

| Case | Behavior |
|------|----------|
| No `data-theme` ancestor | Falls back to `:root` tokens (same as before) |
| Theme on `<html>` | `closest()` finds it, copies to portal |
| Nested themes | `closest()` finds innermost — correct |
| Dynamic theme switch | MutationObserver re-syncs |
| SSR | Returns `null`, portal not rendered server-side |
| Multiple Modals | Each gets its own container — may be in different theme scopes |

## Test Coverage

6 tests in `src/hooks/useThemePortal.test.ts`:

1. Creates container with `data-eidotter-portal` marker on `document.body`
2. Copies `data-theme` from nearest themed ancestor
3. No `data-theme` when no themed ancestor exists
4. Updates when ancestor `data-theme` changes (MutationObserver)
5. Removes container on unmount
6. Marker attribute persists

## Prevention

- Any new portal-based component (tooltip, popover, dropdown) should use `useThemePortal` instead of portaling directly to `document.body`
- Template: `const container = useThemePortal(anchorRef)` + `createPortal(..., container)`
- Always include a hidden anchor `<span>` in the React tree for DOM probing

## Files

| File | Role |
|------|------|
| `src/hooks/useThemePortal.ts` | Hook implementation |
| `src/hooks/index.ts` | Barrel export (internal only) |
| `src/hooks/useThemePortal.test.ts` | 6 test cases |
| `src/components/Modal/components/Modal.tsx` | First consumer |

## Cross-References

- [Modal button color inheritance plan](../../../plans/fix-modal-button-color-inheritance.md) — originally scoped portal fix as out-of-scope
- [Token cascade verification](../token-playground-review-2026-02.md) — confirms `var()` refs cascade correctly once `data-theme` is present
