import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { TimelineFeed } from './TimelineFeed';
import type { TimelineEntryData } from '../../TimelineContainer';

const entries: TimelineEntryData[] = [
  { id: '1', kind: 'article', date: '2026-07-12', title: 'Connector converges', type: 'milestone', tags: ['work'], href: '/log/1' },
  { id: '2', kind: 'text', date: '2026-06-30', title: 'Article kind lands', type: 'project', tags: ['ideas'] },
  { id: '3', kind: 'text', date: '2026-05-05', title: 'A11y baseline', type: 'event', tags: ['work'] },
];

const categories = [
  { key: 'work', label: 'work', color: '#FFB000' },
  { key: 'ideas', label: 'ideas', color: '#55FFFF' },
];

describe('TimelineFeed', () => {
  it('renders a row per entry with title, date, and kind', () => {
    const { container } = render(<TimelineFeed entries={entries} />);
    expect(container.querySelectorAll('.eidotter-feed__row')).toHaveLength(3);
    expect(screen.getByText('Connector converges')).toBeInTheDocument();
    expect(screen.getByText('milestone')).toBeInTheDocument();
    expect(screen.getByText('project')).toBeInTheDocument();
    expect(screen.getByText('event')).toBeInTheDocument();
  });

  it('renders the filter chips when categories are provided', () => {
    render(<TimelineFeed entries={entries} categories={categories} />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ideas/i })).toBeInTheDocument();
  });

  it('renders no filter row without categories', () => {
    const { container } = render(<TimelineFeed entries={entries} />);
    expect(container.querySelector('.eidotter-feed__filter')).toBeNull();
  });

  it('culls the list when a category chip is selected (uncontrolled)', () => {
    const { container } = render(<TimelineFeed entries={entries} categories={categories} />);
    fireEvent.click(screen.getByRole('button', { name: /^ideas$/i }));
    const rows = container.querySelectorAll('.eidotter-feed__row');
    expect(rows).toHaveLength(1);
    expect(within(rows[0] as HTMLElement).getByText('Article kind lands')).toBeInTheDocument();
    // "all" chip shows the culled count
    expect(screen.getByRole('button', { name: /all/i })).toHaveTextContent('1 of 3');
  });

  it('respects a controlled activeCategory and reports changes', () => {
    const onCategoryChange = jest.fn();
    const { container } = render(
      <TimelineFeed
        entries={entries}
        categories={categories}
        activeCategory="work"
        onCategoryChange={onCategoryChange}
      />,
    );
    expect(container.querySelectorAll('.eidotter-feed__row')).toHaveLength(2); // work ×2
    fireEvent.click(screen.getByRole('button', { name: /^ideas$/i }));
    expect(onCategoryChange).toHaveBeenCalledWith('ideas');
    // still 2 rows — controlled, parent didn't update
    expect(container.querySelectorAll('.eidotter-feed__row')).toHaveLength(2);
  });

  it('colours the dot from the category colour', () => {
    const { container } = render(<TimelineFeed entries={entries} categories={categories} />);
    const workRow = container.querySelectorAll('.eidotter-feed__row')[0];
    const dot = workRow.querySelector('.eidotter-feed__dot')!;
    expect(dot.getAttribute('style')).toContain('--eidotter-feed-dot: #FFB000');
  });

  it('links an article title with a safe href and leaves unsafe/plain titles as text', () => {
    const { container } = render(
      <TimelineFeed
        entries={[
          { id: 'a', kind: 'article', date: '2026-07-01', title: 'Safe', href: '/x' },
          { id: 'b', kind: 'article', date: '2026-07-02', title: 'Unsafe', href: 'javascript:alert(1)' },
          { id: 'c', kind: 'text', date: '2026-07-03', title: 'Plain' },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Safe' })).toHaveAttribute('href', '/x');
    expect(screen.queryByRole('link', { name: 'Unsafe' })).toBeNull();
    expect(container.querySelector('.eidotter-feed__title-link')).toHaveTextContent('Safe');
  });

  it('uses a custom categoryOf resolver', () => {
    const { container } = render(
      <TimelineFeed
        entries={entries}
        categories={[{ key: 'milestone', label: 'milestone' }]}
        categoryOf={(e) => e.type}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /milestone/i }));
    expect(container.querySelectorAll('.eidotter-feed__row')).toHaveLength(1); // only the milestone entry
  });
});
