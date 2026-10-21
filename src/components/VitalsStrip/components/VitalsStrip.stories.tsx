import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VitalsStrip } from './VitalsStrip';
import type { VitalTile } from './VitalsStrip';
import { componentRegistry } from '@/components/registry';
import { fixtureBands, fixtureValues, FIXTURE_NOTICE } from '../../../fixtures/health';

const meta = {
  title: 'Components/VitalsStrip',
  component: VitalsStrip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['VitalsStrip'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    locale: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VitalsStrip>;

export default meta;
type Story = StoryObj<typeof VitalsStrip>;

// FIXTURE ONLY, illustrative: synthetic tiles, not clinical values.
const tiles: VitalTile[] = [
  { id: 'a', label: 'Sample A', value: fixtureValues.current, unit: 'units', secondary: 'sample time' },
  { id: 'b', label: 'Sample pair', value: null, pair: [124, 78], unit: 'units', tone: 'info' },
  { id: 'c', label: 'Sample C', value: 38, unit: fixtureValues.unit, bands: fixtureBands },
  { id: 'd', label: 'Sample D', value: 90, unit: 'units', tone: 'success' },
  { id: 'e', label: 'Sample E', value: 12, unit: fixtureValues.unit, bands: fixtureBands },
];

export const Default: Story = { args: { tiles } };

export const Offline: Story = {
  args: { tiles: [tiles[0], { id: 'x', label: 'Sample offline', value: null, status: 'empty' }] },
};

export const Stale: Story = {
  args: { tiles: [{ ...tiles[0], status: 'stale' }, tiles[3]] },
};

export const Loading: Story = {
  args: { tiles: [{ ...tiles[0], status: 'loading' }, tiles[3]] },
};

export const Critical: Story = {
  args: { tiles: [{ ...tiles[0], tone: 'critical' }, tiles[3]] },
};

export const German: Story = {
  args: {
    locale: 'de',
    labels: { offline: 'getrennt', stale: 'veraltet' },
    tiles: [
      { id: 'a', label: 'Probe', value: 1.5, unit: 'units' },
      { id: 'b', label: 'Probe offline', value: null },
      { id: 'c', label: 'Probe alt', value: 4.2, unit: 'units', status: 'stale' },
    ],
  },
};

export const Narrow: Story = {
  args: { tiles },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  args: { tiles: tiles.slice(0, 3) },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <VitalsStrip key={s} {...args} size={s} />
      ))}
    </div>
  ),
};
