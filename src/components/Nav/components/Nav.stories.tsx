import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav, DesktopNav, MobileNav } from './Nav';

const sampleItems = [
  { label: 'projects', href: '/projects' },
  { label: 'tiny ideas', href: '/blog' },
  { label: 'contact', href: '/contact' },
];

const richer = [
  { label: 'work', href: '/work' },
  { label: 'projects', href: '/projects' },
  { label: 'blog', href: '/blog' },
  { label: 'contact', href: '/contact' },
];

const meta = {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['retro', 'modern'] },
    activeHref: { control: 'text' },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof Nav>;

// ─── Desktop ───────────────────────────────────────────────────────────────

export const RetroDesktop: Story = {
  name: 'Desktop – Retro',
  render: () => (
    <div style={{ padding: '16px' }}>
      <DesktopNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
  ),
};

export const ModernDesktop: Story = {
  name: 'Desktop – Modern',
  render: () => (
    <div style={{ padding: '16px', backgroundColor: '#fff' }}>
      <DesktopNav items={sampleItems} activeHref="/blog" variant="modern" />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light', values: [{ name: 'light', value: '#ffffff' }] },
  },
};

// ─── Mobile: MENU trigger ──────────────────────────────────────────────────

/**
 * Shows the MENU text button in its resting state at mobile width.
 * Click it to open the flyout panel.
 */
export const MobileTrigger: Story = {
  name: 'Mobile – MENU trigger (closed)',
  render: () => (
    <div style={{ padding: '16px' }}>
      <MobileNav items={sampleItems} activeHref="/projects" variant="retro" />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: {
        story:
          'The MENU text button replaces the previous hamburger icon. Click to open the right-side flyout panel.',
      },
    },
  },
};

// ─── Mobile: panel open ────────────────────────────────────────────────────

/**
 * Helper: renders MobileNav and immediately clicks the MENU trigger
 * so the flyout panel is open on load (no `play` dep required).
 */
function MobileNavOpen(props: React.ComponentProps<typeof MobileNav>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const btn = ref.current?.querySelector<HTMLButtonElement>(
      '.eidotter-nav__menu-trigger',
    );
    btn?.click();
  }, []);
  return (
    <div ref={ref}>
      <MobileNav {...props} />
    </div>
  );
}

export const MobilePanelOpen: Story = {
  name: 'Mobile – flyout panel (open)',
  render: () => (
    <MobileNavOpen items={richer} activeHref="/work" variant="retro" />
  ),
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: {
        story:
          'The flyout panel slides in from the right. Nav links are right-aligned and uppercase. ' +
          'Clicking any link, the backdrop, the ✕ button, or pressing Escape closes the panel.',
      },
    },
  },
};

export const MobilePanelOpenModern: Story = {
  name: 'Mobile – flyout panel, Modern variant',
  render: () => (
    <MobileNavOpen items={richer} activeHref="/projects" variant="modern" />
  ),
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    backgrounds: { default: 'light', values: [{ name: 'light', value: '#ffffff' }] },
  },
};

// ─── Full (mobile + desktop combined) ──────────────────────────────────────

export const FullNav: Story = {
  name: 'Full Nav (responsive)',
  args: {
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
};
