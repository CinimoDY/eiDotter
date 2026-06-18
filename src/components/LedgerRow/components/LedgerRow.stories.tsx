import type { Meta, StoryObj } from '@storybook/react-vite';
import { LedgerRow } from './LedgerRow';
import { Badge } from '../../Badge';

const meta = {
  title: 'Components/LedgerRow',
  component: LedgerRow,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LedgerRow>;

export default meta;
type Story = StoryObj<typeof LedgerRow>;

export const Default: Story = {
  args: { label: 'Travel expenses', value: '€1.234,56' },
};

export const WithNote: Story = {
  args: { label: 'Office supplies', note: '3 receipts attached', value: '€89,90' },
};

export const WithCopy: Story = {
  args: { label: 'Net total', value: '€12.500,00', copyValue: '12500,00' },
};

export const WithTrailing: Story = {
  args: {
    label: 'Insurance',
    note: 'Verified against bank statement',
    value: '€480,00',
    copyValue: '480,00',
    // Domain chrome (verify state, source tags) composes via `trailing`.
    trailing: <Badge variant="success">DB</Badge>,
  },
};

export const Pending: Story = {
  args: { label: 'Saving…', value: '€0,00', pending: true },
};
