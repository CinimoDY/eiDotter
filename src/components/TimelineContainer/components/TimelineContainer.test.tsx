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
      const entryButtons = document.querySelectorAll('.timeline-view__entry-button');
      expect(entryButtons.length).toBeGreaterThan(0);
      fireEvent.click(entryButtons[0]);
      expect(onSelectEntry).toHaveBeenCalled();
    });
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
});
