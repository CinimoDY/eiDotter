import type { Meta, StoryObj } from '@storybook/react';
import { Media } from './Media';

const meta = {
  title: 'Components/Media',
  component: Media,
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
      options: ["image","video","audio","thumbnail","avatar"],
      defaultValue: 'image',
    },
    state: {
      control: 'select',
      options: ["default","hover","active","disabled","focused","loading","error"],
      defaultValue: 'default',
    },
    type: {
      control: 'select',
      options: ["square","circle","rounded","landscape","portrait"],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Media Content',
    variant: 'image',
    state: 'default',
  },
};

// Variants

export const Image: Story = {
  args: {
    children: 'Media image',
    variant: 'image',
    state: 'default',
  },
};

export const Video: Story = {
  args: {
    children: 'Media video',
    variant: 'video',
    state: 'default',
  },
};

export const Audio: Story = {
  args: {
    children: 'Media audio',
    variant: 'audio',
    state: 'default',
  },
};

export const Thumbnail: Story = {
  args: {
    children: 'Media thumbnail',
    variant: 'thumbnail',
    state: 'default',
  },
};

export const Avatar: Story = {
  args: {
    children: 'Media avatar',
    variant: 'avatar',
    state: 'default',
  },
};

// States

export const StateDefault: Story = {
  args: {
    children: 'default State',
    variant: 'image',
    state: 'default',
  },
};

export const StateHover: Story = {
  args: {
    children: 'hover State',
    variant: 'image',
    state: 'hover',
  },
};

export const StateActive: Story = {
  args: {
    children: 'active State',
    variant: 'image',
    state: 'active',
  },
};

export const StateDisabled: Story = {
  args: {
    children: 'disabled State',
    variant: 'image',
    state: 'disabled',
  },
};

export const StateFocused: Story = {
  args: {
    children: 'focused State',
    variant: 'image',
    state: 'focused',
  },
};

export const StateLoading: Story = {
  args: {
    children: 'loading State',
    variant: 'image',
    state: 'loading',
  },
};

export const StateError: Story = {
  args: {
    children: 'error State',
    variant: 'image',
    state: 'error',
  },
};

// Types

export const SquareType: Story = {
  args: {
    children: 'square Type',
    variant: 'image',
    state: 'default',
    type: 'square',
  },
};

export const CircleType: Story = {
  args: {
    children: 'circle Type',
    variant: 'image',
    state: 'default',
    type: 'circle',
  },
};

export const RoundedType: Story = {
  args: {
    children: 'rounded Type',
    variant: 'image',
    state: 'default',
    type: 'rounded',
  },
};

export const LandscapeType: Story = {
  args: {
    children: 'landscape Type',
    variant: 'image',
    state: 'default',
    type: 'landscape',
  },
};

export const PortraitType: Story = {
  args: {
    children: 'portrait Type',
    variant: 'image',
    state: 'default',
    type: 'portrait',
  },
};
