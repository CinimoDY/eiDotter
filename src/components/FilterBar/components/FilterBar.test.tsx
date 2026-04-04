import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from './FilterBar';

const defaultItems = [
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2' },
  { id: 'item3', label: 'Item 3' },
];

const itemsWithCounts = [
  { id: 'bugs', label: 'Bugs', count: 12 },
  { id: 'features', label: 'Features', count: 5 },
  { id: 'docs', label: 'Docs', count: 3 },
];

const itemsWithDisabled = [
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2', disabled: true },
  { id: 'item3', label: 'Item 3' },
];

const itemsWithColors = [
  { id: 'project', label: 'Projects', color: '--color-cga-bright-cyan' },
  { id: 'area', label: 'Areas', color: '--color-cga-bright-green' },
];

describe('FilterBar', () => {
  describe('rendering', () => {
    it('renders all items', () => {
      render(<FilterBar items={defaultItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders with toolbar role', () => {
      render(<FilterBar items={defaultItems} />);
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('renders items as buttons', () => {
      render(<FilterBar items={defaultItems} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('applies custom className', () => {
      render(<FilterBar items={defaultItems} className="custom-class" />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('custom-class');
    });

    it('supports aria-label', () => {
      render(<FilterBar items={defaultItems} aria-label="Filter items" />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'Filter items');
    });

    it('renders count badges when provided', () => {
      render(<FilterBar items={itemsWithCounts} />);
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('does not render count badge when count is not provided', () => {
      render(<FilterBar items={defaultItems} />);
      const countBadges = document.querySelectorAll('.eidotter-filter-bar__count');
      expect(countBadges).toHaveLength(0);
    });

    it('renders count badge with aria-label', () => {
      render(<FilterBar items={itemsWithCounts} />);
      expect(screen.getByLabelText('12 items')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<FilterBar items={defaultItems} size={size} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass(`eidotter-filter-bar--${size}`);
    });

    it.each(['small', 'medium', 'large'] as const)('supports backward-compatible %s alias', (alias) => {
      render(<FilterBar items={defaultItems} size={alias} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('eidotter-filter-bar');
    });

    it('defaults to md size', () => {
      render(<FilterBar items={defaultItems} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('eidotter-filter-bar--md');
    });
  });

  describe('multi-select mode (default)', () => {
    it('starts with no items selected by default', () => {
      render(<FilterBar items={defaultItems} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed', 'false');
      });
    });

    it('selects defaultActiveIds on mount', () => {
      render(<FilterBar items={defaultItems} defaultActiveIds={['item1', 'item3']} />);
      expect(screen.getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');
      expect(screen.getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles item on click', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'true');
    });

    it('allows multiple items to be selected', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      const item2 = screen.getByText('Item 2').closest('button')!;
      fireEvent.click(item1);
      fireEvent.click(item2);
      expect(item1).toHaveAttribute('aria-pressed', 'true');
      expect(item2).toHaveAttribute('aria-pressed', 'true');
    });

    it('deselects item on second click', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'true');
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onChange with new active IDs', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} onChange={handleChange} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(handleChange).toHaveBeenCalledWith(['item1']);
    });

    it('calls onChange with multiple IDs when selecting multiple', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} onChange={handleChange} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      const item3 = screen.getByText('Item 3').closest('button')!;
      fireEvent.click(item1);
      fireEvent.click(item3);
      expect(handleChange).toHaveBeenLastCalledWith(['item1', 'item3']);
    });

    it('calls onChange with empty array when deselecting last item', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} defaultActiveIds={['item1']} onChange={handleChange} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('single-select mode', () => {
    it('selects a single item on click', () => {
      render(<FilterBar items={defaultItems} mode="single" />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'true');
    });

    it('switches to new item when clicking another', () => {
      render(<FilterBar items={defaultItems} mode="single" />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      const item2 = screen.getByText('Item 2').closest('button')!;
      fireEvent.click(item1);
      fireEvent.click(item2);
      expect(item1).toHaveAttribute('aria-pressed', 'false');
      expect(item2).toHaveAttribute('aria-pressed', 'true');
    });

    it('deselects item when clicking same item again', () => {
      render(<FilterBar items={defaultItems} mode="single" />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'true');
      fireEvent.click(item1);
      expect(item1).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onChange with single ID array', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} mode="single" onChange={handleChange} />);
      fireEvent.click(screen.getByText('Item 2').closest('button')!);
      expect(handleChange).toHaveBeenCalledWith(['item2']);
    });

    it('calls onChange with empty array when deselecting', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} mode="single" defaultActiveIds={['item1']} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Item 1').closest('button')!);
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('controlled mode', () => {
    it('uses activeIds prop for selection', () => {
      render(<FilterBar items={defaultItems} activeIds={['item2']} />);
      expect(screen.getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'false');
      expect(screen.getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('does not change internal state when controlled', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} activeIds={['item1']} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Item 2').closest('button')!);
      // Item 1 should still be the only active one (controlled)
      expect(screen.getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onChange when item is clicked in controlled mode', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={defaultItems} activeIds={['item1']} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Item 2').closest('button')!);
      expect(handleChange).toHaveBeenCalledWith(['item1', 'item2']);
    });

    it('handles controlled mode with empty activeIds', () => {
      render(<FilterBar items={defaultItems} activeIds={[]} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed', 'false');
      });
    });
  });

  describe('"All" toggle', () => {
    it('renders "All" button when showAll is true', () => {
      render(<FilterBar items={defaultItems} showAll />);
      expect(screen.getByText('All')).toBeInTheDocument();
    });

    it('does not render "All" button by default', () => {
      render(<FilterBar items={defaultItems} />);
      expect(screen.queryByText('All')).not.toBeInTheDocument();
    });

    it('uses custom allLabel', () => {
      render(<FilterBar items={defaultItems} showAll allLabel="Show All" />);
      expect(screen.getByText('Show All')).toBeInTheDocument();
    });

    it('"All" is active when no items are selected', () => {
      render(<FilterBar items={defaultItems} showAll />);
      const allButton = screen.getByText('All').closest('button')!;
      expect(allButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('"All" becomes inactive when an item is selected', () => {
      render(<FilterBar items={defaultItems} showAll />);
      const allButton = screen.getByText('All').closest('button')!;
      const item1 = screen.getByText('Item 1').closest('button')!;
      fireEvent.click(item1);
      expect(allButton).toHaveAttribute('aria-pressed', 'false');
      expect(item1).toHaveAttribute('aria-pressed', 'true');
    });

    it('clicking "All" clears all selections', () => {
      const handleChange = jest.fn();
      render(
        <FilterBar
          items={defaultItems}
          showAll
          defaultActiveIds={['item1', 'item2']}
          onChange={handleChange}
        />
      );
      const allButton = screen.getByText('All').closest('button')!;
      fireEvent.click(allButton);
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('"All" has correct class', () => {
      render(<FilterBar items={defaultItems} showAll />);
      const allButton = screen.getByText('All').closest('button')!;
      expect(allButton).toHaveClass('eidotter-filter-bar__item--all');
    });
  });

  describe('disabled items', () => {
    it('renders disabled item with disabled attribute', () => {
      render(<FilterBar items={itemsWithDisabled} />);
      const disabledButton = screen.getByText('Item 2').closest('button')!;
      expect(disabledButton).toBeDisabled();
    });

    it('applies disabled class to disabled item', () => {
      render(<FilterBar items={itemsWithDisabled} />);
      const disabledButton = screen.getByText('Item 2').closest('button')!;
      expect(disabledButton).toHaveClass('eidotter-filter-bar__item--disabled');
    });

    it('does not toggle disabled item on click', () => {
      const handleChange = jest.fn();
      render(<FilterBar items={itemsWithDisabled} onChange={handleChange} />);
      const disabledButton = screen.getByText('Item 2').closest('button')!;
      fireEvent.click(disabledButton);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('custom colors', () => {
    it('applies custom color style when item is active', () => {
      render(<FilterBar items={itemsWithColors} defaultActiveIds={['project']} />);
      const activeButton = screen.getByText('Projects').closest('button')!;
      expect(activeButton.style.getPropertyValue('--filter-bar-item-color')).toBe('var(--color-cga-bright-cyan)');
    });

    it('does not apply custom color style when item is inactive', () => {
      render(<FilterBar items={itemsWithColors} />);
      const inactiveButton = screen.getByText('Projects').closest('button')!;
      expect(inactiveButton.style.getPropertyValue('--filter-bar-item-color')).toBe('');
    });
  });

  describe('keyboard navigation', () => {
    it('navigates to next item with ArrowRight', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'ArrowRight' });
      const item2 = screen.getByText('Item 2').closest('button')!;
      expect(document.activeElement).toBe(item2);
    });

    it('navigates to previous item with ArrowLeft', () => {
      render(<FilterBar items={defaultItems} />);
      const item2 = screen.getByText('Item 2').closest('button')!;
      item2.focus();
      fireEvent.keyDown(item2, { key: 'ArrowLeft' });
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(document.activeElement).toBe(item1);
    });

    it('wraps around when navigating past last item', () => {
      render(<FilterBar items={defaultItems} />);
      const item3 = screen.getByText('Item 3').closest('button')!;
      item3.focus();
      fireEvent.keyDown(item3, { key: 'ArrowRight' });
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(document.activeElement).toBe(item1);
    });

    it('wraps around when navigating before first item', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'ArrowLeft' });
      const item3 = screen.getByText('Item 3').closest('button')!;
      expect(document.activeElement).toBe(item3);
    });

    it('navigates to first item with Home', () => {
      render(<FilterBar items={defaultItems} />);
      const item3 = screen.getByText('Item 3').closest('button')!;
      item3.focus();
      fireEvent.keyDown(item3, { key: 'Home' });
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(document.activeElement).toBe(item1);
    });

    it('navigates to last item with End', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'End' });
      const item3 = screen.getByText('Item 3').closest('button')!;
      expect(document.activeElement).toBe(item3);
    });

    it('navigates with ArrowDown (same as ArrowRight)', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'ArrowDown' });
      const item2 = screen.getByText('Item 2').closest('button')!;
      expect(document.activeElement).toBe(item2);
    });

    it('navigates with ArrowUp (same as ArrowLeft)', () => {
      render(<FilterBar items={defaultItems} />);
      const item2 = screen.getByText('Item 2').closest('button')!;
      item2.focus();
      fireEvent.keyDown(item2, { key: 'ArrowUp' });
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(document.activeElement).toBe(item1);
    });

    it('skips disabled items in navigation', () => {
      render(<FilterBar items={itemsWithDisabled} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'ArrowRight' });
      // Should skip disabled Item 2 and go to Item 3
      const item3 = screen.getByText('Item 3').closest('button')!;
      expect(document.activeElement).toBe(item3);
    });

    it('includes "All" button in keyboard navigation', () => {
      render(<FilterBar items={defaultItems} showAll />);
      const allButton = screen.getByText('All').closest('button')!;
      allButton.focus();
      fireEvent.keyDown(allButton, { key: 'ArrowRight' });
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(document.activeElement).toBe(item1);
    });

    it('does not navigate on unhandled keys', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      item1.focus();
      fireEvent.keyDown(item1, { key: 'Tab' });
      expect(document.activeElement).toBe(item1);
    });
  });

  describe('accessibility', () => {
    it('items have aria-pressed attribute', () => {
      render(<FilterBar items={defaultItems} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed');
      });
    });

    it('active items have aria-pressed=true', () => {
      render(<FilterBar items={defaultItems} defaultActiveIds={['item1']} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(item1).toHaveAttribute('aria-pressed', 'true');
    });

    it('inactive items have aria-pressed=false', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(item1).toHaveAttribute('aria-pressed', 'false');
    });

    it('sets correct tabIndex for roving focus (first active item is tabbable)', () => {
      render(<FilterBar items={defaultItems} defaultActiveIds={['item2']} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      const item2 = screen.getByText('Item 2').closest('button')!;
      const item3 = screen.getByText('Item 3').closest('button')!;
      expect(item1).toHaveAttribute('tabIndex', '-1');
      expect(item2).toHaveAttribute('tabIndex', '0');
      expect(item3).toHaveAttribute('tabIndex', '-1');
    });

    it('when no items active, first enabled item is tabbable', () => {
      render(<FilterBar items={defaultItems} />);
      const item1 = screen.getByText('Item 1').closest('button')!;
      expect(item1).toHaveAttribute('tabIndex', '0');
    });

    it('when showAll and nothing selected, All button is tabbable', () => {
      render(<FilterBar items={defaultItems} showAll />);
      const allButton = screen.getByText('All').closest('button')!;
      expect(allButton).toHaveAttribute('tabIndex', '0');
    });

    it('buttons have type="button"', () => {
      render(<FilterBar items={defaultItems} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('edge cases', () => {
    it('renders with empty items array', () => {
      render(<FilterBar items={[]} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('renders with single item', () => {
      render(<FilterBar items={[{ id: 'only', label: 'Only One' }]} />);
      expect(screen.getByText('Only One')).toBeInTheDocument();
    });

    it('handles count of zero', () => {
      render(<FilterBar items={[{ id: 'empty', label: 'Empty', count: 0 }]} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders showAll with empty items', () => {
      render(<FilterBar items={[]} showAll />);
      expect(screen.getByText('All')).toBeInTheDocument();
    });
  });
});
