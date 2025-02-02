import type { Meta, StoryObj } from '@storybook/react';
import { Other } from './Other';

const meta = {
  title: 'Components/Other',
  component: Other,
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
    variant: {
      control: 'select',
      options: ["bold","subtle","left","right","center"],
      defaultValue: 'bold',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["group","button"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Other>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Other Content',
    variant: 'bold',
    state: 'default',
  },
};

// Variants

export const Bold: Story = {
  args: {
    children: 'Other bold',
    variant: 'bold',
    state: 'default',
  },
};

export const Subtle: Story = {
  args: {
    children: 'Other subtle',
    variant: 'subtle',
    state: 'default',
  },
};

export const Left: Story = {
  args: {
    children: 'Other left',
    variant: 'left',
    state: 'default',
  },
};

export const Right: Story = {
  args: {
    children: 'Other right',
    variant: 'right',
    state: 'default',
  },
};

export const Center: Story = {
  args: {
    children: 'Other center',
    variant: 'center',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'bold',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'bold',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'bold',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'bold',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'bold',
    state: 'focused',
  },
};

// Types

export const GroupType: Story = {
  args: {
    children: 'group Type',
    variant: 'bold',
    state: 'default',
    type: 'group',
  },
};

export const ButtonType: Story = {
  args: {
    children: 'button Type',
    variant: 'bold',
    state: 'default',
    type: 'button',
  },
};
