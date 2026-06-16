---
title: Colour-system principles — amber-phosphor identity, semantic-first theming, and first-class light mode
date: 2026-06-16
category: best-practices
module: tokens
problem_type: best_practice
component: design-tokens
severity: high
applies_when:
  - You are adding or changing a colour token, semantic role, or theme
  - You are deciding whether a value belongs in a primitive, a semantic role, or a theme
  - You are authoring a new theme (light/business/modern) and need the rules and the contrast gate
  - You are routing a component off raw primitives onto semantic roles (DMNC-1059)
  - You are reviewing a colour PR and need the principles to hold it against
tags: [tokens, colour, theming, light-mode, oklch, accessibility, contrast, amber, dmnc-922, dmnc-1058, dmnc-1059, semantic-tokens]
related:
  - token-architecture-map.md
---

# Colour-system principles

**Living document.** The rules the colour system is held to — for components, themes, and reviews. Pairs with [token-architecture-map.md](./token-architecture-map.md) (the *where*). These are what DMNC-1070's token-discipline lint will mechanically enforce; until then they are reviewer law (in the PR template).

---

## Identity — why amber

eidotter is **amber phosphor**, grounded in late-1980s amber monochrome monitors (IBM 5151 / Compaq Portable). This is brand identity, not a theme choice — the *default* theme is amber-on-warm-black, and the CRT/phosphor effects are part of the signature.

Consequences that drive the rules below:
- **Real red and real green for function, not a hue shift.** Errors must read as errors. A warning signalled only by a shift *within* amber fails colour-blind users and unconscious processing alike. Honest functional colour lives in `color.cga-true.*` (`#AA0000` / `#00AA00` / `#00AAAA`), theme-invariant (DMNC-1001).
- **We are not "full CGA."** The 16-colour CGA namespace is kept as a *reference pool*, but cyan/magenta/blue primitives are not in service — keeping them implies retro-PC theming we don't do.

---

## Core principles

### 1. Components paint **only** through semantic roles
Never `var(--color-cga-*)` or hardcoded hex in component CSS/TSX. Always `var(--color-semantic-*)` (or the `dos-*` Tailwind utility that resolves to it). This is the single rule that makes theming work: a component on roles re-themes for free; a component on primitives is frozen. (The DMNC-1059 sweep is the act of making every component obey this; DMNC-1070 is the lint that keeps it true.)

### 2. T1 is a reference pool; not every primitive is in service
Adding a primitive is cheap and reference-only. A primitive enters *service* only when a **semantic role aliases it**. So:
- **Keep** the full `cga.*` palette (and `cga-true.*`) even though most aren't used — they're a vetted pool to draw from when a new role needs a value.
- **Don't** delete/rename primitives just because they're unused (that was the original 922 framing; this supersedes it for the web slice — lower risk, same outcome).
- The work of 922 is therefore mostly at the **semantic layer**: make the roles honest and complete, drawing values from the pool.

### 3. Every semantic role is defined in **every** theme
Completeness *is* themeability. A role that some theme forgets to define falls back to the base value and breaks that theme silently. A theme is "done" only when it defines (or deliberately inherits) every role. A test should assert role-set parity across themes.

### 4. Functional colour passes **WCAG AA per theme**
Every role used for text/icons must pass AA against the background role it sits on, **in each theme**. Gated by `scripts/check-contrast.mjs`, run **per theme** (not just the default). A theme cannot merge if any role fails AA on its own surface. Disabled states are exempt (WCAG 1.4.3).

### 5. Glows and CRT effects are **theme-scoped**
Phosphor glow / bloom / scanline tokens are dark-native. A light theme must tone them down or null them (a light surface with an amber bloom looks broken). Treat the effect colour tokens (`effects.*`, the `shadow.glow*` set) as theme-overridable, not constants.

### 6. Generated files are never hand-edited
Edit the JSON sources in `src/tokens/`; run `npm run build-tokens`. CI fails on drift. `npm run lint-tokens` fails on any `var(--*)`/`dos-*` reference that doesn't resolve.

---

## Light mode is a first-class goal

Not an afterthought — the second supported theme, gated like the first.

### How it works (mechanism already exists)
A theme is a file that re-points the **same semantic roles** to theme-appropriate values, compiled to `[data-theme="light"]`. So light mode = `src/tokens/theme.light.tokens.json`. Nothing in components changes — **if** they obey Principle 1. That's why **1059 is the real prerequisite for reliable light mode**, and a complete honest semantic layer (922) is the prerequisite for 1059. Same arc.

### You define light by role, not by inversion
Inverting amber-on-black yields mud. Instead pick, per role: a light surface, dark-on-light text, an accent that holds contrast on light, functional red/green that pass AA on light. **Same role names, flipped values.**

### Mine the existing consumer themes — don't lift them
Two consumers already ship light/business themes (discovered 2026-06-16). They are **decisions to mine, not code to copy**, because both use the **shadcn role vocabulary** (`--background`, `--primary`, `--destructive`, …), not eidotter's `--color-semantic-*`:

- **rizomorf** — `next-themes` with themes `["light", "retro"]`; the light theme is **stock shadcn neutral** (white bg, near-black text, standard red). Low design value, but confirms the role taxonomy and that a non-amber theme coexists with the amber "retro" one.
- **ux.dominickennedy.de (uxdmncde) — "business" theme** — a *designed* professional light palette in **OKLCH**: warm-paper background `oklch(0.98 0.002 90)` (~#FAFAF9), near-black ink `oklch(0.15 0 0)`, muted-blue accent `oklch(0.45 0.08 250)`, honest red destructive `oklch(0.55 0.20 25)`, warm-grey muted/secondary. **This is effectively a validated "modern/light" eidotter theme already.** Seed `theme.light`/`theme.business` from these role→value decisions, translated into eidotter semantic roles.

### Recommendation: author themes in OKLCH
uxdmncde proves the value — OKLCH is perceptually uniform, so you can hold chroma/hue and tune lightness to hit contrast targets predictably. Style Dictionary emits whatever the source says; we can store light-theme values as OKLCH and keep the amber/DOS themes in hex. Document the conversion in the map doc.

### The brand decision the light theme forces — DECIDED: amber in daylight
The light/"business" theme keeps **amber as the accent** ("amber phosphor in daylight"), not a professional blue (2026-06-16, Dom). Constraint: amber on a light surface is low-contrast and can read as "warning", so the light theme uses a **darkened amber** (`amber-dim`-family, e.g. `#9A5700` or darker) for the accent/text-on-light so it passes AA, and reserves bright `#FFB000` for fills/glows where a light foreground sits on it. Functional red/green stay honest (`cga-true.*`). Every role still gets a light value (Principle 3) and passes AA per theme (Principle 4).

---

## Semantic role vocabulary — DECIDED: UTI-tier canonical + shadcn alias shim

(2026-06-16, Dom.) eidotter's web semantic layer standardizes on **Untitled UI's emphasis-tier model** as canonical, with a thin **shadcn-compatible alias layer** for consumer convenience.

**Why tiers, not shadcn-as-canonical:** semantic layers are per-platform by design (web in `web.tokens.json`, Apple-HIG in the iOS/macOS DS Figma, Material later in its own). The emphasis-tier model (`primary/secondary/tertiary`) is the **cross-platform common denominator** — it maps ~1:1 onto Apple HIG (`label/secondaryLabel/tertiaryLabel/quaternaryLabel`, background tiers) and onto Material surface tiers. shadcn's model mixes in component-slot roles (`card`, `popover`, `sidebar`) that are web-only and don't generalize — fine as an alias, wrong as the canon. eidotter is also already authored against UTI (V.37), so this matches the component source.

**Canonical roles (UTI v8 vocabulary):**

| Group | Roles |
|-------|-------|
| `text` | `primary`, `secondary`, `tertiary`, `quaternary`, `disabled`, `placeholder`, `brand`, `error`, `warning`, `success` (+ `_hover`, `_on-brand` where needed) |
| `bg` (surface) | `primary`, `secondary`, `tertiary`, `quaternary`, `active`, `disabled`, `overlay`, `brand`, `error/warning/success` |
| `fg` (icons/graphics) | `primary`, `secondary`, `tertiary`, `quaternary`, `brand`, `error/warning/success` |
| `border` | `primary`, `secondary`, `tertiary`, `disabled`, `brand`, `error` |
| brand | the single brand hue = **amber** |
| utility ramps | `gray`, `brand(amber)`, `error`, `warning`, `success` (25→950) for charts/badges |

> Sourced from UTI v8's documented theme tokens. The UTI MCP exposes component installers, not the token list, so these names are from UTI's published `theme.css` vocabulary — confirm against the installed V.37 theme when wiring the actual tokens.

**shadcn alias shim** (so rizomorf / uxdmncde / shadcn apps converge with minimal churn — both already use these names):

| shadcn token | → eidotter canonical role |
|--------------|---------------------------|
| `--background` / `--foreground` | `bg-primary` / `text-primary` |
| `--card` / `--card-foreground` | `bg-primary` (or `secondary`) / `text-primary` |
| `--popover` / `--popover-foreground` | `bg-primary` / `text-primary` |
| `--primary` / `--primary-foreground` | `bg-brand` (or `text-brand`) / `text-on-brand` |
| `--secondary` / `--muted` | `bg-secondary` / `bg-secondary` + `text-tertiary` |
| `--accent` | `bg-secondary` (or `bg-brand` subtle) |
| `--destructive` | `error` (backed by `cga-true.red`) |
| `--border` / `--input` / `--ring` | `border-primary` / `border-primary` / `border-brand` (focus) |

This is the linchpin of the **rizomorf↔eidotter convergence**: rizomorf is a shadcn app, so the shim lets it consume eidotter tokens without rewriting every class, while the canonical tier layer keeps eidotter portable to iOS/Material. (Counter-pull noted: tiers are a touch more abstract than literal `card`/`popover`; the shim absorbs that for consumers.)

---

## Enforcement summary

| Rule | Enforced by | Status |
|------|-------------|--------|
| Refs resolve to declared tokens | `scripts/lint-token-refs.mjs` (`lint-tokens`) | ✅ in CI |
| No raw `cga-*`/hex in components | DMNC-1070 token-discipline lint (extends lint-token-refs) | ⏳ planned, gated on 1059 |
| Roles pass AA per theme | `scripts/check-contrast.mjs`, run per theme | ⚠️ exists for default; per-theme run TODO |
| No new axe violations | Storybook axe gate + `a11y-known-failures.json` | ✅ in CI |
| Visual no-regression | Chromatic | ✅ in CI |
| Reviewer checklist | PR template "Component compliance" | ✅ shipped (DMNC-1070 partial) |

---

## TL;DR for a contributor

- Paint with `var(--color-semantic-*)` only.
- Need a colour that has no role? Add a **role** (and define it in every theme) — pull the value from the primitive pool; don't paint the primitive directly.
- Functional state? Use `cga-true.*`-backed status roles, not amber-mono.
- Light mode is real: keep components on roles and it works. Mine uxdmncde's business palette; author in OKLCH; gate on per-theme contrast.
