# eidotter Design System

A DOS-themed React component library with authentic CGA/amber phosphor aesthetics.

## Overview

eidotter provides 40 ready-to-use components with consistent DOS terminal styling:

- **Dark theme only** - Amber-on-black phosphor CRT aesthetic
- **CGA color palette** - 16 authentic CGA colors + amber extensions
- **Monospace typography** - Perfect DOS VGA 437 (pixel-perfect-vector VGA font)
- **Minimal rounded corners** - 2-4px max (DOS aesthetic)
- **Phosphor glow effects** - Authentic CRT visual effects
- **React Aria** - Accessible keyboard/focus handling on interactive components

## Quick Start

```tsx
import { Button, Card, Input } from 'eidotter';
import 'eidotter/styles';      // All styles: fonts, tokens, components, Tailwind utilities
// Optional (v0.19.4+): import 'eidotter/utilities';  // .dos-* classes for raw HTML / MDX / prose

function App() {
  return (
    <Card title="Login">
      <Input label="Username" placeholder="Enter username..." />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Available Components

| Component | Purpose |
|-----------|---------|
| Accordion | Collapsible sections (Section, AccordionFill) |
| Alert | Inline alert banner with featured icon and actions |
| Badge | Status indicators and tags |
| Breadcrumb | Navigation path display |
| Button | User actions and form submission |
| Card | Content container with optional header/footer |
| ChatMessage | Chat message with role-based styling |
| ChatHistory | Scrollable message list with auto-scroll |
| ChatInput | Multiline textarea with Enter-to-send |
| ChatContainer | Composes ChatHistory + ChatInput |
| Checkbox | Boolean form inputs with DOS bracket indicator |
| CmdPalette | ⌘K / Ctrl+K command palette overlay with scored search + keyboard nav |
| CommandPrompt | DOS command line display |
| DosFigure | Demoscene-style painted-screen media placeholder with scanline sweep |
| FilterBar | Multi-select toggle group |
| Footer | Site footer with legal links |
| Header | Sticky site header with branding + Nav |
| Icon | SVG icons backed by pixelarticons (MIT) — authentic DOS pixel art |
| InlineExpand | Inline disclosure widget |
| InlineLink | In-flow navigational anchor — dotted underline, phosphor-invert hover, external variant |
| Input | Text entry fields with label and error support |
| Modal | Dialog overlays |
| Nav | Responsive navigation (desktop + mobile) |
| Notification | Toast popup with amber glow and auto-dismiss |
| Progress | Loading and completion bars |
| RetroEffects | CRT scanlines and phosphor glow |
| Separator | Horizontal/vertical dividers |
| Stat | Metric display with trends |
| Switch | Toggle controls |
| Tabs | Tab-based navigation |
| Tag | Interactive labels and filter chips |
| Terminal | Window container with title bar |
| TextScramble | DOS text decode animation |
| TimelineContainer | Multi-zoom timeline views |
| TimelineNode | Timeline markers |

## Key Design Principle

**NEVER hardcode colors.** Always use design tokens:

```tsx
// Correct - use semantic tokens
<div className="bg-dos-bg-primary text-dos-text-accent">

// Wrong - hardcoded values
<div style={{ background: '#020003', color: '#e5b936' }}>
```

## One body size

Every eidotter component renders its non-heading text at one size: 16px (`text-dos-text-base`, `--typography-font-size-text-base`). That covers labels, body copy, button, badge and tag text, select options, nav and MENU text, captions, hints, errors, legends, timeline labels and card text. Size props (`size="sm"`, `"lg"`, …) change height, padding and gap only; the text stays 16px at every size.

The only larger text is real headings (h1 to h6, such as `SectionHeading`, `PageSection` titles, `LegalPage` h1/h2) and display numbers (the values of `Stat`, `Gauge`, `VitalsStrip`). Terminal and CommandPrompt keep their bitmap sizing.

Under the DOS themes, keep it that way. eidotter cannot stop you overriding font sizes, but the one size is the standard the components ship with, and it is strongly recommended to leave it intact: no smaller captions, no larger buttons. Express hierarchy with colour, uppercase and spacing instead.

## Files in This Guide

- [components.md](./components.md) - When to use each component, props, examples
- [patterns.md](./patterns.md) - Common composition and layout patterns
- [health-metabolism-patterns.md](./health-metabolism-patterns.md) - Design-from catalogue of health and metabolism display patterns (gauges, reserve meters, range bars, decay strips, vitals)

## Integration

### CSS Import (required)

```tsx
import 'eidotter/styles';      // All styles: fonts, tokens, components, Tailwind utilities

// Optional: import a theme
import 'eidotter/themes/amber-mono.css';
```

Individual imports are still available if you need granular control (e.g., providing your own font or overriding tokens):

```tsx
import 'eidotter/fonts.css';   // Perfect DOS VGA 437 @font-face
import 'eidotter/tokens.css';  // Design token CSS variables
import 'eidotter/styles';      // Component CSS + Tailwind utilities
```

### Fonts: what your build emits

`eidotter/styles` declares two font families: the display tier (Perfect DOS
VGA 437, one TTF, about 80 KB) and the body tier (JetBrains Mono Nerd Font,
four woff2 files, about 1 MB each). Your bundler copies every file an
`@font-face` rule points at into the build output, so the four woff2 files
land in `dist/` even if no page uses the body tier.

This is by design and costs no page weight: browsers download a font file
only when text on the page uses that face. A page that never renders
`font-dos-body`, `.dos-body`, `.dos-body-lg`, `.dos-caption`, `.dos-micro` or
`var(--typography-font-family-body)` requests the TTF only. The cost is
deploy size (about 4 MB of unused files).

If deploy size matters and you never use the body tier, drop its four
`@font-face` rules before your bundler resolves the CSS `url()`s. In Vite:

```js
// vite.config.js
const dropEidotterBodyFonts = {
  name: 'drop-eidotter-body-fonts',
  enforce: 'pre',
  transform(code, id) {
    if (!/eidotter[\\/]dist[\\/]eidotter\.css/.test(id)) return null;
    return code.replace(/@font-face\s*\{[^}]*JetBrains Mono Nerd Font[^}]*\}/g, '');
  },
};

export default { plugins: [dropEidotterBodyFonts] };
```

Checked with Vite 8 on a page that imports only `eidotter/styles`: the build
output drops from 4.2 MB to 268 KB, and only the TTF is emitted. Body-tier text
then falls back to the system `monospace`. Other bundlers need the same step
(remove the four rules from `node_modules/eidotter/dist/eidotter.css` before
CSS `url()` resolution); eidotter has not tested a recipe for them.

### Tailwind Preset (optional)

Use eidotter tokens as Tailwind classes in your own code:

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

## Anti-Patterns

These patterns break the eidotter aesthetic:

- Hardcoded hex colors (`color: #FFB000`)
- Light backgrounds
- Sans-serif fonts
- Rounded corners > 4px (`rounded-xl`, `rounded-full`)
- `prefers-color-scheme` (eidotter is dark-only)
- Arbitrary Tailwind values for colors (`bg-[#1a1a1a]`)

## Maintainers

- [`figma-architecture.md`](./figma-architecture.md) — how the multi-platform Figma DS is structured (Foundation → platform → app), the aliasing model, the sync pipeline, and the app-adoption recipe.
