import React, { createRef } from 'react';
import { render, screen, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { Stat } from './Stat';

describe('Stat', () => {
  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stat ref={ref} label="Total" value="42" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('rendering', () => {
    it('renders label and value', () => {
      render(<Stat label="Total" value="42" />);
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<Stat label="Count" value={1234} />);
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Stat label="Test" value="0" className="custom-class" />);
      const stat = screen.getByText('Test').closest('.eidotter-stat');
      expect(stat).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it('renders with default md size', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat).toBeInTheDocument();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Stat label="Label" value="Value" size={size} />);
      expect(screen.getByText('Label').closest('.eidotter-stat')).toBeInTheDocument();
    });

    it.each(['small', 'medium', 'large'] as const)(
      'supports backward-compatible %s alias',
      (alias) => {
        render(<Stat label="Label" value="Value" size={alias} />);
        expect(screen.getByText('Label').closest('.eidotter-stat')).toBeInTheDocument();
      },
    );
  });

  describe('trend indicator', () => {
    it('renders without trend by default', () => {
      render(<Stat label="Label" value="Value" />);
      expect(screen.queryByText('▲')).not.toBeInTheDocument();
      expect(screen.queryByText('▼')).not.toBeInTheDocument();
    });

    it('renders up trend icon', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      expect(screen.getByText('▲')).toBeInTheDocument();
    });

    it('renders down trend icon', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      expect(screen.getByText('▼')).toBeInTheDocument();
    });

    it('renders neutral trend icon', () => {
      render(<Stat label="Label" value="Value" trend="neutral" />);
      expect(screen.getByText('►')).toBeInTheDocument();
    });

    it('renders trend value', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+15%" />);
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('trend icon has aria-hidden', () => {
      render(<Stat label="Label" value="Value" trend="up" />);
      expect(screen.getByText('▲').closest('[aria-hidden="true"]')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('trend has aria-label for screen readers', () => {
      render(<Stat label="Label" value="Value" trend="up" trendValue="+10%" />);
      expect(screen.getByLabelText('Trend: increasing, +10%')).toBeInTheDocument();
    });

    it('trend aria-label works without trendValue', () => {
      render(<Stat label="Label" value="Value" trend="down" />);
      expect(screen.getByLabelText('Trend: decreasing')).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      render(<Stat label="Label" value="Value" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat?.tagName).toBe('DIV');
    });
  });

  describe('scramble', () => {
    it('renders value normally without scramble', () => {
      render(<Stat label="Total" value="42" />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('accepts scramble prop without error', () => {
      expect(() => {
        render(<Stat label="Total" value="42" scramble />);
      }).not.toThrow();
    });

    // DMNC-1609: the scramble must not reach the server HTML or the first
    // client render, or hydration mismatches (React error 418).
    it('ships the target value, not glyphs, in server HTML', () => {
      const html = renderToString(<Stat label="Total" value="1,234" scramble />);
      expect(html).toContain('1,234');
      expect(html).not.toMatch(/[░▒▓█│┤┐└┴┬├─┼]/);
      expect(html).toBe(renderToString(<Stat label="Total" value="1,234" />));
    });

    it('hydrates the server HTML without a mismatch', async () => {
      const el = <Stat label="Total" value="1,234" scramble />;
      const container = document.createElement('div');
      container.innerHTML = renderToString(el);
      document.body.appendChild(container);
      const onRecoverableError = jest.fn();
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(async () => {
          root = hydrateRoot(container, el, { onRecoverableError });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(consoleError).not.toHaveBeenCalled();
      } finally {
        consoleError.mockRestore();
        act(() => root?.unmount());
        container.remove();
      }
    });
  });

  describe('class composition', () => {
    it('applies eidotter-stat base class and custom class', () => {
      render(<Stat label="Label" value="Value" size="lg" className="extra" />);
      const stat = screen.getByText('Label').closest('.eidotter-stat');
      expect(stat).toHaveClass('eidotter-stat');
      expect(stat).toHaveClass('extra');
    });
  });

  describe('unit, note and target slots', () => {
    it('renders unit after the value in the value line', () => {
      render(<Stat label="Sample" value="104" unit="units" />);
      const unit = screen.getByText('units');
      const value = screen.getByText('104');
      expect(unit).toHaveClass('eidotter-stat__unit');
      expect(value).toContainElement(unit);
      expect(value.lastElementChild).toBe(unit);
    });

    it('lets the unit drop under the value in a narrow card (DMNC-1610)', () => {
      render(<Stat label="Sample" value="104" unit="units" />);
      const unit = screen.getByText('units');
      const value = screen.getByText('104');
      // A space before the unit is the line-break opportunity; nothing pins one line.
      expect(value.textContent).toBe('104 units');
      expect(unit.textContent).toBe(' units');
      [value, unit].forEach((el) => {
        expect(el).not.toHaveClass('whitespace-nowrap');
        expect(el).not.toHaveClass('truncate');
      });
      expect(unit).not.toHaveClass('ml-1');
    });

    it('renders note in the muted text class', () => {
      render(<Stat label="Sample" value="104" note="sample note" />);
      expect(screen.getByText('sample note')).toHaveClass('text-dos-text-muted', 'eidotter-stat__note');
    });

    it('renders target as supplied text', () => {
      render(<Stat label="Sample" value="104" target="Ziel 70-140" />);
      expect(screen.getByText('Ziel 70-140')).toHaveClass('eidotter-stat__target');
    });

    it('renders none of the new slots by default', () => {
      const { container } = render(<Stat label="Sample" value="104" />);
      expect(container.querySelector('.eidotter-stat__unit')).toBeNull();
      expect(container.querySelector('.eidotter-stat__note')).toBeNull();
      expect(container.querySelector('.eidotter-stat__target')).toBeNull();
    });
  });

  // cn() used to read text-dos-text-<size> / text-dos-display-<size> as a
  // colour and drop the label/value colour at every size.
  describe('colour and size both survive cn()', () => {
    it.each([
      ['sm', 'text-dos-text-xs', 'text-dos-display-xs'],
      ['md', 'text-dos-text-sm', 'text-dos-display-sm'],
      ['lg', 'text-dos-text-md', 'text-dos-display-md'],
    ] as const)('size %s keeps label and value colour', (size, labelSize, valueSize) => {
      render(<Stat label="Label" value="7" size={size} />);
      const label = screen.getByText('Label');
      const value = screen.getByText('7');
      expect(label).toHaveClass('text-dos-text-brand', labelSize);
      expect(value).toHaveClass('text-dos-text-accent', valueSize);
    });
  });
});
