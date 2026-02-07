import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  // === Existing tests (updated for new defaults) ===

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

  // === Track container ===

  describe('track container', () => {
    it('renders a track wrapper around the bar', () => {
      const { container } = render(<Progress value={50} />);
      const track = container.querySelector('.progress__track');
      expect(track).toBeInTheDocument();
      expect(track?.querySelector('.progress__fill')).toBeInTheDocument();
      expect(track?.querySelector('.progress__empty')).toBeInTheDocument();
    });

    it('track is visible at 0% (all empty blocks)', () => {
      const { container } = render(<Progress value={0} />);
      const track = container.querySelector('.progress__track');
      const empty = container.querySelector('.progress__empty');
      expect(track).toBeInTheDocument();
      expect(empty?.textContent).toBe('░░░░░░░░░░░░░░░░░░░░');
    });
  });

  // === Track style variants ===

  describe('trackStyle', () => {
    it('default block style has CSS-bordered track', () => {
      const { container } = render(<Progress value={50} />);
      const track = container.querySelector('.progress__track');
      expect(track).not.toHaveClass('progress__track--borderless');
    });

    it('bordered style renders bracket characters', () => {
      const { container } = render(<Progress value={50} trackStyle="bordered" />);
      const brackets = container.querySelectorAll('.progress__bracket');
      expect(brackets).toHaveLength(2);
      expect(brackets[0].textContent).toBe('[');
      expect(brackets[1].textContent).toBe(']');
    });

    it('bordered style removes CSS border from track', () => {
      const { container } = render(<Progress value={50} trackStyle="bordered" />);
      const track = container.querySelector('.progress__track');
      expect(track).toHaveClass('progress__track--borderless');
    });

    it('gradient style renders transition characters at fill boundary', () => {
      const { container } = render(<Progress value={50} trackStyle="gradient" />);
      const transition = container.querySelector('.progress__transition');
      expect(transition).toBeInTheDocument();
      // Should contain ▓▒ (dark shade + medium shade)
      expect(transition?.textContent).toBe('▓▒');
    });

    it('gradient style does not render transition at 0%', () => {
      const { container } = render(<Progress value={0} trackStyle="gradient" />);
      const transition = container.querySelector('.progress__transition');
      expect(transition).not.toBeInTheDocument();
    });

    it('gradient style does not render transition at 100%', () => {
      const { container } = render(<Progress value={100} trackStyle="gradient" />);
      const transition = container.querySelector('.progress__transition');
      expect(transition).not.toBeInTheDocument();
    });
  });

  // === Blocks prop ===

  describe('blocks prop', () => {
    it('renders custom number of blocks', () => {
      const { container } = render(<Progress value={50} blocks={10} />);
      const fill = container.querySelector('.progress__fill');
      const empty = container.querySelector('.progress__empty');
      expect(fill?.textContent).toBe('█████');
      expect(empty?.textContent).toBe('░░░░░');
    });

    it('clamps blocks to minimum of 3', () => {
      const { container } = render(<Progress value={0} blocks={1} />);
      const empty = container.querySelector('.progress__empty');
      expect(empty?.textContent).toBe('░░░');
    });

    it('clamps blocks to maximum of 80', () => {
      const { container } = render(<Progress value={0} blocks={100} />);
      const empty = container.querySelector('.progress__empty');
      expect(empty?.textContent?.length).toBe(80);
    });
  });

  // === Glow ===

  describe('glow', () => {
    it('applies glow class when glow prop is true', () => {
      const { container } = render(<Progress value={50} glow />);
      expect(container.firstChild).toHaveClass('progress--glow');
    });

    it('does not apply glow class when glow prop is false', () => {
      const { container } = render(<Progress value={50} />);
      expect(container.firstChild).not.toHaveClass('progress--glow');
    });
  });

  // === Indeterminate ===

  describe('indeterminate', () => {
    it('applies indeterminate class', () => {
      const { container } = render(<Progress indeterminate />);
      expect(container.firstChild).toHaveClass('progress--indeterminate');
    });

    it('renders scanner element', () => {
      const { container } = render(<Progress indeterminate />);
      const scanner = container.querySelector('.progress__scanner');
      expect(scanner).toBeInTheDocument();
      expect(scanner?.textContent).toBe('▓█▓');
    });

    it('omits aria-valuenow for indeterminate state', () => {
      render(<Progress indeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
      expect(progressbar).not.toHaveAttribute('aria-valuemin');
      expect(progressbar).not.toHaveAttribute('aria-valuemax');
    });

    it('sets aria-label to loading for indeterminate', () => {
      render(<Progress indeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Progress: loading');
    });

    it('shows "..." as label when indeterminate with showLabel', () => {
      render(<Progress indeterminate showLabel />);
      expect(screen.getByText('...')).toBeInTheDocument();
    });
  });

  // === valueText ===

  describe('valueText', () => {
    it('maps valueText to aria-valuetext', () => {
      render(<Progress value={30} valueText="3 of 10 files" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuetext', '3 of 10 files');
    });
  });

  // === Edge cases ===

  describe('edge cases', () => {
    it('handles 0% correctly', () => {
      const { container } = render(<Progress value={0} />);
      const fill = container.querySelector('.progress__fill');
      const empty = container.querySelector('.progress__empty');
      // At 0%, fill span should not be rendered (empty string)
      expect(fill).not.toBeInTheDocument();
      expect(empty?.textContent).toBe('░░░░░░░░░░░░░░░░░░░░');
    });

    it('handles 100% correctly', () => {
      const { container } = render(<Progress value={100} />);
      const fill = container.querySelector('.progress__fill');
      const empty = container.querySelector('.progress__empty');
      expect(fill?.textContent).toBe('████████████████████');
      expect(empty).not.toBeInTheDocument();
    });

    it('handles NaN value gracefully', () => {
      const { container } = render(<Progress value={NaN} />);
      const track = container.querySelector('.progress__track');
      expect(track).toBeInTheDocument();
    });

    it('renders with custom max value', () => {
      const { container } = render(<Progress value={5} max={10} />);
      const fill = container.querySelector('.progress__fill');
      // 50% = 10 filled blocks
      expect(fill?.textContent).toBe('██████████');
    });
  });
});
