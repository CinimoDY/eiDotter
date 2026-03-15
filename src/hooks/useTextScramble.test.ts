import { renderHook, act } from '@testing-library/react';
import { useTextScramble } from './useTextScramble';

// Mock matchMedia for reduced-motion tests
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

describe('useTextScramble', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockMatchMedia(false);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns target text immediately when disabled', () => {
    const { result } = renderHook(() =>
      useTextScramble('Hello', { enabled: false })
    );
    expect(result.current.text).toBe('Hello');
    expect(result.current.isScrambling).toBe(false);
  });

  it('returns target text immediately with reduced motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTextScramble('Hello'));
    expect(result.current.text).toBe('Hello');
    expect(result.current.isScrambling).toBe(false);
  });

  it('starts scrambling when enabled', () => {
    const { result } = renderHook(() => useTextScramble('Hello'));
    expect(result.current.isScrambling).toBe(true);
  });

  it('eventually resolves to target text', async () => {
    const { result } = renderHook(() =>
      useTextScramble('Hi', { speed: 10 })
    );

    // Run through enough frames to resolve all characters
    // 2 chars * 4 cycles * 10ms = 80ms worth of frames
    for (let i = 0; i < 20; i++) {
      await act(async () => {
        jest.advanceTimersByTime(10);
      });
    }

    expect(result.current.text).toBe('Hi');
    expect(result.current.isScrambling).toBe(false);
  });
});
