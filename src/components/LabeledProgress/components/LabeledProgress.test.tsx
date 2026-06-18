import React from 'react';
import { render, screen } from '@testing-library/react';
import { LabeledProgress } from './LabeledProgress';

describe('LabeledProgress', () => {
  it('renders the label, bar, and trailing value', () => {
    render(<LabeledProgress label="Coverage" value={67} />);
    expect(screen.getByText('Coverage')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '67');
  });

  it('computes percentage from value/max', () => {
    render(<LabeledProgress label="Docs" value={3} max={4} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('clamps out-of-range values and guards max=0', () => {
    const { rerender } = render(<LabeledProgress value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<LabeledProgress value={-10} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    rerender(<LabeledProgress value={5} max={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('supports a custom value suffix', () => {
    render(<LabeledProgress label="Filed" value={18} max={24} valueSuffix="/24 done" showValue />);
    expect(screen.getByText('75/24 done')).toBeInTheDocument();
  });

  it('hides the trailing value when showValue is false', () => {
    render(<LabeledProgress label="X" value={50} showValue={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('scales the fill via transform to match the percentage', () => {
    const { container } = render(<LabeledProgress value={40} />);
    const fill = container.querySelector<HTMLElement>('.eidotter-labeled-progress__fill');
    expect(fill?.style.transform).toBe('scaleX(0.4)');
  });

  it('falls back to a percentage aria-label when label is non-string', () => {
    render(<LabeledProgress value={30} />);
    expect(screen.getByRole('progressbar')).toHaveAccessibleName('30%');
  });
});
