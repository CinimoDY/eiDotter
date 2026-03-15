---
status: complete
priority: p2
issue_id: "023"
tags: [code-review, architecture, animation-polish]
dependencies: ["022"]
---

# Extract useAnimatedDismiss hook from Alert + Tag

## Problem Statement

Alert and Tag implement identical animate-then-unmount state machines (~22 lines each): isClosing state, closingRef guard, triggerClose callback, handleAnimationEnd callback. Future dismissible components (Toast, Notification) would add more copies.

## Proposed Solutions

### Option A: Extract to src/hooks/useAnimatedDismiss.ts (Recommended)
`useAnimatedDismiss(animationName, onDismiss)` returns `{ isClosing, triggerClose, handleAnimationEnd }`.
- **Effort**: Medium (30 min)
- Depends on #022 (shared prefersReducedMotion)

## Acceptance Criteria

- [ ] Alert and Tag both use the shared hook
- [ ] ~22 LOC removed from each component
- [ ] Tests pass unchanged
