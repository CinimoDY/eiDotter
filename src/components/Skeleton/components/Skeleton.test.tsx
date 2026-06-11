import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a status element with the default label', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('accepts a custom label', () => {
    render(<Skeleton label="Loading timeline entries" />);
    expect(
      screen.getByRole('status', { name: 'Loading timeline entries' }),
    ).toBeInTheDocument();
  });

  it('hides the glyph rows from assistive tech', () => {
    const { container } = render(<Skeleton />);
    const glyphs = container.querySelector('.eidotter-skeleton__glyphs');
    expect(glyphs).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults to the text variant with 3 lines, last line shortened', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('.eidotter-skeleton--text')).not.toBeNull();
    const lines = container.querySelectorAll('.eidotter-skeleton__line');
    expect(lines).toHaveLength(3);
    expect(lines[2]).toHaveClass('eidotter-skeleton__line--short');
    expect(lines[0]).not.toHaveClass('eidotter-skeleton__line--short');
  });

  it('renders the requested number of lines', () => {
    const { container } = render(<Skeleton lines={5} />);
    expect(container.querySelectorAll('.eidotter-skeleton__line')).toHaveLength(5);
  });

  it('clamps lines to a minimum of 1 and does not shorten a single line', () => {
    const { container } = render(<Skeleton lines={0} />);
    const lines = container.querySelectorAll('.eidotter-skeleton__line');
    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toHaveClass('eidotter-skeleton__line--short');
  });

  it('card variant adds a heading meta line above the body lines', () => {
    const { container } = render(<Skeleton variant="card" />);
    expect(container.querySelector('.eidotter-skeleton--card')).not.toBeNull();
    const lines = container.querySelectorAll('.eidotter-skeleton__line');
    expect(lines).toHaveLength(4); // 1 meta + 3 body
    expect(lines[0]).toHaveClass('eidotter-skeleton__line--meta');
  });

  it('figure variant renders dense full-width rows with no shortened line', () => {
    const { container } = render(<Skeleton variant="figure" />);
    expect(container.querySelector('.eidotter-skeleton--figure')).not.toBeNull();
    const lines = container.querySelectorAll('.eidotter-skeleton__line');
    expect(lines).toHaveLength(4);
    lines.forEach((line) => {
      expect(line).not.toHaveClass('eidotter-skeleton__line--short');
      expect(line.textContent).toContain('▓');
    });
  });

  it('timeline variant renders a marker and an entry column', () => {
    const { container } = render(<Skeleton variant="timeline" />);
    expect(container.querySelector('.eidotter-skeleton--timeline')).not.toBeNull();
    expect(container.querySelector('.eidotter-skeleton__marker')).not.toBeNull();
    const entry = container.querySelector('.eidotter-skeleton__entry');
    expect(entry).not.toBeNull();
    // 1 meta line + 2 default body lines
    expect(entry!.querySelectorAll('.eidotter-skeleton__line')).toHaveLength(3);
  });

  it('animates by default and can be disabled', () => {
    const { container, rerender } = render(<Skeleton />);
    expect(container.querySelector('.eidotter-skeleton--animated')).not.toBeNull();
    rerender(<Skeleton animated={false} />);
    expect(container.querySelector('.eidotter-skeleton--animated')).toBeNull();
  });

  it('uses shade characters for the placeholder texture', () => {
    const { container } = render(<Skeleton />);
    const line = container.querySelector('.eidotter-skeleton__line');
    expect(line?.textContent).toMatch(/[░▒]/);
  });

  it('merges a custom className onto the root', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const root = container.querySelector('.eidotter-skeleton');
    expect(root).toHaveClass('custom-class');
  });
});
