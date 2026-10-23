import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gauge } from './Gauge';
import { componentRegistry } from '@/components/registry';
import { fixtureBands, fixtureValues, FIXTURE_NOTICE } from '../../../fixtures/health';

const meta = {
  title: 'Components/Gauge',
  component: Gauge,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['Gauge'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: -10, max: 150, step: 1 } },
    max: { control: { type: 'number' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'critical'] },
    status: { control: 'select', options: ['ok', 'loading', 'empty', 'stale', 'unknown'] },
    provenance: { control: 'select', options: [undefined, 'measured', 'estimated', 'modelled'] },
    glow: { control: 'boolean' },
  },
  decorators: [
    // Phone stories (parameters.phone) fill a phone-width viewport with a 16px gutter.
    (Story, { parameters }) =>
      parameters.phone ? (
        <div style={{ width: '100%', padding: 16, boxSizing: 'border-box' }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 200 }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  args: { label: 'Sample gauge', value: fixtureValues.current, secondary: '890 units' },
};

export const WithBands: Story = {
  args: { label: 'Sample gauge', value: 30, unit: fixtureValues.unit, bands: fixtureBands },
};

export const Unknown: Story = {
  args: { label: 'Sample gauge', value: null },
};

export const Stale: Story = {
  args: { label: 'Sample gauge', value: fixtureValues.current, status: 'stale' },
};

export const Loading: Story = {
  args: { label: 'Sample gauge', value: fixtureValues.current, status: 'loading' },
};

export const Critical: Story = {
  args: { label: 'Sample gauge', value: 12, tone: 'critical' },
};

export const Overflow: Story = {
  args: { label: 'Sample gauge', value: 120 },
};

export const Modelled: Story = {
  args: { label: 'Sample gauge', value: fixtureValues.current, provenance: 'modelled', glow: true },
};

export const ShortLabel: Story = {
  args: { label: 'Sample long label', shortLabel: 'Sample', value: fixtureValues.current },
  decorators: [
    (Story) => (
      <div style={{ width: 110 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ width: 160 }}>
          <Gauge label={`Size ${s}`} value={fixtureValues.current} size={s} />
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['neutral', 'info', 'success', 'warning', 'critical'] as const).map((t) => (
        <div key={t} style={{ width: 160 }}>
          <Gauge label={t} value={fixtureValues.current} tone={t} />
        </div>
      ))}
    </div>
  ),
};

/**
 * DMNC-1573: md gauges with a long secondary keep it inside the ring hole
 * (the unit takes its own line); sm gauges put it under the ring; without
 * `shortLabel` the full label stays visible. FIXTURE ONLY, illustrative.
 */
export const LongSecondaryPhone375: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
      <Gauge label="Sample energy" value={72} secondary="720 units" size="md" />
      <Gauge label="Sample hydration" value={48} secondary="480 units" size="md" />
      <Gauge label="Sample meal" value={55} secondary="40 units" size="sm" />
      <Gauge label="Sample long label" value={33} size="sm" />
    </div>
  ),
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};
