---
status: complete
priority: p3
issue_id: PR-84
tags: [code-review, scope-creep, token-playground]
dependencies: []
---

# Token Playground PR: Unrelated .gitignore changes

## Problem Statement

PR #84 includes `.gitignore` additions (PNG ignoring, ZIP ignoring, ingest/ ignoring) that are unrelated to the TokenPlayground feature. These are housekeeping changes bundled with a feature PR.

## Findings

- **Location:** `.gitignore` diff in PR #84
- **Added rules:** `*.png` (with exceptions), `*.zip`, `ingest/`
- **Impact:** Low — these are reasonable gitignore rules but should be in a separate commit/PR for clean history

## Proposed Solutions

### Option A: Accept as-is (Recommended)
- **Pros:** Already in the PR, harmless changes
- **Effort:** None
- **Risk:** None

### Option B: Split into separate PR
- **Pros:** Cleaner git history
- **Effort:** Small but creates PR churn

## Recommended Action

Accept as-is — these are reasonable maintenance additions.

## Resources

- PR #84: https://github.com/CinimoDY/eiDotter/pull/84
