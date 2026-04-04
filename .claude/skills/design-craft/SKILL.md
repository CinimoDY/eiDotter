---
name: design-craft
description: Animation engineering, visual polish, and interaction design for web interfaces. Triggers on spring physics, gesture interactions, motion library patterns, layout animations, drag gestures, CSS shadows, clip-path animations, border-radius nesting, scroll-driven animations, OKLCH colors, optical alignment, popover API, CRT/phosphor effects, toast/drawer/popover architecture, shadow engineering, or requests to elevate UI quality. Sources from Jhey Tompkins (jhey.dev), Jakub Krehel (jakub.kr), Lochie Axon (lochieaxon.com), Emil Kowalski (emilkowal.ski), and Derek Briggs.
---

# Design Craft

Animation engineering and visual polish patterns from five design engineers: **Jhey Tompkins** (Staff Design Engineer, Shopify), **Jakub Krehel** (Founding Design Engineer, Interfere), **Lochie Axon** (Design Engineer), **Emil Kowalski** (Sonner, Vaul), and **Derek Briggs** (shadow systems).

## Philosophy

Five principles guide every decision:

1. **Animate with intent** — Before choosing *how* to animate, decide *whether* to animate. High-frequency interactions (100+/day) and keyboard-initiated actions should never be animated. Delight animations are only for rarely-seen interactions; anything daily becomes a daily annoyance.
2. **Purposeful motion** — Motion clarifies state, defines space, and provides feedback. If it doesn't solve a problem, delete it.
3. **Dependency minimalism** — Reach for CSS before JS, JS before libraries. Every dependency is a maintenance burden. Performance hierarchy: **CSS > WAAPI > Framer Motion**.
4. **Production polish** — Small details (concentric radii, shadow layers, spring tuning) compound into perceived quality. "Whether you or your users notice it doesn't matter. Unseen details compound." — Kowalski
5. **Perception over precision** — Optical alignment trumps mathematical centering. Spring physics feel more alive than cubic-bezier.

**The CGA Motion Aesthetic** rests on three pillars: **Phosphor Warm-Up** (elements bloom into existence), **Mechanical Springs** (physics-driven motion, not eased curves), and **Scanline Logic** (movement respects the grid; digital artifacts are embraced, not hidden).

## Decision Layer — Should This Be Animated?

Run this check FIRST on any animation task, before choosing a tier:

1. **Keyboard-initiated?** → NO animation (feels slow and disconnected)
2. **Seen 100+/day?** → NO animation (Raycast has zero animations and "feels right")
3. **Clear purpose?** (spatial consistency, state feedback, delight) → Continue
4. **Decision test:** "What's the purpose? How often will users see this?"

**Two timing classes:**
- **UI animation** (≤300ms) — productivity interactions, state changes
- **Experiential animation** (up to 1000ms) — cinematic reveals, native-feel interactions (iOS sheets)

## Animation Tiering System

Start at Tier 1. Move up ONLY when the lower tier cannot achieve the effect.

### Tier 1 — Native CSS (Zero Bundle Cost)

Hover states, focus rings, color transitions, scroll-driven animations, popover entry/exit, CRT power sequences, scanline effects, **clip-path reveals**, **blur masking**, **shadow-as-border**, **hold-to-delete asymmetric timing**, **tooltip delay skipping**. Uses CSS transitions, `@keyframes`, `animation-timeline`, `@starting-style`.

**Eidotter tokens:** `--duration-fast` (100ms), `--duration-normal` (200ms), `--duration-slow` (400ms), `--duration-powerOn` (600ms), `--duration-powerOff` (400ms).

**Key additions:**
- `clip-path` is hardware-accelerated, causes no layout shift, unlocks reveals impossible with transform/opacity alone
- `filter: blur(2px)` during transitions masks imperfect crossfades ("animation band-aid")
- `background-clip: padding-box` enables shadow-as-border technique (Briggs)
- Asymmetric `transition-duration` for press (slow/deliberate) vs release (fast) on hold interactions
- CSS transitions are interruptible mid-animation; keyframes are not — prefer transitions for interactive elements

### Tier 2 — Native JS + CSS (No Library)

Staggered reveals, text morphing, scroll-position tracking, multi-element orchestration, **WAAPI scroll-triggered reveals**, **momentum-based swipe calculations**, **observer pattern for toasts**, **Visual Viewport API for mobile keyboards**. Uses `requestAnimationFrame`, `IntersectionObserver`, Web Animations API.

**When to escalate from Tier 1:** The effect requires JS logic for timing, sequencing, or dynamic values that CSS cannot compute.

**WAAPI over Framer Motion:** When you need JS coordination but CSS does the animating, prefer `element.animate()` — it runs on the compositor thread and avoids `requestAnimationFrame` overhead.

### Tier 3 — Motion Library (Framer Motion)

Springs, drag gestures, shared layout (FLIP), `AnimatePresence`, reactive pointer systems. Uses `motion` components, `useMotionValue`, `useTransform`, `useSpring`.

**When to escalate from Tier 2:** The effect requires spring physics, drag constraints, layout animation, or coordinated mount/unmount transitions.

**Prefer duration-based springs:** `{ type: "spring", visualDuration: 0.5, bounce: 0.25 }` over physics-based `{ stiffness, damping, mass }` — easier to reason about and coordinate. Physics-based springs remain necessary when incorporating gesture velocity.

**Critical performance rule:** CSS variables are inheritable — changing them triggers style recalc on ALL children. For per-frame drag/gesture updates, set `transform` directly on the element, NOT via CSS custom properties.

## Examples

| Request | Tier | Technique |
|---------|------|-----------|
| "Add hover feedback to a card" | 1 (CSS) | `box-shadow` transition with `--duration-normal` |
| "Fade in list items on scroll" | 1 (CSS) | `animation-timeline: view()` + fade keyframes |
| "Reveal an image/section on scroll" | 1 (CSS) | `clip-path: inset()` animation, hardware-accelerated |
| "Smooth crossfade between states" | 1 (CSS) | Add `filter: blur(2px)` during transition (band-aid) |
| "Add hold-to-delete on a button" | 1 (CSS) | Asymmetric `transition-duration`: 2s press, 200ms release |
| "Stagger cards appearing on load" | 2 (JS+CSS) | `IntersectionObserver` + CSS transition delays |
| "Add a toast notification system" | 2 (JS+CSS) | Observer pattern (Sonner): pub/sub, no context provider |
| "Animate tab indicator between tabs" | 3 (Motion) | `layoutId` (FLIP) with spring |
| "Make grid elements react to cursor" | 3 (Motion) | Reactive motion chain (`useMotionValue` → `useTransform` → `useSpring`) |
| "Add swipe-to-dismiss on cards" | 3 (Motion) | Drag gesture with momentum-based threshold |
| "Build a drawer/bottom sheet" | 3 (Motion) | Vaul pattern: direct transform, `cubic-bezier(0.32, 0.72, 0, 1)` at 500ms |
| "Phosphor warm-up on component enter" | 1 or 3 | CSS version for simple glow; Motion version for spring overshoot |

## Motion Recipes

### Easing Blueprint (Canonical Reference)

| Context | Easing | Duration | Notes |
|---------|--------|----------|-------|
| Enter/exit screen | Custom `ease-out` | ≤300ms | Built-in CSS curves "almost never strong enough" |
| On-screen movement | Custom `ease-in-out` | ≤300ms | Mimics natural acceleration/deceleration |
| Hover / color change | `ease` | Short | Only case where built-in easing works |
| iOS-feel drawer | `cubic-bezier(0.32, 0.72, 0, 1)` | 500ms | From Ionic (experiential, not UI) |
| Image/section reveal | `cubic-bezier(0.77, 0, 0.175, 1)` | 1000ms | Dramatic, cinematic |
| Button press | `ease-out` | 160ms | With `scale(0.97)` |
| Tooltip enter/exit | `ease-out` | 125ms | With `scale(0.97)` + opacity |

**Override rule:** When component cohesion demands it, deviate from the blueprint. Sonner uses `ease` (not `ease-out`) because it matches its elegant design language. Easing should match the component's personality.

### Scale Pattern Values

- **Button press:** `scale(0.97)` on `:active`
- **Enter animations:** start from `scale(0.93)` minimum — never `scale(0)` ("even a deflated balloon has visible shape")
- **Toast stacking depth:** scale down by `0.05 × index`

### Spring Configuration Table

| Context | Tier | Duration | Bounce | Eidotter Token |
|---------|------|----------|--------|----------------|
| Hover glow | 1 | 200ms | — | `--duration-normal` |
| Focus ring | 1 | 100ms | — | `--duration-fast` |
| CRT power-on | 1 | 600ms | — | `--duration-powerOn` |
| CRT power-off | 1 | 400ms | — | `--duration-powerOff` |
| Content enter | 3 | 0.45s | 0 | — |
| Content exit | 3 | 0.35s | 0 | — |
| Layout (FLIP) | 3 | 0.55s | 0.1 | — |
| Tab indicator | 3 | 0.4s | 0 | — |
| Drag snap | 3 | 0.5s | 0 | — |
| Timeline node expand | 3 | 0.55s | 0.1 | — |
| Reactive grid shapes | 3 | mass: 0.1, stiffness: 200, damping: 30 | — | — |

Prefer **duration-based** springs: `{ type: "spring", visualDuration: 0.5, bounce: 0.25 }`. Physics-based `{ stiffness, damping, mass }` only when incorporating gesture velocity.

### CRT Enter/Exit Signature

Two versions available (see `references/api_reference.md` for full code):

**Tier 1 (CSS):** `opacity` + `filter: blur(4px) brightness(0.3)` + `translateY` transition. The `brightness(0.3)` simulates a dimmed phosphor warming up. Exits are less dramatic than enters (shorter duration, `scale(0.95)`, no translateY).

**Tier 3 (Motion):** Spring-driven `opacity` + `filter` + `y` with `AnimatePresence`. Use when multiple elements need coordinated enter/exit.

**Blur scaling:** 4px blur suits standard components. Reduce to 1–2px for small elements (icons, badges).

**Exit rule:** Exits are always faster and less dramatic — shorter duration, slight scale-down (`0.95`), no translateY, reduced blur (`2px`).

### Shared Layout (FLIP)

Animate elements between positions with `layoutId`. One prop for tab highlights, card expansions, modal transitions.

```jsx
<motion.div layoutId="highlight" />
```

Keep `layoutId` elements outside `AnimatePresence` to avoid conflicts. Use `layout="position"` when only position (not size) changes.

### AnimatePresence Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `"sync"` (default) | Enter and exit simultaneously | Crossfade, overlapping transitions |
| `"wait"` | Exit completes before enter starts | Sequential tab content, modals |
| `"popLayout"` | Exiting element removed from flow immediately | Lists, reorderable items |

### Reactive Motion Chain

**When to use:** Grids or fields where elements need continuous real-time response to pointer position. NOT for simple hover effects (use Tier 1 CSS).

Pattern: `useMotionValue` (raw pointer) → `useTransform` (map to visual property) → `useSpring` (smooth output).

Include `findClosestEquivalent()` for angle transforms to prevent 350° spin bugs. See `references/api_reference.md` for full implementation.

### Drag Gesture System

**Horizontal snap-point drag (production-ready):**

Key values: `dragElastic={0.05}`, `dragMomentum={false}`, spring snap with `bounce: 0`. Define snap threshold at ~50% of drag range. See `references/api_reference.md` for full implementation.

**EXPERIMENTAL — Vertical drag variant:** Reference implementation in `references/api_reference.md`. Not yet tested in Eidotter context. Default to horizontal pattern.

### Auto-Height Animation

Animate between `height: 0` and natural height for accordions, expandable sections:

```jsx
<motion.div
  animate={{ height: isOpen ? "auto" : 0 }}
  transition={{ type: "spring", duration: 0.45, bounce: 0 }}
  style={{ overflow: "hidden" }}
/>
```

## CSS Techniques

### Shadow Engineering

**Default (Eidotter context):** Use token-based shadows — `--shadow-drop` for hard pixel shadow, `--shadow-glow-sm/md/lg` for phosphor bloom.

**Shadow-as-border technique (Briggs):** Replace CSS borders with semi-transparent box-shadows for borders that blend naturally into elevation shadows. Critical fix: `background-clip: padding-box` prevents background from rendering under the border area.

**Natural shadow stacking formula (Briggs):** For physically plausible multi-layer shadows: set `spread = -(Y/2)`, match Y and Blur values per layer, keep all layers at same color/opacity. This constrains lateral bleed.

**Dark mode inner highlight:** A single `1px inset` highlight on dark containers adds enough edge contrast to sharpen container edges — simulates environmental lighting. Directly serves the Eidotter CRT aesthetic.

Animate with `transition: box-shadow var(--duration-normal)`. **Performance note:** `box-shadow` animations trigger continuous repainting — prefer `transform: scale` for pulse effects.

See `references/api_reference.md` for full code examples.

### Concentric Border Radius

**Formula:** `outer-radius = inner-radius + padding`

```css
.outer { border-radius: 20px; padding: 8px; }
.inner { border-radius: 12px; /* 20 - 8 = 12 */ }
```

Applies at all radius sizes. Maintains pixel-grid alignment in nested elements. Exception: `border-radius: 9999px` (full pill) appears balanced regardless.

**Eidotter twist:** Eidotter uses minimal radii (0px–4px). Even at `0px`, pixel-grid alignment between nested containers is the priority.

### Optical Alignment

Geometric alignment sometimes looks wrong. Adjust for visual perception:

1. **SVG refinement** — Adjust the SVG source directly (preferred, no extra CSS)
2. **CSS compensation** — `margin` or `padding` offsets for visual balance
3. **Test at actual rendering size** — Compare with/without adjustment

Common cases: icons next to text in buttons, play button triangles, asymmetric shapes. Perceived balance > mathematical precision.

### will-change Optimization

Add `will-change` to elements with continuous animations (not one-shot transitions). Remove after animation completes to free GPU memory.

```css
.animating { will-change: transform, opacity; }
```

Never apply to more than ~10 elements simultaneously.

### Animation Performance Rules

**Only animate `transform` and `opacity`.** Never animate `top`, `left`, `margin`, or `width` — these trigger layout recalculation. `box-shadow` and `filter: blur()` are expensive (continuous repainting); use sparingly in loops. Target CLS < 0.1 — reserve space for images with `width`/`height` attributes and use `font-display: optional`.

### Reduced Motion

**Always support `prefers-reduced-motion`.** Dual approach: CSS fallback to opacity-only, JS skip of transform animations. Never remove functionality — only remove the motion.

```css
/* Tier 1: Fallback to opacity-only animation */
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s; } /* opacity-only fallback */
}
```

```jsx
// Tier 3: Skip transform, keep opacity
const shouldReduce = useReducedMotion();
const closedX = shouldReduce ? 0 : "-100%"; // skip transform
const transition = shouldReduce
  ? { duration: 0 }
  : { type: "spring", duration: 0.45, bounce: 0 };
```

### overflow-clip vs overflow-hidden

Use `overflow: clip` instead of `overflow: hidden` when the element has no scrollable content. `clip` does not create a scroll container, avoiding layout side effects.

### Progressive Enhancement

Layer capabilities with feature detection:

```css
@supports (animation-timeline: view()) {
  /* scroll-driven animations */
}
```

Fallback: static state or GreenSock ScrollTrigger.

## Color & Typography

### Eidotter Token Integration

Eidotter's tokens use hex values from the CGA specification. Always use semantic tokens (`--color-semantic-*`) over primitive CGA colors. See Eidotter's `CLAUDE.md` for the full token reference.

**Generative CRT character (Tier 2):** Constrained generative patterns add authentic CRT character — randomized phosphor flicker timing, procedural scan lines, stochastic glow intensity. Randomness within a design direction, not randomness for its own sake (Will King).

### OKLCH (Theme Extension Tool — INTERIM)

> This positioning may change pending compatibility research. See `OKLCH-RESEARCH.md`.

Eidotter's source of truth stays hex (CGA specification). Use OKLCH when designing new theme variants or extending the color system — its perceptual uniformity makes it ideal for generating consistent shade ramps from a CGA base color.

```css
color: oklch(L C H);
/* L: Lightness 0–1, C: Chroma 0–0.4+, H: Hue 0–360° */
```

Same L and C across different hues = same perceived brightness. For gradients, prefer `in oklab` interpolation.

### Easing Curves (Tier 1)

See the **Easing Blueprint** above for the canonical context-based lookup table.

Two CSS presets for general use:

- **"Swift Out":** `cubic-bezier(0.175, 0.885, 0.32, 1.1)` — slight overshoot, mechanical feel
- **Standard ease-out:** `cubic-bezier(0.0, 0.0, 0.2, 1)` — smooth deceleration

For Tier 3, spring physics handle easing automatically. Browse additional curves at easing.dev and easings.co.

## Platform Primitives

Style native elements before rebuilding from scratch. Built-in keyboard accessibility, touch support, and form participation for free.

### Scroll-Driven Animations

Pure CSS animations triggered by scroll position:

```css
li {
  animation: fade-in both;
  animation-timeline: view();
  animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
}
```

Use scoped custom properties (`--direction: 1` / `-1`) for animation variants instead of multiple keyframes.

### Popover API + Anchor Positioning

Build drawers, tooltips, and menus with zero JavaScript:

```html
<button popovertarget="drawer">Menu</button>
<div id="drawer" popover><!-- content --></div>
```

Animate entry/exit with `@starting-style` and `transition-behavior: allow-discrete`. Use `position-anchor` for positioning relative to trigger. See `references/api_reference.md` for full CSS.

### Range Inputs

Style `<input type="range">` instead of building custom sliders. Reset with `-webkit-appearance: none`, style thumb/track with pseudo-elements, use `@property` for animatable custom properties.

## Component Recipes

Implementation blueprints for common interactive patterns. Full code in `references/api_reference.md`.

### Toast (Sonner Pattern)
Observer pattern — no hooks, no context. Insert `<Toaster />` once at root, call `toast()` from anywhere via pub/sub. Each toast is `position: absolute`, scaled down by `0.05 × index` for depth. Momentum-based swipe dismiss: threshold is distance-based OR velocity-based (`> 0.11`).

### Drawer (Vaul Pattern)
iOS-feel bottom sheet with `cubic-bezier(0.32, 0.72, 0, 1)` at 500ms. Background scales proportionally to drag distance. Uses Visual Viewport API for mobile keyboard handling. **Critical:** Set `transform` directly, never via CSS variables (inheritable → recalc on all children).

### Origin-Aware Popover
Set `transform-origin` to match trigger position. Default `center` is wrong for most popovers:
```css
.popover { transform-origin: var(--radix-popover-content-transform-origin); }
```

### Tooltip with Delay Skipping
Initial tooltip gets delay. Once one is open, subsequent tooltips appear instantly:
```css
.tooltip[data-instant] { transition-duration: 0ms; }
```

### Stripe-Style Clip-Path Tabs
Duplicate tab list with active styling, clip duplicate to reveal only active tab, animate `clip-path` between tabs. Avoids visual artifacts from simultaneous highlight + text color animation.

### Hold-to-Delete Button
Asymmetric timing with `clip-path` overlay: 2s press (slow/deliberate) vs 200ms release (fast), combined with `scale(0.97)` press feedback.

## Niche Patterns

### Rotating Conic Gradient (CGA Spinner)

CSS-only loading spinner using `conic-gradient` with CGA colors, animated via `@property` registered angle. See `references/api_reference.md`.

### SVG pathLength

Set `pathLength="1"` on any SVG path, then animate `stroke-dashoffset` from 1 to 0 for drawing effects. Works with any path complexity. See `references/api_reference.md`.

### Text Scramble

**CSS-only:** `@property` registered integer + `counter()` maps animated values to characters.
**JavaScript:** Cycle random characters per position before settling on target via `requestAnimationFrame`.

### Outline Orbit

Animated dashed `outline` orbiting an element using `outline-offset` animation. Zero extra DOM elements. See `references/api_reference.md`.

## Motion Gap Detection

Proactively audit codebases for missing motion by grepping for:
- Conditional renders not wrapped in `<AnimatePresence>`
- Dynamic styles without transitions
- Modal/form/loading states without enter/exit animations
- Popovers without `transform-origin` awareness

**Review next day:** When generating animation values, note: "Review these values with fresh eyes in a future session. Values that feel right today may feel off tomorrow."

## Reference

For full code templates, implementation patterns, component recipe code, and Eidotter token cross-references, see `references/api_reference.md`.

## Sources

- **Jhey Tompkins** — jhey.dev — Scroll-driven animations, popover API, range inputs, text scramble, platform-first CSS
- **Jakub Krehel** — jakub.kr — Shadows, concentric radius, optical alignment, OKLCH, motion gestures, spring physics
- **Lochie Axon** — lochieaxon.com — Dependency minimalism, easing.dev, torph text morphing
- **Emil Kowalski** — emilkowal.ski — Easing blueprint, clip-path system, component recipes (Sonner, Vaul), "when not to animate" framework
- **Derek Briggs** — Shadow-as-border technique, natural shadow formula, `background-clip: padding-box`, dark mode highlights
- **Will King** — Generative art constraints, cross-medium design philosophy
- ConnectKit's `web95` theme validates retro CSS custom property theming architecture at production scale (connectkit.family)
- **Craft of UI** — craftofui.substack.com
- **oklch.fyi** — OKLCH color tool by Jakub Krehel
- **easings.co** / **easing.dev** — Custom curve design tools
