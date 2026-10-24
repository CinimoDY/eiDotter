import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageShell } from './PageShell';
import { PageSection } from './PageSection';
import { Header } from '../../Header';

const meta = {
  title: 'Components/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The "one block" page layout (0.42): one centred column (1240px default) with a ' +
          '`max(16px, safe-area)` gutter and 24px / 64px block padding. Header, intro, sections and ' +
          'footer share the left edge and stack with a 40px gap; no dividers. `PageSection` is one ' +
          'block: an h2 in the display face (accent, no rule) and its content 16px apart. See ' +
          '`Templates/ReviewPage` for the full composition.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageShell>;

export default meta;
type Story = StoryObj<typeof PageShell>;

const items = [
  { label: 'docs', href: '#one' },
  { label: 'components', href: '#two' },
];

export const Default: Story = {
  args: {
    header: <Header brandName="EXAMPLE" items={items} layout="stacked" rule={false} sticky={false} />,
    intro: {
      eyebrow: 'Example · guide',
      title: 'Page title in the display face',
      lead: 'A lead paragraph, at most 68 characters wide, sits under the title. Everything shares one left edge.',
      meta: (
        <>
          <span>Updated: <b>2026-10-24</b></span>
          <span>Owner: <b>Example</b></span>
        </>
      ),
      toc: [
        { href: '#one', label: 'First section' },
        { href: '#two', label: 'Second section' },
      ],
    },
    children: (
      <>
        <PageSection id="one" title="First section">
          <p>Sections stack 40px apart. Inside a section, the heading and its content are 16px apart.</p>
        </PageSection>
        <PageSection id="two" title="Second section">
          <p>No rule under headings and no dividers between sections.</p>
        </PageSection>
      </>
    ),
  },
};

export const NarrowColumn: Story = {
  name: 'maxWidth 720px',
  args: {
    ...Default.args,
    maxWidth: '720px',
  },
};

export const Phone: Story = {
  name: 'Phone 375',
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'phone375' } },
};
