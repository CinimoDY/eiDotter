import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders as a switch role', () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole('switch');
    expect(sw).not.toHaveAttribute('data-selected');
  });

  it('renders checked state', () => {
    render(<Switch checked aria-label="Toggle" onCheckedChange={() => {}} />);
    expect(document.querySelector('.eidotter-switch__track--checked')).toBeInTheDocument();
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<Switch onChange={mockOnChange} aria-label="Test" />);
    await user.click(screen.getByRole('switch'));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('prefers onChange over onCheckedChange when both provided', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    const mockOnCheckedChange = jest.fn();
    render(<Switch onChange={mockOnChange} onCheckedChange={mockOnCheckedChange} aria-label="Test" />);
    await user.click(screen.getByRole('switch'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnCheckedChange).not.toHaveBeenCalled();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch disabled aria-label="Toggle" onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with label text', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('supports sm size', () => {
    render(<Switch size="sm" aria-label="Small" />);
    expect(document.querySelector('.eidotter-switch__track--sm')).toBeInTheDocument();
  });

  it('supports slim type', () => {
    render(<Switch type="slim" aria-label="Slim" />);
    expect(document.querySelector('.eidotter-switch__track--slim')).toBeInTheDocument();
  });

  it('toggles with Space key', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    await user.tab();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Switch className="custom" aria-label="Custom" />);
    expect(document.querySelector('.eidotter-switch')).toHaveClass('custom');
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Switch ref={ref} aria-label="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
