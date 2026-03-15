---
title: "Design Craft Animation Polish — Batch 3"
date: 2026-03-15
status: decided
---

# Animation Polish Batch 3 — Brainstorm

## What We're Building

Final 4 components from the design-craft audit. All CSS-only (Tier 1).

1. **Progress fill transitions** — smooth clip-path transition on fill width changes
2. **FilterBar active glow** — phosphor text-shadow + inset box-shadow matching Tabs pills
3. **Badge enter animation** — scale pop (0.8->1) on mount
4. **Card enter effect** — subtle opacity fade on mount

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Progress fill style | Smooth width transition | Block chars already give stepped look; CSS transition is simple and performant |
| Badge enter style | Scale pop (150ms) | Blur invisible at 10-12px; scale+opacity gives clear feedback |
| Card enter style | Subtle opacity fade (200ms) | Cards are containers, not focal points — don't compete with content |
| FilterBar glow | Match Tabs pills (text-shadow + box-shadow) | Both are pill-shaped selection UIs — consistent pattern |

## Remaining Backlog

| Component | Gap | Tier | Impact |
|-----------|-----|------|--------|
| TimelineNode | Marker has transition but no enter glow | 1 (CSS) | Low |
| Input | Focus glow box-shadow jump is sharp | 1 (CSS) | Low |

These two are very low impact and may not warrant a dedicated batch.
