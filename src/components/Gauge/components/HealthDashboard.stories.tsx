import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gauge } from './Gauge';
import { MeterGroup } from '../../Meter';
import { RangeBar } from '../../RangeBar';
import { SeriesBars } from '../../SeriesBars';
import { DecayStrip } from '../../DecayStrip';
import { VitalsStrip } from '../../VitalsStrip';
import { componentRegistry } from '@/components/registry';
import { fixtureDashboard, fixtureDecay, FIXTURE_NOTICE } from '../../../fixtures/health';

// FIXTURE ONLY, illustrative: map the index-based decay fixture onto a clock.
const STEP = 15 * 60_000;
const BASE = Date.UTC(2026, 0, 1, 12, 0);
const decayWindow = { from: BASE, to: BASE + (fixtureDecay.length - 1) * STEP };
const decayNow = BASE + 3 * STEP;
const decaySamples = fixtureDecay.map(({ t, remaining }) => ({ t: BASE + t * STEP, remaining }));

const d = fixtureDashboard;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-dos-text-sm text-dos-text-muted mb-2">{children}</h2>;
}

/**
 * Desktop health dashboard composition. The story owns the single "as of"
 * line; the components only receive `status`, never timestamps.
 */
function Dashboard() {
  return (
    <div className="w-full max-w-5xl min-w-0 p-4 flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-dos-text-md">Sample health dashboard</h1>
        <p className="text-dos-text-xs text-dos-text-muted">{d.asOf}</p>
        <p className="text-dos-text-xs text-dos-text-muted print:hidden">
          {FIXTURE_NOTICE}. Use the browser print dialog to save this view as a PDF.
        </p>
      </header>

      <section aria-label="Sample gauges" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {d.gauges.map((g) => (
          <div key={g.label} className="min-w-0 flex justify-center">
            <Gauge label={g.label} value={g.value} secondary={g.secondary} size="md" />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-w-0">
          <SectionTitle>Sample reserves</SectionTitle>
          <MeterGroup aria-label="Sample reserves" items={d.reserves} />
        </div>
        <div className="min-w-0">
          <SectionTitle>Sample micro reserves</SectionTitle>
          <MeterGroup
            aria-label="Sample micro reserves"
            layout="grid"
            columns={2}
            items={d.micro.map((m) => ({ ...m, orientation: 'horizontal' as const, size: 'xs' as const }))}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-w-0">
          <SectionTitle>Sample range</SectionTitle>
          <RangeBar segments={d.rangeSegments} target={d.rangeTarget} />
        </div>
        <div className="min-w-0">
          <SectionTitle>Sample series</SectionTitle>
          <SeriesBars points={d.series} max={100} goal={d.seriesGoal} goalLabel={d.seriesGoalLabel} />
        </div>
      </section>

      <section className="min-w-0">
        <SectionTitle>Sample on board</SectionTitle>
        <DecayStrip
          items={d.decayItems}
          samples={decaySamples}
          now={decayNow}
          window={decayWindow}
          provenance="modelled"
          tone="info"
        />
      </section>

      <section className="min-w-0">
        <SectionTitle>Sample vitals</SectionTitle>
        <VitalsStrip tiles={d.vitals} />
      </section>
    </div>
  );
}

const meta = {
  title: 'Compositions/HealthDashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['Gauge'],
    docs: { description: { component: FIXTURE_NOTICE } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'desktop1024' } },
};

export const Phone320: Story = {
  parameters: { viewport: { defaultViewport: 'phone320' } },
};

/** Same composition, for printing to PDF (use the browser print dialog). */
export const Print: Story = {
  parameters: { viewport: { defaultViewport: 'desktop1024' } },
};
