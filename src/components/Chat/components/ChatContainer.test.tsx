import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatContainer } from './ChatContainer';
import { ChatMessageEntry } from './ChatHistory';

const mockMessages: ChatMessageEntry[] = [
  { id: '1', role: 'user', content: 'hello' },
  { id: '2', role: 'assistant', content: 'hi there' },
];

describe('ChatContainer', () => {
  const mockOnSend = jest.fn();

  beforeEach(() => {
    mockOnSend.mockClear();
  });

  it('renders ChatHistory and ChatInput', () => {
    render(<ChatContainer messages={mockMessages} onSend={mockOnSend} />);

    // ChatHistory renders messages
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hi there')).toBeInTheDocument();

    // ChatInput renders
    expect(screen.getByRole('textbox', { name: 'Chat input' })).toBeInTheDocument();
  });

  it('sends message through ChatInput', async () => {
    const user = userEvent.setup();
    render(<ChatContainer messages={mockMessages} onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, 'new message');
    await user.keyboard('{Enter}');

    expect(mockOnSend).toHaveBeenCalledWith('new message');
  });

  it('passes isStreaming to ChatHistory', () => {
    render(
      <ChatContainer messages={mockMessages} onSend={mockOnSend} isStreaming />
    );

    // The last assistant message should have the streaming class
    const streamingMsg = document.querySelector('.eidotter-chat-message--streaming');
    expect(streamingMsg).toBeInTheDocument();
    expect(streamingMsg?.querySelector('.eidotter-chat-message__cursor')).toBeInTheDocument();
  });

  it('disables ChatInput when disabled', () => {
    render(
      <ChatContainer messages={mockMessages} onSend={mockOnSend} disabled />
    );

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    expect(textarea).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChatContainer messages={[]} onSend={mockOnSend} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <ChatContainer messages={[]} onSend={mockOnSend} data-testid="container" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'container');
  });

  it('renders empty state when no messages', () => {
    render(<ChatContainer messages={[]} onSend={mockOnSend} />);

    expect(screen.getByText('Awaiting input...')).toBeInTheDocument();
  });
});
