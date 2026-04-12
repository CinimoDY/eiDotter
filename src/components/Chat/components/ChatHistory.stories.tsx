import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatHistory, ChatMessageEntry } from './ChatHistory';
import { componentRegistry } from '../../registry';

const meta = {
  title: 'Components/Chat/ChatHistory',
  component: ChatHistory,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['ChatHistory'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMessages: ChatMessageEntry[] = [
  { id: '1', role: 'system', content: 'ADOS Chat v1.0 — Type a command to begin.' },
  { id: '2', role: 'user', content: 'help' },
  { id: '3', role: 'assistant', content: 'Available commands:\n  dir     — list files\n  type    — display file contents\n  cls     — clear screen\n  ver     — show version' },
  { id: '4', role: 'user', content: 'ver' },
  { id: '5', role: 'assistant', content: 'eiDotter Design System v0.14.0\nDOS Compatibility Mode: ENABLED' },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const Empty: Story = {
  args: {
    messages: [],
  },
};

export const Streaming: Story = {
  args: {
    messages: [
      ...sampleMessages,
      { id: '6', role: 'user', content: 'dir' },
      { id: '7', role: 'assistant', content: 'Scanning directory' },
    ],
    isStreaming: true,
  },
};

const InteractiveRender = () => {
    const [messages, setMessages] = useState<ChatMessageEntry[]>(sampleMessages);
    const [streaming, setStreaming] = useState(false);

    const addMessage = () => {
      const id = String(messages.length + 1);
      setMessages((prev) => [...prev, { id, role: 'user', content: `Command #${id}` }]);

      setStreaming(true);
      setTimeout(() => {
        const replyId = String(messages.length + 2);
        setMessages((prev) => [
          ...prev,
          { id: replyId, role: 'assistant', content: `Response to command #${id}` },
        ]);
        setStreaming(false);
      }, 1500);
    };

    return (
      <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
        <ChatHistory
          messages={messages}
          isStreaming={streaming}
          style={{ flex: 1, border: '1px solid var(--color-semantic-border-default)' }}
        />
        <button
          onClick={addMessage}
          style={{
            marginTop: '8px',
            background: 'var(--color-cga-amber, #ffb000)',
            color: '#000',
            border: 'none',
            padding: '4px 12px',
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Add Message
        </button>
      </div>
    );
};

export const Interactive: Story = {
  render: InteractiveRender,
};
