import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Metric'
    },
    value: {
      control: 'text',
      defaultValue: '42'
    },
    trend: {
      control: 'select',
      options: [undefined, 'up', 'down', 'neutral'],
    },
    trendValue: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium'
    }
  }
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof Stat>;

// Default stat
export const Default: Story = {
  args: {
    label: 'Total Tasks',
    value: '24',
  },
};

// With trend up
export const TrendUp: Story = {
  args: {
    label: 'Completed',
    value: '18',
    trend: 'up',
    trendValue: '+12%',
  },
};

// With trend down
export const TrendDown: Story = {
  args: {
    label: 'Overdue',
    value: '3',
    trend: 'down',
    trendValue: '-2',
  },
};

// With neutral trend
export const TrendNeutral: Story = {
  args: {
    label: 'In Progress',
    value: '5',
    trend: 'neutral',
    trendValue: '0%',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Focus Time',
    value: '2.5h',
    size: 'large',
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
      <Stat label="Small" value="42" size="small" />
      <Stat label="Medium" value="42" size="medium" />
      <Stat label="Large" value="42" size="large" />
    </div>
  ),
};

// All trends
export const AllTrends: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Stat label="Up" value="128" trend="up" trendValue="+15%" />
      <Stat label="Down" value="64" trend="down" trendValue="-8%" />
      <Stat label="Neutral" value="96" trend="neutral" trendValue="0%" />
    </div>
  ),
};

// Real-world examples (Pomodoke Calendar dashboard)
export const DashboardExample: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      padding: '16px',
      border: '1px solid var(--color-semantic-border-default)',
      maxWidth: '400px'
    }}>
      <Stat
        label="Pomodoros Today"
        value="6"
        trend="up"
        trendValue="+2"
      />
      <Stat
        label="Focus Time"
        value="3.5h"
        trend="up"
        trendValue="+45m"
      />
      <Stat
        label="Tasks Done"
        value="12"
        trend="neutral"
        trendValue="same"
      />
      <Stat
        label="Breaks Taken"
        value="5"
        trend="down"
        trendValue="-1"
      />
    </div>
  ),
};

// Numeric values
export const NumericValues: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Stat label="Count" value={1234} />
      <Stat label="Percentage" value="87%" />
      <Stat label="Currency" value="$1,250" />
      <Stat label="Time" value="04:32" />
    </div>
  ),
};
