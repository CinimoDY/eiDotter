import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
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
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    trackStyle: {
      control: 'select',
      options: ['block', 'bordered', 'gradient'],
    },
    blocks: {
      control: { type: 'range', min: 3, max: 80, step: 1 },
    },
    showLabel: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
  },
};

export const Warning: Story = {
  args: {
    value: 60,
    variant: 'warning',
    showLabel: true,
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
    showLabel: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Progress value={80} showLabel />
      <Progress value={100} variant="success" showLabel />
      <Progress value={60} variant="warning" showLabel />
      <Progress value={25} variant="error" showLabel />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Progress value={50} size="small" showLabel />
      <Progress value={50} size="medium" showLabel />
      <Progress value={50} size="large" showLabel />
    </div>
  ),
};

// === Track Style Variants ===

export const TrackStyleBlock: Story = {
  name: 'Track: Block (Default)',
  args: {
    value: 60,
    trackStyle: 'block',
    showLabel: true,
  },
};

export const TrackStyleBordered: Story = {
  name: 'Track: Bordered',
  args: {
    value: 60,
    trackStyle: 'bordered',
    showLabel: true,
  },
};

export const TrackStyleGradient: Story = {
  name: 'Track: Gradient',
  args: {
    value: 60,
    trackStyle: 'gradient',
    showLabel: true,
  },
};

export const AllTrackStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>block (default)</div>
        <Progress value={60} trackStyle="block" showLabel />
      </div>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>bordered</div>
        <Progress value={60} trackStyle="bordered" showLabel />
      </div>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>gradient</div>
        <Progress value={60} trackStyle="gradient" showLabel />
      </div>
    </div>
  ),
};

// === Glow ===

export const Glow: Story = {
  args: {
    value: 70,
    glow: true,
    showLabel: true,
  },
};

export const GlowVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Progress value={80} glow showLabel />
      <Progress value={100} variant="success" glow showLabel />
      <Progress value={60} variant="warning" glow showLabel />
      <Progress value={25} variant="error" glow showLabel />
    </div>
  ),
};

// === Indeterminate ===

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const IndeterminateWithLabel: Story = {
  args: {
    indeterminate: true,
    showLabel: true,
  },
};

// === Blocks (custom width) ===

export const CustomBlocks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>10 blocks</div>
        <Progress value={50} blocks={10} showLabel />
      </div>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>20 blocks (default)</div>
        <Progress value={50} blocks={20} showLabel />
      </div>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>40 blocks</div>
        <Progress value={50} blocks={40} showLabel />
      </div>
    </div>
  ),
};

// === Progress States ===

export const ProgressStates: Story = {
  name: 'States: 0% → 100%',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Progress value={0} showLabel />
      <Progress value={25} showLabel />
      <Progress value={50} showLabel />
      <Progress value={75} showLabel />
      <Progress value={100} showLabel />
    </div>
  ),
};

// === Full Width ===

export const FullWidth: Story = {
  name: 'Full Width',
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
        fullWidth — bar fills container, label stays adjacent
      </div>
      <Progress value={73} fullWidth showLabel />
      <Progress value={45} fullWidth showLabel variant="success" />
      <Progress value={25} fullWidth showLabel variant="error" glow />
    </div>
  ),
};

export const FullWidthComparison: Story = {
  name: 'Full Width vs Default',
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
          default (inline, sized by blocks)
        </div>
        <Progress value={60} showLabel />
      </div>
      <div>
        <div style={{ color: '#AAAAAA', marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
          fullWidth (fills container, label adjacent)
        </div>
        <Progress value={60} fullWidth showLabel />
      </div>
    </div>
  ),
};

// === DOS-style showcase ===

export const DOSShowcase: Story = {
  name: 'DOS Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'monospace' }}>
      <div style={{ color: '#AAAAAA', fontSize: '14px' }}>PKZIP style</div>
      <Progress value={73} trackStyle="bordered" showLabel />

      <div style={{ color: '#AAAAAA', fontSize: '14px', marginTop: '8px' }}>Norton Commander style</div>
      <Progress value={45} trackStyle="block" showLabel glow />

      <div style={{ color: '#AAAAAA', fontSize: '14px', marginTop: '8px' }}>Defrag gradient</div>
      <Progress value={62} trackStyle="gradient" blocks={40} showLabel />

      <div style={{ color: '#AAAAAA', fontSize: '14px', marginTop: '8px' }}>Scanning...</div>
      <Progress indeterminate showLabel />
    </div>
  ),
};
