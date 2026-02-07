import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

// Mock createPortal to render inline for testing
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock HTMLDialogElement methods
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
    this.open = false;
  });
});

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

  describe('rendering', () => {
    it('renders with title and content when open', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
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

    it('applies custom className', () => {
      render(<Modal {...defaultProps} className="custom-modal" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('modal', 'custom-modal');
    });
  });

  describe('accessibility', () => {
    it('has aria-labelledby pointing to title', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      const titleId = dialog.getAttribute('aria-labelledby');
      const title = screen.getByText('Test Modal');

      expect(titleId).toBeTruthy();
      expect(title).toHaveAttribute('id', titleId);
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

    it('calls onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      fireEvent.click(dialog);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when modal content is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const content = screen.getByText('Modal content');
      fireEvent.click(content);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when native close event fires (escape key)', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      // Dispatch native close event (simulates escape key or programmatic close)
      dialog.dispatchEvent(new Event('close'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('open/close behavior', () => {
    it('calls showModal when isOpen changes to true', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

      expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();

      rerender(<Modal {...defaultProps} isOpen={true} />);

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it('calls close when isOpen changes to false', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

      // Simulate dialog being open
      const dialog = screen.getByRole('dialog') as HTMLDialogElement;
      dialog.open = true;

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
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

      // Simulate dialog being open
      const dialog = screen.getByRole('dialog') as HTMLDialogElement;
      dialog.open = true;

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

  describe('color inheritance', () => {
    it('does not inherit dialog CanvasText for unstyled content', () => {
      render(
        <Modal {...defaultProps}>
          <span data-testid="unstyled">Plain text</span>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const styles = window.getComputedStyle(dialog);
      // Dialog should have an explicit color, not the user-agent CanvasText
      expect(styles.color).not.toBe('');
    });
  });

  describe('structure', () => {
    it('renders header with title and close button', () => {
      render(<Modal {...defaultProps} />);

      const header = screen.getByRole('banner');
      expect(header).toContainElement(screen.getByText('Test Modal'));
      expect(header).toContainElement(screen.getByLabelText('Close modal'));
    });

    it('renders body with children', () => {
      render(<Modal {...defaultProps} />);

      const body = screen.getByText('Modal content').closest('.modal__body');
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
