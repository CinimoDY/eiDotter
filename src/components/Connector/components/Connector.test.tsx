import React from 'react';
import { render } from '@testing-library/react';
import { Connector } from './Connector';

function stubRect(el: Element | null, x: number, y: number, w: number, h: number) {
  if (!el) return;
  (el as HTMLElement).getBoundingClientRect = () =>
    ({ x, y, width: w, height: h, top: y, left: x, right: x + w, bottom: y + h, toJSON: () => ({}) }) as DOMRect;
}

function renderConnector(opts: { sway?: boolean } = {}) {
  const sourceRef = React.createRef<HTMLDivElement>();
  const t1 = React.createRef<HTMLDivElement>();
  const t2 = React.createRef<HTMLDivElement>();
  const utils = render(
    <div style={{ position: 'relative' }}>
      <div ref={sourceRef} />
      <div ref={t1} />
      <div ref={t2} />
      <Connector
        sourceRef={sourceRef}
        targets={[{ ref: t1, color: '#55FFFF' }, { ref: t2 }]}
        sway={opts.sway ?? false}
      />
    </div>,
  );
  const svg = utils.container.querySelector('.eidotter-connector')!;
  return { ...utils, svg, sourceRef, t1, t2 };
}

describe('Connector', () => {
  it('renders a decorative, non-interactive svg', () => {
    const { svg } = renderConnector();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg.getAttribute('class')).toContain('pointer-events-none');
  });

  it('renders one path and one gradient per target', () => {
    const { svg } = renderConnector();
    expect(svg.querySelectorAll('path')).toHaveLength(2);
    expect(svg.querySelectorAll('linearGradient')).toHaveLength(2);
  });

  it('uses the target colour as the gradient end stop, currentColor otherwise', () => {
    const { svg } = renderConnector();
    const grads = svg.querySelectorAll('linearGradient');
    expect(grads[0].querySelectorAll('stop')[1].getAttribute('stop-color')).toBe('#55FFFF');
    expect(grads[1].querySelectorAll('stop')[1].getAttribute('stop-color')).toBe('currentColor');
    // Base stop is always the themeable amber (currentColor).
    expect(grads[0].querySelectorAll('stop')[0].getAttribute('stop-color')).toBe('currentColor');
  });

  it('draws ribbon paths once positions are measurable', () => {
    const { svg, sourceRef, t1, t2 } = renderConnector();
    stubRect(svg, 0, 0, 400, 300);
    stubRect(sourceRef.current, 10, 140, 40, 40);
    stubRect(t1.current, 300, 40, 80, 24);
    stubRect(t2.current, 300, 220, 80, 24);

    window.dispatchEvent(new Event('resize'));

    const paths = svg.querySelectorAll('path');
    expect(paths[0].getAttribute('d')).toMatch(/^M /);
    expect(paths[1].getAttribute('d')).toMatch(/^M /);
    // Gradient coords were anchored to the measured source/attach points.
    expect(svg.querySelector('linearGradient')!.getAttribute('x1')).not.toBeNull();
  });

  it('clears the path for a zero-sized target', () => {
    const { svg, sourceRef, t1, t2 } = renderConnector();
    stubRect(svg, 0, 0, 400, 300);
    stubRect(sourceRef.current, 10, 140, 40, 40);
    stubRect(t1.current, 300, 40, 80, 24);
    stubRect(t2.current, 0, 0, 0, 0); // collapsed

    window.dispatchEvent(new Event('resize'));

    const paths = svg.querySelectorAll('path');
    expect(paths[0].getAttribute('d')).toMatch(/^M /);
    expect(paths[1].getAttribute('d')).toBe('');
  });

  it('gives each Connector instance unique gradient ids', () => {
    const { container } = render(
      <>
        {[0, 1].map((k) => {
          const s = React.createRef<HTMLDivElement>();
          const t = React.createRef<HTMLDivElement>();
          return (
            <div key={k} style={{ position: 'relative' }}>
              <div ref={s} />
              <div ref={t} />
              <Connector sourceRef={s} targets={[{ ref: t }]} sway={false} />
            </div>
          );
        })}
      </>,
    );
    const ids = Array.from(container.querySelectorAll('linearGradient')).map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length); // all unique
  });

  it('runs the sway loop without crashing and cleans up on unmount', () => {
    const { unmount, svg, sourceRef, t1 } = (() => {
      const sourceRef = React.createRef<HTMLDivElement>();
      const t1 = React.createRef<HTMLDivElement>();
      const utils = render(
        <div style={{ position: 'relative' }}>
          <div ref={sourceRef} />
          <div ref={t1} />
          <Connector sourceRef={sourceRef} targets={[{ ref: t1, color: '#55FF55' }]} sway />
        </div>,
      );
      return { ...utils, svg: utils.container.querySelector('.eidotter-connector')!, sourceRef, t1 };
    })();
    stubRect(svg, 0, 0, 400, 300);
    stubRect(sourceRef.current, 10, 140, 40, 40);
    stubRect(t1.current, 300, 40, 80, 24);
    window.dispatchEvent(new Event('resize'));
    expect(() => unmount()).not.toThrow();
  });
});
