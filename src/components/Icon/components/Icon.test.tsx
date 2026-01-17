import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('rendering', () => {
    it('renders with required name prop', () => {
      render(<Icon name="Warning" />);
      expect(screen.getByLabelText('Warning icon')).toBeInTheDocument();
    });

    it('renders as svg element', () => {
      render(<Icon name="Close" />);
      const icon = screen.getByLabelText('Close icon');
      expect(icon.tagName).toBe('svg');
    });

    it('applies custom className', () => {
      render(<Icon name="Info" className="custom-class" />);
      const icon = screen.getByLabelText('Info icon');
      expect(icon).toHaveClass('custom-class');
    });

    it('renders use element with correct href', () => {
      render(<Icon name="Done" />);
      const useEl = document.querySelector('use');
      expect(useEl).toHaveAttribute('href', expect.stringContaining('#Done'));
    });
  });

  describe('sizes', () => {
    it('defaults to large size', () => {
      render(<Icon name="Warning" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).toHaveClass('icon--l');
    });

    it('renders large size', () => {
      render(<Icon name="Warning" size="L" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).toHaveClass('icon--l');
    });

    it('renders small size', () => {
      render(<Icon name="Warning" size="S" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).toHaveClass('icon--s');
    });
  });

  describe('color', () => {
    it('does not apply color style by default', () => {
      render(<Icon name="Warning" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).not.toHaveStyle({ color: expect.anything() });
    });

    it('applies custom color via style', () => {
      render(<Icon name="Warning" color="#ff0000" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon.style.color).toBe('rgb(255, 0, 0)');
    });

    it('applies CSS variable color', () => {
      render(<Icon name="Warning" color="var(--color-cga-amber)" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).toHaveStyle({ color: 'var(--color-cga-amber)' });
    });
  });

  describe('click handler', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<Icon name="Close" onClick={onClick} />);
      fireEvent.click(screen.getByLabelText('Close icon'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without onClick handler', () => {
      render(<Icon name="Close" />);
      expect(() => {
        fireEvent.click(screen.getByLabelText('Close icon'));
      }).not.toThrow();
    });
  });

  describe('role', () => {
    it('does not have role by default', () => {
      render(<Icon name="Warning" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).not.toHaveAttribute('role');
    });

    it('applies button role', () => {
      render(<Icon name="Close" role="button" />);
      const icon = screen.getByRole('button');
      expect(icon).toBeInTheDocument();
    });

    it('applies button class when role is button', () => {
      render(<Icon name="Close" role="button" />);
      const icon = screen.getByRole('button');
      expect(icon).toHaveClass('icon--button');
    });
  });

  describe('accessibility', () => {
    it('has aria-label based on icon name', () => {
      render(<Icon name="Error" />);
      expect(screen.getByLabelText('Error icon')).toBeInTheDocument();
    });

    it('generates readable aria-label from icon name', () => {
      render(<Icon name="Info" />);
      const icon = screen.getByLabelText('Info icon');
      expect(icon).toHaveAttribute('aria-label', 'Info icon');
    });
  });

  describe('class composition', () => {
    it('always has icon base class', () => {
      render(<Icon name="Warning" />);
      const icon = screen.getByLabelText('Warning icon');
      expect(icon).toHaveClass('icon');
    });

    it('combines all classes correctly', () => {
      render(<Icon name="Warning" size="S" role="button" className="extra" />);
      const icon = screen.getByRole('button');
      expect(icon).toHaveClass('icon');
      expect(icon).toHaveClass('icon--s');
      expect(icon).toHaveClass('icon--button');
      expect(icon).toHaveClass('extra');
    });
  });
});
