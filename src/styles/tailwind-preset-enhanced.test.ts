/**
 * Shim contract tests for `tailwind.preset.enhanced.cjs`.
 *
 * The shim restores the `./tailwind.preset.enhanced` subpath export that
 * PR #282 accidentally removed. It must:
 *   1. Re-export the exact same object as `./tailwind.preset.cjs` (identity,
 *      not deep equality — consumers that memoize by reference depend on this).
 *   2. Log a `console.warn` exactly once per process, even across
 *      `require.cache` invalidation (dev servers / HMR / test runners).
 *
 * REMOVE-IN-0.21.0 — delete this file when the shim is removed.
 */

const warnFlag = '__eidotterEnhancedPresetDeprecationWarned' as const;

const globalFlagStore = globalThis as unknown as Record<string, unknown>;

function resetShimState(): void {
  // Jest has its own module registry — require.cache deletion alone won't force
  // re-execution through ts-jest's transformer. jest.resetModules() is the correct
  // tool; it clears the jest module registry so the next require re-runs the shim.
  jest.resetModules();
  delete globalFlagStore[warnFlag];
}

describe('tailwind.preset.enhanced.cjs — re-export parity', () => {
  beforeEach(() => {
    resetShimState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    resetShimState();
  });

  it('returns the same object identity as ./tailwind.preset.cjs', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const shim = require('../../tailwind.preset.enhanced.cjs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const base = require('../../tailwind.preset.cjs');
    expect(shim).toBe(base);
    // Deep-equal as well so a future `{ ...require(...) }` refactor still fails
    // (identity would fail first; toEqual gives a clearer diagnostic on drift).
    expect(shim).toEqual(base);
  });
});

describe('tailwind.preset.enhanced.cjs — once-per-process deprecation warn', () => {
  beforeEach(() => {
    resetShimState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    resetShimState();
  });

  it('fires console.warn exactly once on first require', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('deprecated'),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('0.21.0'),
    );
    // Lock the migration-target path so a future edit can't silently drop it.
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('eidotter/tailwind.preset'),
    );
  });

  it('does NOT re-fire when the module is re-required after cache invalidation', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    // Simulate a dev-server HMR cycle: blow the module registry and re-require.
    // Note: we do NOT reset the globalThis flag — that's the whole point of this test.
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    // The globalThis guard survives module cache invalidation; warn fires only once.
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
