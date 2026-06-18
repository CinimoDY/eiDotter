import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
];

describe('Select', () => {
  it('renders the options and reflects the current value', () => {
    render(<Select value="2025" options={options} onChange={() => {}} aria-label="Year" />);
    const select = screen.getByRole('combobox', { name: 'Year' }) as HTMLSelectElement;
    expect(select.value).toBe('2025');
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('fires onChange with the newly selected value', () => {
    const onChange = jest.fn();
    render(<Select value="2024" options={options} onChange={onChange} aria-label="Year" />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2025' } });
    expect(onChange).toHaveBeenCalledWith('2025');
  });

  it('supports the disabled state', () => {
    render(<Select value="2024" options={options} onChange={() => {}} aria-label="Year" disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('carries the stable hook class and merges a custom className', () => {
    render(
      <Select value="2024" options={options} onChange={() => {}} aria-label="Year" className="custom" />,
    );
    expect(screen.getByRole('combobox')).toHaveClass('eidotter-select', 'custom');
  });
});
