---
status: pending
priority: p3
issue_id: "020"
tags: [code-review, documentation, timeline-container]
dependencies: []
---

# Document or render TimelineEntry.type field

## Problem Statement

The `type` field (`'event' | 'project' | 'milestone'`) is declared but never consumed in any view rendering. No visual differentiation exists. Agents setting `type` get no visible feedback. Flagged by agent-native-reviewer.

## Proposed Solutions

### Option A: Add JSDoc clarifying it's for consumer use (Quick)
- Add `/** Entry category — not rendered by default; available for consumer-side filtering/styling */`
- **Effort**: Trivial

### Option B: Render as Badge or TimelineNode variant (Future)
- Use different node shapes/colors per type
- **Effort**: Medium

## Acceptance Criteria

- [ ] JSDoc on `type` field clarifies rendering behavior (or type is rendered)
