import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatHistory, ChatMessageEntry } from './ChatHistory';

const mockMessages: ChatMessageEntry[] = [
  { id: '1', role: 'user', content: 'hello' },
  { id: '2', role: 'assistant', content: 'hi there' },
  { id: '3', role: 'system', content: 'connected' },
];

describe('ChatHistory', () => {
  it('renders messages in order', () => {
    render(<ChatHistory messages={mockMessages} />);

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hi there')).toBeInTheDocument();
    expect(screen.getByText('connected')).toBeInTheDocument();
  });

  it('renders empty state when no messages', () => {
    render(<ChatHistory messages={[]} />);

    expect(screen.getByText('Awaiting input...')).toBeInTheDocument();
  });

  it('has role="log" for accessibility', () => {
    render(<ChatHistory messages={mockMessages} />);

    expect(screen.getByRole('log')).toBeInTheDocument();
  });

  it('has aria-live="polite"', () => {
    render(<ChatHistory messages={mockMessages} />);

    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('aria-live', 'polite');
  });

  it('passes isStreaming to last assistant message only', () => {
    const msgs: ChatMessageEntry[] = [
      { id: '1', role: 'user', content: 'hello' },
      { id: '2', role: 'assistant', content: 'streaming...' },
    ];

    render(<ChatHistory messages={msgs} isStreaming />);

    // Last assistant message should have the streaming cursor
    expect(screen.getByText('█')).toBeInTheDocument();
  });

  it('does not stream when last message is from user', () => {
    const msgs: ChatMessageEntry[] = [
      { id: '1', role: 'assistant', content: 'done' },
      { id: '2', role: 'user', content: 'thanks' },
    ];

    render(<ChatHistory messages={msgs} isStreaming />);

    expect(screen.queryByText('█')).not.toBeInTheDocument();
  });

  it('renders with only user messages', () => {
    const msgs: ChatMessageEntry[] = [
      { id: '1', role: 'user', content: 'first' },
      { id: '2', role: 'user', content: 'second' },
    ];

    render(<ChatHistory messages={msgs} />);

    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('renders single message without issues', () => {
    render(<ChatHistory messages={[{ id: '1', role: 'user', content: 'solo' }]} />);

    expect(screen.getByText('solo')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ChatHistory messages={[]} className="custom" />);
    expect(container.firstChild).toHaveClass('chat-history', 'custom');
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <ChatHistory messages={[]} data-testid="history" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'history');
  });

  it('passes custom prefix props to ChatMessage', () => {
    render(
      <ChatHistory
        messages={[{ id: '1', role: 'user', content: 'hi' }]}
        userPrefix="$"
      />
    );

    expect(screen.getByText('$')).toBeInTheDocument();
  });
});
