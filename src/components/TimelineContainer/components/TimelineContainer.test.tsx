import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineContainer } from './TimelineContainer';
import type { TimelineEntryData, TimelineRenderEntry } from './types';

const sampleEntries: TimelineEntryData[] = [
  {
    id: '1',
    type: 'event',
    date: '2024-01-15T10:00:00Z',
    title: 'Entry One',
    kind: 'text' as const,
    content: 'Content one',
    tags: ['tag-a'],
  },
  {
    id: '2',
    type: 'milestone',
    date: '2024-03-20T14:00:00Z',
    title: 'Entry Two',
    kind: 'text' as const,
    content: 'Content two',
    tags: ['tag-b'],
  },
  {
    id: '3',
    type: 'project',
    date: '2025-06-10T09:00:00Z',
    title: 'Entry Three',
    kind: 'text' as const,
    content: 'Content three',
    tags: [],
  },
];

describe('TimelineContainer', () => {
  it('renders with aria-label', () => {
    render(<TimelineContainer entries={sampleEntries} aria-label="Test timeline" />);
    expect(screen.getByRole('region', { name: 'Test timeline' })).toBeInTheDocument();
  });

  it('renders with default aria-label', () => {
    render(<TimelineContainer entries={sampleEntries} />);
    expect(screen.getByRole('region', { name: 'Timeline' })).toBeInTheDocument();
  });

  it('renders empty state when no entries', () => {
    render(<TimelineContainer entries={[]} />);
    expect(screen.getByText(/No entries found/)).toBeInTheDocument();
  });

  it('does not impose a page background on its root', () => {
    render(<TimelineContainer entries={sampleEntries} aria-label="Test timeline" />);
    expect(screen.getByRole('region', { name: 'Test timeline' })).not.toHaveClass(
      'bg-dos-bg-primary',
    );
  });

  it('renders zoom controls', () => {
    render(<TimelineContainer entries={sampleEntries} />);
    expect(screen.getByRole('toolbar', { name: /zoom/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Zoom in/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zoom out/)).toBeInTheDocument();
  });

  it('renders entries at default month zoom', () => {
    render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="month" />);
    expect(screen.getByText('Entry One')).toBeInTheDocument();
  });

  it('spreads ...props onto root element', () => {
    render(
      <TimelineContainer
        entries={sampleEntries}
        data-testid="my-timeline"
      />
    );
    expect(screen.getByTestId('my-timeline')).toBeInTheDocument();
  });

  describe('zoom levels', () => {
    it('renders year view with entry counts', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="year" />);
      expect(screen.getByText(/2 entries/)).toBeInTheDocument();
      expect(screen.getByText(/1 entry/)).toBeInTheDocument();
    });

    it('renders day view', () => {
      const { container } = render(
        <TimelineContainer entries={sampleEntries} defaultZoomLevel="day" />
      );
      expect(container.querySelector('.timeline-view--day')).toBeInTheDocument();
    });

    it('renders hour view', () => {
      const { container } = render(
        <TimelineContainer entries={sampleEntries} defaultZoomLevel="hour" />
      );
      expect(container.querySelector('.timeline-view--hour')).toBeInTheDocument();
    });
  });

  describe('zoom controls interaction', () => {
    it('shows zoom level badge when no drill-down active', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="month" />);
      expect(screen.getByText('MONTH')).toBeInTheDocument();
    });

    it('disables zoom out at year level', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="year" />);
      expect(screen.getByLabelText(/Zoom out/)).toBeDisabled();
    });

    it('disables zoom in at hour level', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="hour" />);
      expect(screen.getByLabelText(/Zoom in/)).toBeDisabled();
    });
  });

  describe('controlled mode', () => {
    it('uses controlled zoom level', () => {
      render(
        <TimelineContainer
          entries={sampleEntries}
          zoomLevel="day"
        />
      );
      expect(screen.getByText('DAY')).toBeInTheDocument();
    });

    it('disables drill-down in controlled mode', () => {
      render(
        <TimelineContainer
          entries={sampleEntries}
          zoomLevel="month"
        />
      );
      // Breadcrumbs should not appear in controlled mode
      expect(document.querySelector('.breadcrumb')).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('selects entry on click', () => {
      const onSelectEntry = jest.fn();
      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="day"
          onSelectEntry={onSelectEntry}
        />
      );
      const entryButtons = document.querySelectorAll('.eidotter-timeline-card__trigger');
      expect(entryButtons.length).toBeGreaterThan(0);
      fireEvent.click(entryButtons[0]);
      expect(onSelectEntry).toHaveBeenCalled();
    });
  });

  describe('entry expansion', () => {
    it('expands entry content on click', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', kind: 'text' as const, content: 'Expanded content here' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const trigger = document.querySelector('.eidotter-timeline-card__trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger!);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapses on second click (toggle)', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', kind: 'text' as const, content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const trigger = document.querySelector('.eidotter-timeline-card__trigger')!;
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('collapses previous when selecting different entry', () => {
      const entries = [
        { id: '1', date: '2024-06-15', title: 'First', kind: 'text' as const, content: 'Content 1' },
        { id: '2', date: '2024-06-16', title: 'Second', kind: 'text' as const, content: 'Content 2' },
      ];
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="day" />
      );
      const triggers = document.querySelectorAll('.eidotter-timeline-card__trigger');
      fireEvent.click(triggers[0]);
      expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(triggers[1]);
      expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
      expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapsed card body has inert attribute', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', kind: 'text' as const, content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const bodyInner = document.querySelector('.eidotter-timeline-card__body-inner');
      expect(bodyInner).toHaveAttribute('inert');
    });

    it('expanded card body does not have inert', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', kind: 'text' as const, content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      fireEvent.click(document.querySelector('.eidotter-timeline-card__trigger')!);
      const bodyInner = document.querySelector('.eidotter-timeline-card__body-inner');
      expect(bodyInner).not.toHaveAttribute('inert');
    });

    it('entry with no content is still selectable', () => {
      const entries = [
        { id: '1', date: '2024-06-15', title: 'No content', kind: 'text' as const },
      ];
      const onSelectEntry = jest.fn();
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="day" onSelectEntry={onSelectEntry} />
      );
      fireEvent.click(document.querySelector('.eidotter-timeline-card__trigger')!);
      expect(onSelectEntry).toHaveBeenCalledWith('1');
    });

    it('HourView entries are always expanded', () => {
      const entries = [
        { id: '1', date: '2024-06-15T10:00:00Z', title: 'Hour entry', kind: 'text' as const, content: 'Full content' },
      ];
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="hour" />
      );
      const trigger = document.querySelector('.eidotter-timeline-card__trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('node size consistency', () => {
    it.each(['year', 'month', 'day', 'hour'] as const)(
      'renders medium nodes in %s view',
      (zoom) => {
        const { container } = render(
          <TimelineContainer entries={sampleEntries} defaultZoomLevel={zoom} />
        );
        const nodes = container.querySelectorAll('.eidotter-timeline-node');
        expect(nodes.length).toBeGreaterThan(0);
        nodes.forEach((node) => {
          expect(node).toHaveClass('eidotter-timeline-node--medium');
        });
      }
    );
  });

  describe('sort order', () => {
    it('sorts ascending', () => {
      const { container } = render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="year"
          sortOrder="asc"
        />
      );
      const labels = container.querySelectorAll('.eidotter-timeline-node__label');
      expect(labels[0].textContent).toBe('2024');
    });

    it('sorts descending', () => {
      const { container } = render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="year"
          sortOrder="desc"
        />
      );
      const labels = container.querySelectorAll('.eidotter-timeline-node__label');
      expect(labels[0].textContent).toBe('2025');
    });
  });

  describe('static mode', () => {
    it('renders entries without zoom controls', () => {
      render(<TimelineContainer entries={sampleEntries} mode="static" />);

      expect(screen.getByText('Entry One')).toBeInTheDocument();
      expect(screen.getByText('Entry Two')).toBeInTheDocument();
      expect(screen.queryByText('YEAR')).not.toBeInTheDocument();
      expect(screen.queryByText('MONTH')).not.toBeInTheDocument();
    });

    it('renders entries with nodes and cards', () => {
      const { container } = render(
        <TimelineContainer entries={sampleEntries} mode="static" />
      );

      expect(container.querySelectorAll('.eidotter-timeline-container__static-entry').length).toBe(3);
      expect(container.querySelectorAll('.eidotter-timeline-node').length).toBe(3);
      expect(container.querySelectorAll('.eidotter-timeline-card').length).toBe(3);
    });

    it('wraps entries in a TimelineAxis', () => {
      const { container } = render(
        <TimelineContainer entries={sampleEntries} mode="static" />
      );

      expect(container.querySelector('.timeline-axis')).toBeInTheDocument();
    });

    it('shows empty state when no entries', () => {
      render(<TimelineContainer entries={[]} mode="static" />);

      expect(screen.getByText(/No entries found/)).toBeInTheDocument();
    });

    it('has list role and aria-label', () => {
      render(<TimelineContainer entries={sampleEntries} mode="static" />);

      expect(screen.getByRole('list', { name: 'Timeline' })).toBeInTheDocument();
    });

    it('does not respond to keyboard shortcuts', () => {
      render(<TimelineContainer entries={sampleEntries} mode="static" />);

      fireEvent.keyDown(document, { key: '=', ctrlKey: true });

      // Should still not have zoom controls
      expect(screen.queryByText('YEAR')).not.toBeInTheDocument();
    });

    it('default mode is interactive', () => {
      render(<TimelineContainer entries={sampleEntries} />);

      // Interactive mode shows zoom controls
      expect(screen.getByText('MONTH')).toBeInTheDocument();
    });
  });

  describe('renderEntry prop', () => {
    it('replaces the default card with a custom node', () => {
      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="month"
          renderEntry={(entry) => (
            <article data-testid={`custom-${entry.id}`}>{entry.title.toUpperCase()}</article>
          )}
        />
      );

      expect(screen.getByTestId('custom-1')).toBeInTheDocument();
      expect(screen.getByText('ENTRY ONE')).toBeInTheDocument();
      // Default trigger shouldn't render when overridden.
      expect(screen.queryByRole('button', { name: /Entry One/ })).not.toBeInTheDocument();
    });

    it('passes selection and expansion state in context', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>((_entry, ctx) => (
        <div data-selected={ctx.isSelected} data-expanded={ctx.isExpanded}>
          marker
        </div>
      ));

      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="month"
          selectedEntryId="2"
          renderEntry={renderEntry}
        />
      );

      const calls = renderEntry.mock.calls;
      const selectedCall = calls.find(([entry]) => entry.id === '2');
      const otherCall = calls.find(([entry]) => entry.id === '1');

      expect(selectedCall?.[1]).toMatchObject({ isSelected: true, isExpanded: true });
      expect(otherCall?.[1]).toMatchObject({ isSelected: false, isExpanded: false });
    });

    it('defaultRender returns the built-in card so consumers can opt-in per entry', () => {
      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="month"
          renderEntry={(entry, ctx) =>
            entry.type === 'milestone'
              ? <div data-testid={`special-${entry.id}`}>Milestone: {entry.title}</div>
              : ctx.defaultRender()
          }
        />
      );

      // Custom rendering for the milestone
      expect(screen.getByTestId('special-2')).toBeInTheDocument();
      // Default card for other entries — preserves the built-in trigger button
      expect(screen.getByRole('button', { name: /Entry One/ })).toBeInTheDocument();
    });

    it('applies in hour view (always-expanded)', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>(() => <div>hour-custom</div>);

      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="hour"
          renderEntry={renderEntry}
        />
      );

      expect(renderEntry).toHaveBeenCalled();
      // Hour view is always expanded
      expect(renderEntry.mock.calls[0][1].isExpanded).toBe(true);
    });

    it('applies in day view', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>(() => <div>day-custom</div>);

      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="day"
          renderEntry={renderEntry}
        />
      );

      expect(renderEntry).toHaveBeenCalled();
    });

    it('applies in static mode and treats every entry as expanded', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>((entry) => (
        <div data-testid={`static-${entry.id}`}>{entry.title}</div>
      ));

      render(
        <TimelineContainer entries={sampleEntries} mode="static" renderEntry={renderEntry} />
      );

      expect(screen.getByTestId('static-1')).toBeInTheDocument();
      expect(renderEntry).toHaveBeenCalledTimes(sampleEntries.length);
      renderEntry.mock.calls.forEach(([, ctx]) => {
        expect(ctx).toMatchObject({ isExpanded: true, isSelected: false });
      });
    });

    it('does not affect year view (which renders bucket counts only)', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>(() => null);

      render(
        <TimelineContainer
          entries={sampleEntries}
          defaultZoomLevel="year"
          renderEntry={renderEntry}
        />
      );

      expect(renderEntry).not.toHaveBeenCalled();
      expect(screen.getByText(/2 entries/)).toBeInTheDocument();
    });
  });

  describe('feed mode', () => {
    const manyEntries: TimelineEntryData[] = Array.from({ length: 25 }, (_, i) => ({
      id: `entry-${i + 1}`,
      type: 'event' as const,
      date: `2025-${String(((i % 12) + 1)).padStart(2, '0')}-15T10:00:00Z`,
      title: `Entry ${i + 1}`,
      kind: 'text' as const,
      content: `Content for entry ${i + 1}`,
    }));

    it('shows only the first pageSize entries by default', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" pageSize={5} />);
      // Sorted desc by date — 25 entries spanning 2025-01 to 2025-01 (cycles through months)
      // Just assert exactly 5 cards rendered, regardless of which.
      const cards = document.querySelectorAll('.eidotter-timeline-container__feed-entry');
      expect(cards).toHaveLength(5);
    });

    it('uses default pageSize of 10 when not specified', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" />);
      const cards = document.querySelectorAll('.eidotter-timeline-container__feed-entry');
      expect(cards).toHaveLength(10);
    });

    it('shows LOAD MORE button when more entries exist', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" pageSize={5} />);
      expect(screen.getByRole('button', { name: /Load more entries/ })).toBeInTheDocument();
    });

    it('hides LOAD MORE button when all entries are visible', () => {
      render(<TimelineContainer entries={manyEntries.slice(0, 3)} mode="feed" pageSize={5} />);
      expect(screen.queryByRole('button', { name: /Load more entries/ })).not.toBeInTheDocument();
    });

    it('expands visible entries by pageSize when LOAD MORE clicked', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" pageSize={5} />);

      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(5);

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(10);

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(15);
    });

    it('caps visible count at total entries (no over-fetch)', () => {
      render(<TimelineContainer entries={manyEntries.slice(0, 7)} mode="feed" pageSize={5} />);

      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(5);
      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));

      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(7);
      // After loading all, button disappears
      expect(screen.queryByRole('button', { name: /Load more entries/ })).not.toBeInTheDocument();
    });

    it('fires onLoadMore with the new visible count', () => {
      const onLoadMore = jest.fn();
      render(
        <TimelineContainer
          entries={manyEntries}
          mode="feed"
          pageSize={5}
          onLoadMore={onLoadMore}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(onLoadMore).toHaveBeenCalledWith(10);

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(onLoadMore).toHaveBeenCalledWith(15);
    });

    it('hides zoom controls', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" />);
      expect(screen.queryByRole('toolbar', { name: /zoom/i })).not.toBeInTheDocument();
    });

    it('toggles entry expansion on click', () => {
      const onSelectEntry = jest.fn();
      render(
        <TimelineContainer
          entries={manyEntries.slice(0, 3)}
          mode="feed"
          onSelectEntry={onSelectEntry}
        />
      );
      const trigger = document.querySelector('.eidotter-timeline-card__trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(trigger!);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(onSelectEntry).toHaveBeenCalled();
    });

    it('uses renderEntry when provided', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>(
        (entry) => <div data-testid={`feed-${entry.id}`}>{entry.title}</div>
      );

      render(
        <TimelineContainer
          entries={manyEntries}
          mode="feed"
          pageSize={3}
          renderEntry={renderEntry}
        />
      );

      expect(renderEntry).toHaveBeenCalledTimes(3);
      expect(screen.getAllByTestId(/^feed-/)).toHaveLength(3);
    });

    it('renderEntry context reflects selection state in feed mode', () => {
      const renderEntry = jest.fn<ReturnType<TimelineRenderEntry>, Parameters<TimelineRenderEntry>>(
        (entry, ctx) => (
          <div data-testid={`feed-${entry.id}`} data-selected={ctx.isSelected}>
            {entry.title}
          </div>
        )
      );

      render(
        <TimelineContainer
          entries={manyEntries.slice(0, 3)}
          mode="feed"
          renderEntry={renderEntry}
          selectedEntryId="entry-2"
        />
      );

      const calls = renderEntry.mock.calls;
      const selectedCall = calls.find(([entry]) => entry.id === 'entry-2');
      expect(selectedCall?.[1]).toMatchObject({ isSelected: true, isExpanded: true });
    });

    it('clamps visibleCount when entries shrink below it', () => {
      const { rerender } = render(
        <TimelineContainer entries={manyEntries} mode="feed" pageSize={5} />
      );

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(10);

      // Swap to a list shorter than current visibleCount → clamp to new length
      rerender(
        <TimelineContainer entries={manyEntries.slice(0, 7)} mode="feed" pageSize={5} />
      );
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(7);
    });

    it('preserves visibleCount when entries grow (backend-pagination append flow)', () => {
      const initial = manyEntries.slice(0, 5);
      const { rerender } = render(
        <TimelineContainer entries={initial} mode="feed" pageSize={5} />
      );

      // Initial: 5 of 5 visible, no LOAD MORE button
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(5);
      expect(screen.queryByRole('button', { name: /Load more entries/ })).not.toBeInTheDocument();

      // Consumer fetches next batch and appends → entries grows from 5 to 15.
      // visibleCount stays at 5 (the previously visible entries don't get hidden,
      // the new entries don't get auto-shown — LOAD MORE re-appears).
      const expanded = manyEntries.slice(0, 15);
      rerender(<TimelineContainer entries={expanded} mode="feed" pageSize={5} />);

      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(5);
      expect(screen.getByRole('button', { name: /Load more entries/ })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(10);
    });

    it('clamps pageSize=0 to 1 to avoid infinite LOAD MORE loop', () => {
      render(<TimelineContainer entries={manyEntries} mode="feed" pageSize={0} />);
      // safePageSize = 1, so 1 entry visible
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(1);
      // Each click reveals exactly one more
      fireEvent.click(screen.getByRole('button', { name: /Load more entries/ }));
      expect(document.querySelectorAll('.eidotter-timeline-container__feed-entry')).toHaveLength(2);
    });

    it('does not fire onLoadMore when already at cap', () => {
      const onLoadMore = jest.fn();
      render(
        <TimelineContainer
          entries={manyEntries.slice(0, 5)}
          mode="feed"
          pageSize={5}
          onLoadMore={onLoadMore}
        />
      );
      expect(screen.queryByRole('button', { name: /Load more entries/ })).not.toBeInTheDocument();
      expect(onLoadMore).not.toHaveBeenCalled();
    });

    it('respects sortOrder', () => {
      const dated: TimelineEntryData[] = [
        { id: 'a', date: '2025-01-01', title: 'Oldest', kind: 'text' as const },
        { id: 'b', date: '2025-06-01', title: 'Middle', kind: 'text' as const },
        { id: 'c', date: '2025-12-01', title: 'Newest', kind: 'text' as const },
      ];

      const { rerender } = render(
        <TimelineContainer entries={dated} mode="feed" pageSize={2} sortOrder="desc" />
      );
      // desc → Newest first
      let cards = document.querySelectorAll('.eidotter-timeline-card__title');
      expect(cards[0]).toHaveTextContent('Newest');

      rerender(<TimelineContainer entries={dated} mode="feed" pageSize={2} sortOrder="asc" />);
      cards = document.querySelectorAll('.eidotter-timeline-card__title');
      expect(cards[0]).toHaveTextContent('Oldest');
    });
  });
});
