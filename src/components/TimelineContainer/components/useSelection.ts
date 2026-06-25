'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseSelectionOptions {
  selectedEntryId?: string | null;
  defaultSelectedEntryId?: string | null;
  onSelectEntry?: (entryId: string | null) => void;
}

export interface UseSelectionReturn {
  selectedEntryId: string | null;
  select: (entryId: string) => void;
  deselect: () => void;
  toggle: (entryId: string) => void;
}

/**
 * Manages entry selection with controlled/uncontrolled pattern.
 */
export function useSelection({
  selectedEntryId: controlledId,
  defaultSelectedEntryId = null,
  onSelectEntry,
}: UseSelectionOptions = {}): UseSelectionReturn {
  const [internalId, setInternalId] = useState<string | null>(defaultSelectedEntryId);

  // Inline narrowing — undefined means uncontrolled, null means controlled-with-nothing-selected
  const isControlled = controlledId !== undefined;
  const currentId = controlledId !== undefined ? controlledId : internalId;

  // Refs for stable toggle callback
  const currentIdRef = useRef(currentId);
  const isControlledRef = useRef(isControlled);
  const onSelectEntryRef = useRef(onSelectEntry);

  useEffect(() => {
    currentIdRef.current = currentId;
    isControlledRef.current = isControlled;
    onSelectEntryRef.current = onSelectEntry;
  });

  const updateSelection = useCallback((id: string | null) => {
    if (!isControlledRef.current) {
      setInternalId(id);
    }
    onSelectEntryRef.current?.(id);
  }, []);

  const select = useCallback((entryId: string) => {
    updateSelection(entryId);
  }, [updateSelection]);

  const deselect = useCallback(() => {
    updateSelection(null);
  }, [updateSelection]);

  // Stable toggle — uses ref to avoid closing over currentId
  const toggle = useCallback((entryId: string) => {
    if (isControlledRef.current) {
      onSelectEntryRef.current?.(currentIdRef.current === entryId ? null : entryId);
    } else {
      setInternalId(prev => {
        const newId = prev === entryId ? null : entryId;
        onSelectEntryRef.current?.(newId);
        return newId;
      });
    }
  }, []);

  return {
    selectedEntryId: currentId,
    select,
    deselect,
    toggle,
  };
}
