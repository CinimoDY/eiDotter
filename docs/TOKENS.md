# Eidotter Design Tokens Reference

This document provides a complete reference for eidotter's design tokens, helping you choose the correct token for any situation.

## Token Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SEMANTIC TOKENS                          │
│  (Use these in your code)                                   │
│  --color-semantic-background-primary                        │
│  --color-semantic-text-primary                              │
│  --color-semantic-border-default                            │
└─────────────────────┬───────────────────────────────────────┘
                      │ references
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRIMITIVE TOKENS                          │
│  (CGA palette - rarely use directly)                        │
│  --color-cga-black, --color-cga-amber, etc.                 │
└─────────────────────┬───────────────────────────────────────┘
                      │ resolves to
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    RAW VALUES                                │
│  (Never use in code)                                        │
│  #020003, #ffb000, #b87c1a                                  │
└─────────────────────────────────────────────────────────────┘
```

**Rule: Always use semantic tokens. Only use primitive tokens when semantic doesn't exist for your use case.**

---

## Color Tokens

### Backgrounds

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Page background | `var(--color-semantic-background-primary)` | `bg-dos-bg-primary` | #020003 |
| Card/surface background | `var(--color-semantic-background-secondary)` | `bg-dos-bg-secondary` | #010103 |
| Accent background (buttons) | `var(--color-semantic-background-accent)` | `bg-dos-bg-accent` | #ffb000 |

**Decision tree: Which background?**
```
Is it the main page background?
  → background-primary (dos-bg-primary)

Is it a card, panel, or elevated surface?
  → background-secondary (dos-bg-secondary)

Is it a primary button or accent element?
  → background-accent (dos-bg-accent)
```

### Text Colors

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Body text | `var(--color-semantic-text-primary)` | `text-dos-text-primary` | #b87c1a |
| Text on accent backgrounds | `var(--color-semantic-text-secondary)` | `text-dos-text-secondary` | #020003 |
| Highlighted/accent text | `var(--color-semantic-text-accent)` | `text-dos-text-accent` | #e5b936 |
| Disabled text | `var(--color-semantic-text-disabled)` | `text-dos-text-disabled` | #010103 |

**Decision tree: Which text color?**
```
Is it body text or general content?
  → text-primary (dos-text-primary)

Is it on an amber/accent background?
  → text-secondary (dos-text-secondary) - dark text on light bg

Is it a heading, label, or emphasis?
  → text-accent (dos-text-accent)

Is the element disabled?
  → text-disabled (dos-text-disabled)
```

### Border Colors

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Default borders | `var(--color-semantic-border-default)` | `border-dos-border-default` | #b87c1a |
| Focused element | `var(--color-semantic-border-focus)` | `border-dos-border-focus` | #e5b936 |
| Hovered element | `var(--color-semantic-border-hover)` | `border-dos-border-hover` | #ba8225 |
| Disabled element | `var(--color-semantic-border-disabled)` | `border-dos-border-disabled` | #010103 |

### Link Colors

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Default link | `var(--color-semantic-link-default)` | `text-dos-link` | #d4a030 |
| Hovered link | `var(--color-semantic-link-hover)` | `text-dos-link-hover` | #ba8225 |
| Active link | `var(--color-semantic-link-active)` | - | #552d0a |
| Visited link | `var(--color-semantic-link-visited)` | - | #713e0d |

### Status Colors

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Success | `var(--color-semantic-status-success)` | `text-dos-success` | #cb9529 |
| Warning | `var(--color-semantic-status-warning)` | `text-dos-warning` | #e5b936 |
| Error | `var(--color-semantic-status-error)` | `text-dos-error` | #dca934 |
| Info | `var(--color-semantic-status-info)` | `text-dos-info` | #d4a030 |

### Alert Backgrounds

| Purpose | CSS Variable | Tailwind Class | Value |
|---------|--------------|----------------|-------|
| Info alert bg | `var(--color-semantic-alert-info)` | `bg-dos-alert-info` | #351201 |
| Success alert bg | `var(--color-semantic-alert-success)` | `bg-dos-alert-success` | #0a2015 |
| Warning alert bg | `var(--color-semantic-alert-warning)` | `bg-dos-alert-warning` | #351201 |
| Error alert bg | `var(--color-semantic-alert-error)` | `bg-dos-alert-error` | #430000 |

### CGA Primitive Colors (Amber Monochrome Theme)

These are the raw CGA palette colors mapped to amber monochrome. **Prefer semantic tokens above.**

| Token | Tailwind | Value | Use Case |
|-------|----------|-------|----------|
| `--color-cga-black` | `cga-black` | #020003 | Darkest background |
| `--color-cga-dark-gray` | `cga-dark-gray` | #010103 | Near-black |
| `--color-cga-brown` | `cga-brown` | #5f340e | Muted text, labels |
| `--color-cga-light-gray` | `cga-light-gray` | #b87c1a | Primary text |
| `--color-cga-white` | `cga-white` | #ba8225 | Bright text |
| `--color-cga-yellow` | `cga-yellow` | #e5b936 | Accent |
| `--color-cga-amber` | `cga-amber` | #ffb000 | Brightest amber |
| `--color-cga-amber-bright` | `cga-amber-bright` | #fdca9f | Hover states |
| `--color-cga-amber-dim` | `cga-amber-dim` | #9a5700 | Subdued amber |
| `--color-cga-amber-glow` | `cga-amber-glow` | rgba(255,176,0,0.5) | Glow effects |

---

## Typography Tokens

### Font Family

| Purpose | CSS Variable | Tailwind Class |
|---------|--------------|----------------|
| Primary (monospace) | `var(--typography-font-family-primary)` | `font-dos` |
| Fallback | `var(--typography-font-family-fallback)` | `font-dos-fallback` |

**Always use monospace.** The DOS aesthetic requires monospace fonts.

### Font Sizes

| Size | CSS Variable | Tailwind Class | Value |
|------|--------------|----------------|-------|
| XS | `var(--typography-font-size-xs)` | `text-dos-xs` | 12px |
| SM | `var(--typography-font-size-sm)` | `text-dos-sm` | 14px |
| Base | `var(--typography-font-size-base)` | `text-dos-base` | 16px |
| LG | `var(--typography-font-size-lg)` | `text-dos-lg` | 18px |
| XL | `var(--typography-font-size-xl)` | `text-dos-xl` | 20px |
| 2XL | `var(--typography-font-size-2xl)` | `text-dos-2xl` | 24px |
| 3XL | `var(--typography-font-size-3xl)` | `text-dos-3xl` | 30px |
| 4XL | `var(--typography-font-size-4xl)` | `text-dos-4xl` | 36px |

### Font Weights

| Weight | CSS Variable | Tailwind Class | Value |
|--------|--------------|----------------|-------|
| Regular | `var(--typography-font-weight-regular)` | `font-dos-regular` | 400 |
| Semibold | `var(--typography-font-weight-semibold)` | `font-dos-semibold` | 600 |
| Bold | `var(--typography-font-weight-bold)` | `font-dos-bold` | 700 |

### Line Heights

| Height | CSS Variable | Tailwind Class | Value |
|--------|--------------|----------------|-------|
| Tight | `var(--typography-line-height-tight)` | `leading-dos-tight` | 1.2 |
| Normal | `var(--typography-line-height-normal)` | `leading-dos-normal` | 1.5 |
| Loose | `var(--typography-line-height-loose)` | `leading-dos-loose` | 1.8 |

---

## Spacing Tokens

Based on 4px increments:

| Size | CSS Variable | Tailwind Class | Value |
|------|--------------|----------------|-------|
| 0 | `var(--spacing-0)` | `p-dos-0`, `m-dos-0` | 0px |
| 1 | `var(--spacing-1)` | `p-dos-1`, `m-dos-1` | 4px |
| 2 | `var(--spacing-2)` | `p-dos-2`, `m-dos-2` | 8px |
| 3 | `var(--spacing-3)` | `p-dos-3`, `m-dos-3` | 12px |
| 4 | `var(--spacing-4)` | `p-dos-4`, `m-dos-4` | 16px |
| 5 | `var(--spacing-5)` | `p-dos-5`, `m-dos-5` | 20px |
| 6 | `var(--spacing-6)` | `p-dos-6`, `m-dos-6` | 24px |
| 8 | `var(--spacing-8)` | `p-dos-8`, `m-dos-8` | 32px |
| 10 | `var(--spacing-10)` | `p-dos-10`, `m-dos-10` | 40px |
| 12 | `var(--spacing-12)` | `p-dos-12`, `m-dos-12` | 48px |
| 16 | `var(--spacing-16)` | `p-dos-16`, `m-dos-16` | 64px |

---

## Border Tokens

### Border Radius

| Size | CSS Variable | Tailwind Class | Value |
|------|--------------|----------------|-------|
| None | `var(--border-radius-none)` | `rounded-dos-none` | 0px |
| Small | `var(--border-radius-sm)` | `rounded-dos-sm` | 2px |
| Base | `var(--border-radius-base)` | `rounded-dos-base` | 4px |

**DOS aesthetic uses minimal rounding.** Maximum border-radius is 4px. Never use `rounded-lg`, `rounded-xl`, or `rounded-full`.

### Border Width

| Size | CSS Variable | Value |
|------|--------------|-------|
| Thin | `var(--border-width-thin)` | 1px |
| Medium | `var(--border-width-medium)` | 2px |
| Thick | `var(--border-width-thick)` | 4px |

---

## Shadow Tokens

| Effect | CSS Variable | Tailwind Class | Value |
|--------|--------------|----------------|-------|
| None | `var(--shadow-none)` | `shadow-dos-none` | none |
| Drop | `var(--shadow-drop)` | `shadow-dos-drop` | 2px 2px 0px 0px #000 |
| Glow | `var(--shadow-glow)` | `shadow-dos-glow` | 0px 0px 8px 0px #FFB00080 |
| Glow SM | `var(--shadow-glow-sm)` | `shadow-dos-glowSm` | 0px 0px 10px 0px #FFB00080 |
| Glow MD | `var(--shadow-glow-md)` | `shadow-dos-glowMd` | 0px 0px 20px 0px #FFB00080 |
| Glow LG | `var(--shadow-glow-lg)` | `shadow-dos-glowLg` | 0px 0px 30px 0px #FFB00080 |

**Usage:**
- `shadow-drop`: DOS-style window shadow
- `shadow-glow*`: Phosphor CRT glow effect (hover states, emphasis)

---

## Animation Tokens

| Duration | CSS Variable | Value |
|----------|--------------|-------|
| Instant | `var(--duration-instant)` | 0ms |
| Fast | `var(--duration-fast)` | 100ms |
| Normal | `var(--duration-normal)` | 200ms |
| Slow | `var(--duration-slow)` | 400ms |

---

## DO / DON'T Examples

### Colors

```css
/* DO: Use semantic tokens */
.card {
  background: var(--color-semantic-background-secondary);
  color: var(--color-semantic-text-primary);
  border: var(--border-width-medium) solid var(--color-semantic-border-default);
}

/* DON'T: Hardcode hex values */
.card {
  background: #010103;
  color: #b87c1a;
  border: 2px solid #b87c1a;
}

/* DON'T: Use primitive tokens when semantic exists */
.card {
  background: var(--color-cga-dark-gray);
  color: var(--color-cga-light-gray);
}
```

### Tailwind

```tsx
/* DO: Use eidotter Tailwind classes */
<div className="bg-dos-bg-secondary text-dos-text-primary border-2 border-dos-border-default">

/* DON'T: Use arbitrary values */
<div className="bg-[#010103] text-[#b87c1a] border-[#b87c1a]">

/* DON'T: Use non-eidotter color classes */
<div className="bg-gray-900 text-amber-500 border-white/10">
```

### Border Radius

```css
/* DO: Minimal radius (DOS aesthetic) */
.button {
  border-radius: var(--border-radius-sm); /* 2px */
}

/* DON'T: Large radius */
.button {
  border-radius: 9999px; /* Pills are not DOS */
}
```

```tsx
/* DO */
<div className="rounded-dos-sm">

/* DON'T */
<div className="rounded-full rounded-2xl rounded-lg">
```

---

## Quick Reference Card

Copy this for fast lookups:

```
BACKGROUNDS
  Page:    bg-dos-bg-primary     var(--color-semantic-background-primary)
  Surface: bg-dos-bg-secondary   var(--color-semantic-background-secondary)
  Accent:  bg-dos-bg-accent      var(--color-semantic-background-accent)

TEXT
  Body:    text-dos-text-primary   var(--color-semantic-text-primary)
  Dark:    text-dos-text-secondary var(--color-semantic-text-secondary)
  Accent:  text-dos-text-accent    var(--color-semantic-text-accent)
  Muted:   text-cga-brown          var(--color-cga-brown)

BORDERS
  Default: border-dos-border-default var(--color-semantic-border-default)
  Focus:   border-dos-border-focus   var(--color-semantic-border-focus)

SHADOWS
  DOS:     shadow-dos-drop    var(--shadow-drop)
  Glow:    shadow-dos-glowMd  var(--shadow-glow-md)

FONTS
  Family:  font-dos           var(--typography-font-family-primary)

RADIUS
  Max:     rounded-dos-base   var(--border-radius-base) /* 4px max! */
```
