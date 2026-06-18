import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dos',
      values: [{ name: 'dos', value: '#000000' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const YEARS = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const Interactive = () => {
  const [value, setValue] = useState('2026');
  return <Select value={value} options={YEARS} onChange={setValue} aria-label="Tax year" />;
};

export const Default: Story = {
  render: () => <Interactive />,
};

export const Disabled: Story = {
  args: { value: '2025', options: YEARS, onChange: () => {}, disabled: true, 'aria-label': 'Year' },
};
