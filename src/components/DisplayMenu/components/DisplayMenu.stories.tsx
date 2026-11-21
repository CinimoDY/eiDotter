import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DisplayMenu, type DisplayMenuItem } from './DisplayMenu';
import { displayMenuItems, resolveDisplayTheme, type DisplayState, type DisplayThemes } from '../../../utils/displayTheme';
import { Header } from '../../Header';
import { Badge } from '../../Badge';
import { Button } from '../../Button';

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
 * off = dos-86 (the default), DOS on + LIGHT on = dos-86-paper (amber-paper with the body face, a.k.a. Eggyolk). DOS
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
  // boxes across themes and when a switch is used. The guard holds the body
  // face pair here (dos-86 and its light theme dos-86-paper); the display
  // face group is OpenDisplayFace. dos-86 to pure-amber (the PURE switch) and
  // dos-86 to light (the DOS switch on a site with a modern theme) still shift
  // by design: the body face is wider than the display face.
  parameters: {
    stable: {
      watch: ['.eidotter-display-menu', '.eidotter-nav__desktop-list', '.eidotter-display-menu__row'],
      themes: ['dos-86-paper'],
      click: '.eidotter-display-menu__row:last-child .eidotter-display-menu__switch',
    },
  },
};

/**
 * The display face group: Pure Amber, amber-paper and light keep every box
 * across themes, the same guard as Open for the sites that keep Pure Amber.
 */
export const OpenDisplayFace: Story = {
  name: 'Open (display face themes)',
  args: { items: [] },
  render: () => <InHeader open />,
  decorators: [resetRoot],
  globals: { theme: 'pure-amber' },
  parameters: {
    stable: {
      watch: ['.eidotter-display-menu', '.eidotter-nav__desktop-list', '.eidotter-display-menu__row'],
      themes: ['amber-paper', 'light'],
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

// ---------------------------------------------------------------------------
// Pure Amber in the menu (DMNC-1643, gate G3). `PureSwitch` is the shipped
// behaviour; the two `Alternative:` stories are comparisons for Dom's pick and
// exist only here (no exported API).
// ---------------------------------------------------------------------------

/** A site that offers dos-86 as its DOS dark theme and Pure Amber as the pure variant. */
const PURE_SITE: DisplayThemes = { dosDark: 'dos-86', dosPure: 'pure-amber', modernLight: 'light' };

/** Shows the resolved theme name and a few status colours under it. */
function ThemePreview({ theme }: { theme: string }) {
  return (
    <div
      data-theme={theme}
      style={{
        display: 'grid',
        gap: 'var(--spacing-2, 8px)',
        padding: 'var(--spacing-4, 16px)',
        background: 'var(--color-semantic-background-primary)',
        color: 'var(--color-semantic-text-primary)',
      }}
    >
      <span>data-theme="{theme}"</span>
      <span style={{ display: 'flex', gap: 'var(--spacing-2, 8px)', flexWrap: 'wrap' }}>
        <Badge variant="success">OK</Badge>
        <Badge variant="warning">WARN</Badge>
        <Badge variant="error">ERROR</Badge>
        <Badge variant="info">INFO</Badge>
      </span>
    </div>
  );
}

/**
 * Shipped (DMNC-1643): a third switch, PURE, under DOS while LIGHT is off, on a
 * site that passes `dosPure`. It is hidden, never disabled, in modern mode and
 * while LIGHT is on. DOS on + LIGHT off + PURE on = `dosPure` (Pure Amber);
 * PURE off = `dosDark` (dos-86 here). Without `dosPure` no row appears, so no
 * existing site's menu changes.
 */
export const PureSwitch: Story = {
  name: 'Pure switch (shipped)',
  args: { items: [] },
  render: function PureSwitchStory() {
    const [state, setState] = useState<DisplayState>({ dos: true, light: false, pure: false });
    const theme = resolveDisplayTheme(state, PURE_SITE);
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-4, 16px)' }}>
        <Header
          brandName="EXAMPLE"
          items={navItems}
          sticky={false}
          end={<DisplayMenu items={displayMenuItems(state, setState, PURE_SITE)} defaultOpen />}
        />
        <ThemePreview theme={theme} />
      </div>
    );
  },
  decorators: [resetRoot],
};

/**
 * ALTERNATIVE, NOT SHIPPED (for comparison, DMNC-1643 G3): one three-way row
 * for the DOS screen instead of LIGHT plus PURE. A static mock of the panel:
 * DisplayMenu only renders switch rows, and this direction would need a new
 * row type.
 */
export const AlternativeThreeWayRow: Story = {
  name: 'Alternative: three-way row (not shipped)',
  args: { items: [] },
  render: function ThreeWayStory() {
    const options = [
      { id: 'dos-86', label: 'Amber' },
      { id: 'pure-amber', label: 'Pure' },
      { id: 'amber-paper', label: 'Light' },
    ];
    const [screen, setScreen] = useState('dos-86');
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-4, 16px)', maxWidth: '28rem' }}>
        <p>ALTERNATIVE (not shipped): one SCREEN row with three choices.</p>
        <div className="eidotter-display-menu__panel" role="group" aria-label="Display (mock)">
          <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-2, 8px)' }}>
            <legend>Screen</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing-2, 8px)' }}>
              {options.map((o) => (
                <Button
                  key={o.id}
                  size="sm"
                  variant={screen === o.id ? 'primary' : 'secondary'}
                  aria-label={`${o.label}${screen === o.id ? ' (selected)' : ''}`}
                  onPress={() => setScreen(o.id)}
                >
                  {o.label}
                </Button>
              ))}
            </div>
          </fieldset>
        </div>
        <ThemePreview theme={screen} />
      </div>
    );
  },
};

/**
 * ALTERNATIVE, NOT SHIPPED (for comparison, DMNC-1643 G3): Pure Amber as the
 * LIGHT row's dark sibling. Under DOS both rows are always visible and act as
 * one choice: turning PURE on turns LIGHT off and the other way round. Uses the
 * real DisplayMenu with story-local wiring.
 */
export const AlternativeLightSibling: Story = {
  name: 'Alternative: Pure as Light’s dark sibling (not shipped)',
  args: { items: [] },
  render: function LightSiblingStory() {
    const [state, setState] = useState<DisplayState>({ dos: true, light: false, pure: false });
    const items: DisplayMenuItem[] = [
      { id: 'dos', label: 'DOS', checked: state.dos, onChange: (dos) => setState({ ...state, dos }) },
      ...(state.dos
        ? [
            { id: 'light', label: 'Light', checked: state.light, onChange: (light: boolean) => setState({ ...state, light, pure: light ? false : state.pure }) },
            { id: 'pure', label: 'Pure', checked: !!state.pure, onChange: (pure: boolean) => setState({ ...state, pure, light: pure ? false : state.light }) },
          ]
        : []),
    ];
    const theme = resolveDisplayTheme(state, PURE_SITE);
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-4, 16px)' }}>
        <p>ALTERNATIVE (not shipped): LIGHT and PURE always shown under DOS, one excludes the other.</p>
        <Header
          brandName="EXAMPLE"
          items={navItems}
          sticky={false}
          end={<DisplayMenu items={items} defaultOpen />}
        />
        <ThemePreview theme={theme} />
      </div>
    );
  },
  decorators: [resetRoot],
};
