import { renderHook, act } from '@testing-library/react';
import { useDrillDown } from './useDrillDown';

describe('useDrillDown', () => {
  describe('uncontrolled mode (drill-down enabled)', () => {
    it('starts with empty breadcrumbs and null period', () => {
      const { result } = renderHook(() => useDrillDown());
      expect(result.current.breadcrumbs).toEqual([]);
      expect(result.current.currentPeriod).toBeNull();
      expect(result.current.isDrillDownEnabled).toBe(true);
    });

    it('starts at default zoom level', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));
      expect(result.current.zoomLevel).toBe('year');
    });

    it('defaults to month zoom', () => {
      const { result } = renderHook(() => useDrillDown());
      expect(result.current.zoomLevel).toBe('month');
    });

    it('drillDown pushes period to stack and zooms in', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));

      expect(result.current.breadcrumbs).toEqual([
        { periodStart: '2024-01-01T00:00:00.000Z', label: '2024' },
      ]);
      expect(result.current.currentPeriod).toBe('2024-01-01T00:00:00.000Z');
      expect(result.current.zoomLevel).toBe('month');
    });

    it('drillDown supports multiple levels', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));
      act(() => result.current.drillDown('2024-03-01T00:00:00.000Z', 'March 2024'));

      expect(result.current.breadcrumbs).toHaveLength(2);
      expect(result.current.breadcrumbs[0].label).toBe('2024');
      expect(result.current.breadcrumbs[1].label).toBe('March 2024');
      expect(result.current.currentPeriod).toBe('2024-03-01T00:00:00.000Z');
      expect(result.current.zoomLevel).toBe('day');
    });

    it('drillUp pops period and zooms out', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));
      act(() => result.current.drillDown('2024-03-01T00:00:00.000Z', 'March 2024'));
      act(() => result.current.drillUp());

      expect(result.current.breadcrumbs).toHaveLength(1);
      expect(result.current.breadcrumbs[0].label).toBe('2024');
      expect(result.current.currentPeriod).toBe('2024-01-01T00:00:00.000Z');
      expect(result.current.zoomLevel).toBe('month');
    });

    it('drillUp when stack empty is a no-op', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'month' }));

      act(() => result.current.drillUp());

      expect(result.current.breadcrumbs).toEqual([]);
      expect(result.current.zoomLevel).toBe('month');
    });

    it('drillDown at max zoom (hour) is a no-op', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'hour' }));

      expect(result.current.canZoomIn).toBe(false);
      act(() => result.current.drillDown('2024-03-15T10:00:00.000Z', '10am'));

      expect(result.current.breadcrumbs).toEqual([]);
      expect(result.current.zoomLevel).toBe('hour');
    });

    it('reset clears stack and goes to year level', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));
      act(() => result.current.drillDown('2024-03-01T00:00:00.000Z', 'March 2024'));
      act(() => result.current.drillDown('2024-03-15T00:00:00.000Z', 'Mar 15'));
      expect(result.current.zoomLevel).toBe('hour');

      act(() => result.current.reset());

      expect(result.current.breadcrumbs).toEqual([]);
      expect(result.current.currentPeriod).toBeNull();
      expect(result.current.zoomLevel).toBe('year');
    });

    it('reset goes to year even when defaultZoomLevel is not year', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'month' }));

      act(() => result.current.drillDown('2024-03-01T00:00:00.000Z', 'March 2024'));
      expect(result.current.zoomLevel).toBe('day');

      act(() => result.current.reset());

      expect(result.current.zoomLevel).toBe('year');
      expect(result.current.breadcrumbs).toEqual([]);
    });

    it('breadcrumbs returns full stack in order', () => {
      const { result } = renderHook(() => useDrillDown({ defaultZoomLevel: 'year' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));
      act(() => result.current.drillDown('2024-03-01T00:00:00.000Z', 'March 2024'));
      act(() => result.current.drillDown('2024-03-15T00:00:00.000Z', 'Mar 15'));

      expect(result.current.breadcrumbs).toEqual([
        { periodStart: '2024-01-01T00:00:00.000Z', label: '2024' },
        { periodStart: '2024-03-01T00:00:00.000Z', label: 'March 2024' },
        { periodStart: '2024-03-15T00:00:00.000Z', label: 'Mar 15' },
      ]);
    });

    it('calls onZoomChange when drilling down', () => {
      const onZoomChange = jest.fn();
      const { result } = renderHook(() =>
        useDrillDown({ defaultZoomLevel: 'year', onZoomChange })
      );

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));

      expect(onZoomChange).toHaveBeenCalledWith('month');
    });

    it('calls onZoomChange when drilling up', () => {
      const onZoomChange = jest.fn();
      const { result } = renderHook(() =>
        useDrillDown({ defaultZoomLevel: 'year', onZoomChange })
      );

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));
      onZoomChange.mockClear();
      act(() => result.current.drillUp());

      expect(onZoomChange).toHaveBeenCalledWith('year');
    });
  });

  describe('controlled mode (drill-down disabled)', () => {
    it('disables drill-down when zoomLevel is controlled', () => {
      const { result } = renderHook(() => useDrillDown({ zoomLevel: 'month' }));
      expect(result.current.isDrillDownEnabled).toBe(false);
    });

    it('uses controlled zoom level', () => {
      const { result } = renderHook(() => useDrillDown({ zoomLevel: 'day' }));
      expect(result.current.zoomLevel).toBe('day');
    });

    it('drillDown is a no-op in controlled mode', () => {
      const { result } = renderHook(() => useDrillDown({ zoomLevel: 'month' }));

      act(() => result.current.drillDown('2024-01-01T00:00:00.000Z', '2024'));

      expect(result.current.breadcrumbs).toEqual([]);
      expect(result.current.zoomLevel).toBe('month');
    });

    it('drillUp is a no-op in controlled mode', () => {
      const { result } = renderHook(() => useDrillDown({ zoomLevel: 'month' }));

      act(() => result.current.drillUp());

      expect(result.current.breadcrumbs).toEqual([]);
    });

    it('reset is a no-op in controlled mode', () => {
      const { result } = renderHook(() => useDrillDown({ zoomLevel: 'day' }));

      act(() => result.current.reset());

      expect(result.current.zoomLevel).toBe('day');
      expect(result.current.breadcrumbs).toEqual([]);
    });
  });
});
