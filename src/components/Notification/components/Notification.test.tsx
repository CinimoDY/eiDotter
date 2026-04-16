import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Notification } from './Notification';

describe('Notification', () => {
  const getNotification = () => document.querySelector('.eidotter-notification');

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Notification />);
      expect(getNotification()).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<Notification title="Update available" />);
      expect(screen.getByText('Update available')).toBeInTheDocument();
    });

    it('renders children as supporting text', () => {
      render(<Notification>Check out the new dashboard.</Notification>);
      expect(screen.getByText('Check out the new dashboard.')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Notification className="custom" />);
      expect(getNotification()).toHaveClass('custom');
    });

    it('renders featured icon wrapper', () => {
      render(<Notification />);
      expect(document.querySelector('.eidotter-notification__icon')).toBeInTheDocument();
    });

    it('has transparent background by default', () => {
      render(<Notification />);
      expect(getNotification()).not.toHaveClass('bg-dos-bg-primary');
    });
  });

  describe('type variants', () => {
    const types = ['primary', 'gray', 'success', 'warning', 'error'] as const;

    types.forEach((type) => {
      it(`renders ${type} type variant`, () => {
        render(<Notification type={type} title={type} />);
        expect(getNotification()).toHaveClass(`eidotter-notification--${type}`);
      });
    });

    it('defaults to primary type', () => {
      render(<Notification />);
      expect(getNotification()).toHaveClass('eidotter-notification--primary');
    });

    it('sets data-type attribute', () => {
      render(<Notification type="error" />);
      expect(getNotification()).toHaveAttribute('data-type', 'error');
    });
  });

  describe('ARIA roles', () => {
    it('uses role="status" by default', () => {
      render(<Notification title="Info" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('uses role="alert" for error type', () => {
      render(<Notification type="error" title="Error" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('icon visibility', () => {
    it('shows icon by default', () => {
      render(<Notification />);
      expect(document.querySelector('.eidotter-notification__icon')).toBeInTheDocument();
    });

    it('hides icon when showIcon={false}', () => {
      render(<Notification showIcon={false} />);
      expect(document.querySelector('.eidotter-notification__icon')).not.toBeInTheDocument();
    });

    it('replaces icon with avatar', () => {
      render(<Notification avatar={<img src="avatar.png" alt="User" />} />);
      expect(document.querySelector('.eidotter-notification__avatar')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-notification__icon')).not.toBeInTheDocument();
    });
  });

  describe('image', () => {
    it('renders image above content', () => {
      render(<Notification image={<img src="preview.png" alt="Preview" />} />);
      expect(document.querySelector('.eidotter-notification__image')).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('renders action buttons', () => {
      const actions = [
        { label: 'Dismiss', onClick: jest.fn() },
        { label: 'View', onClick: jest.fn() },
      ];
      render(<Notification actions={actions}>Test</Notification>);
      expect(screen.getByText('Dismiss')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('calls action onClick', () => {
      const onClick = jest.fn();
      render(<Notification actions={[{ label: 'Act', onClick }]}>Test</Notification>);
      fireEvent.click(screen.getByText('Act'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('close button', () => {
    it('shows close button when onClose provided', () => {
      render(<Notification onClose={() => {}}>Closable</Notification>);
      expect(screen.getByLabelText('Close notification')).toBeInTheDocument();
    });

    it('does not show close button when onClose not provided', () => {
      render(<Notification>Not closable</Notification>);
      expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument();
    });

    it('adds closing class when close button clicked', () => {
      render(<Notification onClose={() => {}}>Test</Notification>);
      fireEvent.click(screen.getByLabelText('Close notification'));
      expect(getNotification()).toHaveClass('eidotter-notification--closing');
    });

    it('calls onClose after exit animation', () => {
      const onClose = jest.fn();
      render(<Notification onClose={onClose}>Test</Notification>);
      fireEvent.click(screen.getByLabelText('Close notification'));
      expect(onClose).not.toHaveBeenCalled();

      const el = getNotification();
      if (el) {
        const event = new Event('animationend', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: 'notification-exit' });
        el.dispatchEvent(event);
      }
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('auto-dismiss', () => {
    it('triggers close after duration', () => {
      const onClose = jest.fn();
      render(<Notification duration={3000} onClose={onClose}>Auto</Notification>);

      act(() => { jest.advanceTimersByTime(2999); });
      expect(getNotification()).not.toHaveClass('eidotter-notification--closing');

      act(() => { jest.advanceTimersByTime(1); });
      expect(getNotification()).toHaveClass('eidotter-notification--closing');
    });

    it('does not auto-dismiss without onClose', () => {
      render(<Notification duration={1000}>No handler</Notification>);
      act(() => { jest.advanceTimersByTime(2000); });
      expect(getNotification()).not.toHaveClass('eidotter-notification--closing');
    });
  });

  describe('progress', () => {
    it('renders progress bar when progress prop set', () => {
      render(<Notification progress={60} progressLabel="60% uploaded..." />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('60% uploaded...')).toBeInTheDocument();
    });

    it('does not render progress bar when progress not set', () => {
      render(<Notification title="No progress" />);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });
});
