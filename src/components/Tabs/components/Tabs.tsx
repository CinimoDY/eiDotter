import React, { useState, useRef, useLayoutEffect, useCallback, forwardRef } from 'react';
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Tabs.css';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tab items to display */
  tabs: TabItem[];
  /** The variant determines the tab styling */
  variant?: 'underline' | 'pills';
  /** The size of the tabs */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /** Currently active tab ID (controlled mode) */
  activeTab?: string;
  /** Default active tab ID (uncontrolled mode) */
  defaultActiveTab?: string;
  /** Callback when active tab changes */
  onTabChange?: (tabId: string, previousTabId: string) => void;
  /** Optional CSS class name */
  className?: string;
  /** Accessible label for the tab list */
  'aria-label'?: string;
}

const sizeClasses: Record<string, string> = {
  sm:     'eidotter-tabs--sm',
  md:     'eidotter-tabs--md',
  lg:     'eidotter-tabs--lg',
  small:  'eidotter-tabs--sm',
  medium: 'eidotter-tabs--md',
  large:  'eidotter-tabs--lg',
};

const variantClasses: Record<string, string> = {
  underline: 'eidotter-tabs--underline',
  pills:     'eidotter-tabs--pills',
};

/**
 * DOS-styled Tabs with React Aria keyboard navigation and phosphor indicator.
 * React Aria handles arrow keys, Home, End, roving tabindex, and ARIA roles.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  tabs,
  variant = 'underline',
  size = 'md',
  activeTab,
  defaultActiveTab,
  onTabChange,
  className,
  ...props
}, ref) => {
  const tabListRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef<string>(activeTab ?? defaultActiveTab ?? tabs[0]?.id ?? '');
  // Track current selection for indicator repositioning in uncontrolled mode
  const [internalKey, setInternalKey] = useState<string>(
    activeTab ?? defaultActiveTab ?? tabs[0]?.id ?? ''
  );

  const handleSelectionChange = useCallback((key: React.Key) => {
    const newId = String(key);
    const previous = activeTab ?? prevTabRef.current;
    prevTabRef.current = newId;
    setInternalKey(newId);
    onTabChange?.(newId, previous);
  }, [activeTab, onTabChange]);

  // Reposition the underline indicator when selection or variant changes
  useLayoutEffect(() => {
    const container = tabListRef.current;
    if (!container || variant !== 'underline') return;

    const updateIndicator = () => {
      const btn = container.querySelector<HTMLElement>('[aria-selected="true"]');
      if (btn) {
        container.style.setProperty('--indicator-left', `${btn.offsetLeft}px`);
        container.style.setProperty('--indicator-width', `${btn.offsetWidth}px`);
      }
    };

    updateIndicator();

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);

    return () => observer.disconnect();
  }, [activeTab, internalKey, variant]);

  return (
    <AriaTabs
      ref={ref}
      selectedKey={activeTab}
      defaultSelectedKey={defaultActiveTab ?? tabs[0]?.id}
      onSelectionChange={handleSelectionChange}
      className={cn(
        'eidotter-tabs',
        variantClasses[variant],
        sizeClasses[size] || sizeClasses.md,
        className,
      )}
    >
      <div ref={tabListRef} className="relative">
        <AriaTabList
          className="inline-flex items-center font-dos eidotter-tabs__list"
          aria-label={props['aria-label']}
        >
          {tabs.map((tab) => (
            <AriaTab
              key={tab.id}
              id={tab.id}
              isDisabled={tab.disabled}
              className={({ isSelected, isDisabled }) => cn(
                'eidotter-tabs__tab',
                isSelected && 'eidotter-tabs__tab--active',
                isDisabled && 'eidotter-tabs__tab--disabled',
              )}
            >
              {tab.label}
            </AriaTab>
          ))}
        </AriaTabList>
        {variant === 'underline' && <span className="eidotter-tabs__indicator" aria-hidden="true" />}
      </div>
      {/* Hidden TabPanels satisfy React Aria's aria-controls relationship */}
      {tabs.map((tab) => (
        <AriaTabPanel key={tab.id} id={tab.id} className="hidden" />
      ))}
    </AriaTabs>
  );
});

Tabs.displayName = 'Tabs';
