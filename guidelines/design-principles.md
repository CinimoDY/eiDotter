# eidotter — Design Principles

The **why** behind eidotter, derived from a curated interaction-design canon (Raskin, Norman, Kay, Tufte, Rams, Nielsen, Berners-Lee, the ISO 9241 standards, et al.).

The key distinction: **interaction principles are universal and theme-agnostic; aesthetics are per-theme.** eidotter ships the **DOS theme** today and is adding a **Modern theme** so products can look clean/modern without leaving the design system — *same interaction principles, same token discipline, different visual language.*

> **Canonical source:** maintained in an internal knowledge base; this file is the adopted public copy for the design system and eidotter.com. If they diverge, the internal source wins. Component-level best-practices are referenced from each component's `*Docs.mdx`.

---

## Part 1 — Interaction & UX principles (theme-agnostic — every theme, every product)

These hold identically under DOS, Modern, or any future theme.

1. **Start from the real context.** Design from real users/data/contexts. _In eidotter:_ container queries, not media queries — components size to where they're used.
2. **Immediate, visible feedback.** Every action shows its effect now; status always visible (`Skeleton`/`Progress`, `Notification`).
3. **Make it perceivable.** Signify, map controls to effects, group with space, recognition over recall (`CmdPalette`).
4. **The user is never at fault.** Keyboard-first via React Aria (focus, ARIA, Escape, focus-trap-and-restore — don't override it); native semantics first; non-semantic clickables get role + tabIndex + key handler + ARIA state; clear exit/undo; error variants on `Input`/`Alert`.
5. **Show the data, honestly.** Density and legibility over decoration; a theme's flourish is never chartjunk on the data.
6. **Less, but better.** Subtract first; self-explanatory; built to last.
7. **Aligned with the user, never extractive.** No engagement mechanics, no dark patterns; `AIText`/`Provenance` mark AI content honestly.
8. **The user owns their data → accessibility is a hard gate.** WCAG 2.1 AA; a11y regressions block release; animations honor `prefers-reduced-motion`; glows neutralize under `prefers-contrast: high`; links differentiated by more than colour. CC-BY-NC-4.0, tree-shakable.
9. **A tool for understanding, not just transacting.** eidotter is the substrate that lets products be thinking tools; it serves the app's meaning, never imposes itself.

**Motion & overlay conventions:** compositor-only animations (transform/opacity); never animate layout props; `inert` + transitions for expand/collapse (never `max-height`); Escape dismisses overlays; focus trapped and restored; overflow containment on flex.

## Part 2 — Token discipline (theme-agnostic)

**Design in semantic roles, never raw values.** Always style with role-named semantic tokens (`bg-dos-*`, `text-dos-*`, or the Modern theme's equivalents) — never hardcoded hex, never primitive palette names in app code. This is what lets the *same components* re-theme by swapping token values. Every theme provides the same semantic roles; only the values differ.

## Part 3 — Themes (aesthetics are per-theme, NOT universal)

### DOS theme (today's default)

eidotter's distinctive DOS aesthetic — principles for *this theme*:

- **The aesthetic is a constraint the theme holds itself to, not decoration** — "eidotter commits to the constraints that other 'DOS-inspired' systems relax."
- **16-colour CGA palette** — "a historical fact, not a starting point" (via tokens).
- **Single-weight typography** — no bold; emphasis via colour, uppercase, underline.
- **Phosphor as physics, not decoration** — wired into state & lifecycle.
- **Square corners (≤4px), dark-only, monospace** — the constraints are the DOS identity.

### Modern theme (planned)

A Modern/clean theme alongside DOS, so every app can look modern instead of the DOS interface. It keeps **all of Part 1 and Part 2** — but defines its **own visual language**: its own broader palette, likely light/dark, contemporary type and spacing, restrained-but-not-DOS. The discipline is identical (semantic tokens, never hex; a11y as a gate; keyboard-first); only the values and look differ. Products choose a theme; the interaction quality is constant.

---

_Implementation rules (token pipeline, CI, file structure, BEM-for-phosphor, per-component specs) are eidotter mechanics — see `CLAUDE.md` and `solutions/`. They serve these principles; they are not themselves design principles._
