# FilterBar component (DMNC-382)

**Wave:** 3
**Priority:** Medium
**Branch:** `feat/filterbar`
**Parallel-safe:** Yes

---

Working in /mnt/d/Coding/eidotter on branch main.

Build DMNC-382: FilterBar component.

Full plan at `plans/feat-filter-bar-component.md` — read it first.

Key requirements:
- Multi-select toggle group with `role="toolbar"`
- Optional single-select mode
- Optional count badges
- Optional "All" toggle
- Keyboard navigation (Arrow keys, Space, Home, End)
- BEM CSS using design tokens only
- TypeScript interface with JSDoc

Follow the standard component structure:
```
src/components/FilterBar/
  components/
    FilterBar.tsx
    FilterBar.css
    FilterBar.stories.tsx (7 stories)
    FilterBar.test.tsx (80%+ coverage)
    index.ts
  index.ts
```

Also export from `src/index.ts`. Run full test suite after. Commit on branch `feat/filterbar`, push, create PR.
