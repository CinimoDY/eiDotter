import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Connector } from './Connector';
import { Mark } from '../../Brand';

const meta = {
  title: 'Components/Connector',
  component: Connector,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dos', values: [{ name: 'dos', value: '#000000' }] },
  },
} satisfies Meta<typeof Connector>;

export default meta;
type Story = StoryObj<typeof Connector>;

const CATS = [
  { label: 'work', color: '#FFB000' },
  { label: 'ideas', color: '#55FFFF' },
  { label: 'life', color: '#55FF55' },
  { label: 'log', color: '#FF55FF' },
];

function tag(label: string, color: string): React.CSSProperties {
  return {
    color,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    border: '1px solid currentColor',
    padding: '5px 11px',
    fontSize: 12,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    whiteSpace: 'nowrap',
  };
}

function FanDemo({ sway = true, weight = 'delicate', colored = true }: {
  sway?: boolean;
  weight?: 'delicate' | 'medium';
  colored?: boolean;
}) {
  const source = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLSpanElement>(null);
  const r1 = useRef<HTMLSpanElement>(null);
  const r2 = useRef<HTMLSpanElement>(null);
  const r3 = useRef<HTMLSpanElement>(null);
  const refs = [r0, r1, r2, r3];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 140,
        padding: 56,
        minHeight: 360,
        background: '#000',
      }}
    >
      <Mark ref={source} size={40} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {CATS.map((c, i) => (
          <span key={c.label} ref={refs[i]} style={tag(c.label, colored ? c.color : '#FFB000')}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor' }} />
            {c.label}
          </span>
        ))}
      </div>
      <Connector
        sourceRef={source}
        targets={refs.map((ref, i) => ({ ref, color: colored ? CATS[i].color : undefined }))}
        sway={sway}
        weight={weight}
      />
    </div>
  );
}

export const NavFan: Story = {
  render: () => <FanDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'The Mark branches amber→category tapered ribbons to nav tags, born amber at the yolk and ' +
          'gaining each category colour as it arrives — stopping exactly at the tag edge. Gently sways.',
      },
    },
  },
};

export const Static: Story = {
  render: () => <FanDemo sway={false} />,
  parameters: {
    docs: { description: { story: 'Sway disabled — the same ribbons held still (also the reduced-motion rendering).' } },
  },
};

export const Medium: Story = {
  render: () => <FanDemo weight="medium" />,
  parameters: {
    docs: { description: { story: 'The bolder `medium` weight, for large surfaces where the delicate thread reads too thin.' } },
  },
};

export const AmberOnly: Story = {
  render: () => <FanDemo colored={false} />,
  parameters: {
    docs: { description: { story: 'Solid-amber ribbons (no per-target colour) — the information/blog-spine treatment.' } },
  },
};
