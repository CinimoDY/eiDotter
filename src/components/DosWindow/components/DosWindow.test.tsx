import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import '@testing-library/jest-dom';
import { DosWindow } from './DosWindow';
import { IconButton } from '../../IconButton/components/IconButton';

describe('DosWindow', () => {
  it('renders the frame, strip, title, marker and body', () => {
    const { container } = render(<DosWindow title="Report">Body copy</DosWindow>);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('eidotter-window');
    expect(root.querySelector('.eidotter-window__strip')).toBeInTheDocument();
    expect(screen.getByText('Report')).toHaveClass('eidotter-window__title');
    expect(root.querySelector('.eidotter-window__marker')).toHaveTextContent('▸');
    expect(root.querySelector('.eidotter-window__marker')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Body copy').closest('.eidotter-window__body')).toBeInTheDocument();
  });

  it('omits the marker when marker={false}', () => {
    const { container } = render(<DosWindow title="Report" marker={false}>x</DosWindow>);
    expect(container.querySelector('.eidotter-window__marker')).toBeNull();
  });

  it('renders no strip without title or controls', () => {
    const { container } = render(<DosWindow>x</DosWindow>);
    expect(container.querySelector('.eidotter-window__strip')).toBeNull();
  });

  it('is active by default and dims when inactive', () => {
    const { container, rerender } = render(<DosWindow title="A">x</DosWindow>);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-active', 'true');
    expect(root).not.toHaveClass('eidotter-window--inactive');
    rerender(<DosWindow title="A" active={false}>x</DosWindow>);
    expect(root).toHaveAttribute('data-active', 'false');
    expect(root).toHaveClass('eidotter-window--inactive');
  });

  it('renders consumer controls in the strip end slot', () => {
    render(
      <DosWindow
        title="A"
        controls={<IconButton icon="Close" label="Close window" />}
      >
        x
      </DosWindow>,
    );
    const btn = screen.getByRole('button', { name: 'Close window' });
    expect(btn.closest('.eidotter-window__controls')).toBeInTheDocument();
  });

  it('renders the footer after the body', () => {
    const { container } = render(<DosWindow title="A" footer="Footer">x</DosWindow>);
    const footer = container.querySelector('.eidotter-window__footer');
    expect(footer).toHaveTextContent('Footer');
    expect(container.querySelector('.eidotter-window__body')?.nextElementSibling).toBe(footer);
  });

  it('merges className and passes through attributes', () => {
    const { container } = render(
      <DosWindow className="extra" data-testid="w" aria-label="Win">x</DosWindow>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('eidotter-window', 'extra');
    expect(root).toHaveAttribute('aria-label', 'Win');
  });

  it('forwards the ref to the root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<DosWindow ref={ref}>x</DosWindow>);
    expect(ref.current).toHaveClass('eidotter-window');
  });

  it('renders on the server (no hooks)', () => {
    const html = renderToString(<DosWindow title="SSR" footer="f">body</DosWindow>);
    expect(html).toContain('eidotter-window__strip');
    expect(html).toContain('SSR');
  });
});
