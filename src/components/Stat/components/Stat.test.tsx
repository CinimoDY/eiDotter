import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stat } from './Stat';

describe('Stat', () => {
  describe('rendering', () => {
    it('renders label and value', () => {
      render(<Stat label="Total" value="42" />);
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<Stat label="Count" value={1234} />);
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Stat label="Test" value="0" className="custom-class" />);
      const stat = screen.getByText('Test').closest('.stat');
      expect(stat).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        render(<Stat label="Label" value="Value" size={size} />);
        const stat = screen.getByText('Label').closest('.stat');
        expect(stat).toHaveClass(`stat--${size}`);
      });
    });

    it('defaults to medium size', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.stat');
      expect(stat).toHaveClass('stat--medium');
    });
  });

  describe('trend indicator', () => {
    it('renders without trend by default', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.stat');
      expect(stat?.querySelector('.stat__trend')).not.toBeInTheDocument();
    });

    it('renders up trend', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      const trend = screen.getByText('Label').closest('.stat')?.querySelector('.stat__trend');
      expect(trend).toHaveClass('stat__trend--up');
      expect(trend?.querySelector('.stat__trend-icon')).toHaveTextContent('▲');
    });

    it('renders down trend', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      const trend = screen.getByText('Label').closest('.stat')?.querySelector('.stat__trend');
      expect(trend).toHaveClass('stat__trend--down');
      expect(trend?.querySelector('.stat__trend-icon')).toHaveTextContent('▼');
    });

    it('renders neutral trend', () => {
      render(<Stat label="Label" value="Value" trend="neutral" />);
      const trend = screen.getByText('Label').closest('.stat')?.querySelector('.stat__trend');
      expect(trend).toHaveClass('stat__trend--neutral');
      expect(trend?.querySelector('.stat__trend-icon')).toHaveTextContent('►');
    });

    it('renders trend value', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+15%" />);
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('trend icon has aria-hidden', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      const icon = screen.getByText('Label').closest('.stat')?.querySelector('.stat__trend-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('accessibility', () => {
    it('trend has aria-label for screen readers', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+10%" />);
      const trend = screen.getByLabelText('Trend: increasing, +10%');
      expect(trend).toBeInTheDocument();
    });

    it('trend aria-label works without trendValue', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      const trend = screen.getByLabelText('Trend: decreasing');
      expect(trend).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.stat');
      expect(stat?.tagName).toBe('DIV');
    });
  });

  describe('scramble', () => {
    it('renders value normally without scramble', () => {
      render(<Stat label="Total" value="42" />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('accepts scramble prop without error', () => {
      // With scramble enabled the hook runs an animation, so the displayed
      // text may differ from the target during the scramble phase.
      // We just verify it renders without throwing.
      expect(() => {
        render(<Stat label="Total" value="42" scramble />);
      }).not.toThrow();
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(
        <Stat
          label="Label"
          value="Value"
          size="large"
          className="extra"
        />
      );
      const stat = screen.getByText('Label').closest('.stat');
      expect(stat).toHaveClass('stat');
      expect(stat).toHaveClass('stat--large');
      expect(stat).toHaveClass('extra');
    });
  });
});
