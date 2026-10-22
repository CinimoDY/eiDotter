import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DosWindow } from './DosWindow';
import { IconButton } from '../../IconButton/components/IconButton';

const meta = {
  title: 'Components/DosWindow',
  component: DosWindow,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    docs: {
      description: {
        component:
          'In-page window chrome (DMNC-1592): the DosDialog strip (dark, uppercase xs title, `▸` marker, dim-amber rule) on a brand border with `--shadow-drop`, no glow and no backdrop. Server-safe and presentational: pass `IconButton`s at `size="window"` as `controls`. DosFigure and Card are built on it.',
      },
    },
  },
  tags: ['autodocs'],
  args: { title: 'System report' },
} satisfies Meta<typeof DosWindow>;

export default meta;
type Story = StoryObj<typeof DosWindow>;

const body: React.CSSProperties = {
  margin: 0,
  color: 'var(--color-cga-light-gray)',
  lineHeight: 1.5,
};

const controls = (
  <>
    <IconButton icon="Cancel" label="Minimise" size="window" />
    <IconButton icon="Fullscreen" label="Maximise" size="window" />
    <IconButton icon="Close" label="Close window" size="window" />
  </>
);

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <DosWindow {...args}>
        <p style={body}>Window body. The frame is a brand border with a hard drop shadow.</p>
      </DosWindow>
    </div>
  ),
};

export const WithControlsAndFooter: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <DosWindow title="Disk usage" controls={controls} footer={<span style={body}>3 of 4 drives mounted</span>}>
        <p style={body}>Window controls are IconButtons at window size (28×28) in the strip end slot.</p>
      </DosWindow>
    </div>
  ),
};

export const ActiveAndInactive: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 480 }}>
      <DosWindow title="Active window" controls={controls}>
        <p style={body}>Active: the strip title is in the active colour.</p>
      </DosWindow>
      <DosWindow title="Inactive window" active={false} controls={controls}>
        <p style={body}>Inactive: the strip title dims to text-muted.</p>
      </DosWindow>
    </div>
  ),
};

export const NoStrip: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <DosWindow>
        <p style={body}>Without a title or controls the window is just the frame.</p>
      </DosWindow>
    </div>
  ),
};
