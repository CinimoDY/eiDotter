import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../../Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
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
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: { title: 'No documents yet' },
};

export const WithDescription: Story = {
  args: {
    title: 'No documents yet',
    description: 'Upload a file or connect a source to populate this category.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Nothing here',
    description: 'Get started by adding your first entry.',
    action: <Button size="sm">Add entry</Button>,
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <EmptyState tone="default" title="Default" description="Neutral zero-state." />
      <EmptyState tone="info" title="Info" description="Informational zero-state." />
      <EmptyState tone="warning" title="Warning" description="Something needs attention." />
      <EmptyState tone="error" title="Error" description="Something went wrong." />
    </div>
  ),
};
