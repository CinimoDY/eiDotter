import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineList } from './TimelineList';

const sampleEntries = [
  {
    id: '1',
    date: '2026-03-18',
    title: 'Added Card variants to eiDotter',
    type: 'event',
    tags: ['design-system'],
    content: <p>Extended Card with interactive, minimal, and callout variants.</p>,
  },
  {
    id: '2',
    date: '2026-01-15',
    title: 'Timeline OS — Phase 1 Complete',
    type: 'project',
    tags: ['timeline-os'],
    content: <p>First phase shipped with core PIM features.</p>,
  },
  {
    id: '3',
    date: '2025-12-01',
    title: 'eiDotter v1.0 Released',
    type: 'milestone',
    content: <p>First stable release of the DOS-themed component library.</p>,
  },
  {
    id: '4',
    date: '2025-09-10',
    title: 'Started DOS BTS project',
    type: 'project',
    tags: ['swift', 'health'],
  },
];

const meta = {
  title: 'Components/TimelineList',
  component: TimelineList,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineList>;

export default meta;
type Story = StoryObj<typeof TimelineList>;

export const Default: Story = {
  args: {
    entries: sampleEntries,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};
