import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import { ProgressRing } from '../../ProgressRing';
import './HoldToComplete.css';

export interface HoldToCompleteProps {
  /** Fired when the hold reaches completion — the primary action. */
  onHold: () => void;
  /** Fired on a plain click/tap that did not complete a hold (e.g. open details). */
  onTap?: () => void;
  /** Fired with progress `0..1` as the hold builds — hook for haptics or sound. */
  onHoldProgress?: (progress: number) => void;
  /** Milliseconds the user must hold to complete (default 700). */
  holdDuration?: number;
  /** Ring colour. Defaults to the amber brand token. */
  ringColor?: string;
  /** Ring diameter as a fraction of the tile's smaller side (default 0.72). */
  ringScale?: number;
  /** Disable the interaction. */
  disabled?: boolean;
  /** Accessible label for the control. */
  'aria-label'?: string;
  /** Additional CSS class name. */
  className?: string;
  /** The tile content. */
  children: React.ReactNode;
}

/** Accelerating ease so tension builds toward completion. */
const easeIn = (t: number) => t * t;
const COMPLETE_THRESHOLD = 0.02;
const CANCEL_MS = 120;

/**
 * Press-and-hold to complete, with a chunky {@link ProgressRing} filling during
 * the hold and reversing on an early release. Works with mouse, touch, and pen
 * via Pointer Events; keyboard users complete directly with Enter or Space.
 * Ported from the Tracker habit app's hold-to-complete tile (DMNC-1040).
 */
export const HoldToComplete = forwardRef<HTMLDivElement, HoldToCompleteProps>(
  (
    {
      onHold,
      onTap,
      onHoldProgress,
      holdDuration = 700,
      ringColor,
      ringScale = 0.72,
      disabled = false,
      'aria-label': ariaLabel,
      className,
      children,
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0);
    const [tileSize, setTileSize] = useState(0);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const progressRef = useRef(0);
    const fromRef = useRef(0);
    const targetRef = useRef(0);
    const startRef = useRef(0);
    const durationRef = useRef(holdDuration);
    const heldToCompletion = useRef(false);

    // Keep the latest callbacks in refs so the self-scheduling rAF loop always
    // invokes the current props — never a stale version captured when the hold
    // began (a consumer re-render mid-hold must not fire an outdated handler).
    const onHoldRef = useRef(onHold);
    const onHoldProgressRef = useRef(onHoldProgress);
    onHoldRef.current = onHold;
    onHoldProgressRef.current = onHoldProgress;

    const setProg = useCallback((p: number) => {
      progressRef.current = p;
      setProgress(p);
      onHoldProgressRef.current?.(p);
    }, []);

    const stopRaf = useCallback(() => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, []);

    const tick = useCallback(
      (now: number) => {
        const elapsed = now - startRef.current;
        const d = durationRef.current;
        const t = d <= 0 ? 1 : Math.min(1, elapsed / d);
        const eased = targetRef.current === 1 ? easeIn(t) : t;
        const p = fromRef.current + (targetRef.current - fromRef.current) * eased;
        setProg(p);

        if (t >= 1) {
          rafRef.current = null;
          if (targetRef.current === 1) {
            heldToCompletion.current = true;
            setProg(0);
            onHoldRef.current();
          }
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      },
      [setProg]
    );

    const animateTo = useCallback(
      (target: number, duration: number) => {
        stopRaf();
        fromRef.current = progressRef.current;
        targetRef.current = target;
        durationRef.current = duration;
        startRef.current =
          typeof performance !== 'undefined' ? performance.now() : 0;
        rafRef.current = requestAnimationFrame(tick);
      },
      [stopRaf, tick]
    );

    const startHold = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        // Capture the pointer so the whole hold is delivered to this element —
        // moving over child content won't fire pointerleave and abort it, and a
        // release outside the bounds still reaches onPointerUp.
        try {
          e.currentTarget.setPointerCapture?.(e.pointerId);
        } catch {
          /* jsdom / unsupported — capture is a progressive enhancement */
        }
        heldToCompletion.current = false;
        setProg(0);
        animateTo(1, holdDuration);
      },
      [disabled, holdDuration, animateTo, setProg]
    );

    const cancelHold = useCallback(() => {
      if (heldToCompletion.current) return;
      if (progressRef.current <= 0) {
        stopRaf();
        return;
      }
      if (prefersReducedMotion()) {
        stopRaf();
        setProg(0);
      } else {
        animateTo(0, CANCEL_MS);
      }
    }, [animateTo, stopRaf, setProg]);

    const handleClick = useCallback(() => {
      if (disabled) return;
      // Suppress the click that trails a completed hold's release.
      if (!heldToCompletion.current) onTap?.();
      heldToCompletion.current = false;
    }, [disabled, onTap]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || e.repeat) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onHold();
        }
      },
      [disabled, onHold]
    );

    // Measure the tile so the ring overlay scales with it.
    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      const measure = () =>
        setTileSize(Math.min(el.clientWidth, el.clientHeight));
      measure();
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
      }
    }, []);

    // Cancel any in-flight animation on unmount.
    useEffect(() => stopRaf, [stopRaf]);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const showRing = progress > COMPLETE_THRESHOLD && tileSize > 0;

    return (
      <div
        ref={setRefs}
        className={cn(
          'eidotter-hold',
          disabled && 'eidotter-hold--disabled',
          className
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerCancel={cancelHold}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
        {showRing && (
          <div className="eidotter-hold__overlay">
            <ProgressRing
              value={progress * 100}
              size={Math.floor(tileSize * ringScale)}
              color={ringColor}
              aria-label="Hold progress"
            />
          </div>
        )}
      </div>
    );
  }
);

HoldToComplete.displayName = 'HoldToComplete';
