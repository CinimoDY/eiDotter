---
title: V.37 component migration patterns — Tailwind, React Aria, pixelarticons
date: 2026-04-06
updated: 2026-04-16
category: best-practices
module: Component Architecture
problem_type: best_practice
component: tooling
severity: medium
applies_when:
  - Migrating an existing eidotter component to match V.37 Figma design
  - Creating a new component that follows V.37 patterns
  - Adding React Aria primitives to interactive components
  - Upgrading icon usage from spritesheet to pixelarticons
  - Adding Tailwind CSS processing to a library that uses utility classes
tags: [v37, migration, tailwind, react-aria, pixelarticons, alert, notification, icon]
---

# V.37 component migration patterns — Tailwind, React Aria, pixelarticons

## Status

**Migration complete** as of v0.19.1 (April 2026). All 17 audited components migrated to Tailwind-first + React Aria across 5 waves (PRs #200–#206). 8 interactive components use React Aria primitives: Button, Checkbox, Switch, Tag, Input, Tabs, Modal, Notification.

## Context

During the v0.16.1–v0.19.1 release cycle (April 2026), several interconnected issues surfaced when migrating eidotter components to the V.37 Figma design system. The sessions revealed patterns for Tailwind CSS setup in libraries, React Aria integration, icon system migration, and V.37 component architecture.

## Guidance

### 1. Tailwind CSS must be installed and configured in the library itself

The V.37 migration (PRs #200–#206) added Tailwind utility classes to 18 components but never installed Tailwind. All classes were inert — no CSS was generated. The fix required:

- `tailwindcss@3`, `postcss`, `autoprefixer` as devDependencies
- `postcss.config.cjs` and `tailwind.config.cjs` using the existing preset
- `src/styles/tailwind.css` with `@tailwind base/components/utilities`
- Import in both Storybook preview and library entry point

The compiled `dist/eidotter.css` includes all Tailwind utilities — consumers do NOT need Tailwind installed.

### 2. V.37 Alert/Notification architecture

The V.37 Figma Alert uses a fundamentally different design from the pre-V.37 version:

- **Uniform dark background** for all color variants (no per-type colored backgrounds)
- **Featured icon with outline rings** — CSS `::before`/`::after` pseudo-elements with `border-radius: 50%` and varying opacity
- **`color` prop** replaces `type` — backward-compatible alias kept (`type="info"` → `color="default"`)
- **`actions` slot** for link-style buttons (Dismiss, Learn more)
- **Container-query responsive** layout (mobile-first vertical, horizontal at 480px+)
- **Supporting text** uses `cga-light-gray` (#b87c1a), NOT `amber-dim` (#9a5700) which is too dark

### 3. React Aria interactive component pattern

Interactive components use React Aria primitives for accessibility (keyboard, focus, ARIA). The pattern:

```tsx
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Component.css'; // phosphor glow effects only

export const Component = ({ variant = 'primary', size = 'md', ...props }) => (
  <AriaButton
    className={cn(
      'inline-flex items-center justify-center border-2 font-dos',
      sizeClasses[size],
      variantClasses[variant],
      props.className,
    )}
    {...props}
  />
);
```

- React Aria handles keyboard/press/focus/ARIA automatically
- CSS file contains only phosphor glow effects (box-shadow, keyframes)
- Variant CSS classes prefixed `eidotter-[component]--*` to avoid consumer collisions
- 8 components migrated: Button, Checkbox, Switch, Tag, Input (TextField), Tabs (TabList/Tab/TabPanel), Modal (ModalOverlay/Dialog), Notification (close button)

### 4. Icon system: spritesheet → pixelarticons

The custom SVG spritesheet was replaced with `pixelarticons` (MIT, ~480 icons, authentic DOS pixel art). UTI Pro icons were removed for license reasons (not sublicensable).

- `<Icon>` component wraps pixelarticons via ICON_MAP (12 public names → 10 unique components + 1 custom)
- `Close` renders a custom pixel-art X mark (no standalone close glyph in pixelarticons v2)
- `Cancel` renders minus (Terminal minimize control, not abort semantics)

### 5. Always update docs on release

README, CLAUDE.md, and guidelines/README.md fell out of sync during earlier migrations — wrong import paths, stale versions, missing setup steps. Established rule: update all three on every release.

## Why This Matters

- Tailwind classes without processing are invisible bugs — components look broken but no errors are thrown
- Icon clipping from missing viewBox is subtle and hard to diagnose (looks like overflow/layout issue)
- The `moduleResolution: "bundler"` requirement for subpath exports catches many teams off guard — Jest and tsc both need it
- Supporting text color choice (`light-gray` vs `amber-dim`) significantly affects readability on dark backgrounds

## When to Apply

- Creating any new eidotter component
- Migrating a component to match V.37 Figma design
- Adding new icons to the icon map
- Setting up a new consumer project that uses eidotter
- Releasing a new version of eidotter

## Examples

### Adding a new icon to the map

```tsx
// src/components/Icon/components/Icon.tsx
import { NewIcon } from '@nickvdm/pixelarticons';

const ICON_MAP = {
  // ... existing icons
  'NewName': NewIcon,
} as const;
```

### V.37 component structure (Alert pattern)

```tsx
<div className={cn(
  'relative w-full flex flex-col gap-4 p-4',
  'font-dos text-dos-sm',
  'bg-dos-bg-primary border border-dos-border-default rounded-dos-base',
  'eidotter-component',
  `eidotter-component--${variant}`,
  className,
)} role="alert">
  <div className="eidotter-component__icon">  {/* 40x40 with ring pseudo-elements */}
    <Icon name="Info" size="S" />
  </div>
  <div className="flex-1 flex flex-col gap-3 min-w-0">
    {/* title + content + actions */}
  </div>
</div>
```

## Related

- `solutions/ui-bugs/icon-clipping-spritesheet-viewbox-2026-04-06.md` — the icon clipping bug
- PR #200: Wave 1 — Button, Badge, Alert, Checkbox, Switch, Tag (React Aria + Tailwind)
- PR #201: Wave 2 — Separator, Stat, Breadcrumb, Progress (Tailwind + cn())
- PR #202: Wave 3 — Accordion, Footer, Tabs, FilterBar (Tailwind + cn())
- PR #203: Wave 4 — Input, Modal, Nav (Tailwind + cn())
- PR #206: Wave 5 — Input → React Aria TextField, Tabs → React Aria TabList, Modal → React Aria Dialog
- PR #214: Tailwind CSS processing fix
- PR #220: Alert V.37 migration + Notification component
- PR #257: UTI runtime removal + pixelarticons migration
