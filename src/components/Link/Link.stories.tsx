import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

/**
 * The Link component is a DOS-style link that supports various states and can open URLs in new tabs.
 * It includes hover and active states with visual feedback, and supports disabled state.
 */
const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    docs: {
      description: {
        component: 'A DOS-style link component that provides visual feedback for different states and supports opening in new tabs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content of the link',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    openInNew: {
      control: 'boolean',
      description: 'Whether the link opens in a new tab',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    href: {
      control: 'text',
      description: 'The URL the link points to',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default state of the Link component with an icon indicating it opens in a new tab.
 */
export const Default: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true,
  },
};

/**
 * Link without the "open in new" icon, for internal navigation.
 */
export const WithoutIcon: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: false,
  },
};

/**
 * Example of how the link handles longer text content.
 */
export const LongText: Story = {
  args: {
    children: 'This is a very long link label that should wrap',
    href: 'https://example.com',
    openInNew: true,
  },
};

/**
 * The disabled state of the link, which prevents interaction and shows a muted appearance.
 */
export const Disabled: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true,
    disabled: true,
  },
}; 