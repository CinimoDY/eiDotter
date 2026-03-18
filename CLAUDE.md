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

Components use this standard pattern (see Button.tsx):

```tsx
export interface ComponentProps {
  /** JSDoc description */
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const classes = ['component', `component--${variant}`].filter(Boolean).join(' ');
  return <div className={classes} {...props}>{children}</div>;
};
```

Requirements:
- TypeScript interfaces with JSDoc on each prop
- BEM class naming (`component`, `component--variant`, `component__element`)
- Spread remaining props for flexibility
- ARIA attributes for accessibility

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
| Timeline marker | `<TimelineNode>` |
| Multi-zoom timeline | `<TimelineContainer>` |
| Inline text expansion | `<InlineExpand>` |
| DOS text decode effect | `<TextScramble>` |
| CRT effects | `<RetroEffects>` |

## Documentation

- `llms.txt` - Machine-readable overview for AI agents
- `docs/DESIGN_PRINCIPLES.md` - DOS aesthetic paradigms and interface principles (the "why")
- `docs/CROSS_PLATFORM_VARIANTS.md` - Multi-platform token strategy (web, iOS, tvOS)
- `docs/TOKENS.md` - Token pipeline reference (the "what")
- `docs/INTEGRATION.md` - Framework integration patterns (the "how")

## Current Component Status (v0.10.0, March 2026)

**Components** (25): Accordion, Alert, Badge, Breadcrumb, Button, Card, Checkbox, CommandPrompt, FilterBar, Icon, InlineExpand, Input, Modal, Progress, RetroEffects, Stat, Switch, Tabs, Tag, Terminal, TextScramble, TimelineContainer, TimelineNode, Tokens

**Hooks**: `useTextScramble` (rAF text decode), `useAnimatedDismiss` (animate-then-unmount pattern)

**Shared Utilities**: `src/utils/prefersReducedMotion.ts`, `src/styles/keyframes.css` (phosphor-warmup, phosphor-energize)

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

Plans live in `docs/plans/` directory with naming convention:
- `feat-<feature-name>.md` - New features
- `fix-<issue-name>.md` - Bug fixes
- `refactor-<scope>.md` - Refactoring work

## Portfolio Context

This library is the foundation for several projects:
- **Rizomorf** - Portfolio showcase
- **Spacewar** - tvOS SpriteKit game (uses Swift tokens from `EiDotterTokens.swift`)
- **Pomodoke Calendar** - Time management
- **EatThisDie** - Health tracking (iOS)

Project paths vary by environment:
- **macOS**: `~/coding/` (e.g. `~/coding/rizomorf`)
- **WSL (Windows)**: `/mnt/d/Coding/` (e.g. `/mnt/d/Coding/riz/rizomorf`)

See the workspace-level `CLAUDE.md` for the full project portfolio.

## Quick Rules

- **text-secondary:** Only use `--color-semantic-text-secondary` / `text-dos-text-secondary` on amber/light backgrounds — it resolves to near-black (#020003)
- **Generated files:** `tokens.css`, `tokens.js`, `tokens.json`, `tailwind.preset.js`, `theme.*.css` are generated — edit JSON sources in `src/tokens/` instead
- **Linear project:** eiDotter issues go in project "eiDotter", team "dmnc"
- **Storybook viewports:** Custom DOS viewports configured in `.storybook/preview.ts` (phone320, phone375, tablet768, desktop1024, ultrawide)
- **Button sizes:** small=1.5rem, medium=2rem, large=2.5rem min-height (24/32/40px at 16px root) — none reach 44px WCAG touch target
- **Timeline layout:** Nodes sit ON the axis line via `margin-left: calc(-1 * var(--spacing-6))` in views.css. All built-in views use `size="medium" variant="default"`. TimelineNode markers are `content-box` (rendered = width + 4px border).
- **Timeline labels:** Always visible at all container widths — shrink to `font-size-xs` below 480px, never `display: none`
- **Best practice docs:** `docs/solutions/` are authoritative references — update them when changing the patterns they document
- **Branch protection:** `main` requires PRs — even version bumps need a branch + PR, can't push directly
- **Overflow containment:** Use `max-width: 100%; min-width: 0` on flex containers + `overflow-x: auto` on scrollable content areas
- **npm publish:** Requires `npm login` first — not pre-authenticated on this machine
- **Font-size tokens are rem:** All `--typography-font-size-*` tokens use rem (assumes 16px browser default). Hardcoded `font-size: Npx` in component CSS is an anti-pattern — use `var(--typography-font-size-*, fallback)` instead. Exception: Terminal (Perfect DOS VGA bitmap font stays px).
- **62.5% pattern incompatible:** eiDotter assumes `1rem = 16px`. Consumers using `html { font-size: 62.5% }` will see all text at 62.5% of intended size.
