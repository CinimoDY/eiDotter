import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  const getAlert = () => document.querySelector('.eidotter-alert');

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Alert />);
      expect(getAlert()).toBeInTheDocument();
    });

    it('renders custom title', () => {
      render(<Alert title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Alert>Custom message content</Alert>);
      expect(screen.getByText('Custom message content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Alert className="custom-class" />);
      expect(getAlert()).toHaveClass('custom-class');
    });

    it('has role=alert', () => {
      render(<Alert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('sets data-type attribute', () => {
      render(<Alert type="error" />);
      expect(getAlert()).toHaveAttribute('data-type', 'error');
    });
  });

  describe('types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const;

    types.forEach((type) => {
      it('renders ' + type + ' type', () => {
        render(<Alert type={type} title={type} />);
        expect(getAlert()).toHaveClass('eidotter-alert--' + type);
      });
    });

    it('defaults to info type', () => {
      render(<Alert />);
      expect(getAlert()).toHaveClass('eidotter-alert--info');
    });
  });

  describe('V.37 types', () => {
    it('renders default type as info', () => {
      render(<Alert type="default" />);
      expect(getAlert()).toHaveClass('eidotter-alert--info');
    });

    it('renders brand type as warning', () => {
      render(<Alert type="brand" />);
      expect(getAlert()).toHaveClass('eidotter-alert--warning');
    });
  });

  describe('sizes', () => {
    it('renders lg size by default', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('hides content in sm size', () => {
      render(<Alert size="sm">Hidden content</Alert>);
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('supports backward-compatible size aliases', () => {
      const { unmount } = render(<Alert size="small">Small</Alert>);
      expect(getAlert()).toBeInTheDocument();
      unmount();

      render(<Alert size="large">Large</Alert>);
      expect(screen.getByText('Large')).toBeInTheDocument();
    });
  });

  describe('close button', () => {
    it('shows close button when onClose provided', () => {
      render(<Alert onClose={() => {}}>Closable</Alert>);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('does not show close button when onClose not provided', () => {
      render(<Alert>Not closable</Alert>);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('adds closing class when close button is clicked', () => {
      render(<Alert onClose={() => {}}>Closing test</Alert>);
      const closeBtn = screen.getByLabelText('Close alert');
      fireEvent.click(closeBtn);
      expect(getAlert()).toHaveClass('eidotter-alert--closing');
    });

    it('calls onClose after exit animation ends', () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose}>Animation test</Alert>);
      const closeBtn = screen.getByLabelText('Close alert');

      fireEvent.click(closeBtn);
      expect(onClose).not.toHaveBeenCalled();

      const alert = getAlert();
      if (alert) {
        const event = new Event('animationend', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: 'alert-exit' });
        alert.dispatchEvent(event);
      }
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('click here link', () => {
    it('renders click here link when onClickHere provided', () => {
      render(<Alert onClickHere={() => {}}>With link</Alert>);
      expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('calls onClickHere when clicked', () => {
      const onClickHere = jest.fn();
      render(<Alert onClickHere={onClickHere}>Link test</Alert>);
      fireEvent.click(screen.getByText('Click here'));
      expect(onClickHere).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('renders icon with aria-label', () => {
      render(<Alert type="error" title="Error" />);
      // Icon component renders aria-label on the icon element
      const alert = getAlert();
      expect(alert).toHaveAttribute('data-type', 'error');
    });
  });
});
