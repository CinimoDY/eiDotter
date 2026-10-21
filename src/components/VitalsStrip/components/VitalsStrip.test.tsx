import React, { createRef } from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import { VitalsStrip } from './VitalsStrip';
import type { VitalTile } from './VitalsStrip';
import { fixtureBands } from '../../../fixtures/health';

const tile = (over: Partial<VitalTile> = {}): VitalTile => ({
  id: 't1',
  label: 'Sample A',
  value: 62,
  unit: 'units',
  ...over,
});

describe('VitalsStrip', () => {
  it('renders a group per tile with a composed accessible name', () => {
    render(<VitalsStrip tiles={[tile()]} />);
    expect(screen.getByRole('group', { name: 'Sample A: 62 units' })).toBeInTheDocument();
  });

  it('renders a pair through formatValue and names both numbers', () => {
    const { container } = render(
      <VitalsStrip tiles={[tile({ label: 'Pair', value: null, pair: [124, 78], unit: 'u' })]} />,
    );
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent('124/78');
    const name = screen.getByRole('group').getAttribute('aria-label') ?? '';
    expect(name).toContain('124');
    expect(name).toContain('78');
  });

  it('renders secondary text', () => {
    render(<VitalsStrip tiles={[tile({ secondary: 'sample note' })]} />);
    expect(screen.getByText('sample note')).toBeInTheDocument();
  });

  it('renders the offline label in the value slot for a null tile', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ value: null })]} />);
    expect(screen.getByText('offline')).toBeInTheDocument();
    expect(screen.getByRole('group').getAttribute('aria-label')).toContain('offline');
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent(/^offline$/);
    expect(container.querySelector('.eidotter-vitals-strip__unit')).toBeNull();
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
  });

  it.each([NaN, Infinity])('renders %s as the unknown label, never the raw number', (value) => {
    const { container } = render(<VitalsStrip tiles={[tile({ value })]} />);
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent(/^unknown$/);
    expect(screen.getByRole('group')).toHaveAccessibleName('Sample A: unknown');
    expect(container.textContent).not.toMatch(/NaN|Infinity/);
  });

  it('renders a pair with a non-finite part as unknown', () => {
    const { container } = render(
      <VitalsStrip tiles={[tile({ label: 'Pair', value: null, pair: [NaN, 78], unit: 'u' })]} />,
    );
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent(/^unknown$/);
    expect(screen.getByRole('group')).toHaveAccessibleName('Pair: unknown');
    expect(container.textContent).not.toMatch(/NaN|78/);
  });

  it('marks a loading tile busy and ends its name with the unknown label', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ status: 'loading' })]} />);
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-busy', 'true');
    expect(group.getAttribute('aria-label')).toMatch(/unknown$/);
    expect(container.querySelector('.eidotter-vitals-strip__value')).toBeNull();
  });

  it('lets an explicit unknown status win over offline for a null value', () => {
    const { container } = render(
      <VitalsStrip tiles={[tile({ value: null, status: 'unknown' })]} />,
    );
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent(/^unknown$/);
    expect(screen.queryByText('offline')).toBeNull();
    expect(screen.getByRole('group')).toHaveAccessibleName('Sample A: unknown');
  });

  it('renders a stale null tile as unknown, not offline', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ value: null, status: 'stale' })]} />);
    expect(screen.queryByText('offline')).toBeNull();
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent(/^unknown$/);
    expect(screen.getByRole('group').getAttribute('aria-label')).not.toContain('offline');
  });

  it('uses no font weight utilities on the value or unit (single-weight font)', () => {
    const { container } = render(<VitalsStrip tiles={[tile()]} />);
    expect(container.querySelector('.eidotter-vitals-strip__value')?.className).not.toMatch(/font-(bold|normal|semibold)/);
    expect(container.querySelector('.eidotter-vitals-strip__unit')?.className).not.toMatch(/font-(bold|normal|semibold)/);
  });

  it('renders offline for status empty even when a value is given', () => {
    render(<VitalsStrip tiles={[tile({ status: 'empty' })]} />);
    expect(screen.getByText('offline')).toBeInTheDocument();
    expect(screen.queryByText('62')).toBeNull();
  });

  it('uses overridden labels', () => {
    render(<VitalsStrip tiles={[tile({ value: null })]} labels={{ offline: 'getrennt' }} />);
    expect(screen.getByText('getrennt')).toBeInTheDocument();
  });

  it('renders the stale label and class for a stale tile', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ status: 'stale' })]} />);
    expect(screen.getByText('stale')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-vitals-strip__tile')).toHaveClass(
      'eidotter-vitals-strip__tile--stale',
    );
    expect(screen.getByRole('group').getAttribute('aria-label')).toContain('stale');
  });

  it('dims only the stale number, keeping the small unit at full contrast', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ status: 'stale' })]} />);
    const value = container.querySelector('.eidotter-vitals-strip__value');
    expect(value).not.toHaveClass('opacity-60');
    expect(value?.querySelector('.opacity-60')).toHaveTextContent(/^62$/);
    expect(container.querySelector('.opacity-60 .eidotter-vitals-strip__unit')).toBeNull();
  });

  it('renders a static marker for a critical tile, with no animation or alert', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ tone: 'critical' })]} />);
    expect(container.querySelector('.eidotter-vitals-strip__marker')).toBeInTheDocument();
    expect(container.querySelector('.eidotter-tone--critical')).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/animate|pulse|breathe/);
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('renders no marker for non-critical tones', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ tone: 'warning' })]} />);
    expect(container.querySelector('.eidotter-vitals-strip__marker')).toBeNull();
    expect(container.querySelector('.eidotter-tone--warning')).toBeInTheDocument();
  });

  it('resolves tone and band label from bands, explicit tone wins', () => {
    const { container, rerender } = render(
      <VitalsStrip tiles={[tile({ value: 10, bands: fixtureBands })]} />,
    );
    expect(container.querySelector('.eidotter-tone--critical')).toBeInTheDocument();
    expect(screen.getByText('Sample band A')).toBeInTheDocument();
    rerender(<VitalsStrip tiles={[tile({ value: 10, bands: fixtureBands, tone: 'info' })]} />);
    expect(container.querySelector('.eidotter-tone--info')).toBeInTheDocument();
  });

  it('formats with the locale prop', () => {
    const { container } = render(<VitalsStrip tiles={[tile({ value: 1.5 })]} locale="de" />);
    expect(container.querySelector('.eidotter-vitals-strip__value')).toHaveTextContent('1,5');
  });

  it('wraps tiles in a container-query flex-wrap strip', () => {
    const { container } = render(
      <VitalsStrip tiles={[1, 2, 3, 4, 5].map((n) => tile({ id: `t${n}`, label: `S${n}` }))} />,
    );
    expect(container.firstChild).toHaveClass('eidotter-vitals-strip', 'flex-wrap');
    expect(screen.getAllByRole('group')).toHaveLength(5);
    const css = readFileSync(join(__dirname, 'VitalsStrip.css'), 'utf8');
    expect(css).toMatch(/container-type:\s*inline-size/);
    expect(css).toMatch(/@container/);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s block class', (size) => {
    const { container } = render(<VitalsStrip tiles={[tile()]} size={size} />);
    expect(container.firstChild).toHaveClass(`eidotter-vitals-strip--${size}`);
  });

  it('forwards ref and className to the root', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<VitalsStrip ref={ref} tiles={[tile()]} className="custom" />);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass('custom');
  });

  it('source has no hook, handler or client directive', () => {
    const src = readFileSync(join(__dirname, 'VitalsStrip.tsx'), 'utf8');
    expect(src).not.toMatch(/use client/);
    expect(src).not.toMatch(/\buse[A-Z]\w*\(/);
    expect(src).not.toMatch(/\bon[A-Z]\w*=/);
    expect(src).not.toMatch(/from '\.\.\/\.\.\/Stat/);
  });
});
