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
