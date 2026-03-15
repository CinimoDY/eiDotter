---
status: pending
priority: p3
issue_id: "018"
tags: [code-review, typescript, readonly, timeline-container]
dependencies: []
---

# Add readonly to buckets prop in TimelineViewProps

## Problem Statement

`TimelineViewProps.buckets` is `DateBucket[]` (mutable) while `DateBucket.entries` is already `readonly TimelineEntry[]`. For consistency, `buckets` should also be `readonly DateBucket[]`. Flagged by kieran-typescript-reviewer.

## Technical Details

- **Files**: `types.ts` line 42, `TimelineContent.tsx` line 8

## Acceptance Criteria

- [ ] `buckets` typed as `readonly DateBucket[]` in TimelineViewProps
- [ ] Same in TimelineContentProps
