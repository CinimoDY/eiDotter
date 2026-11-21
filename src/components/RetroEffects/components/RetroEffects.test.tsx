import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { RetroEffects, RETRO_GLOW_FILTER_ID } from './RetroEffects';
import { DosDialog } from '../../DosDialog';

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
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toBeInTheDocument();
    });

    it('has aria-hidden for decorative content', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      render(<RetroEffects className="custom-class" />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('scanlines effect', () => {
    it('renders scanlines by default', () => {
      render(<RetroEffects />);
      const scanlines = document.querySelector('.eidotter-retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('renders scanlines when enabled', () => {
      render(<RetroEffects scanlines />);
      const scanlines = document.querySelector('.eidotter-retro-effects__scanlines');
      expect(scanlines).toBeInTheDocument();
    });

    it('does not render scanlines when disabled', () => {
      render(<RetroEffects scanlines={false} />);
      const scanlines = document.querySelector('.eidotter-retro-effects__scanlines');
      expect(scanlines).not.toBeInTheDocument();
    });
  });

  describe('glow effect', () => {
    it('renders glow by default', () => {
      render(<RetroEffects />);
      const glow = document.querySelector('.eidotter-retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('renders glow when enabled', () => {
      render(<RetroEffects glow />);
      const glow = document.querySelector('.eidotter-retro-effects__glow');
      expect(glow).toBeInTheDocument();
    });

    it('does not render glow when disabled', () => {
      render(<RetroEffects glow={false} />);
      const glow = document.querySelector('.eidotter-retro-effects__glow');
      expect(glow).not.toBeInTheDocument();
    });
  });

  describe('flicker effect', () => {
    it('renders flicker by default', () => {
      render(<RetroEffects />);
      const flicker = document.querySelector('.eidotter-retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('renders flicker when enabled', () => {
      render(<RetroEffects flicker />);
      const flicker = document.querySelector('.eidotter-retro-effects__flicker');
      expect(flicker).toBeInTheDocument();
    });

    it('does not render flicker when disabled', () => {
      render(<RetroEffects flicker={false} />);
      const flicker = document.querySelector('.eidotter-retro-effects__flicker');
      expect(flicker).not.toBeInTheDocument();
    });
  });

  describe('intensity', () => {
    it('applies default intensity', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('1');
    });

    it('applies custom intensity', () => {
      render(<RetroEffects intensity={0.5} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0.5');
    });

    it('applies zero intensity', () => {
      render(<RetroEffects intensity={0} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      expect(container.style.getPropertyValue('--retro-intensity')).toBe('0');
    });
  });

  describe('effect combinations', () => {
    it('renders all effects when all are enabled', () => {
      render(<RetroEffects scanlines glow flicker />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).toBeInTheDocument();
    });

    it('renders no effects when all are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker={false} />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only scanlines when others are disabled', () => {
      render(<RetroEffects scanlines glow={false} flicker={false} />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only glow when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow flicker={false} />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('renders only flicker when others are disabled', () => {
      render(<RetroEffects scanlines={false} glow={false} flicker />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).toBeInTheDocument();
    });
  });

  describe('class composition', () => {
    it('combines all classes correctly', () => {
      render(<RetroEffects className="extra" />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveClass('eidotter-retro-effects');
      expect(container).toHaveClass('extra');
    });
  });

  describe('bloom effect', () => {
    it('does not render bloom by default', () => {
      render(<RetroEffects />);
      const bloom = document.querySelector('.eidotter-retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });

    it('renders bloom when enabled', () => {
      render(<RetroEffects bloom />);
      const bloom = document.querySelector('.eidotter-retro-effects__bloom');
      expect(bloom).toBeInTheDocument();
    });

    it('does not render bloom when explicitly disabled', () => {
      render(<RetroEffects bloom={false} />);
      const bloom = document.querySelector('.eidotter-retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });
  });

  describe('power state', () => {
    it('renders in powered-on state by default', () => {
      render(<RetroEffects />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).not.toHaveClass('eidotter-retro-effects--off');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-off');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-on');
    });

    it('renders effect layers when powered on', () => {
      render(<RetroEffects powered />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).toBeInTheDocument();
    });

    it('starts in off state when powered=false initially', () => {
      render(<RetroEffects powered={false} />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveClass('eidotter-retro-effects--off');
    });

    it('does not render effect layers when powered off', () => {
      render(<RetroEffects powered={false} />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).not.toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).not.toBeInTheDocument();
    });

    it('applies powering-off class when transitioning from on to off', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveClass('eidotter-retro-effects--powering-off');
    });

    it('applies powering-on class when transitioning from off to on', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.eidotter-retro-effects');
      expect(container).toHaveClass('eidotter-retro-effects--powering-on');
    });

    it('transitions to off state after power-off animation ends', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(container).toHaveClass('eidotter-retro-effects--off');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-off');
    });

    it('transitions to on state after power-on animation ends', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-on');
      expect(container).not.toHaveClass('eidotter-retro-effects--off');
    });

    it('ignores animation end events from other animations', () => {
      const { rerender } = render(<RetroEffects powered />);
      rerender(<RetroEffects powered={false} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      // Fire an unrelated animation end - should be ignored
      fireAnimationEnd(container, 'some-other-animation');
      // Should still be in powering-off state, not transitioned to off
      expect(container).toHaveClass('eidotter-retro-effects--powering-off');
      expect(container).not.toHaveClass('eidotter-retro-effects--off');
    });

    it('does not render bloom when powered off', () => {
      render(<RetroEffects bloom powered={false} />);
      const bloom = document.querySelector('.eidotter-retro-effects__bloom');
      expect(bloom).not.toBeInTheDocument();
    });

    it('renders bloom when powered on and bloom enabled', () => {
      render(<RetroEffects bloom powered />);
      const bloom = document.querySelector('.eidotter-retro-effects__bloom');
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
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(onPowerStateChange).toHaveBeenCalledWith('off');
    });

    it('calls onPowerStateChange with on after power-on animation ends', () => {
      const onPowerStateChange = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerStateChange={onPowerStateChange} />);
      rerender(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      onPowerStateChange.mockClear();
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(onPowerStateChange).toHaveBeenCalledWith('on');
    });

    it('calls onPowerOff when power-off animation ends', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-off');
      expect(onPowerOff).toHaveBeenCalled();
    });

    it('calls onPowerOn when power-on animation ends', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'retro-power-on');
      expect(onPowerOn).toHaveBeenCalled();
    });

    it('does not call onPowerOn for unrelated animations', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireAnimationEnd(container, 'some-other-animation');
      expect(onPowerOn).not.toHaveBeenCalled();
    });

    it('does not call onPowerOff for unrelated animations', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
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
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      expect(container).toHaveClass('eidotter-retro-effects--powering-off');
      fireTransitionEnd(container, 'opacity');
      expect(container).toHaveClass('eidotter-retro-effects--off');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-off');
    });

    it('settles to on state via transitionEnd when powering on', () => {
      const { rerender } = render(<RetroEffects powered={false} />);
      rerender(<RetroEffects powered />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      expect(container).toHaveClass('eidotter-retro-effects--powering-on');
      fireTransitionEnd(container, 'opacity');
      expect(container).not.toHaveClass('eidotter-retro-effects--powering-on');
      expect(container).not.toHaveClass('eidotter-retro-effects--off');
    });

    it('calls onPowerOff via transitionEnd', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerOff).toHaveBeenCalled();
    });

    it('calls onPowerOn via transitionEnd', () => {
      const onPowerOn = jest.fn();
      const { rerender } = render(<RetroEffects powered={false} onPowerOn={onPowerOn} />);
      rerender(<RetroEffects powered onPowerOn={onPowerOn} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerOn).toHaveBeenCalled();
    });

    it('ignores transitionEnd for non-opacity properties', () => {
      const onPowerOff = jest.fn();
      const { rerender } = render(<RetroEffects powered onPowerOff={onPowerOff} />);
      rerender(<RetroEffects powered={false} onPowerOff={onPowerOff} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'transform');
      expect(onPowerOff).not.toHaveBeenCalled();
      expect(container).toHaveClass('eidotter-retro-effects--powering-off');
    });

    it('ignores transitionEnd when not in a powering state', () => {
      const onPowerStateChange = jest.fn();
      render(<RetroEffects powered onPowerStateChange={onPowerStateChange} />);
      const container = document.querySelector('.eidotter-retro-effects') as HTMLElement;
      fireTransitionEnd(container, 'opacity');
      expect(onPowerStateChange).not.toHaveBeenCalled();
    });
  });

  describe('boot sequence', () => {
    it('does not render the boot layer by default', () => {
      render(<RetroEffects />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
    });

    it('renders ignition line, panels, and glow when boot is set', () => {
      render(<RetroEffects boot />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      expect(document.querySelectorAll('.eidotter-retro-effects__boot-panel')).toHaveLength(2);
      expect(document.querySelector('.eidotter-retro-effects__boot-line')).not.toBeNull();
      expect(document.querySelector('.eidotter-retro-effects__boot-glow')).not.toBeNull();
    });

    it('removes the boot layer and fires onBootComplete when the glow animation ends', () => {
      const onBootComplete = jest.fn();
      render(<RetroEffects boot onBootComplete={onBootComplete} />);
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-glow');
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('ignores animationend from other boot animations', () => {
      render(<RetroEffects boot />);
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-line');
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
    });

    it('settles via the safety timeout if no animation event arrives', () => {
      jest.useFakeTimers();
      const onBootComplete = jest.fn();
      render(<RetroEffects boot onBootComplete={onBootComplete} />);
      act(() => {
        jest.advanceTimersByTime(1300);
      });
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      expect(onBootComplete).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });
  });

  describe('no-flash on first paint (server render)', () => {
    // The boot cover must be part of the server HTML so the page is never
    // painted before the turn-on animation. renderToString captures the initial
    // render (effects do not run) — i.e. exactly what reaches the browser before
    // hydration. Regression guard for DMNC-1184.
    it('ships the full-viewport boot cover in server HTML for non-gated boot', () => {
      const html = renderToString(<RetroEffects boot />);
      expect(html).toContain('eidotter-retro-effects__boot');
      expect(html).toContain('eidotter-retro-effects__boot-panel--top');
      expect(html).toContain('eidotter-retro-effects__boot-panel--bottom');
    });

    it('ships the boot cover in server HTML for bootOnce (no FOUC before hydration)', () => {
      // The gated skip/replay decision happens post-hydration; the cover must
      // still be in the server HTML so the first paint is never bare content.
      const html = renderToString(<RetroEffects boot bootOnce />);
      expect(html).toContain('eidotter-retro-effects__boot-panel--top');
      expect(html).toContain('eidotter-retro-effects__boot-panel--bottom');
    });

    it('does not ship the boot cover when boot is not set', () => {
      expect(renderToString(<RetroEffects />)).not.toContain('eidotter-retro-effects__boot');
    });

    // jsdom does not apply or lay out the .css, so the renderToString assertions
    // above only prove the cover *elements* are present — not that they fully
    // cover the viewport. This guards the geometry half of the fix (DMNC-1184):
    // a revert to height:50% would re-expose the center band during the open.
    it('keeps the boot panels full-height so the cover has no center gap', () => {
      const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      const panelRule = css.match(/\.eidotter-retro-effects__boot-panel\s*\{([^}]*)\}/);
      expect(panelRule).not.toBeNull();
      expect(panelRule![1]).toMatch(/height:\s*100%/);
      expect(panelRule![1]).not.toMatch(/height:\s*50%/);
    });

    it('ships the cover server-side even for an already-booted session (the deliberate bootOnce SSR trade)', () => {
      // The server can't read sessionStorage (no effects run during render), so a
      // gated boot ships the cover unconditionally and JS suppresses it
      // post-hydration. This documents the DMNC-1184 trade as intentional: a
      // returning visitor never flashes bare content; instead a full reload may
      // briefly show the blackout before teardown.
      try {
        window.sessionStorage.setItem('eidotter:retro-boot', '1');
        const html = renderToString(<RetroEffects boot bootOnce />);
        expect(html).toContain('eidotter-retro-effects__boot-panel--top');
      } finally {
        window.sessionStorage.clear();
      }
    });
  });

  describe('boot once per session (bootOnce)', () => {
    const DEFAULT_KEY = 'eidotter:retro-boot';
    const originalMatchMedia = window.matchMedia;

    // Replace matchMedia so prefersReducedMotion() reports `on`; restored in afterEach.
    const setReducedMotion = (on: boolean) => {
      window.matchMedia = jest.fn().mockImplementation((query: string) => ({
        matches: on && query.includes('reduced-motion'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    };

    afterEach(() => {
      window.sessionStorage.clear();
      window.matchMedia = originalMatchMedia;
      jest.useRealTimers();
    });

    it('plays on first mount with empty storage and records the flag on completion', () => {
      const onBootComplete = jest.fn();
      render(<RetroEffects boot bootOnce onBootComplete={onBootComplete} />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      // Flag is written on completion (not at play-start) so a discarded
      // StrictMode double-mount can't pre-suppress the real boot.
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBeNull();
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-glow');
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBe('1');
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('does not replay on a later mount when the flag is already set', () => {
      window.sessionStorage.setItem(DEFAULT_KEY, '1');
      const onBootComplete = jest.fn();
      render(<RetroEffects boot bootOnce onBootComplete={onBootComplete} />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      // Completion still signalled so consumers sequencing on it don't stall.
      expect(onBootComplete).toHaveBeenCalledTimes(1);
      // The skip path must not rewrite/clear the existing flag.
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBe('1');
    });

    it('respects a custom bootStorageKey', () => {
      window.sessionStorage.setItem(DEFAULT_KEY, '1');
      render(<RetroEffects boot bootOnce bootStorageKey="custom:key" />);
      // Default key is set but the custom key is empty, so it still plays.
      const layer = document.querySelector('.eidotter-retro-effects__boot');
      expect(layer).not.toBeNull();
      fireAnimationEnd(layer as HTMLElement, 'eidotter-retro-boot-glow');
      // Completion records the custom key, not the default one.
      expect(window.sessionStorage.getItem('custom:key')).toBe('1');
    });

    it('falls back to playing when sessionStorage read throws', () => {
      const getItemSpy = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(() => {
          throw new Error('blocked');
        });
      render(<RetroEffects boot bootOnce />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      getItemSpy.mockRestore();
    });

    it('completes without crashing when the sessionStorage write throws', () => {
      const setItemSpy = jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('blocked');
        });
      const onBootComplete = jest.fn();
      render(<RetroEffects boot bootOnce onBootComplete={onBootComplete} />);
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-glow');
      expect(onBootComplete).toHaveBeenCalledTimes(1);
      setItemSpy.mockRestore();
    });

    it('settles and records the flag under reduced motion', () => {
      setReducedMotion(true);
      const onBootComplete = jest.fn();
      render(<RetroEffects boot bootOnce onBootComplete={onBootComplete} />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      expect(onBootComplete).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBe('1');
    });

    it('fires onBootComplete once when the safety timeout would follow animationend', () => {
      jest.useFakeTimers();
      const onBootComplete = jest.fn();
      render(<RetroEffects boot bootOnce onBootComplete={onBootComplete} />);
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-glow');
      act(() => {
        jest.advanceTimersByTime(1300);
      });
      // animationend settles boot and cancels the safety timer; the ref guard
      // makes a second call a no-op regardless.
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('fires onBootComplete exactly once under StrictMode when already booted', () => {
      window.sessionStorage.setItem(DEFAULT_KEY, '1');
      const onBootComplete = jest.fn();
      render(
        <React.StrictMode>
          <RetroEffects boot bootOnce onBootComplete={onBootComplete} />
        </React.StrictMode>,
      );
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('fires onBootComplete exactly once under StrictMode with reduced motion', () => {
      setReducedMotion(true);
      const onBootComplete = jest.fn();
      render(
        <React.StrictMode>
          <RetroEffects boot bootOnce onBootComplete={onBootComplete} />
        </React.StrictMode>,
      );
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('plays and records the flag exactly once under StrictMode on a fresh session', () => {
      // The headline scenario: a discarded StrictMode mount must not pre-write
      // the flag and suppress the real boot.
      const onBootComplete = jest.fn();
      render(
        <React.StrictMode>
          <RetroEffects boot bootOnce onBootComplete={onBootComplete} />
        </React.StrictMode>,
      );
      const layer = document.querySelector('.eidotter-retro-effects__boot');
      expect(layer).not.toBeNull();
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBeNull();
      fireAnimationEnd(layer as HTMLElement, 'eidotter-retro-boot-glow');
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBe('1');
      expect(onBootComplete).toHaveBeenCalledTimes(1);
    });

    it('clears the safety timeout and records nothing if unmounted mid-boot', () => {
      jest.useFakeTimers();
      const onBootComplete = jest.fn();
      const { unmount } = render(
        <RetroEffects boot bootOnce onBootComplete={onBootComplete} />,
      );
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      unmount();
      act(() => {
        jest.advanceTimersByTime(1300);
      });
      expect(onBootComplete).not.toHaveBeenCalled();
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBeNull();
    });

    it('records the mount-time key even if bootStorageKey changes before completion', () => {
      const { rerender } = render(<RetroEffects boot bootOnce bootStorageKey="key-a" />);
      rerender(<RetroEffects boot bootOnce bootStorageKey="key-b" />);
      const layer = document.querySelector('.eidotter-retro-effects__boot') as HTMLElement;
      fireAnimationEnd(layer, 'eidotter-retro-boot-glow');
      // The key checked at mount (key-a) is the key written — not the later key-b.
      expect(window.sessionStorage.getItem('key-a')).toBe('1');
      expect(window.sessionStorage.getItem('key-b')).toBeNull();
    });

    it('non-gated boot still plays on every fresh mount and writes no flag', () => {
      const { unmount } = render(<RetroEffects boot />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      unmount();
      render(<RetroEffects boot />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).not.toBeNull();
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBeNull();
    });

    it('is a no-op without boot', () => {
      const onBootComplete = jest.fn();
      render(<RetroEffects bootOnce onBootComplete={onBootComplete} />);
      expect(document.querySelector('.eidotter-retro-effects__boot')).toBeNull();
      expect(window.sessionStorage.getItem(DEFAULT_KEY)).toBeNull();
      expect(onBootComplete).not.toHaveBeenCalled();
    });
  });
});

describe('RetroEffects presets and aperture grille (DMNC-1643)', () => {
  const root = () => document.querySelector('.eidotter-retro-effects') as HTMLElement;
  const mask = () => document.querySelector('.eidotter-retro-effects__mask');

  describe('preset attribute', () => {
    it('sets no data-effects attribute by default', () => {
      render(<RetroEffects />);
      expect(root()).not.toHaveAttribute('data-effects');
    });

    it('sets no data-effects attribute for preset="default", so an ancestor preset still applies', () => {
      render(<RetroEffects preset="default" />);
      expect(root()).not.toHaveAttribute('data-effects');
    });

    it('sets data-effects="long-reading" for preset="long-reading"', () => {
      render(<RetroEffects preset="long-reading" />);
      expect(root()).toHaveAttribute('data-effects', 'long-reading');
    });

    it('ships the attribute in server HTML (no hydration mismatch, no flash of default values)', () => {
      expect(renderToString(<RetroEffects preset="long-reading" />)).toContain('data-effects="long-reading"');
      expect(renderToString(<RetroEffects />)).not.toContain('data-effects');
    });

    it('leaves the layer toggles alone under the preset', () => {
      render(<RetroEffects preset="long-reading" />);
      expect(document.querySelector('.eidotter-retro-effects__scanlines')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__glow')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__flicker')).toBeInTheDocument();
      expect(document.querySelector('.eidotter-retro-effects__bloom')).not.toBeInTheDocument();
    });
  });

  describe('aperture grille overlay', () => {
    it('is not rendered by default', () => {
      render(<RetroEffects />);
      expect(mask()).not.toBeInTheDocument();
    });

    it('is rendered under the long-reading preset', () => {
      render(<RetroEffects preset="long-reading" />);
      expect(mask()).toBeInTheDocument();
    });

    it('is rendered with mask for a consumer that raises the token itself', () => {
      render(<RetroEffects mask />);
      expect(mask()).toBeInTheDocument();
    });

    it('can be turned off under the preset with mask={false}', () => {
      render(<RetroEffects preset="long-reading" mask={false} />);
      expect(mask()).not.toBeInTheDocument();
    });

    it('is not rendered when powered off', () => {
      render(<RetroEffects preset="long-reading" powered={false} />);
      expect(mask()).not.toBeInTheDocument();
    });
  });

  // jsdom applies stylesheet declarations to getComputedStyle (no layout, no
  // var() resolution), which is enough to check which rule wins.
  describe('computed styles from RetroEffects.css', () => {
    let style: HTMLStyleElement;
    beforeEach(() => {
      style = document.createElement('style');
      style.textContent = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      document.head.appendChild(style);
    });
    afterEach(() => style.remove());

    const layer = (name: string) =>
      document.querySelector(`.eidotter-retro-effects__${name}`) as HTMLElement;
    const animationName = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      return cs.animationName || cs.animation;
    };

    it('flicker has no animation under the preset', () => {
      render(<RetroEffects preset="long-reading" />);
      expect(animationName(layer('flicker'))).toBe('none');
    });

    it('scanlines have no drift animation under the preset', () => {
      render(<RetroEffects preset="long-reading" />);
      expect(animationName(layer('scanlines'))).toBe('none');
    });

    it('flicker and scanlines keep their animations at the default preset', () => {
      render(<RetroEffects />);
      expect(animationName(layer('flicker'))).toContain('retro-flicker');
      expect(animationName(layer('scanlines'))).toContain('retro-scanline');
    });

    it('an ancestor data-effects="long-reading" applies the preset too', () => {
      render(
        <div data-effects="long-reading">
          <RetroEffects />
        </div>,
      );
      expect(animationName(layer('flicker'))).toBe('none');
      expect(animationName(layer('scanlines'))).toBe('none');
    });

    it('the preset block redefines the effect tokens from the long-reading preset tokens', () => {
      const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      const block = css.match(/\[data-effects="long-reading"\]\s*\{([^}]*)\}/)?.[1] ?? '';
      for (const name of [
        'scanline-intensity',
        'scanline-line-pitch',
        'scanline-scroll-period',
        'flicker-intensity',
        'mask-intensity',
        'vignette-intensity',
        'vignette-spread',
        'phosphor-bloom-intensity',
      ]) {
        // Built from parts so the token-ref lint does not read the template as a var() reference.
        const preset = ['--effect-preset-long-reading', name].join('-');
        expect(block).toContain(`--effect-${name}: var(${preset});`);
      }
      // The reduced-motion static flicker tint follows the preset's flicker (0).
      expect(block).toContain(
        '--effect-web-flicker-intensity-static: var(--effect-preset-long-reading-flicker-intensity);',
      );
    });

    it('the grille opacity is the mask token, so it is invisible while the token is 0', () => {
      const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      const rule = css.match(/\.eidotter-retro-effects__mask\s*\{([^}]*)\}/)?.[1] ?? '';
      expect(rule).toMatch(/opacity:\s*calc\(var\(--effect-mask-intensity\) \* var\(--retro-intensity\)\)/);
    });

    it('hides the grille under prefers-contrast: more', () => {
      const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      const media = css.match(/@media \(prefers-contrast: high\), \(prefers-contrast: more\) \{([\s\S]*?)\n\}/)?.[1] ?? '';
      expect(media).toMatch(/\.eidotter-retro-effects__mask\s*\{\s*display:\s*none;/);
    });

    it('keeps every reduced-motion rule', () => {
      const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8');
      const media = [...css.matchAll(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/g)]
        .map((m) => m[1])
        .join('\n');
      for (const selector of [
        '.eidotter-retro-effects__scanlines',
        '.eidotter-retro-effects__flicker',
        '.eidotter-retro-effects--powering-off',
        '.eidotter-retro-effects--powering-on',
        '.eidotter-retro-effects__boot',
      ]) {
        expect(media).toContain(selector);
      }
    });
  });
});

describe('RetroEffects glowMode (DMNC-1643 sampled glow)', () => {
  // Today's server markup at default props, captured from main before glowMode
  // existed. The default must keep rendering exactly this.
  const TODAY_DEFAULT_MARKUP =
    '<div class="fixed inset-0 pointer-events-none z-[9999] eidotter-retro-effects" style="--retro-intensity:1" aria-hidden="true"><div class="eidotter-retro-effects__scanlines"></div><div class="eidotter-retro-effects__glow"></div><div class="eidotter-retro-effects__flicker"></div></div>';
  // The same tree as the client DOM serialises it (the style attribute is normalised).
  const TODAY_DEFAULT_DOM = TODAY_DEFAULT_MARKUP.replace('--retro-intensity:1', '--retro-intensity: 1;');

  const TOKENS: Record<string, string> = {
    '--effect-phosphor-sampled-tight-radius': '1.6px',
    '--effect-phosphor-sampled-tight-intensity': '0.35',
    '--effect-phosphor-sampled-halo-radius': '4.5px',
    '--effect-phosphor-sampled-halo-intensity': '0.22',
  };

  const html = document.documentElement;
  const filter = () => document.getElementById(RETRO_GLOW_FILTER_ID);
  const effectsRoot = () => document.querySelector('.eidotter-retro-effects') as HTMLElement;
  const originalGetComputedStyle = window.getComputedStyle;
  const originalMatchMedia = window.matchMedia;
  type Win = Window & { CSS?: unknown; SVGFEGaussianBlurElement?: unknown };
  const win = window as Win;
  const originalCSS = win.CSS;
  const originalFe = win.SVGFEGaussianBlurElement;
  let tokens: Record<string, string>;
  let matching: string[];
  const listeners = new Set<() => void>();
  /** A preference changed: run the registered matchMedia change listeners. */
  const firePreferenceChange = () => act(() => listeners.forEach((fn) => fn()));

  /** jsdom resolves no var() and has no SVG filter support, so the browser side is stubbed. */
  const stubBrowser = ({ supported = true } = {}) => {
    win.CSS = {
      supports: jest.fn(() => supported),
      escape: (value: string) => value.replace(/[^\w-]/g, (c) => `\\${c}`),
    };
    win.SVGFEGaussianBlurElement = supported ? function SVGFEGaussianBlurElement() {} : undefined;
    jest.spyOn(window, 'getComputedStyle').mockImplementation((el: Element, pseudo?: string | null) => {
      if (el.classList?.contains('eidotter-retro-effects')) {
        return { getPropertyValue: (name: string) => tokens[name] ?? '' } as CSSStyleDeclaration;
      }
      return originalGetComputedStyle(el, pseudo);
    });
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      get matches() {
        return matching.includes(query);
      },
      media: query,
      addEventListener: (_type: string, fn: () => void) => listeners.add(fn),
      removeEventListener: (_type: string, fn: () => void) => listeners.delete(fn),
    })) as unknown as typeof window.matchMedia;
  };

  beforeEach(() => {
    tokens = { ...TOKENS };
    matching = [];
  });
  afterEach(() => {
    jest.restoreAllMocks();
    win.CSS = originalCSS;
    win.SVGFEGaussianBlurElement = originalFe;
    window.matchMedia = originalMatchMedia;
    html.removeAttribute('data-eidotter-glow');
    html.removeAttribute('data-theme');
    listeners.clear();
  });

  describe('default (element path)', () => {
    it('renders exactly today\'s markup at default props', () => {
      expect(renderToString(<RetroEffects />)).toBe(TODAY_DEFAULT_MARKUP);
      expect(renderToString(<RetroEffects glowMode="element" />)).toBe(TODAY_DEFAULT_MARKUP);
    });

    it('renders today\'s DOM after mount and touches nothing outside its root, even where sampled glow is supported', () => {
      stubBrowser();
      const { container } = render(<RetroEffects />);
      expect(container.innerHTML).toBe(TODAY_DEFAULT_DOM);
      expect(html).not.toHaveAttribute('data-eidotter-glow');
      expect(filter()).toBeNull();
    });
  });

  describe('sampled', () => {
    it('server render is the element path markup (no filter, no hydration mismatch)', () => {
      expect(renderToString(<RetroEffects glowMode="sampled" />)).toBe(TODAY_DEFAULT_MARKUP);
      expect(renderToString(<RetroEffects glowMode="sampled" preset="long-reading" />)).toBe(
        renderToString(<RetroEffects preset="long-reading" />),
      );
      expect(renderToString(<RetroEffects glowMode="sampled" />)).not.toContain('filter');
    });

    it('after mount renders the filter at the token radii and strengths and points the html element at it', () => {
      stubBrowser();
      render(<RetroEffects glowMode="sampled" preset="long-reading" />);
      const f = filter()!;
      expect(f).not.toBeNull();
      expect(effectsRoot().contains(f)).toBe(true);
      expect([...f.querySelectorAll('feGaussianBlur')].map((e) => e.getAttribute('stdDeviation'))).toEqual(['1.6', '4.5']);
      expect([...f.querySelectorAll('feFuncA')].map((e) => e.getAttribute('slope'))).toEqual(['0.35', '0.22']);
      expect([...f.querySelectorAll('feBlend')].map((e) => e.getAttribute('mode'))).toEqual(['screen', 'screen']);
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
      // The filter never goes on body: that would pin fixed descendants to the document.
      expect(document.body).not.toHaveAttribute('data-eidotter-glow');
      expect(document.body.style.filter).toBe('');
    });

    it('removes the html attribute on unmount', () => {
      stubBrowser();
      const { unmount } = render(<RetroEffects glowMode="sampled" />);
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
      unmount();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });

    it('falls back to the element path when the feature check fails', () => {
      stubBrowser({ supported: false });
      const { container } = render(<RetroEffects glowMode="sampled" />);
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
      expect(container.innerHTML).toBe(TODAY_DEFAULT_DOM);
    });

    it('falls back to the element path without CSS.supports (older engines, jsdom)', () => {
      render(<RetroEffects glowMode="sampled" />);
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });

    it.each(['(prefers-reduced-transparency: reduce)', '(prefers-contrast: more)'])(
      'falls back to the element path under %s',
      (query) => {
        stubBrowser();
        matching = [query];
        render(<RetroEffects glowMode="sampled" />);
        expect(filter()).toBeNull();
        expect(html).not.toHaveAttribute('data-eidotter-glow');
      },
    );

    it('falls back to the element path when both strengths are 0 (the light grounds)', () => {
      stubBrowser();
      tokens['--effect-phosphor-sampled-tight-intensity'] = '0';
      tokens['--effect-phosphor-sampled-halo-intensity'] = '0';
      render(<RetroEffects glowMode="sampled" />);
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });

    it('falls back to the element path when the tokens are missing', () => {
      stubBrowser();
      tokens = {};
      render(<RetroEffects glowMode="sampled" />);
      expect(filter()).toBeNull();
    });

    it('turns off with the monitor (powered off)', () => {
      stubBrowser();
      const { rerender } = render(<RetroEffects glowMode="sampled" />);
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
      rerender(<RetroEffects glowMode="sampled" powered={false} />);
      fireAnimationEnd(effectsRoot(), 'retro-power-off');
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });

    it('switching glowMode back to element removes the filter', () => {
      stubBrowser();
      const { rerender, container } = render(<RetroEffects glowMode="sampled" />);
      expect(filter()).not.toBeNull();
      rerender(<RetroEffects glowMode="element" />);
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
      expect(container.innerHTML).toBe(TODAY_DEFAULT_DOM);
    });

    it('overlays stay outside the effect layer, which is non-interactive, and stay clickable with it on (hit-testing is checked in Playwright)', async () => {
      stubBrowser();
      const onPress = jest.fn();
      render(
        <>
          <RetroEffects glowMode="sampled" />
          <DosDialog open head={{ title: 'CONFIRM' }}>
            <button type="button" onClick={onPress}>
              OK
            </button>
          </DosDialog>
        </>,
      );
      const dialog = await screen.findByRole('dialog');
      const root = effectsRoot();
      // The effect is a separate, non-interactive layer: never an ancestor of the overlay.
      expect(root.contains(dialog)).toBe(false);
      expect(root).toHaveClass('pointer-events-none');
      expect(root).toHaveAttribute('aria-hidden', 'true');
      expect(filter()!.closest('svg')).toHaveClass('eidotter-retro-effects__glow-filter');
      // The filter is on the root element, so the dialog's fixed positioning is untouched.
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
      expect(dialog.closest('[data-eidotter-glow]')).toBe(html);
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('sampled: re-evaluation and shared state', () => {
    it('follows a live preference change both ways', () => {
      stubBrowser();
      render(<RetroEffects glowMode="sampled" />);
      expect(filter()).not.toBeNull();
      matching = ['(prefers-reduced-transparency: reduce)'];
      firePreferenceChange();
      expect(filter()).toBeNull();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
      matching = [];
      firePreferenceChange();
      expect(filter()).not.toBeNull();
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
    });

    it('re-reads the tokens when the html theme changes (light ground turns it off)', async () => {
      stubBrowser();
      render(<RetroEffects glowMode="sampled" />);
      expect(filter()).not.toBeNull();
      tokens['--effect-phosphor-sampled-tight-intensity'] = '0';
      tokens['--effect-phosphor-sampled-halo-intensity'] = '0';
      act(() => html.setAttribute('data-theme', 'amber-paper'));
      await waitFor(() => expect(filter()).toBeNull());
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });

    it('re-reads the tokens when a theme class changes on body', async () => {
      stubBrowser();
      render(<RetroEffects glowMode="sampled" />);
      tokens['--effect-phosphor-sampled-halo-radius'] = '3px';
      act(() => document.body.classList.add('theme-something'));
      await waitFor(() =>
        expect(filter()!.querySelectorAll('feGaussianBlur')[1].getAttribute('stdDeviation')).toBe('3'),
      );
      document.body.classList.remove('theme-something');
    });

    it('toggles sampled -> element -> sampled cleanly', () => {
      stubBrowser();
      const { rerender } = render(<RetroEffects glowMode="sampled" />);
      rerender(<RetroEffects glowMode="element" />);
      expect(html).not.toHaveAttribute('data-eidotter-glow');
      rerender(<RetroEffects glowMode="sampled" />);
      expect(filter()).not.toBeNull();
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
    });

    it('keeps the html attribute until the last sampled instance unmounts (route change overlap)', () => {
      stubBrowser();
      const a = render(<RetroEffects glowMode="sampled" />);
      const b = render(<RetroEffects glowMode="sampled" />);
      a.unmount();
      expect(html).toHaveAttribute('data-eidotter-glow', 'sampled');
      expect(filter()).not.toBeNull();
      b.unmount();
      expect(html).not.toHaveAttribute('data-eidotter-glow');
    });
  });

  describe('RetroEffects.css sampled-glow rules', () => {
    const css = readFileSync(join(__dirname, 'RetroEffects.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

    it('filters the root element only, by the filter id the component renders', () => {
      const rule = css.match(/:root\[data-eidotter-glow="sampled"\]\s*\{([^}]*)\}/)?.[1] ?? '';
      expect(rule).toContain(`filter: url(#${RETRO_GLOW_FILTER_ID});`);
      expect(css).not.toMatch(/body[^{]*\{[^}]*filter/);
    });

    it('drops the filter under high contrast and reduced transparency', () => {
      const media =
        css.match(/@media \(prefers-contrast: high\), \(prefers-contrast: more\), \(prefers-reduced-transparency: reduce\) \{([\s\S]*?)\n\}/)?.[1] ?? '';
      expect(media).toMatch(/:root\[data-eidotter-glow="sampled"\]\s*\{\s*filter:\s*none;/);
    });

    it('zeroes the sampled strengths on the light grounds', () => {
      for (const theme of ['light', 'amber-paper']) {
        expect(css).toContain(`[data-theme="${theme}"] .eidotter-retro-effects`);
      }
      const rule = css.match(/\.theme-amber-paper \.eidotter-retro-effects\s*\{([^}]*)\}/)?.[1] ?? '';
      expect(rule).toContain('--effect-phosphor-sampled-tight-intensity: 0;');
      expect(rule).toContain('--effect-phosphor-sampled-halo-intensity: 0;');
    });

    it('the long-reading preset carries the sampled-glow tokens', () => {
      const block = css.match(/\[data-effects="long-reading"\]\s*\{([^}]*)\}/)?.[1] ?? '';
      for (const name of ['tight-radius', 'tight-intensity', 'halo-radius', 'halo-intensity']) {
        const preset = ['--effect-preset-long-reading-phosphor-sampled', name].join('-');
        expect(block).toContain(`--effect-phosphor-sampled-${name}: var(${preset});`);
      }
    });
  });
});
