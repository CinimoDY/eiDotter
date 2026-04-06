import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('rendering', () => {
    it('renders with required name prop', () => {
      render(<Icon name="Warning" />);
      expect(screen.getByLabelText('Warning icon')).toBeInTheDocument();
    });

    it('renders an SVG element inside wrapper', () => {
      render(<Icon name="Close" />);
      const wrapper = screen.getByLabelText('Close icon');
      expect(wrapper.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Icon name="Info" className="custom-class" />);
      expect(screen.getByLabelText('Info icon')).toHaveClass('custom-class');
    });

    it('returns null for unmapped icon names', () => {
      const { container } = render(<Icon name={'NonExistent' as any} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('sizes', () => {
    it('renders large by default', () => {
      render(<Icon name="Warning" />);
      const svg = screen.getByLabelText('Warning icon').querySelector('svg');
      expect(svg).toHaveAttribute('width', '56');
      expect(svg).toHaveAttribute('height', '56');
    });

    it('renders large with explicit L size', () => {
      render(<Icon name="Warning" size="L" />);
      const svg = screen.getByLabelText('Warning icon').querySelector('svg');
      expect(svg).toHaveAttribute('width', '56');
    });

    it('renders small with S size', () => {
      render(<Icon name="Warning" size="S" />);
      const svg = screen.getByLabelText('Warning icon').querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });
  });

  describe('color', () => {
    it('does not set inline color by default', () => {
      render(<Icon name="Warning" />);
      expect(screen.getByLabelText('Warning icon')).not.toHaveAttribute('style');
    });

    it('applies hex color via style', () => {
      render(<Icon name="Warning" color="#ff0000" />);
      expect(screen.getByLabelText('Warning icon')).toHaveStyle({ color: '#ff0000' });
    });

    it('applies CSS variable color', () => {
      render(<Icon name="Warning" color="var(--color-cga-amber)" />);
      expect(screen.getByLabelText('Warning icon')).toHaveStyle({ color: 'var(--color-cga-amber)' });
    });
  });

  describe('click handler', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<Icon name="Close" onClick={onClick} />);
      fireEvent.click(screen.getByLabelText('Close icon'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without handler', () => {
      render(<Icon name="Close" />);
      expect(() => fireEvent.click(screen.getByLabelText('Close icon'))).not.toThrow();
    });
  });

  describe('role', () => {
    it('has no role by default', () => {
      render(<Icon name="Warning" />);
      expect(screen.getByLabelText('Warning icon')).not.toHaveAttribute('role');
    });

    it('accepts button role', () => {
      render(<Icon name="Close" role="button" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('adds button class when role is button', () => {
      render(<Icon name="Close" role="button" />);
      expect(screen.getByRole('button')).toHaveClass('icon--button');
    });
  });

  describe('accessibility', () => {
    it('generates aria-label from name', () => {
      render(<Icon name="Error" />);
      expect(screen.getByLabelText('Error icon')).toBeInTheDocument();
    });

    it('uses custom aria-label when provided', () => {
      render(<Icon name="Close" aria-label="Dismiss" />);
      expect(screen.getByLabelText('Dismiss')).toBeInTheDocument();
    });
  });

  describe('icon mapping', () => {
    it('renders all mapped icon names', () => {
      const names = ['Info', 'Warning', 'Error', 'Done', 'Close', 'Check',
        'Chevron Up', 'Chevron Down', 'App', 'Cancel', 'Fullscreen', 'Add'];
      names.forEach(name => {
        const { unmount } = render(<Icon name={name as any} size="S" />);
        const el = screen.getByLabelText(`${name} icon`);
        expect(el.querySelector('svg')).toBeInTheDocument();
        unmount();
      });
    });
  });
});
