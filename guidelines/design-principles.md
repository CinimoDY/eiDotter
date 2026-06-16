# eidotter — Design Principles

The **why** behind eidotter. These principles are derived from a curated interaction-design canon (Raskin, Norman, Kay, Tufte, Rams, Nielsen, Berners-Lee, the ISO 9241 standards, et al.) and apply to **every product built on eidotter**, not just the design system itself.

> **Canonical source:** these principles are maintained in the knowledge base (the wiki's `digests/eidotter-design-principles` and the universal `digests/product-design-principles`). This file is the adopted copy that lives with the design system and is surfaced on eidotter.com. If the two diverge, the knowledge base wins — reconcile here.
>
> _For component-level interaction best-practices (modal, form, …), see the knowledge base's `patterns/` pages, referenced from each component's `*Docs.mdx`._

---

## Part 1 — The nine house principles

These are universal; eidotter is their first adopter. Each shows how it lands in this system.

**1. Start from the real context.** Design from real users, data, and contexts — not assumptions or borrowed convention. _In eidotter:_ components size to their actual composition context — **container queries, not media queries**.

**2. Immediate, visible feedback.** Every action shows its effect *now*; status is always visible. _In eidotter:_ phosphor glow on focus/active, loud amber focus rings, `Skeleton`/`Progress` for status, `Notification` for outcomes.

**3. Make it perceivable.** Signify what each element does, map controls to effects, group with space, prefer recognition over recall. _In eidotter:_ DOS signifiers (`[X]` checkbox, dotted-underline links), `pixelarticons` that signify, grouping via `Card`/`Separator`, recall-free `CmdPalette`.

**4. The user is never at fault.** Design out modes and error-prone conditions; always an exit and an undo; a user "error" is our design's failure. _In eidotter:_ **keyboard-first** via React Aria (focus, ARIA, Escape, focus-trap-and-restore handled for you); error variants on `Input`/`Alert`.

**5. Show the data, honestly.** Density over decoration; both overview and detail in one view; never distort. _In eidotter:_ `Stat`/`Progress`/`TimelineContainer` favour legible density; phosphor is physics, not chartjunk on the data.

**6. Less, but better.** Subtract first; every element earns its place; self-explanatory over documented; built to last, not to trend. _In eidotter:_ the whole ethos — square corners, single weight, 16 colours; **the aesthetic is a constraint, not a theme.**

**7. Aligned with the user, never extractive.** Optimize for the user's goal, never for engagement or time-on-screen; honest by default, no dark patterns. _In eidotter:_ no engagement mechanics; `AIText`/`Provenance` mark AI content *honestly* rather than disguising it.

**8. The user owns their data.** Open, portable, accessible; no lock-in. _In eidotter:_ **accessibility is a hard gate** — WCAG 2.1 AA, axe CI regression gate, `prefers-reduced-motion`/`prefers-contrast` honored everywhere; MIT, tree-shakable, minimal deps.

**9. A tool for understanding, not just transacting.** Build representations that help people understand; where it fits, that they can author in. _In eidotter:_ the system serves the app's meaning; it's the substrate that lets products be thinking tools, never imposing itself.

---

## Part 2 — eidotter's aesthetic commitments

These are design principles in their own right — not theming:

- **The aesthetic is a constraint the system holds itself to, not a theme that can be turned off.** "eidotter commits to the constraints that other 'DOS-inspired' systems relax." (This is Rams' "as little design as possible," taken seriously.)
- **16 colours, no more** — "a historical fact, not a starting point." All colour via semantic tokens; never ad-hoc hex.
- **Single-weight typography** — authentic DOS had no bold; emphasis via colour, uppercase, or underline, never weight.
- **Phosphor as physics, not decoration** — glow/warmup/scanline are wired into component state and lifecycle, not opt-in ornament.
- **Keyboard-first** — React Aria on every interactive component; loud, unmissable focus.
- **Square corners (≤4px), dark-only, monospace** — the constraints are the identity.

---

_Implementation rules (token pipeline, CI, file structure, BEM-for-phosphor, etc.) are eidotter mechanics — see `CLAUDE.md` and `solutions/`. They serve these principles; they are not themselves design principles._
