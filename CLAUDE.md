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
npm run test -- Button.test.tsx     # Run single test file

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
Source files in `src/tokens/` (colors.json, base.json, semantic.json) → Style Dictionary → `src/styles/tokens.css`

**Do not edit `tokens.css` directly** — modify the JSON sources and rebuild.

### CGA Color Palette
The 16-color authentic CGA palette lives in `src/tokens/colors.json`. Use CSS variables:
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
| Dark text (on amber) | `var(--color-semantic-text-secondary)` | `text-dos-text-secondary` |
| Accent text | `var(--color-semantic-text-accent)` | `text-dos-text-accent` |
| Muted text | `var(--color-cga-brown)` | `text-cga-brown` |
| Border | `var(--color-semantic-border-default)` | `border-dos-border-default` |
| Focus border | `var(--color-semantic-border-focus)` | `border-dos-border-focus` |
| Phosphor glow | `var(--shadow-glow-md)` | `shadow-dos-glowMd` |
| DOS drop shadow | `var(--shadow-drop)` | `shadow-dos-drop` |

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
| CRT effects | `<RetroEffects>` |

## Documentation

- `llms.txt` - Machine-readable overview for AI agents
- `docs/TOKENS.md` - Complete token reference with decision trees
- `docs/INTEGRATION.md` - Framework setup guides (Next.js, Vite)

## Current Component Status (January 2026)

**Available**: Alert, Accordion, Button, Card, Checkbox, CommandPrompt, Icon, Input, Modal, Progress, Terminal

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

Plans live in `plans/` directory with naming convention:
- `feat-<feature-name>.md` - New features
- `fix-<issue-name>.md` - Bug fixes
- `refactor-<scope>.md` - Refactoring work

## Portfolio Context

This library is the foundation for several projects:
- **Rizomorf** (`/mnt/d/Coding/riz/rizomorf`) - Portfolio showcase
- **Pomodoke Calendar** (`/mnt/d/Coding/Pomodoke Calendar`) - Time management
- **EatThisDie** (`/mnt/d/Coding/eatthisidie`) - Health tracking (iOS)

See `/mnt/d/Coding/CLAUDE.md` for the full project portfolio.

## Quick Rules

<!-- Add rules here during development. Say "Add to CLAUDE.md: [rule]" to add. -->
<!-- Format: - **Topic:** Rule description -->