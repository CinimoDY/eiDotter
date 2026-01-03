import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Badge>Custom Content</Badge>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Badge</Badge>);
      const badge = screen.getByText('Badge').closest('.badge');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info', 'accent'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(<Badge variant={variant}>{variant}</Badge>);
        const badge = screen.getByText(variant).closest('.badge');
        expect(badge).toHaveClass(`badge--${variant}`);
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['small', 'medium'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        render(<Badge size={size}>{size}</Badge>);
        const badge = screen.getByText(size).closest('.badge');
        expect(badge).toHaveClass(`badge--${size}`);
      });
    });
  });

  describe('dot indicator', () => {
    it('renders without dot by default', () => {
      render(<Badge>No Dot</Badge>);
      const badge = screen.getByText('No Dot').closest('.badge');
      expect(badge).not.toHaveClass('badge--with-dot');
      expect(badge?.querySelector('.badge__dot')).not.toBeInTheDocument();
    });

    it('renders with dot when dot prop is true', () => {
      render(<Badge dot>With Dot</Badge>);
      const badge = screen.getByText('With Dot').closest('.badge');
      expect(badge).toHaveClass('badge--with-dot');
      expect(badge?.querySelector('.badge__dot')).toBeInTheDocument();
    });

    it('dot has aria-hidden attribute', () => {
      render(<Badge dot>Dot Badge</Badge>);
      const dot = screen.getByText('Dot Badge').closest('.badge')?.querySelector('.badge__dot');
      expect(dot).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('accessibility', () => {
    it('supports aria-label', () => {
      render(<Badge aria-label="Status indicator">Status</Badge>);
      const badge = screen.getByLabelText('Status indicator');
      expect(badge).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge').closest('.badge');
      expect(badge?.tagName).toBe('SPAN');
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(
        <Badge variant="success" size="small" dot className="extra">
          Full Badge
        </Badge>
      );
      const badge = screen.getByText('Full Badge').closest('.badge');
      expect(badge).toHaveClass('badge');
      expect(badge).toHaveClass('badge--success');
      expect(badge).toHaveClass('badge--small');
      expect(badge).toHaveClass('badge--with-dot');
      expect(badge).toHaveClass('extra');
    });
  });
});
