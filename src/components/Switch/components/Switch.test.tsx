import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Switch aria-label="Test switch" className="custom-class" />);
      expect(screen.getByRole('switch')).toHaveClass('custom-class');
    });

    it('renders as a button element', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch').tagName).toBe('BUTTON');
    });

    it('has type="button" to prevent form submission', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
    });
  });

  describe('controlled mode', () => {
    it('respects checked prop', () => {
      render(<Switch aria-label="Test switch" checked={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('respects checked=false prop', () => {
      render(<Switch aria-label="Test switch" checked={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onCheckedChange when clicked', () => {
      const onCheckedChange = jest.fn();
      render(<Switch aria-label="Test switch" checked={false} onCheckedChange={onCheckedChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('calls onCheckedChange with false when unchecking', () => {
      const onCheckedChange = jest.fn();
      render(<Switch aria-label="Test switch" checked={true} onCheckedChange={onCheckedChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });
  });

  describe('uncontrolled mode', () => {
    it('defaults to unchecked', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('respects defaultChecked prop', () => {
      render(<Switch aria-label="Test switch" defaultChecked={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles state on click', () => {
      render(<Switch aria-label="Test switch" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      fireEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      fireEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('disabled state', () => {
    it('applies disabled class', () => {
      render(<Switch aria-label="Test switch" disabled />);
      expect(screen.getByRole('switch')).toHaveClass('switch--disabled');
    });

    it('has disabled attribute', () => {
      render(<Switch aria-label="Test switch" disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('has aria-disabled attribute', () => {
      render(<Switch aria-label="Test switch" disabled />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onCheckedChange when clicked while disabled', () => {
      const onCheckedChange = jest.fn();
      render(<Switch aria-label="Test switch" disabled onCheckedChange={onCheckedChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('does not toggle state when clicked while disabled', () => {
      render(<Switch aria-label="Test switch" disabled />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      fireEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('keyboard interaction', () => {
    it('toggles on Space key', () => {
      render(<Switch aria-label="Test switch" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      fireEvent.keyDown(switchEl, { key: ' ' });
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on Enter key', () => {
      render(<Switch aria-label="Test switch" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      fireEvent.keyDown(switchEl, { key: 'Enter' });
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
    });

    it('does not toggle on other keys', () => {
      render(<Switch aria-label="Test switch" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      fireEvent.keyDown(switchEl, { key: 'a' });
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('form integration', () => {
    it('renders hidden input when name is provided', () => {
      render(<Switch aria-label="Test switch" name="test-switch" />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('name', 'test-switch');
    });

    it('hidden input has empty value when unchecked', () => {
      render(<Switch aria-label="Test switch" name="test-switch" />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('value', '');
    });

    it('hidden input has "on" value when checked', () => {
      render(<Switch aria-label="Test switch" name="test-switch" defaultChecked />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('value', 'on');
    });

    it('hidden input uses custom value when provided', () => {
      render(<Switch aria-label="Test switch" name="test-switch" value="yes" defaultChecked />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('value', 'yes');
    });

    it('does not render hidden input when name is not provided', () => {
      render(<Switch aria-label="Test switch" />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has role="switch"', () => {
      render(<Switch aria-label="Test switch" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Toggle notifications" />);
      expect(screen.getByLabelText('Toggle notifications')).toBeInTheDocument();
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <label id="switch-label">Enable feature</label>
          <Switch aria-labelledby="switch-label" />
        </>
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-labelledby', 'switch-label');
    });

    it('has correct aria-checked state', () => {
      const { rerender } = render(<Switch aria-label="Test switch" checked={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch aria-label="Test switch" checked={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('class composition', () => {
    it('applies switch--checked class when checked', () => {
      render(<Switch aria-label="Test switch" checked />);
      expect(screen.getByRole('switch')).toHaveClass('switch--checked');
    });

    it('does not apply switch--checked class when unchecked', () => {
      render(<Switch aria-label="Test switch" checked={false} />);
      expect(screen.getByRole('switch')).not.toHaveClass('switch--checked');
    });

    it('combines all classes correctly', () => {
      render(<Switch aria-label="Test switch" checked disabled className="extra" />);
      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveClass('switch');
      expect(switchEl).toHaveClass('switch--checked');
      expect(switchEl).toHaveClass('switch--disabled');
      expect(switchEl).toHaveClass('extra');
    });
  });
});
