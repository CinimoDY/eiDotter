import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav, DesktopNav, MobileNav } from './Nav';

const sampleItems = [
  { label: 'projects', href: '/projects' },
  { label: 'tiny ideas', href: '/blog' },
  { label: 'contact', href: '/contact' },
];

const meta = {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
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
      options: ['retro', 'modern'],
    },
    activeHref: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof Nav>;

export const RetroDesktop: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <DesktopNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
  ),
};

export const ModernDesktop: Story = {
  render: () => (
    <div style={{ padding: '16px', backgroundColor: '#fff' }}>
      <DesktopNav items={sampleItems} activeHref="/blog" variant="modern" />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light', values: [{ name: 'light', value: '#ffffff' }] },
  },
};

export const RetroMobile: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <MobileNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const FullNav: Story = {
  args: {
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
};
