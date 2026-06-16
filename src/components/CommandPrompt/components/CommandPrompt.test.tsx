import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPrompt } from './CommandPrompt';

describe('CommandPrompt', () => {
  const mockOnCommand = jest.fn();

  beforeEach(() => {
    mockOnCommand.mockClear();
  });

  it('renders correctly with default props', () => {
    render(<CommandPrompt onCommand={mockOnCommand} />);

    expect(screen.getByText('C:\\>')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Command input' })).toBeInTheDocument();
    expect(screen.getByText('█')).toBeInTheDocument();
  });

  it('renders with custom prompt', () => {
    render(<CommandPrompt prompt="$" onCommand={mockOnCommand} />);

    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('calls onCommand when Enter is pressed with text', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    await user.type(input, 'help');
    await user.keyboard('{Enter}');

    expect(mockOnCommand).toHaveBeenCalledTimes(1);
    expect(mockOnCommand).toHaveBeenCalledWith('help');
  });

  it('clears input after command is executed', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    await user.type(input, 'dir');
    await user.keyboard('{Enter}');

    expect(input).toHaveValue('');
  });

  it('does not call onCommand for empty input', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(mockOnCommand).not.toHaveBeenCalled();
  });

  it('does not call onCommand for whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    await user.type(input, '   ');
    await user.keyboard('{Enter}');

    expect(mockOnCommand).not.toHaveBeenCalled();
  });

  it('trims whitespace from command', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    await user.type(input, '  dir  ');
    await user.keyboard('{Enter}');

    expect(mockOnCommand).toHaveBeenCalledWith('dir');
  });

  it('handles disabled state correctly', async () => {
    const user = userEvent.setup();
    render(<CommandPrompt disabled onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    expect(input).toBeDisabled();

    // Try to type (should not work)
    await user.type(input, 'help');
    expect(input).toHaveValue('');
  });

  it('applies custom className correctly', () => {
    const { container: root } = render(
      <CommandPrompt className="custom-class" onCommand={mockOnCommand} />,
    );

    const container = root.querySelector('.command-prompt');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('command-prompt');
  });

  it('does not put a redundant role/label on the wrapper (input is the only textbox)', () => {
    render(<CommandPrompt onCommand={mockOnCommand} />);

    // The wrapper previously carried role="textbox" + aria-label="Command
    // prompt" while the real <input> has its own label — a duplicate control.
    // Only the input should be exposed as a textbox now.
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Command input');
  });

  it('shows placeholder when provided', () => {
    render(<CommandPrompt placeholder="Type command..." onCommand={mockOnCommand} />);

    const input = screen.getByPlaceholderText('Type command...');
    expect(input).toBeInTheDocument();
  });

  it('focuses input when container is clicked', async () => {
    const user = userEvent.setup();
    const { container: root } = render(<CommandPrompt onCommand={mockOnCommand} />);
    const container = root.querySelector('.command-prompt') as HTMLElement;
    const input = screen.getByRole('textbox', { name: 'Command input' });

    await user.click(container);

    expect(input).toHaveFocus();
  });

  it('auto-focuses when autoFocus is true', () => {
    render(<CommandPrompt autoFocus onCommand={mockOnCommand} />);

    const input = screen.getByRole('textbox', { name: 'Command input' });
    expect(input).toHaveFocus();
  });

  describe('Cursor Positioning', () => {
    it('wraps input and cursor in an input-wrapper element', () => {
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const wrapper = document.querySelector('.command-prompt__input-wrapper');
      expect(wrapper).toBeInTheDocument();

      const input = wrapper?.querySelector('.command-prompt__input');
      const cursor = wrapper?.querySelector('.command-prompt__cursor');
      expect(input).toBeInTheDocument();
      expect(cursor).toBeInTheDocument();
    });

    it('cursor is the immediate sibling of the input', () => {
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const input = screen.getByRole('textbox', { name: 'Command input' });
      const nextSibling = input.nextElementSibling;
      expect(nextSibling).toHaveClass('command-prompt__cursor');
    });

    it('input size attribute reflects value length', async () => {
      const user = userEvent.setup();
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const input = screen.getByRole('textbox', { name: 'Command input' });
      expect(input).toHaveAttribute('size', '1');

      await user.type(input, 'hello');
      expect(input).toHaveAttribute('size', '5');
    });

    it('input size resets after command submit', async () => {
      const user = userEvent.setup();
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const input = screen.getByRole('textbox', { name: 'Command input' });
      await user.type(input, 'dir');
      expect(input).toHaveAttribute('size', '3');

      await user.keyboard('{Enter}');
      expect(input).toHaveAttribute('size', '1');
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with Tab', async () => {
      const user = userEvent.setup();
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const input = screen.getByRole('textbox', { name: 'Command input' });
      await user.tab();

      expect(input).toHaveFocus();
    });

    it('accepts keyboard input when focused', async () => {
      const user = userEvent.setup();
      render(<CommandPrompt onCommand={mockOnCommand} />);

      const input = screen.getByRole('textbox', { name: 'Command input' });
      await user.tab();
      await user.keyboard('test');

      expect(input).toHaveValue('test');
    });
  });
});
