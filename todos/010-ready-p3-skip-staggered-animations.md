---
status: pending
priority: p3
issue_id: "010"
tags: [code-review, simplicity, css]
dependencies: []
---

# Skip staggered source animations for first iteration

## Problem Statement

The plan proposes per-item staggered animations via `--source-index` CSS custom property. This is a visual flourish that adds complexity to both TSX and CSS for the first iteration.

## Findings

- **Simplicity reviewer**: Sources are children of the content container and will inherit the parent's existing transition naturally. Staggering is CSS-only and can be added later without API changes.
- **Performance oracle**: No performance concern with staggered animations, but unnecessary complexity.

## Proposed Solutions

### Option A: Skip staggered animations (Recommended)
Let sources ride the parent container's existing opacity/transform transition.
- **Effort**: Reduces effort
- **Risk**: None — can add later as CSS-only change

## Acceptance Criteria

- [ ] No `--source-index` inline styles or `transition-delay` calc in first iteration
- [ ] Sources appear smoothly with parent container transition

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
