# Design Principles

eiDotter recreates the experience of a DOS-era CRT monitor: amber phosphor on near-black, monospaced type, hard edges, no distractions. Every rule below serves that goal.

## 1. Dark Only

eiDotter has one mode: dark. The background is near-black (`#020003`), the text is amber. There is no light theme, no `prefers-color-scheme` toggle, no white backgrounds.

CRT monitors emitted light on darkness. We do the same.

```css
/* Correct */
background: var(--color-semantic-background-primary);   /* #020003 */
color: var(--color-semantic-text-primary);               /* amber */

/* Wrong — breaks the entire aesthetic */
background: white;
color: black;
```

## 2. CGA Palette

All color comes from the 16-color CGA palette plus amber extensions. No other colors exist in this system.

The palette divides into two tiers:

- **Primitive tokens** (`--color-cga-*`): The raw 16 CGA colors plus amber-bright, amber-dim, and amber-glow. Use these when you need a specific CGA color.
- **Semantic tokens** (`--color-semantic-*`): Named by purpose — `background-primary`, `text-accent`, `border-focus`, `status-error`. Use these for components.

Prefer semantic tokens. They enable theme switching: in `amber-mono`, every CGA slot maps to an amber shade. In `cga-mode4-p0`, you get cyan, magenta, and white. Same component, different palette — because semantic tokens resolve through the theme layer.

**Never hardcode hex values.** A hardcoded `#FFB000` bypasses theming and breaks in every palette except amber-mono.

## 3. Five Themes, One Mechanism

Themes work through CSS custom property cascading on `[data-theme]` selectors:

| Theme | Palette | Character |
|-------|---------|-----------|
| `amber-mono` | Amber shades only | Classic amber phosphor monitor |
| `cga-amber` | Full 16-color CGA + amber | Color CGA with amber warmth |
| `cga-mode4-p0` | Cyan, magenta, white, black | CGA Mode 4, Palette 0 |
| `cga-mode4-p1` | Cyan, red, white, black | CGA Mode 4, Palette 1 |
| `cga-mode5` | Cyan, magenta, white, black (alt) | CGA Mode 5 |

Import a theme CSS file. Set `data-theme` on a container. Every semantic token inside resolves to that theme's values. Components need zero changes.

```html
<div data-theme="cga-mode4-p0">
  <!-- All components here render in cyan/magenta/white -->
</div>
```

## 4. Monospace Only

DOS had one font category: monospaced. eiDotter uses JetBrains Mono as its primary typeface, with Consolas and Monaco as fallbacks.

```css
--typography-font-family-primary: 'JetBrains Mono', 'JetBrainsMono Nerd Font',
    Consolas, Monaco, monospace;
```

No sans-serif. No serif. No display fonts. Every character occupies the same width, just like a real terminal.

## 5. Hard Edges

DOS drew rectangles with single and double box-drawing characters. Pixels were square. Nothing was round.

eiDotter allows two border-radius values:

| Token | Value | Use |
|-------|-------|-----|
| `--border-radius-sm` | 2px | Subtle softening on small elements |
| `--border-radius-base` | 4px | Maximum rounding for any element |

Never use `rounded-full`, `rounded-xl`, or any radius above 4px. Pill shapes, circles, and large curves belong to a different design language.

## 6. Phosphor Glow

CRT monitors didn't have clean, crisp edges. Phosphor dots bled light into surrounding darkness. eiDotter recreates this with `box-shadow` and `text-shadow` glow tokens.

Glow comes in four sizes (`xs`, `sm`, `md`, `lg`) and seven colors (amber, red, green, cyan, magenta, blue, white):

```css
/* Subtle hover glow */
box-shadow: var(--shadow-glow-sm);

/* Emphasis glow */
box-shadow: var(--shadow-glow-lg);

/* Per-color glow for CGA themes */
box-shadow: var(--shadow-glow-md-cyan);
```

Glow is 50% opacity by design — phosphor bleeds, it doesn't blast. The `--shadow-drop` token provides the complementary hard DOS drop shadow (2px 2px, solid black).

**Reduced motion and high contrast:** Neutralize all glows under `@media (prefers-reduced-motion: reduce)` and `@media (prefers-contrast: high)`. The phosphor effect is decorative; accessibility overrides aesthetics.

## 7. CRT Animation Language

Interactions mimic CRT phosphor behavior, not modern UI transitions:

| State | Animation | Duration | What It Simulates |
|-------|-----------|----------|-------------------|
| Hover entry | `phosphor-warmup` | 400ms | Phosphor heating up — brightness flickers |
| Press/activate | `phosphor-energize` | 150ms | Energy pulse through the phosphor |
| Toggle on | `box-shadow` transition | `--duration-normal` | Glow warming around active element |
| Dismiss/exit | Component-specific | Varies | Phosphor cooling, fading |

All animations follow these rules:

- **Compositor-only properties.** Animate `transform`, `opacity`, and `filter` only. Never animate `width`, `height`, `left`, `top`, `padding`, or `max-height`.
- **Reduced motion bypass.** Every animation needs `@media (prefers-reduced-motion: reduce) { animation: none; }` and a JS check via `prefersReducedMotion()`.
- **High contrast neutralization.** Glow effects (`text-shadow`, `box-shadow`) must be neutralized under `@media (prefers-contrast: high)`.

## 8. Semantic Token Architecture

eiDotter's token pipeline flows in one direction:

```
src/tokens/*.json  →  Style Dictionary  →  tokens.css / tokens.js / tailwind.preset.js
```

Never edit generated files. Never invent new token namespaces. The two valid namespaces are:

- `--color-cga-*` — primitive palette
- `--color-semantic-*` — purpose-based

A semantic token references a primitive. A theme overrides the primitive. Components consume semantics. This three-layer cascade is the entire theming mechanism.

**CSS custom properties fail silently.** Reference a nonexistent token and you get transparent — no error, no warning. Validate token names against `tokens.css` before shipping.

## 9. BEM Class Naming

Every component follows Block Element Modifier:

```
.button                    /* Block */
.button--primary           /* Modifier (variant) */
.button--large             /* Modifier (size) */
.button__content           /* Element */
.button__icon              /* Element */
```

No utility-first CSS inside components. Components own their styles through BEM classes that consume tokens. Tailwind utilities are for consuming applications, not for component internals.

## 10. 4px Grid Spacing

All spacing derives from a 4px base unit:

| Token | Value | Common Use |
|-------|-------|------------|
| `--spacing-1` | 4px | Tight gaps (icon-to-text) |
| `--spacing-2` | 8px | Standard inner padding |
| `--spacing-4` | 16px | Component padding |
| `--spacing-6` | 24px | Section gaps |
| `--spacing-8` | 32px | Large section spacing |

DOS interfaces packed information dense. eiDotter follows suit — spacing is functional, not decorative. Prefer tighter spacing over generous whitespace.

## 11. Container Queries, Not Media Queries

Components are consumed in unpredictable contexts: full-width pages, narrow sidebars, dashboard panels. Media queries respond to the viewport. Container queries respond to the component's actual space.

```css
.component { container: component-name / inline-size; }

@container component-name (min-width: 480px) { /* standard layout */ }
@container component-name (min-width: 768px) { /* wide layout */ }
```

Two thresholds. Mobile-first defaults. Group `@container` blocks at the bottom of the CSS file.

## 12. Keyboard First

DOS was keyboard-driven. Every eiDotter component is fully operable by keyboard with visible focus states. Tab order follows logical reading flow. Focus rings use `--color-semantic-border-focus`.

Interactive components implement:
- `Enter`/`Space` for activation
- Arrow keys for navigation within groups (tabs, timeline zoom)
- `Escape` for dismissal (modals, dropdowns)

Touch targets are a concession to modern devices, not the primary input mode.

## 13. Accessibility Overrides Aesthetics

WCAG 2.1 AA is the floor, not the ceiling. When accessibility and aesthetics conflict, accessibility wins:

- Phosphor glows are decorative — remove them for reduced motion and high contrast
- Semantic HTML over ARIA when possible (`<dialog>`, `<details>`, `<button>`)
- Color is never the sole indicator of state — pair with icons, text, or borders
- Focus states are always visible, never suppressed

## Summary: The Rules

1. Dark backgrounds only. No light mode.
2. CGA palette only. No custom colors.
3. Semantic tokens for components. Primitives for special cases.
4. Monospace fonts only. JetBrains Mono primary.
5. Border radius: 4px maximum. No pills, no circles.
6. Phosphor glow for emphasis. 50% opacity, four sizes.
7. CRT animations: `phosphor-warmup` on hover, `phosphor-energize` on press.
8. Compositor-only animation properties. Reduced motion bypass on everything.
9. BEM naming for component CSS. Tailwind for consumers.
10. 4px grid spacing. Tight, functional, information-dense.
11. Container queries for responsive components. No media queries.
12. Keyboard-first interaction. Visible focus states.
13. Accessibility overrides aesthetics. Always.
