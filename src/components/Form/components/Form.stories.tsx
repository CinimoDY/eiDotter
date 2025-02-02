import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
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
      options: ["small","medium","large","inline","stacked"],
      defaultValue: 'small',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused","loading","pressed"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["text","number","email","password","search","tel","url","group"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Form Content',
    variant: 'small',
    state: 'default',
  },
};

// Variants

export const Small: Story = {
  args: {
    children: 'Form small',
    variant: 'small',
    state: 'default',
  },
};

export const Medium: Story = {
  args: {
    children: 'Form medium',
    variant: 'medium',
    state: 'default',
  },
};

export const Large: Story = {
  args: {
    children: 'Form large',
    variant: 'large',
    state: 'default',
  },
};

export const Inline: Story = {
  args: {
    children: 'Form inline',
    variant: 'inline',
    state: 'default',
  },
};

export const Stacked: Story = {
  args: {
    children: 'Form stacked',
    variant: 'stacked',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'small',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'small',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'small',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'small',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'small',
    state: 'focused',
  },
};

export const StateLoading: Story = {
  args: {
    children: 'loading State',
    variant: 'small',
    state: 'loading',
  },
};

export const StatePressed: Story = {
  args: {
    children: 'pressed State',
    variant: 'small',
    state: 'pressed',
  },
};

// Types

export const TextType: Story = {
  args: {
    children: 'text Type',
    variant: 'small',
    state: 'default',
    type: 'text',
  },
};

export const NumberType: Story = {
  args: {
    children: 'number Type',
    variant: 'small',
    state: 'default',
    type: 'number',
  },
};

export const EmailType: Story = {
  args: {
    children: 'email Type',
    variant: 'small',
    state: 'default',
    type: 'email',
  },
};

export const PasswordType: Story = {
  args: {
    children: 'password Type',
    variant: 'small',
    state: 'default',
    type: 'password',
  },
};

export const SearchType: Story = {
  args: {
    children: 'search Type',
    variant: 'small',
    state: 'default',
    type: 'search',
  },
};

export const TelType: Story = {
  args: {
    children: 'tel Type',
    variant: 'small',
    state: 'default',
    type: 'tel',
  },
};

export const UrlType: Story = {
  args: {
    children: 'url Type',
    variant: 'small',
    state: 'default',
    type: 'url',
  },
};

export const GroupType: Story = {
  args: {
    children: 'group Type',
    variant: 'small',
    state: 'default',
    type: 'group',
  },
};
