import React from 'react';
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
 * - Subtle CRT flicker animation
 * - Configurable intensity
 * - Respects reduced motion preferences
 */
export const RetroEffects: React.FC<RetroEffectsProps> = ({
  scanlines = true,
  glow = true,
  flicker = true,
  intensity = 1,
  className = '',
}) => {
  const containerClasses = [
    'retro-effects',
    className
  ].filter(Boolean).join(' ');

  const opacityStyle = { '--retro-intensity': intensity } as React.CSSProperties;

  return (
    <div className={containerClasses} style={opacityStyle} aria-hidden="true">
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
    </div>
  );
};
