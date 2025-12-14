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

## Current Component Status (December 2025)

**Available**: Alert, Accordion, Button, Card, Checkbox, CommandPrompt, Icon, Input, Progress, Terminal

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