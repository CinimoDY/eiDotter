import React, { createRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HoldToComplete } from './HoldToComplete';

const Tile = (
  props: Partial<React.ComponentProps<typeof HoldToComplete>> & {
    onHold?: () => void;
  }
) => (
  <HoldToComplete onHold={props.onHold ?? (() => undefined)} {...props}>
    <div style={{ width: 100, height: 100 }}>TILE</div>
  </HoldToComplete>
);

describe('HoldToComplete', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Tile ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders children inside a button role', () => {
    render(<Tile aria-label="Complete" />);
    const btn = screen.getByRole('button', { name: 'Complete' });
    expect(btn).toHaveTextContent('TILE');
    expect(btn).toHaveAttribute('tabindex', '0');
  });

  it('completes via keyboard (Enter and Space), ignoring auto-repeat', () => {
    const onHold = jest.fn();
    render(<Tile onHold={onHold} />);
    const btn = screen.getByRole('button');

    fireEvent.keyDown(btn, { key: 'Enter' });
    fireEvent.keyDown(btn, { key: ' ' });
    expect(onHold).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(btn, { key: 'Enter', repeat: true });
    expect(onHold).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(btn, { key: 'a' });
    expect(onHold).toHaveBeenCalledTimes(2);
  });

  it('fires onTap on a plain click that did not complete a hold', () => {
    const onHold = jest.fn();
    const onTap = jest.fn();
    render(<Tile onHold={onHold} onTap={onTap} />);
    const btn = screen.getByRole('button');

    act(() => {
      fireEvent.pointerDown(btn);
      fireEvent.pointerUp(btn);
      fireEvent.click(btn);
    });

    expect(onTap).toHaveBeenCalledTimes(1);
    expect(onHold).not.toHaveBeenCalled();
  });

  it('completes after holding for the full duration', () => {
    const onHold = jest.fn();
    render(<Tile onHold={onHold} holdDuration={700} />);
    const btn = screen.getByRole('button');

    act(() => {
      fireEvent.pointerDown(btn);
    });
    expect(onHold).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(onHold).toHaveBeenCalledTimes(1);
  });

  it('calls the latest onHold when the prop changes mid-hold', () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = render(<Tile onHold={first} holdDuration={700} />);
    const btn = screen.getByRole('button');

    act(() => {
      fireEvent.pointerDown(btn);
    });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // Consumer re-renders with a fresh handler partway through the hold.
    rerender(<Tile onHold={second} holdDuration={700} />);
    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('reverses an early release without completing', () => {
    const onHold = jest.fn();
    render(<Tile onHold={onHold} holdDuration={700} />);
    const btn = screen.getByRole('button');

    act(() => {
      fireEvent.pointerDown(btn);
    });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    act(() => {
      fireEvent.pointerUp(btn);
    });
    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(onHold).not.toHaveBeenCalled();
  });

  it('reports progress to onHoldProgress during the hold', () => {
    const onHoldProgress = jest.fn();
    render(<Tile onHoldProgress={onHoldProgress} holdDuration={700} />);
    const btn = screen.getByRole('button');

    act(() => {
      fireEvent.pointerDown(btn);
    });
    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(onHoldProgress).toHaveBeenCalled();
    const values = onHoldProgress.mock.calls.map((c) => c[0] as number);
    expect(values.some((v) => v > 0 && v < 1)).toBe(true);
    // Resets to 0 on completion.
    expect(values[values.length - 1]).toBe(0);
  });

  it('does nothing when disabled', () => {
    const onHold = jest.fn();
    const onTap = jest.fn();
    render(<Tile onHold={onHold} onTap={onTap} disabled />);
    const btn = screen.getByRole('button');

    expect(btn).toHaveAttribute('tabindex', '-1');
    expect(btn).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(btn, { key: 'Enter' });
    act(() => {
      fireEvent.pointerDown(btn);
      jest.advanceTimersByTime(800);
    });
    act(() => {
      fireEvent.click(btn);
    });

    expect(onHold).not.toHaveBeenCalled();
    expect(onTap).not.toHaveBeenCalled();
  });
});
