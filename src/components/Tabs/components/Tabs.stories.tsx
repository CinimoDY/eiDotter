import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
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
    variant: {
      control: 'select',
      options: ['underline', 'pills'],
      defaultValue: 'underline'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium'
    },
    onTabChange: { action: 'tabChanged' }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'ai', label: 'AI Console' },
  { id: 'calendars', label: 'Calendars' },
];

const pomodoroTabs = [
  { id: 'pomodoke', label: 'Pomodoke' },
  { id: 'short', label: 'Short Break' },
  { id: 'long', label: 'Long Break' },
];

// Default
export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
};

// Variants
export const Underline: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'underline',
  },
};

export const Pills: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'pills',
  },
};

// Sizes
export const Small: Story = {
  args: {
    tabs: defaultTabs,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    tabs: defaultTabs,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    tabs: defaultTabs,
    size: 'large',
  },
};

// With disabled tab
export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: 'active', label: 'Active' },
      { id: 'disabled', label: 'Disabled', disabled: true },
      { id: 'another', label: 'Another' },
    ],
  },
};

// Controlled mode
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('ai');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Tabs
          tabs={defaultTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <p style={{ color: '#AAAAAA', fontSize: '12px' }}>
          Active tab: {activeTab}
        </p>
      </div>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Underline variant
        </p>
        <Tabs tabs={defaultTabs} variant="underline" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Pills variant
        </p>
        <Tabs tabs={defaultTabs} variant="pills" />
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Small
        </p>
        <Tabs tabs={pomodoroTabs} size="small" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Medium
        </p>
        <Tabs tabs={pomodoroTabs} size="medium" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Large
        </p>
        <Tabs tabs={pomodoroTabs} size="large" />
      </div>
    </div>
  ),
};

// Pomodoro timer example (like the real Pomodoro app)
export const PomodoroTimerTabs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: '#AAAAAA', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Pomodoro Timer Mode Selection
      </p>
      <Tabs
        tabs={pomodoroTabs}
        variant="underline"
        defaultActiveTab="pomodoke"
        aria-label="Timer mode"
      />
    </div>
  ),
};

// Navigation example (like Pomodoke Calendar)
export const NavigationTabs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: '#AAAAAA', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        App Navigation
      </p>
      <Tabs
        tabs={defaultTabs}
        variant="pills"
        defaultActiveTab="schedule"
        aria-label="Main navigation"
      />
    </div>
  ),
};

// Pills with all sizes
export const PillsAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Small pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="small" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Medium pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="medium" />
      </div>
      <div>
        <p style={{ color: '#AAAAAA', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Large pills
        </p>
        <Tabs tabs={defaultTabs} variant="pills" size="large" />
      </div>
    </div>
  ),
};
