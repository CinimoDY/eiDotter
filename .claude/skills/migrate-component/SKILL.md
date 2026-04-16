---
name: migrate-component
description: Migrate an eidotter component to React Aria + Tailwind-first following the V.37 pattern established by Button (PR #200)
---

# Migrate Component to V.37

Migrate an eidotter component from BEM CSS to React Aria + Tailwind-first styling.

## Arguments

`/migrate-component <ComponentName>`

## Prerequisites

- React Aria deps installed (`react-aria-components`, `react-aria`, `react-stately`)
- `src/utils/cn.ts` exists (Tailwind class merge utility)
- Component audit completed: `plans/2026-04-04-001-feat-component-audit-v37.md`

## Workflow

### Step 1: Read existing implementation

Read these files for the component being migrated:
- `src/components/<Name>/components/<Name>.tsx` — current props and rendering
- `src/components/<Name>/components/<Name>.css` — **source of truth for interaction states**
- `src/components/<Name>/components/<Name>.test.tsx` — existing test coverage
- `src/components/<Name>/components/<Name>.stories.tsx` — existing stories

**Critical**: Extract the exact color/state matrix from the CSS. Each variant x state combination (rest, hover, active, focus, disabled, loading) must be preserved exactly.

### Step 2: Check V.37 Figma counterpart

Look up the component in the audit doc to understand:
- How many V.37 variants exist
- What new props/sizes/types V.37 adds
- Decision: adopt / merge / keep separate

If Figma Console MCP is connected, use `figma_execute` to inspect the V.37 component's variant properties.

### Step 3: Identify the right React Aria primitive

| Component | React Aria Primitive |
|-----------|---------------------|
| Button | `Button` |
| Checkbox | `Checkbox` |
| Switch | `Switch` |
| Tabs | `TabList`, `Tab`, `TabPanel` |
| Modal | `Dialog`, `Modal`, `ModalOverlay` |
| Input | `TextField`, `Input`, `Label` |
| Select | `Select`, `ListBox`, `Popover` |
| Badge | None (pure presentational) |
| Alert | None (pure presentational) |
| Tag | `Tag`, `TagGroup` |
| Nav | None (use semantic HTML) |

### Step 4: Rewrite the component

Follow the Button migration pattern:

```tsx
import { <AriaPrimitive> } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import '../../../styles/keyframes.css';
import './<Name>.css';

// Size classes map (include backward-compatible aliases)
const sizeClasses: Record<string, string> = { ... };

// Variant classes that hook into CSS phosphor effects
const variantClasses: Record<string, string> = {
  primary: 'eidotter-<name>--primary',
  ...
};

export const <Name>: React.FC<<Name>Props> = ({ ... }) => (
  <AriaPrimitive
    className={cn(
      'base tailwind classes',
      sizeClasses[size],
      variantClasses[variant],
      className,
    )}
    data-variant={variant}
    {...props}
  />
);
```

**Rules:**
- Use `cn()` for all class composition
- Prefix CSS variant classes as `eidotter-<name>--*`
- Add `data-variant` attribute
- Support backward-compatible prop aliases (small→sm, etc.)
- Write files via Python (`python3 -c "..."`) to avoid linter hook issues with the Write tool

### Step 5: Update the CSS file

Keep ONLY phosphor glow effects. Remove all layout/sizing (now in Tailwind):
- box-shadow transitions (multi-layer phosphor bloom)
- keyframe animations (phosphor-warmup, phosphor-energize, scanline-crawl)
- prefers-reduced-motion support
- prefers-contrast: high support

Use `eidotter-<name>--*` class selectors. Add `[data-hovered]` and `[data-pressed]` alongside `:hover` and `:active`.

### Step 6: Update tests

- Remove BEM class assertions (no more `button--primary`)
- Add assertions for new variant/size classes
- Test React Aria behavior (isDisabled, keyboard nav)
- Test backward-compatible aliases
- Test new V.37 variants/sizes

### Step 7: Update stories

- Add new variants to argTypes
- Add new size options
- Add gallery stories showing all variants
- Add phosphor states comparison story
- Update any inline style references

### Step 8: Update registry

Update `src/components/registry.ts`:
- Add new variants to the variants record
- Update changelog with migration entry

### Step 9: Verify

```bash
npx jest --testPathPatterns="<Name>"  # Tests pass
npm run build                         # Build passes
npx eslint src/components/<Name>/     # Lint passes
```

## Key Gotchas

- **Write files via Bash/Python**, not the Write tool — the ESLint PostToolUse hook can revert .tsx files
- **Read existing CSS first** — interaction states are intentional design decisions, not defaults
- **Tertiary text uses amber-dimmed (#CC9900)**, not darkGray — see memory feedback
- **fg-white and text-white map to black (#020003)** in amber-mono mode — text on colored backgrounds is dark
- **Secondary/ghost hover inverts** — bg goes amber, text goes black
