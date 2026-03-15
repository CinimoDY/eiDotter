---
status: complete
priority: p1
issue_id: "021"
tags: [code-review, typescript, animation-polish]
dependencies: []
---

# Tag onClose receives null instead of event — breaks consumer contract

## Problem Statement

Tag's animate-then-unmount pattern calls `onClose(null as unknown as React.MouseEvent)` in two places (triggerClose reduced-motion path and handleAnimationEnd). Consumers accessing `event.target`, `event.currentTarget`, or `event.stopPropagation()` will get a runtime TypeError.

## Findings

- Flagged by 6/8 review agents (Security, Architecture, TypeScript, Agent-Native, Pattern, Simplicity)
- The `onClose` type declares `(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => void`
- After animation completes, the original event is no longer available — the callback fires asynchronously

## Proposed Solutions

### Option A: Make event parameter optional (Recommended)
Change `onClose` type to `(event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => void` and call `onClose?.()` without fabricating an event.
- **Pros**: Honest API, no runtime risk, semver minor (additive change)
- **Cons**: Consumers must handle `undefined` event
- **Effort**: Small

### Option B: Store original event in ref and forward
Capture the triggering event in a ref, pass it through in handleAnimationEnd.
- **Pros**: Preserves original event for consumers who need it
- **Cons**: Event may be stale/pooled by React, more complex
- **Effort**: Medium

## Acceptance Criteria

- [ ] `onClose` callback never receives `null`
- [ ] No `as unknown as` casts in Tag.tsx
- [ ] Existing tests pass
- [ ] Type change is backward-compatible (optional param)
