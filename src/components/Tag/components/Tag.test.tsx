import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tag';

describe('Tag', () => {
  const getTag = () => document.querySelector('.eidotter-tag');

  it('renders children', () => {
    render(<Tag>Label</Tag>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    render(<Tag>Default</Tag>);
    expect(getTag()).toHaveClass('eidotter-tag--default');
  });

  it('applies data-variant attribute', () => {
    render(<Tag variant="outlined">Outlined</Tag>);
    expect(getTag()).toHaveAttribute('data-variant', 'outlined');
  });

  describe('variants', () => {
    it('renders outlined variant', () => {
      render(<Tag variant="outlined">Outlined</Tag>);
      expect(getTag()).toHaveClass('eidotter-tag--outlined');
    });

    it('renders filled variant', () => {
      render(<Tag variant="filled">Filled</Tag>);
      expect(getTag()).toHaveClass('eidotter-tag--filled');
    });
  });

  describe('sizes', () => {
    it('supports sm size', () => {
      render(<Tag size="sm">SM</Tag>);
      expect(getTag()).toBeInTheDocument();
    });

    it('supports lg size', () => {
      render(<Tag size="lg">LG</Tag>);
      expect(getTag()).toBeInTheDocument();
    });

    it('supports backward-compatible small alias', () => {
      render(<Tag size="small">Small</Tag>);
      expect(getTag()).toBeInTheDocument();
    });
  });

  describe('interactive', () => {
    it('adds role=button when onClick provided', () => {
      render(<Tag onClick={() => {}}>Click</Tag>);
      expect(getTag()).toHaveAttribute('role', 'button');
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tag onClick={onClick}>Clickable</Tag>);
      await user.click(screen.getByText('Clickable'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tag onClick={onClick} disabled>Disabled</Tag>);
      await user.click(screen.getByText('Disabled'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('closeable', () => {
    it('renders close button when closeable', () => {
      render(<Tag closeable onClose={() => {}}>Closeable</Tag>);
      expect(document.querySelector('.eidotter-tag__close')).toBeInTheDocument();
    });

    it('close button has [x] text', () => {
      render(<Tag closeable onClose={() => {}}>Label</Tag>);
      expect(screen.getByText('[x]')).toBeInTheDocument();
    });

    it('keeps the close button out of the tab order when the body is interactive', () => {
      // The interactive body is focusable and offers Delete/Backspace dismissal,
      // so the close button is redundant in the tab order.
      render(<Tag closeable onClose={() => {}} onClick={() => {}}>Label</Tag>);
      expect(document.querySelector('.eidotter-tag__close')).toHaveAttribute('tabindex', '-1');
    });

    it('keeps the close button focusable when the tag is not interactive', () => {
      // The body isn't focusable, so the close button is the only keyboard
      // dismiss path and must stay in the tab order.
      render(<Tag closeable onClose={() => {}}>Label</Tag>);
      expect(document.querySelector('.eidotter-tag__close')).not.toHaveAttribute('tabindex', '-1');
    });

    it('adds closing class when close button is clicked', () => {
      render(<Tag closeable onClose={() => {}}>Closing</Tag>);
      fireEvent.click(screen.getByText('[x]'));
      expect(getTag()).toHaveClass('eidotter-tag--closing');
    });

    it('calls onClose after exit animation', () => {
      const onClose = jest.fn();
      render(<Tag closeable onClose={onClose}>Anim</Tag>);
      fireEvent.click(screen.getByText('[x]'));
      const tag = getTag();
      if (tag) {
        const event = new Event('animationend', { bubbles: true });
        Object.defineProperty(event, 'animationName', { value: 'tag-exit' });
        tag.dispatchEvent(event);
      }
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not propagate click from close button', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      const onClose = jest.fn();
      render(<Tag onClick={onClick} closeable onClose={onClose}>Tag</Tag>);
      await user.click(screen.getByText('[x]'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('sets aria-disabled', () => {
      render(<Tag disabled>Disabled</Tag>);
      expect(getTag()).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('selected', () => {
    it('applies selected styling', () => {
      render(<Tag selected>Selected</Tag>);
      expect(getTag()).toHaveClass('eidotter-tag--selected');
    });

    it('sets aria-pressed=true on interactive selected tag', () => {
      render(<Tag selected onClick={() => {}}>Selected</Tag>);
      expect(getTag()).toHaveAttribute('aria-pressed', 'true');
    });

    it('sets aria-pressed=false on interactive unselected tag', () => {
      render(<Tag onClick={() => {}}>Unselected</Tag>);
      expect(getTag()).toHaveAttribute('aria-pressed', 'false');
    });

    it('does not set aria-pressed on non-interactive tag', () => {
      render(<Tag selected>Selected static</Tag>);
      expect(getTag()).not.toHaveAttribute('aria-pressed');
    });

    it('does not set aria-selected (use aria-pressed instead — ARIA 1.2 disallows aria-selected on role=button)', () => {
      render(<Tag selected onClick={() => {}}>Selected</Tag>);
      expect(getTag()).not.toHaveAttribute('aria-selected');
    });
  });

  describe('custom color', () => {
    it('sets --tag-color CSS variable', () => {
      render(<Tag color="--color-cga-bright-cyan">Cyan</Tag>);
      const tag = getTag() as HTMLElement;
      expect(tag?.style.getPropertyValue('--tag-color')).toBe('var(--color-cga-bright-cyan)');
    });
  });

  describe('close button aria-label', () => {
    it('uses child text when children is a string', () => {
      render(<Tag closeable onClose={() => {}}>TypeScript</Tag>);
      expect(screen.getByLabelText('Remove TypeScript')).toBeInTheDocument();
    });

    it('uses "Remove tag" when children is not a string', () => {
      render(<Tag closeable onClose={() => {}}><span>JSX</span></Tag>);
      expect(screen.getByLabelText('Remove tag')).toBeInTheDocument();
    });
  });

  describe('keyboard', () => {
    it('activates with Enter when interactive', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Tag onClick={onClick}>Keyboard</Tag>);
      await user.tab();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('closes with Delete key when closeable', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(<Tag closeable onClose={onClose} onClick={() => {}}>Del</Tag>);
      await user.tab();
      await user.keyboard('{Delete}');
      // Should trigger close (closing animation)
      expect(getTag()).toHaveClass('eidotter-tag--closing');
    });

    it('a non-interactive closeable tag can be dismissed by keyboard via the close button', async () => {
      const user = userEvent.setup();
      render(<Tag closeable onClose={() => {}}>Standalone</Tag>);
      // Tab lands on the close button (the only focusable element), Enter fires it.
      await user.tab();
      expect(screen.getByLabelText('Remove Standalone')).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(getTag()).toHaveClass('eidotter-tag--closing');
    });
  });

  it('applies custom className', () => {
    render(<Tag className="custom">Custom</Tag>);
    expect(getTag()).toHaveClass('custom');
  });
});
