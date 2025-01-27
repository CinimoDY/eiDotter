# Link Component

A DOS-style link component that supports various states and can open URLs in new tabs.

## Features

- DOS-inspired design with retro aesthetics
- Support for opening links in new tabs with icon indicator
- Multiple states: default, hover, active, and disabled
- Accessible with proper ARIA attributes
- Customizable through props

## Usage

```tsx
import { Link } from './components/Link';

// Basic usage
<Link href="https://example.com">Link Text</Link>

// Open in same tab
<Link href="https://example.com" openInNew={false}>Link Text</Link>

// Disabled state
<Link href="https://example.com" disabled>Link Text</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The text content of the link |
| className | string | - | Optional CSS class name |
| href | string | - | The URL the link points to |
| openInNew | boolean | true | Whether to open the link in a new tab |
| disabled | boolean | false | Whether the link is disabled |
| onClick | function | - | Optional click handler |

## States

- **Default**: Yellow text with underline and optional "open in new" icon
- **Hover**: Bright yellow text with icon glow effect
- **Active**: Orange text with adjusted icon
- **Disabled**: Gray text with disabled icon and no interactions

## Design Tokens

The component uses the following design tokens:

- Font: Perfect DOS VGA 437
- Colors: 
  - Default: var(--color-dos-yellow)
  - Hover: #FFD700
  - Active: #FFB000
  - Disabled: #AAADB1 (text), #66696D (icon) 