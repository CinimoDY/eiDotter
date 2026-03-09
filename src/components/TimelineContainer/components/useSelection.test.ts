import { renderHook, act } from '@testing-library/react';
import { useSelection } from './useSelection';

describe('useSelection', () => {
  describe('uncontrolled mode', () => {
    it('starts with null', () => {
      const { result } = renderHook(() => useSelection());
      expect(result.current.selectedEntryId).toBeNull();
    });

    it('starts with default', () => {
      const { result } = renderHook(() =>
        useSelection({ defaultSelectedEntryId: 'abc' })
      );
      expect(result.current.selectedEntryId).toBe('abc');
    });

    it('selects an entry', () => {
      const { result } = renderHook(() => useSelection());
      act(() => result.current.select('entry-1'));
      expect(result.current.selectedEntryId).toBe('entry-1');
    });

    it('deselects', () => {
      const { result } = renderHook(() =>
        useSelection({ defaultSelectedEntryId: 'abc' })
      );
      act(() => result.current.deselect());
      expect(result.current.selectedEntryId).toBeNull();
    });

    it('toggles selection', () => {
      const { result } = renderHook(() => useSelection());
      act(() => result.current.toggle('entry-1'));
      expect(result.current.selectedEntryId).toBe('entry-1');
      act(() => result.current.toggle('entry-1'));
      expect(result.current.selectedEntryId).toBeNull();
    });

    it('toggle switches to new entry', () => {
      const { result } = renderHook(() => useSelection());
      act(() => result.current.toggle('entry-1'));
      act(() => result.current.toggle('entry-2'));
      expect(result.current.selectedEntryId).toBe('entry-2');
    });
  });

  describe('controlled mode', () => {
    it('uses controlled value', () => {
      const { result } = renderHook(() =>
        useSelection({ selectedEntryId: 'abc' })
      );
      expect(result.current.selectedEntryId).toBe('abc');
    });

    it('calls onSelectEntry', () => {
      const onSelectEntry = jest.fn();
      const { result } = renderHook(() =>
        useSelection({ selectedEntryId: null, onSelectEntry })
      );
      act(() => result.current.select('entry-1'));
      expect(onSelectEntry).toHaveBeenCalledWith('entry-1');
    });
  });
});
