import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CmdPalette, type CmdPaletteItem } from './CmdPalette';

const sampleItems: CmdPaletteItem[] = [
  { id: 'dir',  label: 'DIR',  hint: 'list files', keywords: ['ls', 'listing'] },
  { id: 'mem',  label: 'MEM',  hint: 'show memory' },
  { id: 'ver',  label: 'VER',  hint: 'version info', keywords: ['version'] },
  { id: 'help', label: 'HELP', hint: 'open help',    keywords: ['?', 'man'] },
  { id: 'cls',  label: 'CLS',  hint: 'clear screen' },
];

/** Harness that owns the open state so tests can exercise controlled flow. */
const Harness: React.FC<{
  initialOpen?: boolean;
  onSelect?: (item: CmdPaletteItem) => void;
  hotkey?: string | false;
}> = ({ initialOpen = true, onSelect, hotkey = false }) => {
  const [open, setOpen] = useState(initialOpen);
  const items = sampleItems.map(i => ({ ...i, onSelect }));
  return (
    <>
      <button onClick={() => setOpen(true)} data-testid="opener">OPEN</button>
      <CmdPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        hotkey={hotkey}
      />
    </>
  );
};

describe('CmdPalette', () => {
  it('renders items when open', () => {
    render(<Harness initialOpen />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /DIR/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /MEM/i })).toBeInTheDocument();
  });

  it('is hidden when open=false', () => {
    render(<Harness initialOpen={false} />);
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('filters items by label substring', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'he');
    expect(screen.getByRole('option', { name: /HELP/i })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /DIR/i })).toBeNull();
  });

  it('filters items by keyword', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    await user.type(screen.getByRole('combobox'), 'version');
    expect(screen.getByRole('option', { name: /VER/i })).toBeInTheDocument();
  });

  it('renders empty state when nothing matches', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    await user.type(screen.getByRole('combobox'), 'zzzzz');
    expect(screen.getByText('NO MATCHES')).toBeInTheDocument();
  });

  it('ArrowDown/Up moves selection', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    const input = screen.getByRole('combobox');
    // Initial selection is first item
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /DIR/i })).toHaveAttribute('aria-selected', 'true');
    });
    await user.click(input);
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: /MEM/i })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('option', { name: /DIR/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('Enter calls onSelect for the current item and closes the palette', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Harness initialOpen onSelect={onSelect} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}'); // selection is MEM
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('mem');
    await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull());
  });

  it('clicking a row selects it', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Harness initialOpen onSelect={onSelect} />);
    await user.click(screen.getByRole('option', { name: /HELP/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('help');
  });

  it('Escape closes the palette via React Aria', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull());
  });

  it('hotkey=mod+k toggles open', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen={false} hotkey="mod+k" />);
    expect(screen.queryByRole('combobox')).toBeNull();
    await user.keyboard('{Control>}k{/Control}');
    await waitFor(() => expect(screen.getByRole('combobox')).toBeInTheDocument());
    await user.keyboard('{Control>}k{/Control}');
    await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull());
  });

  it('hotkey=false disables the global binding', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen={false} hotkey={false} />);
    await user.keyboard('{Control>}k{/Control}');
    // Nothing should have opened
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('custom renderItem is used for rows', () => {
    const Wrapper: React.FC = () => {
      const [open, setOpen] = useState(true);
      return (
        <CmdPalette
          open={open}
          onOpenChange={setOpen}
          items={sampleItems}
          renderItem={(item, isSelected) => (
            <span data-testid={`row-${item.id}`} data-selected={isSelected}>{item.label}!</span>
          )}
        />
      );
    };
    render(<Wrapper />);
    expect(screen.getByTestId('row-dir')).toHaveTextContent('DIR!');
  });
});
