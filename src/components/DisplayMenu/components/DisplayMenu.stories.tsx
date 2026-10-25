import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DisplayMenu, type DisplayMenuItem } from './DisplayMenu';
import { displayMenuItems, type DisplayState } from '../../../utils/displayTheme';
import { Header } from '../../Header';

const meta = {
  title: 'Components/DisplayMenu',
  component: DisplayMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One header control for display options (DMNC-1619). The trigger opens a small panel with one ' +
          'Switch per option: DOS (style: DOS or modern) and LIGHT (brightness; under DOS this is the ' +
          'amber-paper theme, a.k.a. Eggyolk). Sites without a modern mode show only LIGHT. Options that do not apply in the current mode are hidden, not disabled. `displayMenuItems()` builds the rows from the themes a site offers. Put it in Header `end`; the ' +
          'consumer owns the state and applies it (for example `data-theme` on `<html>`). Icon only below ' +
          '640px. Escape and a click outside close it and return focus to the trigger.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DisplayMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Blog', href: '#blog' },
];

/**
 * A site with DOS and a modern style (modern light only), through
 * `displayMenuItems`: DOS is the style, LIGHT the brightness. DOS on + LIGHT
 * off = amber-mono, DOS on + LIGHT on = amber-paper (a.k.a. Eggyolk). DOS
 * off = the modern light theme, and the LIGHT row is hidden: options that do
 * not apply in the current mode are hidden, not shown disabled.
 */
function useDisplayItems(): DisplayMenuItem[] {
  const [state, setState] = useState<DisplayState>({ dos: true, light: false });
  return displayMenuItems(state, setState, { modernLight: 'light' });
}

function InHeader({ open = false, brandName = 'EXAMPLE', collapse = false }: { open?: boolean; brandName?: string; collapse?: boolean }) {
  const items = useDisplayItems();
  return (
    <Header
      brandName={brandName}
      brandCollapse={collapse ? 'mark' : 'none'}
      items={navItems}
      sticky={false}
      end={<DisplayMenu items={items} defaultOpen={open} />}
    />
  );
}

const resetRoot = (Story: React.FC) => (
  <div style={{ margin: 'calc(-1 * var(--spacing-8))', minHeight: '320px' }}>
    <Story />
  </div>
);

export const Default: Story = {
  args: { items: [] },
  render: () => <InHeader />,
  decorators: [resetRoot],
};

export const Open: Story = {
  args: { items: [] },
  render: () => <InHeader open />,
  decorators: [resetRoot],
  // Controls never move: the trigger, the nav and the DOS row keep their
  // boxes across themes and when a switch is used.
  parameters: {
    stable: {
      watch: ['.eidotter-display-menu', '.eidotter-nav__desktop-list', '.eidotter-display-menu__row'],
      themes: ['amber-paper', 'light', 'amber-mono'],
      click: '.eidotter-display-menu__row:last-child .eidotter-display-menu__switch',
    },
  },
};

/**
 * 320px. A short lockup keeps its icon. A longer title (DMNC.TECH) drops the
 * logo icon first and keeps the title whole on one line; the display button
 * stays whole. The test runner fails if the page scrolls sideways or the
 * display button is clipped.
 */
export const Phone320: Story = {
  name: 'Phone 320',
  args: { items: [] },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-4, 16px)' }}>
      <InHeader />
      <InHeader brandName="DMNC.TECH" />
      <InHeader brandName="EIDOTTER" />
    </div>
  ),
  decorators: [resetRoot],
  parameters: { viewport: { defaultViewport: 'phone320' }, noOverflowAt: [320, 390], noHeaderEndClip: true },
};

export const LabelDisplays: Story = {
  name: 'Label displays',
  args: { items: [] },
  render: function LabelDisplaysStory() {
    const items = useDisplayItems();
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-4, 16px)', alignItems: 'center' }}>
        <DisplayMenu items={items} labelDisplay="label" />
        <DisplayMenu items={items} labelDisplay="icon" />
        <DisplayMenu items={items} label="Theme" labelDisplay="label" />
      </div>
    );
  },
};
