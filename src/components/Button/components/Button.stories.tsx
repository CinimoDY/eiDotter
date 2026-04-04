import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
    projectMeta: componentRegistry['Button'],
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'ghost', 'link'],
      defaultValue: 'primary'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'md'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button'
    },
    disabled: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    fullWidth: { control: 'boolean', defaultValue: false },
    iconOnly: { control: 'boolean', defaultValue: false },
    children: { control: 'text', defaultValue: 'Button' },
    onClick: { action: 'clicked' }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Default Button' },
};

// Variants
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Tertiary Button' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive Button' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost Button' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link Button' },
};

// Sizes
export const ExtraSmall: Story = {
  args: { size: 'xs', children: 'XS Button' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'SM Button' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'MD Button' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'LG Button' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', children: 'XL Button' },
};

// States
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled Button' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Loading Button' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Button' },
  parameters: { layout: 'fullscreen' },
};

export const IconOnly: Story = {
  args: { iconOnly: true, children: 'X', 'aria-label': 'Close' },
};

// Gallery stories
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

// Phosphor interaction states
export const PhosphorStates: Story = {
  render: () => (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px',
      background: 'var(--color-cga-black, #020003)', borderRadius: '4px',
    }}>
      <div style={{
        fontFamily: 'var(--typography-font-family-primary, monospace)',
        color: 'var(--color-semantic-text-primary, #b87c1a)',
        fontSize: '12px', marginBottom: '8px',
      }}>
        Hover and click each variant to compare phosphor glow intensity.
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          3-layer bloom + scanline crawl
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="secondary">Secondary</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          2-layer bloom + hover inversion
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="tertiary">Tertiary</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          1-layer glow + border reveal
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="destructive">Destructive</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          Red phosphor glow
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="ghost">Ghost</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          1-layer bloom + hover inversion
        </span>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="link">Link</Button>
        <span style={{ fontFamily: 'monospace', color: 'var(--color-cga-brown, #5f340e)', fontSize: '11px' }}>
          text-shadow glow only
        </span>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const FormButtons: Story = {
  render: () => (
    <form style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button type="submit" variant="primary">Submit</Button>
      <Button type="reset" variant="secondary">Reset</Button>
      <Button type="button" variant="ghost">Cancel</Button>
    </form>
  ),
};
