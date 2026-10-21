import React, { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { Meter } from './Meter';
import { MeterGroup } from './MeterGroup';
import { fixtureBands } from '../../../fixtures/health';

const fillVar = (el: Element | null) =>
  (el as HTMLElement).style.getPropertyValue('--eidotter-meter-fill');
const optVar = (el: Element | null, name: string) =>
  (el as HTMLElement).style.getPropertyValue(name);

describe('Meter', () => {
  it('sets the fill variable to value divided by max for 56 of 100', () => {
    const { container } = render(<Meter label="Sample" value={56} />);
    expect(fillVar(container.querySelector('.eidotter-meter__fill'))).toBe('0.56');
  });

  it('renders a meter with composed aria values', () => {
    render(<Meter label="Sample" value={56} unit="units" />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
    expect(meter).toHaveAttribute('aria-valuenow', '56');
    expect(meter).toHaveAttribute('aria-valuetext', '56 units');
    expect(meter).toHaveAttribute('aria-label', 'Sample: 56 units');
    expect(meter).not.toHaveAttribute('aria-labelledby');
  });

  it('renders the optimal tick only when optimal is defined', () => {
    const { container, rerender } = render(<Meter label="Sample" value={56} />);
    expect(container.querySelector('.eidotter-meter__optimal')).not.toBeInTheDocument();
    rerender(<Meter label="Sample" value={56} optimal={70} />);
    const tick = container.querySelector('.eidotter-meter__optimal');
    expect(tick).toBeInTheDocument();
    expect(tick).not.toHaveClass('eidotter-meter__optimal--range');
    expect(optVar(tick, '--eidotter-meter-optimal')).toBe('0.7');
  });

  it('renders a range as a band element', () => {
    const { container } = render(<Meter label="Sample" value={56} optimal={[40, 60]} />);
    const band = container.querySelector('.eidotter-meter__optimal--range');
    expect(band).toBeInTheDocument();
    expect(optVar(band, '--eidotter-meter-optimal-start')).toBe('0.4');
    expect(optVar(band, '--eidotter-meter-optimal-size')).toBe('0.2');
  });

  it('clamps the fill above max, keeps the tick unmoved and shows the overflow marker', () => {
    const at = render(<Meter label="Sample" value={80} optimal={70} />);
    const tickBefore = optVar(
      at.container.querySelector('.eidotter-meter__optimal'),
      '--eidotter-meter-optimal',
    );
    at.unmount();
    const { container } = render(<Meter label="Sample" value={150} optimal={70} />);
    expect(fillVar(container.querySelector('.eidotter-meter__fill'))).toBe('1');
    expect(
      optVar(container.querySelector('.eidotter-meter__optimal'), '--eidotter-meter-optimal'),
    ).toBe(tickBefore);
    expect(container.querySelector('.eidotter-meter__overflow')).toBeInTheDocument();
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '100');
    expect(meter.getAttribute('aria-valuetext')).toBe('150');
  });

  it('renders no overflow marker at max', () => {
    const { container } = render(<Meter label="Sample" value={100} />);
    expect(container.querySelector('.eidotter-meter__overflow')).not.toBeInTheDocument();
  });

  it.each([null, NaN, Infinity])('treats %s as unknown with the placeholder', (value) => {
    const { container } = render(<Meter label="Sample" value={value} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuetext', 'unknown');
    expect(meter).not.toHaveAttribute('aria-valuenow');
    expect(container.querySelector('.eidotter-meter__value')).toHaveTextContent('--');
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
    expect(fillVar(container.querySelector('.eidotter-meter__fill'))).toBe('0');
  });

  it('puts value above label for vertical and label, bar, value for horizontal', () => {
    const v = render(<Meter label="Sample" value={56} orientation="vertical" />);
    const value = v.container.querySelector('.eidotter-meter__value') as Element;
    const track = v.container.querySelector('.eidotter-meter__track') as Element;
    const label = v.container.querySelector('.eidotter-meter__label') as Element;
    expect(value.compareDocumentPosition(track) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(track.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    v.unmount();

    const h = render(<Meter label="Sample" value={56} orientation="horizontal" />);
    const hl = h.container.querySelector('.eidotter-meter__label') as Element;
    const ht = h.container.querySelector('.eidotter-meter__track') as Element;
    const hv = h.container.querySelector('.eidotter-meter__value') as Element;
    expect(hl.compareDocumentPosition(ht) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(ht.compareDocumentPosition(hv) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('never renders value or label text inside the track', () => {
    const { container } = render(<Meter label="Sample" value={56} />);
    expect(container.querySelector('.eidotter-meter__track')?.textContent).toBe('');
  });

  it('hides the value text but keeps valuetext when showValue is false', () => {
    const { container } = render(<Meter label="Sample" value={56} showValue={false} />);
    expect(container.querySelector('.eidotter-meter__value')).not.toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '56');
  });

  it('fills 10 blocks for segments 10 at 95 percent and keeps the exact valuetext', () => {
    const { container } = render(<Meter label="Sample" value={95} segments={10} />);
    expect(container.querySelectorAll('.eidotter-meter__segment')).toHaveLength(10);
    expect(container.querySelectorAll('.eidotter-meter__segment--filled')).toHaveLength(10);
    expect(container.querySelector('.eidotter-meter__fill')).not.toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '95');
  });

  it('rounds half away when quantising (45 percent over 10 blocks fills 5)', () => {
    const { container } = render(<Meter label="Sample" value={45} segments={10} />);
    expect(container.querySelectorAll('.eidotter-meter__segment--filled')).toHaveLength(5);
  });

  it.each([
    ['info', 'eidotter-fill--solid'],
    ['success', 'eidotter-fill--dither'],
    ['warning', 'eidotter-fill--hatch'],
    ['critical', 'eidotter-fill--dotted'],
  ] as const)('pairs the %s tone with %s', (tone, pattern) => {
    const { container } = render(<Meter label="Sample" value={56} tone={tone} />);
    expect(container.firstChild).toHaveClass(`eidotter-tone--${tone}`);
    expect(container.querySelector('.eidotter-meter__fill')).toHaveClass(pattern);
  });

  it('lets pattern override the tone default', () => {
    const { container } = render(<Meter label="Sample" value={56} tone="info" pattern="hatch" />);
    expect(container.querySelector('.eidotter-meter__fill')).toHaveClass('eidotter-fill--hatch');
  });

  it('shows a persistent critical glyph with no alert or live region', () => {
    const { container } = render(<Meter label="Sample" value={10} tone="critical" />);
    expect(container.querySelector('.eidotter-meter__glyph')).toBeInTheDocument();
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('resolves tone and band label from bands, and explicit tone wins', () => {
    const { container, rerender } = render(
      <Meter label="Sample" value={10} unit="units" bands={fixtureBands} />,
    );
    expect(container.firstChild).toHaveClass('eidotter-tone--critical');
    expect(screen.getByText('Sample band A')).toBeInTheDocument();
    rerender(<Meter label="Sample" value={10} unit="units" bands={fixtureBands} tone="info" />);
    expect(container.firstChild).toHaveClass('eidotter-tone--info');
  });

  it('renders neutral with no band text without bands', () => {
    const { container } = render(<Meter label="Sample" value={10} />);
    expect(container.firstChild).toHaveClass('eidotter-tone--neutral');
    expect(container.querySelector('.eidotter-meter__band')).not.toBeInTheDocument();
  });

  it('keeps the full label in the accessible name next to the short label', () => {
    const { container } = render(<Meter label="Long label" shortLabel="Lng" value={56} />);
    expect(container.querySelector('.eidotter-meter__label--full')).toHaveTextContent('Long label');
    expect(container.querySelector('.eidotter-meter__label--short')).toHaveTextContent('Lng');
    expect(screen.getByRole('meter')).toHaveAttribute('aria-label', 'Long label: 56');
  });

  it('formats with the locale prop and overrides the unknown label', () => {
    const { rerender } = render(<Meter label="Sample" value={1234.5} locale="de" />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '1.234,5');
    rerender(<Meter label="Sample" value={null} labels={{ unknown: 'unbekannt' }} />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', 'unbekannt');
  });

  it.each([
    ['xs', 'vertical'],
    ['sm', 'vertical'],
    ['md', 'vertical'],
    ['xs', 'horizontal'],
    ['sm', 'horizontal'],
    ['md', 'horizontal'],
  ] as const)('applies the %s size and %s orientation block classes', (size, orientation) => {
    const { container } = render(
      <Meter label="Sample" value={56} size={size} orientation={orientation} />,
    );
    expect(container.firstChild).toHaveClass(
      'eidotter-meter',
      `eidotter-meter--${size}`,
      `eidotter-meter--${orientation}`,
    );
  });

  it('forwards ref and className to the root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Meter ref={ref} label="Sample" value={56} className="custom" />);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass('eidotter-meter', 'custom');
  });
});

describe('MeterGroup', () => {
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  it('gives seven vertical meters distinct accessible names built from label and value', () => {
    render(
      <MeterGroup
        items={week.map((label, i) => ({ label, value: 10 * (i + 1), orientation: 'vertical' }))}
      />,
    );
    const names = screen.getAllByRole('meter').map((m) => m.getAttribute('aria-label'));
    expect(names).toHaveLength(7);
    expect(new Set(names).size).toBe(7);
    expect(names[0]).toBe('Mon: 10');
  });

  it('keeps a null item as a row with the placeholder', () => {
    render(
      <MeterGroup
        items={[
          { label: 'A', value: 10 },
          { label: 'B', value: null },
          { label: 'C', value: 30 },
        ]}
      />,
    );
    const meters = screen.getAllByRole('meter');
    expect(meters).toHaveLength(3);
    expect(within(meters[1]).getByText('--')).toBeInTheDocument();
    expect(meters[1]).toHaveAttribute('aria-valuetext', 'unknown');
  });

  const sharedItems = [
    { label: 'A', value: 50, max: 100 },
    { label: 'B', value: 20, max: 200 },
  ];

  it('scales every bar to the largest max with sharedMax', () => {
    const { container } = render(<MeterGroup sharedMax items={sharedItems} />);
    const fills = [...container.querySelectorAll('.eidotter-meter__fill')].map(fillVar);
    expect(fills).toEqual(['0.25', '0.1']);
    expect(screen.getAllByRole('meter')[0]).toHaveAttribute('aria-valuemax', '200');
  });

  it('uses each bar own max without sharedMax', () => {
    const { container } = render(<MeterGroup items={sharedItems} />);
    const fills = [...container.querySelectorAll('.eidotter-meter__fill')].map(fillVar);
    expect(fills).toEqual(['0.5', '0.1']);
  });

  it('renders EmptyState for an empty list', () => {
    const { container } = render(<MeterGroup items={[]} />);
    expect(container.querySelector('.eidotter-empty-state')).toBeInTheDocument();
    expect(screen.queryByRole('meter')).not.toBeInTheDocument();
  });

  it('renders children when no items are given', () => {
    render(
      <MeterGroup>
        <Meter label="Child" value={5} />
      </MeterGroup>,
    );
    expect(screen.getByRole('meter')).toHaveAttribute('aria-label', 'Child: 5');
  });

  it('applies layout and columns', () => {
    const { container, rerender } = render(<MeterGroup items={sharedItems} />);
    expect(container.firstChild).toHaveClass('eidotter-meter-group', 'eidotter-meter-group--row');
    rerender(<MeterGroup layout="grid" columns={3} items={sharedItems} />);
    expect(container.firstChild).toHaveClass('eidotter-meter-group--grid');
    expect((container.firstChild as HTMLElement).style.getPropertyValue('--eidotter-meter-columns')).toBe('3');
  });
});
