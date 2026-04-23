# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

### Known follow-ups
- Existing component CSS files still reference `--color-cga-brown` directly for muted text in a handful of places. A migration PR will swap those refs to `--color-semantic-text-muted` so the adoption is uniform across the library, not just exposed as a new token.

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