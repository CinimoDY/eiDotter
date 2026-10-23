---
status: complete
priority: p1
issue_id: "003"
tags: [code-review, architecture, accessibility, html-validity]
dependencies: []
---

# Fix `<ul>` inside `<span>` invalid HTML

## Problem Statement

The plan renders sources as `<ul>` (block element) inside the content wrapper, which is currently a `<span>`. Block elements inside inline elements is invalid HTML. This is critical because InlineExpand is designed for inline use within paragraphs.

## Findings

- **Security sentinel**: The root element is `<span>` (line 88) and content wrapper is `<span>` (line 102-110). Putting `<ul>` inside `<span>` is invalid HTML and may cause unpredictable browser rendering.
- **Architecture strategist**: This conflicts with the component's primary use case — inline disclosure within prose.

## Proposed Solutions

### Option A: Keep inline semantics, use styled `<span>` elements instead of `<ul>/<li>`
Render sources as `<span>` elements with appropriate ARIA roles (`role="list"`, `role="listitem"`).
- **Pros**: Preserves inline usage, valid HTML
- **Cons**: Less semantic
- **Effort**: Small
- **Risk**: Low

### Option B: Change root to `<div>` and document as block-level component
- **Pros**: Allows proper `<ul>/<li>` semantics
- **Cons**: Breaking change — existing inline-in-paragraph usage would break
- **Effort**: Small but breaking
- **Risk**: High

## Acceptance Criteria

- [ ] No block elements nested inside inline elements
- [ ] Sources still have list semantics (via ARIA roles if using spans)
- [ ] Component remains usable inline within `<p>` elements

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-07-11 | Verified InlineExpand renders `span[role=list]` / `span[role=listitem]` (no `<ul>` inside `<span>`); no code change needed. Closed as part of the P1 URL-safety sweep. | Invalid HTML was already fixed in prior work — this pass only confirmed and recorded it. |
