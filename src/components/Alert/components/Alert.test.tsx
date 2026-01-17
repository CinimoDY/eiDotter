import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Alert />);
      expect(screen.getByText('Notification Title')).toBeInTheDocument();
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
      const alert = document.querySelector('.alert');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const;

    types.forEach((type) => {
      it(`renders ${type} type`, () => {
        render(<Alert type={type} title={type} />);
        const alert = document.querySelector('.alert');
        expect(alert).toHaveClass(`alert--${type}`);
      });
    });

    it('defaults to info type', () => {
      render(<Alert />);
      const alert = document.querySelector('.alert');
      expect(alert).toHaveClass('alert--info');
    });
  });

  describe('sizes', () => {
    it('renders large size by default', () => {
      render(<Alert />);
      const alert = document.querySelector('.alert');
      expect(alert).toHaveClass('alert--l');
    });

    it('renders small size', () => {
      render(<Alert size="S" />);
      const alert = document.querySelector('.alert');
      expect(alert).toHaveClass('alert--s');
    });

    it('renders large size', () => {
      render(<Alert size="L" />);
      const alert = document.querySelector('.alert');
      expect(alert).toHaveClass('alert--l');
    });
  });

  describe('close button', () => {
    it('does not render close button by default', () => {
      render(<Alert />);
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('renders close button when onClose is provided', () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose} />);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<Alert onClose={onClose} />);
      fireEvent.click(screen.getByLabelText('Close alert'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('click here link', () => {
    it('does not render link by default', () => {
      render(<Alert />);
      expect(screen.queryByText('Click here')).not.toBeInTheDocument();
    });

    it('renders link when onClickHere is provided', () => {
      const onClickHere = jest.fn();
      render(<Alert onClickHere={onClickHere} />);
      expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('calls onClickHere when link is clicked', () => {
      const onClickHere = jest.fn();
      render(<Alert onClickHere={onClickHere} />);
      fireEvent.click(screen.getByText('Click here'));
      expect(onClickHere).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has icon with aria-label', () => {
      render(<Alert type="warning" />);
      expect(screen.getByLabelText('Warning icon')).toBeInTheDocument();
    });

    it('close button has aria-label', () => {
      render(<Alert onClose={() => {}} />);
      expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
    });

    it('click here link has aria-label', () => {
      render(<Alert onClickHere={() => {}} />);
      expect(screen.getByLabelText('Click for more information')).toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders info icon for info type', () => {
      render(<Alert type="info" />);
      expect(screen.getByLabelText('Info icon')).toBeInTheDocument();
    });

    it('renders success icon for success type', () => {
      render(<Alert type="success" />);
      expect(screen.getByLabelText('Done icon')).toBeInTheDocument();
    });

    it('renders warning icon for warning type', () => {
      render(<Alert type="warning" />);
      expect(screen.getByLabelText('Warning icon')).toBeInTheDocument();
    });

    it('renders error icon for error type', () => {
      render(<Alert type="error" />);
      expect(screen.getByLabelText('Error icon')).toBeInTheDocument();
    });
  });
});
