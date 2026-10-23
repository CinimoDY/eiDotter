import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { TextScramble } from './TextScramble';

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const GLYPHS = /[░▒▓█│┤┐└┴┬├─┼]/;

describe('TextScramble', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('renders with eidotter-text-scramble class', () => {
    render(<TextScramble>Hello</TextScramble>);
    expect(document.querySelector('.eidotter-text-scramble')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TextScramble className="custom">Hello</TextScramble>);
    expect(document.querySelector('.eidotter-text-scramble')).toHaveClass('custom');
  });

  it('adds scrambling class during animation', () => {
    render(<TextScramble>Hello</TextScramble>);
    expect(document.querySelector('.eidotter-text-scramble--scrambling')).toBeInTheDocument();
  });

  it('renders target text immediately with reduced motion', () => {
    mockMatchMedia(true);
    render(<TextScramble>Hello</TextScramble>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(document.querySelector('.eidotter-text-scramble--scrambling')).not.toBeInTheDocument();
  });

  describe('server render (DMNC-1609)', () => {
    it('ships the target text, not glyphs, in server HTML', () => {
      const html = renderToString(<TextScramble>Hello world</TextScramble>);
      expect(html).toContain('Hello world');
      expect(html).not.toMatch(GLYPHS);
      expect(html).not.toContain('eidotter-text-scramble--scrambling');
    });

    it('is deterministic: two server renders are byte-identical', () => {
      expect(renderToString(<TextScramble>Hello world</TextScramble>)).toBe(
        renderToString(<TextScramble>Hello world</TextScramble>),
      );
    });

    it('hydrates the server HTML without a mismatch, then scrambles', async () => {
      const html = renderToString(<TextScramble>Hello world</TextScramble>);
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
      const onRecoverableError = jest.fn();
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(async () => {
          root = hydrateRoot(container, <TextScramble>Hello world</TextScramble>, {
            onRecoverableError,
          });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(consoleError).not.toHaveBeenCalled();
        // After mount the effect starts the scramble
        expect(container.querySelector('.eidotter-text-scramble--scrambling')).toBeInTheDocument();
      } finally {
        consoleError.mockRestore();
        act(() => root?.unmount());
        container.remove();
      }
    });

    it('hydrates and stays final with reduced motion', async () => {
      mockMatchMedia(true);
      const html = renderToString(<TextScramble>Hello</TextScramble>);
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
      const onRecoverableError = jest.fn();
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(async () => {
          root = hydrateRoot(container, <TextScramble>Hello</TextScramble>, { onRecoverableError });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.textContent).toBe('Hello');
        expect(container.querySelector('.eidotter-text-scramble--scrambling')).not.toBeInTheDocument();
      } finally {
        act(() => root?.unmount());
        container.remove();
      }
    });
  });
});
