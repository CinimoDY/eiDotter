import type { Meta, StoryObj } from '@storybook/react';
import { Overlay } from './Overlay';

const meta = {
  title: 'Components/Overlay',
  component: Overlay,
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
      options: ["modal","dialog","drawer","popover","tooltip"],
      defaultValue: 'modal',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused","open","closed","animating"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["modal","dialog","drawer","popover","tooltip"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Overlay Content',
    variant: 'modal',
    state: 'default',
  },
};

// Variants

export const Modal: Story = {
  args: {
    children: 'Overlay modal',
    variant: 'modal',
    state: 'default',
  },
};

export const Dialog: Story = {
  args: {
    children: 'Overlay dialog',
    variant: 'dialog',
    state: 'default',
  },
};

export const Drawer: Story = {
  args: {
    children: 'Overlay drawer',
    variant: 'drawer',
    state: 'default',
  },
};

export const Popover: Story = {
  args: {
    children: 'Overlay popover',
    variant: 'popover',
    state: 'default',
  },
};

export const Tooltip: Story = {
  args: {
    children: 'Overlay tooltip',
    variant: 'tooltip',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'modal',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'modal',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'modal',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'modal',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'modal',
    state: 'focused',
  },
};

export const StateOpen: Story = {
  args: {
    children: 'open State',
    variant: 'modal',
    state: 'open',
  },
};

export const StateClosed: Story = {
  args: {
    children: 'closed State',
    variant: 'modal',
    state: 'closed',
  },
};

export const StateAnimating: Story = {
  args: {
    children: 'animating State',
    variant: 'modal',
    state: 'animating',
  },
};

// Types

export const ModalType: Story = {
  args: {
    children: 'modal Type',
    variant: 'modal',
    state: 'default',
    type: 'modal',
  },
};

export const DialogType: Story = {
  args: {
    children: 'dialog Type',
    variant: 'modal',
    state: 'default',
    type: 'dialog',
  },
};

export const DrawerType: Story = {
  args: {
    children: 'drawer Type',
    variant: 'modal',
    state: 'default',
    type: 'drawer',
  },
};

export const PopoverType: Story = {
  args: {
    children: 'popover Type',
    variant: 'modal',
    state: 'default',
    type: 'popover',
  },
};

export const TooltipType: Story = {
  args: {
    children: 'tooltip Type',
    variant: 'modal',
    state: 'default',
    type: 'tooltip',
  },
};
