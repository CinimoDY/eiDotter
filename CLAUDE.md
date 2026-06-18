# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

eiDotter is a DOS-themed React component library built with TypeScript. It provides authentic DOS/CGA terminal aesthetics for modern web applications. This is the shared design system foundation for the Timeline OS / Lifelin ecosystem.

## Commands

```bash
# Development
npm run dev                         # Start Vite dev server
npm run storybook                   # Launch Storybook on port 6006

# Testing
npm run test                        # Run Jest test suite
npm run test -- --watch             # Run tests in watch mode
npm run test -- --testPathPatterns="Button"  # Run tests matching pattern

# Build
npm run build                       # TypeScript + Vite production build
npm run build-storybook             # Build static Storybook to /docs

# Linting
npm run lint                        # ESLint with TypeScript

# Component scaffolding
npm run create-component <Name>     # Generate component + stories + tests

# Figma sync (requires FIGMA_ACCESS_TOKEN, FIGMA_FILE_KEY in .env)
npm run sync-to-figma               # Push components to Figma
```

## Architecture

### Component Structure
```
src/components/ComponentName/
├── components/
│   ├── ComponentName.tsx           # Main component with JSDoc props
│   ├── ComponentName.stories.tsx   # Storybook stories
│   ├── ComponentName.test.tsx      # Jest + React Testing Library
│   ├── ComponentName.css           # BEM-style CSS using tokens
│   └── index.ts                    # Re-exports
└── index.ts                        # Public API
```

### Design Token Pipeline
Source files in `src/tokens/` (`base.tokens.json`, `theme.*.tokens.json`) → Style Dictionary v5 (DTCG format) → `src/styles/tokens.css`

**Do not edit `tokens.css` directly** — modify the JSON sources and rebuild.

### CGA Color Palette
The 16-color authentic CGA palette lives in `src/tokens/base.tokens.json`. Use CSS variables:
- `--color-cga-black` through `--color-cga-white`
- `--color-background-primary`, `--color-text-accent` (semantic tokens)

### Path Alias
`@` maps to `./src` in both Vite and TypeScript.

## Component Patterns

### New pattern: React Aria + Tailwind-first (V.37)

Components migrating to V.37 use React Aria primitives + Tailwind utilities + CSS for phosphor effects:

```tsx
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Button.css'; // phosphor glow effects only

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', ...props }) => (
  <AriaButton
    className={cn(
      'inline-flex items-center justify-center border-2 font-dos',
      sizeClasses[size],
      variantClasses[variant], // e.g. 'eidotter-btn--primary'
      props.className,
    )}
    {...props}
  />
);
```

- React Aria handles keyboard/press/focus/ARIA automatically
- `cn()` from `src/utils/cn.ts` merges Tailwind classes with conflict resolution
- CSS file contains only phosphor glow effects (box-shadow, keyframes) that Tailwind can't express
- Variant CSS classes prefixed `eidotter-[component]--*` to avoid consumer collisions
- Each component also emits a stable `eidotter-[component]` **block** class (e.g. `eidotter-btn`, `eidotter-badge`, `eidotter-tag`) as a variant-agnostic consumer hook. **Consumer override gotcha (DMNC-1112):** target the block class `.eidotter-btn` (or the element / a specific `eidotter-btn--*` variant) — **`.eidotter-button` is not a real class** and never was; CSS written against it silently no-ops.
- Backward-compatible prop aliases (small→sm, medium→md, large→lg)

### Legacy pattern: BEM CSS (Terminal, CommandPrompt only)

Terminal and CommandPrompt still use BEM class names (they use px-based bitmap font sizing that doesn't fit Tailwind's rem system). All other eidotter-specific components have been migrated to the V.37 pattern with `eidotter-*` prefixed CSS classes.

## Testing

Jest configured with:
- `jsdom` environment
- CSS modules mocked via `identity-obj-proxy`
- 80% coverage threshold enforced
- Test files: `*.test.tsx` or `__tests__/` directories

## Token Quick Reference

Use semantic tokens for all styling. See `docs/TOKENS.md` for complete reference.

| Purpose | CSS Variable | Tailwind |
|---------|--------------|----------|
| Page background | `var(--color-semantic-background-primary)` | `bg-dos-bg-primary` |
| Card/surface bg | `var(--color-semantic-background-secondary)` | `bg-dos-bg-secondary` |
| Accent bg | `var(--color-semantic-background-accent)` | `bg-dos-bg-accent` |
| Body text | `var(--color-semantic-text-primary)` | `text-dos-text-primary` |
| Dark text (on amber bg only) | `var(--color-semantic-text-secondary)` | `text-dos-text-secondary` |
| Accent text | `var(--color-semantic-text-accent)` | `text-dos-text-accent` |
| Muted text | `var(--color-semantic-text-muted)` | `text-dos-text-muted` |
| Border | `var(--color-semantic-border-default)` | `border-dos-border-default` |
| Focus border | `var(--color-semantic-border-focus)` | `border-dos-border-focus` |
| Phosphor glow | `var(--shadow-glow-md)` | `shadow-dos-glowMd` |
| DOS drop shadow | `var(--shadow-drop)` | `shadow-dos-drop` |

## Responsive CSS

Use **CSS container queries** (not media queries) for component-level responsiveness.
Components are consumed in varied layout contexts (sidebars, full-width, etc.).

```css
.component { container: component-name / inline-size; }

/* Mobile-first defaults, then enhance */
@container component-name (min-width: 480px) { /* standard */ }
@container component-name (min-width: 768px) { /* wide */ }
```

- Thresholds: 480px (standard), 768px (wide)
- Group `@container` blocks at bottom of CSS file, ordered by threshold ascending
- See `TimelineContainer` CSS files for reference implementation

## Anti-Patterns (NEVER DO)

These patterns break the eidotter design system:

```css
/* NEVER: Hardcode hex colors */
color: #FFB000;
background: #1a1a1a;

/* NEVER: Use opacity modifiers on borders */
border-color: rgba(255, 255, 255, 0.1);
```

```tsx
/* NEVER: Use Tailwind arbitrary values for colors */
<div className="bg-[#020003] text-[#b87c1a]">

/* NEVER: Use non-eidotter Tailwind colors */
<div className="bg-gray-900 text-amber-500 border-white/10">

/* NEVER: Use large border radius */
<div className="rounded-full rounded-2xl rounded-xl">

/* NEVER: Define custom CSS variables that conflict */
:root { --background: #f9fafb; --foreground: #171717; }
```

**Always use:**
- `bg-dos-*`, `text-dos-*`, `border-dos-*` for semantic colors
- `bg-cga-*`, `text-cga-*` for primitive colors
- `rounded-dos-sm` (2px) or `rounded-dos-base` (4px max)
- `font-dos` for typography
- Eidotter's existing tokens from `tokens.css`

## Component Selection

| User Need | Component |
|-----------|-----------|
| User action button | `<Button>` |
| Dismissible message | `<Alert>` |
| Content container | `<Card>` |
| Boolean toggle | `<Checkbox>` or `<Switch>` |
| Dialog/overlay | `<Modal>` |
| ⌘K command palette / jump-to | `<CmdPalette>` |
| Navigation tabs | `<Tabs>` |
| Status indicator | `<Badge>` |
| Text input | `<Input>` |
| Loading state (known progress) | `<Progress>` |
| Loading placeholder (pending content) | `<Skeleton>` |
| Collapsible section | `<Section>` (Accordion) |
| Navigation path | `<Breadcrumb>` |
| Site header | `<Header>` |
| Site footer | `<Footer>` |
| Timeline marker | `<TimelineNode>` |
| Multi-zoom timeline | `<TimelineContainer>` |
| Inline text expansion | `<InlineExpand>` |
| Inline navigational anchor | `<InlineLink>` |
| Demoscene media placeholder | `<DosFigure>` |
| DOS text decode effect | `<TextScramble>` |
| CRT effects | `<RetroEffects>` |

## Documentation

- `llms.txt` — Machine-readable overview for AI agents
- `solutions/` — Documented solutions and best practices (searchable by YAML frontmatter: module, tags, problem_type)
- `plans/` — Implementation plans (naming: `YYYY-MM-DD-NNN-<type>-<name>-plan.md`)

**Note — `docs/` is Storybook build output.** The entire directory is wiped on every Storybook build (`package.json` `"build-storybook": "storybook build -o docs"`). This includes `docs/DESIGN_PRINCIPLES.md`, `docs/TOKENS.md`, `docs/INTEGRATION.md`, and `docs/CROSS_PLATFORM_VARIANTS.md` (their content lives in component stories + this CLAUDE.md) as well as any skill-generated content. Never write skill output to `docs/solutions/`, `docs/plans/`, `docs/brainstorms/`, or any other `docs/*` subdir.

**Storybook-safe locations for skill-generated content** (all at repo root):

- `solutions/<category>/` — compound-engineering solutions (ce:compound)
- `plans/` — implementation plans (ce:plan / superpowers:writing-plans); gitignored, local-only
- `ideation/` — open ideation notes
- `.superpowers/` — superpowers specs and plans
- `.devjournal/` — devjournal sessions

## Icon Library (tree-shakable)

Eidotter ships a tree-shakable icon catalog derived from the eiDotter Icons Figma file (`IOnWrXPMSiF7Nn5irr6UYZ`, Line icons page, 1,172 components).

**Two sets, one export surface:**

- **Curated subset** (~43 icons) — polished, committed to git, published to npm. Exposed as `eidotter/icons`.
- **Full catalog** (1,172 icons) — unpolished, gitignored, for Dom's local use. Exposed as `eidotter/icons/all` (locally resolves to 1,172; from npm resolves to the same 43 since that's all that ships).

This repo is public on GitHub. Many icons are still rough and not ready for exposure — only promote/publish the curated subset. Expand the subset by editing `src/icons/published.manifest.json` and re-running `npm run generate-icons`.

**Package subpath exports:**

- `eidotter/icons` — curated subset (always exactly the manifest).
- `eidotter/icons/all` — whatever is locally generated (43 on fresh clones, 1,172 after `fetch-icons`).
- `eidotter/icons/<kebab-name>` — deep import of any single icon (e.g. `import { Heart } from 'eidotter/icons/heart'`).

**Tree-shaking:** `"sideEffects": ["**/*.css", "**/*.scss"]` in `package.json` lets bundlers prune unused icon components while preserving CSS side effects. Each icon is its own ES module with a named export.

**Regeneration pipeline** (requires `FIGMA_ACCESS_TOKEN` in `.env`):

```bash
npm run fetch-icons      # Figma REST API → scripts/icons/.cache/svgs.json (gitignored cache)
npm run generate-icons   # SVGs → src/icons/components/*.tsx + rewrites barrels + syncs .gitignore
npm run build-icons      # TSX → dist/icons/ (separate tsc pass with react-jsx runtime)
```

`npm run build` runs the main lib build + icons build. Icons are excluded from `tsconfig.build.json` because they compile via their own `tsconfig.icons.json` (react-jsx runtime, isolatedModules).

**Source layout:**
- `src/icons/components/<kebab>.tsx` — generated; never edit by hand. Run `generate-icons` to refresh.
- `src/icons/index.ts` — full barrel (gitignored — scans the filesystem at generation time).
- `src/icons/published.ts` — curated barrel (committed; auto-generated from `published.manifest.json`).
- `src/icons/published.manifest.json` — **edit this** to add/remove curated icons.
- `src/icons/types.ts` — `IconComponent`, `IconSvgProps`.

**Git strategy:** `.gitignore` has `src/icons/components/*.tsx` + `src/icons/index.ts` globally ignored, with `!` negation lines for each curated icon. The `build-barrels.mjs` script rewrites the `BEGIN CURATED ICONS` ↔ `END CURATED ICONS` section of `.gitignore` from `published.manifest.json` on every regeneration — so adding an icon to the manifest auto-un-ignores its `.tsx` for the next commit.

**Legacy `<Icon name="…" />` component** (src/components/Icon/) still exists for backward compat. Planned migration to per-icon imports in v0.20.0.

## Figma Design System

**Multi-platform DS (PR #335 / DMNC-916, May 2026):** Foundation library + per-platform DS files. All subscriber files alias Foundation primitives so a T1 change ripples everywhere.

| File | Key | Role |
|------|-----|------|
| **eiDotter Foundation** | `KoGTFX8INOAjFaOKPXnSlX` | Canonical T1 primitives (CGA palette) + T3 dimensions + T4 effect numerics + `typography/fontFamily/primary` (brand-locked Perfect DOS VGA 437 Win) + 29 Effect Styles (`shadow/drop`, amber + 6-color phosphor glows × xs/sm/md/lg). Library, subscribed-to. |
| **eiDotter Web DS** | `iohPpta7n73wCcP5xbsaJU` | Web T2 (126 semantic vars) + 34 ComponentSets across 12 UTI-faithful pages — Button (120 variants), tier-1 (12), tier-2 (10), tier-3 DOS-specific (11). All paints, fontFamily, fontSize, spacing, radius, border, opacity, and effect numerics variable-bound. Descriptions populated on every component. Snapshot at `figma-snapshots/web-ds.json`. |
| **eiDotter iOS DS** | `TEnlcIgXrB3akHvtjMy3po` | Apple iOS HIG (Labels/Backgrounds/Fills/Accents/Vibrant/IC modes) — 87 vars aliased to Foundation. |
| **eiDotter macOS DS** | `peVTIvO9oDzynkPXhQo0W8` | Apple macOS HIG + Liquid Glass shader params (kept as literals, not aliased per Phase 0j). |
| **eiDotter DS V.37 / "❖ Pattern Lab"** | `V4tIz3sAMRx7H9wMYeesA6` | UntitledUI-full component fork (rich UTI component set + dual-mode amber color). The **component-authoring reference the npm package is built against** — *not* a foundation; it aliases nothing in the production chain. Unpublished as a team library. |
| ~~"Foundation"~~ (abandoned) | `qlEyN6zHPX4XOohJefJ4bZ` | **Abandoned first attempt** on Molly Helmuth's DS (full UTI ramps + half-started DOS overlay). **Out of scope — do not subscribe to or alias.** Named "Foundation" and uses the same "❖" glyph as V.37, so easy to confuse with the canonical `KoGTFX8`; it is neither the foundation nor V.37. Retained only as a frozen palette-pattern source for DMNC-922. |

**Production chain (verified live 2026-06-07):** `eiDotter Foundation (KoGTFX8) → Web/iOS/macOS DS → apps`. Web DS's 126 semantic vars all alias Foundation (e.g. `color/semantic/status/success → color/cga/brightGreen`). Note `status/*` therefore inherits Foundation's amber-mono CGA (its `green/red/cyan` resolve to browns) — DMNC-1001 adds literal-CGA status primitives so apps can alias honest colours; the full rationalization is DMNC-922.

**Reverse pipeline (Figma → Swift):** `scripts/sync-figma-to-swift.ts` reads `figma-snapshots/{ios,macos}.json` + `foundation-keys.json` and emits `platforms/swiftui/Sources/EiDotterTokens/Apple{IOS,MacOS}.swift`. Walks variables; resolves cross-file Foundation aliases via key map; recursively resolves same-file alias chains; falls back to RGBA literals for KEEPs. Run via `npm run sync-figma-to-swift` after re-snapshotting. CI freshness guard in `build.yml` fails if committed Swift drifts from snapshot.

**Forward pipeline (npm → Figma):** `scripts/sync-to-figma.ts` reads `FIGMA_WEB_DS_KEY` (fallback `FIGMA_FILE_KEY`) and writes Markdown specs to `figma-specs/` at repo root (NOT `docs/figma-specs/` — Storybook wipes `docs/`). Component-set creation is figma-console MCP work, not REST.

**Effect Style limitation:** Figma's 2026 Plugin API does not allow Variables to bind to Effect Style colors — they're literal RGBA only. The 29 phosphor-glow styles in Foundation are locked to amber `#FFB000` (and per-color equivalents) at 50% opacity. An amber rebrand requires manual republish. Effect numerics (offset.x/y, radius, spread) DO bind via `figma.variables.setBoundVariableForEffect(effect, field, var)` — captured as Foundation T4 variables in `2. Effect Parameters` (DMNC-919).

**Opacity binding quirk:** `setBoundVariable('opacity', floatVar)` divides the variable's resolved value by 100. Figma opacity vars MUST be stored as percent (0–100), not decimal (0–1). The CSS-side `src/tokens/*.tokens.json` keeps decimal form — Style Dictionary reads from JSON, not Figma. Variable name `.` is also rejected; use pixel-value naming (`spacing/2px`) for half-step tokens. See `solutions/developer-experience/figma-variable-binding-quirks-2026-05-08.md`.

**Connection:** figma-console MCP (Southleft) — desktop bridge plugin (port 9223+). All inter-file aliasing uses `figma.variables.importVariableByKeyAsync(key)` + `setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: imported.id })`. Verified at scale during the multi-platform migration: 86 macOS alias updates landed in a single `figma_execute` call; the iOS migration ran 316 updates in batched form. Pattern is robust; batching threshold isn't precisely characterized — 86 is known-safe, plan for batching above that until empirically tested higher.

## External Dependencies: Untitled UI (reference only)

eiDotter uses Untitled UI as a **pattern reference**, not a dependency. **No UTI code is bundled or imported by eidotter at runtime or build time.**

- **No runtime dep:** `@untitledui-pro/icons` was removed in the pixelarticons swap. `vite.config.ts` externalizes any `@untitledui-pro/*` import as a defense-in-depth guardrail — any rogue import would fail the build loudly instead of silently bundling licensed assets.
- **Icons:** Backed by [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT) — authentic DOS pixel art matching eidotter's aesthetic. Wrapped in `src/components/Icon/components/Icon.tsx` (ICON_MAP with 12 public names mapping to 11 unique pixelarticons components — `Done` and `Check` share the same `Check` glyph).
- **Patterns:** V.37 component migration follows React Aria + Tailwind patterns inspired by UTI. eiDotter owns all component code — never import UTI React components.
- **Docs:** `docs/UNTITLEDUI_REACT.md` is a periodic snapshot kept as a migration-pattern reference. The MCP server (`untitledui` in `.mcp.json`) provides live reference access during development.
- **Figma:** UTI Figma library is set up with eiDotter's DOS tokens. eiDotter's Figma file is the source of truth for component design.
- **License rationale:** eidotter is published under CC-BY-NC-4.0. UTI Pro is a paid commercial license that does not permit sublicensing/redistribution. Bundling UTI Pro assets into `dist/eidotter.css` / `dist/index.es.js` would have been a license violation. Pixelarticons (MIT) avoids this entirely.

## Current Component Status (v0.34.x, June 2026)

**Components** (41): Accordion, AIText, Alert, Badge, Brand (Logo, Wordmark, BrandLockup), Breadcrumb, Button, Card, ChatMessage, ChatHistory, ChatInput, ChatContainer, Checkbox, CmdPalette, CommandPrompt, DosFigure, FilterBar, Footer, Header, Icon, InlineExpand, InlineLink, Input, LegalPage, Lightbox, Modal, Nav, Notification, Progress, RetroEffects, Separator, Skeleton, Stat, Switch, Tabs, Tag, Terminal, TextScramble, TimelineContainer, TimelineNode, Tokens

**AIText (v0.24.x, DMNC-946):** Inline marker for AI-drafted prose — renders a `<span data-provenance="ai-draft">` with a **static, theme-aware** magenta gradient ('AI writer' style) from `src/styles/provenance.css` (shared with the per-paragraph diff pipeline, DMNC-884). Theme-aware stops: `#FF1A8C→#FF55FF` on amber/dark, `#C0228A→#7A3CC0` under light themes (`[data-theme="light"]`/`.light`). Restyled 2026-06-17 from the old animated magenta→white→cyan shimmer (the white midpoint failed on light backgrounds). Use for marking a phrase inside otherwise-human prose; for whole paragraphs in MDX prefer the raw `data-provenance` attribute.

**RetroEffects `boot` (v0.28.0, DMNC-1047):** CGA monitor turn-on played once on mount (~650ms: ignition line → raster opens → warm phosphor wash). The portfolio-wide first-load signature — consumers add the one prop. Compositor-only; skipped under reduced motion; `onBootComplete` for sequencing boot text. Add `bootOnce` to gate it to once per browser tab/session (sessionStorage, key `bootStorageKey`, default `'eidotter:retro-boot'`): plays on first load, suppressed on all in-site navigation — SPA route changes AND MPA full-reload navigation — so opening a blog post / switching pages does not replay it; a new tab/visit replays, a hard refresh does not. The gated path is effect-driven (SSR-safe) and falls back to playing if storage is blocked.

**Skeleton (v0.27.0, DMNC-1018):** DOS/CGA loading placeholder — rows of shade characters (░ ▒ ▓) with a CRT hum-bar glow band rolling top→bottom (1.6s, compositor-only; gentle opacity breathing under reduced motion, all animation off in high contrast). Variants: text/card/figure/timeline. Purely presentational — render while content loads, then swap out.

**Lightbox (v0.21.x+, DMNC-877):** Fullscreen image viewer built on Modal's React Aria primitives — prev/next navigation, counter, caption, keyboard nav, touch swipe. Used by TimelineContainer's image/gallery entry variants.

**LegalPage (DMNC-881):** Layout primitive for Impressum / Datenschutz pages — `<h1>` + "Stand: …" date hero, optional intro, optional `home` slot (back-link), and styled body that targets `<h2>`/`<p>`/`<ul>`/`<address>` children directly. Compact 14-px scale codified locally rather than in global tokens (eidotter's `text-sm = 20px` is too big for legal-document body copy; portfolio sites were already overriding to 14 px). Ships alongside reusable German DDG/DSGVO clause components (`ImpressumAddress`, `ImpressumLiabilityContent`, `DatenschutzController`, `DatenschutzPostHog`, etc.) so consumers stop copy-pasting paragraph wording across surfaces.

**v0.21.0 — Timeline overhaul Phase 2.** Two additive `<TimelineContainer>` capabilities, no new top-level components:
- **`renderEntry` prop** — pluggable entry renderer with `defaultRender()` opt-in. Threads through MonthView, DayView, HourView, and static mode. New types: `TimelineEntryRenderContext`, `TimelineRenderEntry`.
- **`mode="feed"`** — paginated vertical-list mode. New props: `pageSize` (default 10, ≥1), `onLoadMore(visibleCount)`. DOS-styled LOAD MORE button. Append-flow safe (visibleCount preserved when entries grow). Composes with `renderEntry`.

Also: Vite bumped to `^8.0.10` (Rolldown bundler — verified `dist/*` parity, ES bundle ~16% smaller from better tree-shaking). Tailwind major-version bumps were ignored by Dependabot until the deliberate v4 migration landed in 0.26.0 (ignore rule removed with it).

**v0.20.0 — three new components from the April 2026 design handoff:** `<InlineLink>` (navigational anchor; rizomorf parity #03), `<DosFigure>` (demoscene media placeholder; rizomorf parity #02), `<CmdPalette>` (⌘K command palette). All built to the V.37 pattern (React Aria + Tailwind + CSS for phosphor).

**Removed in timeline overhaul (PR #199):** TimelineEntry (TimelineItem), TimelineList — use `<TimelineContainer>` instead.

**Migrated to Tailwind-first (all 17 audited components):**
- Wave 1 (PR #200): Button, Badge, Alert, Checkbox, Switch, Tag — React Aria + Tailwind
- Wave 2 (PR #201): Separator, Stat, Breadcrumb, Progress — Tailwind + cn()
- Wave 3 (PR #202): Accordion, Footer, Tabs, FilterBar — Tailwind + cn()
- Wave 4 (PR #203): Input, Modal, Nav — Tailwind + cn()
- Wave 5 (PR #206): Input → React Aria TextField, Tabs → React Aria TabList/Tab/TabPanel, Modal → React Aria ModalOverlay/Modal/Dialog

**React Aria interactive components (8):** Button, Checkbox, Switch, Tag, Input, Tabs, Modal, Notification (close button)

**Alert V.37 (PR #220):** Migrated to uniform dark background, featured icon with outline rings, `color` prop (replaces `type`), `actions` slot, container-query responsive layout. `type` prop kept as deprecated alias.

**Notification (v0.17.0):** New toast component — 5 color types (primary, gray, success, warning, error), featured icon rings, layered amber glow shadow, avatar/image/progress variants, auto-dismiss with `duration` prop. Purely presentational — consumers handle positioning.

**Not migrated to Tailwind-first (bitmap font exceptions):** Terminal, CommandPrompt — use px-based bitmap font sizing incompatible with Tailwind's rem system. Icon and Tokens are utility components with no layout styling to migrate.

**Figma sync (v0.16.0):** 13 eidotter-specific components added to V.37 Figma file on "eiDotter Custom" page. Checkbox added in v0.16.1. UTI components verified — already had correct variant structures.

**Tailwind CSS build (v4 since 0.26.0, DMNC-866):** Tailwind v4 (`@tailwindcss/postcss`, Oxide engine) processes component utility classes; the generated JS preset stays the theme source in legacy mode via `@config "../../tailwind.config.cjs"` in `src/styles/tailwind.css` (the long-term CSS-first `@theme` formatter is a style-dictionary follow-up). No `autoprefixer` (v4 prefixes natively) and no `tailwindcss-animate` devDep (eidotter uses no `animate-*` utilities; the preset still auto-registers it for v3 consumers that install it). The compiled `dist/eidotter.css` includes all Tailwind utilities — consumers do NOT need Tailwind installed to use components, and `eidotter/tailwind.preset` works on Tailwind 3 and 4. `tailwind.preset.enhanced` (the deprecated alias from #282's split, restored as a shim in #283) was removed in v0.25.0 after its deprecation cycle completed — `tailwind.preset` is the only preset export.

**Icons (v0.18.0+):** Backed by [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT licensed, ~480 base icons, authentic DOS pixel art style). The `<Icon>` component exposes 12 public names mapping to 10 unique pixelarticons components + 1 custom component (`Done` and `Check` share the same glyph) via an internal ICON_MAP. Consumers use `<Icon name="Warning" size="S" />` unchanged. Available names: Info, Warning, Error, Done, Check, Close, Chevron Up, Chevron Down, App, Cancel, Fullscreen, Add. Note: **`Close` renders a custom pixel-art X mark** (pixelarticons v2 has no standalone X/close glyph, so a matching `PixelX` component is defined inline in Icon.tsx — added in v0.19.0). `Cancel` renders a minus glyph because it represents the Terminal window minimize control, not abort semantics. Earlier versions used `@untitledui-pro/icons` — removed for license reasons (UTI Pro is not sublicensable; bundling it into `dist` was a license violation). The old SVG spritesheet was removed in v0.18.0. MIT attribution for pixelarticons is included in `LICENSE.md` under "Third-Party Licenses".

**Header (PR #246):** Sticky site header composing branding link + Nav. Props: `brandName`, `brandHref`, `items`, `activeHref`, `variant` (retro/modern), `sticky`, `linkComponent`, `children` (custom branding), `className`. Uses `forwardRef`. Retro variant has amber phosphor glow on border-bottom.

**Font (v0.22.0):** Switched primary font to [Perfect DOS VGA 437](https://www.dafont.com/perfect-dos-vga-437.font) by Zeh Fernando — pixel-perfect-vector TTF where every glyph outline is axis-aligned (no curves, no bezier easing). Replaces Flexi IBM VGA True v2, which was aspect-corrected but still rendered bezier outlines that "resembled" pixel art. Free-to-redistribute per the author's bundled license; single-weight by design. Flexi files remain in `src/styles/fonts/` for now (no longer loaded; legacy consumers can override `--typography-font-family-primary` to point back at `'Flexi IBM VGA True'` if needed). PR #246 history: previously upgraded from Flexi IBM VGA False v1 to Flexi IBM VGA True v2.

**Chat components** (`src/components/Chat/`): Pure presentational — no AI SDK dependency. Consumers wire up `useChat` or any chat state. Compose inside `<Terminal>` for full DOS window experience.

**Hooks**: `useTextScramble` (rAF text decode), `useAnimatedDismiss` (animate-then-unmount pattern)

**Shared Utilities**: `src/utils/prefersReducedMotion.ts`, `src/utils/cn.ts` (Tailwind class merge), `src/styles/keyframes.css` (phosphor-warmup, phosphor-energize, blink)

**Breaking change in v0.14.0**: Terminal `minimizable`, `maximizable`, `closeable` now default to `false`. Consumers who need window controls must pass them explicitly.

**Registry**: `src/components/registry.ts` tracks origin, consumers, variant metadata, platform support, and per-component changelogs. Top 5 components (Button, Card, Badge, Alert, Tag) fully populated. Variant keys use `"prop:value"` format (e.g. `"variant:primary"`, `"size:small"`).

**Swift Package**: `platforms/swiftui/` contains SPM package with `EiDotterTokens` (generated) and `EiDotterUI` (DOSButton POC). Tokens output to `platforms/swiftui/Sources/EiDotterTokens/` only (`src/styles/EiDotterTokens.swift` removed in #253).

## Animation Patterns

All components have CRT phosphor animations. When adding animations:

- **Enter effects** (Badge, Card, TimelineNode): CSS `@keyframes` on the base class + `animation: none` in `prefers-reduced-motion`
- **Dismiss/exit** (Alert, Tag): Use `useAnimatedDismiss(animationName, onDismiss)` hook — handles closing state, ref guard, reduced-motion bypass
- **Toggle glow** (Checkbox, Switch): CSS transitions on `box-shadow`/`text-shadow` with `--duration-normal`
- **JS-measured positioning** (Tabs indicator): `useLayoutEffect` + `ResizeObserver` + CSS custom properties
- **Always-in-DOM expand/collapse** (Accordion): CSS transitions + `inert` attribute (never conditional render)
- **Shared keyframes**: `phosphor-warmup` and `phosphor-energize` live in `src/styles/keyframes.css` — import in TSX, not CSS
- **Reduced motion**: Every animation needs `@media (prefers-reduced-motion: reduce)` + JS bypass via `prefersReducedMotion()`
- **High contrast**: Neutralize `text-shadow`/`box-shadow` glows in `@media (prefers-contrast: high)`
- **Compositor-only**: Animate `transform` and `opacity` only — never `width`, `height`, `left`, `top`, `max-height`, `padding`

## Workflow: Planning New Features

**Always create a plan before implementing new ideas.** This ensures:
- Work is recoverable if sessions crash
- Plans can be reviewed before implementation
- Progress is documented

### Commands

```bash
# Create a structured plan for a new feature/request
/compound-engineering:workflows:plan <description>

# Review a plan with multi-agent analysis before implementation
/compound-engineering:plan_review <path/to/plan.md>

# Execute a reviewed plan
/compound-engineering:workflows:work <path/to/plan.md>
```

### Plan Storage

Plans live in `plans/` directory with naming convention: `YYYY-MM-DD-NNN-<type>-<name>-plan.md`

## Portfolio Context

This library is the foundation for several projects:
- **Rizomorf** - Portfolio showcase
- **Spacewar** - tvOS SpriteKit game (uses Swift tokens from `platforms/swiftui/`)
- **Pomodoke Calendar** - Time management
- **EatThisDie** - Health tracking (iOS)

Project paths vary by environment:
- **macOS**: `~/coding/` (e.g. `~/coding/rizomorf`)
- **WSL (Windows)**: `/mnt/d/Coding/` (e.g. `/mnt/d/Coding/riz/rizomorf`)

See the workspace-level `CLAUDE.md` for the full project portfolio.

## Quick Rules

- **text-secondary:** Only use `--color-semantic-text-secondary` / `text-dos-text-secondary` on amber/light backgrounds — it resolves to near-black (#020003)
- **Generated files:** `tokens.css`, `tokens.js`, `tokens.json`, `tailwind.preset.cjs`, `theme.*.css`, `EiDotterTokens.swift` are generated — edit JSON sources in `src/tokens/` instead. CI enforces freshness: `build.yml` rebuilds tokens and fails if generated files don't match committed output. Run `npm run build-tokens` after editing token JSON sources.
- **CI guardrails (post-v0.20.0):** `main` is branch-protected; `build (22.x)` must be green before merge (strict mode — CI re-runs on every HEAD). `build.yml` runs: token freshness check → `npm run lint-tokens` → build → `npm test` (958 tests) → build storybook. The token-ref lint (`scripts/lint-token-refs.mjs`) catches any `var(--*)` ref or `text-dos-*`/`bg-dos-*`/etc. Tailwind class that doesn't resolve to a declared token or preset key. The preset parity contract (`src/styles/tailwind-preset.test.ts`) asserts every `semanticVarMap` entry in `style-dictionary.config.mjs` has a matching `theme.extend.colors` key. Never add `--no-verify`, `--admin`, or force-push workarounds to bypass — fix the underlying drift.
- **Linear project:** eiDotter issues go in project "eiDotter", team "dmnc"
- **Storybook viewports:** Custom DOS viewports configured in `.storybook/preview.ts` (phone320, phone375, tablet768, desktop1024, ultrawide)
- **Button sizes (V.37):** xs=24px, sm=28px, md=32px, lg=40px, xl=44px min-height. Old aliases (small/medium/large) still work. Button/Badge/Tag/Stat/Checkbox text uses `text-dos-text-*` (18–26px) or `text-dos-display-*` (30–78px) utilities — never hardcoded `text-[Npx]`.
- **Font is single-weight:** Perfect DOS VGA 437 has no bold variant — authentic DOS never had one. All `fontWeight` tokens (`regular`/`semibold`/`bold`) resolve to `400`. Emphasis is expressed via color, `uppercase` (on labels like Badge/Tag), or `text-decoration: underline` (in high-contrast `@media` blocks), never via `font-weight`. `fonts.css` declares the `@font-face` at weight 400 with `font-synthesis: none` to prevent browser faux-bold synthesis. The `font-dos-bold`/`font-dos-semibold`/`font-dos-regular` utility aliases remain in `tailwind.preset.cjs` (all mapped to `400`) for backward compatibility with consumer code.
- **Timeline layout:** Nodes sit ON the axis line via `margin-left: calc(-1 * var(--spacing-6))` in views.css. All built-in views use `size="medium" variant="default"`. TimelineNode markers are `content-box` (rendered = width + 4px border).
- **Timeline labels:** Always visible at all container widths — shrink to `font-size-xs` below 480px, never `display: none`
- **Best practice docs:** `solutions/` are authoritative references — update them when changing the patterns they document
- **Branch protection:** `main` requires PRs — even version bumps need a branch + PR, can't push directly
- **Overflow containment:** Use `max-width: 100%; min-width: 0` on flex containers + `overflow-x: auto` on scrollable content areas
- **npm publish:** Requires `npm login` first — not pre-authenticated on this machine
- **Font-size tokens are rem:** All `--typography-font-size-*` tokens use rem (assumes 16px browser default). Hardcoded `font-size: Npx` in component CSS is an anti-pattern — use `var(--typography-font-size-*, fallback)` instead.
- **62.5% pattern incompatible:** eiDotter assumes `1rem = 16px`. Consumers using `html { font-size: 62.5% }` will see all text at 62.5% of intended size.
- **Consumer CSS imports:** A single `import 'eidotter/styles'` provides everything (fonts, tokens, component CSS, Tailwind utilities). Tailwind is NOT required — utilities are pre-compiled in `dist/eidotter.css`. Granular imports (`eidotter/fonts.css`, `eidotter/tokens.css`) remain available for consumers who override fonts or tokens independently.
- **shadcn/ui shim (`eidotter/shadcn.css`, DMNC-922):** For shadcn-based consumers. Maps shadcn var names (`--background`/`--foreground`/`--card`/`--primary`/`--muted`/`--accent`/`--destructive`/`--border`/`--ring`/`--popover`/`--secondary` + best-effort `--sidebar-*`/`--chart-*`) → eidotter semantic roles as **HSL channels**, so existing `hsl(var(--background))` usages consume eidotter's themeable palette and re-theme via `[data-theme]`. Import it after `eidotter/styles`, then delete your own `:root`/`.dark`/etc. colour definitions. **Opt-in — NOT bundled into `eidotter/styles`.** Generated by `scripts/generate-shadcn-shim.mjs` in `build-tokens` (`src/styles/shadcn.css`, freshness-checked) — never hand-edit; change the role mapping in the script. `sidebar`/`chart` are amber-family aliases — override per surface for real data-viz.
- **Update docs on release:** Always update README.md, CLAUDE.md, and guidelines/README.md when releasing versions or changing consumer setup.
- **Accessibility audit (Phase 1, 2026-05-05):** WCAG 2.1 AA conformance statement in `ACCESSIBILITY.md`. Baseline reports under `solutions/best-practices/{token-contrast,storybook-a11y,keyboard-audit,motion-contrast-spot-check}-2026-05-05.md`. Re-run via `node scripts/check-contrast.mjs` (token contrast) and `npx test-storybook --url http://127.0.0.1:6007` (axe scan, requires built `docs/` served on 6007). Five known defects tracked for follow-up plan: Icon `aria-prohibited-attr`, Tag `aria-allowed-attr` when selectable, ChatHistory not keyboard-scrollable, LegalPage links rely on color alone, cga-amber `bg-secondary` body contrast.
