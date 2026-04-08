import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
