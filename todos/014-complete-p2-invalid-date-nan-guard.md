---
status: pending
priority: p2
issue_id: "014"
tags: [code-review, robustness, validation, timeline-container]
dependencies: []
---

# Guard against invalid dates producing NaN bucket labels

## Problem Statement

`TimelineEntry.date` is typed as `string` with JSDoc saying "ISO 8601" but has no runtime validation. Malformed dates like `"not-a-date"` produce `NaN` keys and `"undefined NaN"` labels. Flagged by security-sentinel and agent-native-reviewer as the most likely agent failure mode.

## Findings

- **Security sentinel**: `new Date("not-a-date")` returns Invalid Date; `getUTC*()` returns NaN; bucket keys become `"NaN"`, `"NaN-NaN"`, etc.
- **Agent-native reviewer**: This is the highest-risk agent failure mode — agents constructing entries could pass malformed dates and get silent corruption.

## Proposed Solutions

### Option A: Filter invalid entries in groupEntriesByZoom (Recommended)
- Add `isNaN(new Date(entry.date).getTime())` check, skip entries with invalid dates
- Optionally `console.warn` in dev mode
- **Effort**: Small
- **Risk**: Low

### Option B: Export a `validateTimelineEntry` helper
- **Effort**: Medium — new public API surface
- **Risk**: Low

## Technical Details

- **File**: `src/components/TimelineContainer/components/timelineUtils.ts` — `groupEntriesByZoom` function

## Acceptance Criteria

- [ ] Entries with invalid dates are silently filtered (not rendered as NaN)
- [ ] Valid entries still render correctly
- [ ] Test added for invalid date input
