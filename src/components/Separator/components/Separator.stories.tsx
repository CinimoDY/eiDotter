import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';
import { componentRegistry } from '@/components/registry';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
    projectMeta: componentRegistry['Separator'],
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <p style={{ color: '#FFB000', marginBottom: '8px' }}>Content above</p>
        <Story />
        <p style={{ color: '#FFB000', marginTop: '8px' }}>Content below</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '40px' }}>
        <span style={{ color: '#FFB000' }}>Left</span>
        <Story />
        <span style={{ color: '#FFB000' }}>Right</span>
      </div>
    ),
  ],
};
