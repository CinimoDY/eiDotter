import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
      options: ['default', 'error'],
      defaultValue: 'default'
    },
    disabled: {
      control: 'boolean',
      defaultValue: false
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Enter text...'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      defaultValue: 'text'
    },
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Default input
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Error state
export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Invalid input...',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input...',
  },
};

// With value
export const WithValue: Story = {
  args: {
    defaultValue: 'C:\\DOS\\COMMAND.COM',
  },
};

// Password type
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input placeholder="Default input" />
      <Input variant="error" placeholder="Error input" />
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
};
