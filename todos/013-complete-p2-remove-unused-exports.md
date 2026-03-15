---
status: pending
priority: p2
issue_id: "013"
tags: [code-review, quality, yagni, timeline-container]
dependencies: []
---

# Remove unused `setZoomLevel` and `featured` field

## Problem Statement

Two YAGNI violations: `setZoomLevel` in useZoom is exported but never consumed, and `featured?: boolean` on TimelineEntry is declared but never read by any view. Flagged by code-simplicity-reviewer and agent-native-reviewer.

## Findings

- **Simplicity reviewer**: `setZoomLevel` (useZoom.ts lines 76-78) wraps `updateLevel` but is never called by TimelineContainer or any consumer. Dead code.
- **Simplicity reviewer**: `featured` (types.ts line 27) is optional and never read by any view — no visual differentiation for featured entries.
- **Agent-native reviewer**: `featured` misleads agents into thinking their categorization choice has a visible effect.

## Proposed Solutions

### Option A: Remove both (Recommended)
- Delete `setZoomLevel` from useZoom return + interface
- Delete `featured` from TimelineEntry
- **Effort**: Trivial (~6 lines)
- **Risk**: None — no consumers exist

## Acceptance Criteria

- [ ] `setZoomLevel` removed from `UseZoomReturn` and return object
- [ ] `featured` removed from `TimelineEntry` interface
- [ ] All tests still pass
