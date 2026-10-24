import React, { createRef } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { renderToString } from 'react-dom/server';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders a button named by `label`', () => {
    render(<IconButton icon="Close" label="Close menu" />);
    const btn = screen.getByRole('button', { name: 'Close menu' });
    expect(btn).toHaveAttribute('aria-label', 'Close menu');
  });

  it('renders the glyph as an svg hidden from assistive tech, with no text', () => {
    render(<IconButton icon="Close" label="Close" />);
    const btn = screen.getByRole('button', { name: 'Close' });
    expect(btn.querySelector('svg')).toBeInTheDocument();
    expect(btn.querySelector('.eidotter-icon-button__glyph')).toHaveAttribute('aria-hidden', 'true');
    expect(btn.textContent?.trim()).toBe('');
  });

  it('renders the inner Icon as decorative: aria-hidden, no role, no second name', () => {
    render(<IconButton icon="Close" label="Close dialog" />);
    const btn = screen.getByRole('button', { name: 'Close dialog' });
    const glyph = btn.querySelector('.icon') as HTMLElement;
    expect(glyph).toHaveAttribute('aria-hidden', 'true');
    expect(glyph).not.toHaveAttribute('role');
    expect(glyph).not.toHaveAttribute('aria-label');
    expect(btn.querySelectorAll('[aria-label]')).toHaveLength(0);
    expect(btn.querySelector('[role="img"]')).toBeNull();
    expect(screen.queryByRole('img', { hidden: true })).toBeNull();
  });

  it.each([
    ['Close'], ['Cancel'], ['Fullscreen'], ['Chevron Left'], ['Chevron Right'],
  ] as const)('renders the %s glyph', (icon) => {
    render(<IconButton icon={icon} label={icon} />);
    expect(screen.getByRole('button', { name: icon }).querySelector('svg')).toBeInTheDocument();
  });

  it('defaults to md outline: block class only', () => {
    render(<IconButton icon="Close" label="Close" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('eidotter-icon-button');
    expect(btn).not.toHaveClass('eidotter-icon-button--window');
    expect(btn).not.toHaveClass('eidotter-icon-button--bare');
  });

  it('adds the window and bare modifiers', () => {
    render(<IconButton icon="Cancel" label="Minimise" size="window" variant="bare" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('eidotter-icon-button--window');
    expect(btn).toHaveClass('eidotter-icon-button--bare');
  });

  it('defaults to the accent tone and adds no inherit or touch modifier', () => {
    render(<IconButton icon="Close" label="Close" />);
    const btn = screen.getByRole('button');
    expect(btn).not.toHaveClass('eidotter-icon-button--touch');
    expect(btn).not.toHaveClass('eidotter-icon-button--inherit');
  });

  it('adds the touch size and inherit tone modifiers (DMNC-1612)', () => {
    render(<IconButton icon="Close" label="Close" size="touch" tone="inherit" variant="bare" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('eidotter-icon-button', 'eidotter-icon-button--touch', 'eidotter-icon-button--inherit', 'eidotter-icon-button--bare');
    expect(btn).not.toHaveClass('eidotter-icon-button--window');
  });

  it('server-renders the touch and inherit modifiers (DMNC-1612)', () => {
    const html = renderToString(<IconButton icon="Chevron Right" label="Next" size="touch" tone="inherit" />);
    expect(html).toMatch(/class="[^"]*eidotter-icon-button--touch[^"]*eidotter-icon-button--inherit/);
    expect(html).toContain('aria-label="Next"');
  });

  describe('stylesheet contract (DMNC-1612)', () => {
    const css = readFileSync(join(__dirname, 'IconButton.css'), 'utf8');
    const rule = (sel: string) => {
      const m = css.match(new RegExp(sel.replace(/[.[\]]/g, '\\$&') + '\\s*\\{([^}]*)\\}'));
      return m ? m[1] : '';
    };

    it('touch is a 44px target with a 24px glyph; md and window are unchanged', () => {
      expect(rule('.eidotter-icon-button--touch')).toMatch(/width:\s*44px;\s*height:\s*44px/);
      expect(rule('.eidotter-icon-button--touch .icon__svg')).toMatch(/width:\s*24px;\s*height:\s*24px/);
      expect(rule('.eidotter-icon-button')).toMatch(/width:\s*36px;\s*height:\s*36px/);
      expect(rule('.eidotter-icon-button--window')).toMatch(/width:\s*28px;\s*height:\s*28px/);
    });

    it('inherit takes currentColor for glyph, outline, hover tint and focus ring', () => {
      expect(rule('.eidotter-icon-button--inherit')).toMatch(/color:\s*inherit/);
      expect(rule('.eidotter-icon-button--inherit')).toMatch(/border-color:\s*currentColor/);
      expect(rule('.eidotter-icon-button--inherit.eidotter-icon-button--bare')).toMatch(/border-color:\s*transparent/);
      const hover = css.match(/\.eidotter-icon-button--inherit\[data-hovered\],\s*\.eidotter-icon-button--inherit\[data-pressed\]\s*\{([^}]*)\}/);
      expect(hover?.[1]).toMatch(/background-color:\s*color-mix\(in srgb, currentColor/);
      expect(hover?.[1]).not.toMatch(/background-brand|text-on-brand/);
      expect(rule('.eidotter-icon-button--inherit[data-focus-visible]')).toMatch(/outline-color:\s*currentColor/);
      // Declared after the house rules they override (same specificity).
      expect(css.indexOf('.eidotter-icon-button--inherit {')).toBeGreaterThan(css.indexOf('.eidotter-icon-button {'));
      expect(css.indexOf('.eidotter-icon-button--inherit[data-hovered]')).toBeGreaterThan(css.indexOf('.eidotter-icon-button[data-hovered]'));
      expect(css.indexOf('.eidotter-icon-button--inherit[data-focus-visible]')).toBeGreaterThan(css.indexOf('.eidotter-icon-button[data-focus-visible]'));
    });
  });

  it('merges className', () => {
    render(<IconButton icon="Close" label="Close" className="placement" />);
    expect(screen.getByRole('button')).toHaveClass('placement', 'eidotter-icon-button');
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    render(<IconButton icon="Close" label="Close" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled and does not fire onPress when isDisabled', () => {
    const onPress = jest.fn();
    render(<IconButton icon="Chevron Left" label="Previous" isDisabled onPress={onPress} />);
    const btn = screen.getByRole('button', { name: 'Previous' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('data-disabled');
    fireEvent.click(btn);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('can be excluded from the tab order', () => {
    render(<IconButton icon="Close" label="Remove" excludeFromTabOrder />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('forwards the ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon="Close" label="Close" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
