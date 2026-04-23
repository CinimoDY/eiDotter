import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { Button } from '../../Button/components/Button';
import { componentRegistry } from '@/components/registry';

const sampleItems = [
  { label: 'OVERVIEW', href: '/' },
  { label: 'TERMINAL', href: '/terminal' },
  { label: 'FILES',    href: '/files' },
  { label: 'SETTINGS', href: '/settings' },
  { label: 'HELP',     href: '/help' },
];

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
    projectMeta: componentRegistry['Header'],
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['retro', 'modern'] },
    sticky: { control: 'boolean' },
    brandName: { control: 'text' },
    user: { control: 'text' },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    brandName: 'eiDotter',
    items: sampleItems,
    activeHref: '/',
    user: 'OP',
  },
};

export const WithoutUser: Story = {
  args: {
    brandName: 'eiDotter',
    items: sampleItems,
    activeHref: '/terminal',
  },
};

export const ModernVariant: Story = {
  args: {
    brandName: 'eiDotter',
    items: sampleItems,
    activeHref: '/',
    user: 'OP',
    variant: 'modern',
  },
};

export const CustomBranding: Story = {
  args: {
    brandName: 'TIMELINE OS',
    brandHref: '/',
    brandIcon: <span style={{ fontSize: '1em' }}>◆</span>,
    items: sampleItems,
    activeHref: '/',
    user: 'GUEST',
  },
};

export const WithRightSlot: Story = {
  args: {
    brandName: 'eiDotter',
    items: sampleItems,
    activeHref: '/',
    children: (
      <>
        <Button variant="ghost" size="sm">SIGN IN</Button>
        <Button variant="primary" size="sm">LAUNCH</Button>
      </>
    ),
  },
};

export const BrandOnly: Story = {
  args: {
    brandName: 'eiDotter',
    user: 'OP',
  },
};

export const PageExample: Story = {
  render: () => (
    <div style={{ minHeight: '200vh', background: 'var(--color-semantic-background-primary)' }}>
      <Header brandName="eiDotter" items={sampleItems} activeHref="/" user="OP" />
      <div style={{ padding: '24px', color: 'var(--color-semantic-text-primary)', fontFamily: 'var(--typography-font-family-primary)' }}>
        <p>Scroll the frame to verify the sticky header stays pinned.</p>
      </div>
    </div>
  ),
};
