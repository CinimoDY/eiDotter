import React from 'react';
import { render, screen } from '@testing-library/react';
import { LedgerRow } from './LedgerRow';

describe('LedgerRow', () => {
  it('renders the label and pre-formatted value', () => {
    render(<LedgerRow label="Travel" value="€1.234,56" />);
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('€1.234,56')).toBeInTheDocument();
  });

  it('renders the optional note', () => {
    render(<LedgerRow label="Travel" note="3 receipts" value="€10,00" />);
    expect(screen.getByText('3 receipts')).toBeInTheDocument();
  });

  it('renders a CopyButton only when copyValue is set', () => {
    const { rerender } = render(<LedgerRow label="X" value="€10,00" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    rerender(<LedgerRow label="X" value="€10,00" copyValue="10,00" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the trailing slot', () => {
    render(<LedgerRow label="X" value="€10,00" trailing={<span data-testid="trail">T</span>} />);
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('dims while pending and carries the stable hook class', () => {
    const { container } = render(<LedgerRow label="X" value="€10,00" pending />);
    const row = container.querySelector('.eidotter-ledger-row');
    expect(row).toHaveClass('opacity-50');
  });

  it('merges a custom className', () => {
    const { container } = render(<LedgerRow label="X" value="€10,00" className="custom" />);
    expect(container.querySelector('.eidotter-ledger-row')).toHaveClass('custom');
  });
});
