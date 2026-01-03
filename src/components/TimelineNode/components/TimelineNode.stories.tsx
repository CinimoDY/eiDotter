import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimelineNode } from './TimelineNode';

const meta: Meta<typeof TimelineNode> = {
  title: 'Components/TimelineNode',
  component: TimelineNode,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'square', 'diamond'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    isActive: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '2024-01-15',
  },
};

export const Active: Story = {
  args: {
    label: '2024-01-15',
    isActive: true,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Click me',
    onClick: () => alert('Node clicked!'),
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <TimelineNode shape="circle" label="Circle" />
      <TimelineNode shape="square" label="Square" />
      <TimelineNode shape="diamond" label="Diamond" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <TimelineNode variant="default" label="Default" />
      <TimelineNode variant="primary" label="Primary" />
      <TimelineNode variant="secondary" label="Secondary" />
      <TimelineNode variant="accent" label="Accent" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <TimelineNode size="small" label="Small" />
      <TimelineNode size="medium" label="Medium" />
      <TimelineNode size="large" label="Large" />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <TimelineNode label="Left" labelPosition="left" />
      <TimelineNode label="Right" labelPosition="right" />
      <TimelineNode label="Top" labelPosition="top" />
      <TimelineNode label="Bottom" labelPosition="bottom" />
    </div>
  ),
};

export const ActiveStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <TimelineNode label="Inactive" isActive={false} />
      <TimelineNode label="Active" isActive={true} />
      <TimelineNode label="Interactive" onClick={() => {}} />
      <TimelineNode label="Active + Interactive" isActive={true} onClick={() => {}} />
    </div>
  ),
};

export const VerticalTimeline: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      position: 'relative',
      paddingLeft: '80px',
    }}>
      <div style={{
        position: 'absolute',
        left: '85px',
        top: '6px',
        bottom: '6px',
        width: '2px',
        background: 'var(--color-cga-amber-dim)',
      }} />
      <TimelineNode label="Jan 2024" labelPosition="left" isActive />
      <TimelineNode label="Feb 2024" labelPosition="left" />
      <TimelineNode label="Mar 2024" labelPosition="left" />
      <TimelineNode label="Apr 2024" labelPosition="left" />
    </div>
  ),
};

export const Stepper: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0',
    }}>
      <TimelineNode shape="circle" variant="primary" isActive label="1" labelPosition="bottom" />
      <div style={{ width: '60px', height: '2px', background: 'var(--color-cga-amber)' }} />
      <TimelineNode shape="circle" variant="primary" label="2" labelPosition="bottom" />
      <div style={{ width: '60px', height: '2px', background: 'var(--color-cga-amber-dim)' }} />
      <TimelineNode shape="circle" variant="default" label="3" labelPosition="bottom" />
      <div style={{ width: '60px', height: '2px', background: 'var(--color-cga-amber-dim)' }} />
      <TimelineNode shape="circle" variant="default" label="4" labelPosition="bottom" />
    </div>
  ),
};

export const AllShapesAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Small
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <TimelineNode size="small" shape="circle" />
        <TimelineNode size="small" shape="square" />
        <TimelineNode size="small" shape="diamond" />
        <TimelineNode size="small" shape="circle" isActive />
      </div>
      <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Medium
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <TimelineNode size="medium" shape="circle" />
        <TimelineNode size="medium" shape="square" />
        <TimelineNode size="medium" shape="diamond" />
        <TimelineNode size="medium" shape="circle" isActive />
      </div>
      <div style={{
        color: 'var(--color-semantic-text-disabled)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Large
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <TimelineNode size="large" shape="circle" />
        <TimelineNode size="large" shape="square" />
        <TimelineNode size="large" shape="diamond" />
        <TimelineNode size="large" shape="circle" isActive />
      </div>
    </div>
  ),
};
