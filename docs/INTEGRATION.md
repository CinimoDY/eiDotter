# Eidotter Integration Guide

This guide explains how to integrate eidotter into your project correctly.

## Installation

```bash
npm install eidotter
# or
pnpm add eidotter
# or
yarn add eidotter
```

---

## Next.js (App Router) Setup

### 1. Configure globals.css

```css
/* app/globals.css */
@import "tailwindcss";
@import "eidotter/tokens.css";
@import "eidotter/styles";
@config "../tailwind.config.js";

/* Eidotter is dark-only - force dark color scheme */
:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--color-semantic-background-primary);
}

body {
  background: var(--color-semantic-background-primary);
  color: var(--color-semantic-text-primary);
  font-family: var(--typography-font-family-primary), var(--typography-font-family-fallback);
  font-size: var(--typography-font-size-base);
  line-height: var(--typography-line-height-normal);
  margin: 0;
  min-height: 100vh;
}

a {
  color: var(--color-semantic-link-default);
  text-decoration: none;
}

a:hover {
  color: var(--color-semantic-link-hover);
}
```

### 2. Configure Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset.cjs')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include eidotter components for proper purging
    './node_modules/eidotter/dist/**/*.js',
  ],
  theme: {
    extend: {
      // Your project-specific extensions here
    },
  },
}
```

### 3. Use Components

```tsx
// app/page.tsx
import { Button, Card, Badge } from 'eidotter';

export default function Page() {
  return (
    <Card>
      <h1 className="text-dos-text-accent">Welcome</h1>
      <p className="text-dos-text-primary">
        This is eidotter.
      </p>
      <Button variant="primary">Click me</Button>
      <Badge variant="accent">New</Badge>
    </Card>
  );
}
```

---

## Vite Setup

### 1. Configure main CSS

```css
/* src/index.css or src/main.css */
@import "eidotter/tokens.css";
@import "eidotter/styles";

:root {
  color-scheme: dark;
}

html {
  background: var(--color-semantic-background-primary);
}

body {
  background: var(--color-semantic-background-primary);
  color: var(--color-semantic-text-primary);
  font-family: var(--typography-font-family-primary), var(--typography-font-family-fallback);
  margin: 0;
  min-height: 100vh;
}
```

### 2. Configure Tailwind (if using)

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset.cjs')],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/eidotter/dist/**/*.js',
  ],
}
```

---

## CSS-Only Integration (No Tailwind)

If you're not using Tailwind, you can still use eidotter's CSS variables:

```css
/* Import tokens only */
@import "eidotter/tokens.css";
@import "eidotter/styles";

/* Use CSS variables directly */
.my-card {
  background: var(--color-semantic-background-secondary);
  color: var(--color-semantic-text-primary);
  border: var(--border-width-medium) solid var(--color-semantic-border-default);
  padding: var(--spacing-4);
}

.my-button {
  background: var(--color-semantic-background-accent);
  color: var(--color-semantic-text-secondary);
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  font-family: var(--typography-font-family-primary);
  cursor: pointer;
}

.my-button:hover {
  box-shadow: var(--shadow-glow-sm);
}
```

---

## Integration Checklist

Use this checklist when adding eidotter to a new project:

### Initial Setup
- [ ] `npm install eidotter`
- [ ] Import `eidotter/tokens.css` in your main CSS
- [ ] Import `eidotter/styles` in your main CSS
- [ ] Add `color-scheme: dark` to `:root`
- [ ] Set `html` and `body` backgrounds to `var(--color-semantic-background-primary)`
- [ ] Set body text color to `var(--color-semantic-text-primary)`
- [ ] Set body font-family to `var(--typography-font-family-primary)`

### Tailwind Setup (if applicable)
- [ ] Add `eidotter/tailwind.preset.cjs` to presets array
- [ ] Include `node_modules/eidotter/dist/**/*.js` in content array

### Code Quality
- [ ] Zero hardcoded hex colors
- [ ] All colors use `--color-semantic-*`, `--color-cga-*`, or Tailwind `dos-*`/`cga-*` classes
- [ ] Border radius never exceeds 4px
- [ ] Monospace font used throughout

---

## Common Mistakes

### 1. Using Light Theme

```css
/* WRONG: Light backgrounds */
body {
  background: #ffffff;
  color: #333333;
}

/* CORRECT: Dark amber theme */
body {
  background: var(--color-semantic-background-primary);
  color: var(--color-semantic-text-primary);
}
```

Eidotter is **dark-only**. There is no light mode.

### 2. Hardcoding Colors

```tsx
/* WRONG: Hardcoded hex */
<div className="bg-[#1a1a1a] text-[#ffb000]">

/* WRONG: Generic Tailwind colors */
<div className="bg-gray-900 text-amber-500 border-white/10">

/* CORRECT: Eidotter tokens */
<div className="bg-dos-bg-secondary text-cga-amber border-dos-border-default">
```

### 3. Using prefers-color-scheme

```css
/* WRONG: Conditional dark mode */
@media (prefers-color-scheme: dark) {
  body { background: black; }
}

/* CORRECT: Always dark */
:root {
  color-scheme: dark;
}
body {
  background: var(--color-semantic-background-primary);
}
```

### 4. Large Border Radius

```tsx
/* WRONG: Pills and large radius */
<button className="rounded-full">
<div className="rounded-2xl">
<span className="rounded-xl">

/* CORRECT: DOS-style minimal radius */
<button className="rounded-dos-sm">  {/* 2px */}
<div className="rounded-dos-base">   {/* 4px max */}
```

### 5. Sans-Serif Fonts

```css
/* WRONG: Sans-serif */
body {
  font-family: 'Inter', sans-serif;
}

/* CORRECT: Monospace */
body {
  font-family: var(--typography-font-family-primary);
}
```

### 6. Custom CSS Variables

```css
/* WRONG: Defining your own color variables */
:root {
  --background: #f9fafb;
  --foreground: #171717;
  --muted: #666666;
}

/* CORRECT: Use eidotter's existing tokens */
/* Just import eidotter/tokens.css and use those variables */
```

### 7. Opacity Modifiers on Eidotter Colors

```tsx
/* WRONG: Opacity on eidotter colors */
<div className="text-dos-text-primary/70">
<div className="border-white/10">

/* CORRECT: Use appropriate token or explicit rgba */
<div className="text-cga-brown">  {/* Use muted token */}
<div className="border-dos-border-default">
```

---

## Package Exports

Eidotter exports the following entry points:

```js
// Main components
import { Button, Card, Badge, ... } from 'eidotter';

// CSS tokens (import in your CSS)
// @import "eidotter/tokens.css";

// Component styles (import in your CSS)
// @import "eidotter/styles";

// Tailwind preset (use in tailwind.config.js)
// require('eidotter/tailwind.preset.cjs')
```

---

## Troubleshooting

### Components look wrong / wrong colors

1. Check that `eidotter/tokens.css` is imported
2. Check that `eidotter/styles` is imported
3. Verify `color-scheme: dark` is set on `:root`
4. Verify background is using `var(--color-semantic-background-primary)`

### Tailwind classes not working

1. Ensure `eidotter/tailwind.preset.cjs` is in your presets
2. Ensure `node_modules/eidotter/dist/**/*.js` is in your content array
3. Run `npx tailwindcss -o output.css` to check for errors

### Fonts not loading

1. JetBrains Mono is the default font
2. Install it or let the fallback (Consolas, Monaco, monospace) apply
3. Optional: Add Google Fonts link for JetBrains Mono

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## Token Quick Reference

See [TOKENS.md](./TOKENS.md) for the complete token reference.

**Most common tokens:**

| Purpose | CSS Variable | Tailwind |
|---------|--------------|----------|
| Page bg | `--color-semantic-background-primary` | `bg-dos-bg-primary` |
| Card bg | `--color-semantic-background-secondary` | `bg-dos-bg-secondary` |
| Text | `--color-semantic-text-primary` | `text-dos-text-primary` |
| Accent | `--color-semantic-text-accent` | `text-dos-text-accent` |
| Border | `--color-semantic-border-default` | `border-dos-border-default` |
| Glow | `--shadow-glow-md` | `shadow-dos-glowMd` |
