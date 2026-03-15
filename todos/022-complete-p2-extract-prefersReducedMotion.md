---
status: complete
priority: p2
issue_id: "022"
tags: [code-review, architecture, animation-polish]
dependencies: []
---

# Extract prefersReducedMotion() to shared utility

## Problem Statement

The identical `prefersReducedMotion()` function is copy-pasted in 4 files: Alert.tsx, Tag.tsx, useTextScramble.ts, and Modal.tsx (pre-existing). Any logic change (e.g., reactive listener) must be replicated in all four places.

## Proposed Solutions

### Option A: Extract to src/utils/ (Recommended)
Create `src/utils/prefersReducedMotion.ts`, export from `src/utils/index.ts`, import in all 4 files.
- **Effort**: Small (15 min)

## Acceptance Criteria

- [ ] Single source of truth in `src/utils/`
- [ ] All 4 files import from shared location
- [ ] No duplicate function definitions remain
