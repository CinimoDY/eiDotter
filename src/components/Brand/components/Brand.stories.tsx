import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';
import { BrandLockup } from './BrandLockup';

const meta: Meta<typeof BrandLockup> = {
  title: 'Brand/Lockup',
  component: BrandLockup,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof BrandLockup>;

export const Default: Story = {
  args: { logoSize: 48 },
};

export const SmallLockup: Story = {
  args: { logoSize: 24 },
  parameters: { docs: { description: { story: '24px — toolbar / inline brand.' } } },
};

export const HeroLockup: Story = {
  args: { logoSize: 96 },
  parameters: { docs: { description: { story: '96px — hero / splash.' } } },
};

export const LogoOnly: Story = {
  args: { logoSize: 64, iconOnly: true },
  parameters: { docs: { description: { story: 'Yolk icon without the wordmark — favicons, app icons.' } } },
};

export const WordmarkOnly: Story = {
  args: { wordmarkOnly: true },
  parameters: { docs: { description: { story: '"eiDotter" wordmark alone.' } } },
};

export const NoGlow: Story = {
  args: { logoSize: 48, glow: false },
  parameters: { docs: { description: { story: 'Phosphor glow disabled — print, email, dark-mode-off surfaces.' } } },
};

export const LogoSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Logo size={16} />
      <Logo size={24} />
      <Logo size={32} />
      <Logo size={48} />
      <Logo size={64} />
      <Logo size={96} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Scale study: 16 / 24 / 32 / 48 / 64 / 96 px.' } } },
};

export const WordmarkInline: StoryObj = {
  render: () => (
    <p style={{ fontSize: 18 }}>
      Welcome to <Wordmark style={{ fontSize: 'inherit' }} /> — a DOS design system.
    </p>
  ),
  parameters: { docs: { description: { story: 'Wordmark inherits host font-size via CSS — drop inline in prose.' } } },
};
