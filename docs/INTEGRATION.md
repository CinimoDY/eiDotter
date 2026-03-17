# eiDotter Integration Guide

How to integrate the eiDotter design system into your project. Covers React/Vite, Astro, Next.js, and iOS/tvOS (Swift).

---

## Installation

```bash
npm install eidotter
```

The package exports:

| Import Path | What You Get |
|-------------|-------------|
| `eidotter` | React components (ES module) |
| `eidotter/styles` | Component CSS (includes all component styles) |
| `eidotter/tokens.css` | Design tokens as CSS custom properties |
| `eidotter/tailwind.preset` | Tailwind CSS preset with eidotter theme |
| `eidotter/themes/amber-mono.css` | Amber monochrome theme (default) |
| `eidotter/themes/cga-amber.css` | Original 16-color CGA palette |
| `eidotter/themes/cga-mode4-p0.css` | 4-color: Green/Red/Yellow/Black |
| `eidotter/themes/cga-mode4-p1.css` | 4-color: Cyan/Magenta/White/Black |
| `eidotter/themes/cga-mode5.css` | 4-color: Cyan/Red/White/Black |

---

## React / Vite

### 1. Import styles

In your main CSS file (e.g., `src/index.css` or `src/app/globals.css`):

```css
/* Design tokens (CSS custom properties) */
@import "eidotter/tokens.css";

/* Component styles */
@import "eidotter/styles";

/* Theme (pick one) */
@import "eidotter/themes/amber-mono.css";
```

### 2. Activate the theme

Add the `data-theme` attribute to your root element:

```html
<html data-theme="amber-mono">
```

Or in your React entry point:

```tsx
// main.tsx
document.documentElement.setAttribute('data-theme', 'amber-mono');
```

### 3. Use components

```tsx
import { Button, Card, Alert, Badge } from 'eidotter';

function App() {
  return (
    <Card>
      <Alert type="info" title="Welcome">
        eiDotter is ready.
      </Alert>
      <Button variant="primary">Click me</Button>
      <Badge variant="success">Online</Badge>
    </Card>
  );
}
```

### 4. Use tokens in your own CSS

```css
.my-component {
  background: var(--color-cga-black);
  color: var(--color-cga-amber, #ffb000);
  border: 1px solid var(--color-cga-amber);
  font-family: var(--typography-font-family-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-sm);
}
```

---

## Tailwind CSS

### 1. Configure the preset

```js
// tailwind.config.js (or tailwind.config.mjs)
import eidotterPreset from 'eidotter/tailwind.preset';

export default {
  presets: [eidotterPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/eidotter/dist/**/*.js', // include eidotter components
  ],
};
```

Or CommonJS:

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/eidotter/dist/**/*.js',
  ],
};
```

### 2. Import CSS (still required)

The Tailwind preset adds utility classes but you still need the token CSS for the `var()` references to resolve:

```css
@import "eidotter/tokens.css";
@import "eidotter/themes/amber-mono.css";
```

### 3. Use Tailwind classes

```html
<div class="bg-dos-bg-primary text-cga-amber border border-dos-border-default rounded-dos-sm p-dos-4">
  <p class="font-dos text-dos-base">DOS-styled content</p>
</div>
```

**Color classes:**
- Primitives: `bg-cga-amber`, `text-cga-black`, `border-cga-brown`
- Semantic: `bg-dos-bg-primary`, `text-dos-text-accent`, `border-dos-border-focus`

**Typography:** `font-dos`, `text-dos-xs` through `text-dos-4xl`, `font-dos-bold`

**Spacing:** `p-dos-4`, `m-dos-2`, `gap-dos-3`

**Shadows:** `shadow-dos-drop`, `shadow-dos-glowMd`, `shadow-dos-glowSmRed`

See `docs/TOKENS.md` Section 8 for the complete class reference.

---

## Astro

### 1. Install and configure

```bash
npm install eidotter
```

In your Astro layout (e.g., `src/layouts/Layout.astro`):

```astro
---
import 'eidotter/tokens.css';
import 'eidotter/styles';
import 'eidotter/themes/amber-mono.css';
---

<html data-theme="amber-mono">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 2. Use components in `.astro` files

eiDotter components are React components. Use them inside `client:*` islands:

```astro
---
import { Button, Card } from 'eidotter';
---

<Card client:load>
  <Button client:load variant="primary">Click me</Button>
</Card>
```

### 3. Tailwind integration

Same as the Tailwind section above. Add the preset to your `tailwind.config.mjs` and import the CSS in your layout.

---

## Next.js

### 1. Import styles

In `app/globals.css` (App Router) or `styles/globals.css` (Pages Router):

```css
@import "eidotter/tokens.css";
@import "eidotter/styles";
@import "eidotter/themes/amber-mono.css";
```

### 2. Set the theme

In your root layout:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html data-theme="amber-mono">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Use components

Same as React — import from `eidotter` and use in your JSX.

**Note:** eiDotter components use client-side features (refs, effects). In App Router, use them inside `'use client'` components or add `client:load` directives.

---

## iOS / tvOS (Swift)

eiDotter provides design tokens as Swift constants for native Apple platforms. Used by the **Spacewar** tvOS project.

### 1. Add the file

Copy `src/styles/EiDotterTokens.swift` from the eidotter package into your Xcode project:

```bash
cp node_modules/eidotter/src/styles/EiDotterTokens.swift YourProject/Sources/
```

Or add it manually via Xcode: File > Add Files to "YourProject".

### 2. Use tokens

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, DOS")
            .foregroundColor(EiDotterColors.colorCgaAmber)
            .padding(EiDotterSpacing.sp4)
            .font(.system(size: EiDotterTypography.fontSizeBase, design: .monospaced))
    }
}
```

### Available enums

| Enum | Constants | Type |
|------|-----------|------|
| `EiDotterColors` | All CGA + semantic + alert + glow colors | `SwiftUI.Color` |
| `EiDotterSpacing` | `sp0` through `sp16` | `CGFloat` |
| `EiDotterTypography` | `fontSizeXs` through `fontSize4xl` | `CGFloat` |

### Limitations

- **Base tokens only.** The Swift file contains the amber-mono palette. Theme switching is not available in Swift — override colors manually if needed.
- **Manual sync required.** After running `npm run build-tokens`, re-copy the Swift file to your Xcode project.

---

## Theme Switching

### Single theme (most projects)

```css
@import "eidotter/themes/amber-mono.css";
```

```html
<html data-theme="amber-mono">
```

### Multiple themes

Import all themes you need, then switch the attribute:

```css
@import "eidotter/themes/amber-mono.css";
@import "eidotter/themes/cga-amber.css";
```

```tsx
function ThemeSwitcher() {
  const [theme, setTheme] = useState('amber-mono');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="amber-mono">Amber Mono</option>
      <option value="cga-amber">CGA 16-Color</option>
      <option value="cga-mode4-p1">CGA Mode 4</option>
    </select>
  );
}
```

### Scoped themes

Apply different themes to different sections:

```html
<div data-theme="amber-mono">
  <Card>Amber styled</Card>
</div>
<div data-theme="cga-mode4-p1">
  <Card>Cyan/magenta styled</Card>
</div>
```

---

## Common Pitfalls

### Missing theme attribute

**Symptom:** Text is brown (#b87c1a) instead of amber (#ffb000).

**Cause:** You imported `tokens.css` but didn't activate a theme. The `:root` tokens use a different palette than the themed values.

**Fix:** Add `data-theme="amber-mono"` to your `<html>` element and import the theme CSS.

### Importing styles in wrong order

**Symptom:** Theme overrides don't apply.

**Fix:** Import in this order:
1. `eidotter/tokens.css` (base tokens)
2. `eidotter/styles` (component CSS)
3. `eidotter/themes/amber-mono.css` (theme overrides)

### Tailwind preset without token CSS

**Symptom:** Tailwind classes like `bg-dos-bg-primary` produce no visible color.

**Cause:** Semantic Tailwind classes use `var()` references. Without `tokens.css` imported, the variables don't exist.

**Fix:** Always import `eidotter/tokens.css` alongside the Tailwind preset.

### Portal content loses theme

**Symptom:** Modals or tooltips rendered via `createPortal` have wrong colors.

**Cause:** `createPortal` moves DOM nodes outside the `[data-theme]` ancestor.

**Fix:** Use the `useThemePortal` hook from eidotter, which propagates the theme attribute to the portal container. See `docs/TOKENS.md` Section 7.

### Using text-secondary on dark backgrounds

**Symptom:** Text is invisible.

**Cause:** `--color-semantic-text-secondary` resolves to #020003 (near-black). It is designed for use on amber/accent backgrounds only.

**Fix:** Use `var(--color-cga-amber, #ffb000)` for text on dark backgrounds. See `docs/TOKENS.md` Section 7 for all gotchas.

---

## Minimal Example

The smallest possible eidotter integration:

```html
<!DOCTYPE html>
<html data-theme="amber-mono">
<head>
  <link rel="stylesheet" href="node_modules/eidotter/src/styles/tokens.css">
  <link rel="stylesheet" href="node_modules/eidotter/src/styles/theme.amber-mono.css">
</head>
<body style="background: var(--color-cga-black); color: var(--color-cga-amber); font-family: var(--typography-font-family-primary);">
  <h1>Hello, DOS</h1>
</body>
</html>
```

No build tools, no React, no Tailwind — just CSS custom properties.

---

## Further Reading

- `docs/TOKENS.md` — Complete token pipeline reference, all token values, gotchas
- `docs/DESIGN_PRINCIPLES.md` — DOS aesthetic paradigms and interface principles
- `CLAUDE.md` — Component patterns, anti-patterns, quick reference
- [Storybook](https://storybook.eidotter.com) — Interactive component demos
