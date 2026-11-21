'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { prefersReducedMotion } from '../../../utils/prefersReducedMotion';
import './RetroEffects.css';

export type PowerState = 'on' | 'powering-on' | 'powering-off' | 'off';

/**
 * Named effect value sets (DMNC-1643). `default` is the eidotter monitor, tuned
 * for a page seen for seconds; `long-reading` is the DOS-86 monitor, tuned for
 * text read for hours (scanlines 0.20 at a 3px pitch and still, no flicker,
 * aperture grille 0.06, vignette 0.22, bloom 0.22).
 */
export type RetroEffectsPreset = 'default' | 'long-reading';

/**
 * Where the phosphor glow comes from (DMNC-1643). `element` (default) is
 * today's rendering: each component draws its own glow (text-shadow,
 * box-shadow). `sampled` also blurs the rendered page itself, like the DOS-86
 * terminal shader, with an SVG filter on the html element.
 */
export type RetroEffectsGlowMode = 'element' | 'sampled';

/** The id the `:root[data-eidotter-glow="sampled"]` rule in RetroEffects.css points at. */
export const RETRO_GLOW_FILTER_ID = 'eidotter-retro-glow-filter';
const GLOW_ATTRIBUTE = 'data-eidotter-glow';

/**
 * Instances whose sampled glow is active. The html attribute is shared, so it is
 * set by the first and removed only when the last one lets go (a route change
 * can mount the new overlay before the old one unmounts).
 */
let sampledGlowOwners = 0;

/** Layout effect in the browser (no server warning); the attribute must change in the same commit as the filter. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Media queries under which the sampled glow falls back to the element path. */
const SAMPLED_GLOW_FALLBACK_QUERIES = [
  '(prefers-reduced-transparency: reduce)',
  '(prefers-contrast: more)',
  '(prefers-contrast: high)',
];

interface SampledGlowValues {
  tightRadius: number;
  tightIntensity: number;
  haloRadius: number;
  haloIntensity: number;
}

/** Browser feature check: CSS `filter: url()` on HTML and SVG Gaussian blur. */
const supportsSampledGlow = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return (
      typeof window.CSS?.supports === 'function' &&
      window.CSS.supports('filter', `url(#${RETRO_GLOW_FILTER_ID})`) &&
      typeof window.SVGFEGaussianBlurElement !== 'undefined'
    );
  } catch {
    return false;
  }
};

const fallbackMediaMatches = (): boolean =>
  typeof window.matchMedia === 'function' &&
  SAMPLED_GLOW_FALLBACK_QUERIES.some((query) => window.matchMedia(query).matches);

/**
 * Read the --effect-phosphor-sampled-* tokens as resolved on the overlay root
 * (so a preset or theme on it or an ancestor applies). Returns null when a value
 * is missing or both strengths are 0: then there is nothing to draw.
 */
const readSampledGlowValues = (el: Element): SampledGlowValues | null => {
  const style = window.getComputedStyle(el);
  const read = (name: string) => parseFloat(style.getPropertyValue(`--effect-phosphor-sampled-${name}`));
  const values = {
    tightRadius: read('tight-radius'),
    tightIntensity: read('tight-intensity'),
    haloRadius: read('halo-radius'),
    haloIntensity: read('halo-intensity'),
  };
  if (Object.values(values).some((v) => !Number.isFinite(v) || v < 0)) return null;
  if (values.tightIntensity === 0 && values.haloIntensity === 0) return null;
  return values;
};

const sameGlowValues = (a: SampledGlowValues | null, b: SampledGlowValues | null) =>
  a === b ||
  (!!a &&
    !!b &&
    a.tightRadius === b.tightRadius &&
    a.tightIntensity === b.tightIntensity &&
    a.haloRadius === b.haloRadius &&
    a.haloIntensity === b.haloIntensity);

/** One blur pass scaled by its strength (premultiplied, so all four channels). */
const GlowPass: React.FC<{ radius: number; intensity: number; result: string }> = ({
  radius,
  intensity,
  result,
}) => (
  <>
    <feGaussianBlur in="SourceGraphic" stdDeviation={radius} result={`${result}-blur`} />
    <feComponentTransfer in={`${result}-blur`} result={result}>
      <feFuncR type="linear" slope={intensity} />
      <feFuncG type="linear" slope={intensity} />
      <feFuncB type="linear" slope={intensity} />
      <feFuncA type="linear" slope={intensity} />
    </feComponentTransfer>
  </>
);

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
   * Render the aperture grille overlay (faint vertical red, green and blue
   * stripes). Its strength is the `--effect-mask-intensity` token, 0 by
   * default, so the layer only shows once a preset or the token raises it.
   * Defaults to on under `preset="long-reading"`, off otherwise (an extra
   * compositing layer, like `bloom`). Under the `dos-86` theme the grille is
   * on without this prop (drawn by the overlay root itself, at 0.06);
   * `mask={false}` turns it off there too.
   */
  mask?: boolean;
  /**
   * Effect value set. `'long-reading'` sets `data-effects="long-reading"` on the
   * root, which redefines the `--effect-*` tokens for this overlay. `'default'`
   * (the default) sets no attribute, so a `data-effects` on an ancestor still
   * applies. Layer toggles (`scanlines`, `glow`, `flicker`, `bloom`) are not
   * changed by the preset; `mask` defaults to on under it. Under the `dos-86`
   * theme (the default since DMNC-1643 PR E) the long-reading values apply
   * whatever this prop says: they are that theme's effect values.
   */
  preset?: RetroEffectsPreset;
  /**
   * Where the phosphor glow comes from (DMNC-1643). `'element'` (the default)
   * renders exactly as before: each component draws its own glow. `'sampled'`
   * also takes the glow from the rendered picture: an SVG filter on the html
   * element blurs the page at two radii and screens both back over it (the
   * `--effect-phosphor-sampled-*` tokens; the long-reading preset carries the
   * DOS-86 values). Opt-in, and client-only: the server render and the first
   * client render are the element path, and the filter is applied after mount.
   * Stays on the element path under `prefers-reduced-transparency: reduce`,
   * `prefers-contrast: more`, in a browser without SVG filter support, on the
   * light grounds (`light`, `amber-paper`) and while powered off. One
   * RetroEffects per page should use it. Costly on long pages without GPU
   * rasterisation; see the component docs. Unrelated to `glow`, which is the
   * vignette layer.
   */
  glowMode?: RetroEffectsGlowMode;
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
   *
   * The sequence opens with a full-viewport opaque blackout that is part of the
   * server-rendered HTML, so the page is never visible before the turn-on — the
   * animation is the reveal, with no flash of content before boot (DMNC-1184).
   * The open is pure CSS, so it works before hydration and with JS disabled
   * (the cover self-resolves; nothing stays hidden).
   *
   * Assumes the default `powered` (on). Combining `boot` with `powered={false}`
   * is contradictory — the power-off transform collapses the whole overlay,
   * including the boot cover — so the no-flash guarantee does not apply there.
   */
  boot?: boolean;
  /**
   * Gate `boot` to once per browser tab/session (via sessionStorage). The boot
   * sequence plays on the first load of a tab; on later mounts within the same
   * tab the session flag suppresses it. A new tab/visit replays it. No-op unless
   * `boot` is also set. Falls back to playing if storage is unavailable (e.g.
   * private mode).
   *
   * **SSR caveat (DMNC-1184):** because the no-flash cover ships in the server
   * HTML and the server can't read `sessionStorage`, suppression on a returning
   * visitor is decided post-hydration. The practical effect by navigation type:
   * - **SPA route change** (overlay lives in a persistent layout, no remount):
   *   never shows the cover — fully suppressed, as before.
   * - **Full reload / hard refresh** (a returning tab re-mounts the overlay):
   *   the SSR cover paints, then JS tears it down on hydration. On a fast host
   *   that's a brief blackout (the panels' 140ms open delay means the turn-on
   *   usually isn't reached before teardown); only a slow hydration lets the
   *   turn-on visibly replay. It never flashes bare content.
   * This is the deliberate trade for a flash-free first paint; eliminating the
   * brief returning-visitor blackout entirely needs server-visible session state
   * (a cookie or a pre-paint inline script), which is consumer-side.
   *
   * Like `boot`, this is evaluated once on mount; changing it afterwards has no
   * effect (remount the component — e.g. via `key` — to re-evaluate).
   */
  bootOnce?: boolean;
  /**
   * sessionStorage key used by `bootOnce`. Defaults to `'eidotter:retro-boot'`.
   * Override to scope the once-per-session flag independently, or to force a
   * replay (e.g. a fresh key in a Storybook story). Read once on mount.
   *
   * Instances that mount simultaneously and share a key share one flag (the
   * intended single-overlay case); give each a distinct key if they must gate
   * independently.
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
 * - Aperture grille (opt-in; on under the long-reading preset)
 * - Effect presets (`preset="long-reading"`)
 * - Power on/off animations
 * - Configurable intensity
 * - Respects reduced motion preferences
 */
export const RetroEffects: React.FC<RetroEffectsProps> = ({
  scanlines = true,
  glow = true,
  flicker = true,
  bloom = false,
  mask,
  preset = 'default',
  glowMode = 'element',
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
  // The opaque boot cover renders on first paint for BOTH the gated and
  // non-gated paths whenever `boot` is set. This is the no-FOUC fix (DMNC-1184):
  // the full-viewport panels are present in the server HTML, so the page is
  // never visible before the turn-on — the animation is the reveal. `booting`
  // mirrors the server value on the client's first render (no sessionStorage
  // read here), so there is no hydration mismatch. The gated (bootOnce) decision
  // is made post-mount: if this tab already booted, the cover is torn down by
  // the decision effect once it runs. The server can't read sessionStorage, so a
  // returning visitor's full reload paints the cover and suppresses it on
  // hydration (a brief blackout, not a bare-content flash) — see the bootOnce
  // JSDoc for the SSR trade.
  const [booting, setBooting] = useState(boot);

  // Boot completes exactly once per mount. Guards against the StrictMode dev
  // double-invoke of effects and the (theoretical) animationend + safety-timeout
  // race both calling through twice.
  const bootSignaledRef = useRef(false);

  // Pin the storage key to its mount-time value. The read (decision effect) and
  // the write (completeBoot, recreated each render) must use the SAME key, or a
  // consumer passing a changing key would write a different key than was checked
  // and the next visit would replay. This makes the "read once on mount" contract
  // structural rather than documentation-only.
  const bootStorageKeyRef = useRef(bootStorageKey);

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
    if (bootOnce) markBootedThisSession(bootStorageKeyRef.current);
    signalBootComplete();
  };

  // Gated boot: decide once on mount whether this tab session has already booted.
  useEffect(() => {
    if (!boot || !bootOnce) return;
    if (hasBootedThisSession(bootStorageKeyRef.current)) {
      // Already shown this session — tear down the SSR cover (it was rendered to
      // prevent the first-paint flash, DMNC-1184) and signal completion so
      // consumers sequencing boot text off onBootComplete don't stall. No replay.
      setBooting(false);
      signalBootComplete();
      return;
    }
    // First visit this tab — keep the cover up; it plays and records the session
    // flag on completion (`completeBoot`). `booting` is already true from the
    // initial state, so there is nothing to set here.
    // Mount-only: gating is a first-load decision, not reactive to prop churn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boot settles via the glow's animationend; reduced-motion (where the boot
  // layer is display:none and never animates) and any missed event settle via
  // this effect instead.
  useEffect(() => {
    if (!booting) return;
    // Already settled (e.g. the gated already-booted branch tore the SSR cover
    // down and signalled in the decision effect, which runs first): don't arm a
    // safety timer that we'd immediately clear on the next render.
    if (bootSignaledRef.current) return;
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

  // `mask={false}` also turns off the grille a theme draws on its own (dos-86
  // draws it as the root's ::after, DMNC-1643 PR E). Only an explicit false
  // writes the variable, so the default markup is unchanged.
  const opacityStyle: Record<string, number> = { '--retro-intensity': intensity };
  if (mask === false) opacityStyle['--effect-mask-intensity'] = 0;

  // Don't render children when fully off
  const isVisible = powerState !== 'off';
  const showMask = mask ?? preset === 'long-reading';

  // Sampled glow (DMNC-1643). null = element path. Starts null on the server and
  // on the first client render, so hydration always matches; decided after mount.
  const rootRef = useRef<HTMLDivElement>(null);
  const [sampledGlow, setSampledGlow] = useState<SampledGlowValues | null>(null);
  const sampledWanted = glowMode === 'sampled' && isVisible;

  useEffect(() => {
    const root = rootRef.current;
    if (!sampledWanted || !root || !supportsSampledGlow()) {
      setSampledGlow(null);
      return;
    }
    const evaluate = () => {
      const next = fallbackMediaMatches() ? null : readSampledGlowValues(root);
      setSampledGlow((prev) => (sameGlowValues(prev, next) ? prev : next));
    };
    evaluate();
    // Re-evaluate when the user changes a preference or the site switches theme
    // or effect preset (the tokens are read, not hardcoded).
    const queries =
      typeof window.matchMedia === 'function'
        ? SAMPLED_GLOW_FALLBACK_QUERIES.map((query) => window.matchMedia(query))
        : [];
    queries.forEach((mql) => mql.addEventListener?.('change', evaluate));
    const observer =
      typeof MutationObserver === 'undefined' ? null : new MutationObserver(evaluate);
    const watched = { attributes: true, attributeFilter: ['data-theme', 'class', 'data-effects', 'style'] };
    observer?.observe(document.documentElement, watched);
    if (document.body) observer?.observe(document.body, watched);
    // A stylesheet that arrives after mount changes the tokens without a mutation.
    window.addEventListener('load', evaluate);
    return () => {
      queries.forEach((mql) => mql.removeEventListener?.('change', evaluate));
      observer?.disconnect();
      window.removeEventListener('load', evaluate);
    };
  }, [sampledWanted, preset]);

  // Point the html element at the filter only while the <filter> is in the DOM
  // (a url() to a missing filter is not reliably ignored across browsers): a
  // layout effect, so set and removal land in the same commit as the filter.
  const sampledActive = sampledGlow !== null;
  useIsomorphicLayoutEffect(() => {
    if (!sampledActive) return;
    const html = document.documentElement;
    sampledGlowOwners += 1;
    html.setAttribute(GLOW_ATTRIBUTE, 'sampled');
    return () => {
      sampledGlowOwners -= 1;
      if (sampledGlowOwners === 0) html.removeAttribute(GLOW_ATTRIBUTE);
    };
  }, [sampledActive]);

  return (
    <div
      ref={rootRef}
      className={cn(
        'fixed inset-0 pointer-events-none z-[9999]',
        'eidotter-retro-effects',
        powerState === 'powering-off' && 'eidotter-retro-effects--powering-off',
        powerState === 'powering-on' && 'eidotter-retro-effects--powering-on',
        powerState === 'off' && 'eidotter-retro-effects--off',
        className,
      )}
      style={opacityStyle as React.CSSProperties}
      data-effects={preset === 'default' ? undefined : preset}
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
          {showMask && <div className="eidotter-retro-effects__mask" />}
        </>
      )}
      {sampledGlow && (
        <svg className="eidotter-retro-effects__glow-filter" focusable="false">
          <filter
            id={RETRO_GLOW_FILTER_ID}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <GlowPass radius={sampledGlow.tightRadius} intensity={sampledGlow.tightIntensity} result="tight" />
            <GlowPass radius={sampledGlow.haloRadius} intensity={sampledGlow.haloIntensity} result="halo" />
            <feBlend in="SourceGraphic" in2="tight" mode="screen" result="with-tight" />
            <feBlend in="with-tight" in2="halo" mode="screen" />
          </filter>
        </svg>
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
