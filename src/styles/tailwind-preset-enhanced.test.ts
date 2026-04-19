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

const shimPath = require.resolve('../../tailwind.preset.enhanced.cjs');
const basePath = require.resolve('../../tailwind.preset.cjs');
const warnFlag = '__eidotterEnhancedPresetDeprecationWarned' as const;

const globalFlagStore = globalThis as unknown as Record<string, unknown>;

function resetShimState(): void {
  delete require.cache[shimPath];
  delete require.cache[basePath];
  delete globalFlagStore[warnFlag];
}

describe('tailwind.preset.enhanced.cjs — re-export parity', () => {
  beforeEach(() => {
    resetShimState();
  });

  it('returns the same object identity as ./tailwind.preset.cjs', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const shim = require('../../tailwind.preset.enhanced.cjs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const base = require('../../tailwind.preset.cjs');
    expect(shim).toBe(base);
  });
});

describe('tailwind.preset.enhanced.cjs — once-per-process deprecation warn', () => {
  beforeEach(() => {
    resetShimState();
  });

  it('fires console.warn exactly once on first require', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('deprecated');
    expect(warnSpy.mock.calls[0][0]).toContain('0.21.0');
  });

  it('does NOT re-fire when the module is re-required after cache invalidation', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    // Simulate a dev-server HMR cycle: blow the cache and re-require.
    delete require.cache[shimPath];
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../../tailwind.preset.enhanced.cjs');
    // The globalThis guard survives require.cache invalidation; warn fires only once.
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
