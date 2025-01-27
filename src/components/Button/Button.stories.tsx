import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'YOUR_FIGMA_FILE_URL_HERE#node-id=YOUR_BUTTON_FRAME_ID'
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['L', 'S'],
    },
    variant: {
      control: 'select',
      options: ['brand', 'gray', 'danger'],
    },
    subtle: {
      control: 'boolean',
    },
    iconLeft: {
      control: 'boolean',
    },
    iconRight: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Brand: Story = {
  args: {
    variant: 'brand',
    size: 'L',
    children: 'Button Label',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
    size: 'L',
    children: 'Button Label',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'L',
    children: 'Button Label',
  },
};

export const Small: Story = {
  args: {
    variant: 'brand',
    size: 'S',
    children: 'Button Label',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'brand',
    size: 'L',
    subtle: true,
    children: 'Button Label',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'brand',
    size: 'L',
    iconLeft: true,
    children: 'Button Label',
  },
}; 