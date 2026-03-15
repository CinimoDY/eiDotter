---
status: complete
priority: p2
issue_id: "025"
tags: [code-review, performance, animation-polish]
dependencies: []
---

# Replace Progress width/left transitions with compositor-only transforms

## Problem Statement

Progress fill uses `width` transition and transition chars use `left` — both are layout-triggering properties. Multiple progress bars updating simultaneously compound the layout cost.

## Proposed Solutions

Replace `width: var(--fill-pct)` with `transform: scaleX(var(--fill-fraction))` + `transform-origin: left`. Replace `left` on transition chars with `transform: translateX()`. Both are compositor-only.
- **Effort**: Medium (20 min)

## Acceptance Criteria

- [ ] No layout-triggering properties animated on Progress
- [ ] Visual appearance unchanged
- [ ] Tests pass
