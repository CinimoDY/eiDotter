import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No documents yet" />);
    expect(screen.getByText('No documents yet')).toBeInTheDocument();
  });

  it('exposes a status role + stable hook class', () => {
    render(<EmptyState title="Empty" />);
    const region = screen.getByRole('status');
    expect(region).toHaveClass('eidotter-empty-state');
  });

  it('renders the description when provided', () => {
    render(<EmptyState title="Empty" description="Add your first entry to get started." />);
    expect(screen.getByText('Add your first entry to get started.')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByRole('status').querySelectorAll('p')).toHaveLength(1);
  });

  it('applies tone colour to the title', () => {
    const { rerender } = render(<EmptyState title="X" tone="default" />);
    expect(screen.getByText('X')).toHaveClass('text-dos-text-primary');
    rerender(<EmptyState title="X" tone="error" />);
    expect(screen.getByText('X')).toHaveClass('text-dos-error');
    rerender(<EmptyState title="X" tone="warning" />);
    expect(screen.getByText('X')).toHaveClass('text-dos-warning');
    rerender(<EmptyState title="X" tone="info" />);
    expect(screen.getByText('X')).toHaveClass('text-dos-info');
  });

  it('renders the action slot when provided', () => {
    render(<EmptyState title="Empty" action={<button>Add</button>} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    render(<EmptyState title="X" className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
});
