---
title: V.37 component migration patterns — Tailwind, React Aria, UTI Pro icons
date: 2026-04-06
category: best-practices
module: Component Architecture
problem_type: best_practice
component: tooling
severity: medium
applies_when:
  - Migrating an existing eidotter component to match V.37 Figma design
  - Creating a new component that follows V.37 patterns
  - Upgrading icon usage from spritesheet to @untitledui-pro/icons
  - Adding Tailwind CSS processing to a library that uses utility classes
tags: [v37, migration, tailwind, react-aria, untitledui-icons, alert, notification, icon]
---

# V.37 component migration patterns — Tailwind, React Aria, UTI Pro icons

## Context

During the v0.16.1–v0.17.2 release cycle (April 5–6, 2026), several interconnected issues surfaced when migrating eidotter components to the V.37 Figma design system. The session revealed patterns for Tailwind CSS setup in libraries, React Aria integration in Astro, icon system migration, and V.37 component architecture.

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

### 3. Icon system: spritesheet → @untitledui-pro/icons

The custom SVG spritesheet (91 symbols via `<use href>`) caused icon clipping because the outer `<svg>` had no `viewBox`. When CSS resized icons, the 24×24 coordinate space was cropped rather than scaled.

The fix: replace with `@untitledui-pro/icons` (MIT, 4600+ icons, 4 styles). Key setup:

- `.npmrc`: `@untitledui-pro:registry=https://pkg.untitledui.com` (committed)
- Auth token in `~/.npmrc` locally, `UNTITLEDUI_PRO_TOKEN` GitHub secret in CI
- `tsconfig.json`: `moduleResolution: "bundler"`, `module: "preserve"` (required for subpath exports like `@untitledui-pro/icons/line`)
- Jest `moduleNameMapper`: `'^@untitledui-pro/icons/(.*)$': '<rootDir>/node_modules/@untitledui-pro/icons/dist/$1/index.js'`

### 4. Always update docs on release

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
import { NewIcon } from '@untitledui-pro/icons/line';

const ICON_MAP = {
  // ... existing icons
  'NewName': NewIcon,
};
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

- `docs/solutions/ui-bugs/icon-clipping-spritesheet-viewbox-2026-04-06.md` — the icon clipping bug
- PR #214: Tailwind CSS processing fix
- PR #220: Alert V.37 migration + Notification component
- PR #225: @untitledui/icons migration (free)
- PR #228: @untitledui-pro/icons upgrade
- DMNC-608: Component background audit (backlog)
