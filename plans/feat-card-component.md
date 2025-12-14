# feat: Card Component

## Overview

Create a DOS-themed Card component for displaying content in a bordered container. Follows existing Alert/Button patterns.

## Acceptance Criteria

- [ ] Card component with title, content, and optional footer
- [ ] BEM CSS using design tokens
- [ ] TypeScript interface with JSDoc
- [ ] Storybook stories
- [ ] Jest tests

## Implementation

### CardProps Interface

```typescript
export interface CardProps {
  /** Optional card title displayed in header */
  title?: string;
  /** Card content */
  children: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'bordered';
  /** Additional CSS class */
  className?: string;
}
```

### File Structure

```
src/components/Card/
├── components/
│   ├── Card.tsx
│   ├── Card.css
│   ├── Card.stories.tsx
│   ├── Card.test.tsx
│   └── index.ts
└── index.ts
```

### CSS Classes (BEM)

- `.card` - base container
- `.card--elevated` - with shadow
- `.card--bordered` - stronger border
- `.card__header` - title area
- `.card__body` - content area
- `.card__footer` - footer area

## References

- Button pattern: `/mnt/d/Coding/eidotter/src/components/Button/components/Button.tsx`
- Alert pattern: `/mnt/d/Coding/eidotter/src/components/Alert/components/Alert.tsx`
- Tokens: `/mnt/d/Coding/eidotter/src/styles/tokens.css`
