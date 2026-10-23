import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DecayStrip } from './DecayStrip';
import type { DecayStripItem } from './DecayStrip';
import { componentRegistry } from '@/components/registry';
import { fixtureDecay, FIXTURE_NOTICE } from '../../../fixtures/health';

// FIXTURE ONLY, illustrative: maps the index-based fixture onto a 15-minute
// clock so the strip has real window labels. Not a clinical curve.
const STEP = 15 * 60_000;
const BASE = Date.UTC(2026, 0, 1, 12, 0);
const window = { from: BASE, to: BASE + (fixtureDecay.length - 1) * STEP };
const now = BASE + 4 * STEP;
const mealSamples = fixtureDecay.map(({ t, remaining }) => ({ t: BASE + t * STEP, remaining }));

// FIXTURE ONLY, illustrative: a steeper second curve for the dose example.
const doseSamples = fixtureDecay.map(({ t, remaining }) => ({
  t: BASE + t * STEP,
  remaining: remaining * remaining,
}));

// FIXTURE ONLY, illustrative item rows; amounts and units are placeholders.
const mealItems: DecayStripItem[] = [
  { id: 'meal', label: 'Sample meal', amount: 40, unit: 'units', remainingShare: 0.42, provenance: 'estimated' },
];
const doseItems: DecayStripItem[] = [
  { id: 'dose', label: 'Sample dose', amount: 2, unit: 'units', remainingShare: 0.18, provenance: 'modelled' },
];

const meta = {
  title: 'Components/DecayStrip',
  component: DecayStrip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['DecayStrip'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'critical'] },
    provenance: { control: 'select', options: ['measured', 'estimated', 'modelled'] },
    columns: { control: { type: 'number', min: 4, max: 48 } },
    announce: { control: 'boolean' },
  },
  args: {
    items: mealItems,
    samples: mealSamples,
    now,
    window,
    provenance: 'modelled',
  },
  decorators: [
    // Phone stories (parameters.phone) fill a phone-width viewport with a 16px gutter.
    (Story, { parameters }) =>
      parameters.phone ? (
        <div style={{ width: '100%', padding: 16, boxSizing: 'border-box' }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 480 }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof DecayStrip>;

export default meta;
type Story = StoryObj<typeof DecayStrip>;

export const Default: Story = {
  args: { tone: 'info' },
};

/** A meal and a dose decaying side by side, each in its own tone. */
export const MealAndDose: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DecayStrip
        items={mealItems}
        samples={mealSamples}
        now={now}
        window={window}
        provenance="estimated"
        tone="info"
      />
      <DecayStrip
        items={doseItems}
        samples={doseSamples}
        now={now}
        window={window}
        provenance="modelled"
        tone="warning"
      />
    </div>
  ),
};

export const TextList: Story = {
  args: { size: 'sm', items: [...mealItems, ...doseItems], tone: 'success' },
};

export const Empty: Story = {
  args: { items: [] },
};

export const NowOutsideWindow: Story = {
  args: { now: window.to + STEP, tone: 'info' },
};

export const Announce: Story = {
  args: { announce: true, tone: 'critical' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <DecayStrip key={s} {...args} size={s} />
      ))}
    </div>
  ),
};

/**
 * DMNC-1573: at phone width all 24 cells fit; the from/to labels move under
 * the cells. FIXTURE ONLY, illustrative.
 */
export const Phone375: Story = {
  args: { items: [...mealItems, ...doseItems], tone: 'info' },
  parameters: { phone: true, layout: 'fullscreen', viewport: { defaultViewport: 'phone375' } },
};
