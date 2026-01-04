# eiDotter - DOS Terminal Design System

A DOS-themed React component library with authentic CGA terminal aesthetics.

## Installation

```bash
npm install eidotter
# or
yarn add eidotter
# or
pnpm add eidotter
```

## Quick Start

```jsx
import { Terminal, Button, Alert } from 'eidotter';
import 'eidotter/dist/style.css';

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

## Available Components (v0.3.0)

| Component | Description |
|-----------|-------------|
| Accordion | Collapsible content sections |
| Alert | System notifications (info, success, warning, error) |
| Badge | Status indicators with variant support |
| Breadcrumb | Navigation path display |
| Button | DOS-style buttons with variants (primary, secondary, ghost, link) |
| Card | Content container with title, body, and optional footer |
| Checkbox | DOS-style checkbox with [X] indicator |
| CommandPrompt | Interactive command-line input with blinking cursor |
| Icon | SVG icon system with DOS styling |
| Input | Text input with DOS styling and error variant |
| Progress | DOS-style progress bar with block characters |
| RetroEffects | CRT effects (scanlines, noise, phosphor glow) |
| Switch | Toggle switch for on/off states |
| Tabs | Tabbed interface navigation |
| Terminal | DOS window with title bar, controls, and content area |
| TimelineNode | Timeline/stepper axis markers with shapes and glow |

## Component Examples

### Terminal

```jsx
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

```jsx
<Button variant="primary" size="medium">
  Click Me
</Button>

<Button variant="ghost" loading>
  Processing...
</Button>
```

### Alert

```jsx
<Alert
  type="warning"
  title="Low Disk Space"
  onClose={() => {}}
>
  Drive C: has only 640KB remaining.
</Alert>
```

### Input

```jsx
<Input
  placeholder="Enter filename..."
  variant="default"
/>

<Input
  variant="error"
  placeholder="Invalid path"
/>
```

### CommandPrompt

```jsx
<CommandPrompt
  prompt="C:\>"
  onCommand={(cmd) => console.log('Executing:', cmd)}
  autoFocus
/>
```

### Accordion

```jsx
<AccordionFill
  sections={[
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
  ]}
  defaultExpandedIndex={0}
/>
```

## Design Tokens

The library uses authentic CGA colors:

```css
--color-cga-black: #000000;
--color-cga-blue: #0000AA;
--color-cga-cyan: #00AAAA;
--color-cga-yellow: #FFFF55;
--color-cga-white: #FFFFFF;
--color-cga-amber: #FFBF00;
/* ... full 16-color CGA palette + amber */
```

### Theming

Apply the DOS amber theme (amber-on-black terminal aesthetic):

```html
<div data-theme="dos-amber">
  <!-- Components will use amber colors -->
</div>
```

Or via CSS class:

```html
<div class="theme-dos-amber">...</div>
```

## Tailwind CSS Integration

Use Eidotter tokens in Tailwind projects without importing React components.

### Setup

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

### Usage

```jsx
// CGA palette colors
<div className="bg-cga-black text-cga-yellow">
  DOS terminal content
</div>

// Semantic colors
<div className="bg-dos-bg-primary text-dos-text-accent">
  Using semantic tokens
</div>

// Typography
<p className="font-dos text-dos-base leading-dos-tight">
  Perfect DOS VGA 437 font
</p>
```

### Available Token Classes

**CGA Colors:** `cga-black`, `cga-blue`, `cga-green`, `cga-cyan`, `cga-red`, `cga-magenta`, `cga-brown`, `cga-light-gray`, `cga-dark-gray`, `cga-bright-blue`, `cga-bright-green`, `cga-bright-cyan`, `cga-bright-red`, `cga-bright-magenta`, `cga-yellow`, `cga-white`, `cga-amber`, `cga-amber-bright`, `cga-amber-dim`

**Semantic Colors:** `dos-bg-primary`, `dos-bg-secondary`, `dos-text-primary`, `dos-text-accent`, `dos-border-default`, `dos-border-focus`, `dos-success`, `dos-warning`, `dos-error`, `dos-info`

**Typography:** `font-dos`, `text-dos-xs` through `text-dos-4xl`, `leading-dos-tight/normal/loose`

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build

# Run tests
npm run test
```

## Planned Components

See [ROADMAP.md](./ROADMAP.md) for future components.

## Design Philosophy

The DOS aesthetic isn't nostalgia for nostalgia's sake. It represents values we've lost in modern software:

- **Control** - Every command is explicit and intentional
- **Clarity** - Information presented without distraction
- **Personal Sovereignty** - Your tools, your way

Eidotter brings these values to modern interfaces while maintaining accessibility (WCAG AA compliant) and usability standards. The authentic 16-color CGA palette plus amber phosphor variants creates that terminal feel without sacrificing readability.

Part of the **Timeline OS** ecosystem - a vision for personal data management along temporal, thematic, and social axes.

## License

CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0 International)
