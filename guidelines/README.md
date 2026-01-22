# eidotter Design System

A DOS-themed React component library with authentic CGA/amber phosphor aesthetics.

## Overview

eidotter provides 18 ready-to-use components with consistent DOS terminal styling:

- **Dark theme only** - Amber-on-black phosphor CRT aesthetic
- **CGA color palette** - 16 authentic CGA colors + amber extensions
- **Monospace typography** - JetBrains Mono with system fallbacks
- **Minimal rounded corners** - 2-4px max (DOS aesthetic)
- **Phosphor glow effects** - Authentic CRT visual effects

## Quick Start

```tsx
import { Button, Card, Input } from 'eidotter';
import 'eidotter/styles';

function App() {
  return (
    <Card title="Login">
      <Input placeholder="Username" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Available Components

| Component | Purpose |
|-----------|---------|
| Alert | Dismissible notification messages |
| Badge | Status indicators and tags |
| Breadcrumb | Navigation path display |
| Button | User actions and form submission |
| Card | Content container with optional header/footer |
| Checkbox | Boolean form inputs |
| CommandPrompt | DOS command line display |
| Icon | 89 DOS-styled icons |
| Input | Text entry fields |
| Modal | Dialog overlays |
| Progress | Loading and completion bars |
| RetroEffects | CRT scanlines and phosphor glow |
| Section | Collapsible accordion item |
| AccordionFill | Grouped collapsible sections |
| Stat | Metric display with trends |
| Switch | Toggle controls |
| Tabs | Tab-based navigation |
| Terminal | Window container with title bar |
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
- [tokens.md](./tokens.md) - Color palette, typography, spacing reference
- [patterns.md](./patterns.md) - Common composition and layout patterns

## Integration

### CSS Import

```css
@import "eidotter/tokens.css";
@import "eidotter/styles";

:root { color-scheme: dark; }
html { background: var(--color-semantic-background-primary); }
body {
  color: var(--color-semantic-text-primary);
  font-family: var(--typography-font-family-primary);
}
```

### Tailwind Preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset.cjs')],
}
```

## Anti-Patterns

These patterns break the eidotter aesthetic:

- Hardcoded hex colors (`color: #FFB000`)
- Light backgrounds
- Sans-serif fonts
- Rounded corners > 4px (`rounded-xl`, `rounded-full`)
- `prefers-color-scheme` (eidotter is dark-only)
- Arbitrary Tailwind values for colors (`bg-[#1a1a1a]`)
