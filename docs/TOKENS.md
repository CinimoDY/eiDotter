# eiDotter Design Token Reference

Token pipeline reference for the eiDotter design system. Audience: human developers and AI agents.

---

## 1. Pipeline Overview

```
Source JSON (DTCG format)
    |
    v
Style Dictionary v5.3.3 (node style-dictionary.config.mjs)
    |
    +---> tokens.css         CSS custom properties on :root
    +---> tokens.js          ES6 named exports, resolved hex
    +---> tokens.json        Nested JSON, resolved hex
    +---> EiDotterTokens.swift   SwiftUI Color/CGFloat constants
    +---> theme.*.css        Per-theme overrides via [data-theme="..."]
    +---> tailwind.preset.js CommonJS preset (root-level)
```

Build command:

```bash
npm run build-tokens       # runs node style-dictionary.config.mjs
npm run validate-tokens    # validates source tokens against generated CSS
```

**Do not edit generated files directly.** Modify the JSON sources in `src/tokens/` and rebuild.

The pipeline uses `outputReferences: true`, which is the linchpin of theme switching. Semantic tokens output as `var()` references (e.g., `--color-semantic-text-primary: var(--color-cga-light-gray)`) instead of resolved hex values. Themes override the primitive variables, and semantic tokens cascade automatically.

---

## 2. Source Files

| File | Purpose |
|------|---------|
| `src/tokens/base.tokens.json` | Primitive CGA palette, spacing, typography, shadows |
| `src/tokens/theme.amber-mono.tokens.json` | P3 phosphor amber terminal (default theme) |
| `src/tokens/theme.cga-amber.tokens.json` | Original 16-color CGA with amber accents |
| `src/tokens/theme.cga-mode4-p0.tokens.json` | 4-color Green/Red/Yellow/Black |
| `src/tokens/theme.cga-mode4-p1.tokens.json` | 4-color Cyan/Magenta/White/Black |
| `src/tokens/theme.cga-mode5.tokens.json` | 4-color Cyan/Red/White/Black |

All source files use the W3C Design Token Community Group (DTCG) format with `$value` and `$type` keys.

---

## 3. Generated Outputs

| Output | Path | Format | Use case |
|--------|------|--------|----------|
| CSS variables | `src/styles/tokens.css` | `:root { --token: value }` | Web components, CSS |
| ES6 module | `src/styles/tokens.js` | `export const colorCgaAmber = "#ffb000"` | JS logic, runtime checks |
| JSON | `src/styles/tokens.json` | Nested object, resolved hex | Tooling, external consumers |
| Swift | `src/styles/EiDotterTokens.swift` | `static let` constants | iOS/tvOS (Spacewar, EatThisDie) |
| Theme CSS | `src/styles/theme.amber-mono.css` | `[data-theme="amber-mono"] { ... }` | Theme switching |
| Theme CSS | `src/styles/theme.cga-amber.css` | `[data-theme="cga-amber"] { ... }` | Theme switching |
| Theme CSS | `src/styles/theme.cga-mode4-p0.css` | `[data-theme="cga-mode4-p0"] { ... }` | Theme switching |
| Theme CSS | `src/styles/theme.cga-mode4-p1.css` | `[data-theme="cga-mode4-p1"] { ... }` | Theme switching |
| Theme CSS | `src/styles/theme.cga-mode5.css` | `[data-theme="cga-mode5"] { ... }` | Theme switching |
| Tailwind preset | `tailwind.preset.js` (root) | CommonJS module | Tailwind utility classes |

---

## 4. CGA Color Palette

The 16 canonical CGA colors plus amber-specific extensions. These are primitives -- use semantic tokens for component styling.

### Primitive Colors

| Token | CSS Variable | Hex | Description |
|-------|-------------|-----|-------------|
| black | `--color-cga-black` | `#020003` | Near-black background |
| blue | `--color-cga-blue` | `#2c1203` | Dark warm brown |
| green | `--color-cga-green` | `#411f06` | Medium warm brown |
| cyan | `--color-cga-cyan` | `#552d0a` | Tan-brown |
| red | `--color-cga-red` | `#65360c` | Warm brown |
| magenta | `--color-cga-magenta` | `#713e0d` | Amber-brown |
| brown | `--color-cga-brown` | `#5f340e` | Muted brown (used for muted text) |
| light-gray | `--color-cga-light-gray` | `#b87c1a` | Brown-gold |
| dark-gray | `--color-cga-dark-gray` | `#010103` | Near-black |
| bright-blue | `--color-cga-bright-blue` | `#c38a23` | Warm gold |
| bright-green | `--color-cga-bright-green` | `#cb9529` | Medium gold |
| bright-cyan | `--color-cga-bright-cyan` | `#d4a030` | Gold |
| bright-red | `--color-cga-bright-red` | `#dca934` | Bright gold |
| bright-magenta | `--color-cga-bright-magenta` | `#ddb030` | Amber-gold |
| yellow | `--color-cga-yellow` | `#e5b936` | Bright amber-gold |
| white | `--color-cga-white` | `#ba8225` | Amber tone |

### Amber Extensions

| Token | CSS Variable | Hex / Value |
|-------|-------------|-------------|
| amber | `--color-cga-amber` | `#ffb000` |
| amber-bright | `--color-cga-amber-bright` | `#fdca9f` |
| amber-dim | `--color-cga-amber-dim` | `#9a5700` |
| amber-glow | `--color-cga-amber-glow` | `rgba(255, 176, 0, 0.5)` |

### Per-Color Glow Tokens

Six additional glow tokens for phosphor effects on non-amber elements:

| CSS Variable | Purpose |
|-------------|---------|
| `--color-cga-red-glow` | Red phosphor glow |
| `--color-cga-green-glow` | Green phosphor glow |
| `--color-cga-cyan-glow` | Cyan phosphor glow |
| `--color-cga-magenta-glow` | Magenta phosphor glow |
| `--color-cga-blue-glow` | Blue phosphor glow |
| `--color-cga-white-glow` | White phosphor glow |

### CSS Usage

```css
.panel {
  background: var(--color-cga-black);
  color: var(--color-cga-amber);
  border: 1px solid var(--color-cga-light-gray);
}
```

**Only valid namespaces are `--color-cga-*` and `--color-semantic-*`.** There is no `--color-dos-*` or `--color-theme-*`.

---

## 5. Semantic Token Map

Semantic tokens reference primitives via `var()`. Use these for all component styling.

### Backgrounds

| CSS Variable | Resolves to | Hex | Tailwind |
|-------------|-------------|-----|----------|
| `--color-semantic-background-primary` | `var(--color-cga-black)` | `#020003` | `bg-dos-bg-primary` |
| `--color-semantic-background-secondary` | `var(--color-cga-dark-gray)` | `#010103` | `bg-dos-bg-secondary` |
| `--color-semantic-background-accent` | `var(--color-cga-amber)` | `#ffb000` | `bg-dos-bg-accent` |

### Text

| CSS Variable | Resolves to | Hex | Tailwind | Notes |
|-------------|-------------|-----|----------|-------|
| `--color-semantic-text-primary` | `var(--color-cga-light-gray)` | `#b87c1a` | `text-dos-text-primary` | **Brown, NOT amber on :root** |
| `--color-semantic-text-secondary` | `var(--color-cga-black)` | `#020003` | `text-dos-text-secondary` | **Near-black! Only on amber backgrounds** |
| `--color-semantic-text-accent` | `var(--color-cga-yellow)` | `#e5b936` | `text-dos-text-accent` | |
| `--color-semantic-text-disabled` | `var(--color-cga-dark-gray)` | `#010103` | `text-dos-text-disabled` | |

### Borders

| CSS Variable | Resolves to | Hex | Tailwind |
|-------------|-------------|-----|----------|
| `--color-semantic-border-default` | `var(--color-cga-light-gray)` | `#b87c1a` | `border-dos-border-default` |
| `--color-semantic-border-focus` | `var(--color-cga-yellow)` | `#e5b936` | `border-dos-border-focus` |
| `--color-semantic-border-hover` | `var(--color-cga-white)` | `#ba8225` | `border-dos-border-hover` |
| `--color-semantic-border-disabled` | `var(--color-cga-dark-gray)` | `#010103` | `border-dos-border-disabled` |

### Links

| CSS Variable | Resolves to | Tailwind |
|-------------|-------------|----------|
| `--color-semantic-link-default` | `var(--color-cga-bright-cyan)` | `text-dos-link` |
| `--color-semantic-link-hover` | `var(--color-cga-white)` | `text-dos-link-hover` |
| `--color-semantic-link-active` | `var(--color-cga-cyan)` | |
| `--color-semantic-link-visited` | `var(--color-cga-magenta)` | |

### Status

| CSS Variable | Resolves to | Tailwind |
|-------------|-------------|----------|
| `--color-semantic-status-success` | `var(--color-cga-bright-green)` | `text-dos-success` |
| `--color-semantic-status-warning` | `var(--color-cga-yellow)` | `text-dos-warning` |
| `--color-semantic-status-error` | `var(--color-cga-bright-red)` | `text-dos-error` |
| `--color-semantic-status-info` | `var(--color-cga-bright-cyan)` | `text-dos-info` |

### Alert Backgrounds

These are hardcoded hex values (not var references) because they are dark-tinted versions without CGA primitive equivalents.

| CSS Variable | Hex | Tailwind |
|-------------|-----|----------|
| `--color-semantic-alert-info` | `#1a2535` | `bg-dos-alert-info` |
| `--color-semantic-alert-success` | `#0a2015` | `bg-dos-alert-success` |
| `--color-semantic-alert-warning` | `#352800` | `bg-dos-alert-warning` |
| `--color-semantic-alert-error` | `#430000` | `bg-dos-alert-error` |

---

## 6. Theme Cascade

### Available Themes

| Theme | Selector | Description |
|-------|----------|-------------|
| amber-mono | `[data-theme="amber-mono"]` | P3 phosphor amber terminal. All 16 CGA slots map to amber shades. **Default.** |
| cga-amber | `[data-theme="cga-amber"]` | Original 16-color CGA palette with amber accents |
| cga-mode4-p0 | `[data-theme="cga-mode4-p0"]` | 4-color: Green/Red/Yellow/Black (early PC games) |
| cga-mode4-p1 | `[data-theme="cga-mode4-p1"]` | 4-color: Cyan/Magenta/White/Black (Commander Keen era) |
| cga-mode5 | `[data-theme="cga-mode5"]` | 4-color: Cyan/Red/White/Black (composite monitor) |

### How It Works

1. `:root` in `tokens.css` defines all primitives and semantic tokens
2. Theme CSS files override primitive values on `[data-theme="..."]`
3. Because semantic tokens use `var()` references (via `outputReferences: true`), they cascade automatically

```html
<!-- Apply theme to entire app -->
<html data-theme="amber-mono">

<!-- Or scope to a subtree -->
<div data-theme="cga-mode4-p1">
  <Card>This card uses the mode4-p1 palette</Card>
</div>
```

### amber-mono Theme Overrides

Key differences from `:root` defaults:

| Semantic Token | :root value | amber-mono value |
|---------------|-------------|-----------------|
| `--color-semantic-text-primary` | `var(--color-cga-light-gray)` (#b87c1a) | `var(--color-cga-amber)` (#ffb000) |
| `--color-semantic-border-default` | `var(--color-cga-light-gray)` (#b87c1a) | `var(--color-cga-amber)` (#ffb000) |
| `--color-semantic-border-focus` | `var(--color-cga-yellow)` (#e5b936) | `var(--color-cga-amber-bright)` (#fdca9f) |

---

## 7. Gotchas and Anti-Patterns

### Dangerous Mistakes

**`text-secondary` is near-black (#020003).** It is only readable on amber or accent backgrounds. Using it on dark backgrounds makes text invisible.

```css
/* WRONG: invisible text */
.dark-panel {
  background: var(--color-semantic-background-primary);
  color: var(--color-semantic-text-secondary);
}

/* RIGHT: secondary text on amber background */
.amber-badge {
  background: var(--color-semantic-background-accent);
  color: var(--color-semantic-text-secondary);
}
```

**`text-primary` changes between themes.** On `:root` it resolves to #b87c1a (brown). In amber-mono it resolves to #ffb000 (bright amber). Do not assume a specific hex value.

**Hardcoded hex values bypass theming entirely.** Always use CSS variables.

```css
/* WRONG */
color: #FFB000;
background: #1a1a1a;

/* RIGHT */
color: var(--color-cga-amber);
background: var(--color-semantic-background-primary);
```

**CSS custom properties fail silently when referencing non-existent tokens.** There is no build-time error. The property inherits or falls back to `initial`. Double-check variable names against this reference.

**Portal content (`createPortal`) falls outside `data-theme` scope.** Use the `useThemePortal` hook to re-apply the active theme inside portals.

**SVG sprites with hardcoded `fill` attributes don't respond to `currentColor`.** Use `fill="currentColor"` in SVG source files.

### Anti-Patterns in CSS

```css
/* NEVER: opacity modifiers on borders */
border-color: rgba(255, 255, 255, 0.1);

/* NEVER: invent custom variables */
:root { --background: #f9fafb; --foreground: #171717; }

/* NEVER: use non-eidotter namespaces */
color: var(--text-color);
color: var(--color-primary);
```

### Anti-Patterns in Tailwind

```tsx
// NEVER: arbitrary values
<div className="bg-[#020003] text-[#b87c1a]">

// NEVER: default Tailwind colors
<div className="bg-gray-900 text-amber-500 border-white/10">

// NEVER: large border radius
<div className="rounded-full rounded-2xl rounded-xl">

// RIGHT
<div className="bg-dos-bg-primary text-dos-text-primary border-dos-border-default rounded-dos-sm">
```

---

## 8. Tailwind Integration

The Tailwind preset at `tailwind.preset.js` maps all tokens to utility classes. Include it in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  presets: [require('./tailwind.preset.js')],
  // ...
}
```

### Color Classes

Primitive colors use the `cga-` prefix. Semantic colors use the `dos-` prefix.

```tsx
// Primitive
<div className="bg-cga-black text-cga-amber border-cga-light-gray" />

// Semantic (preferred)
<div className="bg-dos-bg-primary text-dos-text-primary border-dos-border-default" />

// Status
<span className="text-dos-success" />
<span className="text-dos-error" />

// Alert backgrounds
<div className="bg-dos-alert-warning" />
```

### Typography

| Class | Purpose |
|-------|---------|
| `font-dos` | Primary DOS font family |
| `font-dos-fallback` | Fallback font stack |
| `text-dos-xs` through `text-dos-4xl` | Font sizes |
| `font-dos-regular` | Normal weight |
| `font-dos-semibold` | Semi-bold weight |
| `font-dos-bold` | Bold weight |
| `leading-dos-tight` | Tight line height |
| `leading-dos-normal` | Normal line height |
| `leading-dos-loose` | Loose line height |

### Spacing

Tokens: `dos-0` through `dos-16`. Used with standard Tailwind utilities:

```tsx
<div className="p-dos-4 m-dos-2 gap-dos-3" />
```

### Border Radius

Only two non-zero values exist. DOS aesthetics are sharp.

| Class | Value |
|-------|-------|
| `rounded-dos-none` | `0` |
| `rounded-dos-sm` | `2px` |
| `rounded-dos-base` | `4px` |

### Box Shadow

| Class | Purpose |
|-------|---------|
| `shadow-dos-none` | No shadow |
| `shadow-dos-drop` | DOS-style drop shadow |
| `shadow-dos-glowXs` through `shadow-dos-glowLg` | Amber phosphor glow sizes |
| `shadow-dos-glowLgWhite` | White phosphor glow (large) |

---

## 9. Swift/iOS Tokens

Generated file: `src/styles/EiDotterTokens.swift`

Provides `static let` constants for SwiftUI. Used by Spacewar (tvOS) and EatThisDie (iOS).

### Usage

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello")
            .foregroundColor(EiDotterColors.colorCgaAmber)
            .padding(EiDotterSpacing.sp4)
            .font(.system(size: EiDotterTypography.fontSizeBase))
    }
}
```

The Swift output contains resolved values (hex colors as `Color` literals, spacing as `CGFloat`). It does not use `var()` references -- there is no runtime theme cascade in native apps.

---

## 10. How to Extend

### Adding a New Primitive Color

1. Edit `src/tokens/base.tokens.json`:

```json
{
  "color": {
    "cga": {
      "new-color": {
        "$value": "#ff00ff",
        "$type": "color"
      }
    }
  }
}
```

2. Run `npm run build-tokens`
3. Verify the new variable appears in `src/styles/tokens.css`
4. Add the corresponding per-color glow token if needed

### Adding a New Semantic Token

1. Edit `src/tokens/base.tokens.json` in the `semantic` section:

```json
{
  "color": {
    "semantic": {
      "new-purpose": {
        "$value": "{color.cga.new-color}",
        "$type": "color"
      }
    }
  }
}
```

2. Run `npm run build-tokens`
3. Update theme files if the new token needs per-theme overrides

### Adding a New Theme

1. Create `src/tokens/theme.new-theme.tokens.json`
2. Override the primitive CGA values that should change:

```json
{
  "color": {
    "cga": {
      "black": { "$value": "#000000", "$type": "color" },
      "amber": { "$value": "#00ff00", "$type": "color" }
    }
  }
}
```

3. Register the theme in `style-dictionary.config.mjs`
4. Run `npm run build-tokens`
5. Import the generated `theme.new-theme.css` in your app
6. Apply with `<div data-theme="new-theme">`

### Updating the Tailwind Preset

The Tailwind preset is auto-generated by the token pipeline. Do not edit `tailwind.preset.js` manually. If you need new utility mappings, update the Style Dictionary config.
