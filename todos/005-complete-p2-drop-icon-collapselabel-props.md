---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, simplicity, architecture, api-design]
dependencies: []
---

# Consider dropping `icon` and `collapseLabel` props

## Problem Statement

The simplicity reviewer and pattern reviewer both flag these props as unnecessary or pattern-violating:
- `icon` is achievable via existing `children: ReactNode` — no security/a11y justification for a dedicated prop
- `collapseLabel` string-as-gate pattern is unique in the codebase (violates boolean-gate convention used by Tag, Badge, FilterBar)
- The trigger already toggles collapse — a separate collapse button only matters when trigger scrolls out of view (consumer concern, not primitive concern)

## Findings

- **Simplicity reviewer**: Drop both props. Ship only `sources`. ~125 LOC saved, ~40% smaller diff.
- **Pattern reviewer**: `collapseLabel` string-as-gate breaks FilterBar's `showAll`/`allLabel` boolean+string pattern. If kept, split into `collapsible?: boolean` + `collapseLabel?: string`.
- **Architecture strategist**: 3 new props keeps component focused (9 total, comparable to Tag's 10). Props are justified.

## Proposed Solutions

### Option A: Ship only `sources` prop (Recommended by simplicity reviewer)
Document `icon` and `collapseLabel` as composition patterns in Storybook.
- **Pros**: Minimal API, ~40% smaller diff, no pattern violations
- **Cons**: Consumers compose icon/collapse themselves
- **Effort**: Reduces effort (less to build)

### Option B: Keep all 3 but fix `collapseLabel` pattern
Split into `collapsible?: boolean` + `collapseLabel?: string` to match FilterBar convention.
- **Pros**: Full feature set, pattern-consistent
- **Cons**: Larger API surface, more to test

### Option C: Keep `sources` + `collapseLabel` (fixed), drop `icon`
Middle ground — collapse button has more UX value than icon, and sources is justified.
- **Effort**: Medium

## Acceptance Criteria

- [ ] Decision made on which props to ship
- [ ] If `collapseLabel` kept: split into boolean + string per codebase convention
- [ ] Composition patterns documented in Storybook stories regardless

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
