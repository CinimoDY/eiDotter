import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info', 'accent'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const el = screen.getByText(variant).closest("[data-variant]");
      expect(el).toHaveClass(`eidotter-badge--${variant}`);
      unmount();
    }
  });

  it('renders V.37 color variants', () => {
    const { rerender } = render(<Badge variant="brand">Brand</Badge>);
    expect(screen.getByText('Brand').closest("[data-variant]")).toHaveClass('eidotter-badge--accent');

    rerender(<Badge variant="blue">Blue</Badge>);
    expect(screen.getByText('Blue').closest("[data-variant]")).toHaveClass('eidotter-badge--info');

    rerender(<Badge variant="orange">Orange</Badge>);
    expect(screen.getByText('Orange').closest("[data-variant]")).toHaveClass('eidotter-badge--warning');
  });

  it('renders with V.37 sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size)).toBeInTheDocument();
      unmount();
    }
  });

  it('supports backward-compatible size aliases', () => {
    const { rerender } = render(<Badge size="small">Small</Badge>);
    expect(screen.getByText('Small')).toBeInTheDocument();

    rerender(<Badge size="medium">Medium</Badge>);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders dot indicator', () => {
    render(<Badge dot>With Dot</Badge>);
    const dot = document.querySelector('.eidotter-badge__dot');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render dot by default', () => {
    render(<Badge>No Dot</Badge>);
    expect(document.querySelector('.eidotter-badge__dot')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom">Custom</Badge>);
    expect(screen.getByText('Custom').closest("[data-variant]")).toHaveClass('custom');
  });

  it('spreads additional props', () => {
    render(<Badge data-testid="badge" aria-label="status">Test</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('aria-label', 'status');
  });

  it('sets data-variant attribute', () => {
    render(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error').closest("[data-variant]")).toHaveAttribute('data-variant', 'error');
  });
});
