import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

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
      options: ['placeholder', 'arrow-right', 'arrow-left'],
    },
    size: {
      control: { type: 'number', min: 8, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    name: 'placeholder',
    size: 16,
  },
};

export const Medium: Story = {
  args: {
    name: 'placeholder',
    size: 24,
  },
};

export const Large: Story = {
  args: {
    name: 'placeholder',
    size: 32,
  },
};

// We'll add more stories as we add more icons 