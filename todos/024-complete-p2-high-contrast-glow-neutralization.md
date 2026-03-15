---
status: complete
priority: p2
issue_id: "024"
tags: [code-review, accessibility, animation-polish]
dependencies: []
---

# Neutralize glow effects in prefers-contrast: high

## Problem Statement

Tabs pills and Switch checked state add text-shadow and box-shadow glow effects but don't neutralize them in `prefers-contrast: high`. Glows reduce readability in high-contrast mode.

## Proposed Solutions

Add to existing `prefers-contrast: high` blocks:
- Tabs: `text-shadow: none; box-shadow: none` on `.tabs--pills .tabs__tab--active`
- Switch: `box-shadow: none` on `.switch--checked .switch__track` and `.switch--checked .switch__thumb`
- **Effort**: Small (10 min)

## Acceptance Criteria

- [ ] All new glow effects have `prefers-contrast: high` overrides
- [ ] FilterBar active glow also neutralized in high-contrast (same pattern)
