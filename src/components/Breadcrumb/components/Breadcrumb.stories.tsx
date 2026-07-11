import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';
import React from 'react';
import { componentRegistry } from '@/components/registry';
// preview.ts does NOT load provenance.css globally (only AIText/Provenance
// stories import it), so the InsideAIBlock regression story must import it
// itself.
import '../../../styles/provenance.css';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    projectMeta: componentRegistry['Breadcrumb'],
  },
  tags: ['autodocs'],
  argTypes: {
    trail: {
      control: 'object',
      description: 'Array of breadcrumb trail items',
    },
    currentLabel: {
      control: 'text',
      description: 'Current page label',
    },
    showBackArrow: {
      control: 'boolean',
      description: 'Show back arrow on last trail item',
    },
    separator: {
      control: 'text',
      description: 'Custom separator character',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Eidotter',
  },
};

export const SingleLevel: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
    ],
    currentLabel: 'About',
  },
};

export const DeepNavigation: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/projects/design-systems', label: 'Design Systems' },
    ],
    currentLabel: 'Eidotter',
  },
};

export const NoTrail: Story = {
  args: {
    trail: [],
    currentLabel: 'Home',
  },
};

export const WithoutBackArrow: Story = {
  args: {
    trail: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Eidotter',
    showBackArrow: false,
  },
};

export const CustomSeparator: Story = {
  args: {
    trail: [
      { href: '/', label: 'C:' },
      { href: '/projects', label: 'Projects' },
    ],
    currentLabel: 'Readme.txt',
    separator: '\\',
  },
};

export const DOSPath: Story = {
  args: {
    trail: [
      { href: '/', label: 'C:' },
      { href: '/dos', label: 'DOS' },
    ],
    currentLabel: 'COMMAND.COM',
    separator: '\\',
    showBackArrow: false,
  },
};

/**
 * DMNC-1193 regression guard. A Breadcrumb inside a `data-ai-block` wrapper must
 * keep its own accent colour — block mode's provenance gradient must NOT paint
 * navigation chrome (the `-webkit-text-fill-color: transparent` would inherit
 * into the link/span glyphs with no gradient behind them → invisible). Content
 * prose (`<p>`, content `<ul><li>`) inside the same block MUST keep the gradient.
 * A `[data-theme="light"]` prose block pins the light-theme gradient stops too.
 *
 * (The breadcrumb lives only in the dark scope: its links carry `opacity-70`, so
 * the light-theme accent can't clear AA color-contrast on a light backdrop — a
 * pre-existing Breadcrumb trait, already allowlisted for `all-variants`. The fix
 * itself is a structural selector, theme-independent, so one scope proves it.)
 *
 * The play function is the repo's first — kept dependency-free (no
 * `@storybook/test`), it reads computed styles the axe pass can't (invisible
 * text passes axe, which only inspects `color`).
 */
const aiProse =
  'This paragraph is AI-drafted and not yet revised — it should render with the magenta provenance gradient clipped to its glyphs, unlike the breadcrumb above it.';

const breadcrumbTrail = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
];

const TRANSPARENT_FILLS = new Set(['transparent', 'rgba(0, 0, 0, 0)']);
const fillColor = (el: Element) =>
  getComputedStyle(el).getPropertyValue('-webkit-text-fill-color').trim();
const bgImage = (el: Element) => getComputedStyle(el).backgroundImage.trim();

export const InsideAIBlock: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <article
      data-ai-block
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        background: 'var(--color-semantic-background-primary)',
        fontFamily: 'var(--typography-font-family-primary)',
      }}
    >
      {/* Dark (default theme) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Breadcrumb trail={breadcrumbTrail} currentLabel="Eidotter" />
        <p style={{ margin: 0, maxWidth: '60ch' }}>{aiProse}</p>
        <ul style={{ margin: 0 }}>
          <li>A content list item inside the AI block — this one keeps the gradient.</li>
        </ul>
      </section>

      {/* Light theme — gradient swaps to the deep-magenta→violet stops. Prose
          only (no breadcrumb): the point here is the gradient variant. */}
      <section
        data-theme="light"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
          background: '#FFE8A8',
        }}
      >
        <p style={{ margin: 0, maxWidth: '60ch' }}>{aiProse}</p>
      </section>
    </article>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 1. Every breadcrumb link (both theme scopes) must stay opaque with no
    //    inherited gradient — the DMNC-1193 bug made these transparent/invisible.
    const links = canvasElement.querySelectorAll('.eidotter-breadcrumb__link');
    if (links.length === 0) throw new Error('InsideAIBlock: expected breadcrumb links, found none');
    links.forEach((link) => {
      if (TRANSPARENT_FILLS.has(fillColor(link))) {
        throw new Error(
          `DMNC-1193 regression: breadcrumb link "${link.textContent}" has a transparent text-fill inside [data-ai-block] (invisible glyphs)`,
        );
      }
      if (bgImage(link) !== 'none') {
        throw new Error(
          `DMNC-1193 regression: breadcrumb link "${link.textContent}" inherited a gradient background inside [data-ai-block]`,
        );
      }
    });

    // 2. Own-accent check — the first link must keep the component's own accent,
    //    not a layout-inherited colour. Probe with a live element in the same scope.
    const firstLink = links[0] as HTMLElement;
    const probe = document.createElement('span');
    probe.style.color = 'var(--color-semantic-text-accent)';
    firstLink.parentElement?.appendChild(probe);
    const accent = getComputedStyle(probe).color;
    const linkColor = getComputedStyle(firstLink).color;
    probe.remove();
    if (linkColor !== accent) {
      throw new Error(
        `DMNC-1193: breadcrumb link colour ${linkColor} != component accent ${accent} — its own colour was stomped`,
      );
    }

    // 3. Prose regression guard — content <p> and content <ul><li> inside the
    //    block MUST still be gradient-clipped (transparent fill + linear-gradient),
    //    in BOTH theme scopes. The exclusion must be nav-scoped, not global.
    const prose = canvasElement.querySelectorAll('[data-ai-block] p, [data-ai-block] ul > li');
    if (prose.length === 0) throw new Error('InsideAIBlock: expected gradient prose, found none');
    prose.forEach((el) => {
      if (!TRANSPARENT_FILLS.has(fillColor(el))) {
        throw new Error(
          `DMNC-1193 over-exclusion: prose "${el.textContent?.slice(0, 24)}…" lost its transparent fill`,
        );
      }
      if (!bgImage(el).includes('linear-gradient')) {
        throw new Error(
          `DMNC-1193 over-exclusion: prose "${el.textContent?.slice(0, 24)}…" lost its gradient background`,
        );
      }
    });
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Default
        </div>
        <Breadcrumb
          trail={[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
          ]}
          currentLabel="Eidotter"
        />
      </div>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          DOS Path Style
        </div>
        <Breadcrumb
          trail={[
            { href: '/', label: 'C:' },
            { href: '/dos', label: 'DOS' },
          ]}
          currentLabel="AUTOEXEC.BAT"
          separator="\"
          showBackArrow={false}
        />
      </div>
      <div>
        <div style={{
          color: 'var(--color-semantic-text-disabled)',
          fontSize: '10px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Single Level
        </div>
        <Breadcrumb
          trail={[{ href: '/', label: 'Home' }]}
          currentLabel="Contact"
        />
      </div>
    </div>
  ),
};
