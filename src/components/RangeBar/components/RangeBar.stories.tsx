import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeBar } from './RangeBar';
import { componentRegistry } from '@/components/registry';
import { fixtureShares, FIXTURE_NOTICE } from '../../../fixtures/health';

const meta = {
  title: 'Components/RangeBar',
  component: RangeBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['RangeBar'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLegend: { control: 'boolean' },
    minSegmentShare: { control: { type: 'number' } },
    labelThreshold: { control: { type: 'number' } },
    locale: { control: 'text' },
  },
} satisfies Meta<typeof RangeBar>;

export default meta;
type Story = StoryObj<typeof RangeBar>;

const fromFixture = fixtureShares.map(({ band, share }, i) => ({
  id: `band-${i}`,
  label: band.label,
  share,
  tone: band.tone,
  bound: `${band.from}-${Number.isFinite(band.to) ? band.to : 'max'}`,
  duration: `${Math.round((share / 100) * 24)} h`,
}));

// FIXTURE ONLY: a five-band split with a sub-threshold sliver and a target.
const five = [
  { id: 'a', label: 'Sample band A', share: 2, tone: 'critical' as const, bound: '< 10', duration: '30 min' },
  { id: 'b', label: 'Sample band B', share: 3, tone: 'warning' as const, bound: '10-20', duration: '45 min' },
  { id: 'c', label: 'Sample band C', share: 61, tone: 'success' as const, bound: '20-70', duration: '14 h' },
  { id: 'd', label: 'Sample band D', share: 29, tone: 'info' as const, bound: '70-90', duration: '7 h' },
  { id: 'e', label: 'Sample band E', share: 5, tone: 'warning' as const, bound: '> 90', duration: '1 h' },
];

export const Default: Story = {
  args: { segments: fromFixture },
};

export const FiveBands: Story = {
  args: {
    segments: five,
    target: { segmentId: 'c', minShare: 70, label: 'Sample goal 70%' },
  },
};

export const Horizontal: Story = {
  args: { segments: five, orientation: 'horizontal' },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithOtherRemainder: Story = {
  args: {
    segments: [
      { id: 'a', label: 'Sample band A', share: 60, tone: 'success' },
      { id: 'b', label: 'Sample band B', share: 39.2, tone: 'info' },
    ],
  },
};

export const NoLegend: Story = {
  args: { segments: five, showLegend: false },
};

export const GermanLocale: Story = {
  args: { segments: five, locale: 'de', labels: { other: 'Rest' } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <RangeBar key={s} segments={five} size={s} showLegend={false} />
      ))}
    </div>
  ),
};

/** Print this story to PDF in black and white: all bands stay distinguishable. */
export const Print: Story = {
  args: {
    segments: five,
    target: { segmentId: 'c', minShare: 70, label: 'Sample goal 70%' },
  },
};

// FIXTURE ONLY, illustrative: long band names that used to truncate at phone width.
const longNames = five.map((s) => ({ ...s, label: `${s.label}, a longer synthetic name` }));

type NarrowArgs = React.ComponentProps<typeof RangeBar> & { containerWidth: number };

/**
 * DMNC-1610: in a narrow container the vertical legend wraps under the bar and
 * names and bounds wrap instead of truncating. DMNC-1612: the name wins width;
 * when name and meta do not fit on one line, the percent and duration move
 * under the name (right-aligned) before a name wraps, and a word never breaks
 * unless it alone is wider than the row. `containerWidth` (px) is a story
 * knob, not a prop; the percent and target label keep a gap ("61 % Ziel").
 */
export const NarrowLegend: StoryObj<NarrowArgs> = {
  args: {
    segments: longNames,
    size: 'lg',
    locale: 'de',
    target: { segmentId: 'c', minShare: 70, label: 'Sample goal' },
    containerWidth: 300,
  },
  argTypes: {
    containerWidth: { control: { type: 'range', min: 200, max: 720, step: 10 } },
  },
  render: ({ containerWidth, ...args }) => (
    <div style={{ width: containerWidth, maxWidth: '100%' }}>
      <RangeBar {...args} />
    </div>
  ),
};

// FIXTURE ONLY, illustrative: long German band names and long duration text.
const germanLong = [
  { id: 'a', label: 'Unterhalb des Zielbereichs', share: 4, tone: 'critical' as const, bound: '< 10', duration: '58 Min./Tag' },
  { id: 'b', label: 'Zielbereich', share: 70, tone: 'success' as const, bound: '10-20', duration: '16 Std. 48 Min./Tag' },
  { id: 'c', label: 'Oberhalb des Zielbereichs', share: 26, tone: 'warning' as const, bound: '> 20', duration: '6 Std. 14 Min./Tag' },
];

/**
 * DMNC-1612: long German names next to long duration text in a narrow
 * container. Names never break mid-word; the percent and duration wrap under
 * the name instead. Illustrative fixture data only.
 */
export const NarrowLongNames: StoryObj<NarrowArgs> = {
  args: {
    segments: germanLong,
    size: 'md',
    locale: 'de',
    containerWidth: 260,
  },
  argTypes: {
    containerWidth: { control: { type: 'range', min: 160, max: 720, step: 10 } },
  },
  render: ({ containerWidth, ...args }) => (
    <div style={{ width: containerWidth, maxWidth: '100%' }}>
      <RangeBar {...args} />
    </div>
  ),
};
