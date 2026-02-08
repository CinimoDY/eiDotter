import React from 'react';
import { render, act } from '@testing-library/react';
import { RetroEffects } from './RetroEffects';

// Helper to fire animationEnd with animationName (JSDOM doesn't have AnimationEvent)
const fireAnimationEnd = (element: HTMLElement, animationName: string) => {
  act(() => {
    const event = document.createEvent('Event');
    event.initEvent('animationend', true, true);
    (event as unknown as { animationName: string }).animationName = animationName;
    element.dispatchEvent(event);
  });
};

// Helper to fire transitionEnd (reduced-motion fallback path)
const fireTransitionEnd = (element: HTMLElement, propertyName: string) => {
  act(() => {
    const event = document.createEvent('Event');
    event.initEvent('transitionend', true, true);
    (event as unknown as { propertyName: string }).propertyName = propertyName;
    element.dispatchEvent(event);
  });
};

describe('RetroEffects', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects');
      expect(container).toBeInTheDocument();
    });

    it('has aria-hidden for decorative content', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      render(<RetroEffects className="custom-class" />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('scanlines effect', () => {
    it('renders scanlines by default', () => {
      render(<RetroEffects />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('renders scanlines when enabled', () => {
      render(<RetroEffects scanlines />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('does not render scanlines when disabled', () => {
      render(<RetroEffects scanlines={false} />);
      const scanlines = document.querySelector('.retro-effects__scanlines');
      expect(scanlines).not.toBeInTheDocument();
    });
  });

  describe('glow effect', () => {
    it('renders glow by default', () => {
      render(<RetroEffects />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('renders glow when enabled', () => {
      render(<RetroEffects glow />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('does not render glow when disabled', () => {
      render(<RetroEffects glow={false} />);
      const glow = document.querySelector('.retro-effects__glow');
      expect(glow).not.toBeInTheDocument();
    });
  });

  describe('flicker effect', () => {
    it('renders flicker by default', () => {
      render(<RetroEffects />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('renders flicker when enabled', () => {
      render(<RetroEffects flicker />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('does not render flicker when disabled', () => {
      render(<RetroEffects flicker={false} />);
      const flicker = document.querySelector('.retro-effects__flicker');
      expect(flicker).not.toBeInTheDocument();
    });
  });

  describe('intensity', () => {
    it('applies default intensity', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('1');
    });

    it('applies custom intensity', () => {
      render(<RetroEffects intensity={0.5} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0.5');
    });

    it('applies zero intensity', () => {
      render(<RetroEffects intensity={0} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0');
    });
  });

  describe('effect combinations', () => {
    it('renders all effects when all are enabled', () => {
      render(<RetroEffects scanlines glow flicker />);
      expect(document.querySelector('.retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).toBeInTheDocument();
    });

    it('renders no effects when all are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only scanlines when others are disabled', () => {
      render(<RetroEffects scanlines glow={false} flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only glow when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow flicker={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only flicker when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).toBeInTheDocument();
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(<RetroEffects className="extra" />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('retro-effects');
      expect(container).toHaveClass('extra');
    });
  });

  describe('bloom effect', () => {
    it('does not render bloom by default', () => {
      render(<RetroEffects />);
      const bloom = document.querySelector('.retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });

    it('renders bloom when enabled', () => {
      render(<RetroEffects bloom />);
      const bloom = document.querySelector('.retro-effects__bloom');
      expect(bloom).toBeInTheDocument();
    });

    it('does not render bloom when explicitly disabled', () => {
      render(<RetroEffects bloom={false} />);
      const bloom = document.querySelector('.retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });
  });

  describe('power state', () => {
    it('renders in powered-on state by default', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.retro-effects');
      expect(container).not.toHaveClass('retro-effects--off');
      expect(container).not.toHaveClass('retro-effects--powering-off');
      expect(container).not.toHaveClass('retro-effects--powering-on');
    });

    it('renders effect layers when powered on', () => {
      render(<RetroEffects powered />);
      expect(document.querySelector('.retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).toBeInTheDocument();
    });

    it('starts in off state when powered=false initially', () => {
      render(<RetroEffects powered={false} />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('retro-effects--off');
    });

    it('does not render effect layers when powered off', () => {
      render(<RetroEffects powered={false} />);
      expect(document.querySelector('.retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('applies powering-off class when transitioning from on to off', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('retro-effects--powering-off');
    });

    it('applies powering-on class when transitioning from off to on', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.retro-effects');
      expect(container).toHaveClass('retro-effects--powering-on');
    });

    it('transitions to off state after power-off animation ends', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(container).toHaveClass('retro-effects--off');
      expect(container).not.toHaveClass('retro-effects--powering-off');
    });

    it('transitions to on state after power-on animation ends', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(container).not.toHaveClass('retro-effects--powering-on');
      expect(container).not.toHaveClass('retro-effects--off');
    });

    it('ignores animation end events from other animations', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      // Fire an unrelated animation end - should be ignored
      fireAnimationEnd(container, 'some-other-animation');
      // Should still be in powering-off state, not transitioned to off
      expect(container).toHaveClass('retro-effects--powering-off');
      expect(container).not.toHaveClass('retro-effects--off');
    });

    it('does not render bloom when powered off', () => {
      render(<RetroEffects bloom powered={false} />);
      const bloom = document.querySelector('.retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });

    it('renders bloom when powered on and bloom enabled', () => {
      render(<RetroEffects bloom powered />);
      const bloom = document.querySelector('.retro-effects__bloom');
      expect(bloom).toBeInTheDocument();
    });
  });

  describe('power callbacks', () => {
    it('calls onPowerStateChange with powering-off when transitioning from on to off', () => {
      const onPowerStateChange = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      rerender(<RetroEffects powered={false} onPowerStateChange={onPowerStateChange} />);
      expect(onPowerStateChange).toHaveBeenCalledWith('powering-off');
    });

    it('calls onPowerStateChange with powering-on when transitioning from off to on', () => {
      const onPowerStateChange = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerStateChange={onPowerStateChange} />);
      rerender(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      expect(onPowerStateChange).toHaveBeenCalledWith('powering-on');
    });

    it('calls onPowerStateChange with off after power-off animation ends', () => {
      const onPowerStateChange = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      rerender(<RetroEffects powered={false} onPowerStateChange={onPowerStateChange} />);
      onPowerStateChange.mockClear();
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(onPowerStateChange).toHaveBeenCalledWith('off');
    });

    it('calls onPowerStateChange with on after power-on animation ends', () => {
      const onPowerStateChange = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerStateChange={onPowerStateChange} />);
      rerender(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      onPowerStateChange.mockClear();
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(onPowerStateChange).toHaveBeenCalledWith('on');
    });

    it('calls onPowerOff when power-off animation ends', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(onPowerOff).toHaveBeenCalled();
    });

    it('calls onPowerOn when power-on animation ends', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(onPowerOn).toHaveBeenCalled();
    });

    it('does not call onPowerOn for unrelated animations', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'some-other-animation');
      expect(onPowerOn).not.toHaveBeenCalled();
    });

    it('does not call onPowerOff for unrelated animations', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'some-other-animation');
      expect(onPowerOff).not.toHaveBeenCalled();
    });

    it('does not call callbacks on initial render', () => {
      const onPowerStateChange = jest.fn();
      const onPowerOn = jest.fn();
      const onPowerOff = jest.fn();
      render(
        <RetroEffects
          powered
          onPowerStateChange={onPowerStateChange}
          onPowerOn={onPowerOn}
          onPowerOff={onPowerOff}
        />
      );
      expect(onPowerStateChange).not.toHaveBeenCalled();
      expect(onPowerOn).not.toHaveBeenCalled();
      expect(onPowerOff).not.toHaveBeenCalled();
    });
  });

  describe('reduced motion (transitionEnd fallback)', () => {
    it('settles to off state via transitionEnd when powering off', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container).toHaveClass('retro-effects--powering-off');
      fireTransitionEnd(container, 'opacity');
      expect(container).toHaveClass('retro-effects--off');
      expect(container).not.toHaveClass('retro-effects--powering-off');
    });

    it('settles to on state via transitionEnd when powering on', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      expect(container).toHaveClass('retro-effects--powering-on');
      fireTransitionEnd(container, 'opacity');
      expect(container).not.toHaveClass('retro-effects--powering-on');
      expect(container).not.toHaveClass('retro-effects--off');
    });

    it('calls onPowerOff via transitionEnd', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerOff).toHaveBeenCalled();
    });

    it('calls onPowerOn via transitionEnd', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerOn).toHaveBeenCalled();
    });

    it('ignores transitionEnd for non-opacity properties', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'transform');
      expect(onPowerOff).not.toHaveBeenCalled();
      expect(container).toHaveClass('retro-effects--powering-off');
    });

    it('ignores transitionEnd when not in a powering state', () => {
      const onPowerStateChange = jest.fn();
      render(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      const container = document.querySelector('.retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerStateChange).not.toHaveBeenCalled();
    });
  });
});
