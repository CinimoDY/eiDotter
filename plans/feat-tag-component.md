# feat: Tag Component

## Overview

An interactive tag/chip component for displaying and managing labels on content. Extends Badge's display-only approach with click, close, and selection behaviors. Primary use case: tag management on Lifelines timeline entries, PARA category indicators, and any labeled content across the portfolio.

## Motivation

Eidotter has Badge for static status indicators, but nothing for interactive labels that users can add, remove, or click. Lifelines entries have both `tags[]` and `para` categories — both need visual representation with different interaction affordances:

- **Tags**: closeable chips the user can remove (`untag`)
- **PARA label**: clickable indicator that could open a category picker or filter

This component bridges the gap between "display a label" (Badge) and "interact with a label" (Tag).

## Design Decisions

### Tag vs Badge

| Concern | Badge | Tag |
|---------|-------|-----|
| Purpose | Status indicator | Content label |
| Interactive | No | Yes (click, close, select) |
| Element | `<span>` | `<button>` or `<span>` with `<button>` close |
| Focusable | No | Yes |
| Removable | No | Yes (optional close button) |

### Visual Treatment

Tags use the same CGA color system as Badge but with interaction affordances:

- **Default**: outlined, like Badge `--default`
- **Colored**: consumer provides a color token for the border/text
- **Selected**: filled background (like Tabs pills active state)
- **Closeable**: small `[x]` button at the end, DOS-style

### Close Button Style

DOS-authentic close affordance: `[x]` in square brackets, matching the Terminal window controls pattern. Not a rounded circle — that breaks the aesthetic.

## Acceptance Criteria

- [ ] Tag component for displaying interactive labels
- [ ] Variants: `default`, `outlined`, `filled`
- [ ] Optional close button with `onClose` callback
- [ ] Optional `selected` state for toggle behavior
- [ ] Optional `color` prop for custom CGA color
- [ ] Click handler (`onClick`) for navigation/filtering
- [ ] Keyboard accessible (Enter/Space to click, Delete/Backspace to close)
- [ ] TagGroup wrapper for rendering multiple tags with consistent spacing
- [ ] BEM CSS using design tokens only
- [ ] TypeScript interface with JSDoc on each prop
- [ ] Storybook stories (variants, closeable, selectable, TagGroup, PARA labels)
- [ ] Jest tests (80%+ coverage)
- [ ] WCAG 2.1 AA compliant

## Implementation

### TagProps Interface

```typescript
export interface TagProps {
  /** Tag display text */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'outlined' | 'filled';
  /** The size of the tag */
  size?: 'small' | 'medium';
  /** Optional CGA color token for border and text (e.g. '--color-cga-bright-cyan') */
  color?: string;
  /** Whether the tag appears in selected/active state */
  selected?: boolean;
  /** Whether to show a close button */
  closeable?: boolean;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Click handler for the tag body */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Close handler, called when close button is clicked or Delete key pressed */
  onClose?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => void;
  /** Optional CSS class name */
  className?: string;
  /** Accessible label for the tag */
  'aria-label'?: string;
}

export interface TagGroupProps {
  /** Tag elements to render */
  children: React.ReactNode;
  /** Spacing between tags */
  gap?: 'tight' | 'normal' | 'loose';
  /** Wrap tags to multiple lines. Default: true */
  wrap?: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Accessible label for the tag group */
  'aria-label'?: string;
}
```

### File Structure

```
src/components/Tag/
├── components/
│   ├── Tag.tsx
│   ├── TagGroup.tsx
│   ├── Tag.css
│   ├── Tag.stories.tsx
│   ├── Tag.test.tsx
│   └── index.ts
└── index.ts
```

### CSS Classes (BEM)

Tag:
- `.tag` — base element
- `.tag--default/outlined/filled` — visual variants
- `.tag--small/medium` — sizes
- `.tag--selected` — active/selected state
- `.tag--disabled` — disabled state
- `.tag--closeable` — has close button (extra padding-right)
- `.tag--interactive` — has onClick (cursor: pointer)
- `.tag__content` — text content span
- `.tag__close` — close button `[x]`

TagGroup:
- `.tag-group` — flex container
- `.tag-group--tight/normal/loose` — gap variants
- `.tag-group--nowrap` — single line with overflow

### Variant Styles

```css
/* Default: subtle border, transparent background */
.tag--default {
  background: transparent;
  color: var(--color-semantic-text-primary);
  border: 1px solid var(--color-semantic-border-default);
}

/* Outlined: colored border and text, transparent background */
.tag--outlined {
  background: transparent;
  /* color and border-color set via custom property or variant */
}

/* Filled: colored background, dark text */
.tag--filled {
  /* background set via custom property, text is secondary */
  color: var(--color-semantic-text-secondary);
}

/* Selected state: invert — filled background with glow */
.tag--selected {
  background-color: var(--color-semantic-background-accent);
  color: var(--color-semantic-text-secondary);
  box-shadow: var(--shadow-glow-xs);
}
```

### Custom Color Support

The `color` prop sets a CSS custom property on the element:

```tsx
<span
  className={tagClasses}
  style={color ? { '--tag-color': `var(${color})` } as React.CSSProperties : undefined}
>
```

```css
.tag--outlined {
  color: var(--tag-color, var(--color-semantic-text-primary));
  border-color: var(--tag-color, var(--color-semantic-border-default));
}
```

### Keyboard Interaction

- `Enter` / `Space` — trigger `onClick` (if present)
- `Delete` / `Backspace` — trigger `onClose` (if closeable)
- Tag with `onClick` gets `role="button"` and `tabIndex={0}`
- Close button is a separate focusable element within the tag

### Close Button Markup

```html
<span class="tag tag--closeable">
  <span class="tag__content">label</span>
  <button class="tag__close" aria-label="Remove label" tabindex="-1">
    [x]
  </button>
</span>
```

The close button uses `tabindex="-1"` so focus stays on the tag; pressing Delete triggers close. The button is still clickable with mouse.

## Storybook Stories

1. **Default** — basic tag
2. **Variants** — default, outlined, filled side by side
3. **Closeable** — tags with close buttons, log onClose
4. **Selectable** — toggle selected state on click
5. **WithColors** — PARA category tags with custom CGA colors
6. **TagGroup** — multiple tags in a group, different gap sizes
7. **Interactive** — clickable tags that filter content
8. **Sizes** — small and medium
9. **TimelineEntry** — real-world example: tags + PARA label on an entry

## Lifelines Integration Examples

### Entry tags

```tsx
import { Tag, TagGroup } from 'eidotter';

<TagGroup gap="tight">
  {entry.tags.map(tag => (
    <Tag key={tag} size="small" closeable onClose={() => untag(entry.id, tag)}>
      {tag}
    </Tag>
  ))}
</TagGroup>
```

### PARA category indicator

```tsx
const paraColors: Record<string, string> = {
  project: '--color-cga-bright-cyan',
  area: '--color-cga-bright-green',
  resource: '--color-cga-yellow',
  archive: '--color-cga-brown',
};

{entry.para && (
  <Tag
    variant="filled"
    size="small"
    color={paraColors[entry.para]}
    onClick={() => setParaFilter(entry.para)}
  >
    {entry.para}
  </Tag>
)}
```

## References

- Badge pattern: `src/components/Badge/components/Badge.tsx`
- Button pattern (keyboard + click): `src/components/Button/components/Button.tsx`
- Terminal close button: `src/components/Terminal/components/Terminal.tsx`
- WAI-ARIA Chip: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- Tokens: `src/styles/tokens.css`
