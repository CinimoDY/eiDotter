---
status: complete
priority: p3
issue_id: PR-84
tags: [code-review, architecture, token-playground]
dependencies: []
---

# Token Playground: Deep import paths instead of barrel exports

## Problem Statement

The TokenPlayground imports components via deep paths (e.g., `../Button/components/Button`) instead of barrel exports (e.g., `../Button`). While this works, it bypasses the public API surface and couples to internal file structure.

## Findings

- **Location:** `src/components/Tokens/TokenPlayground.stories.tsx` lines 5-13
- **Current:** `import { Button } from '../Button/components/Button'`
- **Expected:** `import { Button } from '../Button'`
- **Note:** This pattern is inconsistent — some other story files also use deep imports, so this isn't unique to PR #84

## Proposed Solutions

### Option A: Use barrel imports (Recommended)
- **Pros:** Consistent with public API, resilient to internal restructuring
- **Effort:** Small (9 import lines to change)

## Acceptance Criteria

- [ ] All component imports use barrel exports

## Resources

- PR #84: https://github.com/CinimoDY/eiDotter/pull/84
