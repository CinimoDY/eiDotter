---
status: complete
priority: p2
issue_id: "026"
tags: [code-review, ux, animation-polish]
dependencies: []
---

# useTextScramble initial state shows empty frame

## Problem Statement

`useState` initializes to `''` when enabled + no reduced motion, causing one frame of empty content before rAF kicks in with scrambled characters.

## Proposed Solutions

Initialize with scrambled characters instead of empty string, or initialize to `targetText` and let the effect begin the scramble.
- **Effort**: Small (10 min)

## Acceptance Criteria

- [ ] No visible empty flash on mount
- [ ] Scramble still plays correctly from first frame
