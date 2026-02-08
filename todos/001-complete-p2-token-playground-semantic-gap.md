---
status: complete
priority: p2
issue_id: PR-84
tags: [code-review, architecture, token-playground]
dependencies: []
---

# Token Playground: Primitive-to-Semantic Token Gap

## Problem Statement

The TokenPlayground manipulates **primitive** CGA tokens (e.g., `--color-cga-amber`) directly on `:root`, but most eidotter components consume **semantic** tokens (e.g., `--color-semantic-text-accent`). This means changing a primitive color in the Leva panel only partially updates the UI — components using semantic tokens remain unchanged.

**Why it matters:** Users experimenting with the playground may think tokens are broken when colors don't change, creating confusion about the design system's token architecture.

## Findings

- **Evidence:** Setting `--color-cga-amber` to `#00ff00` updates the Leva swatch but components remain amber because they reference `--color-semantic-text-accent` (still `#e5b936`)
- **Location:** `src/components/Tokens/TokenPlayground.stories.tsx` lines 169-184 (color controls)
- **Root cause:** Semantic tokens in `tokens.css` are defined with hardcoded hex values, not `var()` references to primitives
- **Scope:** Affects all color controls in the playground

## Proposed Solutions

### Option A: Add semantic token controls alongside primitives
- **Pros:** Users see the tokens that actually affect components
- **Cons:** More controls, potentially overwhelming
- **Effort:** Small
- **Risk:** Low

### Option B: Add a note/warning in the playground UI
- **Pros:** Quick fix, educational about token architecture
- **Cons:** Doesn't fix the underlying limitation
- **Effort:** Small
- **Risk:** None

### Option C: Refactor token pipeline to use var() references
- **Pros:** Primitives would cascade to semantics automatically
- **Cons:** Major change to Style Dictionary output, may break theming
- **Effort:** Large
- **Risk:** High

## Recommended Action

Option A (add semantic controls) or Option B (add explanatory note) for now.

## Technical Details

- **Affected files:** `src/components/Tokens/TokenPlayground.stories.tsx`
- **Token pipeline:** `src/tokens/*.json` -> Style Dictionary -> `src/styles/tokens.css`

## Acceptance Criteria

- [ ] Changing a color token in the playground visually updates the showcase components
- [ ] OR: Clear documentation in the playground explains which tokens affect which components

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-08 | Discovered during PR #84 browser review | Semantic tokens are hardcoded hex, not var() references to primitives |

## Resources

- PR #84: https://github.com/CinimoDY/eiDotter/pull/84
- Token pipeline: `src/tokens/` -> `src/styles/tokens.css`
