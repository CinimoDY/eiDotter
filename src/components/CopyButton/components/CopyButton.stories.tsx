import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from './CopyButton';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: { value: '1.234,56' },
};

export const Inline: Story = {
  render: () => (
    <span style={{ color: 'var(--color-semantic-text-accent)', fontFamily: 'var(--typography-font-family-primary)' }}>
      DE89 3704 0044 0532 0130 00 <CopyButton value="DE89370400440532013000" title="Copy IBAN" />
    </span>
  ),
};

export const CustomLabels: Story = {
  args: { value: 'eidotter', label: 'COPY', copiedLabel: 'DONE', title: 'Copy package name' },
};
