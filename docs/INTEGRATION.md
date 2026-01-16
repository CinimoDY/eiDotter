# Eidotter Integration Guide

How to integrate eidotter into your project.

## Installation

```bash
npm install eidotter
```

## Framework Setup

### Next.js (App Router)

**1. Configure Tailwind**
```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/eidotter/dist/**/*.{js,mjs}',
  ],
}
```

**2. Import styles**
```css
/* app/globals.css */
@import "eidotter/tokens.css";
@import "eidotter/styles";

:root {
  color-scheme: dark;
}

html {
  background: var(--color-semantic-background-primary);
}

body {
  color: var(--color-semantic-text-primary);
  font-family: var(--typography-font-family-primary);
}
```

**3. Use components**
```tsx
// app/page.tsx
import { Button, Card, Badge } from 'eidotter';

export default function Page() {
  return (
    <Card title="Welcome">
      <p>DOS-themed content</p>
      <Button variant="primary">Click me</Button>
      <Badge variant="success">Online</Badge>
    </Card>
  );
}
```

### Vite + React

**1. Configure Tailwind**
```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/eidotter/dist/**/*.{js,mjs}',
  ],
}
```

**2. Import styles**
```css
/* src/index.css */
@import "eidotter/tokens.css";
@import "eidotter/styles";

:root {
  color-scheme: dark;
}

html {
  background: var(--color-semantic-background-primary);
}

body {
  color: var(--color-semantic-text-primary);
  font-family: var(--typography-font-family-primary);
}
```

**3. Import in main.tsx**
```tsx
import './index.css'
import { Button } from 'eidotter'
```

### Without Tailwind

You can use eidotter without Tailwind by importing CSS directly:

```css
/* Your CSS file */
@import "eidotter/tokens.css";
@import "eidotter/styles";
```

All component styles are included. Use CSS custom properties for custom styling:

```css
.my-custom-element {
  background: var(--color-semantic-background-secondary);
  border: 1px solid var(--color-semantic-border-default);
  color: var(--color-semantic-text-primary);
  padding: var(--spacing-4);
  font-family: var(--typography-font-family-primary);
}
```

---

## Font Setup

Eidotter uses JetBrains Mono. Install it for best results:

### Option 1: Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
```

### Option 2: Next.js Font
```tsx
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html className={mono.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Option 3: Self-hosted
Download from [JetBrains](https://www.jetbrains.com/lp/mono/) and add to your project.

---

## Component Import Patterns

### Named imports (recommended)
```tsx
import { Button, Card, Badge, Tabs } from 'eidotter';
```

### Type imports
```tsx
import type { ButtonProps, CardProps, TabItem } from 'eidotter';
```

### Default patterns
```tsx
import {
  Button,
  Card,
  Badge,
  Tabs,
  Alert,
  Input,
  Checkbox,
  Switch,
  Progress,
  Modal,
  Breadcrumb,
  Icon,
  Terminal,
  CommandPrompt,
  TimelineNode,
  RetroEffects,
  Section,      // Accordion item
  AccordionFill, // Accordion container
  Stat,
} from 'eidotter';
```

---

## Common Patterns

### Page Layout
```tsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dos-bg-primary text-dos-text-primary font-dos">
      <header className="border-b border-dos-border-default p-dos-4">
        <h1 className="text-dos-text-accent">My App</h1>
      </header>
      <main className="p-dos-4">
        {children}
      </main>
    </div>
  );
}
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-dos-4">
  <Card title="Card 1">Content</Card>
  <Card title="Card 2">Content</Card>
  <Card title="Card 3">Content</Card>
</div>
```

### Form
```tsx
<form className="space-y-dos-4">
  <Input label="Username" placeholder="Enter username" />
  <Input label="Password" type="password" />
  <Checkbox label="Remember me" />
  <Button type="submit" variant="primary">Login</Button>
</form>
```

### Navigation Tabs
```tsx
const tabs: TabItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'settings', label: 'Settings' },
  { id: 'about', label: 'About' },
];

<Tabs
  items={tabs}
  activeTab="home"
  onTabChange={(id) => setActiveTab(id)}
/>
```

### Stats Dashboard
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-dos-4">
  <Stat label="Users" value="1,234" trend="up" trendValue="+12%" />
  <Stat label="Revenue" value="$5.6k" trend="up" trendValue="+8%" />
  <Stat label="Orders" value="89" trend="neutral" trendValue="0%" />
  <Stat label="Errors" value="3" trend="down" trendValue="-2" />
</div>
```

### Alert Messages
```tsx
<Alert type="info" title="Note">
  This is informational content.
</Alert>

<Alert type="success" title="Success" dismissible onDismiss={() => {}}>
  Operation completed successfully.
</Alert>

<Alert type="error" title="Error">
  Something went wrong.
</Alert>
```

### Modal Dialog
```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex gap-dos-2 mt-dos-4">
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

---

## Theming

Apply a theme with the `data-theme` attribute:

```html
<!-- Default amber monochrome -->
<html>

<!-- CGA Mode 4 Palette 1 (cyan/magenta/white) -->
<html data-theme="cga-mode4-p1">

<!-- CGA Mode 4 Palette 0 (green/red/yellow) -->
<html data-theme="cga-mode4-p0">

<!-- CGA Mode 5 (cyan/red/white) -->
<html data-theme="cga-mode5">
```

Import additional theme CSS:
```css
@import "eidotter/tokens.css";
@import "eidotter/styles";

/* Optional: import additional themes */
/* Theme CSS files override the base tokens */
```

---

## TypeScript Support

Eidotter is fully typed. Import types as needed:

```tsx
import type {
  ButtonProps,
  CardProps,
  BadgeProps,
  TabsProps,
  TabItem,
  AlertProps,
  InputProps,
  ModalProps,
  StatProps,
  IconProps,
} from 'eidotter';
```

---

## Troubleshooting

### Components not styled
Make sure you import both tokens and styles:
```css
@import "eidotter/tokens.css";
@import "eidotter/styles";
```

### Tailwind classes not working
Add eidotter to your content paths:
```js
content: [
  // ... your paths
  './node_modules/eidotter/dist/**/*.{js,mjs}',
]
```

### Font not loading
Install JetBrains Mono or the system will fall back to Consolas/Monaco.

### Colors look wrong
Ensure `color-scheme: dark` is set:
```css
:root { color-scheme: dark; }
```

### Build errors with ESM
Eidotter uses ESM. If you have issues, ensure your bundler supports it or use the UMD build.

---

## Links

- [npm package](https://www.npmjs.com/package/eidotter)
- [GitHub](https://github.com/CinimoDY/eiDotter)
- [Storybook](https://cinimody.github.io/eiDotter)
- [Token Reference](./TOKENS.md)
