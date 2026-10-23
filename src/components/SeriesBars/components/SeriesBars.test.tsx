import React, { createRef } from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { SeriesBars } from './SeriesBars';
import { fixtureSeries } from '../../../fixtures/health';

// FIXTURE ONLY: 17 synthetic points.
const seventeen = Array.from({ length: 17 }, (_, i) => ({ label: `P${i + 1}`, value: 40 + i * 2 }));

const bars = (c: HTMLElement) => Array.from(c.querySelectorAll<HTMLElement>('.eidotter-series-bars__bar'));
const ticks = (c: HTMLElement) =>
  Array.from(c.querySelectorAll('.eidotter-series-bars__tick')).filter((e) => e.textContent);

describe('SeriesBars', () => {
  it('labels every second bar when tickEvery is 2 over 17 points', () => {
    const { container } = render(<SeriesBars points={seventeen} max={80} tickEvery={2} />);
    expect(bars(container)).toHaveLength(17);
    expect(ticks(container).map((e) => e.textContent)).toEqual(
      ['P1', 'P3', 'P5', 'P7', 'P9', 'P11', 'P13', 'P15', 'P17'],
    );
  });

  it('renders the goal line at the goal height and its label in the reserved band', () => {
    const { container } = render(<SeriesBars points={seventeen} max={80} goal={70} goalLabel="Goal 70" />);
    const line = container.querySelector('.eidotter-series-bars__goal') as HTMLElement;
    expect(line).toBeInTheDocument();
    expect(line.style.bottom).toBe('87.5%');
    expect(line.closest('.eidotter-series-bars__plot')).not.toBeNull();
    const frame = container.querySelector('.eidotter-series-bars__frame') as HTMLElement;
    expect(within(frame).getByText('Goal 70')).toHaveClass('eidotter-series-bars__goal-tag');
  });

  describe('goal label placement (DMNC-1573)', () => {
    it('keeps the tag out of every bar, the goal line and the plot', () => {
      const { container } = render(<SeriesBars points={seventeen} max={80} goal={70} goalLabel="Goal 70" />);
      const tag = container.querySelector('.eidotter-series-bars__goal-tag') as HTMLElement;
      expect(tag.closest('.eidotter-series-bars__bar')).toBeNull();
      bars(container).forEach((bar) => expect(bar.contains(tag)).toBe(false));
      expect(tag.closest('.eidotter-series-bars__goal')).toBeNull();
      expect(tag.closest('.eidotter-series-bars__plot')).toBeNull();
    });

    it('reserves a padded label band above the plot only when there is a goal label', () => {
      const { container, rerender } = render(
        <SeriesBars points={seventeen} max={80} goal={70} goalLabel="Goal 70" />,
      );
      const frame = () => container.querySelector('.eidotter-series-bars__frame');
      expect(frame()).toHaveClass('eidotter-series-bars__frame--goal-band');
      rerender(<SeriesBars points={seventeen} max={80} goal={70} />);
      expect(frame()).not.toHaveClass('eidotter-series-bars__frame--goal-band');
      expect(container.querySelector('.eidotter-series-bars__goal-tag')).toBeNull();
      const css = readFileSync(join(__dirname, 'SeriesBars.css'), 'utf8');
      expect(css).toMatch(
        /\.eidotter-series-bars__frame--goal-band \{[^}]*--eidotter-series-goal-band:[^}]*padding-top: var\(--eidotter-series-goal-band\);/,
      );
      expect(css).toMatch(
        /\.eidotter-series-bars__goal-tag \{[^}]*top: 0;[^}]*right: 0;[^}]*background: var\(--color-semantic-background-primary\);/,
      );
    });
  });

  it('gives points at or above the goal the success tone via toneFor', () => {
    const { container } = render(
      <SeriesBars
        points={[{ label: 'lo', value: 69 }, { label: 'at', value: 70 }, { label: 'hi', value: 75 }]}
        max={80}
        goal={70}
        toneFor={[{ from: -Infinity, tone: 'warning' }, { from: 70, tone: 'success' }]}
      />,
    );
    const b = bars(container);
    expect(b[0]).toHaveClass('eidotter-tone--warning');
    expect(b[1]).toHaveClass('eidotter-tone--success');
    expect(b[2]).toHaveClass('eidotter-tone--success');
    expect(b[1]).toHaveClass('eidotter-fill--dither');
    expect(b[0]).toHaveClass('eidotter-fill--hatch');
    // Filled hues come from the tone class in health-patterns.css, not inline.
    expect(b[1].style.getPropertyValue('--eidotter-fill')).toBe('');
  });

  it('defaults points at or above the goal to success when toneFor is absent', () => {
    const { container } = render(
      <SeriesBars points={[{ label: 'lo', value: 10 }, { label: 'hi', value: 75 }]} max={80} goal={70} />,
    );
    const b = bars(container);
    expect(b[0]).toHaveClass('eidotter-tone--neutral');
    expect(b[1]).toHaveClass('eidotter-tone--success');
  });

  it('sizes bar height as a share of max and clamps at max', () => {
    const { container } = render(
      <SeriesBars points={[{ label: 'a', value: 40 }, { label: 'b', value: 200 }]} max={80} />,
    );
    const b = bars(container);
    expect(b[0].style.height).toBe('50%');
    expect(b[1].style.height).toBe('100%');
  });

  it('renders a null point as a placeholder gap, not a zero-height bar', () => {
    const { container } = render(
      <SeriesBars points={[{ label: 'a', value: 40 }, { label: 'b', value: null }]} max={80} />,
    );
    expect(bars(container)).toHaveLength(1);
    const gap = container.querySelector('.eidotter-series-bars__gap') as HTMLElement;
    expect(gap).toHaveTextContent('--');
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
  });

  it('exposes an img summary and a separate accessible table fallback', () => {
    render(
      <SeriesBars
        points={[{ label: 'Q1', value: 40 }, { label: 'Q2', value: null }]}
        max={80}
        goal={70}
        goalLabel="Goal"
      />,
    );
    const img = screen.getByRole('img');
    const name = img.getAttribute('aria-label') as string;
    expect(name).toContain('Q1');
    expect(name).toContain('40');
    expect(name).toContain('Q2');
    expect(name).toContain('unknown');
    const table = screen.getByRole('table');
    expect(table).toHaveClass('sr-only');
    expect(img.contains(table)).toBe(false);
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(within(table).getByText('unknown')).toBeInTheDocument();
  });

  it('uses the labels override for unknown', () => {
    render(<SeriesBars points={[{ label: 'a', value: null }]} max={10} labels={{ unknown: 'unbekannt' }} />);
    expect(within(screen.getByRole('table')).getByText('unbekannt')).toBeInTheDocument();
  });

  it('formats values with the locale prop', () => {
    render(<SeriesBars points={[{ label: 'a', value: 1234.5 }]} max={2000} locale="de" />);
    expect(within(screen.getByRole('table')).getByText('1.234,5')).toBeInTheDocument();
  });

  it.each([
    ['sm', 'h-[6rem]'],
    ['md', 'h-[10rem]'],
    ['lg', 'h-[14rem]'],
  ] as const)('applies the %s block class and plot height', (size, height) => {
    const { container } = render(<SeriesBars points={seventeen} max={80} size={size} />);
    expect(container.firstChild).toHaveClass(`eidotter-series-bars--${size}`);
    expect(container.querySelector('.eidotter-series-bars__plot')).toHaveClass(height);
  });

  it('derives max from the data when omitted', () => {
    const { container } = render(
      <SeriesBars points={fixtureSeries.map((s) => ({ label: `${s.t}`, value: s.value }))} />,
    );
    const top = bars(container).find((b) => b.style.height === '100%');
    expect(top).toBeDefined();
  });

  it('forwards ref and className', () => {
    const ref = createRef<HTMLDivElement>();
    render(<SeriesBars ref={ref} points={seventeen} max={80} className="custom" />);
    expect(ref.current).toHaveClass('eidotter-series-bars', 'custom');
  });

  describe('x-axis ticks (DMNC-1610)', () => {
    const cells = (c: HTMLElement) => Array.from(c.querySelectorAll<HTMLElement>('.eidotter-series-bars__tick-cell'));

    it('lets a sparse tick overflow into its empty neighbours instead of truncating', () => {
      const { container } = render(<SeriesBars points={seventeen} max={80} tickEvery={4} />);
      expect(cells(container)).toHaveLength(17);
      const shown = ticks(container);
      expect(shown.map((e) => e.textContent)).toEqual(['P1', 'P5', 'P9', 'P13', 'P17']);
      shown.forEach((t) => {
        expect(t).toHaveClass('whitespace-nowrap');
        expect(t).not.toHaveClass('truncate');
      });
    });

    it('pins the first label to the left plot edge and the last to the right', () => {
      const { container } = render(<SeriesBars points={seventeen} max={80} tickEvery={4} />);
      const c = cells(container);
      expect(c[0]).toHaveClass('justify-start');
      expect(c[16]).toHaveClass('justify-end');
      c.slice(1, 16).forEach((cell) => expect(cell).toHaveClass('justify-center'));
      expect(c[0].textContent).toBe('P1');
      expect(c[16].textContent).toBe('P17');
    });

    it('still truncates when every bar is labelled, since no neighbour is empty', () => {
      const { container } = render(<SeriesBars points={seventeen} max={80} />);
      ticks(container).forEach((t) => expect(t).toHaveClass('truncate'));
    });
  });

  describe('unit and format (DMNC-1610)', () => {
    // FIXTURE ONLY: synthetic shares.
    const shares = [{ label: 'W1', value: 64 }, { label: 'W2', value: 72 }];

    it('appends the unit to every value and the goal in the table and the summary', () => {
      render(<SeriesBars points={shares} max={100} goal={70} goalLabel="Goal" unit="%" />);
      const table = screen.getByRole('table');
      expect(within(table).getByText('64 %')).toBeInTheDocument();
      expect(within(table).getByText('70 %')).toBeInTheDocument();
      const name = screen.getByRole('img').getAttribute('aria-label') as string;
      expect(name).toBe('W1 64 %, W2 72 %, Goal 70 %');
    });

    it('reuses formatValue options, e.g. a locale percent', () => {
      render(<SeriesBars points={shares} max={100} goal={70} goalLabel="Ziel" locale="de" format={{ percent: true }} />);
      const name = screen.getByRole('img').getAttribute('aria-label') as string;
      expect(name).toMatch(/^W1 64\s%, W2 72\s%, Ziel 70\s%$/);
    });

    it('applies fixed digits to values and the goal', () => {
      render(<SeriesBars points={shares} max={100} goal={70} format={{ digits: 1 }} unit="u" />);
      expect(within(screen.getByRole('table')).getByText('70.0 u')).toBeInTheDocument();
    });

    it('does not repeat a goal value the goal label already carries', () => {
      render(<SeriesBars points={shares} max={100} goal={70} goalLabel="Ziel 70 %" unit="%" />);
      const name = screen.getByRole('img').getAttribute('aria-label') as string;
      expect(name).toBe('W1 64 %, W2 72 %, Ziel 70 %');
    });

    it('keeps the goal value when the label only contains its digits inside another number', () => {
      render(<SeriesBars points={shares} max={200} goal={70} goalLabel="Goal 170" />);
      expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Goal 170 70');
    });

    it('server-renders the unit into the value table and the summary', () => {
      const html = renderToString(<SeriesBars points={shares} max={100} goal={70} goalLabel="Goal" unit="%" />);
      expect(html).toContain('aria-label="W1 64 %, W2 72 %, Goal 70 %"');
      expect(html).toMatch(/<td>70 %<\/td>/);
    });
  });
});

describe('SeriesBars CSS', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const css = require('fs').readFileSync(require('path').join(__dirname, 'SeriesBars.css'), 'utf8') as string;

  it('has print, forced-colors and contrast blocks', () => {
    expect(css).toMatch(/@media print[\s\S]*print-color-adjust:\s*exact/);
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('@media (prefers-contrast: high)');
  });

  it('prints the goal tag and the ticks black on paper, not on the dark screen background (DMNC-1610)', () => {
    const print = css.slice(css.indexOf('@media print'), css.indexOf('@media (prefers-contrast'));
    expect(print).toMatch(/\.eidotter-series-bars__goal-tag \{[^}]*background: Canvas;[^}]*color: CanvasText;/);
    expect(print).toMatch(/\.eidotter-series-bars__ticks,[^{]*\{[^}]*color: CanvasText;/);
    expect(print).toMatch(/\.eidotter-series-bars__bar\.eidotter-fill--none \{\s*border-color: CanvasText;/);
  });
});
