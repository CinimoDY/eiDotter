import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const defaultTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

describe('Tabs', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Tabs ref={ref} tabs={[{ id: 'a', label: 'A' }]} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('rendering', () => {
    it('renders all tabs', () => {
      render(<Tabs tabs={defaultTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders with tablist role', () => {
      render(<Tabs tabs={defaultTabs} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders tabs with tab role', () => {
      render(<Tabs tabs={defaultTabs} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('applies custom className', () => {
      render(<Tabs tabs={defaultTabs} className="custom-class" />);
      const wrapper = document.querySelector('.eidotter-tabs');
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('renders underline variant by default', () => {
      render(<Tabs tabs={defaultTabs} />);
      const wrapper = document.querySelector('.eidotter-tabs');
      expect(wrapper).toHaveClass('eidotter-tabs--underline');
    });

    it('renders pills variant', () => {
      render(<Tabs tabs={defaultTabs} variant="pills" />);
      const wrapper = document.querySelector('.eidotter-tabs');
      expect(wrapper).toHaveClass('eidotter-tabs--pills');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Tabs tabs={defaultTabs} size={size} />);
      const wrapper = document.querySelector('.eidotter-tabs');
      expect(wrapper).toHaveClass(`eidotter-tabs--${size}`);
    });
  });

  describe('uncontrolled mode', () => {
    it('selects first tab by default', () => {
      render(<Tabs tabs={defaultTabs} />);
      const firstTab = screen.getByText('Tab 1');
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
    });

    it('selects defaultActiveTab when provided', () => {
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" />);
      const secondTab = screen.getByText('Tab 2');
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    it('changes active tab on click', () => {
      render(<Tabs tabs={defaultTabs} />);
      const secondTab = screen.getByText('Tab 2');
      fireEvent.click(secondTab);
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('controlled mode', () => {
    it('uses activeTab prop', () => {
      render(<Tabs tabs={defaultTabs} activeTab="tab3" />);
      const thirdTab = screen.getByText('Tab 3');
      expect(thirdTab).toHaveAttribute('aria-selected', 'true');
    });

    it('calls onTabChange with new and previous tab IDs', () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={defaultTabs} activeTab="tab1" onTabChange={handleChange} />);
      const secondTab = screen.getByText('Tab 2');
      fireEvent.click(secondTab);
      expect(handleChange).toHaveBeenCalledWith('tab2', 'tab1');
    });

    it('does not change internal state in controlled mode', () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={defaultTabs} activeTab="tab1" onTabChange={handleChange} />);
      const secondTab = screen.getByText('Tab 2');
      fireEvent.click(secondTab);
      const firstTab = screen.getByText('Tab 1');
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('onSelectionChange', () => {
    it('calls onSelectionChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const mockOnSelectionChange = jest.fn();
      const tabs = [{ id: 'a', label: 'Tab A' }, { id: 'b', label: 'Tab B' }];
      render(<Tabs tabs={tabs} onSelectionChange={mockOnSelectionChange} />);
      await user.click(screen.getByRole('tab', { name: 'Tab B' }));
      expect(mockOnSelectionChange).toHaveBeenCalledWith('b', 'a');
    });
  });

  describe('disabled tabs', () => {
    const tabsWithDisabled = [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2', disabled: true },
      { id: 'tab3', label: 'Tab 3' },
    ];

    it('renders disabled tab', () => {
      render(<Tabs tabs={tabsWithDisabled} />);
      const disabledTab = screen.getByText('Tab 2');
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies disabled class to disabled tab', () => {
      render(<Tabs tabs={tabsWithDisabled} />);
      const disabledTab = screen.getByText('Tab 2');
      expect(disabledTab).toHaveClass('eidotter-tabs__tab--disabled');
    });

    it('does not call onTabChange for disabled tab', () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={tabsWithDisabled} onTabChange={handleChange} />);
      const disabledTab = screen.getByText('Tab 2');
      fireEvent.click(disabledTab);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('supports aria-label', () => {
      render(<Tabs tabs={defaultTabs} aria-label="Navigation tabs" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Navigation tabs');
    });

    it('sets correct aria-selected on active tab', () => {
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });

    it('sets tabIndex correctly via React Aria roving tabindex', () => {
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[1]).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('indicator', () => {
    it('renders indicator for underline variant', () => {
      render(<Tabs tabs={defaultTabs} />);
      expect(document.querySelector('.eidotter-tabs__indicator')).toBeInTheDocument();
    });

    it('does not render indicator for pills variant', () => {
      render(<Tabs tabs={defaultTabs} variant="pills" />);
      expect(document.querySelector('.eidotter-tabs__indicator')).not.toBeInTheDocument();
    });
  });

  describe('keyboard navigation (React Aria)', () => {
    it('navigates tabs with ArrowRight', () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={defaultTabs} onTabChange={handleChange} />);
      const firstTab = screen.getByText('Tab 1');
      fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
      expect(handleChange).toHaveBeenCalled();
    });

    it('navigates tabs with ArrowLeft', () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" onTabChange={handleChange} />);
      const secondTab = screen.getByText('Tab 2');
      fireEvent.keyDown(secondTab, { key: 'ArrowLeft' });
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
