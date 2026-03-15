---
status: complete
priority: p3
issue_id: "029"
tags: [code-review, tokens, animation-polish]
dependencies: []
---

# Badge and TimelineNode use hardcoded 150ms instead of duration tokens

## Problem Statement

`badge-enter` and `node-enter` use hardcoded `150ms` while other enter animations use `var(--duration-normal, 200ms)` or `var(--duration-fast, 100ms)`. Use token fallback pattern for consistency.
- **Effort**: Small (5 min)
