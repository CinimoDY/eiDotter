---
title: "Design Craft Animation Polish — Batch 2"
date: 2026-03-15
status: decided
---

# Animation Polish Batch 2 — Brainstorm

## What We're Building

Four targeted animation improvements to components that currently have instant state transitions where the rest of the system uses CRT phosphor effects:

1. **Checkbox phosphor check** — `[X]` appears with a quick brightness flash
2. **Switch phosphor toggle** — Track gets smooth phosphor glow on state change
3. **Tag dismiss animation** — Removable tags animate out instead of vanishing
4. **Stat value scramble** — Opt-in text scramble effect using `useTextScramble`

## Why This Approach

Batch 1 (Accordion, Alert, Tabs, TextScramble) established two reusable patterns:
- **Always-in-DOM with CSS transitions** (Accordion) for expand/collapse
- **Animate-then-unmount** (Alert) for dismissals

Batch 2 reuses these patterns plus two new ones:
- **Phosphor flash** (Button's existing `phosphor-energize` keyframe) for toggles
- **TextScramble hook integration** for value display

All 4 are Tier 1-2 (CSS or existing JS hooks). No new dependencies.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Checkbox check style | Quick flash (150ms phosphor-energize) | Matches mechanical click feel; reuses existing Button keyframe |
| Stat scramble activation | Opt-in `scramble` prop (default false) | No breaking changes; consumers choose where it adds value |
| Tag exit animation | Simple fade+scale (100ms) | Tags are small inline elements; blur filter is overkill at 12px |
| Switch toggle glow | Smooth glow transition (200ms) | Clean, complements existing spring easing on thumb |

## Remaining Audit Backlog (Future Batches)

| Component | Gap | Tier | Impact |
|-----------|-----|------|--------|
| Progress | Fill changes instant when value updates | 1 (CSS) | High |
| Badge | No enter animation | 1 (CSS) | Low-Medium |
| Card | No enter effect (hover glow exists) | 1 (CSS) | Low |
| FilterBar | Active state swap instant, no phosphor glow | 1 (CSS) | Medium |
| TimelineNode | Marker has transition but no enter glow | 1 (CSS) | Low |
| Input | Focus glow box-shadow jump is sharp | 1 (CSS) | Low |

## Open Questions

None — all resolved during brainstorm.
