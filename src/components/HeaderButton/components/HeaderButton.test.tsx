import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join } from 'path';
import { HeaderButton } from './HeaderButton';
import { DisplayMenu } from '../../DisplayMenu';

const css = readFileSync(join(__dirname, 'HeaderButton.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const Glyph = () => <svg data-testid="glyph" viewBox="0 0 24 24" />;

describe('HeaderButton', () => {
  it('uses string text as its accessible name', () => {
    render(<HeaderButton>Search</HeaderButton>);
    expect(screen.getByRole('button', { name: 'Search' })).toHaveClass('eidotter-header-button', 'eidotter-header-button--label');
  });

  it('a ⌘K launcher takes an aria-label; the visible keys are hidden from AT', () => {
    render(<HeaderButton aria-label="Open command palette">⌘K</HeaderButton>);
    const button = screen.getByRole('button', { name: 'Open command palette' });
    expect(button.querySelector('.eidotter-header-button__label')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the glyph aria-hidden, and the chevron when asked', () => {
    render(<HeaderButton icon={<Glyph />} chevron>Display</HeaderButton>);
    const button = screen.getByRole('button', { name: 'Display' });
    expect(button.querySelector('.eidotter-header-button__icon')).toHaveAttribute('aria-hidden', 'true');
    expect(button.querySelector('.eidotter-header-button__chevron')).toBeInTheDocument();
  });

  it('marks a text-only button so responsive mode keeps its text', () => {
    render(<HeaderButton labelDisplay="responsive">⌘K</HeaderButton>);
    expect(screen.getByRole('button')).toHaveClass('eidotter-header-button--text-only', 'eidotter-header-button--responsive');
  });

  it('fires onPress', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    render(<HeaderButton onPress={onPress}>Search</HeaderButton>);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('DisplayMenu\'s trigger is a HeaderButton (same shape as every header control)', () => {
    render(<DisplayMenu items={[{ id: 'a', label: 'LIGHT', checked: false, onChange: () => {} }]} />);
    const trigger = screen.getByRole('button', { name: 'Display' });
    expect(trigger).toHaveClass('eidotter-header-button', 'eidotter-display-menu');
  });

  it('CSS: 36px tall, 32px on phones, one body size, no hex colours', () => {
    expect(css).toMatch(/\.eidotter-header-button\s*\{[^}]*height:\s*36px/);
    expect(css).toMatch(/@media \(max-width: 479px\)\s*\{\s*\.eidotter-header-button\s*\{[^}]*height:\s*32px/);
    expect(css).toMatch(/font-size:\s*var\(--typography-font-size-text-base/);
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
