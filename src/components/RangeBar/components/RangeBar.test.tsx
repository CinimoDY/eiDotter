import React, { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { RangeBar } from './RangeBar';
import { fixtureShares } from '../../../fixtures/health';

// Synthetic shares, FIXTURE ONLY: 2 + 3 + 61 + 29 + 5 = 100.
const five = [
  { id: 'a', label: 'Band A', share: 2, tone: 'critical' as const, bound: '< 1', duration: '30 min' },
  { id: 'b', label: 'Band B', share: 3, tone: 'warning' as const },
  { id: 'c', label: 'Band C', share: 61, tone: 'success' as const, duration: '14 h' },
  { id: 'd', label: 'Band D', share: 29, tone: 'info' as const },
  { id: 'e', label: 'Band E', share: 5, tone: 'critical' as const },
];

const segs = (c: HTMLElement) => Array.from(c.querySelectorAll<HTMLElement>('.eidotter-range-bar__seg'));

describe('RangeBar', () => {
  it('renders five segments weighted by share and a five-row legend', () => {
    const { container } = render(<RangeBar segments={five} />);
    const s = segs(container);
    expect(s).toHaveLength(5);
    expect(s.map((e) => e.style.flexGrow)).toEqual(['2', '3', '61', '29', '5']);
    const legend = screen.getByRole('list');
    expect(legend.tagName).toBe('UL');
    expect(within(legend).getAllByRole('listitem')).toHaveLength(5);
  });

  it('floors the flex weight of a tiny segment at minSegmentShare', () => {
    const { container } = render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: 0.1, tone: 'info' }, { id: 'b', label: 'B', share: 99.9, tone: 'success' }]} />,
    );
    expect(segs(container)[0].style.flexGrow).toBe('0.6');
  });

  it('adds a muted other segment when shares sum below 100', () => {
    const { container } = render(
      <RangeBar
        segments={[{ id: 'a', label: 'A', share: 60, tone: 'success' }, { id: 'b', label: 'B', share: 39.2, tone: 'info' }]}
      />,
    );
    const s = segs(container);
    expect(s).toHaveLength(3);
    expect(s[2].style.flexGrow).toBe('0.8');
    expect(s[2]).toHaveClass('eidotter-tone--neutral');
    expect(within(screen.getByRole('list')).getByText('other')).toBeInTheDocument();
  });

  it('gives the synthesized remainder a reserved id that cannot collide with a consumer id', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const { container } = render(
        <RangeBar
          segments={[
            { id: 'other', label: 'Consumer other', share: 30, tone: 'info' },
            { id: 'b', label: 'B', share: 50, tone: 'success' },
          ]}
        />,
      );
      const ids = segs(container).map((e) => e.getAttribute('data-segment-id'));
      expect(ids).toHaveLength(3);
      expect(new Set(ids).size).toBe(3);
      expect(ids[2]).toBe('__eidotter-other');
      expect(error).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
    }
  });

  it('does not append the remainder when a consumer segment already uses the reserved id', () => {
    const { container } = render(
      <RangeBar
        segments={[
          { id: 'a', label: 'A', share: 40, tone: 'info' },
          { id: '__eidotter-other', label: 'Mine', share: 20, tone: 'neutral' },
        ]}
      />,
    );
    const ids = segs(container).map((e) => e.getAttribute('data-segment-id'));
    expect(ids).toEqual(['a', '__eidotter-other']);
  });

  it('sets the neutral hue inline on the remainder, since the neutral tone class sets none', () => {
    const { container } = render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: 50, tone: 'info' }]} />,
    );
    const s = segs(container);
    expect(s[0].style.getPropertyValue('--eidotter-fill')).toBe('');
    expect(s[1].style.getPropertyValue('--eidotter-fill')).toBe('var(--color-semantic-text-muted)');
  });

  it('uses the labels override for the other segment', () => {
    render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: 50, tone: 'info' }]} labels={{ other: 'Rest' }} />,
    );
    expect(within(screen.getByRole('list')).getByText('Rest')).toBeInTheDocument();
  });

  it('normalises shares summing to 100.3 without an other segment', () => {
    const { container } = render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: 50.3, tone: 'success' }, { id: 'b', label: 'B', share: 50, tone: 'info' }]} />,
    );
    const s = segs(container);
    expect(s).toHaveLength(2);
    const total = s.reduce((n, e) => n + Number(e.style.flexGrow), 0);
    expect(total).toBeCloseTo(100, 5);
  });

  it('renders no inline percent under labelThreshold but keeps the legend row', () => {
    const { container } = render(<RangeBar segments={five} />);
    const inline = Array.from(container.querySelectorAll('.eidotter-range-bar__pct')).map((e) => e.textContent);
    expect(inline).toEqual(['61%', '29%']);
    expect(within(screen.getByRole('list')).getAllByRole('listitem')[0]).toHaveTextContent('Band A');
  });

  it('respects a custom labelThreshold', () => {
    const { container } = render(<RangeBar segments={five} labelThreshold={3} />);
    expect(container.querySelectorAll('.eidotter-range-bar__pct')).toHaveLength(4);
  });

  it('never draws the inline percent inside a segment fill', () => {
    const { container } = render(<RangeBar segments={five} />);
    segs(container).forEach((e) => expect(e.textContent).toBe(''));
  });

  it('renders a target tick on the named segment and the target label', () => {
    const { container } = render(
      <RangeBar segments={five} target={{ segmentId: 'c', minShare: 70, label: 'Goal above 70%' }} />,
    );
    const ticks = container.querySelectorAll('.eidotter-range-bar__target');
    expect(ticks).toHaveLength(1);
    expect(ticks[0].closest('.eidotter-range-bar__seg')).toHaveAttribute('data-segment-id', 'c');
    expect(screen.getByText('Goal above 70%')).toBeInTheDocument();
  });

  it('gives each segment a pattern class and the tone class that sets --eidotter-fill', () => {
    const { container } = render(<RangeBar segments={five} />);
    segs(container).forEach((e) => {
      expect(e.className).toMatch(/eidotter-fill--(solid|dither|hatch|dotted)/);
      expect(e.className).toMatch(/eidotter-tone--(info|success|warning|critical)/);
      // Filled hues come from the tone class in health-patterns.css, not inline.
      expect(e.style.getPropertyValue('--eidotter-fill')).toBe('');
    });
    expect(segs(container)[2]).toHaveClass('eidotter-fill--dither');
  });

  it('lets an explicit pattern win over the tone default', () => {
    const { container } = render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: 100, tone: 'success', pattern: 'hatch' }]} />,
    );
    expect(segs(container)[0]).toHaveClass('eidotter-fill--hatch');
  });

  it('composes an img summary naming every segment and share', () => {
    render(<RangeBar segments={five} />);
    const name = screen.getByRole('img').getAttribute('aria-label') as string;
    ['Band A 2%', 'Band B 3%', 'Band C 61%', 'Band D 29%', 'Band E 5%'].forEach((t) => expect(name).toContain(t));
  });

  it('renders legend swatch, bound, percent and duration', () => {
    render(<RangeBar segments={five} />);
    const row = within(screen.getByRole('list')).getAllByRole('listitem')[0];
    expect(row).toHaveTextContent('< 1');
    expect(row).toHaveTextContent('2%');
    expect(row).toHaveTextContent('30 min');
    expect(row.querySelector('.eidotter-range-bar__swatch')).toHaveAttribute('aria-hidden', 'true');
  });

  it('hides the legend when showLegend is false', () => {
    render(<RangeBar segments={five} showLegend={false} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('formats percent with the locale prop', () => {
    render(<RangeBar segments={[{ id: 'a', label: 'A', share: 93, tone: 'info' }]} locale="de" />);
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('93 %');
  });

  it('treats a non-finite share as zero and never prints NaN', () => {
    const { container } = render(
      <RangeBar segments={[{ id: 'a', label: 'A', share: NaN, tone: 'info' }, { id: 'b', label: 'B', share: 100, tone: 'success' }]} />,
    );
    expect(container.textContent).not.toMatch(/NaN/);
  });

  it.each([
    ['vertical', 'eidotter-range-bar--vertical'],
    ['horizontal', 'eidotter-range-bar--horizontal'],
  ] as const)('applies the %s orientation class', (orientation, cls) => {
    const { container } = render(<RangeBar segments={five} orientation={orientation} />);
    expect(container.firstChild).toHaveClass(cls);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size class', (size) => {
    const { container } = render(<RangeBar segments={five} size={size} />);
    expect(container.firstChild).toHaveClass(`eidotter-range-bar--${size}`);
  });

  it('accepts fixtureShares mapped to segments', () => {
    const { container } = render(
      <RangeBar
        segments={fixtureShares.map(({ band, share }, i) => ({ id: `f${i}`, label: band.label, share, tone: band.tone }))}
      />,
    );
    expect(segs(container)).toHaveLength(4);
  });

  it('forwards ref and className', () => {
    const ref = createRef<HTMLDivElement>();
    render(<RangeBar ref={ref} segments={five} className="custom" />);
    expect(ref.current).toHaveClass('eidotter-range-bar', 'custom');
  });

  describe('narrow containers (DMNC-1610)', () => {
    it('lets the vertical legend wrap under the bar', () => {
      const { container, rerender } = render(<RangeBar segments={five} size="lg" />);
      expect(container.firstChild).toHaveClass('flex-row', 'flex-wrap');
      rerender(<RangeBar segments={five} orientation="horizontal" />);
      expect(container.firstChild).toHaveClass('flex-col');
    });

    it('wraps legend names instead of truncating them; a bound moves to the next line whole', () => {
      render(<RangeBar segments={five} />);
      const row = within(screen.getByRole('list')).getAllByRole('listitem')[0];
      const name = row.querySelector('.eidotter-range-bar__name') as HTMLElement;
      expect(name).toHaveClass('break-words', 'min-w-0');
      expect(name).not.toHaveClass('truncate');
      expect(name.textContent).toBe('Band A < 1');
      expect(row.querySelector('.truncate')).toBeNull();
      // The break opportunity sits before the bound, outside its no-wrap span.
      const bound = name.querySelector('.eidotter-range-bar__bound') as HTMLElement;
      expect(bound).toHaveClass('whitespace-nowrap');
      expect(bound.textContent).toBe('< 1');
      expect(bound.previousSibling?.textContent).toBe(' ');
    });

    it('the name wins width: percent and duration wrap under it before the name breaks (DMNC-1612)', () => {
      // FIXTURE ONLY, synthetic: a long German name and a long duration text.
      render(
        <RangeBar
          locale="de"
          segments={[
            { id: 'a', label: 'Oberhalb des Zielbereichs', share: 61, tone: 'success', bound: '> 20', duration: '1 Std. 45 Min./Tag' },
            { id: 'b', label: 'Sample band B', share: 39, tone: 'info' },
          ]}
        />,
      );
      const [row, short] = within(screen.getByRole('list')).getAllByRole('listitem');
      // Swatch, then one wrapping line that holds the name and the meta group.
      expect(row).toHaveClass('flex', 'items-baseline');
      expect(row).not.toHaveClass('grid');
      const swatch = row.firstElementChild as HTMLElement;
      expect(swatch).toHaveClass('eidotter-range-bar__swatch', 'shrink-0');
      const text = row.querySelector('.eidotter-range-bar__text') as HTMLElement;
      expect(text).toHaveClass('flex', 'flex-wrap', 'flex-1', 'min-w-0');
      const name = text.querySelector('.eidotter-range-bar__name') as HTMLElement;
      const meta = text.querySelector('.eidotter-range-bar__meta') as HTMLElement;
      expect(Array.from(text.children)).toEqual([name, meta]);
      // The name grows into the free width and is capped at the row, so it takes
      // its own line before it wraps; the meta is pushed right and wraps after it.
      expect(name).toHaveClass('flex-auto', 'max-w-full', 'min-w-0', 'break-words');
      expect(meta).toHaveClass('ml-auto', 'flex-wrap', 'justify-end');
      expect(meta).toHaveTextContent('61 %');
      expect(meta.querySelector('.eidotter-range-bar__duration')).toHaveTextContent('1 Std. 45 Min./Tag');
      expect(name).toHaveTextContent('Oberhalb des Zielbereichs > 20');
      // A row without a duration renders no empty duration cell.
      expect(short.querySelector('.eidotter-range-bar__duration')).toBeNull();
    });

    it('server-renders the name-first legend row (DMNC-1612)', () => {
      const html = renderToString(<RangeBar segments={five} />);
      expect(html).toContain('eidotter-range-bar__text');
      expect(html).toContain('eidotter-range-bar__meta');
      expect(html).not.toContain('grid-cols-[auto_minmax(0,1fr)_auto_auto]');
    });

    it('separates the percent from the target label with a gap and a space', () => {
      const { container } = render(
        <RangeBar segments={five} target={{ segmentId: 'c', minShare: 70, label: 'Goal' }} />,
      );
      const cell = container.querySelector('.eidotter-range-bar__target-label')?.parentElement as HTMLElement;
      expect(cell).toHaveClass('gap-x-2');
      expect(cell.textContent).toBe('61% Goal');
    });

    it('adds no stray space when the target segment is under the label threshold', () => {
      const { container } = render(
        <RangeBar segments={five} target={{ segmentId: 'a', minShare: 5, label: 'Goal' }} />,
      );
      const cell = container.querySelector('.eidotter-range-bar__target-label')?.parentElement as HTMLElement;
      expect(cell.textContent).toBe('Goal');
    });

    it('server-renders the separated lane text and the wrapping legend', () => {
      const html = renderToString(
        <RangeBar segments={five} target={{ segmentId: 'c', minShare: 70, label: 'Goal' }} />,
      );
      expect(html).toMatch(/61%<\/span> <span class="eidotter-range-bar__target-label/);
      expect(html).toContain('eidotter-range-bar__name');
      expect(html).not.toContain('truncate');
    });
  });
});

describe('RangeBar CSS', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const css = require('fs').readFileSync(require('path').join(__dirname, 'RangeBar.css'), 'utf8') as string;

  it('forces print-color-adjust: exact on the segment class in a print block', () => {
    const print = css.slice(css.indexOf('@media print'));
    expect(print).toMatch(/\.eidotter-range-bar__seg[^}]*print-color-adjust:\s*exact/s);
    expect(css).toMatch(/break-inside:\s*avoid/);
  });

  it('has forced-colors and contrast blocks', () => {
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('@media (prefers-contrast: high)');
  });

  it('prints segment dividers and the unfilled track black, at the screen rules\' specificity (DMNC-1610)', () => {
    const print = css.slice(css.indexOf('@media print'), css.indexOf('@media (prefers-contrast'));
    expect(print).toMatch(
      /\.eidotter-range-bar \.eidotter-range-bar__seg \+ \.eidotter-range-bar__seg,\s*\.eidotter-range-bar \.eidotter-fill--none \{\s*border-color: CanvasText;/,
    );
  });

  it('prints lane and legend text black on paper (DMNC-1610)', () => {
    const print = css.slice(css.indexOf('@media print'), css.indexOf('@media (prefers-contrast'));
    expect(print).toMatch(
      /\.eidotter-range-bar \.eidotter-range-bar__lane,[^{]*\.eidotter-range-bar__legend \*\s*\{[^}]*color: CanvasText;/,
    );
  });
});
