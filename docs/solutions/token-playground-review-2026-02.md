# Token Playground Review — February 2026

**PR:** #84 — feat(tokens): add TokenPlayground with Leva controls
**Date:** 2026-02-08
**Status:** Approved with follow-up items

## What Was Built

An interactive Storybook story at `Design System/Token Playground` that uses the [Leva](https://github.com/pmndrs/leva) library to provide real-time GUI controls for tweaking CSS custom properties. The playground renders 9 eidotter components (Button, Card, Alert, Badge, Input, Progress, Checkbox, Switch, Tabs) and lets designers/developers experiment with token values live.

## Key Architecture

```
Leva useControls() → React state → useTokenSync hook → document.documentElement.style.setProperty()
                                                      → Components read CSS vars → live update
```

The `useTokenSync` custom hook syncs Leva values to CSS custom properties on `:root`. A `MS_TOKENS` set identifies duration tokens that need `ms` units vs `px`.

## What Worked Well

1. **Leva as devDependency** — correctly scoped, doesn't ship to consumers
2. **Clean cleanup** — `useEffect` return removes all properties on unmount
3. **Unit awareness** — `MS_TOKENS` set handles ms vs px unit suffixes
4. **Comprehensive showcase** — 9 components cover all major component categories
5. **Security** — LOW risk, no user input vulnerabilities, static keys only

## Gotchas Discovered

### Primitive vs Semantic Token Gap (Important!)

**The most significant finding:** Changing primitive tokens (e.g., `--color-cga-amber`) does NOT cascade to semantic tokens (e.g., `--color-semantic-text-accent`). This is because Style Dictionary outputs hardcoded hex values in semantic tokens, not `var()` references.

```css
/* What tokens.css actually outputs: */
--color-semantic-text-accent: #e5b936;  /* hardcoded, not var(--color-cga-yellow) */

/* So changing --color-cga-amber on :root has no effect on semantic consumers */
```

**Implication for token pipeline:** If we ever want primitive→semantic cascading, we'd need to change Style Dictionary transforms to output `var()` references instead of resolved values.

### Performance Pattern

Leva's `onChange` callback is preferred over `useControls()` return value for DOM-only updates. The current approach triggers full React re-renders on every slider tick (~60/sec). Using `onChange` bypasses React entirely.

```tsx
// Current (re-renders React):
const colors = useControls('Colors', { ... });
useTokenSync(colors);

// Better (DOM-only, no React re-render):
useControls('Colors', { ... }, {
  onChange: (values) => {
    for (const [key, value] of Object.entries(values)) {
      document.documentElement.style.setProperty(key, value);
    }
  }
});
```

## Review Findings Summary

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| 1 | P2 | Primitive-to-semantic token gap | Todo created |
| 2 | P2 | Re-render cascade on slider drag | Todo created |
| 3 | P3 | Border-radius controls have no visible effect | Todo created |
| 4 | P3 | Deep import paths vs barrel exports | Todo created |
| 5 | P3 | Unrelated .gitignore scope creep | Accepted as-is |

## Decision

**Approved for merge** — no P1 blockers. P2/P3 items are improvement opportunities tracked in `todos/`.

## Tests

- 399 tests pass (18 suites) — no regressions
- Storybook renders correctly
- Leva panel loads with all 5 control groups
- All 9 showcase components render properly
- Accessibility: 22 passes, 2 violations (pre-existing: Switch missing label, Leva panel contrast)
