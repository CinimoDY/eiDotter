import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';
import { componentRegistry } from '../../registry';

const meta = {
  title: 'Components/Chat/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['ChatMessage'],
  },
  tags: ['autodocs'],
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant', 'system'] },
    isStreaming: { control: 'boolean' },
  },
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: {
    role: 'user',
    content: 'dir C:\\Projects',
  },
};

export const Assistant: Story = {
  args: {
    role: 'assistant',
    content: 'Volume in drive C has no label.\nDirectory of C:\\Projects\n\n03/15/2026  10:24 AM    <DIR>    eidotter\n03/15/2026  10:24 AM    <DIR>    rizomorf\n               2 Dir(s)  42,069,420 bytes free',
  },
};

export const System: Story = {
  args: {
    role: 'system',
    content: 'Connection established. ADOS Chat v1.0',
  },
};

export const Streaming: Story = {
  args: {
    role: 'assistant',
    content: 'Processing your request',
    isStreaming: true,
  },
};

export const CustomPrefixes: Story = {
  args: {
    role: 'user',
    content: 'custom prefix example',
    userPrefix: '$',
  },
};

export const AllRoles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <ChatMessage role="system" content="ADOS Chat v1.0 initialized" />
      <ChatMessage role="user" content="What can you do?" />
      <ChatMessage
        role="assistant"
        content="I can help you navigate the DOS filesystem, run programs, and answer questions about your system."
      />
      <ChatMessage role="user" content="Show me the current directory" />
      <ChatMessage role="assistant" content="Loading..." isStreaming />
    </div>
  ),
};
