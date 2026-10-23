import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';

export interface UseTextScrambleOptions {
  /** Milliseconds per character position (default: 40) */
  speed?: number;
  /** Character set to use for scramble effect */
  characters?: string;
  /** Whether the scramble effect is enabled (default: true) */
  enabled?: boolean;
  /** Milliseconds before scramble starts (default: 0) */
  delay?: number;
}

const DEFAULT_CHARACTERS = '░▒▓█│┤┐└┴┬├─┼';
const CYCLES_PER_CHAR = 4;

// Layout effect on the client so a client-only mount swaps to the scrambled
// frame before paint (no flash of the final text); plain effect on the server,
// where neither runs. Either way the effect runs only after mount/hydration.
const useClientLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function scrambleFrame(targetText: string, characters: string, resolvedCount: number): string {
  let result = '';
  for (let i = 0; i < targetText.length; i++) {
    if (i < resolvedCount || targetText[i] === ' ') {
      result += targetText[i];
    } else {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
  }
  return result;
}

/**
 * Hook that animates text with a DOS-style character scramble effect.
 * Characters resolve left-to-right (CRT beam metaphor).
 *
 * Note: Changing `speed`, `characters`, or `delay` mid-animation
 * will restart the scramble from position 0.
 */
export function useTextScramble(
  targetText: string,
  options?: UseTextScrambleOptions
): { text: string; isScrambling: boolean } {
  const {
    speed = 40,
    characters = DEFAULT_CHARACTERS,
    enabled = true,
    delay = 0,
  } = options ?? {};

  // SSR-safe (DMNC-1609): the server render and the first client render both
  // output the final text, byte-identical, so hydration never mismatches and
  // static HTML carries real content. Randomness and the reduced-motion check
  // live in the effect below, which only runs on the client after mount.
  const [display, setDisplay] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const rafRef = useRef<number>(0);

  useClientLayoutEffect(() => {
    // Skip animation if disabled or reduced motion
    if (!enabled || prefersReducedMotion()) {
      setDisplay(targetText);
      setIsScrambling(false);
      return;
    }

    // Track position (which char index we've resolved up to)
    let resolvedCount = 0;
    let cycleCount = 0;
    let lastTime = 0;
    let delayRemaining = delay;

    // First scrambled frame, set before paint so the delay period shows
    // glyphs rather than the final text (as the pre-SSR-fix version did).
    setDisplay(scrambleFrame(targetText, characters, 0));
    setIsScrambling(true);

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delayRemaining > 0) {
        delayRemaining -= delta;
        lastTime = time;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (delta >= speed) {
        lastTime = time;
        cycleCount++;

        if (cycleCount >= CYCLES_PER_CHAR) {
          resolvedCount++;
          cycleCount = 0;
        }

        if (resolvedCount >= targetText.length) {
          setDisplay(targetText);
          setIsScrambling(false);
          return;
        }

        setDisplay(scrambleFrame(targetText, characters, resolvedCount));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetText, speed, characters, enabled, delay]);

  return { text: display, isScrambling };
}
