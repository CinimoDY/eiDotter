import React, { useEffect, useRef, useState } from 'react';
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
  intensity = 1,
  className = '',
  onPowerStateChange,
  onPowerOn,
  onPowerOff,
}) => {
  const prevPoweredRef = useRef(powered);
  const [powerState, setPowerState] = useState<PowerState>(powered ? 'on' : 'off');

  // Track power state transitions (intentional: animation state machine requires
  // syncing prop changes to transitional states, settled by onAnimationEnd)
  useEffect(() => {
    const prevPowered = prevPoweredRef.current;
    prevPoweredRef.current = powered;

    if (prevPowered !== powered) {
      const newState: PowerState = powered ? 'powering-on' : 'powering-off';
      setPowerState(newState); // eslint-disable-line react-hooks/set-state-in-effect
      onPowerStateChange?.(newState);
    }
  }, [powered, onPowerStateChange]);

  // Handle animation end to settle into final state
  const handleAnimationEnd = (event: React.AnimationEvent) => {
    // Only respond to power animations, ignore any other animations
    if (event.animationName !== 'retro-power-on' && event.animationName !== 'retro-power-off') {
      return;
    }

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

  const containerClasses = [
    'retro-effects',
    powerState === 'powering-off' && 'retro-effects--powering-off',
    powerState === 'powering-on' && 'retro-effects--powering-on',
    powerState === 'off' && 'retro-effects--off',
    className
  ].filter(Boolean).join(' ');

  const opacityStyle = { '--retro-intensity': intensity } as React.CSSProperties;

  // Don't render children when fully off
  const isVisible = powerState !== 'off';

  return (
    <div
      className={containerClasses}
      style={opacityStyle}
      aria-hidden="true"
      onAnimationEnd={handleAnimationEnd}
    >
      {isVisible && (
        <>
          {scanlines && <div className="retro-effects__scanlines" />}
          {glow && <div className="retro-effects__glow" />}
          {flicker && <div className="retro-effects__flicker" />}
          {bloom && <div className="retro-effects__bloom" />}
        </>
      )}
    </div>
  );
};
