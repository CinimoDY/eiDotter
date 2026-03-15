import { useState, useRef, useCallback } from 'react';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';

interface UseAnimatedDismissResult {
  /** Whether the dismiss animation is playing */
  isClosing: boolean;
  /** Trigger the dismiss animation (or instant dismiss if reduced motion) */
  triggerClose: () => void;
  /** Pass to onAnimationEnd on the animated element */
  handleAnimationEnd: (e: React.AnimationEvent) => void;
}

/**
 * Shared animate-then-unmount state machine.
 * Triggers a CSS exit animation, then calls onDismiss after it completes.
 * Skips animation and calls onDismiss immediately when reduced motion is preferred.
 */
export function useAnimatedDismiss(
  animationName: string,
  onDismiss?: () => void
): UseAnimatedDismissResult {
  const [isClosing, setIsClosing] = useState(false);
  const closingRef = useRef(false);

  const triggerClose = useCallback(() => {
    if (closingRef.current || !onDismiss) return;

    if (prefersReducedMotion()) {
      onDismiss();
      return;
    }

    closingRef.current = true;
    setIsClosing(true);
  }, [onDismiss]);

  const handleAnimationEnd = useCallback((e: React.AnimationEvent) => {
    if (e.animationName === animationName && closingRef.current) {
      closingRef.current = false;
      setIsClosing(false);
      onDismiss?.();
    }
  }, [animationName, onDismiss]);

  return { isClosing, triggerClose, handleAnimationEnd };
}
