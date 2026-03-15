---
status: complete
priority: p3
issue_id: "027"
tags: [code-review, quality, animation-polish]
dependencies: []
---

# Extract Tabs indicator measurement into local function

## Problem Statement

The indicator measurement logic (querySelector + setProperty) is written twice in the useLayoutEffect — once for initial measurement and once inside ResizeObserver. Extract a local `updateIndicator()` function.
- **Effort**: Small (5 min)
