import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoldToComplete } from './HoldToComplete';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/HoldToComplete',
  component: HoldToComplete,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['HoldToComplete'],
  },
  tags: ['autodocs'],
  argTypes: {
    holdDuration: { control: { type: 'range', min: 200, max: 2000, step: 100 } },
    ringColor: { control: 'color' },
    ringScale: { control: { type: 'range', min: 0.3, max: 1, step: 0.02 } },
    disabled: { control: 'boolean' },
    onHold: { action: 'held' },
    onTap: { action: 'tapped' },
  },
} satisfies Meta<typeof HoldToComplete>;

export default meta;
type Story = StoryObj<typeof HoldToComplete>;

const tileStyle: React.CSSProperties = {
  width: 160,
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid var(--color-semantic-border-default)',
  color: 'var(--color-semantic-text-brand)',
  fontFamily: "'Perfect DOS VGA 437', monospace",
  fontSize: 20,
  textAlign: 'center',
};

export const Default: Story = {
  args: { 'aria-label': 'Hold to complete habit' },
  render: (args) => {
    const Demo = () => {
      const [done, setDone] = useState(false);
      return (
        <HoldToComplete
          {...args}
          onHold={() => setDone((d) => !d)}
          onTap={() => {
            /* open details — noop in demo */
          }}
        >
          <div style={tileStyle}>{done ? '█ DONE' : 'HOLD\nTO DO'}</div>
        </HoldToComplete>
      );
    };
    return <Demo />;
  },
};

export const FastHold: Story = {
  args: { holdDuration: 350, 'aria-label': 'Hold to complete' },
  render: Default.render,
};

export const CustomRingColor: Story = {
  args: { ringColor: '#55FF55', 'aria-label': 'Hold to complete' },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Completed' },
  render: (args) => (
    <HoldToComplete {...args} onHold={() => undefined}>
      <div style={{ ...tileStyle, opacity: 0.5 }}>LOCKED</div>
    </HoldToComplete>
  ),
};
