---
status: complete
priority: p3
issue_id: "031"
tags: [code-review, quality, animation-polish]
dependencies: []
---

# Remove unused prevTargetRef from useTextScramble

## Problem Statement

`prevTargetRef` is assigned in two places but never read. Dead code — 3 lines to remove.
- **Effort**: Small (2 min)
