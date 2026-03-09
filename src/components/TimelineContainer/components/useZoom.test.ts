import { renderHook, act } from '@testing-library/react';
import { useZoom } from './useZoom';
import type { ZoomLevel } from './types';

describe('useZoom', () => {
  describe('uncontrolled mode', () => {
    it('starts at default zoom level', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'day' }));
      expect(result.current.zoomLevel).toBe('day');
    });

    it('defaults to month', () => {
      const { result } = renderHook(() => useZoom());
      expect(result.current.zoomLevel).toBe('month');
    });

    it('zooms in', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'month' }));
      act(() => result.current.zoomIn());
      expect(result.current.zoomLevel).toBe('day');
    });

    it('zooms out', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'month' }));
      act(() => result.current.zoomOut());
      expect(result.current.zoomLevel).toBe('year');
    });

    it('cannot zoom in past hour', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'hour' }));
      expect(result.current.canZoomIn).toBe(false);
      act(() => result.current.zoomIn());
      expect(result.current.zoomLevel).toBe('hour');
    });

    it('cannot zoom out past year', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'year' }));
      expect(result.current.canZoomOut).toBe(false);
      act(() => result.current.zoomOut());
      expect(result.current.zoomLevel).toBe('year');
    });

    it('resets to default', () => {
      const { result } = renderHook(() => useZoom({ defaultZoomLevel: 'month' }));
      act(() => result.current.zoomIn());
      act(() => result.current.zoomIn());
      expect(result.current.zoomLevel).toBe('hour');
      act(() => result.current.reset());
      expect(result.current.zoomLevel).toBe('month');
    });
  });

  describe('controlled mode', () => {
    it('uses controlled value', () => {
      const { result } = renderHook(() => useZoom({ zoomLevel: 'day' }));
      expect(result.current.zoomLevel).toBe('day');
    });

    it('calls onZoomChange when zooming', () => {
      const onZoomChange = jest.fn();
      const { result } = renderHook(() =>
        useZoom({ zoomLevel: 'month', onZoomChange })
      );
      act(() => result.current.zoomIn());
      expect(onZoomChange).toHaveBeenCalledWith('day');
    });

    it('does not update internal state in controlled mode', () => {
      const { result, rerender } = renderHook(
        ({ level }: { level: ZoomLevel }) => useZoom({ zoomLevel: level }),
        { initialProps: { level: 'month' as ZoomLevel } }
      );
      act(() => result.current.zoomIn());
      // Still month because controlled
      expect(result.current.zoomLevel).toBe('month');
      // Parent would update the prop
      rerender({ level: 'day' });
      expect(result.current.zoomLevel).toBe('day');
    });
  });
});
