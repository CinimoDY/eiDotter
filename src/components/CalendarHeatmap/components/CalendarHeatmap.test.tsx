import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarHeatmap, type HeatmapStatus } from './CalendarHeatmap';

const MONTH = '2026-06';

describe('CalendarHeatmap', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<CalendarHeatmap ref={ref} month={MONTH} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders Monday-first weekday headers by default', () => {
    const { container } = render(<CalendarHeatmap month={MONTH} />);
    const heads = container.querySelectorAll('.eidotter-calendar-heatmap__head');
    expect(Array.from(heads).map((h) => h.textContent)).toEqual([
      'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU',
    ]);
  });

  it('renders Sunday-first weekday headers when weekStart="sunday"', () => {
    const { container } = render(<CalendarHeatmap month={MONTH} weekStart="sunday" />);
    const heads = container.querySelectorAll('.eidotter-calendar-heatmap__head');
    expect(heads[0].textContent).toBe('SU');
  });

  it('paints status glyphs for the given days', () => {
    const statuses: Record<string, HeatmapStatus> = {
      '2026-06-01': 'success',
      '2026-06-02': 'fail',
    };
    const { container } = render(<CalendarHeatmap month={MONTH} statuses={statuses} />);
    const grid = container.querySelector('.eidotter-calendar-heatmap__grid') as HTMLElement;
    const successCells = grid.querySelectorAll('.eidotter-calendar-heatmap__cell--success');
    const failCells = grid.querySelectorAll('.eidotter-calendar-heatmap__cell--fail');
    expect(successCells).toHaveLength(1);
    expect(successCells[0].textContent).toBe('█');
    expect(failCells).toHaveLength(1);
    expect(failCells[0].textContent).toBe('░');
  });

  it('applies defaultStatus to in-month days without an entry', () => {
    const { container } = render(
      <CalendarHeatmap month={MONTH} statuses={{}} defaultStatus="pending" />
    );
    const grid = container.querySelector('.eidotter-calendar-heatmap__grid') as HTMLElement;
    // June 2026 has 30 days.
    expect(
      grid.querySelectorAll('.eidotter-calendar-heatmap__cell--pending')
    ).toHaveLength(30);
  });

  it('summarises counts in the grid aria-label', () => {
    const statuses: Record<string, HeatmapStatus> = {
      '2026-06-01': 'success',
      '2026-06-02': 'success',
      '2026-06-03': 'fail',
    };
    render(<CalendarHeatmap month={MONTH} statuses={statuses} />);
    expect(
      screen.getByRole('img', { name: 'June 2026: 2 done, 1 missed' })
    ).toBeInTheDocument();
  });

  it('accepts a custom aria-label', () => {
    render(<CalendarHeatmap month={MONTH} aria-label="My streak" />);
    expect(screen.getByRole('img', { name: 'My streak' })).toBeInTheDocument();
  });

  it('toggles the legend', () => {
    const { container, rerender } = render(
      <CalendarHeatmap month={MONTH} showLegend />
    );
    expect(
      container.querySelector('.eidotter-calendar-heatmap__legend')
    ).toBeInTheDocument();

    rerender(<CalendarHeatmap month={MONTH} showLegend={false} />);
    expect(
      container.querySelector('.eidotter-calendar-heatmap__legend')
    ).not.toBeInTheDocument();
  });

  it('exposes successColor via a CSS custom property', () => {
    const { container } = render(
      <CalendarHeatmap month={MONTH} successColor="#55FF55" />
    );
    expect(
      (container.firstChild as HTMLElement).style.getPropertyValue('--heatmap-success')
    ).toBe('#55FF55');
  });

  it('honours glyph overrides', () => {
    const { container } = render(
      <CalendarHeatmap
        month={MONTH}
        statuses={{ '2026-06-01': 'success' }}
        glyphs={{ success: 'X' }}
        showLegend={false}
      />
    );
    const grid = container.querySelector('.eidotter-calendar-heatmap__grid') as HTMLElement;
    expect(
      grid.querySelector('.eidotter-calendar-heatmap__cell--success')?.textContent
    ).toBe('X');
  });

  it('accepts a full YYYY-MM-DD month anchor', () => {
    const { container } = render(<CalendarHeatmap month="2026-06-15" />);
    const grid = container.querySelector('.eidotter-calendar-heatmap__grid') as HTMLElement;
    // 30 day cells + leading/trailing empties; just assert it rendered weeks.
    expect(grid.querySelectorAll('.eidotter-calendar-heatmap__row').length).toBeGreaterThan(1);
  });

  it('renders gracefully for an invalid month', () => {
    const { container } = render(<CalendarHeatmap month="not-a-month" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    // No day rows beyond the weekday header.
    const grid = container.querySelector('.eidotter-calendar-heatmap__grid') as HTMLElement;
    expect(grid.querySelectorAll('.eidotter-calendar-heatmap__row')).toHaveLength(1);
  });
});
