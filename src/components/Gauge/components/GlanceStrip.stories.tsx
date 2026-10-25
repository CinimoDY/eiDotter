import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Zap } from 'pixelarticons/react/Zap.js';
import { Coffee } from 'pixelarticons/react/Coffee.js';
import { Human } from 'pixelarticons/react/Human.js';
import { Heart } from 'pixelarticons/react/Heart.js';
import { Gauge } from './Gauge';
import { componentRegistry } from '@/components/registry';
import { fixtureDashboard, FIXTURE_NOTICE } from '../../../fixtures/health';
import type { Tone } from '../../../utils/health';

const SEVERITY: Tone[] = ['critical', 'warning', 'info', 'success', 'neutral'];

/**
 * Pick the one tile to emphasise: highest severity (critical, warning, info,
 * success, neutral), first in list order wins a tie. All-neutral lists have
 * nothing to emphasise.
 */
function pickEmphasised(tiles: { id: string; tone: Tone }[]): string | null {
  let best: { id: string; rank: number } | null = null;
  for (const tile of tiles) {
    const rank = SEVERITY.indexOf(tile.tone);
    if (best === null || rank < best.rank) best = { id: tile.id, rank };
  }
  return best && SEVERITY[best.rank] !== 'neutral' ? best.id : null;
}

const icons = [Zap, Coffee, Human, Heart];

interface GlanceTile {
  id: string;
  label: string;
  value: number;
  tone: Tone;
}

function GlanceStrip({ tiles }: { tiles: GlanceTile[] }) {
  const emphasised = pickEmphasised(tiles);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-3xl p-4">
      {tiles.map((tile, i) => {
        const Icon = icons[i % icons.length];
        const isEmphasised = tile.id === emphasised;
        return (
          <div
            key={tile.id}
            data-emphasised={isEmphasised ? 'true' : undefined}
            className={`min-w-0 flex flex-col items-center gap-1 p-2 border-2 ${
              isEmphasised ? 'border-dos-border-error' : 'border-transparent'
            }`}
          >
            <Icon width={24} height={24} aria-hidden="true" focusable="false" />
            <Gauge label={tile.label} value={tile.value} tone={tile.tone} size="sm" />
            {isEmphasised && <span className="text-dos-text-xs">{'>> PRIORITY'}</span>}
          </div>
        );
      })}
    </div>
  );
}

const meta = {
  title: 'Compositions/GlanceStrip',
  component: GlanceStrip,
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
} satisfies Meta<typeof GlanceStrip>;

export default meta;
type Story = StoryObj<typeof GlanceStrip>;

const [first, second, third, fourth] = fixtureDashboard.glance;

/** One critical tile, emphasised. */
export const Default: Story = {
  args: { tiles: [first, second, third, { ...fourth, tone: 'neutral' as const }] },
};

/** Two critical tiles: exactly one is emphasised (the first in list order). */
export const TwoCritical: Story = {
  args: { tiles: [first, second, third, fourth] },
};

/** No tile above neutral: nothing is emphasised. */
export const AllNeutral: Story = {
  args: { tiles: fixtureDashboard.glance.map((t) => ({ ...t, tone: 'neutral' as const })) },
};

export const Phone320: Story = {
  args: { tiles: [first, second, third, fourth] },
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'phone320' } },
};
