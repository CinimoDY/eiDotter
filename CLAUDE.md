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
| Muted text | `var(--color-cga-brown)` | `text-cga-brown` |
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
| Navigation tabs | `<Tabs>` |
| Status indicator | `<Badge>` |
| Text input | `<Input>` |
| Loading state | `<Progress>` |
| Collapsible section | `<Section>` (Accordion) |
| Navigation path | `<Breadcrumb>` |
| Site header | `<Header>` |
| Site footer | `<Footer>` |
| Timeline marker | `<TimelineNode>` |
| Multi-zoom timeline | `<TimelineContainer>` |
| Inline text expansion | `<InlineExpand>` |
| DOS text decode effect | `<TextScramble>` |
| CRT effects | `<RetroEffects>` |

## Documentation

- `llms.txt` — Machine-readable overview for AI agents
- `solutions/` — Documented solutions and best practices (searchable by YAML frontmatter: module, tags, problem_type)
- `plans/` — Implementation plans (naming: `YYYY-MM-DD-NNN-<type>-<name>-plan.md`)

**Note:** `docs/DESIGN_PRINCIPLES.md`, `docs/TOKENS.md`, `docs/INTEGRATION.md`, `docs/CROSS_PLATFORM_VARIANTS.md` are overwritten by Storybook builds. Their content lives in component stories and this CLAUDE.md instead.

## Figma Design System

**eiDotter DS V.37** — Forked from Untitled UI v8.0 PRO VARIABLES, restyled with CGA DOS aesthetic.
- 691 variables across 7 collections (primitives, color modes, radius, spacing, widths, containers, typography)
- Modes: amber-mono (default), cga-amber (full CGA palette)
- Connected via Figma Console MCP (Southleft) for programmatic access
- Figma file key: `V4tIz3sAMRx7H9wMYeesA6`
- MCP config: `.mcp.json` (untitledui + figma-console servers)

## External Dependencies: Untitled UI (reference only)

eiDotter uses Untitled UI as a **pattern reference**, not a dependency. **No UTI code is bundled or imported by eidotter at runtime or build time.**

- **No runtime dep:** `@untitledui-pro/icons` was removed in the pixelarticons swap. `vite.config.ts` externalizes any `@untitledui-pro/*` import as a defense-in-depth guardrail — any rogue import would fail the build loudly instead of silently bundling licensed assets.
- **Icons:** Backed by [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT) — authentic DOS pixel art matching eidotter's aesthetic. Wrapped in `src/components/Icon/components/Icon.tsx` (ICON_MAP with 12 public names mapping to 11 unique pixelarticons components — `Done` and `Check` share the same `Check` glyph).
- **Patterns:** V.37 component migration follows React Aria + Tailwind patterns inspired by UTI. eiDotter owns all component code — never import UTI React components.
- **Docs:** `docs/UNTITLEDUI_REACT.md` is a periodic snapshot kept as a migration-pattern reference. The MCP server (`untitledui` in `.mcp.json`) provides live reference access during development.
- **Figma:** UTI Figma library is set up with eiDotter's DOS tokens. eiDotter's Figma file is the source of truth for component design.
- **License rationale:** eidotter is published under CC-BY-NC-4.0. UTI Pro is a paid commercial license that does not permit sublicensing/redistribution. Bundling UTI Pro assets into `dist/eidotter.css` / `dist/index.es.js` would have been a license violation. Pixelarticons (MIT) avoids this entirely.

## Current Component Status (v0.19.1, April 2026)

**Components** (33): Accordion, Alert, Badge, Breadcrumb, Button, Card, ChatMessage, ChatHistory, ChatInput, ChatContainer, Checkbox, CommandPrompt, FilterBar, Footer, Header, Icon, InlineExpand, Input, Modal, Nav, Notification, Progress, RetroEffects, Separator, Stat, Switch, Tabs, Tag, Terminal, TextScramble, TimelineContainer, TimelineNode, Tokens

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

**Tailwind CSS build (v0.16.1):** Tailwind v3 processes component utility classes via `postcss.config.cjs` + `tailwind.config.cjs`. The compiled `dist/eidotter.css` includes all Tailwind utilities — consumers do NOT need Tailwind installed to use components. `tailwind.preset` (all tokens + React Aria state variants + animate plugin) is the canonical preset export. `tailwind.preset.enhanced` is a deprecated alias re-exporting the same preset with a one-time `console.warn` — kept for consumers migrating off #282's earlier split and scheduled for removal in v0.21.0.

**Icons (v0.18.0+):** Backed by [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT licensed, ~480 base icons, authentic DOS pixel art style). The `<Icon>` component exposes 12 public names mapping to 10 unique pixelarticons components + 1 custom component (`Done` and `Check` share the same glyph) via an internal ICON_MAP. Consumers use `<Icon name="Warning" size="S" />` unchanged. Available names: Info, Warning, Error, Done, Check, Close, Chevron Up, Chevron Down, App, Cancel, Fullscreen, Add. Note: **`Close` renders a custom pixel-art X mark** (pixelarticons v2 has no standalone X/close glyph, so a matching `PixelX` component is defined inline in Icon.tsx — added in v0.19.0). `Cancel` renders a minus glyph because it represents the Terminal window minimize control, not abort semantics. Earlier versions used `@untitledui-pro/icons` — removed for license reasons (UTI Pro is not sublicensable; bundling it into `dist` was a license violation). The old SVG spritesheet was removed in v0.18.0. MIT attribution for pixelarticons is included in `LICENSE.md` under "Third-Party Licenses".

**Header (PR #246):** Sticky site header composing branding link + Nav. Props: `brandName`, `brandHref`, `items`, `activeHref`, `variant` (retro/modern), `sticky`, `linkComponent`, `children` (custom branding), `className`. Uses `forwardRef`. Retro variant has amber phosphor glow on border-bottom.

**Font (PR #246):** Upgraded from Flexi IBM VGA False v1 to Flexi IBM VGA True v2 — aspect-corrected for 4:3 VGA, redrawn glyphs, extended character set. Typography tokens renamed from `xs/sm/base/lg` to `text-xs` through `display-2xl` to match Figma V.37.

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
- **Linear project:** eiDotter issues go in project "eiDotter", team "dmnc"
- **Storybook viewports:** Custom DOS viewports configured in `.storybook/preview.ts` (phone320, phone375, tablet768, desktop1024, ultrawide)
- **Button sizes (V.37):** xs=24px, sm=28px, md=32px, lg=40px, xl=44px min-height. Old aliases (small/medium/large) still work. Button/Badge/Tag/Stat/Checkbox text uses `text-dos-text-*` (18–26px) or `text-dos-display-*` (30–78px) utilities — never hardcoded `text-[Npx]`.
- **Font is single-weight:** Flexi IBM VGA True is a bitmap-style font with no bold variant. All `fontWeight` tokens (`regular`/`semibold`/`bold`) resolve to `400`. Emphasis is expressed via color, `uppercase` (on labels like Badge/Tag), or `text-decoration: underline` (in high-contrast `@media` blocks), never via `font-weight`. `fonts.css` declares the `@font-face` at weight 400 with `font-synthesis: none` to prevent browser faux-bold synthesis. The `font-dos-bold`/`font-dos-semibold`/`font-dos-regular` utility aliases remain in `tailwind.preset.cjs` (all mapped to `400`) for backward compatibility with consumer code.
- **Timeline layout:** Nodes sit ON the axis line via `margin-left: calc(-1 * var(--spacing-6))` in views.css. All built-in views use `size="medium" variant="default"`. TimelineNode markers are `content-box` (rendered = width + 4px border).
- **Timeline labels:** Always visible at all container widths — shrink to `font-size-xs` below 480px, never `display: none`
- **Best practice docs:** `solutions/` are authoritative references — update them when changing the patterns they document
- **Branch protection:** `main` requires PRs — even version bumps need a branch + PR, can't push directly
- **Overflow containment:** Use `max-width: 100%; min-width: 0` on flex containers + `overflow-x: auto` on scrollable content areas
- **npm publish:** Requires `npm login` first — not pre-authenticated on this machine
- **Font-size tokens are rem:** All `--typography-font-size-*` tokens use rem (assumes 16px browser default). Hardcoded `font-size: Npx` in component CSS is an anti-pattern — use `var(--typography-font-size-*, fallback)` instead.
- **62.5% pattern incompatible:** eiDotter assumes `1rem = 16px`. Consumers using `html { font-size: 62.5% }` will see all text at 62.5% of intended size.
- **Consumer CSS imports:** A single `import 'eidotter/styles'` provides everything (fonts, tokens, component CSS, Tailwind utilities). Tailwind is NOT required — utilities are pre-compiled in `dist/eidotter.css`. Granular imports (`eidotter/fonts.css`, `eidotter/tokens.css`) remain available for consumers who override fonts or tokens independently.
- **Update docs on release:** Always update README.md, CLAUDE.md, and guidelines/README.md when releasing versions or changing consumer setup.
