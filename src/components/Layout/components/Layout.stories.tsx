import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta = {
  title: 'Components/Layout',
  component: Layout,
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
      options: ["fixed","fluid","grid","flex"],
      defaultValue: 'fixed',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["container","row","column","grid"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Layout Content',
    variant: 'fixed',
    state: 'default',
  },
};

// Variants

export const Fixed: Story = {
  args: {
    children: 'Layout fixed',
    variant: 'fixed',
    state: 'default',
  },
};

export const Fluid: Story = {
  args: {
    children: 'Layout fluid',
    variant: 'fluid',
    state: 'default',
  },
};

export const Grid: Story = {
  args: {
    children: 'Layout grid',
    variant: 'grid',
    state: 'default',
  },
};

export const Flex: Story = {
  args: {
    children: 'Layout flex',
    variant: 'flex',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'fixed',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'fixed',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'fixed',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'fixed',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'fixed',
    state: 'focused',
  },
};

// Types

export const ContainerType: Story = {
  args: {
    children: 'container Type',
    variant: 'fixed',
    state: 'default',
    type: 'container',
  },
};

export const RowType: Story = {
  args: {
    children: 'row Type',
    variant: 'fixed',
    state: 'default',
    type: 'row',
  },
};

export const ColumnType: Story = {
  args: {
    children: 'column Type',
    variant: 'fixed',
    state: 'default',
    type: 'column',
  },
};

export const GridType: Story = {
  args: {
    children: 'grid Type',
    variant: 'fixed',
    state: 'default',
    type: 'grid',
  },
};
