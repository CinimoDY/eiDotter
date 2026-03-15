---
status: pending
priority: p3
issue_id: "009"
tags: [code-review, ux, security]
dependencies: ["001"]
---

# Handle unsafe URLs gracefully (render as span, not dead link)

## Problem Statement

When `isSafeUrl` returns false, the plan renders `<a>` without `href`. This creates a dead link — styled as a link but goes nowhere, confusing users.

## Findings

- **Security sentinel**: Render unsafe sources as `<span>` instead of `<a>`, or skip entirely. Add `console.warn` in development mode.

## Proposed Solutions

### Option A: Render as `<span>` with visual differentiation
- **Effort**: Small
- **Risk**: Low

### Option B: Skip the source entirely
- **Effort**: Small
- **Risk**: Low — but consumer loses visibility into why a source disappeared

## Acceptance Criteria

- [ ] Unsafe URLs don't render as dead `<a>` elements
- [ ] Development console.warn when URL is rejected

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
