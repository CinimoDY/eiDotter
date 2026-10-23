import { cn } from './cn';
import { DOS_FONT_SIZES } from './dosFontSizes';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const preset = require('../../tailwind.preset.cjs');

describe('cn', () => {
  it('keeps a dos colour and a dos text size together', () => {
    expect(cn('text-dos-text-brand', 'text-dos-text-sm')).toBe('text-dos-text-brand text-dos-text-sm');
  });

  it('keeps a dos colour and a dos display size together', () => {
    expect(cn('text-dos-text-accent', 'text-dos-display-md')).toBe('text-dos-text-accent text-dos-display-md');
  });

  it('still resolves size against size (last wins)', () => {
    expect(cn('text-dos-text-sm', 'text-dos-display-xl')).toBe('text-dos-display-xl');
    expect(cn('text-dos-text-base', 'text-dos-text-lg')).toBe('text-dos-text-lg');
  });

  it('still resolves colour against colour (last wins)', () => {
    expect(cn('text-dos-text-brand text-dos-text-sm', 'text-dos-text-muted')).toBe(
      'text-dos-text-sm text-dos-text-muted'
    );
  });

  it('keeps an earlier leading-* class (Button/Badge pair a dos size with leading-none)', () => {
    expect(cn('leading-none', 'text-dos-text-md')).toBe('leading-none text-dos-text-md');
  });

  it('lets a dos size and a stock size replace each other', () => {
    expect(cn('text-dos-text-md', 'text-lg')).toBe('text-lg');
    expect(cn('text-lg', 'text-dos-text-md')).toBe('text-dos-text-md');
  });

  it('keeps the colour for every generated dos font size', () => {
    for (const size of DOS_FONT_SIZES) {
      expect(cn('text-dos-text-primary', `text-${size}`)).toBe(`text-dos-text-primary text-${size}`);
    }
  });

  it('registers exactly the dos font sizes the preset defines (no drift)', () => {
    const presetSizes = Object.keys(preset.theme.extend.fontSize).filter((k) => k.startsWith('dos-'));
    expect([...DOS_FONT_SIZES].sort()).toEqual(presetSizes.sort());
  });

  it('drops falsy inputs', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });
});
