import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Components/SectionHeading',
  component: SectionHeading,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: { title: 'Documents' },
};

export const WithCount: Story = {
  args: { title: 'Open actions', count: 9 },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <SectionHeading title="Default" tone="default" count={3} />
      <SectionHeading title="Info" tone="info" count={3} />
      <SectionHeading title="Warning" tone="warning" count={3} />
      <SectionHeading title="Error" tone="error" count={3} />
    </div>
  ),
};
