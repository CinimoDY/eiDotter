import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import './RetroEffects.css';

export type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';

export interface RetroEffectsProps {
  /**
   * Enable scanline overlay effect
   */
  scanlines?: boolean;
  /**
   * Enable glow vignette effect
   */
  glow?: boolean;
  /**
   * Enable CRT flicker effect
   */
  flicker?: boolean;
  /**
   * Enable phosphor bloom/bleeding effect.
   * Defaults to false for performance - adds an extra compositing layer.
   */
  bloom?: boolean;
  /**
   * Whether the CRT is powered on. Animates on/off transitions.
   */
  powered?: boolean;
  /**
   * Play the CGA monitor boot sequence once on mount (~650ms): an amber
   * ignition line stretches across the center, the black raster opens from
   * it, and a warm phosphor glow settles. Skipped entirely under
   * prefers-reduced-motion. Opt-in; intended as the portfolio-wide launch
   * pattern (DMNC-1047).
   */
  boot?: boolean;
  /**
   * Intensity of the effects (0-1)
   */
  intensity?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Callback when power state changes (includes animation states)
   */
  onPowerStateChange?: (state: PowerState) => void;
  /**
   * Callback when power-on animation completes
   */
  onPowerOn?: () => void;
  /**
   * Callback when power-off animation completes
   */
  onPowerOff?: () => void;
  /**
   * Callback when the boot sequence completes (or is skipped)
   */
  onBootComplete?: () => void;
}

/**
 * CRT Monitor Effects component for authentic DOS terminal aesthetics
 *
 * Features:
 * - Scanline overlay (horizontal lines)
 * - Glow vignette (phosphor edge darkening)
 * - Subtle CRT flicker animation (WCAG 2.3.1 compliant)
 * - Phosphor bloom effect (opt-in)
 * - Power on/off animations
 * - Configurable intensity
 * - Respects reduced motion preferences
 */
export const RetroEffects: React.FC<RetroEffectsProps> = ({
  scanlines = true,
  glow = true,
  flicker = true,
  bloom = false,
  powered = true,
  boot = false,
  intensity = 1,
  className,
  onPowerStateChange,
  onPowerOn,
  onPowerOff,
  onBootComplete,
}) => {
  const prevPoweredRef = useRef(powered);
  const [powerState, setPowerState] = useState<PowerState>(powered ? 'on' : 'off');
  const [booting, setBooting] = useState(boot);

  // Boot settles via the glow's animationend; reduced-motion (where the boot
  // layer is display:none and never animates) and any missed event settle via
  // this effect instead.
  useEffect(() => {
    if (!booting) return;
    if (prefersReducedMotion()) {
      setBooting(false);
      onBootComplete?.();
      return;
    }
    const safety = window.setTimeout(() => {
      setBooting(false);
      onBootComplete?.();
    }, 1200);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting]);

  const handleBootAnimationEnd = (event: React.AnimationEvent) => {
    if (event.animationName !== 'eidotter-retro-boot-glow') return;
    setBooting(false);
    onBootComplete?.();
  };

  // Track power state transitions (intentional: animation state machine requires
  // syncing prop changes to transitional states, settled by onAnimationEnd)
  useEffect(() => {
    const prevPowered = prevPoweredRef.current;
    prevPoweredRef.current = powered;

    if (prevPowered !== powered) {
      const newState: PowerState = powered ? 'powering-on' : 'powering-off';
      setPowerState(newState);
      onPowerStateChange?.(newState);
    }
  }, [powered, onPowerStateChange]);

  // Settle power state after animation/transition completes
  const settlePowerState = () => {
    if (powerState === 'powering-on') {
      setPowerState('on');
      onPowerStateChange?.('on');
      onPowerOn?.();
    } else if (powerState === 'powering-off') {
      setPowerState('off');
      onPowerStateChange?.('off');
      onPowerOff?.();
    }
  };

  // Handle animation end to settle into final state
  const handleAnimationEnd = (event: React.AnimationEvent) => {
    // Only respond to power animations, ignore any other animations
    if (event.animationName !== 'retro-power-on' && event.animationName !== 'retro-power-off') {
      return;
    }
    settlePowerState();
  };

  // Handle transition end for reduced-motion mode where CSS replaces
  // animations with opacity transitions
  const handleTransitionEnd = (event: React.TransitionEvent) => {
    if (event.propertyName !== 'opacity') return;
    if (powerState !== 'powering-on' && powerState !== 'powering-off') return;
    settlePowerState();
  };

  const opacityStyle = { '--retro-intensity': intensity } as React.CSSProperties;

  // Don't render children when fully off
  const isVisible = powerState !== 'off';

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-[9999]',
        'eidotter-retro-effects',
        powerState === 'powering-off' && 'eidotter-retro-effects--powering-off',
        powerState === 'powering-on' && 'eidotter-retro-effects--powering-on',
        powerState === 'off' && 'eidotter-retro-effects--off',
        className,
      )}
      style={opacityStyle}
      aria-hidden="true"
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      {isVisible && (
        <>
          {scanlines && <div className="eidotter-retro-effects__scanlines" />}
          {glow && <div className="eidotter-retro-effects__glow" />}
          {flicker && <div className="eidotter-retro-effects__flicker" />}
          {bloom && <div className="eidotter-retro-effects__bloom" />}
        </>
      )}
      {booting && (
        <div className="eidotter-retro-effects__boot" onAnimationEnd={handleBootAnimationEnd}>
          <div className="eidotter-retro-effects__boot-panel eidotter-retro-effects__boot-panel--top" />
          <div className="eidotter-retro-effects__boot-panel eidotter-retro-effects__boot-panel--bottom" />
          <div className="eidotter-retro-effects__boot-line" />
          <div className="eidotter-retro-effects__boot-glow" />
        </div>
      )}
    </div>
  );
};
