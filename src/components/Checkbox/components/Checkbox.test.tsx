import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByText('Test checkbox')).toBeInTheDocument();
  });

  it('renders without label when not provided', () => {
    const { container } = render(<Checkbox aria-label="Hidden label" />);
    expect(container.querySelector('.checkbox__label')).not.toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Test" />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox label="Test" defaultChecked />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="Test" onChange={mockOnChange} />);

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('toggles checked state', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="Test" onChange={mockOnChange} defaultChecked />);

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);

    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Test" disabled />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeDisabled();
  });

  it('does not call onChange when disabled', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label="Test" disabled onChange={mockOnChange} />);

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('applies disabled class', () => {
    const { container } = render(<Checkbox label="Test" disabled />);
    expect(container.firstChild).toHaveClass('checkbox--disabled');
  });

  it('sets name and value attributes', () => {
    render(<Checkbox label="Test" name="option" value="1" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('name', 'option');
    expect(input).toHaveAttribute('value', '1');
  });

  it('has accessible label', () => {
    render(<Checkbox label="Visible label" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('aria-label', 'Visible label');
  });
});
