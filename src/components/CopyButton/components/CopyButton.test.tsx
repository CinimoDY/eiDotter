import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });
  });

  it('renders the default resting label', () => {
    render(<CopyButton value="42,00" />);
    expect(screen.getByRole('button')).toHaveTextContent('[cp]');
  });

  it('copies the value via the Clipboard API and flips the label', async () => {
    render(<CopyButton value="42,00" />);
    fireEvent.click(screen.getByRole('button'));
    expect(writeText).toHaveBeenCalledWith('42,00');
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('[OK]'));
  });

  it('exposes an accessible name that reflects state', async () => {
    render(<CopyButton value="x" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAccessibleName('Copy to clipboard');
    fireEvent.click(btn);
    await waitFor(() => expect(btn).toHaveAccessibleName('Copied!'));
  });

  it('supports custom labels and titles', () => {
    render(<CopyButton value="x" label="COPY" copiedLabel="DONE" title="Copy IBAN" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('COPY');
    expect(btn).toHaveAccessibleName('Copy IBAN');
  });

  it('falls back to execCommand when the Clipboard API is unavailable', () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true, writable: true });
    const exec = jest.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', { value: exec, configurable: true, writable: true });
    render(<CopyButton value="fallback" />);
    fireEvent.click(screen.getByRole('button'));
    expect(exec).toHaveBeenCalledWith('copy');
    expect(screen.getByRole('button')).toHaveTextContent('[OK]');
  });

  it('carries the stable hook class', () => {
    render(<CopyButton value="x" />);
    expect(screen.getByRole('button')).toHaveClass('eidotter-copy-button');
  });
});
