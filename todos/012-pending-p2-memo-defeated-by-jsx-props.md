---
status: pending
priority: p2
issue_id: "012"
tags: [code-review, performance, react-memo, timeline-container]
dependencies: []
---

# React.memo on TimelineEntryCard defeated by JSX children/footer props

## Problem Statement

`TimelineEntryCard` is wrapped in `React.memo` with a comment claiming "only 2 cards re-render on selection change." However, `children` and `footer` props are inline JSX — new references every render — so the memo comparison always fails. All N cards re-render on every selection change at month/day/hour zoom levels. Flagged by performance-oracle.

## Findings

- **Performance oracle**: `footer` prop in DayView/HourView creates new `<TagGroup>` JSX every render. `children` prop in all views creates new `<span>`, `<p>`, `<time>`, `<div>` elements every render. Combined, React.memo provides zero benefit at day/hour levels.
- **Impact**: At 100+ entries, selection toggle causes unnecessary re-renders of all entry cards instead of just the 2 affected.

## Proposed Solutions

### Option A: Move rendering inside TimelineEntryCard (Recommended)
- Pass `entry`, `zoomLevel`, and `isSelected` as primitives. Let the card decide what to render internally based on zoom level.
- **Pros**: Memo comparison works on primitives/stable refs, true O(2) re-renders on selection
- **Cons**: TimelineEntryCard becomes zoom-aware, slightly more coupled
- **Effort**: Medium
- **Risk**: Low

### Option B: Custom memo comparator
- Use `React.memo(Component, (prev, next) => prev.entry.id === next.entry.id && prev.isSelected === next.isSelected)`
- **Pros**: Minimal structural change
- **Cons**: Fragile — new props added later won't be compared. Ignores footer/children changes.
- **Effort**: Small
- **Risk**: Medium

### Option C: Accept the current behavior
- The memo is decorative. Remove it or keep it as documentation of intent.
- **Pros**: No code change
- **Cons**: Performance degrades with entry count
- **Effort**: None
- **Risk**: Low for small datasets

## Technical Details

- **Files**: `TimelineEntryCard.tsx`, `views/DayView.tsx`, `views/HourView.tsx`, `views/MonthView.tsx`
- **Root cause**: JSX expressions as props are always new object references

## Acceptance Criteria

- [ ] Selection toggle re-renders only 2 entry cards (previously selected + newly selected)
- [ ] React DevTools Profiler confirms reduced re-render count
