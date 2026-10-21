import React, { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
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

  it('gives each segment a pattern class and a --eidotter-fill property', () => {
    const { container } = render(<RangeBar segments={five} />);
    segs(container).forEach((e) => {
      expect(e.className).toMatch(/eidotter-fill--(solid|dither|hatch|dotted)/);
      expect(e.className).toMatch(/eidotter-tone--/);
      expect(e.style.getPropertyValue('--eidotter-fill')).not.toBe('');
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
});
