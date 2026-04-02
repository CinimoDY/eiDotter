---
title: Timeline Component Consolidation — Reducing Redundancy in a Design System
module: eidotter
date: 2026-04-02
problem_type: best_practice
component: development_workflow
severity: medium
applies_when:
  - Multiple components overlap in functionality
  - A wrapper component adds little value over its internals
  - Inconsistent visual behavior across related components (e.g., different colors for the same axis line)
  - Consumers are confused about which component to use
tags:
  - refactoring
  - component-consolidation
  - design-system
  - timeline
  - deprecation
---

# Timeline Component Consolidation — Reducing Redundancy in a Design System

## Context

eidotter had 4 timeline components that grew organically from different projects:

- **TimelineNode** (from lifelines) — marker primitive, well-designed
- **TimelineEntry** (from eidotter) — expandable card wrapping TimelineNode
- **TimelineList** (from eidotter) — 81-LOC wrapper mapping array to TimelineEntry
- **TimelineContainer** (from lifelines) — multi-zoom interactive timeline with its own internal card rendering

Problems: two axis line implementations with different colors (semantic border vs amber), TimelineContainer didn't share TimelineEntry's card design, TimelineList added almost no value, consumers didn't know which component to use.

## Guidance

### 1. Add a `mode` prop rather than maintaining near-identical components

When two components do similar things (TimelineList = static feed, TimelineContainer = interactive feed), add a mode prop to the richer component rather than keeping both:

- `mode="interactive"` (default) — zoom controls, selection, keyboard shortcuts
- `mode="static"` — read-only vertical feed, no controls

This eliminates the wrapper component (TimelineList) and gives consumers one clear entry point.

### 2. Audit visual inconsistencies before consolidating

Browser measurement (getBoundingClientRect) revealed the axis line was 3.2px off in TimelineList because the node column width varied with date text. The fix: per-entry `::before` with `left: 50%; transform: translateX(-50%)` — always centered regardless of content width.

Color inconsistency (semantic border vs amber-dim) was fixed by standardizing to amber-dim everywhere. The lesson: visually inspect related components side-by-side before declaring them "the same."

### 3. Make fields optional when merging types

TimelineContainer's internal `TimelineEntry` type required `content`, `type`, and `tags`. TimelineList's `TimelineListEntry` made them optional. The merged `TimelineEntryData` makes them all optional and adds optional chaining (`entry.tags?.length`) in views. This is a safe breaking change — consumers passing all fields still work, consumers passing fewer fields now also work.

### 4. Deprecate with a dev-only console.warn

```tsx
React.useEffect(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('eidotter: TimelineList is deprecated. Use <TimelineContainer mode="static"> instead.');
  }
}, []);
```

Fire once per mount (empty deps array), only in development. Keep the export for backwards compatibility.

### 5. Unify card styling via shared CSS, not component replacement

The plan originally proposed replacing `TimelineEntryCard` with `TimelineEntry` inside TimelineContainer's views. But they serve different purposes — TimelineEntryCard is a selectable card in a zoom view (no node column), TimelineEntry is a standalone expandable entry with its own node. Instead: make TimelineEntryCard import TimelineEntry's CSS and use the same BEM classes. Visual unification without architectural disruption.

## Why This Matters

- **One entry point** reduces consumer confusion (TimelineContainer is the timeline component)
- **Shared styling** means visual changes apply everywhere automatically
- **Deprecation with warning** gives consumers time to migrate without breaking existing code
- **Optional fields** in merged types prevent breaking changes when combining strict and flexible interfaces

## When to Apply

- You have 2+ components that serve overlapping use cases
- Consumers ask "which one should I use?"
- Visual inconsistencies exist between related components (different colors, sizes, spacing)
- A wrapper component's entire value is "maps array to child component"

## Related

- `docs/solutions/best-practices/component-architecture-patterns-2026-04-01.md` — co-location, type naming conventions
- PR #186 (timeline consolidation)
- PR #183 (axis alignment fix)
- PR #189 (label truncation fix)
- PR #190 (hover invert effect)
- DMNC-580, DMNC-581
