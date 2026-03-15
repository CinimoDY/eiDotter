---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, architecture, typescript, correctness]
dependencies: []
---

# Use URL-keyed Set for failedFavicons state

## Problem Statement

The plan uses `Set<number>` (array index) for tracking failed favicons. If the `sources` array is reordered or items added/removed, indices shift and wrong favicons get hidden.

## Findings

- **Architecture strategist**: Key by URL string — stable across reorders, eliminates need for `useEffect` reset.
- **TypeScript reviewer**: `Set<string>` keyed on `source.url` is more type-safe and correct.
- **Performance oracle**: URL-keyed approach makes the `useEffect` reset self-correcting, since new URLs won't match old failed set.

## Proposed Solutions

### Option A: `Set<string>` keyed on source URL (Recommended)
```typescript
const [failedFavicons, setFailedFavicons] = useState<Set<string>>(new Set());
// onError: setFailedFavicons(prev => new Set(prev).add(source.url))
// render: !failedFavicons.has(source.url)
```
- **Effort**: Small
- **Risk**: Low

## Acceptance Criteria

- [ ] `failedFavicons` uses `Set<string>` keyed on URL
- [ ] `useEffect` reset either removed or uses stable dependency
- [ ] Reordering sources does not corrupt favicon display state

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
