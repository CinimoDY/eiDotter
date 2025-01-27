import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';

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
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

// All available icons
const allIcons: IconName[] = [
  'placeholder',
  'open-in-new',
  'arrow-right',
  'arrow-left',
];

// Icon sizes we want to showcase
const sizes = [16, 24, 32];

export const IconCollection: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gap: '2rem',
      color: 'var(--color-dos-yellow)',
    }}>
      {sizes.map(size => (
        <div key={size}>
          <h3 style={{ marginBottom: '1rem' }}>{size}px</h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
          }}>
            {allIcons.map(name => (
              <div key={name} style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Icon name={name} size={size} />
                <code style={{ fontSize: '12px' }}>{name}</code>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}; 