import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import './RetroEffects.css';

export type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';

const DEFAULT_BOOT_STORAGE_KEY = 'eidotter:retro-boot';
const BOOT_FLAG_VALUE = '1';

/** Read a sessionStorage flag, swallowing access errors (private mode, SSR). */
const hasBootedThisSession = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(key) === BOOT_FLAG_VALUE;
  } catch {
    return false;
  }
};

/** Record the sessionStorage flag, swallowing access errors. */
const markBootedThisSession = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(key, BOOT_FLAG_VALUE);
  } catch {
    /* storage unavailable — boot still plays, just won't be remembered */
  }
};

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
   * Gate `boot` to once per browser tab/session (via sessionStorage). The boot
   * sequence plays on the first load of a tab and is suppressed on every
   * subsequent mount within the same tab — both SPA route changes and MPA
   * full-reload navigation. A new tab/visit replays it; a hard refresh does not.
   * No-op unless `boot` is also set. Falls back to playing if storage is
   * unavailable (e.g. private mode).
   *
   * Like `boot`, this is evaluated once on mount; changing it afterwards has no
   * effect (remount the component — e.g. via `key` — to re-evaluate).
   */
  bootOnce?: boolean;
  /**
   * sessionStorage key used by `bootOnce`. Defaults to `'eidotter:retro-boot'`.
   * Override to scope the once-per-session flag independently, or to force a
   * replay (e.g. a fresh key in a Storybook story). Read once on mount.
   */
  bootStorageKey?: string;
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
  bootOnce = false,
  bootStorageKey = DEFAULT_BOOT_STORAGE_KEY,
  intensity = 1,
  className,
  onPowerStateChange,
  onPowerOn,
  onPowerOff,
  onBootComplete,
}) => {
  const prevPoweredRef = useRef(powered);
  const [powerState, setPowerState] = useState<PowerState>(powered ? 'on' : 'off');
  // Non-gated boot keeps its on-mount behavior; the gated (bootOnce) path starts
  // un-booted and is decided post-mount so SSR/first paint never render a stale
  // overlay (no hydration mismatch on reload when the flag is already set).
  // (Non-gated boot is intentionally NOT SSR-gated — it plays on every mount.)
  const [booting, setBooting] = useState(boot && !bootOnce);

  // Boot completes exactly once per mount. Guards against the StrictMode dev
  // double-invoke of effects and the (theoretical) animationend + safety-timeout
  // race both calling through twice.
  const bootSignaledRef = useRef(false);

  // Keep the latest onBootComplete without re-running the mount-only effects that
  // call it (adding it to their deps would re-trigger the boot decision).
  const onBootCompleteRef = useRef(onBootComplete);
  useEffect(() => {
    onBootCompleteRef.current = onBootComplete;
  });

  // One-shot completion signal: settle the layer, remember the session, notify.
  const signalBootComplete = () => {
    if (bootSignaledRef.current) return;
    bootSignaledRef.current = true;
    onBootCompleteRef.current?.();
  };

  // Settle the boot layer and signal completion. For the gated path the session
  // flag is recorded HERE (on completion) rather than at the play decision, so a
  // discarded StrictMode dev double-mount doesn't pre-set the flag and suppress
  // the real boot. The flag is only "remembered" once a boot has actually run.
  const completeBoot = () => {
    setBooting(false);
    if (bootOnce) markBootedThisSession(bootStorageKey);
    signalBootComplete();
  };

  // Gated boot: decide once on mount whether this tab session has already booted.
  useEffect(() => {
    if (!boot || !bootOnce) return;
    if (hasBootedThisSession(bootStorageKey)) {
      // Already shown this session — skip, but still signal completion so
      // consumers sequencing boot text off onBootComplete don't stall.
      signalBootComplete();
      return;
    }
    setBooting(true);
    // Mount-only: gating is a first-load decision, not reactive to prop churn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boot settles via the glow's animationend; reduced-motion (where the boot
  // layer is display:none and never animates) and any missed event settle via
  // this effect instead.
  useEffect(() => {
    if (!booting) return;
    if (prefersReducedMotion()) {
      completeBoot();
      return;
    }
    const safety = window.setTimeout(() => {
      completeBoot();
    }, 1200);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting]);

  const handleBootAnimationEnd = (event: React.AnimationEvent) => {
    if (event.animationName !== 'eidotter-retro-boot-glow') return;
    completeBoot();
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
