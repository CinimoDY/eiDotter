---
status: complete
priority: p3
issue_id: PR-84
tags: [code-review, simplicity, token-playground]
dependencies: []
---

# Token Playground: Border-radius controls have no visible effect

## Problem Statement

The Borders section includes `--border-radius-sm` and `--border-radius-base` sliders, but no eidotter component references these CSS custom properties. Changing them has zero visual effect, which misleads users about what tokens are in use.

## Findings

- **Location:** `src/components/Tokens/TokenPlayground.stories.tsx` lines 196-197
- **Evidence:** Grep for `--border-radius-sm` and `--border-radius-base` across all component CSS files returns no matches
- **Impact:** Confusing UX — sliders that do nothing

## Proposed Solutions

### Option A: Remove border-radius controls (Recommended)
- **Pros:** Removes misleading UI, fewer controls
- **Effort:** Small

### Option B: Add border-radius usage to components that need it
- **Pros:** Makes controls functional
- **Effort:** Medium (touches multiple component CSS files)

## Recommended Action

Option A — remove the non-functional controls.

## Acceptance Criteria

- [ ] All Leva controls produce a visible change in at least one showcase component

## Resources

- PR #84: https://github.com/CinimoDY/eiDotter/pull/84
