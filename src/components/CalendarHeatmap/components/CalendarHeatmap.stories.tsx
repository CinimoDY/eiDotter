import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarHeatmap, type HeatmapStatus } from './CalendarHeatmap';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/CalendarHeatmap',
  component: CalendarHeatmap,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['CalendarHeatmap'],
  },
  tags: ['autodocs'],
  argTypes: {
    month: { control: 'text' },
    weekStart: { control: 'select', options: ['monday', 'sunday'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    successColor: { control: 'color' },
    showLegend: { control: 'boolean' },
    defaultStatus: {
      control: 'select',
      options: ['success', 'fail', 'skip', 'pending', 'empty'],
    },
  },
} satisfies Meta<typeof CalendarHeatmap>;

export default meta;
type Story = StoryObj<typeof CalendarHeatmap>;

// Deterministic sample month so stories render identically every run.
const MONTH = '2026-06';
const SAMPLE: Record<string, HeatmapStatus> = {};
const cycle: HeatmapStatus[] = [
  'success', 'success', 'fail', 'success', 'skip',
  'success', 'success', 'success', 'fail', 'skip',
];
for (let day = 1; day <= 21; day++) {
  SAMPLE[`${MONTH}-${String(day).padStart(2, '0')}`] = cycle[day % cycle.length];
}
SAMPLE['2026-06-21'] = 'pending';

export const Default: Story = {
  args: { month: MONTH, statuses: SAMPLE },
};

export const WeekStartsSunday: Story = {
  args: { month: MONTH, statuses: SAMPLE, weekStart: 'sunday' },
};

export const HabitColor: Story = {
  name: 'Custom success colour',
  args: { month: MONTH, statuses: SAMPLE, successColor: '#55FF55' },
};

export const NoLegend: Story = {
  args: { month: MONTH, statuses: SAMPLE, showLegend: false },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <CalendarHeatmap month={MONTH} statuses={SAMPLE} size="sm" showLegend={false} />
      <CalendarHeatmap month={MONTH} statuses={SAMPLE} size="md" showLegend={false} />
      <CalendarHeatmap month={MONTH} statuses={SAMPLE} size="lg" showLegend={false} />
    </div>
  ),
};

export const Empty: Story = {
  name: 'No data (all off)',
  args: { month: MONTH, statuses: {} },
};
