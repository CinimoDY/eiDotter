import type { Meta, StoryObj } from '@storybook/react';
import { Feedback } from './Feedback';

const meta = {
  title: 'Components/Feedback',
  component: Feedback,
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
      options: ["toast","alert","notification","progress"],
      defaultValue: 'toast',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused","success","error","warning","info"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["info","success","warning","error"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Feedback Content',
    variant: 'toast',
    state: 'default',
  },
};

// Variants

export const Toast: Story = {
  args: {
    children: 'Feedback toast',
    variant: 'toast',
    state: 'default',
  },
};

export const Alert: Story = {
  args: {
    children: 'Feedback alert',
    variant: 'alert',
    state: 'default',
  },
};

export const Notification: Story = {
  args: {
    children: 'Feedback notification',
    variant: 'notification',
    state: 'default',
  },
};

export const Progress: Story = {
  args: {
    children: 'Feedback progress',
    variant: 'progress',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'toast',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'toast',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'toast',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'toast',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'toast',
    state: 'focused',
  },
};

export const StateSuccess: Story = {
  args: {
    children: 'success State',
    variant: 'toast',
    state: 'success',
  },
};

export const StateError: Story = {
  args: {
    children: 'error State',
    variant: 'toast',
    state: 'error',
  },
};

export const StateWarning: Story = {
  args: {
    children: 'warning State',
    variant: 'toast',
    state: 'warning',
  },
};

export const StateInfo: Story = {
  args: {
    children: 'info State',
    variant: 'toast',
    state: 'info',
  },
};

// Types

export const InfoType: Story = {
  args: {
    children: 'info Type',
    variant: 'toast',
    state: 'default',
    type: 'info',
  },
};

export const SuccessType: Story = {
  args: {
    children: 'success Type',
    variant: 'toast',
    state: 'default',
    type: 'success',
  },
};

export const WarningType: Story = {
  args: {
    children: 'warning Type',
    variant: 'toast',
    state: 'default',
    type: 'warning',
  },
};

export const ErrorType: Story = {
  args: {
    children: 'error Type',
    variant: 'toast',
    state: 'default',
    type: 'error',
  },
};
