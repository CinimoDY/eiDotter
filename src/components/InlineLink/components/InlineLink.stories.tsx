import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineLink } from './InlineLink';
import { InlineExpand } from '../../InlineExpand/components/InlineExpand';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/InlineLink',
  component: InlineLink,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
    projectMeta: componentRegistry['InlineLink'],
  },
  tags: ['autodocs'],
  argTypes: {
    showGlyph: { control: 'boolean' },
    external: { control: 'boolean' },
    href: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof InlineLink>;

export const Basic: Story = {
  args: {
    href: '/about',
    children: 'More about me',
  },
};

export const External: Story = {
  args: {
    href: 'https://github.com/CinimoDY/eiDotter',
    children: 'View on GitHub',
    external: true,
  },
};

export const NoGlyph: Story = {
  args: {
    href: '/about',
    children: 'About',
    showGlyph: false,
  },
};

const prose: React.CSSProperties = {
  maxWidth: '56ch',
  color: 'var(--color-semantic-text-primary)',
  fontFamily: 'var(--typography-font-family-primary)',
  fontSize: '16px',
  lineHeight: 1.6,
};

export const InProse: Story = {
  render: () => (
    <p style={prose}>
      This page uses a mix of inline patterns.{' '}
      <InlineLink href="/timeline">Explore Timeline OS</InlineLink>
      {' '}is a destination — it takes you to another route. But if you want a
      quick explanation without leaving this page,{' '}
      <InlineExpand content="Timeline OS is a personal OS for your life — a unified timeline of work, projects, and history. Powered by eidotter.">
        tap here to reveal it inline
      </InlineExpand>
      . Both are valid; pick based on whether the user should stay or go.
    </p>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div style={{ ...prose, display: 'grid', gap: '12px' }}>
      <p><InlineLink href="/about">Internal link</InlineLink></p>
      <p><InlineLink href="/about" showGlyph={false}>No trailing glyph</InlineLink></p>
      <p><InlineLink href="https://example.com" external>External destination</InlineLink></p>
      <p style={{ opacity: 0.8 }}>
        Hover each to see phosphor inversion (amber background, dark text,
        glyph nudge). Focus is visible with a 2px ring.
      </p>
    </div>
  ),
};
