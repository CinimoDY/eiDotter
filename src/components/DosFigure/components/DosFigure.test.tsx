import React from 'react';
import { render, screen } from '@testing-library/react';
import { DosFigure } from './DosFigure';

describe('DosFigure', () => {
  it('renders subject content', () => {
    render(
      <DosFigure
        subject={<pre data-testid="subject">HELLO</pre>}
        ariaLabel="Hello placeholder"
      />,
    );
    expect(screen.getByTestId('subject')).toBeInTheDocument();
  });

  it('renders title chrome when provided', () => {
    render(<DosFigure title="PRESENTATION.014" subject={<span />} ariaLabel="test" />);
    expect(screen.getByText('PRESENTATION.014')).toBeInTheDocument();
  });

  it('renders a resolution tag', () => {
    render(<DosFigure resolution="640×480" subject={<span />} ariaLabel="test" />);
    expect(screen.getByText('640×480')).toBeInTheDocument();
  });

  it('renders caption as a figcaption and wires aria-describedby', () => {
    const { container } = render(
      <DosFigure
        subject={<span />}
        caption="Painted-screen study"
      />,
    );
    const figure = container.querySelector('figure');
    const figcaption = container.querySelector('figcaption');
    expect(figcaption).not.toBeNull();
    expect(figcaption?.textContent).toContain('Painted-screen study');
    expect(figure).toHaveAttribute('aria-describedby', figcaption?.id);
  });

  it('renders pins at the given coordinates', () => {
    render(
      <DosFigure
        subject={<span />}
        ariaLabel="pinned"
        pins={[
          { x: 30, y: 70, label: 'ALPHA' },
          { x: 80, y: 20, label: 'BETA' },
        ]}
      />,
    );
    const alpha = screen.getByText('ALPHA').closest('li');
    const beta = screen.getByText('BETA').closest('li');
    expect(alpha).toHaveStyle({ left: '30%', top: '70%' });
    expect(beta).toHaveStyle({ left: '80%', top: '20%' });
  });

  it('clamps out-of-range pin positions to 0..100', () => {
    render(
      <DosFigure
        subject={<span />}
        ariaLabel="clamped"
        pins={[
          { x: -20, y: 200, label: 'OOB' },
        ]}
      />,
    );
    const pin = screen.getByText('OOB').closest('li');
    expect(pin).toHaveStyle({ left: '0%', top: '100%' });
  });

  it('omits the animated class when animated=false', () => {
    const { container } = render(
      <DosFigure subject={<span />} ariaLabel="static" animated={false} />,
    );
    expect(container.firstChild).not.toHaveClass('eidotter-dos-figure--animated');
  });

  it('exposes the figure to AT as role="img"', () => {
    render(<DosFigure subject={<span />} ariaLabel="a hero" />);
    const fig = screen.getByRole('img', { name: 'a hero' });
    expect(fig.tagName).toBe('FIGURE');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<DosFigure subject={<span />} ariaLabel="ref" ref={ref} />);
    expect(ref.current?.tagName).toBe('FIGURE');
  });
});
