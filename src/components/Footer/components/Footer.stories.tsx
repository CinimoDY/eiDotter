import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer, defaultLegalLinks } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    copyright: '2026 ACME Corp',
  },
};

export const WithCustomLinks: Story = {
  args: {
    copyright: '2026 ACME Corp',
    links: [
      ...defaultLegalLinks,
      { label: 'GitHub', href: 'https://github.com', external: true },
    ],
  },
};

export const WithExtraContent: Story = {
  args: {
    copyright: '2026 ACME Corp',
    children: (
      <p style={{ color: 'var(--color-cga-brown, #aa5500)', margin: 0 }}>
        Powered by eiDotter Design System
      </p>
    ),
  },
};

export const CustomLinksOnly: Story = {
  args: {
    copyright: '2026 ACME Corp',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
      { label: 'Impressum', href: '/impressum' },
    ],
  },
};

export const FullSiteFooter: Story = {
  render: () => (
    <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Footer
        copyright="2026 ACME Corp"
        links={[
          { label: 'Impressum', href: '/impressum' },
          { label: 'Datenschutz', href: '/datenschutz' },
          { label: 'GitHub', href: 'https://github.com', external: true },
          { label: 'npm', href: 'https://npmjs.com', external: true },
        ]}
      />
    </div>
  ),
};
