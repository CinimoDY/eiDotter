import React, { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
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

  it('renders the goal line with its label at the goal height', () => {
    const { container } = render(<SeriesBars points={seventeen} max={80} goal={70} goalLabel="Goal 70" />);
    const line = container.querySelector('.eidotter-series-bars__goal') as HTMLElement;
    expect(line).toBeInTheDocument();
    expect(line.style.bottom).toBe('87.5%');
    expect(within(line).getByText('Goal 70')).toBeInTheDocument();
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
});

describe('SeriesBars CSS', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const css = require('fs').readFileSync(require('path').join(__dirname, 'SeriesBars.css'), 'utf8') as string;

  it('has print, forced-colors and contrast blocks', () => {
    expect(css).toMatch(/@media print[\s\S]*print-color-adjust:\s*exact/);
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('@media (prefers-contrast: high)');
  });
});
