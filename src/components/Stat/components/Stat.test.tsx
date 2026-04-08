import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Stat } from './Stat';

describe('Stat', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stat ref={ref} label="Total" value="42" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

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
      const stat = screen.getByText('Test').closest('.eidotter-stat');
      expect(stat).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it('renders with default md size', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat).toBeInTheDocument();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Stat label="Label" value="Value" size={size} />);
      expect(screen.getByText('Label').closest('.eidotter-stat')).toBeInTheDocument();
    });

    it.each(['small', 'medium', 'large'] as const)(
      'supports backward-compatible %s alias',
      (alias) => {
        render(<Stat label="Label" value="Value" size={alias} />);
        expect(screen.getByText('Label').closest('.eidotter-stat')).toBeInTheDocument();
      },
    );
  });

  describe('trend indicator', () => {
    it('renders without trend by default', () => {
      render(<Stat label="Label" value="Value" />);
      expect(screen.queryByText('▲')).not.toBeInTheDocument();
      expect(screen.queryByText('▼')).not.toBeInTheDocument();
    });

    it('renders up trend icon', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      expect(screen.getByText('▲')).toBeInTheDocument();
    });

    it('renders down trend icon', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('renders neutral trend icon', () => {
      render(<Stat label="Label" value="Value" trend="neutral" />);
      expect(screen.getByText('►')).toBeInTheDocument();
    });

    it('renders trend value', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+15%" />);
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('trend icon has aria-hidden', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      expect(screen.getByText('▲').closest('[aria-hidden="true"]')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('trend has aria-label for screen readers', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+10%" />);
      expect(screen.getByLabelText('Trend: increasing, +10%')).toBeInTheDocument();
    });

    it('trend aria-label works without trendValue', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      expect(screen.getByLabelText('Trend: decreasing')).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat?.tagName).toBe('DIV');
    });
  });

  describe('scramble', () => {
    it('renders value normally without scramble', () => {
      render(<Stat label="Total" value="42" />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('accepts scramble prop without error', () => {
      expect(() => {
        render(<Stat label="Total" value="42" scramble />);
      }).not.toThrow();
    });
  });

  describe('class composition', () => {
    it('applies eidotter-stat base class and custom class', () => {
      render(<Stat label="Label" value="Value" size="lg" className="extra" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat).toHaveClass('eidotter-stat');
      expect(stat).toHaveClass('extra');
    });
  });
});
