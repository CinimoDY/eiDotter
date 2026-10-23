import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';
import { MeterGroup } from './MeterGroup';
import { componentRegistry } from '@/components/registry';
import { fixtureBands, fixtureValues, FIXTURE_NOTICE } from '../../../fixtures/health';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['Meter'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: -10, max: 150, step: 1 } },
    max: { control: { type: 'number' } },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'critical'] },
    pattern: { control: 'select', options: [undefined, 'solid', 'dither', 'hatch', 'dotted'] },
    segments: { control: { type: 'number', min: 0, max: 40 } },
    showValue: { control: 'boolean' },
  },
  decorators: [
    // Phone stories (parameters.phone) fill a phone-width viewport with a 16px gutter.
    (Story, { parameters }) =>
      parameters.phone ? (
        <div style={{ width: '100%', padding: 16, boxSizing: 'border-box' }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 240 }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof Meter>;

export const Default: Story = {
  args: { label: 'Sample meter', value: fixtureValues.current, unit: fixtureValues.unit },
};

export const Horizontal: Story = {
  args: {
    label: 'Sample meter',
    value: fixtureValues.current,
    orientation: 'horizontal',
    optimal: [50, 75],
  },
};

export const OptimalTick: Story = {
  args: { label: 'Sample meter', value: 40, optimal: 70 },
};

export const OptimalRange: Story = {
  args: { label: 'Sample meter', value: 40, optimal: [50, 75], size: 'md' },
};

export const WithBands: Story = {
  args: { label: 'Sample meter', value: 30, unit: fixtureValues.unit, bands: fixtureBands },
};

export const Segmented: Story = {
  args: { label: 'Sample meter', value: 95, segments: 10, tone: 'success' },
};

export const Unknown: Story = {
  args: { label: 'Sample meter', value: null },
};

export const Overflow: Story = {
  args: { label: 'Sample meter', value: 120, optimal: 70 },
};

export const Critical: Story = {
  args: { label: 'Sample meter', value: 12, tone: 'critical' },
};

export const ShortLabel: Story = {
  args: { label: 'Sample long label', shortLabel: 'Sample', value: fixtureValues.current },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {(['neutral', 'info', 'success', 'warning', 'critical'] as const).map((t) => (
        <Meter key={t} label={t} value={fixtureValues.current} tone={t} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md'] as const).map((s) => (
        <Meter key={s} label={`Size ${s}`} value={fixtureValues.current} size={s} />
      ))}
    </div>
  ),
};

// FIXTURE ONLY, illustrative: seven synthetic reserve values, no clinical meaning.
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
  label,
  value: [20, 35, 50, 62, 48, 80, 95][i],
  optimal: [50, 75] as [number, number],
}));

/** 320 px viewport check: seven vertical meters must not overflow horizontally. */
export const SevenVertical320: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <MeterGroup aria-label="Sample week" items={week} />
    </div>
  ),
};

export const GroupGrid: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <MeterGroup
        layout="grid"
        columns={3}
        items={week.map((m) => ({ ...m, orientation: 'horizontal' as const }))}
      />
    </div>
  ),
};

const gridColumnCount = (root: HTMLElement, testId: string): number => {
  const layout = root.querySelector(`[data-testid="${testId}"] .eidotter-meter-group__layout`);
  if (!layout) throw new Error(`GridColumnsNarrow: no layout element in ${testId}`);
  return getComputedStyle(layout).gridTemplateColumns.split(' ').filter(Boolean).length;
};

/**
 * A fixed `columns` grid gives way to auto-fit (6rem minimum) when the group
 * is under 30rem wide. The play function reads the computed column count: 4
 * in the wide group, 2 in the 15rem group (the rule was dead before the inner
 * layout element, because it styled its own container).
 */
export const GridColumnsNarrow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 'max-content' }}>
      <div style={{ width: '40rem' }} data-testid="wide">
        <MeterGroup
          layout="grid"
          columns={4}
          items={week.slice(0, 4).map((m) => ({ ...m, orientation: 'horizontal' as const, size: 'xs' as const }))}
        />
      </div>
      <div style={{ width: '15rem' }} data-testid="narrow">
        <MeterGroup
          layout="grid"
          columns={4}
          items={week.slice(0, 4).map((m) => ({ ...m, orientation: 'horizontal' as const, size: 'xs' as const }))}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const wide = gridColumnCount(canvasElement, 'wide');
    const narrow = gridColumnCount(canvasElement, 'narrow');
    if (wide !== 4) throw new Error(`GridColumnsNarrow: wide group has ${wide} columns, expected 4`);
    if (narrow !== 2) throw new Error(`GridColumnsNarrow: narrow group has ${narrow} columns, expected 2 (auto-fit)`);
  },
};

// FIXTURE ONLY, illustrative: two different maxes to show the shared scale.
const mixedMax = [
  { label: 'Small scale', value: 50, max: 100 },
  { label: 'Large scale', value: 50, max: 200 },
];

export const SharedMax: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <MeterGroup items={mixedMax} />
      <MeterGroup sharedMax items={mixedMax} />
    </div>
  ),
};

export const EmptyGroup: Story = {
  render: () => <MeterGroup items={[]} />,
};

// FIXTURE ONLY, illustrative: seven synthetic readings with a unit and no short labels.
const weekWithUnits = week.map((m) => ({ ...m, unit: 'units' }));

/**
 * DMNC-1573: vertical meters in a row size to their reading instead of
 * collapsing to their min-width; in a narrow group the unit stacks under the
 * number, and without `shortLabel` the full label stays (truncated).
 */
export const GroupWithUnitsPhone375: Story = {
  render: () => <MeterGroup aria-label="Sample week" items={weekWithUnits} />,
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};

/** DMNC-1573: the horizontal orientation in a phone-width grid is unchanged. */
export const HorizontalGridPhone375: Story = {
  render: () => (
    <MeterGroup
      layout="grid"
      columns={2}
      items={weekWithUnits.map((m) => ({ ...m, orientation: 'horizontal' as const, size: 'xs' as const }))}
    />
  ),
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};
