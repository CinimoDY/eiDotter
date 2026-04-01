import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  const mockOnSend = jest.fn();

  beforeEach(() => {
    mockOnSend.mockClear();
  });

  it('renders with default prompt', () => {
    render(<ChatInput onSend={mockOnSend} />);

    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Chat input' })).toBeInTheDocument();
  });

  it('sends message on Enter key', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, 'hello');
    await user.keyboard('{Enter}');

    expect(mockOnSend).toHaveBeenCalledWith('hello');
  });

  it('clears input after sending', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, 'test');
    await user.keyboard('{Enter}');

    expect(textarea).toHaveValue('');
  });

  it('inserts newline on Shift+Enter', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, 'line1');
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    await user.type(textarea, 'line2');

    expect(mockOnSend).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('line1\nline2');
  });

  it('does not send empty input', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.click(textarea);
    await user.keyboard('{Enter}');

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('does not send whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, '   ');
    await user.keyboard('{Enter}');

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('trims whitespace from sent message', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, '  hello  ');
    await user.keyboard('{Enter}');

    expect(mockOnSend).toHaveBeenCalledWith('hello');
  });

  it('renders with custom prompt', () => {
    render(<ChatInput onSend={mockOnSend} prompt="$" />);

    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<ChatInput onSend={mockOnSend} placeholder="Type here..." />);

    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  it('disables textarea when disabled', () => {
    render(<ChatInput onSend={mockOnSend} disabled />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    expect(textarea).toBeDisabled();
  });

  it('applies disabled BEM modifier', () => {
    const { container } = render(<ChatInput onSend={mockOnSend} disabled />);
    expect(container.firstChild).toHaveClass('chat-input--disabled');
  });

  it('does not send when disabled and Enter pressed', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={mockOnSend} disabled />);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    await user.type(textarea, 'hello');
    await user.keyboard('{Enter}');

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('does not focus textarea when disabled and container clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={mockOnSend} disabled />);

    await user.click(container.firstChild as Element);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    expect(textarea).not.toHaveFocus();
  });

  it('focuses textarea on container click', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={mockOnSend} />);

    await user.click(container.firstChild as Element);

    const textarea = screen.getByRole('textbox', { name: 'Chat input' });
    expect(textarea).toHaveFocus();
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <ChatInput onSend={mockOnSend} data-testid="chat-input" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'chat-input');
  });

  it('applies custom className', () => {
    const { container } = render(
      <ChatInput onSend={mockOnSend} className="custom" />
    );
    expect(container.firstChild).toHaveClass('chat-input', 'custom');
  });
});
