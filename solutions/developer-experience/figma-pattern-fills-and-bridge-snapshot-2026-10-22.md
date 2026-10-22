---
date: 2026-10-22
linear: DMNC-1572
tags: [figma, design-system, plugin-api, patterns, snapshot, desktop-bridge]
problem_type: tooling-quirk
module: figma-web-ds
---

# Figma pattern fills without PATTERN paints, and a snapshot without a REST token

Context: building the health family sets on the Web DS "Health" page (DMNC-1572 U10, PR #508) through the figma-console Desktop Bridge. Two problems needed workarounds that the final file and code do not explain.

## 1. Pattern fills (dither, hatch, dotted) that stay variable-bound

**Problem.** The health family pairs every tone with a fill pattern so colour is never the only signal (`src/styles/health-patterns.css`). In `figma_execute`, assigning a Figma pattern paint fails:

```
in set_fills: Property "fills" failed validation: Expected [0].type to be one of
SOLID, SHADER, GRADIENT_LINEAR, GRADIENT_RADIAL, GRADIENT_ANGULAR, GRADIENT_DIAMOND, IMAGE, VIDEO
```

An `IMAGE` fill would draw the pattern but cannot bind a colour variable, which breaks the Web DS rule that every paint is variable-bound. Glyph text (░▒▓, as Progress uses) only gives CP437 shades, not a hatch, and its size is tied to the text-size tokens.

**Solution.** A private component set `_HealthFill` (axes `pattern` × `tone`, 25 variants). Each variant is a clipped 256 × 256 frame holding:

- `solid`: one rectangle, constraints STRETCH, fill bound to the tone variable;
- `none`: one rectangle with a dashed stroke bound to the tone variable;
- `dither` / `hatch` / `dotted`: **one vector** whose `vectorPaths` encode the CSS 4px tile across the whole frame (2px checker squares, 45° parallelogram bands 2√2 wide with a 4√2 period, 2px dots), fill bound to the tone variable, constraints `MIN/MIN`.

Consumers place an instance inside a clipped bar and resize it. Because the vector is pinned `MIN/MIN`, resizing **crops** the pattern instead of scaling it, so the tile stays 4px at every bar size. The `_` prefix keeps the set out of the published library while instances still work in published sets. Swapping the instance's `pattern` or `tone` property overrides a fill.

**Gotcha.** Figma normalises a vector's path so its bounds start at (0, 0). The hatch bands start at `x = -256` to cover the top-left corner, so after `appendChild` the vector must be moved back with `v.x = -256`. Otherwise only the lower-right triangle is hatched.

## 2. Refreshing `figma-snapshots/web-ds.json` when the REST token is dead

**Problem.** `scripts/fetch-figma-snapshot.ts` needs `FIGMA_ACCESS_TOKEN` (`GET /v1/files/:key`). An expired token returns `403 {"err":"Token expired"}`. The bridge can read the live file, but a full REST-equivalent export (about 5 MB, every node's geometry) would flood the conversation.

**Solution (partial snapshot, honest about its depth).**

1. **Drift-check the existing pages first.** Via the bridge, per page, compare node count, component-set ids, variant counts and description lengths against the snapshot. If all match, the old REST data is still accurate for those pages.
2. **Export only the new page** in REST shape at set → variant depth: `componentPropertyDefinitions` (`type`, `defaultValue`, `variantOptions`), `boundVariables` as `{type:'VARIABLE_ALIAS', id}` (map plugin `stroke{Top,…}Weight` to REST `individualStrokeWeights.BORDER_*_WEIGHT` and `*Radius` to `rectangleCornerRadii.RECTANGLE_*_CORNER_RADIUS`), `absoluteBoundingBox`, and the `components` / `componentSets` maps with `key`, `description` and `componentSetId`. A large `figma_execute` result spills to a tool-results file, which is fine: process it with a script and never read it into context.
3. **Merge with `json.dumps(d, indent=2, ensure_ascii=False)`.** That round-trips the REST file byte-exact. The default `ensure_ascii=True` escapes the emoji page names and rewrites every line that has one.
4. **Verify with `git diff --stat --diff-algorithm=histogram`.** The default Myers diff reports about 1,000 spurious deletions on this file. Histogram showed the true change: additions only, plus the `lastModified` line.

`lastModified` is set to the export time and `version` stays stale, because the plugin API cannot read either. Say so in the PR. A REST refetch with a valid token later fills in the deeper subtree.

## When this applies

Any Web DS work through the Desktop Bridge that needs textured fills (charts, meters, print-safe states), and any snapshot refresh when the Figma REST token is unavailable. For other Plugin API binding quirks, see `figma-variable-binding-quirks-2026-05-08.md`.
