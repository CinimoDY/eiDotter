import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
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
      options: ["h1","h2","h3","h4","h5","h6","body","caption"],
      defaultValue: 'h1',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["heading","body","caption","label","code"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Typography Content',
    variant: 'h1',
    state: 'default',
  },
};

// Variants

export const H1: Story = {
  args: {
    children: 'Typography h1',
    variant: 'h1',
    state: 'default',
  },
};

export const H2: Story = {
  args: {
    children: 'Typography h2',
    variant: 'h2',
    state: 'default',
  },
};

export const H3: Story = {
  args: {
    children: 'Typography h3',
    variant: 'h3',
    state: 'default',
  },
};

export const H4: Story = {
  args: {
    children: 'Typography h4',
    variant: 'h4',
    state: 'default',
  },
};

export const H5: Story = {
  args: {
    children: 'Typography h5',
    variant: 'h5',
    state: 'default',
  },
};

export const H6: Story = {
  args: {
    children: 'Typography h6',
    variant: 'h6',
    state: 'default',
  },
};

export const Body: Story = {
  args: {
    children: 'Typography body',
    variant: 'body',
    state: 'default',
  },
};

export const Caption: Story = {
  args: {
    children: 'Typography caption',
    variant: 'caption',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'h1',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'h1',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'h1',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'h1',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'h1',
    state: 'focused',
  },
};

// Types

export const HeadingType: Story = {
  args: {
    children: 'heading Type',
    variant: 'h1',
    state: 'default',
    type: 'heading',
  },
};

export const BodyType: Story = {
  args: {
    children: 'body Type',
    variant: 'h1',
    state: 'default',
    type: 'body',
  },
};

export const CaptionType: Story = {
  args: {
    children: 'caption Type',
    variant: 'h1',
    state: 'default',
    type: 'caption',
  },
};

export const LabelType: Story = {
  args: {
    children: 'label Type',
    variant: 'h1',
    state: 'default',
    type: 'label',
  },
};

export const CodeType: Story = {
  args: {
    children: 'code Type',
    variant: 'h1',
    state: 'default',
    type: 'code',
  },
};
