import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
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
      options: ["horizontal","vertical","dropdown","breadcrumb"],
      defaultValue: 'horizontal',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused","selected","expanded","collapsed"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["link","button","menu","tab"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Navigation Content',
    variant: 'horizontal',
    state: 'default',
  },
};

// Variants

export const Horizontal: Story = {
  args: {
    children: 'Navigation horizontal',
    variant: 'horizontal',
    state: 'default',
  },
};

export const Vertical: Story = {
  args: {
    children: 'Navigation vertical',
    variant: 'vertical',
    state: 'default',
  },
};

export const Dropdown: Story = {
  args: {
    children: 'Navigation dropdown',
    variant: 'dropdown',
    state: 'default',
  },
};

export const Breadcrumb: Story = {
  args: {
    children: 'Navigation breadcrumb',
    variant: 'breadcrumb',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'horizontal',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'horizontal',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'horizontal',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'horizontal',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'horizontal',
    state: 'focused',
  },
};

export const StateSelected: Story = {
  args: {
    children: 'selected State',
    variant: 'horizontal',
    state: 'selected',
  },
};

export const StateExpanded: Story = {
  args: {
    children: 'expanded State',
    variant: 'horizontal',
    state: 'expanded',
  },
};

export const StateCollapsed: Story = {
  args: {
    children: 'collapsed State',
    variant: 'horizontal',
    state: 'collapsed',
  },
};

// Types

export const LinkType: Story = {
  args: {
    children: 'link Type',
    variant: 'horizontal',
    state: 'default',
    type: 'link',
  },
};

export const ButtonType: Story = {
  args: {
    children: 'button Type',
    variant: 'horizontal',
    state: 'default',
    type: 'button',
  },
};

export const MenuType: Story = {
  args: {
    children: 'menu Type',
    variant: 'horizontal',
    state: 'default',
    type: 'menu',
  },
};

export const TabType: Story = {
  args: {
    children: 'tab Type',
    variant: 'horizontal',
    state: 'default',
    type: 'tab',
  },
};
