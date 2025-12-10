# eiDotter - DOS Terminal Design System

A DOS-themed React component library with authentic CGA terminal aesthetics.

## Installation

```bash
npm install eidotter
# or
yarn add eidotter
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

## Available Components (v0.2.1)

| Component | Description |
|-----------|-------------|
| Alert | System notifications (info, success, warning, error) |
| Button | DOS-style buttons with variants (primary, secondary, ghost, link) |
| CommandPrompt | Interactive command-line input with blinking cursor |
| Icon | SVG icon system with DOS styling |
| Input | Text input with DOS styling and error variant |
| Section | Collapsible content section (accordion item) |
| AccordionFill | Accordion container for multiple sections |
| Terminal | DOS window with title bar, controls, and content area |

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

## License

CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0 International)
