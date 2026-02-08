import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterBar } from './FilterBar';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['FilterBar'],
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['multi', 'single'],
      defaultValue: 'multi',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    showAll: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'selectionChanged' },
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof FilterBar>;

const defaultItems = [
  { id: 'active', label: 'Active' },
  { id: 'archived', label: 'Archived' },
  { id: 'draft', label: 'Draft' },
];

const itemsWithCounts = [
  { id: 'bugs', label: 'Bugs', count: 12 },
  { id: 'features', label: 'Features', count: 5 },
  { id: 'docs', label: 'Docs', count: 3 },
  { id: 'chores', label: 'Chores', count: 8 },
];

const paraItems = [
  { id: 'project', label: 'Projects', count: 3, color: '--color-cga-bright-cyan' },
  { id: 'area', label: 'Areas', count: 5, color: '--color-cga-bright-green' },
  { id: 'resource', label: 'Resources', count: 12, color: '--color-cga-yellow' },
  { id: 'archive', label: 'Archives', count: 8, color: '--color-cga-brown' },
  { id: 'inbox', label: 'Inbox', count: 4 },
];

// Default multi-select
export const Default: Story = {
  args: {
    items: defaultItems,
    'aria-label': 'Filter by status',
  },
};

// Single-select mode
export const SingleSelect: Story = {
  args: {
    items: defaultItems,
    mode: 'single',
    'aria-label': 'Filter by status',
  },
};

// With count badges
export const WithCounts: Story = {
  args: {
    items: itemsWithCounts,
    'aria-label': 'Filter by type',
  },
};

// With "All" toggle
export const WithAll: Story = {
  args: {
    items: itemsWithCounts,
    showAll: true,
    'aria-label': 'Filter by type',
  },
};

// Controlled mode
const ControlledExample = () => {
  const [activeIds, setActiveIds] = useState<string[]>(['bugs']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FilterBar
        items={itemsWithCounts}
        activeIds={activeIds}
        onChange={setActiveIds}
        showAll
        aria-label="Filter by type"
      />
      <p style={{ color: '#AAAAAA', fontSize: '12px', fontFamily: 'monospace' }}>
        Active: {activeIds.length > 0 ? activeIds.join(', ') : '(all)'}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// PARA categories with custom colors
export const PARAFilter: Story = {
  args: {
    items: paraItems,
    showAll: true,
    allLabel: 'All',
    'aria-label': 'Filter by PARA category',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Small
        </p>
        <FilterBar items={itemsWithCounts} size="small" aria-label="Small filter" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Medium
        </p>
        <FilterBar items={itemsWithCounts} size="medium" aria-label="Medium filter" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Large
        </p>
        <FilterBar items={itemsWithCounts} size="large" aria-label="Large filter" />
      </div>
    </div>
  ),
};

// With disabled item
export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: 'active', label: 'Active' },
      { id: 'archived', label: 'Archived', disabled: true },
      { id: 'draft', label: 'Draft' },
    ],
    'aria-label': 'Filter with disabled option',
  },
};
