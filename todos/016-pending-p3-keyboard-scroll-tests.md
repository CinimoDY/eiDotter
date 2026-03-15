---
status: pending
priority: p3
issue_id: "016"
tags: [code-review, testing, timeline-container]
dependencies: []
---

# Add keyboard shortcut and scroll-to-zoom tests

## Problem Statement

The keyboard handler (Ctrl+=/-/0, Escape) and scroll-to-zoom (Ctrl+wheel) have no test coverage. These are significant interaction paths with scoping logic that could regress. Flagged by kieran-typescript-reviewer, architecture-strategist, and pattern-recognition-specialist.

## Proposed Solutions

### Option A: Add integration tests (Recommended)
- Test Ctrl+= zooms in, Ctrl+- zooms out, Ctrl+0 resets, Escape deselects
- Test Ctrl+wheel-down calls zoomOut
- Test `keyboardShortcuts={false}` disables behavior
- **Effort**: Small-Medium
- **Risk**: None

## Acceptance Criteria

- [ ] At least one test per keyboard shortcut (4 shortcuts)
- [ ] At least one scroll-to-zoom test
- [ ] Test that `keyboardShortcuts={false}` disables shortcuts
