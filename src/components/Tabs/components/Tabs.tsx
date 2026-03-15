import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import './Tabs.css';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Display label for the tab
   */
  label: string;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Array of tab items to display
   */
  tabs: TabItem[];
  /**
   * The variant determines the tab styling
   */
  variant?: 'underline' | 'pills';
  /**
   * The size of the tabs
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Currently active tab ID (controlled mode)
   */
  activeTab?: string;
  /**
   * Default active tab ID (uncontrolled mode)
   */
  defaultActiveTab?: string;
  /**
   * Callback when active tab changes.
   * Receives the new tab ID and the previous tab ID,
   * enabling agents to observe navigation transitions.
   */
  onTabChange?: (tabId: string, previousTabId: string) => void;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Accessible label for the tab list
   */
  'aria-label'?: string;
}

/**
 * DOS-styled Tabs component for navigation and content switching
 *
 * Features:
 * - Two variants: underline (minimal) and pills (contained)
 * - Three sizes (small, medium, large)
 * - Controlled and uncontrolled modes
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - DOS-authentic styling with CGA colors
 * - WCAG 2.1 AA compliant
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = 'underline',
  size = 'medium',
  activeTab,
  defaultActiveTab,
  onTabChange,
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ''
  );

  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;

  const handleTabClick = useCallback((tabId: string, disabled?: boolean) => {
    if (disabled) return;

    const previous = activeTab !== undefined ? activeTab : internalActiveTab;
    if (activeTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId, previous);
  }, [activeTab, internalActiveTab, onTabChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(tab => tab.id === tabs[index].id);

    let newIndex: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentEnabledIndex > 0 ? currentEnabledIndex - 1 : enabledTabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentEnabledIndex < enabledTabs.length - 1 ? currentEnabledIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = enabledTabs.length - 1;
        break;
    }

    if (newIndex !== null) {
      const newTab = enabledTabs[newIndex];
      handleTabClick(newTab.id, newTab.disabled);
      // Focus the new tab button
      const tabButtons = document.querySelectorAll('[role="tab"]:not([disabled])');
      (tabButtons[newIndex] as HTMLElement)?.focus();
    }
  }, [tabs, handleTabClick]);

  const tabListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = tabListRef.current;
    if (!container || variant !== 'underline') return;

    const activeButton = container.querySelector<HTMLElement>('.tabs__tab--active');
    if (activeButton) {
      container.style.setProperty('--indicator-left', `${activeButton.offsetLeft}px`);
      container.style.setProperty('--indicator-width', `${activeButton.offsetWidth}px`);
    }

    const observer = new ResizeObserver(() => {
      const btn = container.querySelector<HTMLElement>('.tabs__tab--active');
      if (btn) {
        container.style.setProperty('--indicator-left', `${btn.offsetLeft}px`);
        container.style.setProperty('--indicator-width', `${btn.offsetWidth}px`);
      }
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [currentActiveTab, variant]);

  const tabsClasses = [
    'tabs',
    `tabs--${variant}`,
    `tabs--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses} role="tablist" ref={tabListRef} {...props}>
      {tabs.map((tab, index) => {
        const isActive = currentActiveTab === tab.id;
        const tabClasses = [
          'tabs__tab',
          isActive && 'tabs__tab--active',
          tab.disabled && 'tabs__tab--disabled'
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            className={tabClasses}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        );
      })}
      {variant === 'underline' && <span className="tabs__indicator" aria-hidden="true" />}
    </div>
  );
};
