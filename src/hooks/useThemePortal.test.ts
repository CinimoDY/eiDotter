import { renderHook, act } from '@testing-library/react';
import { useThemePortal } from './useThemePortal';

describe('useThemePortal', () => {
  let wrapper: HTMLDivElement;

  beforeEach(() => {
    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
  });

  afterEach(() => {
    wrapper.remove();
  });

  it('creates a container with data-eidotter-portal on document.body', () => {
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { unmount } = renderHook(() => useThemePortal(ref));

    const portal = document.querySelector('[data-eidotter-portal]');
    expect(portal).toBeInTheDocument();
    expect(portal?.parentElement).toBe(document.body);

    unmount();
  });

  it('copies data-theme from nearest themed ancestor', () => {
    wrapper.setAttribute('data-theme', 'cga-mode4-p1');
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { result, unmount } = renderHook(() => useThemePortal(ref));

    expect(result.current?.getAttribute('data-theme')).toBe('cga-mode4-p1');

    unmount();
  });

  it('has no data-theme when no themed ancestor exists', () => {
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { result, unmount } = renderHook(() => useThemePortal(ref));

    expect(result.current?.hasAttribute('data-theme')).toBe(false);

    unmount();
  });

  it('updates when ancestor data-theme changes', async () => {
    wrapper.setAttribute('data-theme', 'cga-amber');
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { result, unmount } = renderHook(() => useThemePortal(ref));

    expect(result.current?.getAttribute('data-theme')).toBe('cga-amber');

    // Mutate the ancestor theme
    await act(async () => {
      wrapper.setAttribute('data-theme', 'cga-mode5');
      // MutationObserver fires asynchronously; flush with a microtask
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(result.current?.getAttribute('data-theme')).toBe('cga-mode5');

    unmount();
  });

  it('removes the container from document.body on unmount', () => {
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { unmount } = renderHook(() => useThemePortal(ref));

    expect(document.querySelector('[data-eidotter-portal]')).toBeInTheDocument();

    unmount();

    expect(document.querySelector('[data-eidotter-portal]')).not.toBeInTheDocument();
  });

  it('has the data-eidotter-portal marker attribute', () => {
    const source = document.createElement('span');
    wrapper.appendChild(source);
    const ref = { current: source };

    const { result, unmount } = renderHook(() => useThemePortal(ref));

    expect(result.current?.hasAttribute('data-eidotter-portal')).toBe(true);

    unmount();
  });
});
