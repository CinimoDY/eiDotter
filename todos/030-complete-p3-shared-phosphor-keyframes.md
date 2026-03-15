---
status: complete
priority: p3
issue_id: "030"
tags: [code-review, architecture, animation-polish]
dependencies: []
---

# Extract phosphor-energize keyframe to shared CSS

## Problem Statement

`@keyframes phosphor-energize` is defined identically in Button.css and Checkbox.css. CSS keyframes are global — cascade order determines which wins. Extract to shared `src/styles/keyframes.css`.
- **Effort**: Small (10 min)
