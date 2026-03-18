import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineEntry } from './TimelineEntry';

const meta = {
  title: 'Components/TimelineEntry',
  component: TimelineEntry,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineEntry>;

export default meta;
type Story = StoryObj<typeof TimelineEntry>;

export const Default: Story = {
  args: {
    date: 'Mar 18, 2026',
    title: 'Added Card variants to eiDotter',
    type: 'event',
    tags: ['design-system', 'eidotter'],
    children: <p>Extended Card component with interactive, minimal, and callout variants.</p>,
  },
};

export const Project: Story = {
  args: {
    date: 'Jan 15, 2026',
    title: 'Timeline OS — Phase 1 Complete',
    type: 'project',
    tags: ['timeline-os'],
    children: <p>First phase of the personal information management system shipped.</p>,
  },
};

export const Milestone: Story = {
  args: {
    date: 'Dec 1, 2025',
    title: 'eiDotter v1.0 Released',
    type: 'milestone',
    children: <p>First stable release of the DOS-themed component library.</p>,
  },
};

export const NoContent: Story = {
  args: {
    date: 'Nov 10, 2025',
    title: 'Quick note — no expandable content',
    type: 'event',
  },
};
