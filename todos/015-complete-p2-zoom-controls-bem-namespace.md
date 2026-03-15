---
status: pending
priority: p2
issue_id: "015"
tags: [code-review, naming, bem, timeline-container]
dependencies: []
---

# ZoomControls BEM block breaks timeline- namespace convention

## Problem Statement

The CSS block `zoom-controls` does not follow the `timeline-` prefix used by all other sub-components (`timeline-container`, `timeline-axis`, `timeline-view`). If another component needs zoom controls, the name would collide. Flagged by pattern-recognition-specialist.

## Proposed Solutions

### Option A: Rename to `timeline-zoom-controls` (Recommended)
- Rename BEM block in CSS and TSX
- **Effort**: Small
- **Risk**: Low — internal CSS only

### Option B: Keep as-is
- The component is internal, collision unlikely in practice
- **Effort**: None
- **Risk**: Low

## Technical Details

- **Files**: `ZoomControls.css` (line 3), `ZoomControls.tsx` (line 25)

## Acceptance Criteria

- [ ] All BEM blocks within TimelineContainer share the `timeline-` prefix
- [ ] No CSS class name collisions with other eidotter components
