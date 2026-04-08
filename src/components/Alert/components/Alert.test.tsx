import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    it('has uniform dark background', () => {
      render(<Alert color="error" />);
      expect(getAlert()).toHaveClass('bg-dos-bg-primary');
    });

    it('renders featured icon wrapper', () => {
      render(<Alert />);
      expect(document.querySelector('.eidotter-alert__icon')).toBeInTheDocument();
    });
  });

  describe('color prop (V.37)', () => {
    const colors = ['default', 'brand', 'gray', 'error', 'warning', 'success'] as const;

    colors.forEach((color) => {
      it(`renders ${color} color variant`, () => {
        render(<Alert color={color} title={color} />);
        expect(getAlert()).toHaveClass(`eidotter-alert--${color}`);
      });
    });

    it('defaults to default color', () => {
      render(<Alert />);
      expect(getAlert()).toHaveClass('eidotter-alert--default');
    });

    it('sets data-color attribute', () => {
      render(<Alert color="error" />);
      expect(getAlert()).toHaveAttribute('data-color', 'error');
    });
  });

  describe('backward-compatible type prop', () => {
    it('maps type="info" to color="default"', () => {
      render(<Alert type="info" />);
      expect(getAlert()).toHaveClass('eidotter-alert--default');
    });

    it('maps type="success" to color="success"', () => {
      render(<Alert type="success" />);
      expect(getAlert()).toHaveClass('eidotter-alert--success');
    });

    it('maps type="warning" to color="warning"', () => {
      render(<Alert type="warning" />);
      expect(getAlert()).toHaveClass('eidotter-alert--warning');
    });

    it('maps type="error" to color="error"', () => {
      render(<Alert type="error" />);
      expect(getAlert()).toHaveClass('eidotter-alert--error');
    });

    it('maps type="brand" to color="brand"', () => {
      render(<Alert type="brand" />);
      expect(getAlert()).toHaveClass('eidotter-alert--brand');
    });

    it('color prop takes precedence over type', () => {
      render(<Alert color="error" type="info" />);
      expect(getAlert()).toHaveClass('eidotter-alert--error');
    });
  });

  describe('sizes', () => {
    it('defaults to floating size', () => {
      render(<Alert>Content</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'floating');
    });

    it('renders full-width size', () => {
      render(<Alert size="full-width">Content</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'full-width');
      expect(getAlert()).toHaveClass('eidotter-alert--full-width');
    });

    it('maps legacy size aliases to floating', () => {
      const { unmount: u1 } = render(<Alert size="sm">A</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'floating');
      u1();

      const { unmount: u2 } = render(<Alert size="lg">B</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'floating');
      u2();

      const { unmount: u3 } = render(<Alert size="small">C</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'floating');
      u3();

      render(<Alert size="large">D</Alert>);
      expect(getAlert()).toHaveAttribute('data-size', 'floating');
    });
  });

  describe('actions', () => {
    it('renders action buttons', () => {
      const actions = [
        { label: 'Dismiss', onClick: jest.fn() },
        { label: 'Learn more', onClick: jest.fn() },
      ];
      render(<Alert actions={actions}>With actions</Alert>);
      expect(screen.getByText('Dismiss')).toBeInTheDocument();
      expect(screen.getByText('Learn more')).toBeInTheDocument();
    });

    it('calls action onClick', () => {
      const onClick = jest.fn();
      render(<Alert actions={[{ label: 'Do it', onClick }]}>Test</Alert>);
      fireEvent.click(screen.getByText('Do it'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders onClickHere as action (backward compat)', () => {
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

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('accessibility', () => {
    it('renders icon with aria-label', () => {
      render(<Alert color="error" title="Error" />);
      expect(getAlert()).toHaveAttribute('data-color', 'error');
    });

    it('all color variants have uniform dark background', () => {
      const colors = ['default', 'brand', 'gray', 'error', 'warning', 'success'] as const;
      colors.forEach((color) => {
        const { unmount } = render(<Alert color={color} />);
        expect(getAlert()).toHaveClass('bg-dos-bg-primary');
        unmount();
      });
    });
  });
});
