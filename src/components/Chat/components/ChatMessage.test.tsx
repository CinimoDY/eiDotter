import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  it('renders user message with default prefix', () => {
    render(<ChatMessage role="user" content="hello" />);

    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders assistant message with default prefix', () => {
    render(<ChatMessage role="assistant" content="I can help" />);

    expect(screen.getByText('C:\\>')).toBeInTheDocument();
    expect(screen.getByText('I can help')).toBeInTheDocument();
  });

  it('renders system message without prefix', () => {
    render(<ChatMessage role="system" content="System notice" />);

    expect(screen.getByText('System notice')).toBeInTheDocument();
    expect(screen.queryByText('>')).not.toBeInTheDocument();
    expect(screen.queryByText('C:\\>')).not.toBeInTheDocument();
  });

  it('applies role-specific variant classes', () => {
    const { container, rerender } = render(<ChatMessage role="user" content="test" />);
    expect(container.firstChild).toHaveClass('eidotter-chat-message--user');

    rerender(<ChatMessage role="assistant" content="test" />);
    expect(container.firstChild).toHaveClass('eidotter-chat-message--assistant');

    rerender(<ChatMessage role="system" content="test" />);
    expect(container.firstChild).toHaveClass('eidotter-chat-message--system');
  });

  it('shows blinking cursor when isStreaming is true', () => {
    render(<ChatMessage role="assistant" content="typing" isStreaming />);

    const cursor = screen.getByText('█');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveAttribute('aria-hidden', 'true');
    expect(cursor).toHaveClass('eidotter-chat-message__cursor');
  });

  it('does not show cursor when isStreaming is false', () => {
    render(<ChatMessage role="assistant" content="done" />);

    expect(screen.queryByText('█')).not.toBeInTheDocument();
  });

  it('adds streaming modifier class', () => {
    const { container } = render(<ChatMessage role="assistant" content="typing" isStreaming />);
    expect(container.firstChild).toHaveClass('eidotter-chat-message--streaming');
  });

  it('renders with custom prefix props', () => {
    render(<ChatMessage role="user" content="hi" userPrefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();

    const { unmount } = render(
      <ChatMessage role="assistant" content="hey" assistantPrefix="AI>" />
    );
    expect(screen.getByText('AI>')).toBeInTheDocument();
    unmount();
  });

  it('handles empty content string', () => {
    render(<ChatMessage role="user" content="" />);
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('handles content with special characters', () => {
    render(<ChatMessage role="user" content="dir C:\Users\<admin>" />);
    expect(screen.getByText('dir C:\\Users\\<admin>')).toBeInTheDocument();
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <ChatMessage role="user" content="test" data-testid="msg-1" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'msg-1');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChatMessage role="user" content="test" className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('prefix is aria-hidden', () => {
    render(<ChatMessage role="user" content="test" />);
    const prefix = screen.getByText('>');
    expect(prefix).toHaveAttribute('aria-hidden', 'true');
  });
});
