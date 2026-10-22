import React, { createRef, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DosDialog } from './DosDialog';

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
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('eidotter-dialog__footer');
      expect(footer).toContainElement(screen.getByRole('button', { name: 'Save' }));
      expect(footer.previousElementSibling).toHaveClass('eidotter-dialog__body');
    });

    it('renders no footer when omitted', () => {
      render(<Harness />);
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
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
    // long enough to observe which classes the shell applies.
    const originalMatchMedia = window.matchMedia;
    beforeEach(() => {
      (globalThis as unknown as { CSSTransition: unknown }).CSSTransition = class {};
      (HTMLElement.prototype as unknown as { getAnimations: () => unknown[] }).getAnimations =
        () => [{ finished: new Promise(() => {}) }];
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
        () => [{ finished }];
      rerender(<DosDialog open={false} aria-label="x">c</DosDialog>);
      expect(panel()).toHaveClass('eidotter-dialog--exiting');
      await act(async () => { finish(); await finished; });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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

    it('panel pops in/out (CRT turn-on); the scrim fades', () => {
      expect(rule('.eidotter-dialog--entering')).toMatch(/animation:\s*eidotter-pop-in\s+150ms/);
      expect(rule('.eidotter-dialog--exiting')).toMatch(/animation:\s*eidotter-pop-out\s+150ms/);
      expect(rule('.eidotter-dialog__overlay--entering')).toMatch(/animation:\s*eidotter-fade-in\b/);
      expect(rule('.eidotter-dialog__overlay--exiting')).toMatch(/animation:\s*eidotter-fade-out\b/);
      expect(css).not.toMatch(/translate/);
    });
  });
});
