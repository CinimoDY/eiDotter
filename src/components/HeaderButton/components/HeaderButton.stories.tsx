import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderButton } from './HeaderButton';
import { DisplayMenu } from '../../DisplayMenu';
import { Header } from '../../Header';
import { CmdPalette } from '../../CmdPalette';

const meta = {
  title: 'Components/HeaderButton',
  component: HeaderButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The one control shape for the Header `end` slot (0.46). DisplayMenu\'s trigger is a HeaderButton, ' +
          'and a ⌘K launcher is the same component with `⌘K` inside, so every header control has the same ' +
          'height (36px, 32px on phones), border, hover and focus ring. Text is the one body size.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Log', href: '#log' },
  { label: 'About', href: '#about' },
];

const paletteItems = [
  { id: 'home', label: 'HOME', hint: '/' },
  { id: 'log', label: 'LOG', hint: '/log' },
];

/** A site header: a ⌘K launcher and the theme control, side by side, same height. */
function SiteHeader({ brandName = 'DMNC.TECH', withPalette = true }: { brandName?: string; withPalette?: boolean }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [light, setLight] = useState(false);
  return (
    <>
      <Header
        brandName={brandName}
        items={navItems}
        sticky={false}
        end={
          <div style={{ display: 'flex', gap: 'var(--spacing-2, 8px)' }}>
            {withPalette && (
              <HeaderButton aria-label="Open command palette" onPress={() => setPaletteOpen(true)}>⌘K</HeaderButton>
            )}
            <DisplayMenu label="Theme" items={[{ id: 'light', label: 'LIGHT', checked: light, onChange: setLight }]} />
          </div>
        }
      />
      <CmdPalette open={paletteOpen} onOpenChange={setPaletteOpen} items={paletteItems} hotkey={false} />
    </>
  );
}

const resetRoot = (Story: React.FC) => (
  <div style={{ margin: 'calc(-1 * var(--spacing-8))', minHeight: '240px' }}>
    <Story />
  </div>
);

export const InHeader: Story = {
  name: 'In a Header: ⌘K + theme',
  render: () => <SiteHeader />,
  decorators: [resetRoot],
  parameters: {
    stable: {
      watch: ['.eidotter-header-button', '.eidotter-display-menu', '.eidotter-header__branding', '.eidotter-nav__desktop-list'],
      themes: ['amber-paper', 'light', 'amber-mono'],
    },
  },
};

/**
 * 390px: brand, ⌘K, theme and MENU fit. At 320px a lockup brand, two
 * controls and MENU do not; a ⌘K hint means nothing without a keyboard, so
 * show the ⌘K button from 480px up and keep the theme control alone on
 * phones (Phone 320).
 */
export const Phone390: Story = {
  name: 'Phone 390',
  render: () => <SiteHeader />,
  decorators: [resetRoot],
  parameters: { viewport: { defaultViewport: 'phone375' }, noOverflowAt: [390], noHeaderEndClip: true },
};

export const Phone320: Story = {
  name: 'Phone 320: theme control only',
  render: () => <SiteHeader withPalette={false} />,
  decorators: [resetRoot],
  parameters: { viewport: { defaultViewport: 'phone320' }, noOverflowAt: [320], noHeaderEndClip: true },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4, 16px)', alignItems: 'center' }}>
      <HeaderButton aria-label="Open command palette">⌘K</HeaderButton>
      <HeaderButton>Search</HeaderButton>
      <HeaderButton chevron>Theme</HeaderButton>
      <HeaderButton isDisabled>Disabled</HeaderButton>
    </div>
  ),
};
