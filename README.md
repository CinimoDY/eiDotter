# eiDotter

```
┌──────────────────────────────────────────────┐
│  C:\> EIDOTTER_                              │
│                                              │
│  DOS terminal design system for React.       │
│  Authentic CGA phosphor. WCAG AA.            │
│  Tree-shakable. No CSS-in-JS runtime.        │
└──────────────────────────────────────────────┘
```

[![npm](https://img.shields.io/npm/v/eidotter.svg?color=ffb000&labelColor=020003&label=npm)](https://www.npmjs.com/package/eidotter)
[![CI](https://img.shields.io/github/actions/workflow/status/CinimoDY/eiDotter/build.yml?branch=main&color=ffb000&labelColor=020003&label=CI)](https://github.com/CinimoDY/eiDotter/actions/workflows/build.yml)
[![license](https://img.shields.io/badge/license-CC--BY--NC--4.0-ffb000?labelColor=020003)](./LICENSE.md)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-ffb000?labelColor=020003)](https://react.dev/)

**eiDotter** is a React component library that takes the DOS/CGA terminal aesthetic seriously: authentic 16-color palette, bitmap-accurate typography, phosphor glow physics, keyboard-first interactions. 52 components across forms, navigation, windowing, timelines, and terminal chrome — shipped as ES modules with a prebuilt stylesheet so consumers don't need Tailwind to use it.

→ **[Storybook](https://cinimody.github.io/eiDotter/)** &nbsp;·&nbsp; **[CHANGELOG](./CHANGELOG.md)** &nbsp;·&nbsp; **[Accessibility](./ACCESSIBILITY.md)** &nbsp;·&nbsp; **[Issues](https://github.com/CinimoDY/eiDotter/issues)** &nbsp;·&nbsp; **[npm](https://www.npmjs.com/package/eidotter)**

---

## Install

```bash
npm install eidotter
```

## Quick start

```tsx
import { Terminal, Alert, Button } from 'eidotter';
import 'eidotter/styles';

function App() {
  return (
    <Terminal title="MY-APP.EXE">
      <Alert color="success" title="System Ready">
        DOS interface loaded successfully.
      </Alert>
      <Button variant="primary">Execute</Button>
    </Terminal>
  );
}
```

A single CSS import pulls everything: font, tokens, component styles, and compiled Tailwind utilities. Tailwind is **not** required to use eiDotter — consume it as plain React + one stylesheet.

## Setup

### Styles

```tsx
import 'eidotter/styles';                    // Everything: font + tokens + components + utilities
import 'eidotter/themes/amber-mono.css';     // Optional: theme override
import 'eidotter/utilities';                 // Optional: .dos-* typography classes for raw HTML
```

Granular imports are still available (`eidotter/fonts.css`, `eidotter/tokens.css`) if you want to override the font or tokens independently.

### With Tailwind

If you already use Tailwind, register eiDotter's preset and drop the `eidotter/styles` import (the preset compiles utilities in your build):

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: ['./src/**/*.{ts,tsx,jsx}'],
};
```

```tsx
<div className="bg-dos-bg-primary text-dos-text-accent font-dos">
  DOS terminal content
</div>
```

The preset auto-registers `tailwindcss-react-aria-components` and `tailwindcss-animate` if they resolve. Migrating from the pre-0.19.2 dual-preset split? See [CHANGELOG → 0.19.2](./CHANGELOG.md#0192--2026-04-18).

### Server Components (RSC / Next.js App Router)

The `.` barrel (`import { Button } from 'eidotter'`) inlines every component into one
module, so importing it into a **server component** pulls interactive components' hooks
into the RSC graph and fails. For server components, deep-import per component instead:

```tsx
// In a Server Component:
import { SectionHeading } from 'eidotter/components/SectionHeading'; // presentational — renders on the server
import { Button } from 'eidotter/components/Button';                 // interactive — resolves as a client reference

import 'eidotter/styles'; // CSS still ships once, app-wide (unchanged)
```

`eidotter/components/<Name>` (PascalCase, matching the component) carries `'use client'`
on interactive components automatically, so they cross the client boundary correctly while
presentational primitives stay server-renderable. The `.` barrel remains the right default
for client apps and `'use client'` files.

## Documentation

| | |
|---|---|
| **Live docs** | [Storybook](https://cinimody.github.io/eiDotter/) — every component with stories, controls, and source |
| **Design tokens** | `src/tokens/*.json` (DTCG format) → `tokens.css` via Style Dictionary |
| **Themes** | `amber-mono` (default), `cga-amber`, `cga-mode4-p0/p1`, `cga-mode5` |
| **Font** | [Perfect DOS VGA 437](https://www.dafont.com/perfect-dos-vga-437.font) by Zeh Fernando — pixel-perfect-vector TTF (every glyph outline axis-aligned). Free-to-redistribute per bundled license. Single-weight; all `fontWeight` tokens resolve to 400 |
| **Icons** | [pixelarticons](https://github.com/halfmage/pixelarticons) (MIT) — DOS pixel-art glyphs |
| **Accessibility** | WCAG AA, React Aria primitives under interactive components, `prefers-reduced-motion` + `prefers-contrast` honored throughout |

## Components

52 components across five families — [complete catalog in Storybook](https://cinimody.github.io/eiDotter/).

<details>
<summary><strong>Windowing &amp; shell</strong> — Terminal, Modal, Lightbox, CommandPrompt, CmdPalette, Header, Footer, Nav, Brand, Connector</summary>

| Component | Purpose |
|---|---|
| `Terminal` | DOS window with title bar, minimize/maximize/close controls |
| `Modal` | Dialog overlay on React Aria primitives (ModalOverlay + Modal + Dialog) |
| `Lightbox` | Fullscreen image viewer on Modal's primitives — prev/next, counter, keyboard nav, swipe |
| `CommandPrompt` | Interactive command-line input with blinking cursor |
| `CmdPalette` | ⌘K overlay with scored search, keyboard nav, configurable hotkey |
| `Header` | Sticky site header (retro / modern variants), composes branding + Nav |
| `Footer` | Site footer with default legal links (Impressum + Datenschutz) |
| `Nav` | Responsive navigation with desktop + mobile variants |
| `Brand` | Logo, Wordmark, BrandLockup, `Mark` (morphing egg-yolk avatar + SVG arm connectors) — eiDotter branding marks |
| `Connector` | Organic tapered-ribbon SVG overlay — arms from a source node (Mark) to N anchors, amber→category gradient, stop-at-edge attach, reduced-motion-safe idle sway |

</details>

<details>
<summary><strong>Content surfaces</strong> — Card, Accordion, Alert, Badge, Tag, Notification, Stat, Progress, Skeleton, Separator, Breadcrumb, LegalPage</summary>

| Component | Purpose |
|---|---|
| `Card` | Content container (elevated, bordered, glow, interactive, minimal, callout) |
| `Accordion` | Collapsible content sections (Section + AccordionFill) |
| `Alert` | Inline alert banner with featured icon, actions, 6 color variants |
| `Badge` | Status indicator chips |
| `Tag` | Interactive labels for tags, categories, filter chips |
| `Notification` | Toast popup with layered amber glow, auto-dismiss, progress variant |
| `Stat` | Key-value display for metrics |
| `Progress` | DOS-style progress bar with block characters |
| `Skeleton` | DOS/CGA loading placeholder — ░▒▓ shade rows with a CRT hum-bar band rolling top→bottom |
| `Separator` | Horizontal / vertical divider |
| `Breadcrumb` | Navigation path display |
| `LegalPage` | Impressum / Datenschutz layout primitive with reusable German DDG/DSGVO clauses |

</details>

<details>
<summary><strong>Input</strong> — Button, Input, Checkbox, Switch, Tabs, FilterBar</summary>

| Component | Purpose |
|---|---|
| `Button` | DOS-style buttons (primary, secondary, ghost, link) on React Aria `Button` |
| `Input` | Text input with error variant, React Aria `TextField` |
| `Checkbox` | `[X]`-bracket indicator, React Aria `Checkbox` |
| `Switch` | Toggle on/off, React Aria `Switch` |
| `Tabs` | Tabbed navigation on React Aria `TabList/Tab/TabPanel` |
| `FilterBar` | Multi-select toggle group for faceted filtering |

</details>

<details>
<summary><strong>Chat &amp; media</strong> — ChatMessage, ChatHistory, ChatInput, ChatContainer, DosFigure, Icon, InlineLink, InlineExpand, AIText</summary>

| Component | Purpose |
|---|---|
| `ChatMessage` | Chat message with role-based DOS styling and streaming cursor |
| `ChatHistory` | Scrollable message list with auto-scroll + `role="log"` |
| `ChatInput` | Multiline textarea with Enter-to-send |
| `ChatContainer` | Composes ChatHistory + ChatInput — drop inside Terminal |
| `DosFigure` | Demoscene painted-screen media placeholder with scanline sweep |
| `Icon` | SVG icons backed by pixelarticons |
| `InlineLink` | In-flow anchor with dotted underline + `▸` / `↗` glyph |
| `InlineExpand` | Inline disclosure widget for prose |
| `AIText` | Inline AI-content marker (`data-provenance="ai-draft"`) with shimmer gradient |

</details>

<details>
<summary><strong>Time &amp; effects</strong> — TimelineContainer, TimelineFeed, TimelineNode, TimelinePage, TextScramble, RetroEffects, Tokens</summary>

| Component | Purpose |
|---|---|
| `TimelineContainer` | Multi-zoom timeline (year / month / day / hour views); text / image / gallery / article entry kinds |
| `TimelineFeed` | Dense category-dot · date · title · kind-tag feed on a thin amber spine, with a culling category filter |
| `TimelineNode` | Axis markers with shape variants and glow |
| `TimelinePage` | Bret-Victor blog timeline — year-grouped, amber-only spine, big titles + description, right-hand hover-preview panel |
| `TextScramble` | DOS text decode animation |
| `RetroEffects` | CRT scanlines, noise, phosphor glow |
| `Tokens` | Design-token reference display (Storybook only) |

</details>

## Design tokens

Authentic 16-color CGA palette plus amber/phosphor variants, exposed as CSS custom properties:

```css
--color-cga-amber: #FFB000;         /* Primary accent */
--color-cga-amber-bright: #FDCA9F;
--color-cga-amber-dim: #9A5700;
--color-cga-black: #020003;         /* Background */
/* …16-color CGA palette + semantic tokens */
```

Semantic tokens (`--color-semantic-*`) and Tailwind classes (`bg-dos-*`, `text-dos-*`, `border-dos-*`) are the preferred surface — the raw CGA names are primitives. Full reference in [`src/styles/tokens.css`](./src/styles/tokens.css) or in Storybook's Tokens page.

**Theming** is attribute-driven:

```html
<div data-theme="amber-mono">…</div>
```

## Development

```bash
npm install
npm run storybook        # Launch Storybook on :6006
npm run build            # Production build (tsup + tsc)
npm run test             # Jest + React Testing Library
npm run lint             # ESLint
npm run build-tokens     # Rebuild tokens from src/tokens/*.json
```

## Design notes

eiDotter commits to the constraints that other "DOS-inspired" systems relax:

- **16 colors, no more.** The palette is a historical fact, not a starting point. Extensions (amber, green, phosphor variants) are declared themes, not ad-hoc hex codes.
- **Single-weight typography.** Perfect DOS VGA 437 has no bold variant — authentic DOS never had one. All `fontWeight` tokens resolve to `400` and `font-synthesis: none` blocks browser faux-bold. Emphasis comes from color, uppercase on labels, or inverse video — never weight.
- **Phosphor as physics, not decoration.** Warmup animations, glow layers, and scanline effects are wired into component states; consumers don't opt in per-component.
- **Keyboard-first.** React Aria powers every interactive component. Focus rings are loud amber on amber-dim. `prefers-reduced-motion` and `prefers-contrast` are honored across the board.
- **Tree-shakable, no CSS-in-JS.** Runtime deps are minimal and on-purpose: [React Aria](https://react-spectrum.adobe.com/react-aria/) + [pixelarticons](https://github.com/halfmage/pixelarticons), both MIT. Component CSS ships compiled; you pay no CSS-in-JS cost at runtime.

The aesthetic is a constraint the system holds itself to — not a theme that can be turned off.

## License

[CC-BY-NC-4.0](./LICENSE.md) — Creative Commons Attribution-NonCommercial 4.0 International. Bundled third-party licenses (pixelarticons MIT, Perfect DOS VGA 437 free-redistribution by Zeh Fernando, Flexi IBM VGA True CC BY-SA 4.0 — kept for legacy consumers) attributed in `LICENSE.md`.
