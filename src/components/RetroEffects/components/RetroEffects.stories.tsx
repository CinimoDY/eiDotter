import type { Meta, StoryObj } from '@storybook/react';
import { RetroEffects } from './RetroEffects';
import React from 'react';

const meta: Meta<typeof RetroEffects> = {
  title: 'Components/RetroEffects',
  component: RetroEffects,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos-amber',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scanlines: {
      control: 'boolean',
      description: 'Enable scanline overlay effect',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow vignette effect',
    },
    flicker: {
      control: 'boolean',
      description: 'Enable CRT flicker effect',
    },
    intensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Intensity of the effects (0-1)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div style={{
    padding: '32px',
    fontFamily: 'var(--typography-font-family-primary)',
    color: 'var(--color-semantic-text-primary)',
  }}>
    <h1 style={{ color: 'var(--color-cga-amber)', marginBottom: '16px' }}>
      C:\&gt; RETRO EFFECTS DEMO
    </h1>
    <div style={{
      border: '2px solid var(--color-semantic-border-default)',
      padding: '16px',
      marginBottom: '16px',
    }}>
      <p style={{ marginBottom: '8px' }}>
        This component adds authentic CRT monitor effects to create
        the DOS terminal aesthetic.
      </p>
      <p style={{ color: 'var(--color-cga-amber)' }}>
        Effects include scanlines, phosphor glow, and subtle flicker.
      </p>
    </div>
    <p style={{ color: 'var(--color-semantic-text-disabled)' }}>
      Press any key to continue...
    </p>
  </div>
);

export const Default: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const ScanlinesOnly: Story = {
  args: {
    scanlines: true,
    glow: false,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const GlowOnly: Story = {
  args: {
    scanlines: false,
    glow: true,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const SubtleEffects: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 0.5,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const IntenseEffects: Story = {
  args: {
    scanlines: true,
    glow: true,
    flicker: true,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};

export const NoEffects: Story = {
  args: {
    scanlines: false,
    glow: false,
    flicker: false,
    intensity: 1,
  },
  render: (args) => (
    <>
      <DemoContent />
      <RetroEffects {...args} />
    </>
  ),
};
