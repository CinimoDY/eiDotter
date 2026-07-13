import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Mark } from './Mark';

// jsdom returns all-zero rects and the repo's ResizeObserver mock never fires
// its callback (setupTests.ts) — so we stub getBoundingClientRect and trigger a
// re-measure via a window resize event.
function stubRect(el: Element, x: number, y: number, w: number, h: number) {
  (el as HTMLElement).getBoundingClientRect = () =>
    ({ x, y, width: w, height: h, top: y, left: x, right: x + w, bottom: y + h, toJSON: () => ({}) }) as DOMRect;
}

describe('Mark', () => {
  it('renders with defaults (labelled img + morphing blob)', () => {
    const { container } = render(<Mark />);
    expect(screen.getByRole('img', { name: 'eiDotter' })).toBeInTheDocument();
    expect(container.querySelector('.eidotter-mark__blob')).toHaveClass('eidotter-mark__blob--morph');
  });

  it('is decorative when label is empty', () => {
    const { container } = render(<Mark label="" />);
    const root = container.querySelector('.eidotter-mark')!;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('aria-label');
  });

  it('drops the morph class when morph={false}', () => {
    const { container } = render(<Mark morph={false} />);
    expect(container.querySelector('.eidotter-mark__blob')).not.toHaveClass('eidotter-mark__blob--morph');
  });

  it('renders no svg without arms', () => {
    const { container } = render(<Mark />);
    expect(container.querySelector('.eidotter-mark__arms')).toBeNull();
  });

  it('renders the svg with zero paths under jsdom zero rects (no crash)', () => {
    const scopeRef = React.createRef<HTMLDivElement>();
    const { container } = render(
      <div ref={scopeRef}>
        <Mark arms={{ scopeRef }} />
        <span className="eidotter-header__category">a</span>
      </div>,
    );
    const svg = container.querySelector('.eidotter-mark__arms');
    expect(svg).toBeInTheDocument();
    expect(svg!.querySelectorAll('path')).toHaveLength(0);
  });

  it('draws one arm path per discovered badge (happy path)', () => {
    const scopeRef = React.createRef<HTMLDivElement>();
    const { container } = render(
      <div ref={scopeRef} style={{ position: 'relative' }}>
        <Mark arms={{ scopeRef }} />
        <span className="eidotter-header__category">a</span>
        <span className="eidotter-header__category">b</span>
        <span className="eidotter-header__category">c</span>
      </div>,
    );
    const root = container.querySelector('.eidotter-mark')!;
    stubRect(root, 0, 0, 40, 40);
    container.querySelectorAll('.eidotter-header__category').forEach((b, i) => stubRect(b, 100, 20 + i * 40, 40, 20));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    const svg = container.querySelector('.eidotter-mark__arms')!;
    const pathEls = svg.querySelectorAll('path');
    expect(pathEls).toHaveLength(3);
    pathEls.forEach((p) => expect(p.getAttribute('d')).toMatch(/^M /));
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg.getAttribute('class')).toContain('pointer-events-none');
  });

  it('redraws when the badge set changes', async () => {
    const scopeRef = React.createRef<HTMLDivElement>();
    const Harness = ({ n }: { n: number }) => (
      <div ref={scopeRef} style={{ position: 'relative' }}>
        <Mark arms={{ scopeRef }} />
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} className="eidotter-header__category">{i}</span>
        ))}
      </div>
    );
    const { container, rerender } = render(<Harness n={3} />);
    const root = container.querySelector('.eidotter-mark')!;
    const stubAll = () => {
      stubRect(root, 0, 0, 40, 40);
      container.querySelectorAll('.eidotter-header__category').forEach((b, i) => stubRect(b, 100, 20 + i * 40, 40, 20));
    };
    stubAll();
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(container.querySelectorAll('.eidotter-mark__arms path')).toHaveLength(3);

    rerender(<Harness n={4} />);
    stubAll(); // stub the newly-added 4th badge too

    await waitFor(() =>
      expect(container.querySelectorAll('.eidotter-mark__arms path')).toHaveLength(4),
    );
  });

  it('renders svg with no paths when the selector matches nothing', () => {
    const scopeRef = React.createRef<HTMLDivElement>();
    const { container } = render(
      <div ref={scopeRef}>
        <Mark arms={{ scopeRef, targetSelector: '.nope' }} />
      </div>,
    );
    expect(container.querySelector('.eidotter-mark__arms')).toBeInTheDocument();
    expect(container.querySelectorAll('.eidotter-mark__arms path')).toHaveLength(0);
  });

  it('uses targetRefs in preference to selector discovery', () => {
    const scopeRef = React.createRef<HTMLDivElement>();
    const badgeRef = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <div ref={scopeRef}>
        <Mark arms={{ scopeRef, targetRefs: [badgeRef as React.RefObject<HTMLElement | null>] }} />
        <span ref={badgeRef} className="not-a-category">x</span>
      </div>,
    );
    const root = container.querySelector('.eidotter-mark')!;
    stubRect(root, 0, 0, 40, 40);
    stubRect(badgeRef.current!, 100, 20, 40, 20);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(container.querySelectorAll('.eidotter-mark__arms path')).toHaveLength(1);
  });
});
