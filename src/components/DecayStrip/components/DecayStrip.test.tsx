import React, { createRef } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen } from '@testing-library/react';
import { DecayStrip } from './DecayStrip';
import type { DecayStripItem } from './DecayStrip';

const MIN = 60_000;
const FROM = Date.UTC(2026, 0, 1, 12, 0);
const TO = FROM + 120 * MIN;
const WINDOW = { from: FROM, to: TO };
const NOW = FROM + 60 * MIN;

/** Linear decay from 1 at FROM to 0 at FROM + 90 min, one sample per 10 min. */
const samples = Array.from({ length: 13 }, (_, k) => ({
  t: FROM + k * 10 * MIN,
  remaining: Math.max(0, 1 - k / 9),
}));

const items: DecayStripItem[] = [
  { id: 'a', label: 'Sample a', amount: 40, unit: 'units', remainingShare: 0.55, provenance: 'estimated' },
  { id: 'b', label: 'Sample b', amount: 2, unit: 'units', remainingShare: 0.3, provenance: 'measured' },
];

const time = (ms: number, locale = 'en') =>
  new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(ms);

const strip = (props: Partial<React.ComponentProps<typeof DecayStrip>> = {}) => (
  <DecayStrip
    items={items}
    samples={samples}
    now={NOW}
    window={WINDOW}
    provenance="modelled"
    {...props}
  />
);

const cells = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.eidotter-decay-strip__cell'));

describe('DecayStrip', () => {
  it('renders one cell per column (24 by default)', () => {
    const { container } = render(strip());
    expect(cells(container)).toHaveLength(24);
  });

  it('marks cells after now as future and the cell containing now with the marker', () => {
    const { container } = render(strip());
    const all = cells(container);
    // 5-minute cells: now (+60 min) sits in cell 12.
    expect(all[12]).toHaveClass('eidotter-decay-strip__cell--now');
    expect(all[12]).toHaveTextContent('│');
    expect(container.querySelectorAll('.eidotter-decay-strip__cell--now')).toHaveLength(1);
    expect(all.slice(13).every((c) => c.classList.contains('eidotter-decay-strip__cell--future'))).toBe(true);
    expect(all.slice(0, 12).every((c) => c.classList.contains('eidotter-decay-strip__cell--past'))).toBe(true);
  });

  it('renders past cells from the block ladder scaled by remaining, future cells dimmed', () => {
    const { container } = render(strip());
    const all = cells(container);
    expect(all[0]).toHaveTextContent('█');
    expect(all[23]).toHaveTextContent('░');
    expect(all[23]).toHaveClass('opacity-50');
    expect(all[0]).not.toHaveClass('opacity-50');
  });

  it.each([
    ['after', TO + 10 * MIN],
    ['before', FROM - 10 * MIN],
  ])('renders no marker and no future cells when now is %s the window', (_, now) => {
    const { container } = render(strip({ now }));
    expect(container.querySelector('.eidotter-decay-strip__cell--now')).toBeNull();
    expect(container.querySelector('.eidotter-decay-strip__cell--future')).toBeNull();
    expect(cells(container)).toHaveLength(24);
  });

  it('requires provenance at the type level on the strip and on each item', () => {
    // @ts-expect-error provenance is required on the strip
    const missing = <DecayStrip items={[]} samples={[]} now={NOW} window={WINDOW} />;
    // @ts-expect-error provenance is required on each item
    const item: DecayStripItem = { id: 'x', label: 'x', amount: 1, unit: 'u', remainingShare: 1 };
    expect(missing).toBeDefined();
    expect(item).toBeDefined();
  });

  it('keys item rows by id, so removing an item removes only its row', () => {
    const { rerender } = render(strip());
    const rowB = screen.getByRole('meter', { name: /Sample b/ });
    rerender(strip({ items: [items[1]] }));
    expect(screen.queryByRole('meter', { name: /Sample a/ })).toBeNull();
    expect(screen.getAllByRole('meter')).toHaveLength(1);
    expect(screen.getByRole('meter', { name: /Sample b/ })).toBe(rowB);
  });

  it('renders item rows as small Gauges at md and lg, and a text list at sm', () => {
    const { container, rerender } = render(strip({ size: 'lg' }));
    expect(container.querySelectorAll('.eidotter-gauge--sm')).toHaveLength(2);
    rerender(strip({ size: 'sm' }));
    expect(container.querySelector('.eidotter-gauge')).toBeNull();
    const rows = container.querySelectorAll('.eidotter-decay-strip__item');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent('Sample a');
    expect(rows[0]).toHaveTextContent('40 units');
    expect(rows[0]).toHaveTextContent('55% remaining');
    expect(rows[0]).toHaveTextContent('estimated');
    expect(rows[1]).not.toHaveTextContent('measured');
  });

  it('renders EmptyState for no items while the strip still renders', () => {
    const { container } = render(strip({ items: [] }));
    expect(container.querySelector('.eidotter-empty-state')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(cells(container)).toHaveLength(24);
  });

  it('gives the now marker the pulse class only with announce; reduced motion breathes it', () => {
    const { container, rerender } = render(strip());
    expect(container.querySelector('.eidotter-health-pulse')).toBeNull();
    rerender(strip({ announce: true }));
    expect(container.querySelector('.eidotter-decay-strip__cell--now')).toHaveClass(
      'eidotter-health-pulse',
    );
    const css = readFileSync(join(__dirname, '../../../styles/health-patterns.css'), 'utf8');
    const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(reduced).toMatch(/\.eidotter-health-pulse\s*\{\s*animation:\s*eidotter-health-breathe/);
    expect(reduced.slice(0, reduced.indexOf('}\n}'))).not.toMatch(/animation:\s*none/);
  });

  it('composes a summary naming each item, its remaining share, time to zero, the window and provenance', () => {
    render(strip());
    const name = screen.getByRole('img').getAttribute('aria-label') ?? '';
    expect(name).toContain('Sample a 40 units: 55% remaining, estimated');
    expect(name).toContain('Sample b 2 units: 30% remaining');
    expect(name).toContain(`${time(FROM)}–${time(TO)}`);
    expect(name).toContain(`now ${time(NOW)}`);
    // Samples reach zero at +90 min, 30 minutes after now.
    expect(name).toContain('0% in 30 minutes');
    expect(name).toContain('modelled');
  });

  it('omits time to zero when the curve is already at zero before now', () => {
    render(strip({ now: FROM + 100 * MIN }));
    expect(screen.getByRole('img').getAttribute('aria-label')).not.toMatch(/ in \d/);
  });

  it('renders the window start and end as locale-formatted time labels', () => {
    const { container, rerender } = render(strip());
    expect(container.querySelector('.eidotter-decay-strip__from')).toHaveTextContent(time(FROM));
    expect(container.querySelector('.eidotter-decay-strip__to')).toHaveTextContent(time(TO));
    rerender(strip({ locale: 'de' }));
    expect(container.querySelector('.eidotter-decay-strip__from')).toHaveTextContent(
      time(FROM, 'de'),
    );
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('55 % remaining');
  });

  it('formats the time labels in the timeZone prop', () => {
    const { container, rerender } = render(strip({ timeZone: 'UTC' }));
    const utc = container.querySelector('.eidotter-decay-strip__from')?.textContent;
    rerender(strip({ timeZone: 'Asia/Tokyo' }));
    const tokyo = container.querySelector('.eidotter-decay-strip__from')?.textContent;
    expect(utc).toBe(
      new Intl.DateTimeFormat('en', { timeStyle: 'short', timeZone: 'UTC' }).format(FROM),
    );
    expect(tokyo).toBe(
      new Intl.DateTimeFormat('en', { timeStyle: 'short', timeZone: 'Asia/Tokyo' }).format(FROM),
    );
    expect(utc).not.toBe(tokyo);
  });

  it('renders the placeholder for an invalid window instead of throwing', () => {
    let result: ReturnType<typeof render> | undefined;
    expect(() => {
      result = render(strip({ window: { from: 'not a date', to: 'also not' } }));
    }).not.toThrow();
    const { container } = result!;
    expect(container.querySelector('.eidotter-decay-strip__from')).toHaveTextContent('--');
    expect(container.querySelector('.eidotter-decay-strip__to')).toHaveTextContent('--');
    expect(container.textContent).not.toMatch(/NaN|Invalid/);
  });

  it('renders without throwing for an invalid now and omits the now label', () => {
    let result: ReturnType<typeof render> | undefined;
    expect(() => {
      result = render(strip({ now: 'not a date' }));
    }).not.toThrow();
    const label = screen.getByRole('img').getAttribute('aria-label') ?? '';
    expect(label).not.toMatch(/NaN|Invalid/);
    expect(label).not.toMatch(/\bnow\b/);
    expect(result!.container.querySelector('.eidotter-decay-strip__cell--now')).toBeNull();
  });

  it('shows the strip provenance tag for modelled and estimated, none for measured', () => {
    const { container, rerender } = render(strip({ items: [] }));
    expect(container.querySelector('.eidotter-decay-strip__provenance')).toHaveTextContent(
      'modelled',
    );
    rerender(strip({ items: [], provenance: 'measured' }));
    expect(container.querySelector('.eidotter-decay-strip__provenance')).toBeNull();
  });

  it('renders an unknown share as unknown, never NaN', () => {
    const { container } = render(
      strip({ size: 'sm', items: [{ ...items[0], remainingShare: NaN, amount: null }] }),
    );
    expect(container.textContent).not.toMatch(/NaN/);
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Sample a --: unknown');
  });

  it('carries no aria-live by default; announce adds a polite live region', () => {
    const { container, rerender } = render(strip());
    expect(container.querySelector('[aria-live]')).toBeNull();
    expect(container.querySelector('[role="alert"]')).toBeNull();
    rerender(strip({ announce: true }));
    const live = container.querySelectorAll('[aria-live]');
    expect(live).toHaveLength(1);
    expect(live[0]).toHaveAttribute('aria-live', 'polite');
    expect(live[0]).toHaveTextContent('Sample a 40 units: 55% remaining');
  });

  describe('narrow widths (DMNC-1573)', () => {
    const css = readFileSync(join(__dirname, 'DecayStrip.css'), 'utf8');

    it('lays the cells out as a flex row of shrinkable cells, all 24 kept', () => {
      const { container } = render(strip());
      expect(container.querySelector('.eidotter-decay-strip__cells')).toHaveClass('flex', 'min-w-0');
      expect(cells(container)).toHaveLength(24);
      expect(css).toMatch(/\.eidotter-decay-strip__cell \{[^}]*flex: 0 1 auto;[^}]*min-width: 0;/);
    });

    it('is a size container and moves the from/to labels under the cells when narrow', () => {
      expect(css).toMatch(/\.eidotter-decay-strip \{[^}]*container-type: inline-size;/);
      const block = css.slice(css.indexOf('@container eidotter-decay-strip (max-width: 30rem)'));
      expect(block).toMatch(/\.eidotter-decay-strip__strip \{[^}]*flex-wrap: wrap;/);
      expect(block).toMatch(/\.eidotter-decay-strip__cells \{[^}]*order: -1;[^}]*flex: 1 0 100%;/);
    });

    it('still summarises the full window', () => {
      render(strip({ columns: 48 }));
      expect(screen.getByRole('img').getAttribute('aria-label')).toContain(`${time(FROM)}–${time(TO)}`);
    });

    it.each(['sm', 'md', 'lg'] as const)('keeps the brand colour next to the %s size class', (size) => {
      const { container } = render(strip({ size }));
      expect(container.firstChild).toHaveClass('text-dos-text-brand', `eidotter-decay-strip--${size}`);
    });
  });

  it('applies the tone class, forwards ref and passes className to the root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <DecayStrip
        ref={ref}
        items={items}
        samples={samples}
        now={NOW}
        window={WINDOW}
        provenance="modelled"
        tone="info"
        className="custom"
      />,
    );
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass('eidotter-decay-strip', 'eidotter-tone--info', 'custom');
  });
});
