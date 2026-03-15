---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, testing, accessibility]
dependencies: []
---

# Address `inert` attribute JSDOM testing gap

## Problem Statement

JSDOM does not implement the `inert` attribute behaviorally. Elements inside an `inert` subtree remain focusable and clickable in Jest tests. This means tests cannot verify the core accessibility behavior of collapsed content.

## Findings

- **Architecture strategist**: No other eiDotter component uses `inert` — this sets a new precedent. Test for attribute presence as a proxy.
- **TypeScript reviewer**: React 19 + @types/react 19.2.7 natively supports `inert`. Can simplify to `inert={!isExpanded}` (no need for `true : undefined`).

## Proposed Solutions

### Option A: Attribute-presence tests + comment (Recommended)
```typescript
expect(contentWrapper).toHaveAttribute('inert');
// Note: inert behavior verified via browser-level testing (Storybook)
```
- **Effort**: Small
- **Risk**: Low — documents the gap

### Option B: Add Storybook interaction tests for full behavioral verification
- **Effort**: Medium
- **Risk**: Low

## Acceptance Criteria

- [ ] Tests check `inert` attribute presence when collapsed, absence when expanded
- [ ] Comment in test file acknowledging JSDOM limitation
- [ ] Simplify to `inert={!isExpanded}` (React 19 handles false → omit)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
