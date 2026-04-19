/**
 * Snapshot test for `package.json` `exports` keys.
 *
 * PR #282 silently removed `./tailwind.preset.enhanced` under a patch version,
 * which would have thrown `ERR_PACKAGE_PATH_NOT_EXPORTED` for any consumer on
 * that import. This test pins the full set of published subpaths so any
 * future removal requires a deliberate snapshot update (and a reviewer who
 * sees the diff).
 *
 * If this test fails on a PR that intentionally changes exports: (a) verify
 * the change is consumer-safe (shim for removed paths, major bump for
 * deliberate breaks), (b) update the snapshot.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../../package.json') as { exports: Record<string, unknown> };

describe('package.json exports snapshot', () => {
  it('exposes the expected set of subpaths (no silent removals)', () => {
    const keys = Object.keys(pkg.exports).sort();
    expect(keys).toMatchInlineSnapshot(`
[
  ".",
  "./fonts.css",
  "./styles",
  "./tailwind.preset",
  "./tailwind.preset.enhanced",
  "./themes/amber-mono.css",
  "./themes/cga-amber.css",
  "./themes/cga-mode4-p0.css",
  "./themes/cga-mode4-p1.css",
  "./themes/cga-mode5.css",
  "./tokens.css",
]
`);
  });

  it('./tailwind.preset.enhanced is still present (deprecated shim, REMOVE-IN-0.21.0)', () => {
    expect(pkg.exports['./tailwind.preset.enhanced']).toBe('./tailwind.preset.enhanced.cjs');
  });

  it('./tailwind.preset points at the canonical .cjs', () => {
    expect(pkg.exports['./tailwind.preset']).toBe('./tailwind.preset.cjs');
  });
});
