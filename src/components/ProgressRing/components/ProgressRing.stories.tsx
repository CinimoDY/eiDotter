import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressRing } from './ProgressRing';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/ProgressRing',
  component: ProgressRing,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['ProgressRing'],
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number' } },
    size: { control: { type: 'range', min: 24, max: 256, step: 4 } },
    thickness: { control: { type: 'range', min: 2, max: 32, step: 1 } },
    segments: { control: { type: 'range', min: 3, max: 48, step: 1 } },
    color: { control: 'color' },
    showLabel: { control: 'boolean' },
    glow: { control: 'boolean' },
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: { value: 62, size: 96 },
};

export const WithLabel: Story = {
  args: { value: 62, size: 96, showLabel: true },
};

export const Glow: Story = {
  args: { value: 75, size: 96, glow: true, showLabel: true },
};

export const States: Story = {
  name: 'States: 0% → 100%',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <ProgressRing key={v} value={v} size={72} showLabel />
      ))}
    </div>
  ),
};

export const SegmentCounts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ProgressRing value={50} size={80} segments={8} />
      <ProgressRing value={50} size={80} segments={16} />
      <ProgressRing value={50} size={80} segments={24} />
    </div>
  ),
};

export const CustomColor: Story = {
  args: { value: 66, size: 96, color: '#55FF55', showLabel: true },
};

export const Thick: Story = {
  args: { value: 80, size: 120, thickness: 18, segments: 12, glow: true },
};
