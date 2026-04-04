import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
    projectMeta: componentRegistry['Badge'],
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'accent', 'brand', 'blue', 'indigo', 'purple', 'pink', 'orange'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };
export const Success: Story = { args: { variant: 'success', children: 'Online' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } };
export const Error: Story = { args: { variant: 'error', children: 'Offline' } };
export const Info: Story = { args: { variant: 'info', children: 'New' } };
export const Accent: Story = { args: { variant: 'accent', children: 'Featured' } };
export const WithDot: Story = { args: { dot: true, children: 'Active' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge dot variant="default">Active</Badge>
      <Badge dot variant="success">Online</Badge>
      <Badge dot variant="warning">Idle</Badge>
      <Badge dot variant="error">Offline</Badge>
      <Badge dot variant="info">Syncing</Badge>
    </div>
  ),
};

export const V37Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="indigo">Indigo</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="orange">Orange</Badge>
    </div>
  ),
};
