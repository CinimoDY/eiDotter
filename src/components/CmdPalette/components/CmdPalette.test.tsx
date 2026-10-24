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

  it('sits on the DosDialog shell: top placement, lg width, decorative strip (DMNC-1592)', () => {
    render(<Harness initialOpen />);
    const panel = document.querySelector('.eidotter-dialog');
    expect(panel).toHaveClass('eidotter-dialog--top', 'eidotter-dialog--lg');
    const head = document.querySelector('.eidotter-dialog__head');
    expect(head).toHaveAttribute('aria-hidden', 'true');
    expect(head).toHaveTextContent('JUMP TO');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Command palette');
  });

  it('selected row label and hint are bright; every other hint is muted', async () => {
    const user = userEvent.setup();
    render(<Harness initialOpen />);
    const check = (selectedIndex: number) => {
      const options = screen.getAllByRole('option');
      options.forEach((opt, i) => {
        const label = opt.querySelector('.eidotter-cmdpal__item-label')!;
        const hint = opt.querySelector('.eidotter-cmdpal__item-hint')!;
        if (i === selectedIndex) {
          expect(opt).toHaveAttribute('aria-selected', 'true');
          expect(opt).toHaveClass('eidotter-cmdpal__item--selected');
          expect(label).toHaveClass('eidotter-cmdpal__text--bright');
          expect(hint).toHaveClass('eidotter-cmdpal__text--bright');
          expect(hint).not.toHaveClass('eidotter-cmdpal__text--muted');
        } else {
          expect(label).not.toHaveClass('eidotter-cmdpal__text--bright');
          expect(hint).toHaveClass('eidotter-cmdpal__text--muted');
          expect(hint).not.toHaveClass('eidotter-cmdpal__text--bright');
        }
      });
    };
    check(0);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    check(1);
  });

  it('label text sits in its own truncating span; the default footer keeps each key hint whole (DMNC-1612)', () => {
    render(<Harness />);
    const opt = screen.getAllByRole('option')[0];
    const text = opt.querySelector('.eidotter-cmdpal__item-label > .eidotter-cmdpal__item-text');
    expect(text).toHaveTextContent('DIR');
    expect(opt.querySelector('.eidotter-cmdpal__item-label')).toHaveTextContent('DIR');
    const footer = document.querySelector('.eidotter-cmdpal__footer') as HTMLElement;
    expect(footer.textContent).toBe('↑/↓ NAVIGATE · ↵ OPEN · ESC CLOSE');
    expect(Array.from(footer.querySelectorAll('.eidotter-cmdpal__key-hint')).map((n) => n.textContent))
      .toEqual(['↑/↓ NAVIGATE', '↵ OPEN', 'ESC CLOSE']);
  });

  describe('narrow palette stylesheet contract (DMNC-1612)', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readFileSync } = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { join } = require('path');
    const css: string = readFileSync(join(__dirname, 'CmdPalette.css'), 'utf8');
    const rule = (sel: string) => {
      const m = css.match(new RegExp(sel.replace(/[.]/g, '\\.') + '\\s*\\{([^}]*)\\}'));
      return m ? m[1] : '';
    };

    it('the label does not shrink; the hint shrinks first and truncates with an ellipsis', () => {
      expect(rule('.eidotter-cmdpal__item-label')).toMatch(/flex:\s*0 0 auto/);
      expect(rule('.eidotter-cmdpal__item-label')).toMatch(/max-width:\s*100%/);
      expect(rule('.eidotter-cmdpal__item-label')).not.toMatch(/overflow:\s*hidden/);
      const hint = rule('.eidotter-cmdpal__item-hint');
      expect(hint).toMatch(/flex:\s*0 1 auto/);
      expect(hint).toMatch(/min-width:\s*0/);
      expect(hint).toMatch(/text-overflow:\s*ellipsis/);
      expect(hint).toMatch(/white-space:\s*nowrap/);
      expect(hint).not.toMatch(/flex-shrink:\s*0/);
      // An over-long label truncates its own text span, not the caret.
      expect(rule('.eidotter-cmdpal__item-text')).toMatch(/text-overflow:\s*ellipsis/);
      expect(rule('.eidotter-cmdpal__item-caret')).toMatch(/flex-shrink:\s*0/);
    });

    it('key hints never wrap inside', () => {
      expect(rule('.eidotter-cmdpal__key-hint')).toMatch(/white-space:\s*nowrap/);
    });

    it('narrow rules are a container query on the palette, not a media query', () => {
      expect(rule('.eidotter-dialog__container.eidotter-cmdpal__container')).toMatch(/container:\s*eidotter-cmdpal \/ inline-size/);
      expect(css).toMatch(/@container eidotter-cmdpal \(max-width: 30rem\)/);
      expect(css).not.toMatch(/@media[^{]*(max|min)-width/);
    });
  });

  it('placeholder and hints use the muted token; the selected state uses the brand token', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readFileSync } = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { join } = require('path');
    const css: string = readFileSync(join(__dirname, 'CmdPalette.css'), 'utf8');
    expect(css).toMatch(/\.eidotter-cmdpal__input::placeholder\s*\{[^}]*color:\s*var\(--color-semantic-text-muted\)/);
    expect(css).toMatch(/\.eidotter-cmdpal__text--muted\s*\{[^}]*color:\s*var\(--color-semantic-text-muted\)/);
    expect(css).toMatch(/\.eidotter-cmdpal__text--bright\s*\{[^}]*color:\s*var\(--color-semantic-text-brand\)/);
    expect(css).toMatch(/\.eidotter-cmdpal__item--selected\s*\{[^}]*background-color:/);
  });
});
