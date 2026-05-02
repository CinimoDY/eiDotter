# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.22.1] - 2026-05-03

### Fixed
- **Bundler externalises `use-sync-external-store` shim chain.** 0.22.0 inlined the CJS `use-sync-external-store-shim.production.js` into the ESM `dist/index.es.js`, breaking consumer Vite builds (the duplicated React-export wrapper made consumer bundlers refuse the module). The shim is a transitive dep of `react-aria` / `react-stately`. `vite.config.ts` now externalises any path matching `use-sync-external-store` (bare package and Rolldown-resolved subpaths), and adds UMD globals mapping each subpath to the host `React` global (React 18+ exposes `useSyncExternalStore` natively). ESM bundle drops from 349KB → 345KB; consumer interop restored.

## [0.22.0] - 2026-05-02

AI-content provenance primitive (phase 1 of DMNC-884), font swap to Perfect DOS VGA 437, and a small TimelineContainer convention fix.

### Added
- **`--color-semantic-text-ai-draft`** (Tailwind: `text-dos-text-ai-draft`) — Signalnoise hot pink (`#FF1A8C`). Brand-locked: identical across amber-mono / cga-amber / cga-mode4-p0 / cga-mode4-p1 / cga-mode5 themes so the AI-draft signal is unmissable regardless of palette.
- **`--color-semantic-text-ai-draft-glow`** — 50% rgba of the same hex. Used in `text-shadow` only; no Tailwind utility. Single source of truth for the magenta phosphor halo (no duplicate rgba in CSS).
- **`src/styles/provenance.css`** — `[data-provenance="ai-draft"]` selector applying colour + halo, neutralised under `prefers-contrast: high`. Imported via the default `eidotter/styles` bundle so consumers get the rule for free. Visual primitive only — downstream consumers (devjournal first, then public surfaces) compute the per-paragraph diff and emit the attribute. See [DMNC-884](https://linear.app/lizomorf/issue/DMNC-884/phase-1-ai-content-provenance-marker-eidotter-token-utility-css).
- **Storybook section `Design System / Content Provenance`** — six stories: Default, MixedDraftAndRevised, OnLightBackdrop, Variants (`<p>`/`<li>`/`<blockquote>`), WallOfPink (six consecutive AI paragraphs as a fatigue check), HighContrastNeutralizesGlow.

### Changed
- **Primary font swapped to Perfect DOS VGA 437** by Zeh Fernando — pixel-perfect-vector TTF where every glyph outline is axis-aligned (no curves, no bezier easing). Replaces Flexi IBM VGA True v2, which was aspect-corrected but still drew bezier outlines that "resembled" rather than rendered authentic DOS pixel-art shapes. Free to redistribute per the bundled author license (`src/styles/fonts/Perfect_DOS_VGA_437_LICENSE.txt`); single-weight by design. `--typography-font-family-primary` resolves to `'Perfect DOS VGA 437', monospace`. Flexi files remain bundled under `src/styles/fonts/` so legacy consumers can still set `font-family: 'Flexi IBM VGA True', monospace` if needed; `@font-face` only loads Perfect DOS VGA 437 by default.
- **`<TimelineContainer>` no longer paints its own background.** The root `<div>` previously applied `bg-dos-bg-primary` unconditionally, forcing the page-background colour onto every host. It now inherits from its parent — consumers who relied on the implicit dark backdrop should wrap the timeline in a host element that sets the desired background. Aligns with the convention enforced by `<Alert>` and `<Notification>` (verified via regression test).

### Notes
- **Specificity (0,1,0).** The provenance attribute selector is intentionally weak — component CSS at class specificity overrides it without `!important`. Provenance is a cross-cutting hint, not a guaranteed visual lock.
- **Link affordance preserved.** `<a>` descendants of an `[data-provenance="ai-draft"]` element keep their own link colour by design — affordance ("this is clickable") outranks the AI-draft signal. Inline code, em/strong, and `::marker` inherit the pink.
- **API contract.** Only `data-provenance="ai-draft"` is supported. Revised paragraphs should carry no attribute at all rather than a `"revised"` value.
- **Font behaviour parity.** Both Perfect DOS VGA 437 and Flexi IBM VGA True are single-weight; existing `font-synthesis: none` and the `font-dos-bold/semibold/regular` aliases (all → 400) keep working unchanged. Visual letterform is different — pixel-aligned vs bezier-resembling.
- **Tests added/updated.** Source-token brand-lock invariant (per-theme parity), source ↔ generated cross-check, glow-token contract, selector + cascade, prefers-contrast neutralization, `src/index.ts` import pin, Tailwind preset spot-check, post-build `dist/eidotter.css` smoke check, font-family contract assertions updated to Perfect DOS VGA 437, German legal-clause text + test updated.

## [0.21.0] - 2026-04-29

Timeline overhaul Phase 2. Two new TimelineContainer capabilities for pluggable content + paginated reads. Purely additive — no breaking changes.

### Added
- **`renderEntry` prop on `<TimelineContainer>`** — pluggable entry renderer. Lets consumers swap the default `TimelineEntryCard` for any custom node (blog posts, photos, financial records, anything domain-specific). Render context exposes `defaultRender()` so consumers can opt in per-entry while letting the rest fall through to the default card. `isSelected` and `isExpanded` flow through unchanged so custom cards stay in sync with selection state. Threads through MonthView, DayView, HourView, and static-mode rendering. YearView is intentionally unaffected (renders bucket counts, not entries). New types `TimelineEntryRenderContext` and `TimelineRenderEntry` exported from the package surface and the `eidotter/components/TimelineContainer` subpath.
- **`mode="feed"` on `<TimelineContainer>`** — paginated, expandable vertical-list mode for changelogs, devlogs, and notification feeds. Distinct from `static` (always-expanded, no pagination) and from `interactive` (multi-zoom, drill-down). Entries are collapsed by default; click-to-expand via selection. New props:
  - `pageSize` (default `10`, clamped to ≥1) — initial slice + LOAD MORE step size.
  - `onLoadMore(visibleCount)` — fires once per LOAD MORE click after a real advance; safe under React StrictMode.
  - DOS-styled `LOAD MORE...` button with amber phosphor glow on hover/focus, with `prefers-reduced-motion` and `prefers-contrast: high` handling.
  - Pagination clamps when entries shrink below the current visible count, but **preserves visibleCount when entries grow** — the documented backend-pagination append flow works correctly. Composes with `renderEntry`.
- **Storybook stories**: `CustomRenderEntry` (milestone-as-special-card pattern), `FeedMode`, `FeedModeWithOnLoadMore` (analytics callback example).

### Changed
- `tailwindcss-animate` is currently incompatible with Tailwind v4. Dependabot is configured to ignore Tailwind major-version bumps until a deliberate v4 migration is planned (see `.github/dependabot.yml`).
- Vite bumped from `^6.4.2` to `^8.0.10`. Verified `dist/*` parity against published `0.20.1`: 54 named exports identical; ES bundle ~16% smaller from Rolldown's tree-shaking; CSS and UMD output near-identical (±1%). Default browser baseline raised to Chrome 107+ / Safari 16+ / Firefox 104+.
- PostCSS bumped from `8.5.10` to `8.5.12` (patch).

### Fixed
- Several feed-mode correctness issues caught in adversarial review before initial release:
  - Append flow no longer hidden by reset-on-length-change.
  - `onLoadMore` no longer fires inside the `setState` updater (was double-firing under StrictMode).
  - `pageSize=0` clamped to 1 to avoid the LOAD MORE button advancing forever with no progress.
  - LOAD MORE border now reads amber, not gray (was using a semantic token that resolved to light-gray).

### Notes
- 942 → 958 Jest tests (47 suites). 16 new tests across renderEntry (custom render replacement, context propagation, defaultRender fallthrough, all applicable views) and feed-mode pagination (append flow, pageSize=0 clamp, no-fire-at-cap, sortOrder, shrink-clamp).
- No new top-level component exports — both features are extensions of the existing `<TimelineContainer>`. Component count remains 36.

## [0.20.1] - 2026-04-24

First-class brand-mark components. Purely additive.

### Added
- **`<Logo>`** (`src/components/Brand/`) — V2 yolk (pure, no legs). Three nested circles (amber base / highlight / specular). Brand-locked hexes so the mark reads identically across themes. Props: `size` (number | string, default 32), `glow` (default true), `title` (defaults to "eiDotter"; empty string → `aria-hidden` for decorative use). `forwardRef`.
- **`<Wordmark>`** (`src/components/Brand/`) — "eiDotter" wordmark. "ei" prefix in dim amber, "Dotter" in full amber. Uses the DOS font (`font-dos`). Inherits host `font-size`; no default size so it composes into any type scale. Phosphor text-shadow glow can be disabled.
- **`<BrandLockup>`** (`src/components/Brand/`) — horizontal Logo + Wordmark composition. `logoSize`, `iconOnly`, `wordmarkOnly`, `glow` props. Default lockup for public brand surfaces.
- **`eidotter/brand` subpath export** — consumers can `import { Logo, Wordmark, BrandLockup } from 'eidotter/brand'` for semantic clarity. Resolves to the main bundle; tree-shaking handles the pull-through.

### Notes
- `prefers-contrast: high` neutralizes glow layers on all three components.
- Logo fills are brand-locked hexes (`#FFB000`, `#FFD97A`, `#FFE8A8`) rather than CSS variables — the logo is a visual-identity primitive that should not theme-shift across amber-mono / cga-amber / cga-mode4 / cga-mode5. Consumers who need a non-amber treatment can override via the SVG `style` prop or a CSS selector on the child `<circle>` elements.

## [0.20.0] - 2026-04-23

Three new components imported from the April 2026 design handoff — all built to the V.37 pattern (React Aria + Tailwind + CSS for phosphor). Purely additive: no existing component source was touched.

### Added
- **`<InlineLink>`** (`src/components/InlineLink/`) — in-flow navigational anchor. Dotted amber underline, phosphor-invert hover, trailing `▸` (internal) or `↗` (external). Distinct from `<InlineExpand>` (destination vs disclosure). External variant adds safe `rel="noopener noreferrer"` + `target="_blank"`; consumer-supplied `target="_blank"` without `external={true}` also auto-applies safe rel (tabnabbing guard). `href` is sanitized against `javascript:`/`data:`/unknown-scheme URLs. Closes rizomorf parity gap #03.
- **`<DosFigure>`** (`src/components/DosFigure/`) — demoscene-style painted-screen placeholder for media (Sierra / LucasArts title-card aesthetic). 4:3 amber chrome, 6s scanline sweep (container-query based, crosses the full frame at any size), phosphor flicker, optional annotation pins at `{x, y}` percentages with NaN-safe clamping, resolution tag. Animations are compositor-only (transform + opacity) and honor `prefers-reduced-motion` / `prefers-contrast`. Closes rizomorf parity gap #02.
- **`<CmdPalette>`** (`src/components/CmdPalette/`) — ⌘K / Ctrl+K command palette overlay built on React Aria `ModalOverlay` + `Modal` + `Dialog` (same primitives as `<Modal>`). Generic `items` with `keywords`, scored search, arrow-key navigation, optional `renderItem`, configurable hotkey (`"mod+k"` default, `false` to disable). Per-instance DOM ids via `useId()`. `selected` auto-clamps when `items` shrinks. Hotkey listener uses ref-based indirection so inline `onOpenChange` handlers don't rebind on every render.

All three components ship with `.tsx` + `.css` + `.stories.tsx` + `.test.tsx` + `Docs.mdx` + `index.ts`. `src/components/registry.ts` has new entries; `src/index.ts` exports the runtime + types.

### Changed
- Package version `0.19.4` → `0.20.0` (minor bump for new public components).
- CLAUDE.md + `llms.txt` + `README.md` + `guidelines/README.md` component lists updated (33 → 36).

### Notes
- No visual regression risk to existing components — these additions don't modify any shared CSS or token.
- Follows the same V.37 conventions as Button, Modal, etc.: React Aria where interactive, Tailwind for layout, component CSS only for phosphor effects and keyframes.

## [0.19.4] - 2026-04-23

Completes the April 2026 design-handoff token adoption by shipping the remaining two items — a dedicated muted-text semantic token and an opt-in `.dos-*` typography utility sheet.

### Added
- **`--color-semantic-text-muted`** (+ `text-dos-text-muted` Tailwind class) with per-theme hexes:
  - `amber-mono` → `{color.cga.lightGray}` (#B87C1A) — mid-ramp between amber primary and amberDim disabled
  - `cga-amber` → `{color.cga.brown}` (#AA5500) — warmth against the grey-heavy CGA palette
  - `cga-mode4-p0` → `rgba(255, 255, 0, 0.65)` — primary-at-65%-opacity (strict 4-color palette has no 5th hue)
  - `cga-mode4-p1` + `cga-mode5` → `rgba(255, 252, 247, 0.65)` — same strategy
  Dedicated hex per theme, not an opacity trick on amber — renders consistently over every surface and doesn't compound with phosphor filter effects.
- **`eidotter/utilities` subpath export** — opt-in CSS file shipping 12 `.dos-*` classes for raw HTML / MDX / prose surfaces: `.dos-page`, `.dos-hero`, `.dos-h1`–`.dos-h5`, `.dos-body`, `.dos-body-lg`, `.dos-caption`, `.dos-micro`, `.dos-label`, `.dos-code`, `.dos-scanlines`. All classes resolve through the existing `--color-semantic-*` and `--typography-*` tokens so they track the active theme. Not bundled into the default `eidotter/styles` — component-only consumers pay zero bytes.

### Changed
- CLAUDE.md Token Quick Reference muted row updated to `var(--color-semantic-text-muted)` / `text-dos-text-muted`.
- Component CSS + TSX files that previously referenced `--color-cga-brown` / `text-cga-brown` for muted text migrated to the new semantic token (landed in #295).

## [0.19.3] - 2026-04-20

### Fixed
- **Tailwind preset:** Restored the `monospace` fallback on the `font-dos` utility. PR #282 consolidated the Tailwind presets and began emitting `fontFamily.dos` verbatim from the source token, which had only `["Flexi IBM VGA True"]`. Consumers whose `@font-face` loading failed (strict CSP, web-fonts disabled, reader mode) would render in the browser default serif instead of monospace, breaking the DOS terminal aesthetic. The source `fontFamily.primary` token is now `["Flexi IBM VGA True", "monospace"]`, matching the pre-#282 runtime behavior. The separate `fontFamily.fallback` token remains intentionally bare (`["monospace"]`) — it's the fail-loud diagnostic escape hatch for surfaces that want to surface font-loading issues explicitly via `font-dos-fallback`.

### Internal
- Added contract tests asserting the exact `fontFamily.dos` and `fontFamily.dos-fallback` stacks, so future generator drift fails loudly in CI.

## [0.19.2] - 2026-04-18

### Deprecated
- **Tailwind preset:** `eidotter/tailwind.preset.enhanced` is now a deprecated alias for `eidotter/tailwind.preset` and will be removed in 0.21.0. Consumers should migrate to the single preset import:
  ```diff
  - presets: [require('eidotter/tailwind.preset.enhanced')]
  + presets: [require('eidotter/tailwind.preset')]
  ```
  The shim logs a one-time `console.warn` on load. No behavior change — the merged preset already carries the React Aria state variants and animate plugin that the enhanced preset used to add.

### Fixed
- **Docs:** `ADOPTION_STRATEGY.md` consumer file-layout diagram still named `tailwind.preset.js`; updated to `tailwind.preset.cjs` to match the post-#282 generated artifact.

## [0.19.1] - 2026-04-14

### Changed
- **Nav/MobileNav:** Replace hamburger icon with "MENU" text trigger — DOS font, uppercase, amber phosphor glow on hover (#265)
- **Nav/MobileNav:** Right-aligned, uppercase nav items in flyout panel with generous spacing (#265)
- **Nav/MobileNav:** Use `<Icon name="Close" size="S" />` (pixel-art X) for panel close button (#265)

### Added
- **Nav/MobileNav:** Escape key closes mobile panel (#265)
- **Nav/MobileNav:** `aria-controls` / `id` linkage between MENU trigger and panel (#265)

## [0.19.0] - 2026-04-13

### Added
- Header component: sticky site header with branding + Nav, retro/modern variants (#246)

### Changed
- Warm-tint all pure neutrals across design tokens (#259)
- **Icons:** Replaced @untitledui-pro/icons with pixelarticons (MIT) — DOS pixel art style (#257)
- **Fonts:** Upgraded to Flexi IBM VGA True v2; collapsed weight tokens to single 400 weight (#246, #250)
- Custom pixel-art X mark for Close icon (#261)

### Fixed
- Replace hardcoded font-size pixels with V.37 DOS tokens (#256)
- Declare Flexi IBM VGA True @font-face across weight range 100-900 (#249)
- Load Flexi IBM VGA True font in Storybook preview iframe (#248)
- Scale featured icons to 20px to prevent ring overlap (#263)
- Bump vite 6.4.1 → 6.4.2 security patches (#262)
- Bump axios 1.14.0 → 1.15.0
- Fix lint errors in Chat stories and Icon tests

## [0.8.0] through [0.18.0]

> Releases 0.8.0–0.18.0 were published before changelog entries were maintained here.
> See git history for details.

## [0.7.0] - 2026-02-09

### Added
- Tag and TagGroup components — interactive labels with variants (default, outlined, filled), custom CGA colors via `--tag-color`, selected/closeable/disabled states, keyboard interaction (#111)
- `<ComponentOrigin>` helper — surfaces component origin metadata in all Storybook MDX docs (#112)
- MDX documentation for Tag and FilterBar components (#112)

### Changed
- Origin sections added to all 20 component MDX docs pages (#112)

## [0.6.0] - 2026-02-08

### Added
- FilterBar component with multi-select, roving tabindex keyboard navigation, and 8 stories (#101)
- `useThemePortal` internal hook — propagates `data-theme` to portal containers via MutationObserver (#106)
- Global `prefers-reduced-motion` safety net in `accessibility.css` (#104)
- Button phosphor warmup/energize keyframes extended to all variants (#103)
- Modal close animation with `animationend`-driven exit transition (#100)
- Token validation script `scripts/validate-tokens.cjs` (#97)
- Component origin metadata registry with `getComponentsByOrigin`/`getComponentsByConsumer` (#91)
- TokenPlayground Storybook story with Leva controls (#84)
- MDX documentation for all 18 components (#96, #98)
- Tier 1 CSS animation polish across 8 components (#85)
- Solution docs: portal theme propagation, icon token fix, agent-native architecture

### Changed
- Storybook upgraded to v10.2.7 (#86)
- Button font size and weight increased for readability (#105)
- RetroEffects CRT animation values aligned with design-craft spec (#99)
- Storybook theme now driven by token pipeline, not hand-written overrides (#93)

### Fixed
- Modal portal now inherits `data-theme` from ancestor scope (#106, DMNC-364)
- Icon component: replaced non-existent `--color-system-*` tokens with semantic tokens (#87)
- Reduced-motion gaps patched across 4 components (#88)
- Alert: removed placeholder defaults for title and children (#82)
- Progress: DOS-style bar with visible track and shadow depth (#79)
- TokenPlayground Leva onChange wiring (#94, #95)
- ESLint setup and lint errors resolved (#89)

## [0.5.1] - 2026-02-01

### Added
- Progress: `fullWidth` prop to fill container width

### Fixed
- Alert: removed placeholder defaults for title and children

## [0.5.0] - 2026-01-31

### Added
- RetroEffects: Phosphor bloom effect (opt-in via `bloom` prop)
- RetroEffects: Power on/off animations with `powered` prop
- New design tokens: `--duration-power-off`, `--duration-power-on`, `--effects-phosphor-glow`, `--effects-crt-background`

### Changed
- RetroEffects: Flicker animation now WCAG 2.3.1 compliant (2Hz, under 3Hz threshold)
- RetroEffects: Added `will-change` hints for GPU compositing performance

### Fixed
- Badge text vertical alignment for pixel fonts (1px nudge)
- Version constant now matches package.json

## [0.4.2] - 2026-01-28

### Fixed
- Button: Secondary variant label now visible in pressed state

## [0.4.1] - 2026-01-25

### Fixed
- Documentation: Corrected component counts

## [0.4.0] - 2026-01-20

### Added
- Modal component for dialogs and overlays
- Stat component for displaying metrics
- Figma Make compatibility guidelines

### Changed
- Storybook docs rebuilt with latest component updates

## [0.3.0] - 2025-01-03

### Added
- Badge component with variant support
- Breadcrumb component for navigation
- RetroEffects component (scanlines, noise, CRT effects)
- Switch component for toggle states
- Tabs component for tabbed interfaces
- TimelineNode component (extracted from lifelines)
- Storybook accessibility addon integration
- Custom domain: storybook.eidotter.com
- JetBrains Mono as primary font

### Changed
- Token pipeline upgraded to DTCG format
- Amber theme unified to single color value
- Improved inactive tab contrast for WCAG AA compliance

### Fixed
- Tabs ARIA attributes (removed invalid aria-controls)
- Tabs color contrast for WCAG AA (4.5:1 minimum)
- Checkbox onChange when disabled
- Alert semantic tokens
- Component amber theme color consistency

## [0.2.1] - 2024-12-15

### Fixed
- Shadow transform in token pipeline
- Minor component styling issues

## [0.2.0] - 2024-02-03

### Added
- Proper type extraction from Figma components
- Component-specific variants, states, and types
- Improved Storybook documentation
- GitHub Actions workflow for CI/CD
- Issue templates for bug reports and feature requests
- Comprehensive contributing guidelines
- Detailed README with badges and examples

### Fixed
- TypeScript configuration for JSX compilation
- Story file generation with correct variants
- Component type definitions
- Media component variants and types

### Changed
- Updated package.json for better npm publishing
- Improved documentation structure
- Enhanced component organization

## [0.1.0] - 2024-02-02

### Added
- Initial release
- Basic component structure
- Figma integration
- Storybook setup
- Basic TypeScript support 