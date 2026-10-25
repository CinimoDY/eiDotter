import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DisplayMenu, type DisplayMenuItem } from './DisplayMenu';
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
          'Switch per option (DOS mode, the amber-paper theme, more later). Put it in Header `end`; the ' +
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

/** A site's display state: DOS mode on/off, amber-paper only while DOS is on. */
function useDisplayItems(): DisplayMenuItem[] {
  const [dos, setDos] = useState(true);
  const [paper, setPaper] = useState(false);
  return [
    { id: 'dos', label: 'DOS', checked: dos, onChange: setDos },
    {
      id: 'paper',
      label: 'Paper',
      checked: dos && paper,
      onChange: setPaper,
      disabled: !dos,
      hint: dos ? undefined : 'Needs DOS on',
    },
  ];
}

function InHeader({ open = false, brandName = 'EXAMPLE' }: { open?: boolean; brandName?: string }) {
  const items = useDisplayItems();
  return (
    <Header
      brandName={brandName}
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
};

export const Phone320: Story = {
  name: 'Phone 320',
  args: { items: [] },
  render: () => <InHeader brandName="DMNC.TECH" />,
  decorators: [resetRoot],
  parameters: { viewport: { defaultViewport: 'phone320' }, noOverflowAt: [320, 390] },
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
