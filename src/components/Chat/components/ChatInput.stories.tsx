import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';
import { componentRegistry } from '../../registry';

const meta = {
  title: 'Components/Chat/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['ChatInput'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
  },
};

export const WithPlaceholder: Story = {
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    placeholder: 'Type a command...',
  },
};

export const CustomPrompt: Story = {
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    prompt: '$',
  },
};

export const Disabled: Story = {
  args: {
    onSend: (msg: string) => console.log('Send:', msg),
    disabled: true,
  },
};
