import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
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
    size: {
      control: 'select',
      options: ['L', 'S'],
      defaultValue: 'L'
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      defaultValue: 'info'
    },
    title: {
      control: 'text',
      defaultValue: 'Notification Title'
    },
    children: {
      control: 'text',
    },
    onClose: { action: 'close clicked' },
    onClickHere: { action: 'click here clicked' }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    size: 'L',
    type: 'info',
    title: 'Notification Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit amet diam neque bibendum. Quisque in praesent sit erat...',
  },
}; 