import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { componentRegistry } from '@/components/registry';

const ICON_NAMES = ['Info', 'Warning', 'Error', 'Done', 'Close', 'Check',
  'Chevron Up', 'Chevron Down', 'App', 'Cancel', 'Fullscreen', 'Add'] as const;

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
    projectMeta: componentRegistry['Icon'],
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
    },
    size: {
      control: 'select',
      options: ['L', 'S'],
    },
    color: {
      control: 'select',
      options: [
        'var(--color-semantic-text-primary)',
        'var(--color-semantic-link-default)',
        'var(--color-semantic-link-hover)',
        'var(--color-semantic-text-disabled)',
      ],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'Info',
    size: 'L',
  },
};

export const IconGrid: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '8px',
      padding: '16px',
      maxWidth: '800px',
      textAlign: 'center',
    }}>
      {ICON_NAMES.map((name) => (
        <div key={name} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '12px 4px',
          borderRadius: '2px',
          border: '1px solid var(--color-semantic-border-default)',
        }}>
          <Icon name={name} size="L" />
          <div style={{
            fontSize: '10px',
            fontFamily: 'var(--typography-font-family-primary)',
            lineHeight: 1.2,
            wordBreak: 'break-word' as const,
          }}>
            {name}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="Info" size="S" />
      <Icon name="Info" size="L" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="Info" size="L" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-default)" />
      <Icon name="Info" size="L" color="var(--color-semantic-link-hover)" />
      <Icon name="Info" size="L" color="var(--color-semantic-text-disabled)" />
    </div>
  ),
};

/**
 * Regression story for DMNC-929: Icon must inherit the surrounding text color.
 * On an amber surface with dark text (like the Section header in hover/expanded
 * state), the icon has to render dark — a hardcoded amber would vanish into
 * the fill.
 */
export const InheritsSurfaceColor: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        background: 'var(--color-semantic-background-accent)',
        color: 'var(--color-semantic-text-secondary)',
        padding: '8px 16px',
        fontFamily: 'var(--typography-font-family-primary)',
      }}
    >
      Dark text on amber fill
      <Icon name="Chevron Down" size="S" />
    </div>
  ),
};
