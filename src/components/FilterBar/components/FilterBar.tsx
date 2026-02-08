import React, { useState, useCallback, useRef } from 'react';
import './FilterBar.css';

export interface FilterBarItem {
  /** Unique identifier for the filter */
  id: string;
  /** Display label */
  label: string;
  /** Optional count displayed as badge */
  count?: number;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Optional CGA color token for active state (e.g. '--color-cga-bright-cyan') */
  color?: string;
}

export interface FilterBarProps {
  /** Array of filter items to display */
  items: FilterBarItem[];
  /** Currently active filter IDs (controlled mode) */
  activeIds?: string[];
  /** Default active filter IDs (uncontrolled mode) */
  defaultActiveIds?: string[];
  /**
   * Selection mode: 'multi' allows multiple selections, 'single' allows one at a time.
   * Default: 'multi'
   */
  mode?: 'multi' | 'single';
  /** Show an "All" toggle that selects/deselects everything. Default: false */
  showAll?: boolean;
  /** Label for the "All" toggle. Default: 'All' */
  allLabel?: string;
  /** The size of the filter bar */
  size?: 'small' | 'medium' | 'large';
  /**
   * Callback when selection changes.
   * Receives the new set of active IDs.
   */
  onChange?: (activeIds: string[]) => void;
  /** Optional CSS class name */
  className?: string;
  /** Accessible label for the filter bar */
  'aria-label'?: string;
}

/**
 * DOS-styled FilterBar component for multi-select or single-select content filtering
 *
 * Features:
 * - Multi-select (default) or single-select mode
 * - Optional count badges on each filter item
 * - Optional "All" toggle that selects/deselects everything
 * - Full keyboard navigation (Arrow keys, Space, Enter, Home, End)
 * - Controlled and uncontrolled modes
 * - DOS-authentic styling with CGA colors
 * - WCAG 2.1 AA compliant
 * - prefers-reduced-motion support
 * - prefers-contrast: high support
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  items,
  activeIds,
  defaultActiveIds = [],
  mode = 'multi',
  showAll = false,
  allLabel = 'All',
  size = 'medium',
  onChange,
  className = '',
  ...props
}) => {
  const [internalActiveIds, setInternalActiveIds] = useState<string[]>(defaultActiveIds);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const isControlled = activeIds !== undefined;
  const currentActiveIds = isControlled ? activeIds : internalActiveIds;

  // All non-disabled item IDs
  const enabledItemIds = items.filter(item => !item.disabled).map(item => item.id);

  // Whether "All" is logically active (no specific filters selected)
  const isAllActive = currentActiveIds.length === 0;

  const updateSelection = useCallback((newIds: string[]) => {
    if (!isControlled) {
      setInternalActiveIds(newIds);
    }
    onChange?.(newIds);
  }, [isControlled, onChange]);

  const handleItemToggle = useCallback((itemId: string) => {
    if (mode === 'single') {
      // In single mode, toggle the item or deselect it
      const newIds = currentActiveIds.includes(itemId) ? [] : [itemId];
      updateSelection(newIds);
    } else {
      // In multi mode, toggle the item on/off
      const newIds = currentActiveIds.includes(itemId)
        ? currentActiveIds.filter(id => id !== itemId)
        : [...currentActiveIds, itemId];
      updateSelection(newIds);
    }
  }, [mode, currentActiveIds, updateSelection]);

  const handleAllToggle = useCallback(() => {
    // Selecting "All" clears all individual selections
    updateSelection([]);
  }, [updateSelection]);

  // Build the list of all focusable button refs: [All?, ...items]
  const getButtons = useCallback((): HTMLButtonElement[] => {
    if (!toolbarRef.current) return [];
    return Array.from(
      toolbarRef.current.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])'
      )
    );
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const buttons = getButtons();
    const currentIndex = buttons.indexOf(event.target as HTMLButtonElement);
    if (currentIndex === -1) return;

    let newIndex: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = buttons.length - 1;
        break;
    }

    if (newIndex !== null) {
      buttons[newIndex].focus();
    }
  }, [getButtons]);

  // Determine the currently focused index for roving tabindex
  // The first active item gets tabIndex 0, or the All button, or the first enabled item
  const getFocusableId = (): string | null => {
    if (showAll && isAllActive) return '__all__';
    if (currentActiveIds.length > 0) return currentActiveIds[0];
    if (showAll) return '__all__';
    return enabledItemIds[0] || null;
  };

  const focusableId = getFocusableId();

  const containerClasses = [
    'filter-bar',
    `filter-bar--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={toolbarRef}
      className={containerClasses}
      role="toolbar"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {showAll && (
        <button
          type="button"
          className={[
            'filter-bar__item',
            'filter-bar__item--all',
            isAllActive && 'filter-bar__item--active'
          ].filter(Boolean).join(' ')}
          aria-pressed={isAllActive}
          tabIndex={focusableId === '__all__' ? 0 : -1}
          onClick={handleAllToggle}
        >
          <span className="filter-bar__label">{allLabel}</span>
        </button>
      )}
      {items.map((item) => {
        const isActive = currentActiveIds.includes(item.id);
        const itemClasses = [
          'filter-bar__item',
          isActive && 'filter-bar__item--active',
          item.disabled && 'filter-bar__item--disabled'
        ].filter(Boolean).join(' ');

        const style: React.CSSProperties | undefined = isActive && item.color
          ? { '--filter-bar-item-color': `var(${item.color})` } as React.CSSProperties
          : undefined;

        return (
          <button
            key={item.id}
            type="button"
            className={itemClasses}
            aria-pressed={isActive}
            tabIndex={focusableId === item.id ? 0 : -1}
            disabled={item.disabled}
            onClick={() => handleItemToggle(item.id)}
            style={style}
          >
            <span className="filter-bar__label">{item.label}</span>
            {item.count !== undefined && (
              <span className="filter-bar__count" aria-label={`${item.count} items`}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
