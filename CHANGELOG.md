# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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