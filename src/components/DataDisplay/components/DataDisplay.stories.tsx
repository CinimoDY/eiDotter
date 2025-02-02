import type { Meta, StoryObj } from '@storybook/react';
import { DataDisplay } from './DataDisplay';

const meta = {
  title: 'Components/DataDisplay',
  component: DataDisplay,
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
      options: ["compact","comfortable","spacious"],
      defaultValue: 'compact',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["table","list","card","grid","simple","h1","h2","group"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof DataDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'DataDisplay Content',
    variant: 'compact',
    state: 'default',
  },
};

// Variants

export const Compact: Story = {
  args: {
    children: 'DataDisplay compact',
    variant: 'compact',
    state: 'default',
  },
};

export const Comfortable: Story = {
  args: {
    children: 'DataDisplay comfortable',
    variant: 'comfortable',
    state: 'default',
  },
};

export const Spacious: Story = {
  args: {
    children: 'DataDisplay spacious',
    variant: 'spacious',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'compact',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'compact',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'compact',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'compact',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'compact',
    state: 'focused',
  },
};

// Types

export const TableType: Story = {
  args: {
    children: 'table Type',
    variant: 'compact',
    state: 'default',
    type: 'table',
  },
};

export const ListType: Story = {
  args: {
    children: 'list Type',
    variant: 'compact',
    state: 'default',
    type: 'list',
  },
};

export const CardType: Story = {
  args: {
    children: 'card Type',
    variant: 'compact',
    state: 'default',
    type: 'card',
  },
};

export const GridType: Story = {
  args: {
    children: 'grid Type',
    variant: 'compact',
    state: 'default',
    type: 'grid',
  },
};

export const SimpleType: Story = {
  args: {
    children: 'simple Type',
    variant: 'compact',
    state: 'default',
    type: 'simple',
  },
};

export const H1Type: Story = {
  args: {
    children: 'h1 Type',
    variant: 'compact',
    state: 'default',
    type: 'h1',
  },
};

export const H2Type: Story = {
  args: {
    children: 'h2 Type',
    variant: 'compact',
    state: 'default',
    type: 'h2',
  },
};

export const GroupType: Story = {
  args: {
    children: 'group Type',
    variant: 'compact',
    state: 'default',
    type: 'group',
  },
};
