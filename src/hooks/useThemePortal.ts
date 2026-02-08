import { useRef, useEffect } from 'react';

/**
 * Creates a portal container on document.body that inherits the nearest
 * ancestor's `data-theme` attribute. A MutationObserver keeps it in sync
 * for dynamic theme changes.
 *
 * @param sourceRef - Ref to an element rendered in the normal React tree.
 *   Its nearest `[data-theme]` ancestor determines the portal's theme.
 * @returns The portal container element, or `null` during SSR.
 *
 * @internal Not exported from the public API.
 */
export function useThemePortal(
  sourceRef: React.RefObject<HTMLElement | null>
): HTMLDivElement | null {
  // SSR guard
  if (typeof document === 'undefined') return null;

  // Lazy-init so createPortal has a target during the first render.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const containerRef = useRef<HTMLDivElement | null>(null);
  if (!containerRef.current) {
    const el = document.createElement('div');
    el.setAttribute('data-eidotter-portal', '');
    containerRef.current = el;
  }

  // Mount / unmount the container on document.body.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const container = containerRef.current!;
    document.body.appendChild(container);
    return () => {
      container.remove();
    };
  }, []);

  // Sync data-theme from the nearest themed ancestor.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const source = sourceRef.current;
    const container = containerRef.current!;
    if (!source) return;

    const themedAncestor = source.closest('[data-theme]');

    function syncTheme() {
      const value = themedAncestor?.getAttribute('data-theme');
      if (value) {
        container.setAttribute('data-theme', value);
      } else {
        container.removeAttribute('data-theme');
      }
    }

    syncTheme();

    if (!themedAncestor) return;

    const observer = new MutationObserver(syncTheme);
    observer.observe(themedAncestor, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [sourceRef]);

  return containerRef.current;
}
