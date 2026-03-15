---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, performance]
dependencies: []
---

# Defer favicon rendering until first expand

## Problem Statement

Favicon `<img>` elements are in the DOM even when collapsed. Some browsers initiate network requests for images in the DOM regardless of visibility. With multiple InlineExpands on a page, this causes unnecessary favicon requests on initial load.

## Findings

- **Performance oracle**: Use a `hasBeenExpanded` ref (`useRef(false)`) to gate `<img>` rendering. Once expanded, keep favicons in DOM for exit animation.

## Proposed Solutions

### Option A: `hasBeenExpanded` ref pattern (Recommended)
```tsx
const hasBeenExpanded = useRef(false);
if (isExpanded) hasBeenExpanded.current = true;
// In render:
{hasBeenExpanded.current && source.favicon && !failedFavicons.has(source.url) ? <img.../> : fallback}
```
- **Effort**: Small
- **Risk**: Low

## Acceptance Criteria

- [ ] Favicon images not rendered until component has been expanded at least once
- [ ] Favicons remain in DOM during collapse animation (no flash to fallback)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
