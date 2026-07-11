---
status: complete
priority: p1
issue_id: "002"
tags: [code-review, security, xss]
dependencies: ["001"]
---

# Apply `isSafeUrl` to favicon URLs

## Problem Statement

The plan sanitizes `source.url` but not `source.favicon`, which is rendered into `<img src>`. While `<img src="javascript:...">` doesn't execute in modern browsers, malicious favicon URLs can serve as tracking pixels (`https://evil.com/track?userId=123`).

## Findings

- **Security sentinel**: `data:image/svg+xml` in `<img>` has historically been a vector in older browsers. Defensive approach: apply `isSafeUrl` (excluding `mailto:`) to favicon URLs.

## Proposed Solutions

### Option A: Gate favicon rendering with isSafeUrl (Recommended)
```tsx
{source.favicon && isSafeUrl(source.favicon) && !failedFavicons.has(source.url) ? (
  <img ... />
) : (
  <span className="inline-expand__source-icon">[→]</span>
)}
```
- **Effort**: Small (one-line change)
- **Risk**: Low

## Acceptance Criteria

- [ ] Favicon `<img>` only rendered when `isSafeUrl(source.favicon)` returns true
- [ ] Test case for `data:` and `javascript:` favicon URLs

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-07-11 | Verified `isSafeUrl(source.favicon)` guards favicon rendering in InlineExpand; kept deliberately strict (absolute-only, blocks relative + `data:`) rather than switching to `isSafeHref`. | Favicons need absolute-URL semantics (a relative favicon is a broken image; `data:` image URLs were the attack surface) — intentionally NOT unified onto `isSafeHref`. |
