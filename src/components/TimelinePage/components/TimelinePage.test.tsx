import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { TimelinePage } from './TimelinePage';
import type { TimelineEntryData } from '../../TimelineContainer';

const entries: TimelineEntryData[] = [
  { id: '1', kind: 'article', date: '2026-07-12', title: 'Connector converges', summary: 'Two keepers fall out of the pass.', tags: ['work'], href: '/log/1', images: [{ src: '/a.png', alt: 'a' }] },
  { id: '2', kind: 'article', date: '2026-06-30', title: 'Article kind lands', summary: 'The devlog surface.', tags: ['ideas'] },
  { id: '3', kind: 'text', date: '2025-12-18', title: 'DOS font becomes the face', tags: ['work'] },
];

const categories = [
  { key: 'work', label: 'work', color: '#FFB000' },
  { key: 'ideas', label: 'ideas', color: '#55FFFF' },
];

describe('TimelinePage', () => {
  it('groups entries by year', () => {
    render(<TimelinePage entries={entries} />);
    expect(screen.getByRole('heading', { name: '2026' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2025' })).toBeInTheDocument();
  });

  it('renders a dot and title per entry', () => {
    const { container } = render(<TimelinePage entries={entries} />);
    expect(container.querySelectorAll('.eidotter-blog__dot')).toHaveLength(3);
    const timeline = container.querySelector<HTMLElement>('.eidotter-blog__timeline')!;
    expect(within(timeline).getByText('Connector converges')).toBeInTheDocument();
  });

  it('shows an article summary as the description line', () => {
    render(<TimelinePage entries={entries} />);
    expect(screen.getByText('Two keepers fall out of the pass.')).toBeInTheDocument();
  });

  it('culls the timeline when a category chip is selected', () => {
    const { container } = render(<TimelinePage entries={entries} categories={categories} />);
    fireEvent.click(screen.getByRole('button', { name: /^ideas$/i }));
    expect(container.querySelectorAll('.eidotter-blog__entry')).toHaveLength(1);
    const timeline = container.querySelector<HTMLElement>('.eidotter-blog__timeline')!;
    expect(within(timeline).getByText('Article kind lands')).toBeInTheDocument();
  });

  it('previews the focused entry and updates on hover', () => {
    const { container } = render(<TimelinePage entries={entries} />);
    const preview = container.querySelector<HTMLElement>('.eidotter-blog__preview')!;
    // Initial focus is the first entry.
    expect(within(preview).getByText('Connector converges')).toBeInTheDocument();

    const entry3 = screen.getByText('DOS font becomes the face').closest('.eidotter-blog__entry')!;
    fireEvent.mouseEnter(entry3);
    expect(within(preview).getByText('DOS font becomes the face')).toBeInTheDocument();
    expect(entry3).toHaveClass('eidotter-blog__entry--focused');
  });

  it('links an article title with a safe href, leaves plain entries as text', () => {
    render(<TimelinePage entries={entries} />);
    expect(screen.getByRole('link', { name: 'Connector converges' })).toHaveAttribute('href', '/log/1');
    expect(screen.queryByRole('link', { name: 'DOS font becomes the face' })).toBeNull();
  });

  it('renders the brand slot', () => {
    render(<TimelinePage entries={entries} categories={categories} brand={<span data-testid="mark">M</span>} />);
    expect(screen.getByTestId('mark')).toBeInTheDocument();
  });

  it('omits the preview panel when preview={false}', () => {
    const { container } = render(<TimelinePage entries={entries} preview={false} />);
    expect(container.querySelector('.eidotter-blog__preview')).toBeNull();
  });
});
