import { useState, useEffect, useRef } from 'react';

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

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

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

  const [display, setDisplay] = useState(
    enabled && !prefersReducedMotion() ? '' : targetText
  );
  const [isScrambling, setIsScrambling] = useState(false);
  const rafRef = useRef<number>(0);
  const prevTargetRef = useRef(targetText);

  useEffect(() => {
    // Skip animation if disabled or reduced motion
    if (!enabled || prefersReducedMotion()) {
      setDisplay(targetText);
      setIsScrambling(false);
      prevTargetRef.current = targetText;
      return;
    }

    // Track position (which char index we've resolved up to)
    let resolvedCount = 0;
    let cycleCount = 0;
    let lastTime = 0;
    let delayRemaining = delay;

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
          prevTargetRef.current = targetText;
          return;
        }

        // Build display string: resolved chars + scrambled chars
        let result = '';
        for (let i = 0; i < targetText.length; i++) {
          if (i < resolvedCount) {
            result += targetText[i];
          } else if (targetText[i] === ' ') {
            result += ' ';
          } else {
            result += characters[Math.floor(Math.random() * characters.length)];
          }
        }
        setDisplay(result);
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
