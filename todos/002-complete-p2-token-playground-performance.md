---
status: complete
priority: p2
issue_id: PR-84
tags: [code-review, performance, token-playground]
dependencies: []
---

# Token Playground: Re-render Cascade on Slider Tick

## Problem Statement

Every Leva slider adjustment triggers a full React re-render cascade. The `useTokenSync` hook uses `useEffect` with object dependency `[tokens]`, which creates a new object reference on every change, causing the effect to fire on every frame (~60/sec when dragging sliders). All 9 showcase components re-render on each tick.

**Why it matters:** Causes visible jank and dropped frames when adjusting spacing/animation sliders quickly. Not a production issue (Storybook-only) but degrades the developer experience.

## Findings

- **Location:** `src/components/Tokens/TokenPlayground.stories.tsx` lines 40-57
- **Root cause:** `useControls()` returns a new object reference on every value change; `useEffect([tokens])` compares by reference
- **Impact:** 9 components x ~60fps = ~540 re-renders/sec during slider drag

## Proposed Solutions

### Option A: Use Leva `onChange` callback for transient updates (Recommended)
- **Pros:** Bypasses React entirely for DOM updates, zero re-renders during drag
- **Cons:** Slightly more complex hook implementation
- **Effort:** Small
- **Risk:** Low

### Option B: Wrap ComponentShowcase in React.memo
- **Pros:** Prevents child re-renders when showcase props haven't changed
- **Cons:** Components still re-render from CSS changes (they read CSS vars), not a full fix
- **Effort:** Small
- **Risk:** Low

### Option C: Debounce the token sync
- **Pros:** Reduces render frequency
- **Cons:** Introduces perceived lag in live preview
- **Effort:** Small
- **Risk:** Low

## Recommended Action

Option A — Leva's `onChange` callback can set CSS custom properties directly without triggering React re-renders.

## Acceptance Criteria

- [ ] Dragging sliders doesn't cause visible jank
- [ ] CSS custom properties update in real-time during drag

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-08 | Identified during PR #84 performance review | Leva onChange callbacks bypass React for transient DOM updates |

## Resources

- PR #84: https://github.com/CinimoDY/eiDotter/pull/84
- Leva docs: https://github.com/pmndrs/leva
