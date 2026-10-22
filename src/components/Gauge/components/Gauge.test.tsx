import React, { createRef } from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import { Gauge } from './Gauge';
import { fixtureBands } from '../../../fixtures/health';

describe('Gauge', () => {
  it('renders a meter with composed aria values for value 60', () => {
    render(<Gauge label="Sample" value={60} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
    expect(meter).toHaveAttribute('aria-valuenow', '60');
    expect(meter).toHaveAttribute('aria-valuetext', '60%');
    expect(meter).toHaveAttribute('aria-label', 'Sample: 60%');
    expect(meter).not.toHaveAttribute('aria-labelledby');
  });

  it('makes the root the only meter and hides the inner ring from the tree', () => {
    const { container } = render(<Gauge label="Sample" value={60} />);
    expect(screen.getAllByRole('meter')).toHaveLength(1);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    const ring = container.querySelector('.eidotter-progress-ring');
    expect(ring).toHaveAttribute('aria-hidden', 'true');
    expect(ring).not.toHaveAttribute('role');
  });

  it('caps aria-valuenow at max and shows the overflow marker for value 120', () => {
    const { container } = render(<Gauge label="Sample" value={120} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '100');
    expect(meter.getAttribute('aria-valuetext')).toContain('120');
    expect(container.querySelector('.eidotter-gauge__overflow')).toBeInTheDocument();
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled'),
    ).toHaveLength(16);
  });

  it('renders no overflow marker at or below max', () => {
    const { container } = render(<Gauge label="Sample" value={100} />);
    expect(container.querySelector('.eidotter-gauge__overflow')).not.toBeInTheDocument();
  });

  it.each([null, NaN, Infinity])('treats %s as unknown', (value) => {
    const { container } = render(<Gauge label="Sample" value={value} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuetext', 'unknown');
    expect(meter).toHaveAttribute('aria-valuenow', '0');
    expect(container.textContent).toContain('--');
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled'),
    ).toHaveLength(0);
  });

  it('treats max 0 as unknown', () => {
    const { container } = render(<Gauge label="Sample" value={5} max={0} />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', 'unknown');
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
  });

  it('uses overridden labels for the unknown text', () => {
    render(<Gauge label="Sample" value={null} labels={{ unknown: 'unbekannt' }} />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', 'unbekannt');
  });

  it('renders fill 0 and signed text for a negative value', () => {
    const { container } = render(<Gauge label="Sample" value={-2.4} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled'),
    ).toHaveLength(0);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '−2.4%');
  });

  it('clamps aria-valuenow to 0 for a negative value while valuetext keeps the reading', () => {
    render(<Gauge label="Sample" value={-2.4} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '0');
    expect(meter).toHaveAttribute('aria-valuetext', '−2.4%');
  });

  it('formats with the locale prop', () => {
    render(<Gauge label="Sample" value={93} locale="de" />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '93\u00A0%');
  });

  it('renders the secondary value, and no empty line without it', () => {
    const { container, rerender } = render(
      <Gauge label="Sample" value={60} secondary="890 kcal" />,
    );
    expect(container.querySelector('.eidotter-gauge__secondary')).toHaveTextContent(/^890 kcal$/);
    rerender(<Gauge label="Sample" value={60} />);
    expect(container.querySelector('.eidotter-gauge__secondary')).not.toBeInTheDocument();
  });

  it('renders the provenance tag for modelled and estimated, none for measured', () => {
    const { container, rerender } = render(
      <Gauge label="Sample" value={60} provenance="modelled" />,
    );
    expect(screen.getByText('modelled')).toBeInTheDocument();
    rerender(<Gauge label="Sample" value={60} provenance="estimated" />);
    expect(screen.getByText('estimated')).toBeInTheDocument();
    rerender(<Gauge label="Sample" value={60} provenance="measured" />);
    expect(container.querySelector('.eidotter-gauge__provenance')).not.toBeInTheDocument();
  });

  it('renders the critical glyph and label, with no alert or live region', () => {
    const { container } = render(<Gauge label="Sample" value={10} tone="critical" />);
    expect(container.querySelector('.eidotter-gauge__glyph')).toBeInTheDocument();
    expect(screen.getAllByText('Sample').length).toBeGreaterThan(0);
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
    expect(container.firstChild).toHaveClass('eidotter-tone--critical');
  });

  it('renders no glyph for non-critical tones', () => {
    const { container } = render(<Gauge label="Sample" value={10} tone="warning" />);
    expect(container.querySelector('.eidotter-gauge__glyph')).not.toBeInTheDocument();
  });

  it('resolves tone and band label from bands on the raw value', () => {
    const { container } = render(
      <Gauge label="Sample" value={10} unit="units" bands={fixtureBands} />,
    );
    expect(container.firstChild).toHaveClass('eidotter-tone--critical');
    expect(screen.getByText('Sample band A')).toBeInTheDocument();
  });

  it('lets an explicit tone win over bands', () => {
    const { container } = render(
      <Gauge label="Sample" value={10} tone="info" bands={fixtureBands} />,
    );
    expect(container.firstChild).toHaveClass('eidotter-tone--info');
  });

  it('carries a distinct segment rhythm per filled tone', () => {
    const counts = (['info', 'success', 'warning', 'critical'] as const).map((tone) => {
      const { container, unmount } = render(<Gauge label="S" value={100} tone={tone} />);
      const n = container.querySelectorAll('.eidotter-progress-ring__seg').length;
      unmount();
      return n;
    });
    expect(new Set(counts).size).toBe(4);
  });

  it('renders the short label alongside the full label', () => {
    const { container } = render(
      <Gauge label="Long sample label" shortLabel="Short" value={60} />,
    );
    expect(container.querySelector('.eidotter-gauge__label--full')).toHaveTextContent(
      'Long sample label',
    );
    expect(container.querySelector('.eidotter-gauge__label--short')).toHaveTextContent('Short');
    expect(screen.getByRole('meter')).toHaveAttribute(
      'aria-label',
      'Long sample label: 60%',
    );
  });

  describe('narrow widths (DMNC-1573)', () => {
    const css = readFileSync(join(__dirname, 'Gauge.css'), 'utf8');

    it('marks whether a short label exists', () => {
      const { container, rerender } = render(<Gauge label="Long sample label" value={60} />);
      expect(container.firstChild).toHaveAttribute('data-has-short', 'false');
      rerender(<Gauge label="Long sample label" shortLabel="Short" value={60} />);
      expect(container.firstChild).toHaveAttribute('data-has-short', 'true');
    });

    it('keeps the full label visible without a short label (CSS hides it only when one exists)', () => {
      const { container } = render(<Gauge label="Long sample label" value={60} size="sm" />);
      const full = container.querySelector('.eidotter-gauge__label--full');
      expect(full).toHaveTextContent('Long sample label');
      expect(full).not.toHaveAttribute('hidden');
      expect(full).not.toHaveClass('hidden', 'sr-only');
      expect(container.querySelector('.eidotter-gauge__label--short')).toBeNull();
      const query = css.slice(css.indexOf('@container eidotter-gauge (max-width: 8rem)'));
      expect(query).toMatch(/\[data-has-short="true"\] \.eidotter-gauge__label--full \{\s*display: none;/);
      expect(query).not.toMatch(/^\s*\.eidotter-gauge__label--full \{/m);
    });

    it('insets the centre text by the ring thickness plus 2px', () => {
      const { container, rerender } = render(<Gauge label="Sample" value={60} size="md" />);
      const center = () => container.querySelector('.eidotter-gauge__center') as HTMLElement;
      expect(center().style.inset).toBe('15px'); // round(104 / 8) + 2
      expect(center()).not.toHaveClass('inset-0');
      rerender(<Gauge label="Sample" value={60} size="lg" />);
      expect(center().style.inset).toBe('19px'); // round(136 / 8) + 2
    });

    it('exposes the size for CSS and keeps the accent colour on the value', () => {
      const { container } = render(<Gauge label="Sample" value={60} size="md" />);
      expect(container.firstChild).toHaveAttribute('data-size', 'md');
      const value = container.querySelector('.eidotter-gauge__value');
      expect(value).toHaveClass('text-dos-text-accent', 'text-dos-display-xs');
    });

    it('splits the md secondary at the first space so the unit can take its own line', () => {
      const { container } = render(<Gauge label="Sample" value={72} secondary="720 units" size="md" />);
      const sec = container.querySelector('.eidotter-gauge__center .eidotter-gauge__secondary');
      expect(sec).toHaveTextContent(/^720 units$/);
      expect(sec?.querySelector('.eidotter-gauge__secondary-head')).toHaveTextContent(/^720$/);
      expect(sec?.querySelector('.eidotter-gauge__secondary-tail')).toHaveTextContent(/^units$/);
      expect(css).toMatch(
        /\[data-size="md"\] \.eidotter-gauge__center \.eidotter-gauge__secondary-tail \{\s*display: block;/,
      );
      expect(css).toMatch(/\.eidotter-gauge__secondary \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis;/);
    });

    it('renders a single-word secondary without a tail', () => {
      const { container } = render(<Gauge label="Sample" value={72} secondary="720" />);
      expect(container.querySelector('.eidotter-gauge__secondary-tail')).toBeNull();
    });

    it('puts the sm secondary under the ring, outside the hole', () => {
      const { container } = render(<Gauge label="Sample" value={72} secondary="40 units" size="sm" />);
      const sec = container.querySelector('.eidotter-gauge__secondary');
      expect(sec).toHaveTextContent(/^40 units$/);
      expect(container.querySelector('.eidotter-gauge__center .eidotter-gauge__secondary')).toBeNull();
    });
  });

  it('dims the value and shows the stale label when stale', () => {
    const { container } = render(<Gauge label="Sample" value={60} status="stale" />);
    expect(container.firstChild).toHaveClass('eidotter-gauge--stale');
    expect(screen.getByText('stale')).toBeInTheDocument();
    expect(screen.getByRole('meter').getAttribute('aria-valuetext')).toContain('stale');
  });

  it('renders skeleton shade rows while loading', () => {
    const { container } = render(<Gauge label="Sample" value={60} status="loading" />);
    expect(container.querySelector('.eidotter-gauge__value')).not.toBeInTheDocument();
    expect(container.querySelector('.eidotter-gauge__skeleton')).toBeInTheDocument();
    expect(screen.getByRole('meter')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '0');
  });

  it('applies the glow marker class to the ring only when glow is set', () => {
    const { container, rerender } = render(<Gauge label="Sample" value={60} glow />);
    expect(container.querySelector('.eidotter-progress-ring')).toHaveClass(
      'eidotter-health-glow',
    );
    rerender(<Gauge label="Sample" value={60} />);
    expect(container.querySelector('.eidotter-progress-ring')).not.toHaveClass(
      'eidotter-health-glow',
    );
  });

  it.each([
    ['sm', 72],
    ['md', 104],
    ['lg', 136],
  ] as const)('applies the %s block class and ring diameter %i', (size, px) => {
    const { container } = render(<Gauge label="Sample" value={60} size={size} />);
    expect(container.firstChild).toHaveClass(`eidotter-gauge--${size}`);
    expect(container.querySelector('.eidotter-progress-ring')).toHaveStyle({
      width: `${px}px`,
      height: `${px}px`,
    });
  });

  it('forwards ref and passes className to the root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Gauge ref={ref} label="Sample" value={60} className="custom" />,
    );
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass('eidotter-gauge', 'custom');
  });

  it('lets aria-label replace the label part of the composed name', () => {
    render(<Gauge label="Sample" value={60} aria-label="Custom name" />);
    expect(screen.getByRole('meter')).toHaveAttribute('aria-label', 'Custom name: 60%');
  });
});
