import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'accent'],
      defaultValue: 'default'
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium'
    },
    dot: {
      control: 'boolean',
      defaultValue: false
    },
    children: {
      control: 'text',
      defaultValue: 'Badge'
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// Default badge
export const Default: Story = {
  args: {
    children: 'Default',
  },
};

// All variants
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium',
  },
};

// With dot
export const WithDot: Story = {
  args: {
    dot: true,
    children: 'Active',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
  ),
};

// With dots
export const AllWithDots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="default" dot>Default</Badge>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="info" dot>Syncing</Badge>
      <Badge variant="accent" dot>Active</Badge>
    </div>
  ),
};

// Real-world examples (like in Pomodoke Calendar)
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#AAAAAA', fontSize: '12px' }}>Priority:</span>
        <Badge variant="error" size="small">High</Badge>
        <Badge variant="warning" size="small">Medium</Badge>
        <Badge variant="default" size="small">Low</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#AAAAAA', fontSize: '12px' }}>Source:</span>
        <Badge variant="accent" size="small">Claude</Badge>
        <Badge variant="default" size="small">Manual</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#AAAAAA', fontSize: '12px' }}>Scope:</span>
        <Badge variant="info" size="small">Personal</Badge>
        <Badge variant="success" size="small">Work</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#AAAAAA', fontSize: '12px' }}>Status:</span>
        <Badge variant="success" dot size="small">Online</Badge>
        <Badge variant="error" dot size="small">Offline</Badge>
        <Badge variant="warning" dot size="small">Away</Badge>
      </div>
    </div>
  ),
};
