---
module: Eidotter Design System
date: 2025-12-14
problem_type: build_pattern
component: react_components
symptoms:
  - "Need consistent component structure"
  - "New components must follow established patterns"
root_cause: documentation
severity: minor
tags: [components, react, patterns, typescript]
---

# Eidotter Component Creation Pattern

## Pattern Overview

All Eidotter components follow this structure:

```
src/components/ComponentName/
├── components/
│   ├── ComponentName.tsx        # Main component
│   ├── ComponentName.css        # BEM styles
│   ├── ComponentName.stories.tsx # Storybook
│   ├── ComponentName.test.tsx   # Jest tests
│   └── index.ts                 # Re-exports
└── index.ts                     # Public API
```

## TypeScript Interface Pattern

```typescript
export interface ComponentProps {
  /**
   * JSDoc description for every prop
   */
  variant?: 'default' | 'alternate';
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'component',
    `component--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
```

## CSS Pattern (BEM)

```css
/* Block */
.component {
  font-family: var(--typography-font-family-primary);
  color: var(--color-cga-light-gray);
}

/* Modifier */
.component--elevated {
  box-shadow: 4px 4px 0 0 var(--color-cga-dark-gray);
}

/* Element */
.component__header {
  background-color: var(--color-cga-blue);
}

/* State */
.component--disabled {
  opacity: 0.6;
}
```

## Storybook Pattern

```typescript
const meta = {
  title: 'Components/ComponentName',
  component: Component,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;
```

## Export Pattern

```typescript
// components/index.ts
export { Component } from './Component';
export type { ComponentProps } from './Component';

// ComponentName/index.ts
export { Component } from './components';
export type { ComponentProps } from './components';
```

## Components Built Using This Pattern

| Component | Variants | Notes |
|-----------|----------|-------|
| Card | default, elevated, bordered | Title, body, footer slots |
| Progress | default, success, warning, error | Block characters █░ |
| Checkbox | default only | DOS-style [X] / [ ] |

## Cross-References

- Button example: `src/components/Button/components/Button.tsx`
- Alert example: `src/components/Alert/components/Alert.tsx`
- Design tokens: `src/styles/tokens.css`
