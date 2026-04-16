---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, security, xss, utility]
dependencies: []
---

# Create shared `isSafeUrl` utility

## Problem Statement

`source.url` is rendered directly into `<a href>` — a `javascript:alert(1)` URL is an XSS vector. The same vulnerability exists in Breadcrumb's `href` prop. The utility must be shared, not component-internal.

## Findings

- **Security sentinel**: `javascript:`, `data:`, `vbscript:`, `blob:` protocols must be blocked. Allowlist approach (http, https, mailto) is correct.
- **Architecture strategist**: Placing `isSafeUrl` inside InlineExpand creates dependency inversion when Breadcrumb needs it. Must go in `src/utils/`.
- **TypeScript reviewer**: Should accept `string | undefined` for defensive boundary handling.
- **Performance oracle**: `new URL()` runs on every render — consider memoizing results.

## Proposed Solutions

### Option A: `src/utils/isSafeUrl.ts` (Recommended)
Create `src/utils/isSafeUrl.ts` with its own test file. Export from `src/utils/index.ts` and `src/index.ts`.
- **Pros**: Clean dependency graph, independently testable, reusable
- **Cons**: Creates new `src/utils/` directory (first utility)
- **Effort**: Small
- **Risk**: Low

## Acceptance Criteria

- [ ] `src/utils/isSafeUrl.ts` created with `(url: string | undefined) => boolean`
- [ ] Allows only `http:`, `https:`, `mailto:` protocols
- [ ] `src/utils/isSafeUrl.test.ts` covers: `javascript:`, `data:`, `vbscript:`, `blob:`, uppercase variants, whitespace-padded, empty string, undefined, valid URLs
- [ ] Exported from `src/utils/index.ts` and `src/index.ts`
- [ ] Applied in InlineExpand sources rendering
- [ ] Breadcrumb retrofit in separate follow-up PR

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|

## Resources

- Plan: `plans/2026-03-08-feat-inline-expand-sources-update-plan.md`
- Breadcrumb component: `src/components/Breadcrumb/components/Breadcrumb.tsx:92`
