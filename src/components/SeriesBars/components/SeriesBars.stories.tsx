import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SeriesBars } from './SeriesBars';
import { componentRegistry } from '@/components/registry';
import { fixtureSeries, FIXTURE_NOTICE } from '../../../fixtures/health';

const meta = {
  title: 'Components/SeriesBars',
  component: SeriesBars,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['SeriesBars'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number' } },
    goal: { control: { type: 'number' } },
    tickEvery: { control: { type: 'number', min: 1 } },
    unit: { control: 'text', description: 'Unit appended to values and the goal in the summary and value table' },
    format: { control: 'object', description: 'formatValue options: digits, percent, signed' },
    locale: { control: 'text' },
  },
  decorators: [
    // Phone stories (parameters.phone) fill a phone-width viewport with a 16px gutter.
    (Story, { parameters }) =>
      parameters.phone ? (
        <div style={{ width: '100%', padding: 16, boxSizing: 'border-box' }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 360 }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof SeriesBars>;

export default meta;
type Story = StoryObj<typeof SeriesBars>;

const points = fixtureSeries.map((s) => ({ label: `${s.t + 1}`, value: s.value }));

export const Default: Story = {
  args: { points, max: 100 },
};

export const WithGoal: Story = {
  args: {
    points,
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60',
    toneFor: [
      { from: -Infinity, tone: 'warning' },
      { from: 60, tone: 'success' },
    ],
    tickEvery: 2,
  },
};

// FIXTURE ONLY: a series with a missing point.
export const WithGap: Story = {
  args: {
    points: points.map((p, i) => (i === 4 ? { ...p, value: null } : p)),
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60',
  },
};

export const GermanLocale: Story = {
  args: { points, max: 100, locale: 'de', labels: { unknown: 'unbekannt' } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <SeriesBars key={s} points={points} max={100} goal={60} goalLabel={s} size={s} />
      ))}
    </div>
  ),
};

/** Print this story to PDF in black and white: tones stay distinguishable by pattern. */
export const Print: Story = {
  args: {
    points,
    max: 100,
    goal: 60,
    goalLabel: 'Sample goal 60',
    toneFor: [
      { from: -Infinity, tone: 'warning' },
      { from: 60, tone: 'success' },
    ],
  },
};

// FIXTURE ONLY, illustrative: the tallest bars sit at the right, under where the goal tag used to paint.
const risingPoints = points.map((p, i) => ({ ...p, value: 30 + i * 6 }));

/** DMNC-1573: the goal tag sits in a reserved band above the plot, never over a bar. */
export const GoalLabelPhone375: Story = {
  args: {
    points: risingPoints,
    max: 100,
    goal: 75,
    goalLabel: 'Sample goal 75',
  },
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};

// FIXTURE ONLY, illustrative: 14 synthetic daily shares in percent.
const dailyShares = Array.from({ length: 14 }, (_, i) => ({
  label: `${i + 1}.`,
  value: [58, 64, 71, 66, 73, 69, 75, 62, 70, 77, 68, 72, 74, 79][i],
}));

/**
 * DMNC-1610: `unit` (or `format`) carries into the value table and summary
 * ("Sample goal 70 %"); with `tickEvery` > 1 the ticks overflow into their empty
 * neighbours instead of truncating, the first and last pinned to the plot edges.
 */
export const PercentWithUnit: Story = {
  args: {
    points: dailyShares,
    max: 100,
    goal: 70,
    goalLabel: 'Sample goal 70 %',
    unit: '%',
    locale: 'de',
    tickEvery: 3,
    toneFor: [
      { from: -Infinity, tone: 'warning' },
      { from: 70, tone: 'success' },
    ],
  },
};

/** DMNC-1610 at phone width: sparse ticks read in full, the goal tag keeps its band. */
export const PercentWithUnitPhone375: Story = {
  args: PercentWithUnit.args,
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};
