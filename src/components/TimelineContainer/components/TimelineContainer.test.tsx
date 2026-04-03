import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineContainer } from './TimelineContainer';
import type { TimelineEntry } from './types';

const sampleEntries: TimelineEntry[] = [
  {
    id: '1',
    type: 'event',
    date: '2024-01-15T10:00:00Z',
    title: 'Entry One',
    content: 'Content one',
    tags: ['tag-a'],
  },
  {
    id: '2',
    type: 'milestone',
    date: '2024-03-20T14:00:00Z',
    title: 'Entry Two',
    content: 'Content two',
    tags: ['tag-b'],
  },
  {
    id: '3',
    type: 'project',
    date: '2025-06-10T09:00:00Z',
    title: 'Entry Three',
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
    it('zooms in when + clicked', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="year" />);
      fireEvent.click(screen.getByLabelText(/Zoom in/));
      expect(screen.getByText('MONTH')).toBeInTheDocument();
    });

    it('zooms out when - clicked', () => {
      render(<TimelineContainer entries={sampleEntries} defaultZoomLevel="month" />);
      fireEvent.click(screen.getByLabelText(/Zoom out/));
      expect(screen.getByText('YEAR')).toBeInTheDocument();
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
      const onZoomChange = jest.fn();
      render(
        <TimelineContainer
          entries={sampleEntries}
          zoomLevel="day"
          onZoomChange={onZoomChange}
        />
      );
      expect(screen.getByText('DAY')).toBeInTheDocument();
    });

    it('calls onZoomChange when zoom button clicked', () => {
      const onZoomChange = jest.fn();
      render(
        <TimelineContainer
          entries={sampleEntries}
          zoomLevel="month"
          onZoomChange={onZoomChange}
        />
      );
      fireEvent.click(screen.getByLabelText(/Zoom in/));
      expect(onZoomChange).toHaveBeenCalledWith('day');
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
      const entryButtons = document.querySelectorAll('.timeline-card__trigger');
      expect(entryButtons.length).toBeGreaterThan(0);
      fireEvent.click(entryButtons[0]);
      expect(onSelectEntry).toHaveBeenCalled();
    });
  });

  describe('entry expansion', () => {
    it('expands entry content on click', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', content: 'Expanded content here' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const trigger = document.querySelector('.timeline-card__trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger!);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapses on second click (toggle)', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const trigger = document.querySelector('.timeline-card__trigger')!;
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('collapses previous when selecting different entry', () => {
      const entries = [
        { id: '1', date: '2024-06-15', title: 'First', content: 'Content 1' },
        { id: '2', date: '2024-06-16', title: 'Second', content: 'Content 2' },
      ];
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="day" />
      );
      const triggers = document.querySelectorAll('.timeline-card__trigger');
      fireEvent.click(triggers[0]);
      expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(triggers[1]);
      expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
      expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapsed card body has inert attribute', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      const bodyInner = document.querySelector('.timeline-card__body-inner');
      expect(bodyInner).toHaveAttribute('inert');
    });

    it('expanded card body does not have inert', () => {
      const entriesWithContent = [
        { id: '1', date: '2024-06-15', title: 'Test', content: 'Content' },
      ];
      render(
        <TimelineContainer entries={entriesWithContent} defaultZoomLevel="day" />
      );
      fireEvent.click(document.querySelector('.timeline-card__trigger')!);
      const bodyInner = document.querySelector('.timeline-card__body-inner');
      expect(bodyInner).not.toHaveAttribute('inert');
    });

    it('entry with no content is still selectable', () => {
      const entries = [
        { id: '1', date: '2024-06-15', title: 'No content' },
      ];
      const onSelectEntry = jest.fn();
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="day" onSelectEntry={onSelectEntry} />
      );
      fireEvent.click(document.querySelector('.timeline-card__trigger')!);
      expect(onSelectEntry).toHaveBeenCalledWith('1');
    });

    it('HourView entries are always expanded', () => {
      const entries = [
        { id: '1', date: '2024-06-15T10:00:00Z', title: 'Hour entry', content: 'Full content' },
      ];
      render(
        <TimelineContainer entries={entries} defaultZoomLevel="hour" />
      );
      const trigger = document.querySelector('.timeline-card__trigger');
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
        const nodes = container.querySelectorAll('.timeline-node');
        expect(nodes.length).toBeGreaterThan(0);
        nodes.forEach((node) => {
          expect(node).toHaveClass('timeline-node--medium');
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
      const labels = container.querySelectorAll('.timeline-node__label');
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
      const labels = container.querySelectorAll('.timeline-node__label');
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

      expect(container.querySelectorAll('.timeline-container__static-entry').length).toBe(3);
      expect(container.querySelectorAll('.timeline-node').length).toBe(3);
      expect(container.querySelectorAll('.timeline-card').length).toBe(3);
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
});
