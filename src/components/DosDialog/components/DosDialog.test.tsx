import React, { createRef, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DosDialog } from './DosDialog';
import { IconButton } from '../../IconButton/components/IconButton';

function Harness(props: Partial<React.ComponentProps<typeof DosDialog>> & { initialOpen?: boolean }) {
  const { initialOpen = true, ...rest } = props;
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <DosDialog open={open} onOpenChange={setOpen} head={{ title: 'System' }} {...rest}>
        <p>Body copy</p>
        <button>Inside</button>
      </DosDialog>
    </>
  );
}

const overlay = () => document.querySelector('.eidotter-dialog__overlay') as HTMLElement;
const panel = () => document.querySelector('.eidotter-dialog') as HTMLElement;

describe('DosDialog', () => {
  describe('open state', () => {
    it('renders a dialog when open', () => {
      render(<Harness />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Body copy').closest('.eidotter-dialog__body')).toBeInTheDocument();
    });

    it('renders nothing when closed', () => {
      render(<Harness initialOpen={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens when the controlled prop flips to true', () => {
      render(<Harness initialOpen={false} />);
      fireEvent.click(screen.getByText('open'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('forwards ref to the dialog element', () => {
      const ref = createRef<HTMLElement>();
      render(<DosDialog ref={ref} open aria-label="x">c</DosDialog>);
      expect(ref.current).toBe(screen.getByRole('dialog'));
      expect(ref.current).toHaveClass('eidotter-dialog__container');
    });
  });

  describe('dismissal', () => {
    it('closes on Escape', async () => {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole('button', { name: 'Inside' }));
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes on backdrop click when dismissable (default)', async () => {
      const onOpenChange = jest.fn();
      render(<DosDialog open onOpenChange={onOpenChange} aria-label="x">c</DosDialog>);
      // React Aria dismisses on an outside pointer interaction that starts on the overlay.
      fireEvent.pointerDown(overlay(), { button: 0, pointerId: 1, pointerType: 'mouse' });
      fireEvent.pointerUp(overlay(), { button: 0, pointerId: 1, pointerType: 'mouse' });
      fireEvent.mouseDown(overlay(), { button: 0 });
      fireEvent.mouseUp(overlay(), { button: 0 });
      fireEvent.click(overlay(), { button: 0 });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('ignores backdrop clicks when isDismissable is false', () => {
      const onOpenChange = jest.fn();
      render(<DosDialog open onOpenChange={onOpenChange} isDismissable={false} aria-label="x">c</DosDialog>);
      fireEvent.pointerDown(overlay(), { button: 0, pointerId: 1, pointerType: 'mouse' });
      fireEvent.pointerUp(overlay(), { button: 0, pointerId: 1, pointerType: 'mouse' });
      fireEvent.mouseDown(overlay(), { button: 0 });
      fireEvent.mouseUp(overlay(), { button: 0 });
      fireEvent.click(overlay(), { button: 0 });
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('does not close when the body is clicked', () => {
      const onOpenChange = jest.fn();
      render(<DosDialog open onOpenChange={onOpenChange} aria-label="x"><p>inner</p></DosDialog>);
      fireEvent.click(screen.getByText('inner'));
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe('head strip', () => {
    it('renders the title as an h2 with the ▸ marker and names the dialog by it', () => {
      render(<Harness head={{ title: 'Settings' }} />);
      const heading = screen.getByRole('heading', { level: 2, name: 'Settings' });
      expect(heading).toHaveClass('eidotter-dialog__title');
      expect(heading.closest('.eidotter-dialog__head')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-dialog__marker')).toHaveTextContent('▸');
      expect(document.querySelector('.eidotter-dialog__marker')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
    });

    it('omits the marker when marker is false', () => {
      render(<Harness head={{ title: 'Settings', marker: false }} />);
      expect(document.querySelector('.eidotter-dialog__marker')).toBeNull();
    });

    it('renders the end slot', () => {
      render(<Harness head={{ title: 'Settings', end: <button>Close</button> }} />);
      const end = document.querySelector('.eidotter-dialog__end');
      expect(end).toContainElement(screen.getByRole('button', { name: 'Close' }));
    });

    it('prefers an explicit aria-label over the title', () => {
      render(<Harness aria-label="Explicit" head={{ title: 'Settings' }} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Explicit');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
    });

    it('hides a decorative strip from assistive tech and renders no heading', () => {
      render(<Harness aria-label="Palette" head={{ title: 'Jump to', decorative: true }} />);
      expect(document.querySelector('.eidotter-dialog__head')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-dialog__title')?.tagName).toBe('SPAN');
    });

    it('renders the title as an h2 by default', () => {
      render(<Harness head={{ title: 'Settings' }} />);
      expect(screen.getByRole('heading', { name: 'Settings', level: 2 })).toBeInTheDocument();
    });

    it('renders the title at headingLevel and still names the dialog', () => {
      render(<Harness head={{ title: 'Settings', headingLevel: 4 }} />);
      expect(screen.getByRole('heading', { name: 'Settings', level: 4 })).toBeInTheDocument();
      expect(document.querySelector('h2')).toBeNull();
      expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
    });

    it('honours headingLevel in inline mode', () => {
      render(<DosDialog open inline head={{ title: 'Preview', headingLevel: 3 }}>c</DosDialog>);
      expect(screen.getByRole('heading', { name: 'Preview', level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Preview' })).toBeInTheDocument();
    });

    it('falls back to h2 for an out-of-range headingLevel', () => {
      render(
        <DosDialog
          open
          inline
          head={{ title: 'Preview', headingLevel: 7 as unknown as 2 }}
        >
          c
        </DosDialog>,
      );
      expect(screen.getByRole('heading', { name: 'Preview', level: 2 })).toBeInTheDocument();
    });

    it('ignores headingLevel on a decorative head', () => {
      render(<Harness aria-label="Palette" head={{ title: 'Jump to', decorative: true, headingLevel: 3 }} />);
      expect(document.querySelector('.eidotter-dialog__title')?.tagName).toBe('SPAN');
    });

    it('accepts a ReactNode head and renders it inside the strip', () => {
      render(<Harness aria-label="Custom" head={<span data-testid="custom-head">CUSTOM</span>} />);
      expect(screen.getByTestId('custom-head').parentElement).toHaveClass('eidotter-dialog__head');
      expect(document.querySelector('.eidotter-dialog__marker')).toBeNull();
    });

    it('renders no strip when head is omitted', () => {
      render(<DosDialog open aria-label="x">c</DosDialog>);
      expect(document.querySelector('.eidotter-dialog__head')).toBeNull();
    });
  });

  describe('footer', () => {
    it('renders the footer slot after the body', () => {
      render(<Harness footer={<button>Save</button>} />);
      const footer = document.querySelector('.eidotter-dialog__footer') as HTMLElement;
      expect(footer.tagName).toBe('DIV');
      expect(footer).toContainElement(screen.getByRole('button', { name: 'Save' }));
      expect(footer.previousElementSibling).toHaveClass('eidotter-dialog__body');
      // No extra landmark: the shell footer is not a contentinfo.
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('renders no footer when omitted', () => {
      render(<Harness />);
      expect(document.querySelector('.eidotter-dialog__footer')).toBeNull();
    });
  });

  describe('placement and size', () => {
    it('defaults to center placement and md size', () => {
      render(<Harness />);
      expect(overlay()).toHaveClass('eidotter-dialog__overlay--center');
      expect(panel()).toHaveClass('eidotter-dialog--center', 'eidotter-dialog--md');
    });

    it('applies top placement', () => {
      render(<Harness placement="top" />);
      expect(overlay()).toHaveClass('eidotter-dialog__overlay--top');
      expect(panel()).toHaveClass('eidotter-dialog--top');
    });

    it.each(['sm', 'md', 'lg', 'full'] as const)('applies size %s', (size) => {
      render(<Harness size={size} />);
      expect(panel()).toHaveClass(`eidotter-dialog--${size}`);
    });

    it('merges className onto the container', () => {
      render(<Harness className="custom-box" />);
      expect(screen.getByRole('dialog')).toHaveClass('eidotter-dialog__container', 'custom-box');
    });
  });

  describe('motion', () => {
    // jsdom has no Web Animations API, so React Aria resolves the entering state
    // synchronously. Stub a never-finishing animation so the entering state holds
    // long enough to observe which classes the shell applies. React Aria 3.53+
    // only waits on animations whose playState is 'running'.
    const originalMatchMedia = window.matchMedia;
    beforeEach(() => {
      (globalThis as unknown as { CSSTransition: unknown }).CSSTransition = class {};
      (HTMLElement.prototype as unknown as { getAnimations: () => unknown[] }).getAnimations =
        () => [{ playState: 'running', finished: new Promise(() => {}) }];
    });
    afterEach(() => {
      delete (HTMLElement.prototype as unknown as { getAnimations?: unknown }).getAnimations;
      delete (globalThis as unknown as { CSSTransition?: unknown }).CSSTransition;
      window.matchMedia = originalMatchMedia;
    });

    const mockReducedMotion = (reduce: boolean) => {
      window.matchMedia = jest.fn().mockImplementation((query: string) => ({
        matches: reduce && query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    };

    it('applies the entering classes while the enter animation runs', () => {
      mockReducedMotion(false);
      render(<Harness />);
      expect(panel()).toHaveClass('eidotter-dialog--entering');
      expect(overlay()).toHaveClass('eidotter-dialog__overlay--entering');
    });

    it('skips the entering classes under prefers-reduced-motion', () => {
      mockReducedMotion(true);
      render(<Harness />);
      expect(panel()).not.toHaveClass('eidotter-dialog--entering');
      expect(overlay()).not.toHaveClass('eidotter-dialog__overlay--entering');
    });

    it('applies the exiting class while the exit animation runs, then unmounts once it settles', async () => {
      mockReducedMotion(false);
      let finish: () => void = () => {};
      const finished = new Promise<void>((r) => { finish = r; });
      const { rerender } = render(<DosDialog open aria-label="x">c</DosDialog>);
      (HTMLElement.prototype as unknown as { getAnimations: () => unknown[] }).getAnimations =
        () => [{ playState: 'running', finished }];
      rerender(<DosDialog open={false} aria-label="x">c</DosDialog>);
      expect(panel()).toHaveClass('eidotter-dialog--exiting');
      await act(async () => { finish(); await finished; });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('accessible-name warning', () => {
    let warn: jest.SpyInstance;
    beforeEach(() => { warn = jest.spyOn(console, 'warn').mockImplementation(() => {}); });
    afterEach(() => { warn.mockRestore(); });
    const named = () => warn.mock.calls.filter((c) => String(c[0]).includes('no accessible name'));

    it('warns when a ReactNode head leaves the dialog unnamed', () => {
      render(<DosDialog open head={<span>CUSTOM</span>}>c</DosDialog>);
      expect(named()).toHaveLength(1);
    });

    it('warns when a decorative head leaves the dialog unnamed', () => {
      render(<DosDialog open head={{ title: 'Jump to', decorative: true }}>c</DosDialog>);
      expect(named()).toHaveLength(1);
    });

    it('does not warn when the title, aria-label or aria-labelledby names it', () => {
      render(<DosDialog open head={{ title: 'Settings' }}>c</DosDialog>);
      render(<DosDialog open aria-label="Palette" head={<span>x</span>}>c</DosDialog>);
      render(<DosDialog open aria-labelledby="ext" head={{ title: 'x', decorative: true }}>c</DosDialog>);
      expect(named()).toHaveLength(0);
    });

    it('does not warn in production builds', () => {
      const prev = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      try {
        render(<DosDialog open head={<span>CUSTOM</span>}>c</DosDialog>);
      } finally {
        process.env.NODE_ENV = prev;
      }
      expect(named()).toHaveLength(0);
    });
  });

  describe('inline', () => {
    const InlineDemo = (props: Partial<React.ComponentProps<typeof DosDialog>>) => (
      <div data-testid="host">
        <DosDialog
          inline
          open
          head={{ title: 'System', end: <IconButton icon="Close" label="Close" /> }}
          footer={<span>F1 HELP</span>}
          {...props}
        >
          <p>Body copy</p>
          <button>Inside</button>
        </DosDialog>
      </div>
    );

    it('renders in place, without a portal, overlay or scrim', () => {
      render(<InlineDemo />);
      const host = screen.getByTestId('host');
      expect(host.querySelector('.eidotter-dialog__container')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-dialog__overlay')).toBeNull();
      // Nothing was portalled to body: the only body child is RTL's own container.
      expect(document.body.children).toHaveLength(1);
    });

    it('keeps the chrome markup and classes: panel, container, strip, end control, body, footer', () => {
      render(<InlineDemo />);
      const p = panel();
      expect(p).toHaveClass('eidotter-dialog', 'eidotter-dialog--md', 'eidotter-dialog--center', 'eidotter-dialog--inline');
      const container = p.querySelector(':scope > .eidotter-dialog__container') as HTMLElement;
      const head = container.querySelector(':scope > .eidotter-dialog__head') as HTMLElement;
      expect(head.querySelector('.eidotter-dialog__lead > .eidotter-dialog__marker')).toBeInTheDocument();
      expect(head.querySelector('h2.eidotter-dialog__title')).toHaveTextContent('System');
      expect(head.querySelector('.eidotter-dialog__end > .eidotter-icon-button')).toBeInTheDocument();
      expect(container.querySelector(':scope > .eidotter-dialog__body')).toHaveTextContent('Body copy');
      expect(container.querySelector(':scope > .eidotter-dialog__footer')).toHaveTextContent('F1 HELP');
    });

    it('is a named group, not a modal dialog', () => {
      render(<InlineDemo />);
      expect(screen.queryByRole('dialog')).toBeNull();
      const group = screen.getByRole('group', { name: 'System' });
      expect(group).toHaveClass('eidotter-dialog__container');
      expect(group).not.toHaveAttribute('aria-modal');
      expect(document.querySelector('[aria-modal]')).toBeNull();
    });

    it('Escape does nothing and onOpenChange is never called', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      render(<InlineDemo onOpenChange={onOpenChange} />);
      await user.click(screen.getByRole('button', { name: 'Inside' }));
      await user.keyboard('{Escape}');
      await user.click(document.body);
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.getByRole('group', { name: 'System' })).toBeInTheDocument();
    });

    it('does not trap focus: Tab moves past the last control', async () => {
      const user = userEvent.setup();
      render(<><InlineDemo /><button>After</button></>);
      await user.click(screen.getByRole('button', { name: 'Inside' }));
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });

    it('renders nothing when open is false', () => {
      render(<InlineDemo open={false} />);
      expect(document.querySelector('.eidotter-dialog')).toBeNull();
    });

    it('forwards ref to the container and merges className onto it', () => {
      const ref = createRef<HTMLElement>();
      render(<DosDialog ref={ref} inline open aria-label="x" className="extra">c</DosDialog>);
      expect(ref.current).toHaveClass('eidotter-dialog__container', 'extra');
      expect(ref.current).toHaveAttribute('aria-label', 'x');
    });

    it('does not warn when unnamed (a group needs no name)', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      try {
        render(<DosDialog inline open head={<span>CUSTOM</span>}>c</DosDialog>);
        expect(warn).not.toHaveBeenCalled();
      } finally {
        warn.mockRestore();
      }
    });

    it('emits the chrome in server HTML (no hydration needed)', () => {
      const html = renderToString(
        <DosDialog inline open head={{ title: 'Static' }} footer="F">body</DosDialog>,
      );
      expect(html).toContain('eidotter-dialog__container');
      expect(html).toContain('eidotter-dialog__head');
      expect(html).toContain('Static');
      expect(html).toContain('role="group"');
      expect(html).not.toContain('aria-modal');
      // The modal path renders nothing on the server, which is why inline exists.
      expect(renderToString(<DosDialog open aria-label="m">body</DosDialog>)).not.toContain('eidotter-dialog__container');
    });
  });

  describe('stylesheet contract', () => {
    const css = readFileSync(join(__dirname, 'DosDialog.css'), 'utf8');
    const rule = (sel: string) => {
      const m = css.match(new RegExp(sel.replace(/[.]/g, '\\.') + '\\s*\\{([^}]*)\\}'));
      return m ? m[1] : '';
    };

    it('title strip is dark with a yellow title and a dim-amber rule, not an amber fill', () => {
      const head = rule('.eidotter-dialog__head');
      expect(head).toMatch(/background-color:\s*var\(--color-semantic-background-primary\)/);
      expect(head).toMatch(/color:\s*var\(--color-semantic-text-accent\)/);
      expect(head).toMatch(/border-bottom:[^;]*var\(--color-semantic-border-brand-dim\)/);
      expect(head).not.toMatch(/background-brand/);
    });

    it('docks the last end IconButton flush in the corner, the same rule as DosWindow controls', () => {
      // Block: overhang the 4px strip padding (0px to the top border and to the rule).
      // Inline: overhang the full 12px strip padding (0px to the right border).
      const flushBlock = /margin-block:\s*calc\(-1 \* var\(--spacing-1, 4px\)\)/;
      const flushInline = /margin-inline-end:\s*calc\(-1 \* var\(--spacing-3, 12px\)\)/;
      expect(rule('.eidotter-dialog__head')).toMatch(/padding:\s*var\(--spacing-1, 4px\) var\(--spacing-3, 12px\)/);
      expect(rule('.eidotter-dialog__end > .eidotter-icon-button')).toMatch(flushBlock);
      expect(rule('.eidotter-dialog__end > .eidotter-icon-button:last-child')).toMatch(flushInline);

      const win = readFileSync(join(__dirname, '../../DosWindow/components/DosWindow.css'), 'utf8');
      const winRule = (sel: string) => {
        const m = win.match(new RegExp(sel.replace(/[.]/g, '\\.') + '\\s*\\{([^}]*)\\}'));
        return m ? m[1] : '';
      };
      expect(winRule('.eidotter-window__strip')).toMatch(/padding:\s*var\(--spacing-1, 4px\) var\(--spacing-3, 12px\)/);
      expect(winRule('.eidotter-window__controls > .eidotter-icon-button')).toMatch(flushBlock);
      expect(winRule('.eidotter-window__controls > .eidotter-icon-button:last-child')).toMatch(flushInline);
      expect(winRule('.eidotter-window__controls')).not.toMatch(/margin/);
    });

    it('panel pops in/out (CRT turn-on); the scrim fades', () => {
      expect(rule('.eidotter-dialog--entering')).toMatch(/animation:\s*eidotter-pop-in\s+150ms/);
      expect(rule('.eidotter-dialog--exiting')).toMatch(/animation:\s*eidotter-pop-out\s+150ms/);
      expect(rule('.eidotter-dialog__overlay--entering')).toMatch(/animation:\s*eidotter-fade-in\b/);
      expect(rule('.eidotter-dialog__overlay--exiting')).toMatch(/animation:\s*eidotter-fade-out\b/);
      expect(css).not.toMatch(/translate/);
    });
  });
});
