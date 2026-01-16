# Eidotter Design Tokens

Complete reference for the eidotter design system tokens.

## Quick Reference

### When to Use What

| Need | CSS Variable | Tailwind |
|------|--------------|----------|
| Page background | `var(--color-semantic-background-primary)` | `bg-dos-bg-primary` |
| Card/surface | `var(--color-semantic-background-secondary)` | `bg-dos-bg-secondary` |
| Button/accent bg | `var(--color-semantic-background-accent)` | `bg-dos-bg-accent` |
| Body text | `var(--color-semantic-text-primary)` | `text-dos-text-primary` |
| Headings/emphasis | `var(--color-semantic-text-accent)` | `text-dos-text-accent` |
| Dark text (on amber) | `var(--color-semantic-text-secondary)` | `text-dos-text-secondary` |
| Muted text | `var(--color-cga-brown)` | `text-cga-brown` |
| Default border | `var(--color-semantic-border-default)` | `border-dos-border-default` |
| Focus border | `var(--color-semantic-border-focus)` | `border-dos-border-focus` |
| Phosphor glow | `var(--shadow-glow-md)` | `shadow-dos-glowMd` |
| DOS drop shadow | `var(--shadow-drop)` | `shadow-dos-drop` |

---

## Color Tokens

### Semantic Colors (USE THESE)

Semantic tokens are theme-aware and should be your default choice.

#### Backgrounds
```css
--color-semantic-background-primary    /* Main page background (#020003) */
--color-semantic-background-secondary  /* Surfaces, cards (#010103) */
--color-semantic-background-accent     /* Buttons, highlights (#ffb000) */
```

#### Text
```css
--color-semantic-text-primary    /* Body text (#b87c1a) */
--color-semantic-text-secondary  /* Text on accent bg (#020003) */
--color-semantic-text-accent     /* Headings, emphasis (#e5b936) */
--color-semantic-text-disabled   /* Disabled state (#010103) */
```

#### Borders
```css
--color-semantic-border-default   /* Standard borders (#b87c1a) */
--color-semantic-border-focus     /* Focus rings (#e5b936) */
--color-semantic-border-hover     /* Hover state (#ba8225) */
--color-semantic-border-disabled  /* Disabled state (#010103) */
```

#### Links
```css
--color-semantic-link-default  /* Unvisited links (#d4a030) */
--color-semantic-link-hover    /* Hover state (#ba8225) */
--color-semantic-link-active   /* Active/pressed (#552d0a) */
--color-semantic-link-visited  /* Visited links (#713e0d) */
```

#### Status
```css
--color-semantic-status-success  /* Success states (#cb9529) */
--color-semantic-status-warning  /* Warnings (#e5b936) */
--color-semantic-status-error    /* Errors (#dca934) */
--color-semantic-status-info     /* Info (#d4a030) */
```

#### Alert Backgrounds
```css
--color-semantic-alert-info     /* Info alert bg (#351201) */
--color-semantic-alert-success  /* Success alert bg (#0a2015) */
--color-semantic-alert-warning  /* Warning alert bg (#351201) */
--color-semantic-alert-error    /* Error alert bg (#430000) */
```

### Primitive Colors (CGA Palette)

Raw CGA colors. Use semantic tokens when possible.

```css
/* Base 16 CGA colors (amber-mapped) */
--color-cga-black          /* #020003 */
--color-cga-blue           /* #2c1203 */
--color-cga-green          /* #411f06 */
--color-cga-cyan           /* #552d0a */
--color-cga-red            /* #65360c */
--color-cga-magenta        /* #713e0d */
--color-cga-brown          /* #5f340e - great for muted text */
--color-cga-light-gray     /* #b87c1a */
--color-cga-dark-gray      /* #010103 */
--color-cga-bright-blue    /* #c38a23 */
--color-cga-bright-green   /* #cb9529 */
--color-cga-bright-cyan    /* #d4a030 */
--color-cga-bright-red     /* #dca934 */
--color-cga-bright-magenta /* #ddb030 */
--color-cga-yellow         /* #e5b936 */
--color-cga-white          /* #ba8225 */

/* Amber phosphor extensions */
--color-cga-amber          /* #ffb000 - brightest amber */
--color-cga-amber-bright   /* #fdca9f - highlight */
--color-cga-amber-dim      /* #9a5700 - dimmed */
--color-cga-amber-glow     /* rgba(255, 176, 0, 0.5) - for shadows */
```

---

## Typography Tokens

### Font Family
```css
--typography-font-family-primary   /* JetBrains Mono + fallbacks */
--typography-font-family-fallback  /* Consolas, Monaco, Courier New */
```

### Font Sizes
```css
--typography-font-size-xs   /* 12px */
--typography-font-size-sm   /* 14px */
--typography-font-size-base /* 16px */
--typography-font-size-lg   /* 18px */
--typography-font-size-xl   /* 20px */
--typography-font-size-2xl  /* 24px */
--typography-font-size-3xl  /* 30px */
--typography-font-size-4xl  /* 36px */
```

### Font Weights
```css
--typography-font-weight-regular  /* 400 */
--typography-font-weight-semibold /* 600 */
--typography-font-weight-bold     /* 700 */
```

### Line Heights
```css
--typography-line-height-tight  /* 1.2 */
--typography-line-height-normal /* 1.5 */
--typography-line-height-loose  /* 1.8 */
```

---

## Spacing Tokens

8px base grid system.

```css
--spacing-0   /* 0px */
--spacing-1   /* 4px */
--spacing-2   /* 8px */
--spacing-3   /* 12px */
--spacing-4   /* 16px */
--spacing-5   /* 20px */
--spacing-6   /* 24px */
--spacing-8   /* 32px */
--spacing-10  /* 40px */
--spacing-12  /* 48px */
--spacing-16  /* 64px */
```

---

## Border Tokens

### Border Radius
```css
--border-radius-none  /* 0px */
--border-radius-sm    /* 2px - preferred */
--border-radius-base  /* 4px - maximum for DOS aesthetic */
```

### Border Width
```css
--border-width-thin   /* 1px */
--border-width-medium /* 2px */
--border-width-thick  /* 4px */
```

---

## Shadow Tokens

```css
--shadow-none     /* none */
--shadow-drop     /* 2px 2px 0px 0px #000000 - DOS window style */
--shadow-glow     /* 0px 0px 8px 0px rgba(255,176,0,0.5) */
--shadow-glow-sm  /* 0px 0px 10px 0px rgba(255,176,0,0.5) - button hover */
--shadow-glow-md  /* 0px 0px 20px 0px rgba(255,176,0,0.5) - cards */
--shadow-glow-lg  /* 0px 0px 30px 0px rgba(255,176,0,0.5) - emphasis */
```

---

## Animation Tokens

```css
--duration-instant /* 0ms */
--duration-fast    /* 100ms */
--duration-normal  /* 200ms */
--duration-slow    /* 400ms */
```

---

## Tailwind Usage

### Setup
```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/eidotter/dist/**/*.{js,mjs}',
  ],
}
```

### Class Examples
```html
<!-- Backgrounds -->
<div class="bg-dos-bg-primary">Page background</div>
<div class="bg-dos-bg-secondary">Card surface</div>
<div class="bg-dos-bg-accent">Button</div>

<!-- Text -->
<p class="text-dos-text-primary">Body text</p>
<h1 class="text-dos-text-accent">Heading</h1>
<span class="text-cga-brown">Muted</span>

<!-- Borders -->
<div class="border border-dos-border-default">Default</div>
<div class="border-2 border-dos-border-focus">Focused</div>

<!-- Shadows -->
<div class="shadow-dos-drop">DOS window</div>
<div class="shadow-dos-glowMd">Phosphor glow</div>

<!-- Typography -->
<p class="font-dos text-dos-base">Standard text</p>

<!-- Spacing -->
<div class="p-dos-4 m-dos-2">Padded element</div>

<!-- Border radius (keep minimal!) -->
<div class="rounded-dos-sm">Slight rounding (2px)</div>
```

---

## Anti-Patterns

### Never Do
```css
/* NEVER hardcode colors */
color: #FFB000;
background: #1a1a1a;

/* NEVER use light backgrounds */
background: white;
background: #f5f5f5;

/* NEVER use large border radius */
border-radius: 8px;
border-radius: 9999px;

/* NEVER use sans-serif fonts */
font-family: Arial, sans-serif;
```

```jsx
/* NEVER use Tailwind arbitrary values for colors */
<div className="bg-[#020003]">

/* NEVER use non-eidotter Tailwind colors */
<div className="bg-gray-900 text-amber-500">
```

### Always Do
```css
/* ALWAYS use tokens */
color: var(--color-semantic-text-accent);
background: var(--color-semantic-background-primary);

/* ALWAYS use system font stack */
font-family: var(--typography-font-family-primary);

/* ALWAYS keep corners sharp or minimal */
border-radius: var(--border-radius-sm);
```

---

## Theming

Eidotter supports multiple themes via CSS selectors:

```css
/* Default (amber monochrome) - no selector needed */

/* CGA Amber theme */
[data-theme="cga-amber"] { /* overrides */ }

/* CGA Mode 4 Palette 0 (green/red/yellow) */
[data-theme="cga-mode4-p0"] { /* overrides */ }

/* CGA Mode 4 Palette 1 (cyan/magenta/white) */
[data-theme="cga-mode4-p1"] { /* overrides */ }

/* CGA Mode 5 (cyan/red/white) */
[data-theme="cga-mode5"] { /* overrides */ }
```

To apply a theme:
```html
<html data-theme="cga-mode4-p1">
```

---

## Token Sources

Tokens are defined in JSON and built with Style Dictionary:

```
src/tokens/
├── base.tokens.json           # Core tokens
├── theme.amber-mono.tokens.json
├── theme.cga-amber.tokens.json
├── theme.cga-mode4-p0.tokens.json
├── theme.cga-mode4-p1.tokens.json
└── theme.cga-mode5.tokens.json
```

To rebuild after editing:
```bash
npm run build-tokens
```

Outputs:
- `src/styles/tokens.css` - CSS custom properties
- `tailwind.preset.cjs` - Tailwind preset
- `src/styles/tokens.js` - ES6 module
- `src/styles/tokens.json` - JSON format
