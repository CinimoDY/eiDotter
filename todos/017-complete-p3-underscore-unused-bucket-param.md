---
status: pending
priority: p3
issue_id: "017"
tags: [code-review, typescript, timeline-container]
dependencies: []
---

# Prefix unused bucket parameter with underscore

## Problem Statement

`handleBucketClick` receives a `bucket: DateBucket` parameter it ignores. Should be `_bucket` to signal intent and prevent lint warnings. Flagged by kieran-typescript-reviewer.

## Technical Details

- **File**: `src/components/TimelineContainer/components/TimelineContainer.tsx` line 178

## Acceptance Criteria

- [ ] Parameter renamed to `_bucket`
