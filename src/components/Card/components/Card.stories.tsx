import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['Card'],
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'bordered', 'glow', 'interactive', 'minimal', 'callout'],
    },
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'CARD.TXT',
    children: 'This is a DOS-themed card component for displaying content.',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'ELEVATED.EXE',
    children: 'An elevated card with a drop shadow effect.',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    title: 'BORDERED.SYS',
    children: 'A card with yellow accent border.',
  },
};

export const Glow: Story = {
  args: {
    variant: 'glow',
    title: 'PHOSPHOR.CRT',
    children: 'A card with amber phosphor glow effect.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'FILE.DAT',
    children: 'Card content goes here.',
    footer: <span>Press any key to continue...</span>,
  },
};

export const NoTitle: Story = {
  args: {
    children: 'A card without a title header.',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: 'A theme-aware card with hover state for clickable content.',
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: 'A simple content container — just border and background.',
  },
};

export const Callout: Story = {
  args: {
    variant: 'callout',
    children: 'A left-accent card for quotes, key insights, and highlighted content.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card title="DEFAULT">Default variant</Card>
      <Card title="ELEVATED" variant="elevated">Elevated variant</Card>
      <Card title="BORDERED" variant="bordered">Bordered variant</Card>
      <Card title="GLOW" variant="glow">Glow variant</Card>
      <Card variant="interactive">Interactive variant</Card>
      <Card variant="minimal">Minimal variant</Card>
      <Card variant="callout">Callout variant</Card>
    </div>
  ),
};
