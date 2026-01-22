# Design Tokens

Complete reference for eidotter design tokens. Use CSS variables or Tailwind classes.

---

## Color System

eidotter uses an amber phosphor CRT palette. **Always use semantic tokens** for components.

### Semantic Colors (Primary Use)

Use these for all component styling:

#### Backgrounds

| Purpose | CSS Variable | Tailwind |
|---------|--------------|----------|
| Page background | `var(--color-semantic-background-primary)` | `bg-dos-bg-primary` |
| Surface/card background | `var(--color-semantic-background-secondary)` | `bg-dos-bg-secondary` |
| Accent background (buttons) | `var(--color-semantic-background-accent)` | `bg-dos-bg-accent` |

#### Text

| Purpose | CSS Variable | Tailwind |
|---------|--------------|----------|
| Body text | `var(--color-semantic-text-primary)` | `text-dos-text-primary` |
| Dark text (on accent bg) | `var(--color-semantic-text-secondary)` | `text-dos-text-secondary` |
| Highlighted text | `var(--color-semantic-text-accent)` | `text-dos-text-accent` |
| Disabled text | `var(--color-semantic-text-disabled)` | `text-dos-text-disabled` |

#### Borders

| Purpose | CSS Variable | Tailwind |
|---------|--------------|----------|
| Default border | `var(--color-semantic-border-default)` | `border-dos-border-default` |
| Focus border | `var(--color-semantic-border-focus)` | `border-dos-border-focus` |
| Hover border | `var(--color-semantic-border-hover)` | `border-dos-border-hover` |
| Disabled border | `var(--color-semantic-border-disabled)` | `border-dos-border-disabled` |

#### Status Colors

| Status | CSS Variable | Tailwind |
|--------|--------------|----------|
| Success | `var(--color-semantic-status-success)` | `text-dos-status-success` |
| Warning | `var(--color-semantic-status-warning)` | `text-dos-status-warning` |
| Error | `var(--color-semantic-status-error)` | `text-dos-status-error` |
| Info | `var(--color-semantic-status-info)` | `text-dos-status-info` |

#### Links

| State | CSS Variable | Tailwind |
|-------|--------------|----------|
| Default | `var(--color-semantic-link-default)` | `text-dos-link-default` |
| Hover | `var(--color-semantic-link-hover)` | `text-dos-link-hover` |
| Active | `var(--color-semantic-link-active)` | `text-dos-link-active` |
| Visited | `var(--color-semantic-link-visited)` | `text-dos-link-visited` |

### Raw CGA Colors (Advanced Use)

Use only when semantic tokens don't fit:

| Color | CSS Variable | Hex | Tailwind |
|-------|--------------|-----|----------|
| Black | `var(--color-cga-black)` | `#020003` | `bg-cga-black` |
| Dark Gray | `var(--color-cga-dark-gray)` | `#010103` | `bg-cga-darkGray` |
| Brown | `var(--color-cga-brown)` | `#5f340e` | `text-cga-brown` |
| Light Gray | `var(--color-cga-light-gray)` | `#b87c1a` | `text-cga-lightGray` |
| Yellow | `var(--color-cga-yellow)` | `#e5b936` | `text-cga-yellow` |
| White | `var(--color-cga-white)` | `#ba8225` | `text-cga-white` |
| Amber | `var(--color-cga-amber)` | `#ffb000` | `text-cga-amber` |
| Amber Bright | `var(--color-cga-amber-bright)` | `#fdca9f` | `text-cga-amberBright` |
| Amber Dim | `var(--color-cga-amber-dim)` | `#9a5700` | `text-cga-amberDim` |

### Alert Background Colors

Specialized backgrounds for Alert components:

| Alert Type | CSS Variable |
|------------|--------------|
| Info | `var(--color-semantic-alert-info)` |
| Success | `var(--color-semantic-alert-success)` |
| Warning | `var(--color-semantic-alert-warning)` |
| Error | `var(--color-semantic-alert-error)` |

---

## Typography

### Font Family

```css
font-family: var(--typography-font-family-primary);
/* JetBrains Mono, JetBrainsMono Nerd Font, Consolas, Monaco, monospace */
```

Tailwind: `font-dos`

### Font Sizes

| Size | CSS Variable | Value | Tailwind |
|------|--------------|-------|----------|
| XS | `var(--typography-font-size-xs)` | 12px | `text-xs` |
| SM | `var(--typography-font-size-sm)` | 14px | `text-sm` |
| Base | `var(--typography-font-size-base)` | 16px | `text-base` |
| LG | `var(--typography-font-size-lg)` | 18px | `text-lg` |
| XL | `var(--typography-font-size-xl)` | 20px | `text-xl` |
| 2XL | `var(--typography-font-size-2xl)` | 24px | `text-2xl` |
| 3XL | `var(--typography-font-size-3xl)` | 30px | `text-3xl` |
| 4XL | `var(--typography-font-size-4xl)` | 36px | `text-4xl` |

### Font Weights

| Weight | CSS Variable | Value |
|--------|--------------|-------|
| Regular | `var(--typography-font-weight-regular)` | 400 |
| Semibold | `var(--typography-font-weight-semibold)` | 600 |
| Bold | `var(--typography-font-weight-bold)` | 700 |

### Line Heights

| Height | CSS Variable | Value |
|--------|--------------|-------|
| Tight | `var(--typography-line-height-tight)` | 1.2 |
| Normal | `var(--typography-line-height-normal)` | 1.5 |
| Loose | `var(--typography-line-height-loose)` | 1.8 |

---

## Spacing

8px base grid system:

| Token | CSS Variable | Value | Tailwind |
|-------|--------------|-------|----------|
| 0 | `var(--spacing-0)` | 0px | `p-0`, `m-0` |
| 1 | `var(--spacing-1)` | 4px | `p-1`, `m-1` |
| 2 | `var(--spacing-2)` | 8px | `p-2`, `m-2` |
| 3 | `var(--spacing-3)` | 12px | `p-3`, `m-3` |
| 4 | `var(--spacing-4)` | 16px | `p-4`, `m-4` |
| 5 | `var(--spacing-5)` | 20px | `p-5`, `m-5` |
| 6 | `var(--spacing-6)` | 24px | `p-6`, `m-6` |
| 8 | `var(--spacing-8)` | 32px | `p-8`, `m-8` |
| 10 | `var(--spacing-10)` | 40px | `p-10`, `m-10` |
| 12 | `var(--spacing-12)` | 48px | `p-12`, `m-12` |
| 16 | `var(--spacing-16)` | 64px | `p-16`, `m-16` |

---

## Border Radius

DOS aesthetic uses minimal rounded corners:

| Token | CSS Variable | Value | Tailwind |
|-------|--------------|-------|----------|
| None | `var(--border-radius-none)` | 0px | `rounded-none` |
| SM | `var(--border-radius-sm)` | 2px | `rounded-dos-sm` |
| Base | `var(--border-radius-base)` | 4px | `rounded-dos-base` |

**Important:** Never use `rounded-lg`, `rounded-xl`, `rounded-full` - these break the DOS aesthetic.

---

## Border Width

| Token | CSS Variable | Value |
|-------|--------------|-------|
| Thin | `var(--border-width-thin)` | 1px |
| Medium | `var(--border-width-medium)` | 2px |
| Thick | `var(--border-width-thick)` | 4px |

---

## Shadows

### DOS Drop Shadow

```css
box-shadow: var(--shadow-drop);
/* 2px 2px 0px 0px #000000 */
```

Tailwind: `shadow-dos-drop`

### Phosphor Glow Effects

| Size | CSS Variable | Tailwind |
|------|--------------|----------|
| XS | `var(--shadow-glow-xs)` | `shadow-dos-glowXs` |
| SM | `var(--shadow-glow-sm)` | `shadow-dos-glowSm` |
| MD | `var(--shadow-glow-md)` | `shadow-dos-glowMd` |
| LG | `var(--shadow-glow-lg)` | `shadow-dos-glowLg` |

---

## Animation Durations

| Token | CSS Variable | Value |
|-------|--------------|-------|
| Instant | `var(--duration-instant)` | 0ms |
| Fast | `var(--duration-fast)` | 100ms |
| Normal | `var(--duration-normal)` | 200ms |
| Slow | `var(--duration-slow)` | 400ms |

---

## Opacity

| Token | CSS Variable | Value | Use Case |
|-------|--------------|-------|----------|
| 0 | `var(--opacity-0)` | 0 | Hidden |
| 10 | `var(--opacity-10)` | 0.1 | Subtle hover |
| 25 | `var(--opacity-25)` | 0.25 | Light overlay |
| 50 | `var(--opacity-50)` | 0.5 | Disabled, medium |
| 75 | `var(--opacity-75)` | 0.75 | Heavy overlay |
| 80 | `var(--opacity-80)` | 0.8 | Modal backdrop |
| 100 | `var(--opacity-100)` | 1 | Full opacity |

---

## Z-Index Scale

| Token | CSS Variable | Value | Use Case |
|-------|--------------|-------|----------|
| Base | `var(--z-index-base)` | 0 | Default |
| Dropdown | `var(--z-index-dropdown)` | 1000 | Dropdowns |
| Sticky | `var(--z-index-sticky)` | 1020 | Sticky headers |
| Fixed | `var(--z-index-fixed)` | 1030 | Fixed elements |
| Modal | `var(--z-index-modal)` | 1040 | Modals |
| Popover | `var(--z-index-popover)` | 1050 | Popovers |
| Tooltip | `var(--z-index-tooltip)` | 1060 | Tooltips |

---

## CRT Effects

For RetroEffects component:

| Effect | CSS Variable |
|--------|--------------|
| Overlay | `var(--effects-overlay)` |
| Scanline Light | `var(--effects-scanline-light)` |
| Scanline Dark | `var(--effects-scanline-dark)` |
| Vignette Glow | `var(--effects-vignette-glow)` |
| Vignette Edge | `var(--effects-vignette-edge)` |
| Vignette Corner | `var(--effects-vignette-corner)` |
| Screen Tint | `var(--effects-screen-tint)` |
| Drop Shadow | `var(--effects-drop-shadow)` |

---

## Focus Ring

For accessibility:

| Token | CSS Variable | Value |
|-------|--------------|-------|
| Width | `var(--focus-ring-width)` | 2px |
| Offset | `var(--focus-ring-offset)` | 2px |
| Color | `var(--focus-ring-color)` | Accent yellow |
