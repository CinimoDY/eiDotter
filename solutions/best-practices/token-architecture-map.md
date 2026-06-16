---
title: Token architecture map — how a colour decision propagates from primitives to components and platforms
date: 2026-06-16
category: best-practices
module: tokens
problem_type: reference
component: design-tokens
severity: high
applies_when:
  - You are about to change a colour/token and need to know what it ripples to
  - You are adding a theme (e.g. light mode) and need to know what "complete" means
  - You are routing a component off raw primitives onto semantic roles (DMNC-1059)
  - You need to understand how web and Apple platforms share T1 but diverge at the semantic layer
  - You are reviewing a token PR and want the source-of-truth map
tags: [tokens, design-system, style-dictionary, theming, figma, swift, semantic-tokens, dmnc-922, dmnc-916, dmnc-1059, light-mode]
related:
  - color-system-principles.md
---

# Token architecture map

**Living document.** Update it whenever the layers, build outputs, or propagation paths change. It is the source of truth for *where a colour decision flows*. Pairs with [color-system-principles.md](./color-system-principles.md) (the rules).

The taxonomy is the 4-tier model from DMNC-916. This doc focuses on **colour**, but the same layering applies to dimensions (T3) and effects (T4).

---

## The one-paragraph version

A colour is defined once as a **primitive** (T1, the reference pool), given **meaning** once as a **semantic role** (T2), and **re-pointed per theme** (theme files). Style Dictionary compiles those into CSS custom properties (`:root` + `[data-theme=…]`), a Tailwind preset, Swift constants, and Figma DTCG exports. **Components paint only through semantic roles** — so flipping `data-theme` re-themes everything for free. Web and Apple platforms **share T1 primitives** but each owns its **own semantic layer** (web's in `web.tokens.json`, Apple's in the Figma DS files).

---

## The layers

### T1 — primitives (the reference pool)
`src/tokens/base.tokens.json`

- `color.cga.*` — the 18-entry CGA-named palette. **In the default build these values are amber-monochromed** (`cga.green = #411F06`, a brown; `cga.brightRed = #DCA934`, a gold). The names preserve CGA semantics; the values are amber. **This is the pool — not everything here is "in service."**
- `color.cga-true.*` — authentic CGA functional-status primitives (`green #00AA00`, `red #AA0000`, `cyan #00AAAA`). **Theme-invariant** (same hex in every theme), added by DMNC-1001 so apps can alias honest status colour. Exposed as `--color-cga-true-*` CSS vars + a Figma Foundation primitive; deliberately **not** a Tailwind utility.
- `color.semantic.text.aiDraft` / `aiDraftGlow` — brand-locked hot-pink AI-provenance marker, promoted into T1 so every theme inherits it.

> **Principle:** adding a primitive is cheap and reference-only. A primitive enters *service* only when a semantic role aliases it. Keep unused primitives as a pool; don't delete them. (See principles doc.)

### T2 — semantic roles (the "meaning" layer)
`src/tokens/web.tokens.json` → `color.semantic.*`

Roles, each aliasing a T1 primitive by reference (e.g. `{color.cga.lightGray}`):

| Group | Roles |
|-------|-------|
| `background` | `primary`, `secondary`, `accent` |
| `text` | `primary`, `secondary`, `accent`, `disabled`, `muted` |
| `border` | `default`, `focus`, `hover`, `disabled` |
| `link` | `default`, `hover`, `active`, `visited` |
| `status` | `success`, `warning`, `error`, `info` |
| `alert` | `info`, `success`, `warning`, `error` (component backgrounds; literal hex) |

**This is the only layer components should paint with.** It is also where the known gap lives today: there is no role resolving to true phosphor-amber `#FFB000`, and `status-*` resolve to amber-mono golds — the reason DMNC-1059 can't sweep yet and DMNC-922 exists.

### T3 — dimensions, T4 — effects
`dimensions.tokens.json`, `effects-params.tokens.json`, `motion.tokens.json`, plus `web.tokens.json` (spacing, radius, shadow/glow, duration, opacity, z-index, focusRing, effects.*). Out of scope for the colour rationalization but built by the same pipeline.

### Themes (the divergence layer)
`src/tokens/theme.<name>.tokens.json` — 5 today: `amber-mono`, `cga-amber`, `cga-mode4-p0`, `cga-mode4-p1`, `cga-mode5`.

A theme file can do **two** things:
1. **Re-define T1 values** — e.g. `theme.cga-amber` restores the *real* 16-colour CGA (`cga.green = #00AA00`).
2. **Re-point T2 aliases** — e.g. `theme.cga-amber` sets `background.accent → {color.cga.blue}` instead of amber.

Both are scoped under `[data-theme="<name>"], .theme-<name>` in the compiled CSS, so they override the `:root` defaults when the attribute is present.

---

## The build (Style Dictionary)
`style-dictionary.config.mjs` → `npm run build-tokens`

| Output | Path | Selector / form | Consumed by |
|--------|------|-----------------|-------------|
| `tokens.css` | `src/styles/` | `:root` | base/default theme — all web components |
| `theme.<name>.css` | `src/styles/` | `[data-theme="<name>"]` | per-theme overrides |
| `tokens.js` / `tokens.json` | `src/styles/` | JS/JSON | programmatic consumers |
| `tailwind.preset.cjs` | repo root | `dos-*` utilities → `var(--color-semantic-*)` | Tailwind consumers |
| `EiDotterTokens.swift` | `platforms/swiftui/…` | flat Swift constants (hex) | SwiftUI shared core |
| `foundation.dtcg.json` | `dist/tokens/` | T1 + T3 + T4 | **Foundation Figma** import |
| `web.dtcg.json` | `dist/tokens/` | T2 web | **Web DS Figma** import |

Generated files are **never hand-edited**; CI (`build.yml`) rebuilds and fails on drift. Edit the JSON sources. The token-ref lint (`scripts/lint-token-refs.mjs`, `npm run lint-tokens`) fails on any `var(--*)` / `dos-*` reference that doesn't resolve to a declared token.

---

## Propagation diagram

```
T1 PRIMITIVES — reference pool (base.tokens.json)
   color.cga.*  (amber-mono)   color.cga-true.* (honest, theme-invariant)
        │  aliased by reference {color.cga.X}
        ▼
T2 SEMANTIC ROLES (web.tokens.json)  ── the ONLY layer components paint with
   color.semantic.{background,text,border,link,status,alert}
        │                         ▲
        │                         │ themes re-define T1 values AND/OR re-point T2 aliases
        │            src/tokens/theme.*.tokens.json
        ▼
STYLE DICTIONARY (style-dictionary.config.mjs)
   ├─ tokens.css (:root) ─ theme.*.css ([data-theme]) ─ tailwind.preset.cjs (dos-*)
   │        └─────────────── web React components ──────────────┘
   │                 (rizomorf, dmnc.tech, eidotter-home, …)
   ├─ EiDotterTokens.swift  (shared-core primitives)
   └─ foundation.dtcg.json ──► Foundation Figma (KoGTFX8)
              │                       │ subscribed-to library
              │        ┌──────────────┼─────────────────┐
              │   Web DS Fig     iOS DS Fig         macOS DS Fig
              │   (T2 web)       (Apple-HIG T2)     (Apple-HIG T2)
       web.dtcg.json                 │                  │
                              sync-figma-to-swift.ts (reads Figma snapshots)
                                      │                  │
                              AppleIOS.swift      AppleMacOS.swift  ──► SwiftUI apps
```

**The critical asymmetry:** web and Apple **share T1 primitives** (via Foundation) but **each owns its semantic layer**. Web's T2 is `web.tokens.json` (compiled to CSS). Apple's T2 lives *inside the iOS/macOS Figma DS files* in Apple-HIG vocabulary (Labels / Backgrounds / Fills / Accents), aliased to Foundation, and reverse-synced to Swift by `scripts/sync-figma-to-swift.ts`. A foundation change ripples to both; meaning is decided per platform.

---

## Worked example — "the destructive button should be red"

1. **Primitive:** honest red already exists — `color.cga-true.red = #AA0000` (theme-invariant). No new primitive needed.
2. **Semantic:** today `status.error → {color.cga.brightRed}` = amber-mono gold. The fix is to point a (new or existing) error role at `{color.cga-true.red}` so it's honestly red. *This is a 922 decision — see principles.*
3. **Component:** `Button.css .eidotter-btn--destructive` should paint `var(--color-semantic-status-error)` (or a dedicated destructive role), **not** `var(--color-cga-red)`. *This is the 1059 sweep.*
4. **Theme:** every theme must define that error role (completeness). A light theme points it at a red that passes AA on the light background.
5. **Apple:** the iOS/macOS DS error/destructive role aliases Foundation `cga-true/red`; `sync-figma-to-swift` regenerates the Swift constant.

That single decision touches T1 (already done), T2 (922), the component (1059), every theme, and the Apple chain — which is exactly why the map exists.

---

## Per-role resolution table (default vs cga-amber theme)

Illustrates how the *same role* diverges by theme (values abbreviated). Keep this current as roles change.

| Role | `:root` (base, amber-mono) | `[data-theme="cga-amber"]` |
|------|----------------------------|----------------------------|
| `background.primary` | `cga.black` `#020003` | `cga.black` `#050300` |
| `background.accent` | `cga.amber` `#FFB000` | `cga.blue` `#0000AA` |
| `text.primary` | `cga.lightGray` `#B87C1A` | `cga.lightGray` `#ADAAA5` |
| `text.accent` | `cga.yellow` `#E5B936` | `cga.amber` `#FFB000` |
| `status.error` | `cga.brightRed` `#DCA934` (gold) | `cga.brightRed` `#FF5555` (red) |
| `status.success` | `cga.brightGreen` `#CB9529` (gold) | `cga.brightGreen` `#55FF55` (green) |

Note the base theme's `status.*` are amber-mono — honest status needs `cga-true.*` (922).

---

## Gaps this map makes visible (tracked work)

- **No honest amber role** and amber-mono `status.*` in the base semantic layer → **DMNC-922** (rationalize the semantic layer; keep primitives as a pool).
- **Components paint raw primitives** instead of roles → **DMNC-1059** (sweep).
- **No enforcement** that components stay on roles → **DMNC-1070** (token-discipline lint).
- **No light theme** yet, and the semantic layer isn't complete enough to make one reliable → unblocked by 922 + 1059; see the light-mode section of the principles doc.
