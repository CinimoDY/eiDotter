---
status: pending
priority: p2
issue_id: "011"
tags: [code-review, accessibility, aria, timeline-container]
dependencies: []
---

# YearView bucket missing button role for screen readers

## Problem Statement

YearView's clickable bucket `<div>` has `onClick`, `onKeyDown`, and `tabIndex={0}` but no `role="button"`. Screen readers announce it as a list item but don't indicate it's interactive. Flagged by architecture-strategist and pattern-recognition-specialist.

## Findings

- **Architecture strategist**: The `<div>` has both `role="listitem"` and interactive handlers — conflicting semantics. Should nest a `<button>` inside the listitem, mirroring how TimelineEntryCard handles this.
- **Pattern recognition specialist**: Same finding — interactive divs without role="button" violate WAI-ARIA best practices.

## Proposed Solutions

### Option A: Nest a `<button>` inside the listitem (Recommended)
- **Pros**: Semantically correct, matches TimelineEntryCard pattern, keyboard accessible by default
- **Cons**: Slightly more DOM nesting
- **Effort**: Small
- **Risk**: Low

### Option B: Add `role="button"` to the div
- **Pros**: Minimal change
- **Cons**: Conflicting roles (listitem + button), less semantic
- **Effort**: Trivial
- **Risk**: Medium — dual roles may confuse assistive technology

## Technical Details

- **File**: `src/components/TimelineContainer/components/views/YearView.tsx` lines 13-30
- **Component**: YearView bucket div

## Acceptance Criteria

- [ ] Year buckets are announced as interactive by screen readers
- [ ] Enter/Space activates the bucket (already works via onKeyDown)
- [ ] No conflicting ARIA roles on the same element
