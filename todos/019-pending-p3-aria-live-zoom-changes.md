---
status: pending
priority: p3
issue_id: "019"
tags: [code-review, accessibility, aria-live, timeline-container]
dependencies: []
---

# Add aria-live announcement for zoom level changes

## Problem Statement

When zoom level changes, the entire view swaps but screen reader users get no announcement. Consider an `aria-live="polite"` region or using the Badge in ZoomControls as a live region. Flagged by architecture-strategist and pattern-recognition-specialist.

## Technical Details

- **File**: `ZoomControls.tsx` — the Badge showing current zoom level could have `aria-live="polite"`

## Acceptance Criteria

- [ ] Screen readers announce zoom level changes
