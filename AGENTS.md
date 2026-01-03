# AGENTS.md

Guidelines for AI coding agents working in the eiDotter repository.

## Project Overview

eiDotter is a DOS-themed React component library built with TypeScript, providing authentic DOS/CGA terminal aesthetics for the Timeline OS / Lifelin ecosystem.

## Commands

```bash
# Development
npm run dev                          # Vite dev server
npm run storybook                    # Storybook on port 6006

# Testing
npm run test                         # Run all tests
npm run test -- --watch              # Watch mode
npm run test -- Button.test.tsx      # Single test file
npm run test -- --testPathPattern="Button"  # Pattern matching

# Build
npm run build                        # TypeScript + Vite production build
npm run build-storybook              # Build static Storybook to /docs
npm run build-tokens                 # Regenerate tokens.css from JSON

# Scaffolding
npm run create-component <Name>      # Generate component (PascalCase required)
```

## Component Structure

```
src/components/ComponentName/
├── index.ts                         # Re-exports from components/
└── components/
    ├── ComponentName.tsx            # Main component with JSDoc props
    ├── ComponentName.stories.tsx    # Storybook stories
    ├── ComponentName.test.tsx       # Jest + RTL tests
    ├── ComponentName.css            # BEM-style CSS using tokens
    └── index.ts                     # Component + type exports
```

## Code Style

### TypeScript / React

```tsx
export interface ButtonProps {
  /** JSDoc on every prop */
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props  // Always spread remaining props
}) => {
  // BEM classes with array + filter + join pattern
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');
  return <button className={classes} {...props}>{children}</button>;
};
```

### Import Order

1. React → 2. Third-party → 3. Local components (relative paths) → 4. CSS files

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../Icon/components/Icon';
import './Button.css';
```

### CSS

- BEM naming: `.component`, `.component--variant`, `.component__element`
- Use design tokens via CSS variables (never hardcode colors/spacing)
- Include `@media (prefers-reduced-motion: reduce)` and `@media (prefers-contrast: high)`
- Focus styles: `:focus-visible` with `outline` and `outline-offset`

### Design Tokens

Source: `src/tokens/*.tokens.json` → Output: `src/styles/tokens.css`
**Never edit tokens.css directly** - modify JSON and run `npm run build-tokens`.

Token patterns: `--color-cga-*`, `--color-semantic-*`, `--typography-*`, `--spacing-*`

## Testing

Jest + React Testing Library. 80% coverage threshold enforced.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## Storybook Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = { args: { children: 'Button' } };
```

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CommandPrompt` |
| Props interfaces | ComponentNameProps | `CommandPromptProps` |
| CSS classes | kebab-case BEM | `command-prompt--active` |
| Design tokens | kebab-case | `--color-semantic-text-primary` |

## Accessibility

- ARIA attributes on interactive elements (`aria-label`, `aria-disabled`)
- Keyboard navigation (Tab, Enter, Space)
- Focus-visible outlines: 2px solid `--color-semantic-border-focus`
- High contrast mode support

## Error Handling

- Optional chaining for handlers: `onClick?.(event)`
- Guard disabled/loading states in handlers
- Provide sensible defaults for optional props

## Exports

All components export from `src/index.ts`:

```ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

**Path Alias**: `@` maps to `./src` in Vite and TypeScript configs.
