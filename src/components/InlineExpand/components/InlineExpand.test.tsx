import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineExpand } from './InlineExpand';

describe('InlineExpand', () => {
  const defaultProps = {
    children: 'trigger text',
    content: 'expanded content',
  };

  describe('rendering', () => {
    it('renders trigger text', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveTextContent('trigger text');
    });

    it('renders as a native button element', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('has type="button" to prevent form submission', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('renders [+] indicator when collapsed', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveTextContent('[+]');
    });

    it('renders [-] indicator when expanded', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('button')).toHaveTextContent('[-]');
    });

    it('applies custom className', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders content in a region', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('uncontrolled mode', () => {
    it('defaults to collapsed', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('respects defaultExpanded prop', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles state on click', () => {
      render(<InlineExpand {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle when toggled', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('controlled mode', () => {
    it('respects expanded prop', () => {
      render(<InlineExpand {...defaultProps} expanded={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('respects expanded=false prop', () => {
      render(<InlineExpand {...defaultProps} expanded={false} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onToggle with next state when clicked', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with false when collapsing', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={true} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not update internal state in controlled mode', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} expanded={false} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      // Still false because controlled — parent didn't update
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('keyboard interaction', () => {
    it('collapses on Escape when expanded', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} defaultExpanded onToggle={onToggle} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button.closest('.inline-expand')!, { key: 'Escape' });
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not collapse on Escape when already collapsed', () => {
      const onToggle = jest.fn();
      render(<InlineExpand {...defaultProps} onToggle={onToggle} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button.closest('.inline-expand')!, { key: 'Escape' });
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has aria-expanded attribute', () => {
      render(<InlineExpand {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-controls linking trigger to content', () => {
      render(<InlineExpand {...defaultProps} />);
      const button = screen.getByRole('button');
      const controlsId = button.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(screen.getByRole('region')).toHaveAttribute('id', controlsId);
    });

    it('indicator is hidden from screen readers', () => {
      render(<InlineExpand {...defaultProps} />);
      const indicator = screen.getByRole('button').querySelector('.inline-expand__indicator');
      expect(indicator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('class composition', () => {
    it('applies inline-expand--expanded class when expanded', () => {
      const { container } = render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(container.firstChild).toHaveClass('inline-expand--expanded');
    });

    it('does not apply inline-expand--expanded when collapsed', () => {
      const { container } = render(<InlineExpand {...defaultProps} />);
      expect(container.firstChild).not.toHaveClass('inline-expand--expanded');
    });

    it('combines base and custom classes', () => {
      const { container } = render(
        <InlineExpand {...defaultProps} defaultExpanded className="extra" />
      );
      const root = container.firstChild;
      expect(root).toHaveClass('inline-expand');
      expect(root).toHaveClass('inline-expand--expanded');
      expect(root).toHaveClass('extra');
    });
  });

  describe('content rendering', () => {
    it('renders string content', () => {
      render(<InlineExpand {...defaultProps} defaultExpanded />);
      expect(screen.getByRole('region')).toHaveTextContent('expanded content');
    });

    it('renders ReactNode content', () => {
      render(
        <InlineExpand defaultExpanded content={<strong>rich content</strong>}>
          trigger
        </InlineExpand>
      );
      expect(screen.getByRole('region').querySelector('strong')).toHaveTextContent('rich content');
    });
  });
});
