import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimelineList } from './TimelineList';

const entries = [
  { id: '1', date: '2026-03-18', title: 'First entry', type: 'event', tags: ['test'] },
  { id: '2', date: '2026-01-15', title: 'Second entry', type: 'project', featured: true },
  { id: '3', date: '2025-12-01', title: 'Third entry', type: 'milestone', featured: true },
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

  it('filters to featured only', () => {
    render(<TimelineList entries={entries} featuredOnly />);
    expect(screen.queryByText('First entry')).not.toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
    expect(screen.getByText('Third entry')).toBeInTheDocument();
  });

  it('uses custom renderEntry', () => {
    render(
      <TimelineList
        entries={entries}
        renderEntry={(entry) => <div data-testid="custom">{entry.title}</div>}
      />
    );
    expect(screen.getAllByTestId('custom')).toHaveLength(3);
  });

  it('applies custom className', () => {
    const { container } = render(<TimelineList entries={entries} className="my-timeline" />);
    expect(container.querySelector('.my-timeline')).toBeInTheDocument();
  });
});
