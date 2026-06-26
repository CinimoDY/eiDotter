import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import type { SelectOption } from './Select';

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

const YEARS: SelectOption[] = [
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const FORMATS: SelectOption[] = [
  { value: 'txt', label: 'PLAIN TEXT (.TXT)' },
  { value: 'md', label: 'MARKDOWN (.MD)' },
  { value: 'pdf', label: 'PORTABLE DOC (.PDF)' },
  { value: 'doc', label: 'WORD 6.0 (.DOC)', disabled: true },
  { value: 'rtf', label: 'RICH TEXT (.RTF)' },
];

/** Default single-select dropdown. */
const SingleDemo = () => {
  const [value, setValue] = useState('2026');
  return (
    <div style={{ width: 240 }}>
      <Select label="Tax year" options={YEARS} value={value} onChange={setValue} />
    </div>
  );
};
export const Default: Story = { render: () => <SingleDemo /> };

/** Placeholder shown until the user picks an option (uncontrolled). */
export const Placeholder: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Select aria-label="Year" options={YEARS} placeholder="SELECT A YEAR…" onChange={() => {}} />
    </div>
  ),
};

/** Type-to-filter ComboBox variant. */
const SearchableDemo = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 280 }}>
      <Select
        searchable
        label="Export format"
        options={FORMATS}
        value={value}
        onChange={setValue}
        placeholder="SEARCH FORMATS…"
      />
    </div>
  );
};
export const Searchable: Story = { render: () => <SearchableDemo /> };

/** Multi-select — value/onChange operate on string arrays. */
const MultiDemo = () => {
  const [value, setValue] = useState<string[]>(['2024', '2025']);
  return (
    <div style={{ width: 280 }}>
      <Select
        multiple
        label="Years to compare"
        options={YEARS}
        value={value}
        onChange={setValue}
        placeholder="SELECT YEARS…"
      />
    </div>
  );
};
export const MultiSelect: Story = { render: () => <MultiDemo /> };

/** Multi-select with an in-popover filter. */
const SearchableMultiDemo = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div style={{ width: 300 }}>
      <Select
        multiple
        searchable
        label="Formats"
        options={FORMATS}
        value={value}
        onChange={setValue}
        placeholder="PICK FORMATS…"
      />
    </div>
  );
};
export const SearchableMultiSelect: Story = { render: () => <SearchableMultiDemo /> };

/** Error + disabled states. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 240 }}>
      <Select
        label="Required"
        options={YEARS}
        onChange={() => {}}
        variant="error"
        errorMessage="THIS FIELD IS REQUIRED"
        placeholder="SELECT…"
      />
      <Select label="With helper" options={YEARS} value="2025" onChange={() => {}} description="Used for filing" />
      <Select label="Disabled" options={YEARS} value="2024" onChange={() => {}} disabled />
    </div>
  ),
};

/** All sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} aria-label={size} size={size} options={YEARS} value="2025" onChange={() => {}} />
      ))}
    </div>
  ),
};
