import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChecklistRow } from './ChecklistRow';
import { Badge } from '../../Badge';

const meta = {
  title: 'Components/ChecklistRow',
  component: ChecklistRow,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChecklistRow>;

export default meta;
type Story = StoryObj<typeof ChecklistRow>;

const Interactive = (args: { labelTone?: 'default' | 'muted' | 'error'; label?: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <ChecklistRow
      checked={checked}
      onToggle={() => setChecked((c) => !c)}
      label={args.label ?? 'Upload W-2 form'}
      labelTone={checked ? 'muted' : args.labelTone ?? 'default'}
    />
  );
};

export const Basic: Story = {
  render: () => <Interactive />,
};

export const Checked: Story = {
  args: { checked: true, onToggle: () => {}, label: 'Filed return', labelTone: 'muted' },
};

export const WithLeadingBadges: Story = {
  args: {
    checked: false,
    onToggle: () => {},
    label: 'Anlage N — Werbungskosten',
    note: 'Last edited 2 days ago',
    leading: (
      <span style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        <Badge variant="warning">high</Badge>
        <Badge variant="info">Dom</Badge>
      </span>
    ),
  },
};

export const WithTrailing: Story = {
  args: {
    checked: false,
    onToggle: () => {},
    label: 'Verify receipts',
    trailing: <Badge variant="error">3 open</Badge>,
  },
};

export const Disabled: Story = {
  args: { checked: false, onToggle: () => {}, label: 'Locked item', disabled: true },
};

export const Pending: Story = {
  args: { checked: true, onToggle: () => {}, label: 'Saving…', pending: true },
};
