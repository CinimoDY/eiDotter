import React, { createRef } from 'react';
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
