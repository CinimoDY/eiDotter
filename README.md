# eiDotter - DOS Terminal Design System

A DOS-themed React component library with authentic CGA terminal aesthetics.

## Installation

```bash
npm install eidotter
```

## Quick Start

```tsx
import { Terminal, Button, Alert } from 'eidotter';
import 'eidotter/styles';      // All styles: fonts, tokens, components

function App() {
  return (
    <Terminal title="MY-APP.EXE">
      <Alert type="info" title="Welcome">
        DOS interface loaded successfully.
      </Alert>
      <Button variant="primary">Execute</Button>
    </Terminal>
  );
}
```

## Setup

### Basic (no Tailwind needed)

Import the styles. All component styling, fonts, and design tokens are pre-compiled — no build tools required.

```tsx
import 'eidotter/styles';      // Fonts, tokens, components, Tailwind utilities

// Optional: import a theme
import 'eidotter/themes/amber-mono.css';

// Optional (v0.19.4+): DOS typography utility classes for raw HTML / MDX / prose
// 12 classes: .dos-page, .dos-hero, .dos-h1–.dos-h5, .dos-body, .dos-body-lg,
// .dos-caption, .dos-micro, .dos-label, .dos-code, .dos-scanlines
import 'eidotter/utilities';
```

Individual imports are still available for granular control:

```tsx
import 'eidotter/fonts.css';   // Flexi IBM VGA True @font-face
import 'eidotter/tokens.css';  // CSS variable definitions
import 'eidotter/styles';      // Component CSS + Tailwind utilities
import 'eidotter/utilities';   // Opt-in .dos-* typography classes (v0.19.4+)
```

**Font:** eiDotter uses [Flexi IBM VGA True v2](https://int10h.org/blog/2018/05/flexi-ibm-vga-scalable-truetype-font/) — an aspect-corrected vector remake of the IBM VGA BIOS font (CC BY-SA 4.0). The "True" variant matches authentic 4:3 VGA proportions with an extended character set (Greek, Cyrillic, Hebrew, Latin). The `fonts.css` import loads the bundled TTF via `@font-face`.

Two fontFamily tokens are exported, with distinct intent:

- **`font-dos`** → `"Flexi IBM VGA True", monospace` — the default. Preserves the terminal aesthetic on degraded `@font-face` loads (strict CSP, web-fonts disabled, reader mode).
- **`font-dos-fallback`** → `monospace` only — intentionally bare, as a **fail-loud diagnostic** utility for surfaces that want to surface font-loading failures explicitly. Compose `font-dos font-dos-fallback` when you want strict Flexi-or-nothing behavior.

### With Tailwind CSS

Use eidotter's design tokens as Tailwind utility classes in your own code.

```bash
npm install tailwindcss
```

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

```tsx
// Now use eidotter tokens as Tailwind classes
<div className="bg-dos-bg-primary text-dos-text-accent font-dos">
  DOS terminal content
</div>
```

The preset auto-registers `tailwindcss-react-aria-components` and `tailwindcss-animate` via require-if-available. Consumers who already list either plugin in their own Tailwind config may see duplicate-variant warnings from Tailwind — either rely on the preset's registration alone, or pass those plugins explicitly in your config (they're idempotent, but the duplicate registration is noisy).

#### Migration from 0.19.1 and earlier

In 0.19.2 the two older presets (`eidotter/tailwind.preset` and `eidotter/tailwind.preset.enhanced`) were merged into a single `eidotter/tailwind.preset` that includes all tokens plus the React Aria + animate plugins. The enhanced subpath is now a deprecated alias that logs a one-time `console.warn` on load and will be removed in 0.21.0:

```diff
- presets: [require('eidotter/tailwind.preset.enhanced')]
+ presets: [require('eidotter/tailwind.preset')]
```

No behavior change — the merged preset already carries everything the enhanced preset used to add.

## Available Components (36)

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections (Section, AccordionFill) |
| Alert | Inline alert banner with featured icon, actions, and 6 color variants |
| Badge | Status indicators with variant support |
| Breadcrumb | Navigation path display |
| Button | DOS-style buttons (primary, secondary, ghost, link) |
| Card | Content container with variants (elevated, bordered, glow, interactive, minimal, callout) |
| ChatMessage | Chat message with role-based DOS styling and streaming cursor |
| ChatHistory | Scrollable message list with auto-scroll and `role="log"` |
| ChatInput | Multiline textarea with Enter-to-send |
| ChatContainer | Composes ChatHistory + ChatInput — place inside Terminal for DOS chat |
| Checkbox | DOS-style checkbox with `[X]` bracket indicator |
| CmdPalette | ⌘K / Ctrl+K command palette overlay with scored search + keyboard navigation |
| CommandPrompt | Interactive command-line input with blinking cursor |
| DosFigure | Demoscene-style painted-screen media placeholder with scanline sweep + optional pins |
| FilterBar | Multi-select toggle group for faceted filtering |
| Footer | Site footer with legal links (Impressum + Datenschutz) |
| Header | Sticky site header composing branding + Nav — retro/modern variants |
| Icon | SVG icons backed by pixelarticons (MIT) — authentic DOS pixel art |
| InlineExpand | Inline disclosure widget for expanding text within prose |
| InlineLink | In-flow navigational anchor — dotted underline, phosphor-invert hover, external variant |
| Input | Text input with DOS styling and error variant |
| Modal | Dialog overlay with title bar and close button |
| Nav | Responsive navigation with desktop/mobile variants |
| Notification | Toast popup with layered amber glow, auto-dismiss, and progress variant |
| Progress | DOS-style progress bar with block characters |
| RetroEffects | CRT effects (scanlines, noise, phosphor glow) |
| Separator | Horizontal/vertical divider |
| Stat | Key-value display for metrics and statistics |
| Switch | Toggle switch for on/off states |
| Tabs | Tabbed interface navigation |
| Tag | Interactive labels for tags, categories, and filter chips |
| Terminal | DOS window with title bar and content area |
| TextScramble | DOS text decode/scramble animation effect |
| TimelineContainer | Multi-zoom timeline with year/month/day/hour views |
| TimelineNode | Timeline/stepper axis markers with shapes and glow |
| Tokens | Design token reference display (Storybook only) |

## Component Examples

### Header

```tsx
<Header brandName="DMNC.TECH" items={navItems} variant="retro">
  {/* or use children for custom branding */}
</Header>
```

### Terminal

```tsx
<Terminal
  title="PROGRAM.EXE"
  size="medium"
  closeable
  onClose={() => console.log('closed')}
>
  <p>Terminal content here</p>
</Terminal>
```

### Button

```tsx
<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="ghost" loading>
  Processing...
</Button>
```

### Alert

```tsx
<Alert
  type="warning"
  title="Low Disk Space"
  onClose={() => {}}
>
  Drive C: has only 640KB remaining.
</Alert>
```

### Input

```tsx
<Input
  label="Filename"
  placeholder="Enter filename..."
/>

<Input
  variant="error"
  errorMessage="File not found"
  placeholder="Invalid path"
/>
```

### Checkbox

```tsx
<Checkbox label="Remember me" />
<Checkbox label="Accept terms" checked />
<Checkbox label="Select all" indeterminate />
```

### CommandPrompt

```tsx
<CommandPrompt
  prompt="C:\>"
  onCommand={(cmd) => console.log('Executing:', cmd)}
  autoFocus
/>
```

## Design Tokens

The library uses authentic CGA colors via CSS custom properties:

```css
--color-cga-amber: #FFB000;       /* Primary accent */
--color-cga-amber-bright: #FDCA9F;
--color-cga-amber-dim: #9A5700;
--color-cga-black: #020003;       /* Background */
/* ... full 16-color CGA palette */
```

### Theming

Apply themes via `data-theme` attribute:

```html
<div data-theme="amber-mono">
  <!-- Amber-on-black terminal aesthetic -->
</div>
```

Available themes: `amber-mono`, `cga-amber`, `cga-mode4-p0`, `cga-mode4-p1`, `cga-mode5`.

### Tailwind Token Classes

**CGA Colors:** `cga-black`, `cga-blue`, `cga-green`, `cga-cyan`, `cga-red`, `cga-magenta`, `cga-brown`, `cga-light-gray`, `cga-dark-gray`, `cga-bright-blue`, `cga-bright-green`, `cga-bright-cyan`, `cga-bright-red`, `cga-bright-magenta`, `cga-yellow`, `cga-white`, `cga-amber`, `cga-amber-bright`, `cga-amber-dim`

**Semantic Colors:** `dos-bg-primary`, `dos-bg-secondary`, `dos-text-primary`, `dos-text-accent`, `dos-border-default`, `dos-border-focus`, `dos-success`, `dos-warning`, `dos-error`, `dos-info`

**Typography:** `font-dos` (Flexi IBM VGA True v2), `text-dos-text-xs` through `text-dos-display-2xl`, `leading-dos-text-xs` through `leading-dos-display-2xl`

**Spacing:** 4px grid via design tokens

**Border Radius:** `rounded-dos-sm` (2px), `rounded-dos-base` (4px max)

## Development

```bash
npm install           # Install dependencies
npm run storybook     # Launch Storybook on port 6006
npm run build         # Production build
npm run test          # Run test suite
npm run lint          # ESLint
```

## Design Philosophy

The DOS aesthetic represents values we've lost in modern software:

- **Control** - Every command is explicit and intentional
- **Clarity** - Information presented without distraction
- **Personal Sovereignty** - Your tools, your way

eiDotter brings these values to modern interfaces while maintaining accessibility (WCAG AA) and usability standards. The authentic 16-color CGA palette plus amber phosphor variants creates that terminal feel without sacrificing readability.

Part of the **Timeline OS** ecosystem - a vision for personal data management along temporal, thematic, and social axes.

## License

CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0 International)
