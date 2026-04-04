import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByText('[ ]')).toBeInTheDocument();
  });

  it('renders checked state', () => {
    render(<Checkbox checked label="Checked" onChange={() => {}} />);
    expect(screen.getByText('[X]')).toBeInTheDocument();
  });

  it('renders indeterminate state', () => {
    render(<Checkbox indeterminate label="Mixed" />);
    expect(screen.getByText('[-]')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox label="Toggle" onChange={onChange} />);
    await user.click(screen.getByText('Toggle'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox label="Disabled" disabled onChange={onChange} />);
    await user.click(screen.getByText('Disabled'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports sm size', () => {
    render(<Checkbox size="sm" label="Small" />);
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Checkbox label="Custom" className="my-class" />);
    const checkbox = document.querySelector('.eidotter-checkbox');
    expect(checkbox).toHaveClass('my-class');
  });

  it('can be focused with keyboard', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Focusable" />);
    await user.tab();
    // React Aria puts focus on the hidden input inside the label
    expect(document.querySelector('.eidotter-checkbox')).toHaveAttribute('data-focused', 'true');
  });

  it('toggles with Space key', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox label="Space" onChange={onChange} />);
    await user.tab();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
