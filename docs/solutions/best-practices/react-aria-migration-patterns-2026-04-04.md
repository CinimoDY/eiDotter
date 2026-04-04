---
title: React Aria migration patterns for eidotter components
date: 2026-04-04
category: best-practices
module: components
problem_type: best_practice
component: tooling
severity: high
applies_when:
  - Migrating an eidotter component to React Aria primitives
  - Wrapping React Aria with a custom prop interface
  - Debugging CSS selectors that target disabled/focused/selected state on React Aria elements
  - Moving indicator/overlay elements inside React Aria containers
  - Adding new interactive components that use Tabs, Modal, or TextField
tags:
  - react-aria
  - tailwind
  - migration
  - accessibility
  - tabs
  - modal
  - input
  - aria-disabled
  - css-selectors
  - focus-trap
  - v37-pattern
---

# React Aria migration patterns for eidotter components

## Context

eidotter migrated 17 components across 5 waves from BEM CSS to Tailwind-first (V.37 pattern), then upgraded 3 interactive components (Input, Tabs, Modal) to React Aria primitives. Each wave's code review caught accessibility and CSS bugs that visual testing missed. This document captures the patterns and pitfalls discovered, extending the earlier Wave 1 doc (`uti-figma-fork-react-aria-migration-2026-04-03.md`) to cover complex interactive primitives.

Migration stack: `react-aria-components` v1.16, Tailwind CSS, `cn()` from `src/utils/cn.ts`, component CSS limited to phosphor glow effects only.

## Guidance

### 1. CSS disabled selectors — use `[data-disabled]`, not `:disabled`

React Aria sets `aria-disabled` on the host element, not the native `disabled` attribute. CSS `:not(:disabled)` always passes, leaking hover styles onto disabled elements.

```css
/* Wrong — :disabled never matches React Aria elements */
.eidotter-tabs__tab:hover:not(:disabled) { opacity: 1; }

/* Correct */
.eidotter-tabs__tab:hover:not([data-disabled]) { opacity: 1; }
```

Prefer React Aria's data attributes for all interactive states: `[data-hovered]`, `[data-focused]`, `[data-pressed]`, `[data-selected]`, `[data-disabled]`.

### 2. TabList rejects non-Tab children

`<AriaTabList>` only renders `<AriaTab>` children. Positioned elements like sliding indicators are silently dropped. Wrap TabList and indicator together in a container div.

```tsx
<div ref={tabListRef} className="relative">
  <AriaTabList>{tabs.map(t => <AriaTab key={t.id} ... />)}</AriaTabList>
  <span className="eidotter-tabs__indicator" aria-hidden="true" />
</div>
```

### 3. Hidden TabPanels required for aria-controls

React Aria generates `aria-controls` on each Tab pointing to a TabPanel. Missing panels create broken ARIA relationships. Render hidden panels even when only the tab bar is used.

```tsx
{tabs.map(t => <AriaTabPanel key={t.id} id={t.id} className="hidden" />)}
```

### 4. Modal — ModalOverlay + Modal + Dialog replaces native dialog

React Aria's three-layer architecture replaces `createPortal` + native `<dialog>` + manual closing state. Use `isEntering`/`isExiting` render props for CRT animations instead of manual CSS class toggling.

```tsx
<AriaModalOverlay isOpen={isOpen} onOpenChange={handleChange} isDismissable
  className={({ isEntering, isExiting }) => cn(
    'eidotter-modal-overlay',
    isEntering && 'eidotter-modal-overlay--entering',
    isExiting && 'eidotter-modal-overlay--exiting',
  )}>
  <AriaModal className={({ isEntering, isExiting }) => cn(
    'eidotter-modal',
    isEntering && 'eidotter-modal--entering',
    isExiting && 'eidotter-modal--exiting',
  )}>
    <AriaDialog className="eidotter-modal__container outline-none">
      {/* content */}
    </AriaDialog>
  </AriaModal>
</AriaModalOverlay>
```

### 5. className goes on the visible element

In React Aria's nesting (`ModalOverlay > Modal > Dialog`), `className` must go on `AriaDialog` (the visible box), not `AriaModal` (an invisible wrapper). Consumer width/margin overrides on the wrong layer have no effect.

### 6. Preserve the full HTML prop interface

When wrapping native elements with React Aria, extend the original HTML attributes interface. A manual prop list drops `onBlur`, `autoFocus`, `autoComplete`, etc.

```tsx
// Wrong — narrows the interface
interface InputProps { label?: string; variant?: string; }

// Correct — preserves all native input props
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: 'default' | 'error';
}
```

### 7. Gap/padding on outer wrapper doesn't reach list children

`<AriaTabs>` renders an outer wrapper. Gap/padding set on it doesn't cascade to `<AriaTabList>` children. Apply spacing to the list element directly via `.eidotter-tabs__list`.

### 8. useLayoutEffect deps for indicator repositioning

In uncontrolled mode, the controlled `selectedKey` prop never changes. Add internal selection state to the dependency array so the indicator repositions on user clicks.

```tsx
const [internalKey, setInternalKey] = useState(defaultKey);
useLayoutEffect(() => { repositionIndicator(); }, [internalKey, variant]);
```

### 9. CSS class naming — TSX maps must match CSS selectors

Size/variant class maps in TSX must produce identical strings to CSS selectors. The FilterBar bug (PR #202): TSX emitted `--sm/--md/--lg` but CSS defined `--small/--medium/--large`.

### 10. High-contrast — neutralize glow effects

`prefers-contrast: high` must suppress `box-shadow` and `text-shadow` phosphor glows. Focus indication in high-contrast mode relies on solid borders and outlines.

### 11. Disabled background override

Explicit `background` on disabled state prevents Firefox UA disabled tint from overriding eidotter colors.

### 12. Review after every wave

Code review caught 4 bugs in Wave 3 and 6 in Wave 5. Always review before merging — review catches CSS/ARIA mismatches that tests miss.

### 13. UTI React as reference

Untitled UI's free React components (via `mcp__untitledui__get_component`) provide clean React Aria patterns. Fetch the UTI equivalent before writing custom wiring. (auto memory [claude])

## Why This Matters

React Aria migration touches accessibility, keyboard navigation, focus management, and animation systems simultaneously. Bugs are invisible in visual testing — broken `aria-controls`, disabled hover leaks, and className on wrong layers all pass Storybook but fail screen reader audits and WCAG automated checks.

## When to Apply

- Migrating any component from manual `onKeyDown`/`aria-*` to React Aria primitives
- Any component using `<dialog>`, `createPortal`, or manual focus trap
- Any compound component with controlled/uncontrolled duality (Tabs, Select, Combobox)
- Any component with CSS-animated entry/exit driven by a closing-state boolean
- Before writing custom keyboard handling — check if a React Aria primitive handles it

## Examples

**Tabs disabled CSS fix (before/after):**
```css
/* Before — leaks hover on disabled tabs */
.eidotter-tabs__tab:hover:not(:disabled) { opacity: 1; }

/* After — correct for React Aria */
.eidotter-tabs__tab:hover:not([data-disabled]) { opacity: 1; }
```

**Modal architecture (before/after):**
```tsx
// Before: native dialog + createPortal + manual closing state (168 lines)
createPortal(<dialog ref={ref} className={cn('modal', closing && 'modal--closing')}>, portal)

// After: React Aria ModalOverlay + Modal + Dialog (90 lines)
<AriaModalOverlay isOpen={isOpen} isDismissable>
  <AriaModal><AriaDialog>{children}</AriaDialog></AriaModal>
</AriaModalOverlay>
```

## Related

- `docs/solutions/best-practices/uti-figma-fork-react-aria-migration-2026-04-03.md` — Wave 1 patterns (Button, Figma restyling, amber-mono). This doc extends sections 5-6 for complex interactive primitives.
- `docs/plans/2026-04-04-001-feat-component-audit-v37.md` — the audit plan (status: complete)
- PRs: #200 (Wave 1), #201 (Wave 2), #202 (Wave 3), #203 (Wave 4), #206 (React Aria wave)
- GitHub #197 — opaque default backgrounds in consuming sites (related migration pitfall)
- Linear: DMNC-589 through DMNC-606 (full epic)
