import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

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
    design: {
      type: 'figma',
      url: 'YOUR_FIGMA_URL_HERE', // TODO: Replace with actual Figma URL
    },
  },
  tags: ['autodocs'],
  argTypes: {
    openInNew: {
      control: 'boolean',
      defaultValue: true,
      description: 'Whether the link opens in a new tab',
    },
    href: {
      control: 'text',
      defaultValue: 'https://example.com',
      description: 'The URL the link points to',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the link is disabled',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: false,
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a very long link label that should wrap',
    href: 'https://example.com',
    openInNew: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Link Label',
    href: 'https://example.com',
    openInNew: true,
    disabled: true,
  },
}; 