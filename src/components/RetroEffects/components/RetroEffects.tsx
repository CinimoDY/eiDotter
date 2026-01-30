import React, { useEffect, useRef, useState } from 'react';
import './RetroEffects.css';

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
   * Enable phosphor bloom/bleeding effect (opt-in for performance)
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
}) => {
  const prevPoweredRef = useRef(powered);
  const [powerState, setPowerState] = useState<'on' | 'powering-on' | 'powering-off' | 'off'>(
    powered ? 'on' : 'off'
  );

  // Track power state transitions
  useEffect(() => {
    const prevPowered = prevPoweredRef.current;
    prevPoweredRef.current = powered;

    if (prevPowered !== powered) {
      if (powered) {
        // Turning on
        setPowerState('powering-on');
      } else {
        // Turning off
        setPowerState('powering-off');
      }
    }
  }, [powered]);

  // Handle animation end to settle into final state
  const handleAnimationEnd = () => {
    if (powerState === 'powering-on') {
      setPowerState('on');
    } else if (powerState === 'powering-off') {
      setPowerState('off');
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
          {/* Scanline overlay */}
          {scanlines && (
            <div className="retro-effects__scanlines" />
          )}

          {/* Glow vignette */}
          {glow && (
            <div className="retro-effects__glow" />
          )}

          {/* Subtle flicker */}
          {flicker && (
            <div className="retro-effects__flicker" />
          )}

          {/* Phosphor bloom */}
          {bloom && (
            <div className="retro-effects__bloom" />
          )}
        </>
      )}
    </div>
  );
};
