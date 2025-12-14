import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with default props', () => {
    render(<Progress value={50} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders correct number of filled blocks', () => {
    const { container } = render(<Progress value={50} />);
    const fill = container.querySelector('.progress__fill');
    // 50% = 10 blocks out of 20
    expect(fill?.textContent).toBe('██████████');
  });

  it('renders correct number of empty blocks', () => {
    const { container } = render(<Progress value={50} />);
    const empty = container.querySelector('.progress__empty');
    // 50% = 10 empty blocks
    expect(empty?.textContent).toBe('░░░░░░░░░░');
  });

  it('clamps value to 0-100 range', () => {
    const { rerender } = render(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '150');
    // But visually it should be capped at 100%

    rerender(<Progress value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '-10');
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<Progress value={75} showLabel={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container, rerender } = render(<Progress value={50} variant="success" />);
    expect(container.firstChild).toHaveClass('progress--success');

    rerender(<Progress value={50} variant="warning" />);
    expect(container.firstChild).toHaveClass('progress--warning');

    rerender(<Progress value={50} variant="error" />);
    expect(container.firstChild).toHaveClass('progress--error');
  });

  it('applies size classes', () => {
    const { container, rerender } = render(<Progress value={50} size="small" />);
    expect(container.firstChild).toHaveClass('progress--small');

    rerender(<Progress value={50} size="large" />);
    expect(container.firstChild).toHaveClass('progress--large');
  });

  it('has proper accessibility attributes', () => {
    render(<Progress value={50} aria-label="Loading progress" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-label', 'Loading progress');
  });
});
