import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toBeInTheDocument();
    });

    it('renders marker element', () => {
      render(<TimelineNode />);
      const marker = document.querySelector('.eidotter-timeline-node__marker');
      expect(marker).toBeInTheDocument();
      expect(marker).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      render(<TimelineNode className="custom-class" />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('custom-class');
    });
  });

  describe('shapes', () => {
    const shapes = ['circle', 'square', 'diamond'] as const;

    shapes.forEach((shape) => {
      it(`renders ${shape} shape`, () => {
        render(<TimelineNode shape={shape} />);
        const node = document.querySelector('.eidotter-timeline-node');
        expect(node).toHaveClass(`eidotter-timeline-node--${shape}`);
      });
    });

    it('defaults to circle shape', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--circle');
    });
  });

  describe('variants', () => {
    const variants = ['default', 'primary', 'secondary', 'accent'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(<TimelineNode variant={variant} />);
        const node = document.querySelector('.eidotter-timeline-node');
        expect(node).toHaveClass(`eidotter-timeline-node--${variant}`);
      });
    });

    it('defaults to default variant', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--default');
    });
  });

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        render(<TimelineNode size={size} />);
        const node = document.querySelector('.eidotter-timeline-node');
        expect(node).toHaveClass(`eidotter-timeline-node--${size}`);
      });
    });

    it('defaults to medium size', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--medium');
    });

    it('supports sm size alias', () => {
      render(<TimelineNode size="sm" />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--small');
    });

    it('supports md size alias', () => {
      render(<TimelineNode size="md" />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--medium');
    });

    it('supports lg size alias', () => {
      render(<TimelineNode size="lg" />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--large');
    });
  });

  describe('active state', () => {
    it('is not active by default', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).not.toHaveClass('eidotter-timeline-node--active');
    });

    it('applies active class when isActive is true', () => {
      render(<TimelineNode isActive />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--active');
    });
  });

  describe('labels', () => {
    it('does not render label by default', () => {
      render(<TimelineNode />);
      const label = document.querySelector('.eidotter-timeline-node__label');
      expect(label).not.toBeInTheDocument();
    });

    it('renders label on the right by default', () => {
      render(<TimelineNode label="2024-01-01" />);
      const label = screen.getByText('2024-01-01');
      expect(label).toHaveClass('eidotter-timeline-node__label--right');
    });

    const positions = ['left', 'right', 'top', 'bottom'] as const;

    positions.forEach((position) => {
      it(`renders label in ${position} position`, () => {
        render(<TimelineNode label="Test Label" labelPosition={position} />);
        const label = screen.getByText('Test Label');
        expect(label).toHaveClass(`eidotter-timeline-node__label--${position}`);
      });
    });
  });

  describe('interactivity', () => {
    it('is not interactive by default', () => {
      render(<TimelineNode />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).not.toHaveClass('eidotter-timeline-node--interactive');
      expect(node).not.toHaveAttribute('role');
      expect(node).not.toHaveAttribute('tabIndex');
    });

    it('becomes interactive when onClick is provided', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--interactive');
      expect(node).toHaveAttribute('role', 'button');
      expect(node).toHaveAttribute('tabIndex', '0');
    });

    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} />);
      const node = document.querySelector('.eidotter-timeline-node')!;
      fireEvent.click(node);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Enter key is pressed', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} />);
      const node = document.querySelector('.eidotter-timeline-node')!;
      fireEvent.keyDown(node, { key: 'Enter' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Space key is pressed', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} />);
      const node = document.querySelector('.eidotter-timeline-node')!;
      fireEvent.keyDown(node, { key: ' ' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick for other keys', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} />);
      const node = document.querySelector('.eidotter-timeline-node')!;
      fireEvent.keyDown(node, { key: 'Escape' });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has aria-pressed when interactive and active', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} isActive />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveAttribute('aria-pressed', 'true');
    });

    it('has aria-pressed=false when interactive and not active', () => {
      const onClick = jest.fn();
      render(<TimelineNode onClick={onClick} isActive={false} />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveAttribute('aria-pressed', 'false');
    });

    it('does not have aria-pressed when not interactive', () => {
      render(<TimelineNode isActive />);
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).not.toHaveAttribute('aria-pressed');
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(
        <TimelineNode
          shape="diamond"
          variant="accent"
          size="large"
          isActive
          label="Test"
          labelPosition="right"
          className="extra"
          onClick={() => {}}
        />
      );
      const node = document.querySelector('.eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node');
      expect(node).toHaveClass('eidotter-timeline-node--diamond');
      expect(node).toHaveClass('eidotter-timeline-node--accent');
      expect(node).toHaveClass('eidotter-timeline-node--large');
      expect(node).toHaveClass('eidotter-timeline-node--label-right');
      expect(node).toHaveClass('eidotter-timeline-node--active');
      expect(node).toHaveClass('eidotter-timeline-node--interactive');
      expect(node).toHaveClass('extra');
    });
  });
});
