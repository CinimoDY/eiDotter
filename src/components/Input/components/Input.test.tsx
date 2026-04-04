import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('eidotter-input', 'eidotter-input--default');
  });

  it('renders with error variant', () => {
    render(<Input variant="error" placeholder="Error input" />);

    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('eidotter-input--error');
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled placeholder="Disabled input" />);

    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('eidotter-input--disabled');
  });

  it('accepts and displays user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello DOS');

    expect(input).toHaveValue('Hello DOS');
  });

  it('calls onChange handler when typing', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<Input placeholder="Type here" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'A');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('applies custom className to text field wrapper', () => {
    render(<Input className="custom-class" placeholder="Custom" />);

    const wrapper = screen.getByPlaceholderText('Custom').closest('.eidotter-text-field');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('spreads data attributes correctly', () => {
    render(<Input data-testid="custom-input" placeholder="Test" maxLength={10} />);

    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('data-testid', 'custom-input');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="Text" />);
    expect(screen.getByPlaceholderText('Text')).toHaveAttribute('type', 'text');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByPlaceholderText('Ref test'));
  });

  describe('React Aria features', () => {
    it('renders label when provided', () => {
      render(<Input label="Email" placeholder="Enter email" />);

      expect(screen.getByText('Email')).toBeInTheDocument();
      // Label should be associated with input
      const input = screen.getByPlaceholderText('Enter email');
      expect(input).toHaveAccessibleName('Email');
    });

    it('renders description when provided', () => {
      render(<Input description="We'll never share your email" placeholder="Email" />);

      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('renders error message when variant is error', () => {
      render(<Input variant="error" errorMessage="Invalid email" placeholder="Email" />);

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('hides description when showing error message', () => {
      render(
        <Input
          variant="error"
          description="Helper text"
          errorMessage="Error text"
          placeholder="Email"
        />
      );

      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('can be focused with keyboard', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Focusable" />);

      const input = screen.getByPlaceholderText('Focusable');
      await user.tab();

      expect(input).toHaveFocus();
    });
  });
});
