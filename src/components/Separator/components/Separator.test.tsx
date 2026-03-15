import React from 'react';
import { render, screen } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Separator />);
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('separator', 'separator--horizontal');
    });
  });

  describe('orientation', () => {
    it('renders horizontal separator', () => {
      render(<Separator orientation="horizontal" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('separator--horizontal');
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical separator', () => {
      render(<Separator orientation="vertical" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('separator--vertical');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('accessibility', () => {
    it('has separator role', () => {
      render(<Separator />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('has aria-orientation attribute', () => {
      render(<Separator orientation="horizontal" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    });
  });

  describe('className', () => {
    it('supports custom className', () => {
      render(<Separator className="custom-class" />);
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass('separator', 'custom-class');
    });
  });
});
