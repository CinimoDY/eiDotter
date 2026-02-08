import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import React from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Callback when switch state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Toggle setting',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Toggle setting',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Toggle setting',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch {...args} aria-labelledby="switch-label" />
      <label id="switch-label" style={{ color: 'var(--color-semantic-text-primary)' }}>
        Enable CRT effects
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          aria-label="Controlled switch"
        />
        <span style={{ color: 'var(--color-semantic-text-primary)', fontSize: '14px' }}>
          Status: {checked ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch aria-label="Unchecked" />
        <span style={{ color: 'var(--color-semantic-text-primary)', fontSize: '14px' }}>
          Unchecked
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch defaultChecked aria-label="Checked" />
        <span style={{ color: 'var(--color-semantic-text-primary)', fontSize: '14px' }}>
          Checked
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch disabled aria-label="Disabled unchecked" />
        <span style={{ color: 'var(--color-semantic-text-disabled)', fontSize: '14px' }}>
          Disabled (unchecked)
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch disabled defaultChecked aria-label="Disabled checked" />
        <span style={{ color: 'var(--color-semantic-text-disabled)', fontSize: '14px' }}>
          Disabled (checked)
        </span>
      </div>
    </div>
  ),
};
