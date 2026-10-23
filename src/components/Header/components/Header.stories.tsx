import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { Switch } from '../../Switch';

const sampleItems = [
  { label: 'projects', href: '/projects' },
  { label: 'tiny ideas', href: '/blog' },
  { label: 'contact', href: '/contact' },
];

// Context-row fixture (DMNC-1326). `misc` uses an unknown icon name on purpose
// to demonstrate the label-only fallback (no icon, no empty wrapper span).
const contextCategories = [
  { key: 'work',  label: 'work',  icon: 'App',    href: '/work' },
  { key: 'ideas', label: 'ideas', icon: 'Info',   href: '/ideas' },
  { key: 'misc',  label: 'misc',  icon: 'folder', href: '/misc' },
];

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['retro', 'modern'],
    },
    sticky: {
      control: 'boolean',
    },
    activeHref: {
      control: 'text',
    },
    brandHref: {
      control: 'text',
    },
    brand: {
      control: 'select',
      options: ['lockup', 'mark', 'text'],
    },
    skipLinkTarget: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  name: 'Default – lockup brand',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The one portfolio header (DMNC-1584): with `brandName` and no `children`, the brand ' +
          'renders as the lockup (decorative Logo + uppercase wide-tracked name). Quiet 1px ' +
          'dim-amber bottom line, all text in the brand amber, uppercase DOS nav labels.',
      },
    },
  },
};

export const MarkBrand: Story = {
  name: 'Brand – Mark',
  args: {
    brandName: 'SITE.NAME',
    brand: 'mark',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
  parameters: {
    docs: {
      description: {
        story: '`brand="mark"` swaps the static Logo for the morphing `Mark` (placeholder for the arms version).',
      },
    },
  },
};

function EndSlotDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <span className="flex items-center gap-4 font-dos text-dos-text-brand">
      <kbd className="font-dos">⌘K</kbd>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        className="font-dos uppercase whitespace-nowrap text-dos-text-brand bg-transparent border border-dos-border-brand-dim rounded-dos-sm px-2"
      >
        DOS {on ? 'ON' : 'OFF'}
      </button>
    </span>
  );
}

export const WithEndSlot: Story = {
  name: 'End slot – toggle + ⌘K hint',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    end: <EndSlotDemo />,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`end` renders once: after the desktop nav on wide screens, and between the brand and ' +
          'the MENU trigger on mobile (resize to see both placements).',
      },
    },
  },
};

export const EndSlotGlowAtPhone: Story = {
  name: 'End slot – Switch glow at phone width',
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    variant: 'retro',
    end: <Switch defaultChecked aria-label="Light theme" />,
  },
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: {
        story:
          'A checked Switch in `end` at phone width: its 12px phosphor glow and its focus ring ' +
          '(Tab to it) show in full. The slot clips only the inline axis, with a 12px bleed, so ' +
          'it still shrinks before the brand name (DMNC-1611).',
      },
    },
  },
};

export const WithSkipLink: Story = {
  name: 'Skip link',
  render: (args) => (
    <>
      <Header {...args} />
      <main id="main" className="p-4 font-dos text-dos-text-primary">
        Press Tab: the SKIP TO CONTENT pill appears top-left and jumps here.
      </main>
    </>
  ),
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    skipLinkTarget: '#main',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`skipLinkTarget` renders a visually-hidden-until-focused "SKIP TO CONTENT" anchor as ' +
          "the header's first child (WCAG 2.4.1). Off by default.",
      },
    },
  },
};

export const RetroHeader: Story = {
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
  },
};

export const ModernHeader: Story = {
  args: {
    brandName: 'Dominic Kennedy',
    items: sampleItems,
    activeHref: '/blog',
    variant: 'modern',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
  },
};

export const CustomBranding: Story = {
  args: {
    items: [
      { label: 'components', href: '/components' },
      { label: 'storybook', href: '/storybook' },
      { label: 'github', href: '/github' },
    ],
    activeHref: '/components',
    variant: 'retro',
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true">&#x1F95A;</span>
        <span>eiDotter</span>
      </span>
    ),
  },
};

export const MobileHeader: Story = {
  name: 'Mobile – MENU trigger (closed)',
  args: {
    brandName: 'RIZOMORF',
    items: [
      { label: 'work', href: '/work' },
      { label: 'projects', href: '/projects' },
      { label: 'blog', href: '/blog' },
      { label: 'contact', href: '/contact' },
    ],
    activeHref: '/work',
    variant: 'retro',
  },
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: {
        story: 'At mobile width the desktop nav is hidden and the MENU text trigger appears. Click MENU to open the flyout.',
      },
    },
  },
};

function HeaderWithPanelOpen(props: React.ComponentProps<typeof Header>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const btn = ref.current?.querySelector<HTMLButtonElement>(
      '.eidotter-nav__menu-trigger',
    );
    btn?.click();
  }, []);
  return (
    <div ref={ref}>
      <Header {...props} />
    </div>
  );
}

export const MobileMenuOpen: Story = {
  name: 'Mobile – flyout panel (open)',
  render: () => (
    <HeaderWithPanelOpen
      brandName="RIZOMORF"
      items={[
        { label: 'work', href: '/work' },
        { label: 'projects', href: '/projects' },
        { label: 'blog', href: '/blog' },
        { label: 'contact', href: '/contact' },
      ]}
      activeHref="/work"
      variant="retro"
    />
  ),
  parameters: {
    viewport: { defaultViewport: 'phone375' },
    docs: {
      description: {
        story:
          'The right-side flyout panel with right-aligned uppercase nav items and pixel-art X close button. ' +
          'Backdrop, ✕ button, nav link clicks, and Escape all close the panel.',
      },
    },
  },
};

export const FullHeader: Story = {
  args: {
    brandName: 'SITE.NAME',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    sticky: true,
  },
};

export const ContextNone: Story = {
  name: 'Context – none (back-compat)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    context: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Without `context` the DOM is identical to previous versions — a single brand+nav row.',
      },
    },
  },
};

export const ContextCategories: Story = {
  name: 'Context – category badge row',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/projects',
    variant: 'retro',
    context: { categories: contextCategories },
  },
  parameters: {
    docs: {
      description: {
        story:
          'A measurable second row of category badges. Each `<li>` carries a stable ' +
          '`data-category-key` and each link the `eidotter-header__category` class — the ' +
          'measurement contract the Mark arm-connector (DMNC-1325) anchors off. The ' +
          '`misc` category uses an unknown icon name and falls back to label-only.',
      },
    },
  },
};

export const ContextReturnToSameTab: Story = {
  name: 'Context – returnTo pill (same tab)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/work',
    variant: 'retro',
    context: {
      categories: contextCategories,
      returnTo: { label: 'Back to Rizomorf', href: 'https://rizomorf.dmnc.online' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'The "← back" pill navigates in the same tab via `linkComponent` (or a plain anchor). ' +
          'The active category (`activeHref`) gets an underline + `aria-current="page"`.',
      },
    },
  },
};

export const ContextReturnToReuseTab: Story = {
  name: 'Context – returnTo pill (reuse named tab)',
  args: {
    brandName: 'DMNC.TECH',
    items: sampleItems,
    activeHref: '/work',
    variant: 'retro',
    context: {
      categories: contextCategories,
      returnTo: { label: 'Back to Rizomorf', href: 'https://rizomorf.dmnc.online', reuseTab: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'With `reuseTab: true` the pill is a real `<a>` (bypassing `linkComponent`) whose click ' +
          'calls `window.open(href, "rizomorf-shell")` to reuse a named tab. A popup blocker ' +
          '(null return) falls back to normal same-tab navigation; Cmd/Ctrl/Shift/middle-clicks ' +
          'keep their native behavior. Cross-origin tab focus is intentionally not attempted.',
      },
    },
  },
};
