import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const YEARS = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

describe('Select (single / default)', () => {
  it('renders the placeholder when nothing is selected', () => {
    render(<Select options={YEARS} onChange={() => {}} aria-label="Year" placeholder="Pick a year" />);
    expect(screen.getByRole('button')).toHaveTextContent('Pick a year');
  });

  it('reflects the controlled value in the trigger', () => {
    render(<Select options={YEARS} value="2025" onChange={() => {}} aria-label="Year" />);
    expect(screen.getByRole('button')).toHaveTextContent('2025');
  });

  it('opens the listbox and lists every option', async () => {
    const user = userEvent.setup();
    render(<Select options={YEARS} onChange={() => {}} aria-label="Year" />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('fires onChange with the selected value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Select options={YEARS} onChange={onChange} aria-label="Year" />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: '2025' }));
    expect(onChange).toHaveBeenCalledWith('2025');
  });

  it('supports the disabled state', () => {
    render(<Select options={YEARS} value="2024" onChange={() => {}} aria-label="Year" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('respects per-option disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Select
        options={[{ value: '2024', label: '2024' }, { value: '2025', label: '2025', disabled: true }]}
        onChange={onChange}
        aria-label="Year"
      />,
    );
    await user.click(screen.getByRole('button'));
    const disabledOption = screen.getByRole('option', { name: '2025' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders a visible label, description and error message', () => {
    render(
      <Select
        options={YEARS}
        value="2024"
        onChange={() => {}}
        label="Tax year"
        variant="error"
        errorMessage="Required field"
      />,
    );
    expect(screen.getByText('Tax year')).toBeInTheDocument();
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('carries the stable hook class and merges a custom className', () => {
    const { container } = render(
      <Select options={YEARS} value="2024" onChange={() => {}} aria-label="Year" className="custom" />,
    );
    const root = container.querySelector('.eidotter-select');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('custom');
  });

  it('honors defaultValue in uncontrolled mode', () => {
    render(<Select options={YEARS} defaultValue="2026" onChange={() => {}} aria-label="Year" />);
    expect(screen.getByRole('button')).toHaveTextContent('2026');
  });

  it('treats an empty value as nothing selected (placeholder shows)', () => {
    render(<Select options={YEARS} value="" onChange={() => {}} aria-label="Year" placeholder="—" />);
    expect(screen.getByRole('button')).toHaveTextContent('—');
  });

  it('maps deprecated size aliases (large → lg)', () => {
    render(<Select options={YEARS} value="2024" onChange={() => {}} aria-label="Year" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('min-h-10');
  });

  it('renders a description when not in an error state', () => {
    render(
      <Select options={YEARS} value="2024" onChange={() => {}} label="Year" description="Helper text" />,
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});

describe('Select (searchable)', () => {
  it('renders a combobox input', () => {
    render(<Select searchable options={YEARS} onChange={() => {}} aria-label="Year" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('filters options as the user types', async () => {
    const user = userEvent.setup();
    render(<Select searchable options={YEARS} onChange={() => {}} aria-label="Year" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.keyboard('2024');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('2024');
  });

  it('shows the empty message when nothing matches', async () => {
    const user = userEvent.setup();
    render(<Select searchable options={YEARS} onChange={() => {}} aria-label="Year" emptyMessage="NOTHING" />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('zzz');
    expect(screen.getByText('NOTHING')).toBeInTheDocument();
  });

  it('fires onChange when an option is picked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Select searchable options={YEARS} onChange={onChange} aria-label="Year" />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: '2026' }));
    expect(onChange).toHaveBeenCalledWith('2026');
  });

  it('renders label, description and honors defaultValue', () => {
    render(
      <Select
        searchable
        options={YEARS}
        defaultValue="2025"
        onChange={() => {}}
        label="Year"
        description="Pick one"
      />,
    );
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('2025');
  });
});

describe('Select (multiple)', () => {
  it('renders the placeholder in the trigger', () => {
    render(<Select multiple options={YEARS} onChange={() => {}} aria-label="Years" placeholder="Choose" />);
    expect(screen.getByRole('button')).toHaveTextContent('Choose');
  });

  it('reflects controlled selected values in the trigger', () => {
    render(<Select multiple options={YEARS} value={['2024', '2026']} onChange={() => {}} aria-label="Years" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('2024');
    expect(trigger).toHaveTextContent('2026');
  });

  it('opens a multi-selection listbox', async () => {
    const user = userEvent.setup();
    render(<Select multiple options={YEARS} onChange={() => {}} aria-label="Years" />);
    await user.click(screen.getByRole('button'));
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(within(listbox).getAllByRole('option')).toHaveLength(3);
  });

  it('fires onChange with an array of selected values', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Select multiple options={YEARS} onChange={onChange} aria-label="Years" />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: /2025/ }));
    expect(onChange).toHaveBeenLastCalledWith(['2025']);
  });

  it('emits a hidden input per selected value when a name is given', () => {
    const { container } = render(
      <Select multiple name="years" options={YEARS} value={['2024', '2025']} onChange={() => {}} aria-label="Years" />,
    );
    const hidden = container.querySelectorAll('input[type="hidden"][name="years"]');
    expect(hidden).toHaveLength(2);
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();
    render(<Select multiple searchable options={YEARS} onChange={() => {}} aria-label="Years" />);
    await user.click(screen.getByRole('button'));
    const filter = screen.getByRole('textbox', { name: 'Filter options' });
    await user.type(filter, '2026');
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });

  it('accumulates selections in uncontrolled mode', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Select multiple options={YEARS} defaultValue={['2024']} onChange={onChange} aria-label="Years" />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: /2026/ }));
    expect(onChange).toHaveBeenLastCalledWith(['2024', '2026']);
  });

  it('renders label + description and uses the label for the listbox name', async () => {
    const user = userEvent.setup();
    render(
      <Select multiple options={YEARS} onChange={() => {}} label="Years" description="Compare" />,
    );
    expect(screen.getByText('Compare')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Years/ }));
    expect(screen.getByRole('listbox', { name: 'Years' })).toBeInTheDocument();
  });
});
