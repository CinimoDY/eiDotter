import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const sampleItems = [
  { label: 'projects', href: '/projects' },
  { label: 'tiny ideas', href: '/blog' },
  { label: 'contact', href: '/contact' },
];

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['retro', 'modern'],
    },
    sticky: {
      control: 'boolean',
    },
    activeHref: {
      control: 'text',
    },
    brandHref: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const RetroHeader: Story = {
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
};

export const ModernHeader: Story = {
  args: {
    brandName: 'Dominic Kennedy',
    items: sampleItems,
    activeHref: '/blog',
    variant: 'modern',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
  },
};

export const CustomBranding: Story = {
  args: {
    items: [
      { label: 'components', href: '/components' },
      { label: 'storybook', href: '/storybook' },
      { label: 'github', href: '/github' },
    ],
    activeHref: '/components',
    variant: 'retro',
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true">&#x1F95A;</span>
        <span>eiDotter</span>
      </span>
    ),
  },
};

export const MobileHeader: Story = {
  args: {
    brandName: 'RIZOMORF',
    items: [
      { label: 'work', href: '/work' },
      { label: 'projects', href: '/projects' },
      { label: 'blog', href: '/blog' },
      { label: 'contact', href: '/contact' },
    ],
    activeHref: '/work',
    variant: 'retro',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const FullHeader: Story = {
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    sticky: true,
  },
};
