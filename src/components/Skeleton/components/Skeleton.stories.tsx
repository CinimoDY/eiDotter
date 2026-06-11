import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import '../../../styles/tokens.css';
import '../../../styles/fonts.css';
import '../../../styles/dos-utilities.css';

/**
 * `<Skeleton>` is eidotter's loading placeholder — DOS/CGA style.
 *
 * No smooth gray shimmer: pending content is a field of shade characters
 * (░ ▒ ▓), character-cell by character-cell, with a CRT hum-bar glow band
 * rolling top→bottom over it — the way the refresh beat rolls down a CGA
 * monitor. Purely presentational — render while real content loads, then
 * swap it out.
 */
const meta = {
  title: 'Design System/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#020003' },
        { name: 'light', value: '#FFE8A8' },
      ],
    },
    docs: {
      description: {
        component:
          'DOS/CGA loading placeholder. Shade-character rows (░ ▒ ▓) with a CRT hum-bar glow band rolling top→bottom (phosphor-decay tail, 1.6s cycle). Variants: `text`, `card`, `figure`, `timeline`. Compositor-only; under `prefers-reduced-motion` the band becomes a gentle opacity breathing. The wrapper announces `label` via `role="status"` while the glyphs stay `aria-hidden`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'card', 'figure', 'timeline'],
      description: 'Placeholder shape',
    },
    lines: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Line / row count (defaults per variant: text 3, card 3, figure 4, timeline 2)',
    },
    animated: {
      control: 'boolean',
      description:
        'CRT hum-bar band rolling top→bottom; replaced by gentle opacity breathing under prefers-reduced-motion',
    },
    label: {
      control: 'text',
      description: 'Screen-reader announcement, default "Loading"',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

const demoWidth: React.CSSProperties = { maxWidth: '48ch' };

/** Default — three pending text lines, last one shortened. */
export const Text: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: {},
};

/** Card — bordered surface with a denser heading line above the body. */
export const Card: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: { variant: 'card' },
};

/** Figure — contiguous dense shade field for pending media (pairs with `DosFigure`). */
export const Figure: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: { variant: 'figure', lines: 6 },
};

/** Timeline — marker square + entry column, for pending timeline entries. */
export const Timeline: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: { variant: 'timeline' },
};

/** More lines — paragraph-sized placeholder. */
export const ParagraphSized: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: { lines: 6 },
};

/** Static — `animated={false}`. (Reduced-motion users get a gentle opacity breathing instead, not this.) */
export const Static: Story = {
  render: (args) => (
    <div style={demoWidth}>
      <Skeleton {...args} />
    </div>
  ),
  args: { animated: false },
};

/** A pending feed: several entry skeletons stacked, as in `mode="feed"` timelines. */
export const PendingFeed: Story = {
  render: () => (
    <div style={{ ...demoWidth, display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Skeleton variant="timeline" label="Loading entry 1 of 3" />
      <Skeleton variant="timeline" label="Loading entry 2 of 3" />
      <Skeleton variant="timeline" label="Loading entry 3 of 3" />
    </div>
  ),
};
