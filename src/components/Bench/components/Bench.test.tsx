import React from 'react';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Bench } from './Bench';
import { Badge } from '../../Badge';

const css = readFileSync(join(__dirname, 'Bench.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

const pair = [
  { label: 'Before', content: <img src="before.png" alt="Home, before" />, tone: 'before' as const },
  { label: 'After', content: <img src="after.png" alt="Home, after" />, tone: 'after' as const },
];

describe('Bench', () => {
  it('is built on DosWindow, with the title as a heading after the ▸ marker', () => {
    const { container } = render(<Bench title="Home, 1280" panes={pair} />);
    const root = container.firstElementChild!;
    expect(root).toHaveClass('eidotter-window', 'eidotter-bench');
    expect(root.querySelector('.eidotter-window__marker')).toHaveTextContent('▸');
    // one marker only (DosWindow's), not a second one from Bench
    expect(root.textContent!.match(/▸/g)).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3, name: 'Home, 1280' })).toHaveClass('eidotter-bench__title');
  });

  it('headingLevel changes the title element', () => {
    render(<Bench title="T" headingLevel={2} panes={pair} />);
    expect(screen.getByRole('heading', { level: 2, name: 'T' })).toBeInTheDocument();
  });

  it('renders chips in the strip end slot', () => {
    const { container } = render(
      <Bench title="T" panes={pair} chips={<><Badge size="sm">retro</Badge><Badge size="sm" variant="warning">warn</Badge></>} />,
    );
    const chips = container.querySelector('.eidotter-window__controls .eidotter-bench__chips')!;
    expect(chips.querySelectorAll('.eidotter-badge')).toHaveLength(2);
  });

  it('renders no chips wrapper or note when absent', () => {
    const { container } = render(<Bench title="T" panes={pair} />);
    expect(container.querySelector('.eidotter-bench__chips')).toBeNull();
    expect(container.querySelector('.eidotter-window__controls')).toBeNull();
    expect(container.querySelector('.eidotter-bench__note')).toBeNull();
  });

  it('renders the note above the panes', () => {
    const { container } = render(<Bench title="T" note="Muted note." panes={pair} />);
    const body = container.querySelector('.eidotter-window__body')!;
    expect(body.firstElementChild).toHaveClass('eidotter-bench__note');
    expect(body.firstElementChild).toHaveTextContent('Muted note.');
    expect(body.children[1]).toHaveClass('eidotter-bench__panes');
  });

  it('renders one pane per entry with its label, and no divider elements between them', () => {
    const { container } = render(<Bench title="T" panes={pair} />);
    const panes = container.querySelector('.eidotter-bench__panes')!;
    expect(Array.from(panes.children).every((el) => el.classList.contains('eidotter-bench__pane'))).toBe(true);
    expect(panes.children).toHaveLength(2);
    expect(container.querySelectorAll('.eidotter-bench__label')[1]).toHaveTextContent('After');
    expect(panes).not.toHaveClass('eidotter-bench__panes--single');
  });

  it('marks the tone on each pane (after = accent label)', () => {
    const { container } = render(<Bench title="T" panes={[...pair, { label: 'Other', content: null }]} />);
    const panes = container.querySelectorAll('.eidotter-bench__pane');
    expect(panes[0]).toHaveClass('eidotter-bench__pane--before');
    expect(panes[1]).toHaveClass('eidotter-bench__pane--after');
    expect(panes[2]).toHaveClass('eidotter-bench__pane--neutral');
    expect(css).toMatch(/\.eidotter-bench__pane--after \.eidotter-bench__label\s*\{\s*color:\s*var\(--color-semantic-text-accent\)/);
  });

  it('one pane renders single-column', () => {
    const { container } = render(<Bench title="T" panes={[pair[1]]} />);
    expect(container.querySelector('.eidotter-bench__panes')).toHaveClass('eidotter-bench__panes--single');
  });

  it('frames are keyboard-scrollable and named', () => {
    render(<Bench title="Home, 1280" panes={pair} />);
    const frames = screen.getAllByRole('group');
    expect(frames).toHaveLength(2);
    expect(frames[0]).toHaveAttribute('tabindex', '0');
    expect(frames[0]).toHaveAccessibleName('Home, 1280, Before');
    expect(frames[0]).toHaveClass('eidotter-bench__frame');
  });

  it('frame names fall back to the label, then frameLabel wins', () => {
    render(
      <Bench
        title={<span>Rich</span>}
        panes={[
          { label: 'Before', content: null },
          { label: <em>After</em>, content: null },
          { label: 'X', content: null, frameLabel: 'Custom frame' },
        ]}
      />,
    );
    const frames = screen.getAllByRole('group');
    expect(frames[0]).toHaveAccessibleName('Before');
    expect(frames[1]).toHaveAccessibleName('Scrollable pane');
    expect(frames[2]).toHaveAccessibleName('Custom frame');
  });

  it('phone frames get the centred 390px wrapper', () => {
    const { container } = render(<Bench title="T" panes={[{ label: 'P', content: null, frame: 'phone' }]} />);
    const frame = container.querySelector('.eidotter-bench__frame')!;
    expect(frame).toHaveClass('eidotter-bench__frame--phone');
    expect(frame.parentElement).toHaveClass('eidotter-bench__phone');
    expect(css).toMatch(/\.eidotter-bench__frame--phone\s*\{[^}]*max-width:\s*390px/);
  });

  it('maxHeight sets --eidotter-bench-max-height; ref and attributes reach the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Bench ref={ref} data-testid="b" title="T" panes={pair} maxHeight="400px" style={{ color: 'inherit' }} />);
    expect(ref.current).toBe(screen.getByTestId('b'));
    expect(ref.current!.style.getPropertyValue('--eidotter-bench-max-height')).toBe('400px');
    expect(ref.current!.style.color).toBe('inherit');
  });

  it('stacks below 760px of bench width and pairs the panes above it (container query)', () => {
    expect(css).toMatch(/\.eidotter-bench\s*\{\s*container:\s*eidotter-bench\s*\/\s*inline-size;/);
    expect(css).toMatch(/\.eidotter-bench__panes\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
    const block = css.match(/@container eidotter-bench \(min-width: 760px\)\s*\{([\s\S]*)\}\s*$/);
    expect(block).not.toBeNull();
    expect(block![1]).toMatch(/grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  });

  it('paints the pane divider with the grid gap (border-brand-dim background), not elements', () => {
    expect(css).toMatch(/\.eidotter-bench__panes\s*\{[^}]*gap:\s*var\(--border-width-thin, 1px\);[^}]*background-color:\s*var\(--color-semantic-border-brand-dim\)/);
  });
});
