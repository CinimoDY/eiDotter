import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import manifest from '../../../assets/icons/manifest.json';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [
        { name: 'dos', value: '#000000' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(manifest),
      description: 'The name of the icon to display',
    },
    size: {
      control: 'select',
      options: ['L', 'S'],
      description: 'The size of the icon',
    },
    color: {
      control: 'select',
      options: [
        'var(--color-semantic-text-primary)',
        'var(--color-semantic-link-default)',
        'var(--color-semantic-link-hover)',
        'var(--color-semantic-text-disabled)',
      ],
      description: 'The color of the icon using semantic tokens',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

// Default Icon
export const Default: Story = {
  args: {
    name: 'Info',
    size: 'L',
  },
};

// All Icons Grid
export const IconGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: 'var(--spacing-lg)',
      padding: 'var(--spacing-lg)',
      maxWidth: 'var(--dimension-content-max-width)',
      textAlign: 'center',
    }}>
      {Object.keys(manifest).map((name) => (
        <div key={name} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 'var(--spacing-xs)',
        }}>
          <Icon name={name as keyof typeof manifest} size="L" />
          <div style={{ 
            fontSize: 'var(--typography-sizes-small)',
            fontFamily: 'var(--typography-fonts-dos), var(--typography-fonts-fallback)',
          }}>
            {name}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: 'var(--spacing-lg)',
      padding: 'var(--spacing-lg)',
      alignItems: 'center',
    }}>
      <Icon name="Info" size="S" />
      <Icon name="Info" size="L" />
    </div>
  ),
};

// Color Variants
export const Colors: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: 'var(--spacing-lg)',
      padding: 'var(--spacing-lg)',
      alignItems: 'center',
    }}>
      <Icon name="Info" size="L" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-default)" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-hover)" />
      <Icon name="Info" size="L" color="var(--color-semantic-text-disabled)" />
    </div>
  ),
}; 