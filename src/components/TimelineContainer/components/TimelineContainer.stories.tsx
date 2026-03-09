import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineContainer } from './TimelineContainer';
import { componentRegistry } from '@/components/registry';
import type { TimelineEntry, ZoomLevel } from './types';

const sampleEntries: TimelineEntry[] = [
  {
    id: '1',
    type: 'event',
    date: '2024-01-15T10:30:00Z',
    title: 'Project Kickoff',
    content: 'Initial planning session for the DOS revival project',
    tags: ['planning', 'milestone'],
  },
  {
    id: '2',
    type: 'milestone',
    date: '2024-02-20T14:00:00Z',
    title: 'Alpha Release',
    content: 'First working prototype with CGA color palette',
    tags: ['release'],
  },
  {
    id: '3',
    type: 'event',
    date: '2024-03-10T09:00:00Z',
    title: 'Design Review',
    content: 'Reviewed all component designs against DOS aesthetic guidelines',
    tags: ['design', 'review'],
  },
  {
    id: '4',
    type: 'project',
    date: '2024-06-01T11:00:00Z',
    title: 'Beta Launch',
    content: 'Public beta of the eiDotter design system',
    tags: ['release', 'milestone'],
  },
  {
    id: '5',
    type: 'event',
    date: '2024-06-15T16:30:00Z',
    title: 'Community Feedback',
    content: 'Incorporated feedback from early adopters',
    tags: ['community'],
  },
  {
    id: '6',
    type: 'milestone',
    date: '2025-01-05T08:00:00Z',
    title: 'v1.0 Stable',
    content: 'Production-ready release with full component library',
    tags: ['release', 'milestone'],
  },
  {
    id: '7',
    type: 'event',
    date: '2025-03-20T13:45:00Z',
    title: 'Token Pipeline Upgrade',
    content: 'Migrated to Style Dictionary v5 with DTCG format',
    tags: ['infrastructure'],
  },
];

const meta: Meta<typeof TimelineContainer> = {
  title: 'Components/TimelineContainer',
  component: TimelineContainer,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['TimelineContainer'],
  },
  tags: ['autodocs'],
  argTypes: {
    defaultZoomLevel: {
      control: 'select',
      options: ['year', 'month', 'day', 'hour'],
    },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc'],
    },
    scrollToZoom: {
      control: 'boolean',
    },
    keyboardShortcuts: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: sampleEntries,
  },
};

export const YearView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
  },
};

export const MonthView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'month',
  },
};

export const DayView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'day',
  },
};

export const HourView: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'hour',
  },
};

export const Ascending: Story = {
  args: {
    entries: sampleEntries,
    defaultZoomLevel: 'year',
    sortOrder: 'asc',
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [sampleEntries[0]],
    defaultZoomLevel: 'day',
  },
};

const ControlledExample = () => {
  const [zoom, setZoom] = useState<ZoomLevel>('month');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div style={{
        color: 'var(--color-cga-amber)',
        fontFamily: 'var(--typography-font-family-primary)',
        fontSize: 'var(--typography-font-size-sm)',
        marginBottom: 'var(--spacing-4)',
      }}>
        Zoom: {zoom} | Selected: {selected ?? 'none'}
      </div>
      <TimelineContainer
        entries={sampleEntries}
        zoomLevel={zoom}
        onZoomChange={setZoom}
        selectedEntryId={selected}
        onSelectEntry={setSelected}
      />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};
