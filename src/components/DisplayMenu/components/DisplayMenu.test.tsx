import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DisplayMenu, type DisplayMenuItem } from './DisplayMenu';

const css = readFileSync(join(__dirname, 'DisplayMenu.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** Consumer-owned state, like a site: DOS and LIGHT, LIGHT disabled while DOS is off (exercises the disabled row the component supports). */
const Harness: React.FC<{ labelDisplay?: 'responsive' | 'icon' | 'label' }> = ({ labelDisplay }) => {
  const [dos, setDos] = useState(true);
  const [light, setLight] = useState(false);
  const items: DisplayMenuItem[] = [
    { id: 'dos', label: 'DOS', checked: dos, onChange: setDos },
    { id: 'light', label: 'LIGHT', checked: dos ? light : true, onChange: setLight, disabled: !dos, hint: dos ? undefined : 'Not available here' },
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
    expect(screen.queryByRole('group')).toBeNull();
  });

  it('opens a group of switches named by the label', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    const dialog = screen.getByRole('group', { name: 'Display' });
    // Non-modal (DMNC-1629): the page stays in the accessibility tree while the panel is open.
    expect(screen.getByRole('button', { name: 'Display' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'before' })).toBeVisible();
    const switches = within(dialog).getAllByRole('switch');
    expect(switches).toHaveLength(2);
    expect(within(dialog).getByRole('switch', { name: 'DOS' })).toBeChecked();
    expect(within(dialog).getByRole('switch', { name: 'LIGHT' })).not.toBeChecked();
  });

  it('toggles through the consumer state and stays open', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    await user.click(screen.getByRole('switch', { name: 'LIGHT' }));
    expect(screen.getByRole('switch', { name: 'LIGHT' })).toBeChecked();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('disables a row and links its hint as the description', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Display' }));
    await user.click(screen.getByRole('switch', { name: 'DOS' }));
    const light = screen.getByRole('switch', { name: 'LIGHT' });
    expect(light).toBeDisabled();
    expect(light).toBeChecked();
    expect(light).toHaveAccessibleDescription('Not available here');
  });

  it('keyboard: Enter opens, Escape closes and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Display' });
    trigger.focus();
    await user.keyboard('{Enter}');
    const dialog = screen.getByRole('group');
    // Focus lands on the first switch, so Space toggles it without a Tab.
    await waitFor(() => expect(within(dialog).getByRole('switch', { name: 'DOS' })).toHaveFocus());
    await user.keyboard(' ');
    expect(within(dialog).getByRole('switch', { name: 'DOS' })).not.toBeChecked();
    await user.keyboard(' ');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
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
    screen.getByRole('switch', { name: 'LIGHT' }).focus();
    await user.keyboard(' ');
    expect(screen.getByRole('switch', { name: 'LIGHT' })).toBeChecked();
  });

  /** A real pointer press: pointer, mouse and click events on one target, like React Aria's own tests. */
  function press(target: Element) {
    fireEvent.pointerDown(target, { button: 0, pointerId: 1, pointerType: 'mouse' });
    fireEvent.mouseDown(target, { button: 0 });
    if (target instanceof HTMLElement) target.focus();
    fireEvent.pointerUp(target, { button: 0, pointerId: 1, pointerType: 'mouse' });
    fireEvent.mouseUp(target, { button: 0 });
    // detail 1 = a real pointer click; detail 0 is what React Aria treats as a keyboard "virtual" click.
    fireEvent.click(target, { button: 0, detail: 1 });
  }

  describe('non-modal (DMNC-1629)', () => {
    it('does not lock page scroll or hide the page while open', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole('button', { name: 'Display' }));
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(document.documentElement.style.overflow).toBe('');
      expect(document.body.style.overflow).toBe('');
      expect(screen.getByRole('button', { name: 'before' })).not.toHaveAttribute('aria-hidden');
      expect(screen.getByRole('button', { name: 'before' }).closest('[aria-hidden="true"], [inert]')).toBeNull();
      expect(screen.queryByTestId('underlay')).toBeNull();
    });

    it('a pointer press outside closes it', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole('button', { name: 'Display' }));
      expect(screen.getByRole('group')).toBeInTheDocument();
      press(document.body);
      await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
    });

    it('pressing the trigger again closes it instead of reopening', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      const trigger = screen.getByRole('button', { name: 'Display' });
      await user.click(trigger);
      expect(screen.getByRole('group')).toBeInTheDocument();
      press(trigger);
      await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(trigger).toHaveFocus());
    });

    it('Tab past the last switch leaves the panel, closes it and lands after the trigger', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      const trigger = screen.getByRole('button', { name: 'Display' });
      trigger.focus();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.getByRole('switch', { name: 'DOS' })).toHaveFocus());
      await user.tab();
      expect(screen.getByRole('switch', { name: 'LIGHT' })).toHaveFocus();
      await user.tab();
      await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
      expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
    });

    it('Tab out closes it even when the trigger is the last tabbable element on the page', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button>before</button>
          <DisplayMenu items={[{ id: 'a', label: 'DOS', checked: true, onChange: () => {} }]} />
        </>,
      );
      const trigger = screen.getByRole('button', { name: 'Display' });
      trigger.focus();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(screen.getByRole('switch', { name: 'DOS' })).toHaveFocus());
      await user.tab();
      await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
    });

    it('scrolling the page closes it', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole('button', { name: 'Display' }));
      expect(screen.getByRole('group')).toBeInTheDocument();
      fireEvent.scroll(document);
      await waitFor(() => expect(screen.queryByRole('group')).toBeNull());
    });
  });

  it('labelDisplay sets the modifier class', () => {
    const { rerender } = render(<Harness />);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveClass('eidotter-display-menu--responsive');
    rerender(<Harness labelDisplay="icon" />);
    expect(screen.getByRole('button', { name: 'Display' })).toHaveClass('eidotter-display-menu--icon');
  });

  it('a custom label names the trigger and the panel', async () => {
    const user = userEvent.setup();
    render(<DisplayMenu label="Theme" items={[{ id: 'a', label: 'LIGHT', checked: false, onChange: () => {} }]} />);
    await user.click(screen.getByRole('button', { name: 'Theme' }));
    expect(screen.getByRole('group', { name: 'Theme' })).toBeInTheDocument();
  });

  it('CSS: text never below the 16px floor, no hex colours', () => {
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/font-size:\s*(?!\s|var\(--typography-font-size-text-base)/);
  });
});
