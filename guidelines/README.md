# eidotter Design System

A DOS-themed React component library with authentic CGA/amber phosphor aesthetics.

## Overview

eidotter provides 32 ready-to-use components with consistent DOS terminal styling:

- **Dark theme only** - Amber-on-black phosphor CRT aesthetic
- **CGA color palette** - 16 authentic CGA colors + amber extensions
- **Monospace typography** - JetBrains Mono with system fallbacks
- **Minimal rounded corners** - 2-4px max (DOS aesthetic)
- **Phosphor glow effects** - Authentic CRT visual effects
- **React Aria** - Accessible keyboard/focus handling on interactive components

## Quick Start

```tsx
import { Button, Card, Input } from 'eidotter';
import 'eidotter/styles';      // Component CSS (includes Tailwind utilities)
import 'eidotter/tokens.css';  // CSS variable definitions (required)

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
| CommandPrompt | DOS command line display |
| FilterBar | Multi-select toggle group |
| Footer | Site footer with legal links |
| Icon | SVG icons backed by @untitledui-pro/icons |
| InlineExpand | Inline disclosure widget |
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

## Files in This Guide

- [components.md](./components.md) - When to use each component, props, examples
- [patterns.md](./patterns.md) - Common composition and layout patterns

## Integration

### CSS Import (required)

```tsx
import 'eidotter/styles';      // Component CSS (includes compiled Tailwind utilities)
import 'eidotter/tokens.css';  // Design token CSS variables

// Optional: import a theme
import 'eidotter/themes/amber-mono.css';
```

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
