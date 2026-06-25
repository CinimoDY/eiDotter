import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ProgressRing ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders a progressbar with quantized aria value', () => {
    render(<ProgressRing value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders one arc per segment, filling the quantized count', () => {
    const { container } = render(<ProgressRing value={50} segments={16} />);
    const all = container.querySelectorAll('.eidotter-progress-ring__seg');
    const filled = container.querySelectorAll('.eidotter-progress-ring__seg--filled');
    expect(all).toHaveLength(16);
    expect(filled).toHaveLength(8); // floor(0.5 * 16)
  });

  it('quantizes down to whole segments', () => {
    // 0.57 * 16 = 9.12 → 9 filled segments → round(9/16*100) = 56
    const { container } = render(<ProgressRing value={57} segments={16} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled')
    ).toHaveLength(9);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '56');
  });

  it('clamps value to the 0..max range', () => {
    const { container, rerender } = render(<ProgressRing value={150} segments={16} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled')
    ).toHaveLength(16);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

    rerender(<ProgressRing value={-10} segments={16} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled')
    ).toHaveLength(0);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('respects a custom max', () => {
    const { container } = render(<ProgressRing value={5} max={10} segments={16} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled')
    ).toHaveLength(8);
  });

  it('guards against max of 0', () => {
    const { container } = render(<ProgressRing value={5} max={0} segments={16} />);
    expect(
      container.querySelectorAll('.eidotter-progress-ring__seg--filled')
    ).toHaveLength(0);
  });

  it('shows the quantized label when showLabel is set', () => {
    render(<ProgressRing value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides the label by default', () => {
    render(<ProgressRing value={75} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('applies the glow class', () => {
    const { container } = render(<ProgressRing value={50} glow />);
    expect(container.firstChild).toHaveClass('eidotter-progress-ring--glow');
  });

  it('defaults the stroke to currentColor and honours a custom color', () => {
    const { container, rerender } = render(<ProgressRing value={50} />);
    expect(container.querySelector('circle')).toHaveAttribute('stroke', 'currentColor');

    rerender(<ProgressRing value={50} color="#55FF55" />);
    expect(container.querySelector('circle')).toHaveAttribute('stroke', '#55FF55');
  });

  it('uses a custom aria-label when provided', () => {
    render(<ProgressRing value={40} aria-label="Hold to complete" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      'Hold to complete'
    );
  });
});
