import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards ref to the dialog element', () => {
    const ref = createRef<HTMLElement>();
    render(<Modal ref={ref} isOpen={true} onClose={() => {}} title="Test">Content</Modal>);
    expect(ref.current).toBeTruthy();
  });

  describe('rendering', () => {
    it('renders with title and content when open', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Modal {...defaultProps} footer={<button>Save</button>} />
      );

      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('does not render footer when not provided', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('dialog has aria-label matching title', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Test Modal');
    });

    it('has close button with aria-label', () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('title is an h2 element', () => {
      render(<Modal {...defaultProps} />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Test Modal');
    });
  });

  describe('interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when modal content is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const content = screen.getByText('Modal content');
      fireEvent.click(content);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('onOpenChange callback', () => {
    it('fires with true when modal opens', () => {
      const onOpenChange = jest.fn();
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={false} onOpenChange={onOpenChange} />
      );

      rerender(<Modal {...defaultProps} isOpen={true} onOpenChange={onOpenChange} />);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('fires with false when modal closes', () => {
      const onOpenChange = jest.fn();
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={true} onOpenChange={onOpenChange} />
      );

      rerender(<Modal {...defaultProps} isOpen={false} onOpenChange={onOpenChange} />);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not fire on mount when initially open', () => {
      const onOpenChange = jest.fn();
      render(
        <Modal {...defaultProps} isOpen={true} onOpenChange={onOpenChange} />
      );

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('does not fire when isOpen stays the same', () => {
      const onOpenChange = jest.fn();
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={true} onOpenChange={onOpenChange} />
      );

      onOpenChange.mockClear();
      rerender(<Modal {...defaultProps} isOpen={true} onOpenChange={onOpenChange} title="Updated" />);

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('works without onOpenChange provided', () => {
      expect(() => {
        const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);
        rerender(<Modal {...defaultProps} isOpen={true} />);
      }).not.toThrow();
    });
  });

  describe('structure', () => {
    it('renders body with children', () => {
      render(<Modal {...defaultProps} />);

      const body = screen.getByText('Modal content').closest('.eidotter-modal__body');
      expect(body).toBeInTheDocument();
    });

    it('renders footer with provided content', () => {
      render(
        <Modal {...defaultProps} footer={<button>Action</button>} />
      );

      const footer = screen.getByRole('contentinfo');
      expect(footer).toContainElement(screen.getByText('Action'));
    });
  });
});
