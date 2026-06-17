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

import { existsSync } from "fs";
import { resolve } from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("../../package.json") as {
  exports: Record<string, unknown>;
  files: string[];
};
const repoRoot = resolve(__dirname, "../..");

describe("package.json exports snapshot", () => {
  it("exposes the expected set of subpaths (no silent removals)", () => {
    const keys = Object.keys(pkg.exports).sort();
    expect(keys).toMatchInlineSnapshot(`
     [
       ".",
       "./brand",
       "./fonts.css",
       "./icons",
       "./icons/*",
       "./icons/all",
       "./shadcn.css",
       "./styles",
       "./tailwind.preset",
       "./themes/amber-mono.css",
       "./themes/cga-amber.css",
       "./themes/cga-mode4-p0.css",
       "./themes/cga-mode4-p1.css",
       "./themes/cga-mode5.css",
       "./tokens.css",
       "./utilities",
     ]
    `);
  });

  it("./tailwind.preset.enhanced stays removed (deprecation cycle completed in 0.25.0)", () => {
    expect(pkg.exports["./tailwind.preset.enhanced"]).toBeUndefined();
  });

  it("./tailwind.preset points at the canonical .cjs", () => {
    expect(pkg.exports["./tailwind.preset"]).toBe("./tailwind.preset.cjs");
  });
});

describe("package.json exports ↔ files ↔ filesystem pairing", () => {
  /**
   * The PR #282 regression was caused by `exports` and `files[]` drifting apart
   * when `tailwind.preset.enhanced.cjs` was deleted. This test verifies three
   * invariants at once:
   *   1. Every string-form `exports` target exists on disk.
   *   2. Every string-form `exports` target is reachable from `files[]` (either
   *      listed literally or matched by one of its glob patterns).
   *
   * Conditional-form exports (`{types, import, require}`) are flattened.
   */
  const flattenedTargets: string[] = [];
  for (const value of Object.values(pkg.exports)) {
    if (typeof value === "string") {
      flattenedTargets.push(value);
    } else if (value && typeof value === "object") {
      for (const inner of Object.values(value as Record<string, unknown>)) {
        if (typeof inner === "string") flattenedTargets.push(inner);
      }
    }
  }

  // Wildcard subpaths (e.g. ./dist/icons/components/*.js) can't be checked with
  // existsSync on the literal pattern. We verify their parent directory exists
  // instead, and rely on the per-icon barrel test to confirm the wildcard
  // expands to real files.
  const concreteTargets = flattenedTargets.filter((t) => !t.includes("*"));
  const wildcardTargets = flattenedTargets.filter((t) => t.includes("*"));

  it.each(concreteTargets.map((t) => [t]))(
    'exports target "%s" exists on disk',
    (target) => {
      expect(existsSync(resolve(repoRoot, target))).toBe(true);
    },
  );

  it.each(wildcardTargets.map((t) => [t]))(
    'wildcard exports target "%s" has an existing parent directory',
    (target) => {
      const parentDir = target.replace(/\/[^/]*\*[^/]*$/, "");
      expect(existsSync(resolve(repoRoot, parentDir))).toBe(true);
    },
  );

  it.each(flattenedTargets.map((t) => [t]))(
    'exports target "%s" is reachable from package.json files[]',
    (target) => {
      const normalized = target.replace(/^\.\//, "");
      const covered = pkg.files.some((pattern) => {
        if (pattern === normalized) return true;
        // Crude glob match: "dir/*" matches "dir/anything" and "dir" covers "dir/anything".
        if (pattern.endsWith("/*")) {
          const prefix = pattern.slice(0, -2);
          return normalized.startsWith(prefix + "/") || normalized === prefix;
        }
        if (pattern.includes("*")) {
          const regex = new RegExp(
            "^" +
              pattern
                .replace(/[.+^${}()|[\]\\]/g, "\\$&")
                .replace(/\*/g, ".*") +
              "$",
          );
          return regex.test(normalized);
        }
        // A directory entry in files[] covers everything under it.
        return normalized === pattern || normalized.startsWith(pattern + "/");
      });
      expect(covered).toBe(true);
    },
  );
});
