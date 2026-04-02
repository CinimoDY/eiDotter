import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimelineList } from './TimelineList';

const entries = [
  { id: '1', date: '2026-03-18', title: 'First entry', type: 'event' as const, tags: ['test'] },
  { id: '2', date: '2026-01-15', title: 'Second entry', type: 'project' as const },
  { id: '3', date: '2025-12-01', title: 'Third entry', type: 'milestone' as const },
];

describe('TimelineList', () => {
  it('renders all entries', () => {
    render(<TimelineList entries={entries} />);
    expect(screen.getByText('First entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
    expect(screen.getByText('Third entry')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    render(<TimelineList entries={[]} />);
    expect(screen.getByText(/TIMELINE EMPTY/)).toBeInTheDocument();
  });

  it('empty state has role="status"', () => {
    render(<TimelineList entries={[]} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="list" and aria-label', () => {
    render(<TimelineList entries={entries} />);
    expect(screen.getByRole('list', { name: 'Timeline' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TimelineList entries={entries} className="my-timeline" />);
    expect(container.querySelector('.my-timeline')).toBeInTheDocument();
  });

  it('formats ISO dates', () => {
    render(<TimelineList entries={[{ id: '1', date: '2026-03-18', title: 'Test' }]} />);
    expect(screen.getByText('Mar 18, 2026')).toBeInTheDocument();
  });
});
