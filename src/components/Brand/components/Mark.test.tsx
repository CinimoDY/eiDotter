import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Mark } from './Mark';
import { Logo } from './Logo';

// jsdom returns all-zero rects and the repo's ResizeObserver mock never fires
// its callback (setupTests.ts) — so we stub getBoundingClientRect and trigger a
// re-measure via a window resize event.
function stubRect(el: Element, x: number, y: number, w: number, h: number) {
  (el as HTMLElement).getBoundingClientRect = () =>
    ({ x, y, width: w, height: h, top: y, left: x, right: x + w, bottom: y + h, toJSON: () => ({}) }) as DOMRect;
}

describe('Mark', () => {
  it('renders with defaults (labelled img + breathing, glowing logo svg)', () => {
    const { container } = render(<Mark />);
    expect(screen.getByRole('img', { name: 'eiDotter' })).toBeInTheDocument();
    const root = container.querySelector('.eidotter-mark')!;
    expect(root).toHaveClass('eidotter-mark--breath');
    expect(root).toHaveClass('eidotter-mark--glow');
    expect(container.querySelector('.eidotter-mark__blob')).toBeNull();
    const svg = container.querySelector('svg.eidotter-mark__logo')!;
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '8 7 22 22');
    // The root div owns the accessible name; the drawing is decorative.
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg.querySelector('title')).toBeNull();
  });

  it('keeps a single img role (the root) even though it renders an svg', () => {
    render(<Mark />);
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('is decorative when label is empty', () => {
    const { container } = render(<Mark label="" />);
    const root = container.querySelector('.eidotter-mark')!;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('aria-label');
  });

  it('drops the breath class when morph={false} (morph is the breath alias)', () => {
    const { container } = render(<Mark morph={false} />);
    expect(container.querySelector('.eidotter-mark')).not.toHaveClass('eidotter-mark--breath');
    expect(container.querySelector('.eidotter-mark')).toHaveClass('eidotter-mark--glow');
  });

  it('drops the glow class when glow={false}', () => {
    const { container } = render(<Mark glow={false} />);
    expect(container.querySelector('.eidotter-mark')).not.toHaveClass('eidotter-mark--glow');
    expect(container.querySelector('.eidotter-mark')).toHaveClass('eidotter-mark--breath');
  });

  it('forwards the ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Mark ref={ref} />);
    expect(ref.current).toHaveClass('eidotter-mark');
  });

  it('renders no arms svg without arms', () => {
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
    // Arms leave from the ring's outer edge (radius = 40 * 9.25/22 ~ 16.8px), not the centre.
    pathEls.forEach((p) => {
      const [, sx, sy] = p.getAttribute('d')!.split(' ').map(Number);
      expect(Math.hypot(sx - 20, sy - 20)).toBeCloseTo((40 * 9.25) / 22, 1);
    });
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

// DMNC-1586: Logo and Mark are one drawing. Same paths, same d attributes,
// same fills; only the useId-namespaced gradient ids differ.
describe('Logo / Mark geometry parity', () => {
  const shape = (svg: Element) =>
    Array.from(svg.querySelectorAll('path')).map((p) => ({
      d: p.getAttribute('d'),
      fill: (p.getAttribute('fill') ?? '').replace(/url\(#[^)]*\)/, 'url(#gradient)'),
      opacity: p.getAttribute('opacity'),
    }));

  it('renders identical paths in Logo and Mark', () => {
    const { container: logoC } = render(<Logo />);
    const { container: markC } = render(<Mark />);
    const logoSvg = logoC.querySelector('svg')!;
    const markSvg = markC.querySelector('svg.eidotter-mark__logo')!;
    const logoShape = shape(logoSvg);
    expect(logoShape).toHaveLength(40); // 2 halo discs + 34 ring rects + yolk + 2 highlights + specular
    expect(shape(markSvg)).toEqual(logoShape);
  });

  it('shares the same gradient definitions (lit yolk included)', () => {
    const stops = (svg: Element) =>
      Array.from(svg.querySelectorAll('radialGradient')).map((g) => [
        g.getAttribute('gradientTransform'),
        Array.from(g.querySelectorAll('stop')).map((s) => s.outerHTML),
      ]);
    const { container: logoC } = render(<Logo />);
    const { container: markC } = render(<Mark />);
    expect(stops(markC.querySelector('svg.eidotter-mark__logo')!)).toEqual(stops(logoC.querySelector('svg')!));
  });
});
