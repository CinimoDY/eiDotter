import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DosFigure } from './DosFigure';
import { componentRegistry } from '@/components/registry';

const AsciiHero: React.FC = () => (
  <pre
    style={{
      margin: 0,
      fontFamily: 'var(--typography-font-family-primary)',
      fontSize: '12px',
      lineHeight: 1.1,
      color: 'var(--color-cga-amber)',
      whiteSpace: 'pre',
    }}
  >
{String.raw`
    ██████╗  ██████╗ ███████╗
    ██╔══██╗██╔═══██╗██╔════╝
    ██║  ██║██║   ██║███████╗
    ██║  ██║██║   ██║╚════██║
    ██████╔╝╚██████╔╝███████║
    ╚═════╝  ╚═════╝ ╚══════╝
       amber phosphor · 602nm
`}
  </pre>
);

const SvgPlanet: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 150"
    style={{ width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="planet" cx="40%" cy="40%" r="70%">
        <stop offset="0%" stopColor="var(--color-cga-amber)" stopOpacity="0.95" />
        <stop offset="60%" stopColor="var(--color-cga-amber-dim)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="var(--color-cga-black)" />
      </radialGradient>
    </defs>
    <rect width="200" height="150" fill="var(--color-cga-black)" />
    <circle cx="100" cy="80" r="44" fill="url(#planet)" />
    <g fill="var(--color-cga-amber)">
      <circle cx="30"  cy="20" r="1.2" />
      <circle cx="160" cy="12" r="0.8" />
      <circle cx="180" cy="40" r="1" />
      <circle cx="12"  cy="60" r="0.7" />
      <circle cx="70"  cy="18" r="0.6" />
    </g>
  </svg>
);

const meta = {
  title: 'Components/DosFigure',
  component: DosFigure,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#020003' }],
    },
    projectMeta: componentRegistry['DosFigure'],
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    resolution: { control: 'text' },
    caption: { control: 'text' },
    animated: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof DosFigure>;

export default meta;
type Story = StoryObj<typeof DosFigure>;

export const WithAsciiSubject: Story = {
  args: {
    title: 'SCREEN.014',
    resolution: '640×480',
    caption: 'ASCII painted-screen placeholder for blog lead-ins.',
    'aria-label': 'Eidotter wordmark rendered in ASCII amber phosphor.',
    subject: <AsciiHero />,
  },
  render: (args) => (
    <div style={{ maxWidth: '520px' }}>
      <DosFigure {...args} />
    </div>
  ),
};

export const WithSvgSubject: Story = {
  args: {
    title: 'SCREEN.021',
    resolution: '320×240',
    caption: 'SVG amber-mono planet — painted with a single phosphor tone.',
    'aria-label': 'Stylised planet rendered in single-tone amber.',
    subject: <SvgPlanet />,
  },
  render: (args) => (
    <div style={{ maxWidth: '520px' }}>
      <DosFigure {...args} />
    </div>
  ),
};

export const WithPins: Story = {
  args: {
    title: 'ANNOTATED',
    resolution: '640×480',
    caption: 'Annotation pins highlight regions of interest.',
    'aria-label': 'Annotated amber-mono planet.',
    subject: <SvgPlanet />,
    pins: [
      { x: 50, y: 56, label: 'ATMOSPHERE' },
      { x: 78, y: 34, label: 'STAR' },
      { x: 18, y: 45, label: 'TERMINATOR' },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: '520px' }}>
      <DosFigure {...args} />
    </div>
  ),
};

export const NoAnimation: Story = {
  args: {
    title: 'STATIC',
    resolution: '640×480',
    caption: 'Scanline sweep and flicker disabled.',
    'aria-label': 'Static demo.',
    subject: <SvgPlanet />,
    animated: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '520px' }}>
      <DosFigure {...args} />
    </div>
  ),
};

export const BlogLeadIn: Story = {
  render: () => (
    <div style={{ maxWidth: '640px', display: 'grid', gap: '16px' }}>
      <DosFigure
        title="POST.001"
        resolution="640×480"
        aria-label="Title card for a blog post about CRT phosphor."
        subject={<AsciiHero />}
        caption="Phosphor decay and why amber feels warmer than green."
      />
      <p style={{
        color: 'var(--color-semantic-text-primary)',
        fontFamily: 'var(--typography-font-family-primary)',
        fontSize: '16px',
        lineHeight: 1.6,
      }}>
        DosFigure replaces the photograph convention for article headers in
        the eidotter aesthetic. Paint the screen; don't photograph it.
      </p>
    </div>
  ),
};
