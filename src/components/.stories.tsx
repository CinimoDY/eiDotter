import type { Meta, StoryObj } from '@storybook/react';
import {  } from './';

const meta = {
  title: 'Components/',
  component: ,
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
} satisfies Meta<typeof >;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: ' Content',
    variant: 'medium',
    state: 'default',
  },
};
