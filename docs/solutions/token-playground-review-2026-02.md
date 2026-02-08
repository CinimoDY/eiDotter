# Token Playground Review — February 2026

**PR:** #84 — feat(tokens): add TokenPlayground with Leva controls
**Date:** 2026-02-08
**Status:** Approved with follow-up items

## What Was Built

An interactive Storybook story at `Design System/Token Playground` that uses the [Leva](https://github.com/pmndrs/leva) library to provide real-time GUI controls for tweaking CSS custom properties. The playground renders 9 eidotter components (Button, Card, Alert, Badge, Input, Progress, Checkbox, Switch, Tabs) and lets designers/developers experiment with token values live.

## Key Architecture

```
Leva useControls() → per-input onChange callback → document.documentElement.style.setProperty()
                     (transient, no React state)   → Components read CSS vars → live update
```

Each Leva input has a per-input `onChange` callback that sets CSS custom properties directly on `:root`, bypassing React re-renders entirely. A `MS_TOKENS` set identifies duration tokens that need `ms` units vs `px`.

## What Worked Well

1. **Leva as devDependency** — correctly scoped, doesn't ship to consumers
2. **Clean cleanup** — `useEffect` return removes all properties on unmount
3. **Unit awareness** — `MS_TOKENS` set handles ms vs px unit suffixes
4. **Comprehensive showcase** — 9 components cover all major component categories
5. **Security** — LOW risk, no user input vulnerabilities, static keys only

## Gotchas Discovered

### Primitive→Semantic Cascading Works Correctly

Semantic tokens in `tokens.css` use `var()` references to primitives:

```css
/* What tokens.css actually outputs: */
--color-semantic-text-accent: var(--color-cga-yellow);
--color-semantic-text-primary: var(--color-cga-light-gray);
--color-semantic-background-primary: var(--color-cga-black);
```

Changing a primitive token on `:root` cascades to all semantic consumers automatically. The playground controls affect the full component tree as expected.

### Leva Per-Input onChange Pattern

Leva's `onChange` must be set **per-input**, not at the folder or `useControls` options level. When `onChange` is provided per-input, Leva defaults to `transient: true` — the value is never stored in React state, so zero re-renders occur during slider drag.

```tsx
// WRONG: onChange at useControls options level is treated as folderSettings, never called
useControls('Colors', { '--color-cga-amber': '#ffb000' }, { onChange: handler });

// CORRECT: onChange per-input, with (value, path) signature
useControls('Colors', {
  '--color-cga-amber': {
    value: '#ffb000',
    onChange: (value: string, path: string) => {
      const key = path.split('.').pop() || path;
      document.documentElement.style.setProperty(key, value);
    },
  },
});
```

## Review Findings Summary

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| 1 | P2 | ~~Primitive-to-semantic token gap~~ (disproven — var() refs cascade) | Corrected |
| 2 | P0 | onChange at folder-level silently ignored by Leva | Fixed (per-input onChange) |
| 3 | P3 | Border-radius controls have no visible effect | Removed |
| 4 | P3 | Deep import paths vs barrel exports | Fixed (barrel exports) |
| 5 | P3 | Unrelated .gitignore scope creep | Accepted as-is |

## Decision

**Approved for merge** — no P1 blockers. P2/P3 items are improvement opportunities tracked in `todos/`.

## Tests

- 399 tests pass (18 suites) — no regressions
- Storybook renders correctly
- Leva panel loads with all 5 control groups
- All 9 showcase components render properly
- Accessibility: 22 passes, 2 violations (pre-existing: Switch missing label, Leva panel contrast)
