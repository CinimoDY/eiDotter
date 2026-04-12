import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatContainer } from './ChatContainer';
import { ChatMessageEntry } from './ChatHistory';
import { Terminal } from '../../Terminal/components/Terminal';
import { componentRegistry } from '../../registry';

const meta = {
  title: 'Components/Chat/ChatContainer',
  component: ChatContainer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['ChatContainer'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialMessages: ChatMessageEntry[] = [
  { id: '1', role: 'system', content: 'ADOS Chat v1.0 — Welcome to the DOS terminal.' },
  { id: '2', role: 'user', content: 'hello' },
  { id: '3', role: 'assistant', content: 'Greetings, user. How may I assist you today?' },
];

export const Default: Story = {
  args: {
    messages: initialMessages,
    onSend: (msg: string) => console.log('Send:', msg),
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export const InsideTerminal: Story = {
  render: () => (
    <div style={{ height: '500px', padding: '16px' }}>
      <Terminal title="ADOS Chat">
        <ChatContainer
          messages={initialMessages}
          onSend={(msg) => console.log('Send:', msg)}
          placeholder="Type a command..."
        />
      </Terminal>
    </div>
  ),
};

const FullDemoRender = () => {
  const [messages, setMessages] = useState<ChatMessageEntry[]>(initialMessages);
  const [streaming, setStreaming] = useState(false);

  const handleSend = (text: string) => {
    const userMsg: ChatMessageEntry = {
      id: String(Date.now()),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessageEntry = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: `Processing "${text}"...\n\nCommand executed successfully.\nReady for next input.`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setStreaming(false);
    }, 2000);
  };

  return (
    <div style={{ height: '500px', padding: '16px' }}>
      <Terminal title="ADOS Chat v1.0">
        <ChatContainer
          messages={messages}
          onSend={handleSend}
          isStreaming={streaming}
          disabled={streaming}
          placeholder="Enter command..."
        />
      </Terminal>
    </div>
  );
};

export const FullDemo: Story = {
  render: FullDemoRender,
};

export const Empty: Story = {
  render: () => (
    <div style={{ height: '400px', padding: '16px' }}>
      <Terminal title="ADOS Chat">
        <ChatContainer
          messages={[]}
          onSend={(msg) => console.log('Send:', msg)}
          placeholder="Start chatting..."
        />
      </Terminal>
    </div>
  ),
};
