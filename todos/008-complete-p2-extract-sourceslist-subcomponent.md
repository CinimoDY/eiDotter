---
status: pending
priority: p2
issue_id: "008"
tags: [code-review, architecture, typescript]
dependencies: ["005"]
---

# Consider extracting SourcesList subcomponent

## Problem Statement

The current InlineExpand.tsx is 113 lines. Adding sources with favicon error handling, URL sanitization, and link rendering will roughly double it. This risks the component losing its single-responsibility focus.

## Findings

- **TypeScript reviewer**: Extract `SourcesList` to `src/components/InlineExpand/components/SourcesList.tsx`. It owns `failedFavicons` state, favicon error handling, and source link rendering. Makes sources independently testable.

## Proposed Solutions

### Option A: Extract SourcesList (Recommended if sources prop is complex)
- **Pros**: InlineExpand stays focused, sources testable in isolation
- **Cons**: More files, slightly more indirection
- **Effort**: Small

### Option B: Keep inline (acceptable if icon/collapseLabel are dropped)
If only `sources` is added (per simplicity recommendation), the growth is ~60 lines, keeping the file under 200. Acceptable.
- **Effort**: None

## Acceptance Criteria

- [ ] Decision made based on final prop scope
- [ ] If extracted: SourcesList has its own test describe block

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
