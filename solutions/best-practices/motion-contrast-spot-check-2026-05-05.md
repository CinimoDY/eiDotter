---
module: components
tags: [accessibility, prefers-reduced-motion, prefers-contrast, audit-baseline]
problem_type: baseline
audit_phase: 4
date: 2026-05-05
related_files:
  - src/styles/accessibility.css
  - solutions/best-practices/keyboard-audit-2026-05-05.md
---

# Motion + high-contrast spot check (Pass 4 — Accessibility Audit Phase 1)

Static analysis of `prefers-reduced-motion` and `prefers-contrast` coverage across a 10-component sample. CLAUDE.md commits to "every animation needs a reduced-motion media query" and "neutralize text-shadow/box-shadow glows in `@media (prefers-contrast: high)`" — this pass measures actual conformance.

## Scope

Sample of 10 visually-active components: `Badge`, `Card`, `TimelineNode`, `Alert`, `Tag`, `Button`, `Checkbox`, `Switch`, `Notification`, `CmdPalette`.

Method: grep for the base CSS glow patterns (`box-shadow`, `text-shadow`) and the `@media` block that's supposed to neutralize them.

Live verification (Storybook with `prefers-reduced-motion: reduce` + `prefers-contrast: more` forced via Chromium DevTools Rendering tab) is out of scope for this pass; static evidence is sufficient to identify gaps.

## prefers-reduced-motion coverage

| Component | Base animation/transition? | RM block present? | Status |
|---|---|---|---|
| Badge | Y (phosphor-warmup) | Y (`animation: none`) | ✅ |
| Card | Y (transition + phosphor-energize) | Y (`animation: none; transition: none`) | ✅ |
| TimelineNode | Y (marker transition + glow pulse) | Y | ✅ |
| Alert | Y (enter + closing animations) | Y | ✅ |
| Tag | Y (enter + close transition) | Y | ✅ |
| Button | Y (hover/press transitions) | Y | ✅ |
| Checkbox | Y (toggle glow) | Y | ✅ |
| Switch | Y (track/thumb transition) | Y | ✅ |
| Notification | Y (enter + dismiss) | Y | ✅ |
| CmdPalette | Y (open/close) | Y | ✅ |

All 10 sampled components have `@media (prefers-reduced-motion: reduce)` blocks. Library-wide grep: 56 CSS files match — broad coverage.

A global safety net at `src/styles/accessibility.css` reduces ALL animations and transitions to `0.01ms` if a component-level rule is missed. Status: **redundant defense in depth, no gaps detected in sample**.

## prefers-contrast coverage

| Component | Base glow? | HC block present? | Removes glow in HC? | Status |
|---|---|---|---|---|
| Badge | N (no shadow) | Y (border-width: 2px) | n/a | ✅ |
| Card | **Y** | Y | **N** | ⚠️ Gap |
| TimelineNode | **Y** | Y (border-width, outline) | **N** | ⚠️ Gap |
| Alert | **Y** | Y (border, focus outline) | **N** | ⚠️ Gap |
| Tag | **Y** (text-shadow + box-shadow) | Y (border-width: 2px only) | **N** | ⚠️ Gap |
| Button | Y | Y (`box-shadow/text-shadow: none !important`) | Y | ✅ |
| Checkbox | **Y** (toggle glow) | Y (outline-width) | **N** | ⚠️ Gap |
| Switch | Y | Y (multiple `box-shadow: none`) | Y | ✅ |
| Notification | Y | Y (`box-shadow: none`) | Y | ✅ |
| CmdPalette | Y | Y (`text-shadow: none`) | Y (partial — input + selected item) | ✅ |

Library-wide grep: 60 CSS files match `prefers-contrast`.

### Gaps found (5/10)

CLAUDE.md states: *"Neutralize `text-shadow`/`box-shadow` glows in `@media (prefers-contrast: high)`"*. The five gap components have a `prefers-contrast: high` block but only adjust border thickness — they leave the phosphor glow on, which is the very thing the user opted out of by enabling high-contrast mode.

Affected components and the specific selectors that retain glow under high-contrast:

1. **`Card`** (`src/components/Card/components/Card.css`) — base `box-shadow` from `--shadow-drop` and per-variant glows; high-contrast block only thickens borders.
2. **`TimelineNode`** (`src/components/TimelineNode/components/TimelineNode.css`) — marker `box-shadow` glow on `.eidotter-timeline-node--active`; not removed.
3. **`Alert`** (`src/components/Alert/components/Alert.css`) — variant `box-shadow` glows; high-contrast block only sets border + underlines actions.
4. **`Tag`** (`src/components/Tag/components/Tag.css`) — both `box-shadow: 0 0 6px ...` and `text-shadow: 0 0 4px ...` on the base; high-contrast block only bumps border-width.
5. **`Checkbox`** (`src/components/Checkbox/components/Checkbox.css`) — glow on checked state; high-contrast block only widens focus outline.

## Findings summary

**Reduced-motion coverage:** ✅ Strong. Every sampled component has a reduced-motion block; the global safety net catches stragglers.

**High-contrast coverage:** ⚠️ Partial. Borders are thickened reliably, but **5 of 10 sampled components leave their phosphor glow on** under `prefers-contrast: high`. This is a real conformance gap against the stated CLAUDE.md policy.

## Recommendations (for follow-up plan, not this audit)

1. **Add explicit `box-shadow: none` and `text-shadow: none` overrides to the `prefers-contrast: high` blocks** of `Card`, `TimelineNode`, `Alert`, `Tag`, `Checkbox`. Match the pattern in `Switch`/`Notification`/`Button`.
2. **Consider a Tailwind utility class** (e.g. `.dos-glow-respect-hc`) that bundles base glow + automatic HC removal, so consumer code can't forget. Out-of-scope for this audit.
3. **Audit the remaining 27 components** beyond the spot-check sample. The sample picked the highest-glow candidates; the gap rate elsewhere is probably similar.
4. **Add a CI grep** that warns when a component declares `box-shadow` / `text-shadow` outside of a generic shadow utility but doesn't have `box-shadow: none` / `text-shadow: none` inside `@media (prefers-contrast: high)`. Cheap regression guard.

## Out of scope (deferred)

- Full library audit (only 10/37 sampled).
- Live verification with DevTools Rendering tab forced settings (Storybook + browser session).
- Reduced-motion verification of JS-driven animations (the `useTextScramble` hook honors `prefersReducedMotion()` per `src/utils/prefersReducedMotion.ts`; full audit deferred).
