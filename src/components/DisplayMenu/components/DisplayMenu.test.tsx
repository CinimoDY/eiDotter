import React, { useState } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DisplayMenu, type DisplayMenuItem } from './DisplayMenu';

const css = readFileSync(join(__dirname, 'DisplayMenu.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** Consumer-owned state, like a site: DOS mode plus the amber-paper theme. */
const Harness: React.FC<{ labelDisplay?: 'responsive' | 'icon' | 'label' }> = ({ labelDisplay }) => {
  const [dos, setDos] = useState(true);
  const [paper, setPaper] = useState(false);
  const items: DisplayMenuItem[] = [
    { id: 'dos', label: 'DOS', checked: dos, onChange: setDos },
    { id: 'paper', label: 'PAPER', checked: paper, onChange: setPaper, disabled: !dos, hint: dos ? undefined : 'Needs DOS on' },
  ];
  return (
    <>
      <button>before</button>
      <DisplayMenu items={items} labelDisplay={labelDisplay} />
      <button>after</button>
    </>
  );
};

describe('DisplayMenu', () => {
  it('renders a closed trigger named by its label', () => {
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Display' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens a dialog of switches named by the label', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    const dialog = screen.getByRole('dialog', { name: 'Display' });
    // The open popover hides the rest of the page from assistive tech.
    expect(screen.getByRole('button', { name: 'Display', hidden: true })).toHaveAttribute('aria-expanded', 'true');
    const switches = within(dialog).getAllByRole('switch');
    expect(switches).toHaveLength(2);
    expect(within(dialog).getByRole('switch', { name: 'DOS' })).toBeChecked();
    expect(within(dialog).getByRole('switch', { name: 'PAPER' })).not.toBeChecked();
  });

  it('toggles through the consumer state and stays open', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    await user.click(screen.getByRole('switch', { name: 'PAPER' }));
    expect(screen.getByRole('switch', { name: 'PAPER' })).toBeChecked();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('disables a row and links its hint as the description', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    await user.click(screen.getByRole('switch', { name: 'DOS' }));
    const paper = screen.getByRole('switch', { name: 'PAPER' });
    expect(paper).toBeDisabled();
    expect(paper).toHaveAccessibleDescription('Needs DOS on');
  });

  it('keyboard: Enter opens, Escape closes and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Display' });
    trigger.focus();
    await user.keyboard('{Enter}');
    const dialog = screen.getByRole('dialog');
    // Focus lands on the first switch, so Space toggles it without a Tab.
    await waitFor(() => expect(within(dialog).getByRole('switch', { name: 'DOS' })).toHaveFocus());
    await user.keyboard(' ');
    expect(within(dialog).getByRole('switch', { name: 'DOS' })).not.toBeChecked();
    await user.keyboard(' ');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('opening focuses the first enabled switch, skipping disabled rows', async () => {
    const user = userEvent.setup();
    render(
      <DisplayMenu
        items={[
          { id: 'a', label: 'OFF', checked: false, onChange: () => {}, disabled: true },
          { id: 'b', label: 'ON', checked: false, onChange: () => {} },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Display' }));
    await waitFor(() => expect(screen.getByRole('switch', { name: 'ON' })).toHaveFocus());
  });

  it('keyboard: Space on a focused switch toggles it', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    screen.getByRole('switch', { name: 'PAPER' }).focus();
    await user.keyboard(' ');
    expect(screen.getByRole('switch', { name: 'PAPER' })).toBeChecked();
  });

  it('labelDisplay sets the modifier class', () => {
    const { rerender } = render(<Harness />);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveClass('eidotter-display-menu--responsive');
    rerender(<Harness labelDisplay="icon" />);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveClass('eidotter-display-menu--icon');
  });

  it('a custom label names the trigger and the panel', async () => {
    const user = userEvent.setup();
    render(<DisplayMenu label="Theme" items={[{ id: 'a', label: 'PAPER', checked: false, onChange: () => {} }]} />);
    await user.click(screen.getByRole('button', { name: 'Theme' }));
    expect(screen.getByRole('dialog', { name: 'Theme' })).toBeInTheDocument();
  });

  it('CSS: text never below the 16px floor, no hex colours', () => {
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/font-size:\s*(?!\s|var\(--typography-font-size-text-base)/);
  });
});
