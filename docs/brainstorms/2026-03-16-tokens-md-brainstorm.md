# Brainstorm: TOKENS.md — Token Pipeline Reference

**Date:** 2026-03-16
**Issue:** DMNC-498
**Status:** Ready for planning

## What We're Building

A single comprehensive `docs/TOKENS.md` that replaces `guidelines/tokens.md`. It serves both human developers and AI agents integrating eidotter into downstream projects (rizomorf, spacewar, pomodoke-calendar, EatThisDie).

## Why This Approach

- **Replace, not complement** — one canonical source of truth, no split docs
- **Born from real bugs** — we spent a full session fixing issues caused by misunderstanding token resolution (`text-primary` resolving to brown without theme, `text-secondary` being near-black on dark backgrounds)
- **Pipeline-first** — existing doc was reference tables only, missing the "how it works" and "what to avoid"

## Key Decisions

1. **Single file replaces `guidelines/tokens.md`** — delete the old file
2. **Audience: both humans and AI** — readable prose with precise rules and copy-pasteable examples
3. **Structure:** Pipeline architecture → Token reference → Theme cascade → Gotchas/anti-patterns → How to extend
4. **Include the lessons learned today** — document why `cga-amber` is used instead of `text-primary` in component CSS, why `text-secondary` is only for amber backgrounds

## Sections Outline

1. **Pipeline Overview** — JSON sources → Style Dictionary v5 → CSS/Swift/JS/Tailwind outputs
2. **Source Files** — what lives in `src/tokens/`, DTCG format explanation
3. **Generated Outputs** — file list, which are safe to import, "never edit directly"
4. **CGA Color Palette** — the 16 colors + amber extensions, with hex values
5. **Semantic Token Map** — backgrounds, text, borders, status, links, alerts (from existing reference)
6. **Theme Cascade** — how `data-theme` works, `:root` fallback values, why they differ
7. **Gotchas & Anti-Patterns** — text-secondary on dark bg, text-primary without theme, hardcoded hex
8. **Tailwind Integration** — `bg-dos-*`, `text-dos-*`, `border-dos-*` classes
9. **Swift/iOS Tokens** — `EiDotterTokens.swift` usage
10. **How to Extend** — adding tokens, adding themes, running `npm run build-tokens`

## Open Questions

None — scope is clear. Proceed to planning.
