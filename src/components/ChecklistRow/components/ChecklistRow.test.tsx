import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChecklistRow } from './ChecklistRow';

describe('ChecklistRow', () => {
  it('renders the label with an unchecked checkbox', () => {
    render(<ChecklistRow checked={false} onToggle={() => {}} label="Upload W-2" />);
    expect(screen.getByText('Upload W-2')).toBeInTheDocument();
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('aria-checked', 'false');
    expect(cb).toHaveTextContent('[ ]');
  });

  it('renders a checked checkbox with [x]', () => {
    render(<ChecklistRow checked onToggle={() => {}} label="Done" />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toHaveAttribute('aria-checked', 'true');
    expect(cb).toHaveTextContent('[x]');
  });

  it('calls onToggle when the checkbox is clicked', () => {
    const onToggle = jest.fn();
    render(<ChecklistRow checked={false} onToggle={onToggle} label="X" />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('has a state-reflecting default aria-label, overridable', () => {
    const { rerender } = render(<ChecklistRow checked={false} onToggle={() => {}} label="X" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Mark as complete');
    rerender(<ChecklistRow checked onToggle={() => {}} label="X" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Mark as incomplete');
    rerender(<ChecklistRow checked={false} onToggle={() => {}} label="X" ariaLabel="Toggle item" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Toggle item');
  });

  it('applies label tone (muted strikes through; error colour)', () => {
    const { rerender } = render(<ChecklistRow checked onToggle={() => {}} label="X" labelTone="muted" />);
    expect(screen.getByText('X')).toHaveClass('line-through', 'text-dos-text-muted');
    rerender(<ChecklistRow checked={false} onToggle={() => {}} label="X" labelTone="error" />);
    expect(screen.getByText('X')).toHaveClass('text-dos-error');
  });

  it('does not toggle when disabled', () => {
    const onToggle = jest.fn();
    render(<ChecklistRow checked={false} onToggle={onToggle} disabled label="X" />);
    const cb = screen.getByRole('checkbox');
    expect(cb).toBeDisabled();
    fireEvent.click(cb);
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders note, leading, trailing, and free children', () => {
    render(
      <ChecklistRow
        checked={false}
        onToggle={() => {}}
        label="X"
        note="due tomorrow"
        leading={<span data-testid="lead">L</span>}
        trailing={<span data-testid="trail">T</span>}
      >
        <span data-testid="child">C</span>
      </ChecklistRow>,
    );
    expect(screen.getByText('due tomorrow')).toBeInTheDocument();
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('dims while pending and carries the stable hook class', () => {
    const { container } = render(<ChecklistRow checked={false} onToggle={() => {}} label="X" pending />);
    const row = container.querySelector('.eidotter-checklist-row');
    expect(row).toHaveClass('opacity-50');
  });
});
